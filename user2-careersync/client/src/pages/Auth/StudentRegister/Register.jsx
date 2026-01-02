import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from "@mui/material";
import {
  EmailOutlined,
  PersonOutline,
  PhoneOutlined,
  CalendarMonthOutlined,
  ApartmentOutlined,
} from "@mui/icons-material";

import * as yup from "yup";

import InputField from "../../../components/Registration/InputField";
import PasswordField from "../../../components/Registration/PasswordField";
import RadioGroupField from "../../../components/Registration/RadioGroupField";
import FormSection from "../../../components/Registration/FormSection";
import InfoBanner from "../../../components/Registration/InfoBanner";
import AvatarUpload from "../../../components/Registration/AvatarUpload";
import { register as registerUser } from "../../../services/authService";

/* =========================
   Yup Validation Schema
========================= */
const registerSchema = yup.object({
  profilePicture: yup.mixed().nullable().notRequired(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  // NOTE: keys must match the React state: firstName & lastName
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^(?:0\d{8,9}|\+855\d{8,9})$/, "Phone must start with 0 or +855")
    .required("Phone number is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  status: yup.string().required("Current status is required"),
  institutionName: yup.string().trim().required("Institution name is required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Conditions"),
});

function Register() {
  const [formData, setFormData] = useState({
    profilePicture: null,
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    status: "",
    institutionName: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleFieldChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    // Clear general error
    if (error) setError("");
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }));
    if (fieldErrors.termsAccepted) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.termsAccepted;
        return newErrors;
      });
    }
  };

  /* =========================
     ONLY validate on submit
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setFieldErrors({});

    try {
      await registerSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      // Map Yup validation errors to field errors
      const errors = {};
      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
      }
      setFieldErrors(errors);

      // Show a general error message if there are validation errors
      if (Object.keys(errors).length > 0) {
        setError("Please fill in all required fields correctly.");
      }
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for API - map frontend field names to backend expected names
      // Map status: "working" -> "professional" (database enum: ['student', 'professional', 'institution'])
      const mapStatusForDB = (status) => {
        if (!status) return status;
        const lower = status.toLowerCase();
        if (lower === "working") return "professional";
        return lower; // "student" stays "student"
      };

      // Map gender: ensure lowercase (database enum: ['male', 'female', 'other'])
      const mapGenderForDB = (gender) => {
        if (!gender) return gender;
        return gender.toLowerCase();
      };

      const registerData = {
        email: formData.email,
        password: formData.password,
        firstname: formData.firstName,
        lastname: formData.lastName,
        phone: formData.phone,
        dob: formData.dateOfBirth,
        gender: mapGenderForDB(formData.gender),
        currentstatus: mapStatusForDB(formData.status),
        institution: formData.institutionName,
      };

      // If profile picture exists, include it (you may need to use FormData for file upload)
      if (formData.profilePicture) {
        registerData.profileImage = formData.profilePicture;
      }

      const result = await registerUser(registerData);

      if (result.success) {
        setSuccess(true);
        // Optionally redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        // The service returns { success: false, message: "...", data: {...} }
        const errorMsg =
          result.message ||
          result.data?.message ||
          "Registration failed. Please try again.";
        setError(errorMsg);
        console.error("Registration error:", result);
      }
    } catch (err) {
      console.error("Registration exception:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fb", py: 6 }}>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* LEFT */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={1}
                sx={{ p: 3, textAlign: "center", height: "100%" }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#111827", mb: 1 }}
                >
                  Create Your Account
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Start your learning journey
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <AvatarUpload
                    onImageChange={(file) =>
                      setFormData((prev) => ({ ...prev, profilePicture: file }))
                    }
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1.5 }}
                  >
                    Upload your profile picture *
                  </Typography>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <FormSection title="Account Information" centerTitle>
                  <Box sx={{ display: "grid", gap: 2 }}>
                    <InputField
                      label="Email Address"
                      required
                      placeholder="your.email@example.com"
                      Icon={EmailOutlined}
                      value={formData.email}
                      onChange={handleFieldChange("email")}
                      error={!!fieldErrors.email}
                      helperText={fieldErrors.email}
                    />

                    <PasswordField
                      label="Password"
                      required
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleFieldChange("password")}
                      error={!!fieldErrors.password}
                      helperText={fieldErrors.password}
                    />

                    <PasswordField
                      label="Confirm Password"
                      required
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleFieldChange("confirmPassword")}
                      error={!!fieldErrors.confirmPassword}
                      helperText={fieldErrors.confirmPassword}
                    />
                  </Box>
                </FormSection>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Already have an account?{" "}
                  <RouterLink
                    to="/signin"
                    style={{ color: "#0c3c82", fontWeight: 600 }}
                  >
                    Sign in
                  </RouterLink>
                </Typography>
              </Paper>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} md={8}>
              <Paper elevation={1} sx={{ p: 3 }}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Registration successful! Redirecting to sign in...
                  </Alert>
                )}
                <InfoBanner
                  title="Important:"
                  description="Please provide accurate information. This data will be used to submit session requests to mentors who will review and approve your applications."
                />

                <FormSection title="Registration" centerTitle sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <InputField
                        label="First Name"
                        required
                        placeholder="John"
                        Icon={PersonOutline}
                        value={formData.firstName}
                        onChange={handleFieldChange("firstName")}
                        error={!!fieldErrors.firstName}
                        helperText={fieldErrors.firstName}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Last Name"
                        required
                        placeholder="Doe"
                        Icon={PersonOutline}
                        value={formData.lastName}
                        onChange={handleFieldChange("lastName")}
                        error={!!fieldErrors.lastName}
                        helperText={fieldErrors.lastName}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Phone Number"
                        required
                        placeholder="+1 (555) 000-0000"
                        Icon={PhoneOutlined}
                        value={formData.phone}
                        onChange={handleFieldChange("phone")}
                        error={!!fieldErrors.phone}
                        helperText={fieldErrors.phone}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Date of Birth"
                        required
                        type="date"
                        Icon={CalendarMonthOutlined}
                        value={formData.dateOfBirth}
                        onChange={handleFieldChange("dateOfBirth")}
                        error={!!fieldErrors.dateOfBirth}
                        helperText={fieldErrors.dateOfBirth}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <RadioGroupField
                        label="Gender"
                        required
                        value={formData.gender}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }));
                          if (fieldErrors.gender) {
                            setFieldErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.gender;
                              return newErrors;
                            });
                          }
                        }}
                        error={!!fieldErrors.gender}
                        helperText={fieldErrors.gender}
                        options={[
                          { label: "Male", value: "male" },
                          { label: "Female", value: "female" },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                <FormSection title="Education & Employment" sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <RadioGroupField
                        label="Current Status"
                        required
                        value={formData.status}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }));
                          if (fieldErrors.status) {
                            setFieldErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.status;
                              return newErrors;
                            });
                          }
                        }}
                        error={!!fieldErrors.status}
                        helperText={fieldErrors.status}
                        options={[
                          { label: "Student", value: "student" },
                          { label: "Working", value: "working" },
                        ]}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputField
                        label="Institution Name"
                        required
                        placeholder="Enter school/company name"
                        Icon={ApartmentOutlined}
                        value={formData.institutionName}
                        onChange={handleFieldChange("institutionName")}
                        error={!!fieldErrors.institutionName}
                        helperText={fieldErrors.institutionName}
                      />
                    </Grid>
                  </Grid>
                </FormSection>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    border: "1px solid #0c3c82",
                    borderRadius: "10px",
                    p: 1.5,
                    mt: 3,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={formData.termsAccepted}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        I agree to the{' '}
                        <RouterLink to="/terms" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                          Terms and Conditions
                        </RouterLink>
                        {' '}and{' '}
                        <RouterLink to="/privacy" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                          Privacy Policy
                        </RouterLink>
                        .
                      </Typography>
                    }
                    sx={{ m: 0, alignItems: "flex-start" }}
                  />
                  {fieldErrors.termsAccepted && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: "block", fontSize: "12px" }}
                    >
                      {fieldErrors.termsAccepted}
                    </Typography>
                  )}
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || success}
                  sx={{
                    mt: 3,
                    backgroundColor: "#b5ddf6",
                    color: "#0c3c82",
                    fontWeight: 700,
                    py: 1.4,
                    borderRadius: "10px",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#a3cff0",
                      boxShadow: "none",
                    },
                    "&:disabled": {
                      backgroundColor: "#e5e7eb",
                      color: "#9ca3af",
                    },
                  }}
                >
                  {loading
                    ? "Registering..."
                    : success
                    ? "Registration Successful!"
                    : "Complete Registration"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}

export default Register;
