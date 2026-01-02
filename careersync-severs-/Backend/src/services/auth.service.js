const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User, AccUser, Admin, Mentor } = require("../models");
const sendEmail = require("../utils/sendEmail");
const { Op } = require("sequelize");

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d";
const APP_URL =
  process.env.APP_URL || `http://localhost:${process.env.PORT || 5000}`;

function generateToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: "HS256",
  });
}

async function registerUser(data, file) {
  let {
    email,
    password,
    role,
    firstname,
    lastname,
    phone,
    gender,
    currentstatus,
    dob,
    institution,
    profileImage,
  } = data;

  email = email?.toLowerCase().trim();
  firstname = firstname?.trim();
  lastname = lastname?.trim();
  password = password?.trim();
  gender = gender?.trim();
  institution = institution?.trim();
  currentstatus = currentstatus?.trim();
  dob = dob?.trim();
  phone = phone?.trim();

  profileImage = file ? file.filename : profileImage?.trim() || "default.png";

  if (!email || !password) throw new Error("email and password are required");

  const exist = await User.findOne({ where: { email } });
  if (exist) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = crypto.randomBytes(32).toString("hex");
  const verifyTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Create User record - ALL snake_case
  const user = await User.create({
    email,
    password: hashedPassword,
    role_name: role || "acc_user",
    verify_token: verifyToken, // CHANGED from verifyToken
    verify_token_exp: verifyTokenExp, // CHANGED from verifyTokenExp
    email_verified: false, // CHANGED from emailVerified
  });

  // Create AccUser record if role is acc_user
  if ((role || "acc_user") === "acc_user") {
    await AccUser.create({
      user_id: user.id,
      first_name: firstname,
      last_name: lastname,
      phone,
      gender,
      dob: dob || null,
      types_user: currentstatus,
      institution_name: institution,
      profile_image: profileImage,
    });
  }

  const verifyUrl = `${APP_URL}/api/auth/verify/${verifyToken}`;
  const html = `
    <p>Hi ${firstname || lastname || "there"},</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verifyUrl}">Verify Email</a>
    <p>This link expires in 24 hours.</p>
  `;

  await sendEmail({ to: email, subject: "Verify your email", html });

  return user;
}

async function verifyEmailToken(token) {
  const user = await User.findOne({
    where: {
      verify_token: token, // CHANGED from verifyToken
      verify_token_exp: { [Op.gt]: new Date() }, // CHANGED from verifyTokenExp
    },
  });
  if (!user) throw new Error("Invalid or expired token");

  await user.update({
    email_verified: true, // CHANGED from emailVerified
    verify_token: null, // CHANGED from verifyToken
    verify_token_exp: null, // CHANGED from verifyTokenExp
  });

  return user;
}

