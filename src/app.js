import express from "express";
import myRoutes from "./routers/myrouter.routes.js";
const app = express();

app.use(express.json());

app.use('/api',myRoutes);

app.get("/health",(req,res)=>{
    res.status(200).json({ message:"App health is ok"});
})

export default app;
