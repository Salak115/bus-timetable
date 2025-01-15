const express = require('express');
const db = require('../db_config');
const router = express.Router();

// Add a new class schedule
router.post('/add', (req, res) => {
    const { course_name, room, day_of_week, start_time, end_time } = req.body;
    const sqlQuery = "INSERT INTO timetable (course_name, room, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlQuery, [course_name, room, day_of_week, start_time, end_time], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Class schedule added successfully!");
    });
});

// Delete a class schedule by ID
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sqlQuery = "DELETE FROM timetable WHERE id = ?";
    db.query(sqlQuery, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Class schedule deleted successfully!");
    });
});

// Fetch all schedules (for admin view)
router.get('/schedules', (req, res) => {
    const sqlQuery = "SELECT * FROM timetable";
    db.query(sqlQuery, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
