const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");
const cors=require("cors");

const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app=express();
const port=process.env.port || 5000;

app.use(express.json);
app.use(cors());
app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("working");
});

app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
});