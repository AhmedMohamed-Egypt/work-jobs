import { useForm } from "@mantine/form";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { useCities } from "../hooks/FetchCities";
import classes from "./form.module.css";
import {
  TextInput,
  Textarea,
  Select,
  Button,
  MultiSelect,
  Box,
  Autocomplete,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GreyContainer from "../UiCompoents/GreyContainer";
import { useJob } from "../context/JobContext";
import { usePostJobInfo } from "../hooks/usePostJobInfo";
import { useEffect, useRef, useState } from "react";

const list = [
  { title: "Job Basic", txt: "Add title,categorey and description" },
  { title: "Requirements", txt: "Add skills and experience" },
  { title: "Budget and Timeline", txt: "Set budget and project timeline" },
  { title: "Preview", txt: "Review your job post" },
  { title: "Publish", txt: "Publish or save as draft" },
];

function CreationJobs() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const { jobData, setJobData } = useJob();
  const { loading, cities } = useCities();
  const { submitJob } = usePostJobInfo();
  const navigate = useNavigate();

  // =========================
  // REFS + STATE (ONLY LOGIC)
  // =========================
  const controllerRef = useRef(null);
  const stopRef = useRef(false);
  const thinkingIntervalRef = useRef(null);
  const startThinkingAnimation = () => {
    const frames = [
      "Generating",
      "Generating.",
      "Generating..",
      "Generating...",
    ];

    let i = 0;

    thinkingIntervalRef.current = setInterval(() => {
      form.setFieldValue("description", frames[i % frames.length]);
      i++;
    }, 400);
  };
  const stopThinkingAnimation = () => {
    clearInterval(thinkingIntervalRef.current);
    thinkingIntervalRef.current = null;
  };

  const form = useForm({
    initialValues: jobData.basicInfo,

    validate: {
      title: (value) =>
        value.length < 5 ? "Job title must be at least 5 characters" : null,

      category: (value) => (!value ? "Please select category" : null),

      description: (value) =>
        value.length < 30 ? "Description must be at least 30 characters" : null,

      experience: (value) => (!value ? "Please select experience level" : null),

      salary: (value) => (!value ? "Salary is required" : null),

      skills: (value) =>
        value.length < 2 ? "Please add at least 2 skills" : null,

      Location: (value) => (value.length < 1 ? "Please Select Location" : null),

      deadline: (value) =>
        !value ? "Please select application deadline" : null,
    },
  });

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = (values) => {
    setJobData((prev) => ({
      ...prev,
      basicInfo: values,
    }));
  };

  // =========================
  // TYPING EFFECT (LOGIC ONLY)
  // =========================
  const typeText = async (text) => {
    stopRef.current = false;

    form.setFieldValue("description", "");

    for (let i = 0; i < text.length; i++) {
      if (stopRef.current) return;

      form.setFieldValue("description", text.slice(0, i + 1));

      await new Promise((r) => setTimeout(r, 5)); // faster feel
    }
    setErrorMessage(null);
  };

  // =========================
  // GENERATE AI TEXT (LOGIC ONLY)
  // =========================
  const resetGenerationState = () => {
    setErrorMessage(null); // 🔥 clear old error immediately
    controllerRef.current = null;
    stopRef.current = false;
    setIsGenerating(false);
    setIsStopping(false);
  };
  const generateText = async () => {
    if (isGenerating || isStopping) return;
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    stopRef.current = false;

    setIsGenerating(true);

    // 🔥 IMPORTANT: start animation BEFORE API
    startThinkingAnimation();

    try {
      const response = await submitJob({
        signal: controller.signal,
      });

      const generatedText = response.data.description;

      // 🔥 stop animation BEFORE typing
      stopThinkingAnimation();

      await typeText(generatedText);
    } catch (err) {
      stopThinkingAnimation();
      stopRef.current = true;
      setIsGenerating(false);

      if (err.name === "AbortError") return;

      if (err?.response?.status === 429) {
        setErrorMessage("Too many requests. Please wait and try again.");

        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);

        return;
      }

      setErrorMessage("Something went wrong. Please try again.");

      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    } finally {
      setIsGenerating(false);
      stopRef.current = true;
      controllerRef.current = null;
    }
  };

  // =========================
  // STOP GENERATION (LOGIC ONLY)
  // =========================
  const stopGeneration = () => {
    controllerRef.current?.abort();
    stopRef.current = true;

    stopThinkingAnimation(); // 🔥 ADD THIS

    setIsGenerating(false);
  };
  const handleAIAction = () => {
    if (isGenerating) {
      stopGeneration();
    } else {
      generateText();
    }
  };

  useEffect(() => {
    console.log("GENERATING:", isGenerating);
  }, [isGenerating]);

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <>
      <div className="container mx-auto pt-4">
        <Header />
      </div>

      <GreyContainer>
        <section className="creatinJobsPage">
          <div className=" container mx-auto ">
            <div className="flex">
              {/*right side*/}
              <div className="bg-white rounded-xl border border-grey100 pt-3 ">
                <h3 className="px-4 font-inter font-bold text-[18px] mb-2">
                  Create New Job
                </h3>
                <ul>
                  {list.map((item, index) => (
                    <li key={index} className="mb-4 cursor-pointer">
                      <div
                        className={`relative after:content-[''] after:absolute  after:bg-black after:left-0 after:bottom-0 after:h-full     pr-6 pl-3  py-3 flex items-start ${
                          index === 0 ? "bg-[#f8f9fa] after:w-[2px]" : ""
                        }`}
                      >
                        <span className="font-medium mr-2 block w-[30px] h-[30px] rounded-full bg-black text-white flex flex-col items-center justify-center text-[16px]">
                          {index + 1}
                        </span>

                        <p className="font-inter font-medium">
                          <span className="block  text-[15px]">
                            {item.title}
                          </span>
                          <span className="block text-[12px] translate-y-[-2px] font-normal text-sm text-gray-600">
                            {item.txt}
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
              <div className="bg-white rounded-xl border border-grey100 pt-3 mx-2 w-[800px] max-w-full">
                <div className="max-w-3xl mx-auto p-1">
                  <div className="p-1">
                    <div className="mb-5">
                      <h1 className="text-3xl font-semibold font-inter">
                        <span className="block">Job Setup </span>
                      </h1>

                      <p className="text-gray-500 mt-2">
                        Fill all required information to publish your job.
                      </p>
                    </div>

                    <form
                      onSubmit={form.onSubmit(handleSubmit)}
                      className={`space-y-6 flex flex-wrap ${classes.form} justify-between`}
                    >
                      <TextInput
                        label="Job Title"
                        {...form.getInputProps("title")}
                      />

                      <Select
                        label="Category"
                        data={[
                          "Development",
                          "Design",
                          "Marketing",
                          "AI & Machine Learning",
                        ]}
                        {...form.getInputProps("category")}
                      />

                      <Autocomplete
                        {...form.getInputProps("Location")}
                        data={!loading ? cities : ""}
                        label="Location"
                      />

                      <Select
                        label="Experience Level"
                        data={["Junior", "Mid-Level", "Senior", "Lead"]}
                        {...form.getInputProps("experience")}
                      />

                      <TextInput
                        label="Salary / Budget"
                        {...form.getInputProps("salary")}
                      />

                      <MultiSelect
                        label="Required Skills"
                        searchable
                        data={[
                          "React",
                          "Next.js",
                          "TypeScript",
                          "Tailwind CSS",
                          "Node.js",
                          "MongoDB",
                        ]}
                        {...form.getInputProps("skills")}
                      />

                      <DateInput
                        label="Application Deadline"
                        valueFormat="DD MMM YYYY"
                        {...form.getInputProps("deadline")}
                      />

                      {/* Description */}

                      <Box pos="relative">
                        <Textarea
                          label="Job Description"
                          minRows={6}
                          autosize
                          radius="sm"
                          {...form.getInputProps("description")}
                        />

                        <Button
                          onClick={handleAIAction}
                          className={classes.aiButton}
                          variant={isGenerating ? "dark" : "light"}
                          leftSection={<IconSparkles size={14} />}
                        >
                          {isGenerating ? "Stop" : "Generate with AI"}
                        </Button>

                        {/* 🔴 ERROR MESSAGE HERE (BEST PLACE) */}
                        {errorMessage && (
                          <div
                            style={{ color: "red", fontSize: 12, marginTop: 8 }}
                          >
                            {errorMessage}
                          </div>
                        )}
                      </Box>

                      {/* Actions */}
                      <div className="flex justify-between pt-6 items-center pb-5">
                        <Button variant="default" radius="sm" px={40}>
                          Save Draft
                        </Button>

                        <Button
                          rightSection={<IconArrowRight size={18} />}
                          type="submit"
                          radius="sm"
                          color="dark"
                          bg="#000"
                          px={35}
                        >
                          Continue
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </GreyContainer>
    </>
  );
}

export default CreationJobs;
