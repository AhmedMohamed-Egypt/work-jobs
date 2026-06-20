import { useState } from "react";
import axios from "axios";
import { api } from "../api/axios";

export const useGenerateJob = () => {
  const [jobDataAi, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateJob = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Sending Payload:", payload);
      const response = await api.post(
        `/generate-job-suggestions`,
        payload
      );
      console.log("API Response:", response.data);
      setJobData(response.data);

      return response.data;
    } catch (err) {
      console.error("Generate Job Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to generate job"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateJob,
    jobDataAi,
    loading,
    error,
  };
};