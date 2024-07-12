const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();
const path = require('path');

const app = express(); // Initialize Express app properly

console.log('MONGOOSE_URL:', process.env.MONGOOSE_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoDBConnectingString = process.env.MONGOOSE_URL;

mongoose.connect(mongoDBConnectingString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected...");
}).catch(err => {
    console.log('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // required: true
    }
});

const User = mongoose.model("User", userSchema); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); 
});

app.post('/submit', async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = new User({ username, email });
        await newUser.save();
        console.log('User saved successfully:', newUser);
        res.sendFile(path.join(__dirname, "about.html")); 
    }
    catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send("Error saving user data.");
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send("Error fetching users data.");
    }
});

app.use((req, res, next) => {
    res.status(404).send("Sorry, we couldn't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
