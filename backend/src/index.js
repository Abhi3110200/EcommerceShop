import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();

 
const PORT = ENV.PORT;

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../admin/dist")));
    
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

