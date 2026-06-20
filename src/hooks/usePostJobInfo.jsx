// hooks/usePostJobInfo.js
import { api } from "../api/axios";

import axios from "axios";
import { useJob } from "../context/JobContext";
export const usePostJobInfo = () => {
  const { jobData } = useJob();
  const submitJob = async () => {
    const response = await api.post(
      '/createJob',
      jobData
    );
    return response;
  };
  return { submitJob };
};