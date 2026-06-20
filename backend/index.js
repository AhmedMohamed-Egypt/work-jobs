import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { generateJobDescription } from "./createJob.js";
import { generateJobAi } from "./generate-job-suggestions.js";
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
{
  /*generateJobDescription*/
}
app.post("/createJob",generateJobDescription, (req, res) => {
  console.log(res);
  res.status(201).json({
    success: true,
    message: "Job received",
  });
});
app.post("/generate-job-suggestions",generateJobAi,(req,res)=>{
  console.log(res)
   res.status(201).json({
    success: true,
    message: "prompt  received",
  });

})

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
