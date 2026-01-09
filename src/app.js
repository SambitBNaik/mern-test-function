import express from "express";

const app = express();


app.get("/health",(req,res)=>{
    res.status(200).json({ message:"App health is ok"});
})

export default app;
