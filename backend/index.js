import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { generateJobDescription } from "./createJob.js";





const app = express();



app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server running");
});

app.get("/test", (req, res) => {
  res.json({
    message: "API working successfully",
  });
});
app.post("/createJob", generateJobDescription);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});