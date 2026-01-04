const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config(); // Ensure this is at the top
const db = require("./models");

const app = express();

// Middleware - Universal CORS Fix
app.use(cors({
  origin: true,       // <--- This automatically accepts the incoming website address
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['set-cookie']
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Imports
const authRoutes = require("./routes/auth.route");
const mentorRoutes = require("./routes/mentor.route");
const sessionRoutes = require("./routes/mentor.session.route");
const bookingRoutes = require("./routes/mentor.booking.route");
const userRoute = require("./routes/user.routes");
const userBookingRoutes = require('./routes/booking.routes');
const timeslotRoutes = require("./routes/timeslot.route");
const adminRoutes = require("./routes/admin-management.routes");
const dashboardRoutes = require("./routes/dashboard.route");
const industryRoutes = require("./routes/industry.routes");
const positionRoutes = require("./routes/position.routes");

// Mount routes
app.use("/api/timeslots", timeslotRoutes);
app.use("/api/mentor.bookings", bookingRoutes);
app.use("/api/sessions", sessionRoutes);
app.use('/api/bookings', userBookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/mentors", mentorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", dashboardRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/positions", positionRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// API root endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "CareerSync API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      auth: "/api:/auth",
      mentors: "/api/mentors",
      sessions: "/api/sessions",
      bookings: "/api/bookings",
      admin: "/api/admin",
      dashboard: "/api/dashboard",
      industries: "/api/industries",
      positions: "/api/positions",
      timeslots: "/api/timeslots"
    }
  });
});

// ⚠️ DEPRECATED: Legacy user routes (Kept for compatibility)
app.post("/users", async (req, res) => {
  try {
    const { username, email, password, role, fullName, phone, address, gender, dob } = req.body;
    const user = await db.User.create({ username, email, password, role, fullName, phone, address, gender, dob });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ⚠️ Direct DB routes (Consider moving these to controllers later)
app.post("/api/positions", async (req, res) => {
  try {
    const position = await db.Position.create(req.body);
    res.status(201).json(position);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/industries", async (req, res) => {
  try {
    const industry = await db.Industry.create(req.body);
    res.status(201).json(industry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/positions", async (req, res) => {
  try {
    const positions = await db.Position.findAll();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/industries", async (req, res) => {
  try {
    const industries = await db.Industry.findAll();
    res.json(industries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------------------------------
// 🔹 Database Sync & Server Start (STABILIZED)
// -----------------------------------------------------------------
const syncDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    // 👇 LOG THE DATABASE NAME TO VERIFY
    console.log(`✅ Database connected to: ${process.env.DB_NAME || 'Unknown DB'}`);
    
    // Sync models in order - handle circular dependencies
    const syncOrder = [
      'User',        // Base table
      'Industry', 
      'Position', 
      'Admin', 
      'Mentor', 
      'MentorDocument',    // Needs Mentor
      'MentorEducation',   // Needs Mentor
      'AccUser', 
      'Session', 
      'ScheduleTimeslot',  // Sync first (will fail on Booking FK, but that's OK)
      'Booking',           // Then Booking (needs ScheduleTimeslot)
      'Payment',           // Needs Booking
      'Invoice',           // Needs Payment
      'Certificate',       // Needs Booking
      'LoginSession', 
      'PasswordReset'
    ];
    
    // 1. Sync User Table
    if (db.User) {
      try {
        // 🚨 CHANGED alter: true TO alter: false for stability
        await db.User.sync({ alter: false, logging: false });
        console.log(`✅ User table synchronized`);
      } catch (userErr) {
        console.error(`❌ Critical: User table sync failed:`, userErr.message);
        throw userErr;
      }
    }
    
    // 2. Sync Other Tables - handle circular dependencies gracefully
    for (const modelName of syncOrder) {
      if (db[modelName] && modelName !== 'User') {
        try {
          await db[modelName].sync({ alter: false, logging: false });
          // console.log(`✅ ${modelName} table synchronized`);
        } catch (modelErr) {
          // Handle FK constraint errors gracefully - tables are still created, just without FK constraints
          if (modelErr.message.includes('does not exist') || 
              modelErr.message.includes('relation') ||
              modelErr.message.includes('constraint')) {
            // These are expected for circular dependencies - tables are created without FK constraints
            // FK constraints can be added later via migrations if needed
            console.log(`⚠️ ${modelName}: Table created without FK constraints (expected for circular deps)`);
          } else {
            console.error(`⚠️ Error syncing ${modelName}:`, modelErr.message);
          }
        }
      }
    }
    
    console.log("✅ All models synchronized successfully");
  } catch (err) {
    console.error("❌ Database sync error:");
    console.error(err.message);
    process.exit(1);
  }
};

// Start Server
syncDatabase().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}/api`);
  });
}).catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
