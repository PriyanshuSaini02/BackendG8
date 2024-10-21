const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");
const cors=require("cors");

connectDb();
const app=express();
const port=process.env.port || 5000;

app.use(express.js);

app.get('/',(req,res)=>{
    res.send("working");
});
app.use(cors());

app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
});