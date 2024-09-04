const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)");
    db.run("CREATE TABLE services (id INTEGER PRIMARY KEY, user_id INTEGER, service TEXT, FOREIGN KEY(user_id) REFERENCES users(id))");
});

// Handle user signup
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    stmt.run(name, email, password);
    stmt.finalize();
    res.json({ message: 'Sign up successful!' });
});

// Handle user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (row) {
            req.session.userId = row.id;
            res.json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Handle service requests
app.post('/api/services', (req, res) => {
    const { userId, service } = req.body;
    const stmt = db.prepare("INSERT INTO services (user_id, service) VALUES (?, ?)");
    stmt.run(userId, service);
    stmt.finalize();
    res.json({ message: 'Service request submitted!' });
});

// Handle payments (dummy example)
app.post('/api/payment', (req, res) => {
    const { amount, paymentMethod } = req.body;
    // Process payment logic here
    res.json({ message: 'Payment processed!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