async function loginUser(email, password) {
  if (!email || !password) throw new Error("Email and password required");

  // Normalize email to lowercase for case-insensitive matching
  email = email.toLowerCase().trim();

  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Admin,
        attributes: ["id", "full_name", "phone", "profile_image"],
        required: false,
      },
      {
        model: Mentor,
        attributes: [
          "id",
          "first_name",
          "last_name",
          "profile_image",
          "approval_status",
          "job_title",
          "company_name",
          "phone",
          "gender",
          "dob",
          "expertise_areas",
          "experience_years",
          "about_mentor",
          "social_media",
        ],
        required: false,
      },
      {
        model: AccUser,
        attributes: [
          "id",
          "user_id",
          "first_name",
          "last_name",
          "phone",
          "gender",
          "dob",
          "types_user",
          "institution_name",
          "profile_image",
          "deleted_at",
          "created_at",
          "updated_at",
        ],
        required: false,
      },
    ],
  });
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");

  // Handle mentor-specific login checks
  if (user.role_name === "mentor") {
    // ✅ NO email verification required for mentors - only admin approval needed

    // Check admin approval status
    if (user.Mentor) {
      const approvalStatus = user.Mentor.approval_status;

      if (approvalStatus === "rejected") {
        throw new Error(
          "Your mentor account has been rejected by admin. Please contact support if you believe this is an error."
        );
      }

      if (approvalStatus === "pending") {
        throw new Error(
          "Your mentor account is waiting for admin approval. You will receive an email notification once your application is reviewed."
        );
      }

      // If approved, allow login
      if (approvalStatus !== "approved") {
        throw new Error(
          "Your mentor account status is invalid. Please contact support."
        );
      }
    } else {
      // Mentor record doesn't exist - this shouldn't happen but handle it
      throw new Error("Mentor profile not found. Please contact support.");
    }
  } else if (user.role_name !== "admin") {
    // For non-admin, non-mentor users (students), check email verification
    if (!user.email_verified) {
      throw new Error("Please verify your email before login");
    }
  }
  // Admin users can bypass email verification (already handled above)

  const accessToken = generateToken(
    { id: user.id, role: user.role_name },
    JWT_ACCESS_SECRET,
    ACCESS_EXPIRES
  );
  const refreshToken = generateToken(
    { id: user.id },
    JWT_REFRESH_SECRET,
    REFRESH_EXPIRES
  );
  console.log("SIGNING ACCESS TOKEN WITH:", process.env.JWT_ACCESS_SECRET);
  console.log("ISSUED TOKEN LENGTH:", accessToken.length);

  await user.update({ refresh_token: refreshToken }); // CHANGED from refreshToken

  // Convert to plain object to avoid serialization issues
  const userData = user.toJSON ? user.toJSON() : user;

  return { user: userData, accessToken, refreshToken };
}

async function refreshToken(token) {
  if (!token) throw new Error("No refresh token");

  const user = await User.findOne({ where: { refresh_token: token } }); // CHANGED from refreshToken
  if (!user) throw new Error("Invalid refresh token");

  jwt.verify(token, JWT_REFRESH_SECRET, (err) => {
    if (err) throw new Error("Token expired");
  });

  const accessToken = generateToken(
    { id: user.id, role: user.role_name },
    JWT_ACCESS_SECRET,
    ACCESS_EXPIRES
  );
  return accessToken;
}

async function logoutUser(token) {
  if (!token) return null;

  const user = await User.findOne({ where: { refresh_token: token } }); // CHANGED from refreshToken
  if (!user) return null;

  await user.update({ refresh_token: null }); // CHANGED from refreshToken
  return user;
}

async function resetPasswordRequest(email) {
  if (!email) throw new Error("Email required");

  // Normalize email to lowercase for case-insensitive matching
  email = email.toLowerCase().trim();

  const user = await User.findOne({ where: { email } });
  if (!user) return;

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetExp = new Date(Date.now() + 60 * 60 * 1000);

  await user.update({
    reset_token: resetToken, // CHANGED from resetToken
    reset_token_exp: resetExp, // CHANGED from resetTokenExp
  });

  // Use frontend URL, not API URL - the frontend will handle the reset form
  const frontendUrl = process.env.CLIENT_BASE_URL_PUBLIC || process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset/${resetToken}`;
  const html = `<p>Reset your password by clicking below:</p><p><a href="${resetUrl}">Reset Password</a></p><p>This link is valid for 1 hour.</p>`;

  await sendEmail({ to: email, subject: "Password reset", html });
}

async function resetPassword(token, password) {
  const user = await User.findOne({ where: { reset_token: token } }); // CHANGED from resetToken
  if (!user) throw new Error("Invalid token");
  if (user.reset_token_exp < new Date()) throw new Error("Token expired"); // CHANGED from resetTokenExp

  const hashed = await bcrypt.hash(password, 10);
  await user.update({
    password: hashed,
    reset_token: null, // CHANGED from resetToken
    reset_token_exp: null, // CHANGED from resetTokenExp
  });
}

module.exports = {
  registerUser,
  verifyEmailToken,
  loginUser,
  refreshToken,
  logoutUser,
  resetPasswordRequest,
  resetPassword,
};
