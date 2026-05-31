// context/JobContext.jsx

import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobData, setJobData] = useState({
    Location: "",
    category: "",
    deadline: "",
    description: "",
    experience: "",
    salary: "",
    skills: [],
    title: "",
  });

  return (
    <JobContext.Provider
      value={{
        jobData,
        setJobData,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  return useContext(JobContext);
}
