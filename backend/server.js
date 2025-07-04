const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
require("dotenv").config();
const connectdb = require("./config/db");
const visitor = require("./routes/VisitorRoutes.js");
const paymentSuccess = require("./routes/payment-success.js");
const AdminAuth = require("./routes/AdminAuth.js");
const Uploads = require("./routes/UploadRoute.js");
const Products = require("./routes/ProductRoute.js");
const mail = require("./routes/Email.js");

const errorHandler = require("./middleware/Errorhandler.js");
dotenv.config();
connectdb();

const app = express();  // Initialize express
app.set('trust proxy', 1);

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // For development
  "http://localhost:3001",
  "http://192.168.103.20:3000", // For local network access
  "https://mcbotique.site", // Production URL
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin:", origin); // Log the origin to check the requests
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', '*'],
  credentials: true, // Allow cookies or credentials if necessary
}));

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.use(mongoSanitize());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// Rate Limiting to Prevent Abuse
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
}));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log full error
  res.status(500).send({ success: false, message: err.message });
});

// Routes
app.use("/api/admin", AdminAuth); // Admin Auth routes
app.use("/api/visitors", visitor); // Only authenticated users can track visitors
app.use("/api/payments", paymentSuccess); // Payment routes
app.use("/api/upload", Uploads); // Image upload route
app.use("/api/products", Products); // Product routes
app.use('/api/contact', mail); // Contact form route

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Terminating server...");
  process.exit(0);
});

// Listen on the Defined Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
