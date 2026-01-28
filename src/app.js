import express from "express";
import dotenv from "dotenv";
import myRoutes from "./routers/myrouter.routes.js";
import userRoutes from "./routers/user.routes.js";
import productRoutes from "./routers/product.routes.js";
import { connectDb } from "./config/db.js";

dotenv.config();


const app = express();

app.use(express.json());

connectDb();
app.use('/api',myRoutes);
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);

app.get("/health",(req,res)=>{
    res.status(200).json({ message:"App health is ok"});
})

export default app;
