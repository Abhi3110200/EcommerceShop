import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/auth.route.js'

const app = express();

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);

 
const PORT = ENV.PORT;

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../admin/dist")));
    
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
}

const startServer = async ()=>{
    await connectDB();
    app.listen(ENV.PORT, ()=>{
        console.log('Server is up and running');
    })
}

startServer();
