import express from "express";
import cors from "cors";
import review from "./routes/review.js";
import { config } from 'dotenv';
config({ path: './config.env' }); // Load config

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/review", review);

app.listen(PORT, () => {console.log("Server running on port: " + PORT)})