// hooks/usePostJobInfo.js
import axios from "axios";
import { useJob } from "../context/JobContext";
export const usePostJobInfo = () => {
  const { jobData } = useJob();
  const submitJob = async () => {
    const response = await axios.post(
      "http://localhost:5000/createJob",
      jobData
    );
    return response;
  };
  return { submitJob };
};