const jwt = require("jsonwebtoken");
const express = require("express");
const db = require("../db_config");
// const protected = require('../server');
const router = express.Router();
const adminProtected = require("../adminprotected");
// import { adminProtected } from '../server';

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to add schedules",
      });
    }
    req.user = decoded; // Attach decoded user data to request
    next();
  });
};

// Add a new class schedule
router.post("/add", isAuthenticated, adminProtected, (req, res) => {
  const { bus_name, day, start_time, end_time } = req.body;

  if (!bus_name || !day || !start_time || !end_time) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const sqlQuery =
    "INSERT INTO timetable (bus_name, day, start_time, end_time) VALUES (?, ?, ?, ?)";
  db.query(sqlQuery, [bus_name, day, start_time, end_time], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Class schedule added successfully!" });
  });
});

// Delete a class schedule by ID
router.delete("/delete/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const sqlQuery = "DELETE FROM timetable WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "schedule deleted successfully" });
  });
});

// Fetch all schedules (for admin view)
router.get("/schedules", (req, res) => {
  const sqlQuery = "SELECT * FROM timetable";
  db.query(sqlQuery, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
