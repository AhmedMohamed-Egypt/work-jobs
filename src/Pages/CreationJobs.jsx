import { useState } from "react";
import Header from "../components/Header";
import GreyContainer from "../UiCompoents/GreyContainer";
import JobSetup from "./JobSetup";
import Recommendation from "./Recommendation";
import { useJob } from "../context/JobContext";
import JobPreview from "./JobPreview";


const list = [
  { title: "Job Basic", txt: "Add title,categorey and description" },
  { title: "Requirements", txt: "Add skills and experience" },
  { title: "Budget and Timeline", txt: "Set budget and project timeline" },
  { title: "Preview", txt: "Review your job post" },
  { title: "Publish", txt: "Publish or save as draft" },
];



function CreationJobs() {
const { currentStep, setCurrentStep,jobData} = useJob();
const {   Location,category,deadline,description,experience,salary,skills ,title} = jobData.basicInfo



  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <>
      <div className="container mx-auto pt-4">
        <Header />
      </div>

      <GreyContainer>
        <section className="creatinJobsPage pb-5">
          <div className=" container mx-auto ">
            <div className="flex">
              {/*left side*/}
              <div className="bg-white rounded-xl border border-grey100 pt-3 ">
                <h3 className="px-4 font-inter font-bold text-[18px] mb-2">
                  Create New Job
                </h3>
                <ul>
                  {list.map((item, index) => (
                    <li key={index} className="mb-4 cursor-pointer">
                      <div
                        className={`relative after:content-[''] after:absolute  after:bg-black after:left-0 after:bottom-0 after:h-full     pr-6 pl-3  py-3 flex items-start ${
                          index === currentStep ? "bg-[#f8f9fa] after:w-[2px]" : ""
                        }`}
                      >
                        <span className="font-medium mr-2 block w-[30px] h-[30px] rounded-full bg-black text-white flex flex-col items-center justify-center text-xs1]">
                          {index + 1 }
                        </span>

                        <p className="font-inter font-medium">
                          <span className="block  text-[15px]">
                            {item.title}
                          </span>
                          <span className="block text-[12px] translate-y-[-2px] font-normal text-sm text-gray-600">
                            {currentStep===(index+1)?'Completed':item.txt}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-16 bg-[#fafafa] border border-gray-200 rounded-2xl p-3 w-[90%] mx-auto mb-5">
                  <h3 className="font-semibold text-base">Need Help?</h3>

                  <p className="text-sm text-gray-500 my-1 mb-3">
                    Our team is here to help you.
                  </p>

                  <button className="cursor-pointer border border-black-300 rounded-[10px] px-3 py-[6px] font-semibold hover:bg-gray-100 transition">
                    Contact Support
                  </button>
                </div>
              </div>

              {/*Form*/}
              {currentStep===0&& <JobSetup/>}
               {currentStep===1&& <Recommendation/>}
              
                <JobPreview dataPreview = {{Location,category,deadline,description,experience,salary,skills ,title}}/>
               
              
            
             
            </div>
          </div>
        </section>
      </GreyContainer>
    </>
  );
}

export default CreationJobs;
