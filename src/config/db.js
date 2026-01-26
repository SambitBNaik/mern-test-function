import mongoose from "mongoose";


export const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected ${conn.connection.host}`);
    } catch (error) {
        console.error("Error in connecting to MONGODB", error.message);
        process.exit(1);
    }
}