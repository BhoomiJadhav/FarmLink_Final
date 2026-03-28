const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const cron = require("node-cron");
const { initSocket } = require("./socket/socket");

dotenv.config();

// Existing Routes
const contractRoutes = require("./Routes/contractRoutes");
const authRoutes = require("./Routes/authRoutes");
const profileMeRoute = require("./Routes/profileMeRoute");
const profileRoutes = require("./Routes/profileRoute");
const farmerRoutes = require("./Routes/farmerRoute");
const buyerRoutes = require("./Routes/buyerRoutes");
const negotiationRoutes = require("./Routes/negotiationRoutes");
const marketRoutes = require("./Routes/markerRoutes");
const updatesRoutes = require("./Routes/updateRoutes");
const { getUpdates } = require("./Controllers/updatesController");
const harvestListingRoutes = require("./Routes/harvestListingRoutes");
const harvestContractRoutes = require("./Routes/harvestContractRoutes");
const notificationRoutes = require("./Routes/notificationRoutes");
const contractPdfRoutes = require("./Routes/contractPdfRoutes.js");
const cultivationTrackingRoutes = require("./Routes/cultivationTrackingRoutes.js");
const messageRoutes = require("./Routes/messageRoutes.js");
const devRoutes = require("./Routes/dev.routes");
const disputeRoutes = require("./Routes/disputeRoutes.js");
const cultivationDeliveryRoutes = require("./Routes/cultivationDeliveryRoutes.js");
const adminRoutes = require("./Routes/adminRoutes");
// New AI Route
const aiRoutes = require("./Routes/aiRoutes");

const { runReminderCron } = require("./cron/reminderCron");
const { runPaymentPenaltyCron } = require("./cron/paymentPenaltyCron");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "https://soricine-chancily-christiane.ngrok-free.dev",
      ];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS BLOCKED ORIGIN:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

// Attach socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
  path: "/socket.io",
});

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(`user:${userId}`);
    console.log(`user ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
  });
});
initSocket(io);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});

cron.schedule("0 9 * * *", async () => {
  await runReminderCron();
});

cron.schedule("0 * * * *", () => {
  runPaymentPenaltyCron();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route Registration
app.use("/api/contracts", contractRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dev", devRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/contracts", contractPdfRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/negotiation", negotiationRoutes);
app.use("/api/contracts", cultivationTrackingRoutes);
app.use("/api/updates", updatesRoutes);
app.use("/api/harvest-listings", harvestListingRoutes);
app.use("/api/harvest-contracts", harvestContractRoutes);
app.use("/api/cultivation-contracts", cultivationDeliveryRoutes);
app.use("/api/profile", profileMeRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", messageRoutes);
app.use("/api", disputeRoutes);

app.use("/api/admin", adminRoutes);

// Register AI Route
app.use("/api/ai", aiRoutes);

// Root & Health
app.get("/", (req, res) => res.send("FarmLink Contract API Running 🚜"));
app.get("/api/updates", getUpdates);
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message && err.message.includes("image")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Server error",
  });
});

module.exports = {
  app,
};

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
