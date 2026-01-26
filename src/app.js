import express from "express";
import dotenv from "dotenv";
import myRoutes from "./routers/myrouter.routes.js";
import userRoutes from "./routers/user.routes.js";
import { connectDb } from "./config/db.js";

dotenv.config();


const app = express();

app.use(express.json());

connectDb();
app.use('/api',myRoutes);
app.use('/api/users',userRoutes);

app.get("/health",(req,res)=>{
    res.status(200).json({ message:"App health is ok"});
})

export default app;
