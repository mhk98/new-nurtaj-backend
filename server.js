const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
require("./models"); // Your database models (e.g., Sequelize models)
require("dotenv").config();
const routes = require('./app/routes'); // Import your routes
const ApiError = require("./error/ApiError");


const app = express();

// Apply CORS Middleware
// app.use(cors({
//   origin: ['https://insaniat.xyz/'],
//   credentials: true
// }));

app.use(cors({ origin: true, credentials: true }));

// Express built-in middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static image folder
app.use("/media", express.static("media"));

// Main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API routes
app.use("/api/v1", routes);

// Catch-all route for handling API not found
app.use((req, res) => {
  res.status(404).json({ error: "API not found" });
});

// // Global Error Handler Middleware
// app.use((err, req, res, next) => {
//   console.error(err);  // Log the error for debugging
  
//   // Check if the error is an instance of ApiError
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode || 500).json({
//       message: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined  // Only include stack trace in development
//     });
//   }

//   // If it's any other error, respond with a generic server error
//   res.status(500).json({
//     message: "Internal Server Error",
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // Avoid exposing stack trace in production
//   });
// });


// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      // Optionally include stack trace if it's an internal error
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // For unexpected errors, return a generic message
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// Server setup
const port = process.env.PORT || 5001; // Use environment variable if available
const server = http.createServer(app);

// Start listening
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
