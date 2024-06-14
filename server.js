const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rental-app', { useNewUrlParser: true, useUnifiedTopology: true });

// User model
const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// Middleware for authentication
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

// Registration endpoint
app.post('/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    res.header('x-auth-token', token).send({ email: user.email });
});

// Login endpoint
app.post('/auth', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    res.send(token);
});

// Protected route example
app.get('/book', auth, (req, res) => {
    res.send('This is a protected route.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
