const express = require('express'); 
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db_config');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secure_admin_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Dummy admin user
const adminUser = {
    username: 'Emmanuel',
    password: bcrypt.hashSync('password123', 10)
};

// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUser.username) {
        bcrypt.compare(password, adminUser.password, (err, result) => {
            if (result) {
                req.session.user = adminUser.username;
                return res.send({ message: "Login successful" });
            } else {
                return res.status(401).send({ message: "Invalid password" });
            }
        });
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

// Admin logout route
app.post('/api/admin/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ message: "Logout failed" });
        res.send({ message: "Logged out successfully" });
    });
});

// Secure admin route example
app.get('/api/admin/protected', (req, res) => {
    if (req.session.user) {
        res.send("This is protected data.");
    } else {
        res.status(403).send({ message: "Not authenticated" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
