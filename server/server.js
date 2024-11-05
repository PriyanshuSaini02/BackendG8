const express = require("express");
const connectDb = require("./config/dbConnection.js");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require('path');
const dotenv = require("dotenv").config();
const multer = require('multer');

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Make sure 'uploads' folder exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize Multer with disk storage configuration
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send("Working");
});

app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/doctor', require('./routes/doctorDetailRoutes'));

app.get('/home', (req, res) => {
    res.render("home", {
        title: "Dynamic Home Page",
        message: "Welcome to the dynamic home page!",
        user: {
            name: "John Doe",
            age: 30
        }
    });
});

app.get('/allusers', (req, res) => {
    const users = [
        { name: "John Doe", age: 30, email: "johndoe@example.com", role: "Admin" },
        { name: "Jane Smith", age: 25, email: "janesmith@example.com", role: "User" },
        { name: "Alice Johnson", age: 28, email: "alicejohnson@example.com", role: "Moderator" }
    ];
    res.render('users', { users });
});

// Route for single file upload
app.post('/profile', upload.single('avatar'), (req, res, next) => {
    if (req.file) {
        console.log(req.file);
        return res.status(200).json({ message: "File uploaded successfully", file: req.file });
    }
    res.status(400).json({ message: "File upload failed" });
});

// Route for multiple file upload
app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
    if (req.files) {
        console.log(req.files);
        return res.status(200).json({ message: "Files uploaded successfully", files: req.files });
    }
    res.status(400).json({ message: "File upload failed" });
});

// File download route
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            return res.status(404).json({ message: "File not found" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
