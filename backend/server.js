const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("./db_config");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Added for parsing cookies

const app = express();

app.use(cookieParser());

const uni = require("./routes/admin");
const { response } = require("./adminprotected");

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // Adjust maxAge for 1 day
  })
);

// Dummy admin user
const adminUser = {
  username: "Emmanuel",
  role: "admin",
  password: bcrypt.hashSync("password123", 10),
};

// Middleware to verify JWT token

// Function to send token
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(user, "your_secret_key", { expiresIn: "1h" }); // Token valid for 1 hour
  console.log("Generated Token:", token);

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Login successful",
    user,
    token,
  });
};

// Admin login route
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required" });
  }

  if (username !== adminUser.username) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, adminUser.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  }

  sendToken(adminUser, 200, res);
});

// Admin logout route
app.post("/api/admin/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "You have logged out successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin routes
app.use("/", uni);

// Server listening
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
