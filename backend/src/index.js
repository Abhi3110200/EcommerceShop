import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

const __dirname = path.resolve();

 
const PORT = ENV.PORT;

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../admin/dist")));
    
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT} in ${ENV.NODE_ENV} mode`);
});

