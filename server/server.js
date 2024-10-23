const express = require("express");
const connectDb = require("./config/dbConnection");
//error handling middleware
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.port || 5000;

app.set('view engine', 'hbs');
app.use(express.json);
app.use(cors());
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("working");
});

app.get("/home", (req, res) => {
    res.render("home")
})

app.get("alluser", (req, res) => {
    res.render("users", {
        users: [{
            id: 1, username: "nitesh",age: 23},
            { id: 1, username: "akash", age: 24 }]
    })
})

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
});