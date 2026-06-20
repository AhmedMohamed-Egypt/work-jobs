// context/JobContext.jsx

import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobData, setJobData] = useState({
    basicInfo: {
      Location: "",
      category: "",
      deadline: "",
      description: "",
      experience: "",
      salary: "",
      skills: [],
      title: "",
    },
    requirements: {
     
    },
    benefits: {},
    screeningQuestions: {},
  }
  
);
const [currentStep,setCurrentStep] = useState(0)

  return (
    <JobContext.Provider
      value={{
        jobData,
        setJobData,
        currentStep,
        setCurrentStep

      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  return useContext(JobContext);
}
