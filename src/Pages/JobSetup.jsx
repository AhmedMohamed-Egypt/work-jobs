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

import { useJob } from "../context/JobContext";
import { usePostJobInfo } from "../hooks/usePostJobInfo";
import { useEffect, useRef, useState } from "react";

function JobSetup() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { jobData, setJobData } = useJob();
  const { loading, cities } = useCities();
  const { submitJob } = usePostJobInfo();
  const { setCurrentStep } = useJob();
  const navigate = useNavigate();

  // =========================
  // REFS
  // =========================
  const controllerRef = useRef(null);
  const stopRef = useRef(false);
  const thinkingIntervalRef = useRef(null);

  // =========================
  // SYNC LAYER (🔥 IMPORTANT)
  // =========================
  const syncField = (field, value) => {
    form.setFieldValue(field, value);

    setJobData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value,
      },
    }));
  };

  // =========================
  // FORM
  // =========================
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
      Location: (value) => (!value ? "Please Select Location" : null),
      deadline: (value) =>
        !value ? "Please select application deadline" : null,
    },
  });

  // =========================
  // AI THINKING ANIMATION
  // =========================
  const startThinkingAnimation = () => {
    const frames = ["Generating", "Generating.", "Generating..", "Generating..."];
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

  // =========================
  // AI TYPE EFFECT (SYNCED)
  // =========================
 const typeText = async (text) => {
  stopRef.current = false;

  form.setFieldValue("description", "");

  for (let i = 0; i < text.length; i++) {
    if (stopRef.current) return;

    form.setFieldValue("description", text.slice(0, i + 1));

    await new Promise((r) => setTimeout(r, 5));
  }

  setErrorMessage(null);
};

  // =========================
  // GENERATE AI
  // =========================
  const generateText = async () => {
    if (isGenerating) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    stopRef.current = false;
    setIsGenerating(true);

    startThinkingAnimation();

    try {
      const response = await submitJob({
        signal: controller.signal,
      });

      const generatedText = response.data.description;

      stopThinkingAnimation();

      await typeText(generatedText);
      syncField("description", generatedText);
    } catch (err) {
      stopThinkingAnimation();
      stopRef.current = true;

      if (err.name !== "AbortError") {
        setErrorMessage(
          err?.response?.status === 429
            ? "Too many requests. Please wait and try again."
            : "Something went wrong. Please try again."
        );

        setTimeout(() => setErrorMessage(null), 4000);
      }
    } finally {
      setIsGenerating(false);
      controllerRef.current = null;
    }
    
  };

  const stopGeneration = () => {
    controllerRef.current?.abort();
    stopRef.current = true;
    stopThinkingAnimation();
    setIsGenerating(false);
  };

  const handleAIAction = () => {
    if (isGenerating) stopGeneration();
    else generateText();
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (values) => {
    setJobData((prev) => ({
      ...prev,
      basicInfo: values,
    }));

    setCurrentStep(1);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="bg-white rounded-xl border border-grey100 pt-3 mx-2 w-3xl max-w-full mx-[15px]">
      <div className="max-w-3xl mx-auto p-1">
        <div className="p-1 px-3">
          <div className="mb-5">
            <h1 className="text-3xl font-semibold">Job Setup</h1>
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
              value={form.values.title}
              onChange={(e) => syncField("title", e.target.value)}
              error={form.errors.title}
            />

            <Select
              label="Category"
              data={[
                "Development",
                "Design",
                "Marketing",
                "AI & Machine Learning",
              ]}
              value={form.values.category}
              onChange={(v) => syncField("category", v)}
            />

            <Autocomplete
              label="Location"
              data={!loading ? cities : []}
              value={form.values.Location}
              onChange={(v) => syncField("Location", v)}
            />

            <Select
              label="Experience Level"
              data={["junior", "mid", "senior", "Lead"]}
              value={form.values.experience}
              onChange={(v) => syncField("experience", v)}
            />

            <TextInput
              label="Salary / Budget"
              value={form.values.salary}
              onChange={(e) => syncField("salary", e.target.value)}
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
              value={form.values.skills}
              onChange={(v) => syncField("skills", v)}
            />

            <DateInput
              label="Application Deadline"
              valueFormat="DD MMM YYYY"
              value={form.values.deadline}
              onChange={(v) => syncField("deadline", v)}
            />

            <Box pos="relative">
              <Textarea
                label="Job Description"
                minRows={6}
                autosize
                radius="sm"
                value={form.values.description}
                onChange={(e) =>
                  syncField("description", e.currentTarget.value)
                }
              />

              <Button
                onClick={handleAIAction}
                className={classes.aiButton}
                variant={isGenerating ? "dark" : "light"}
                leftSection={<IconSparkles size={14} />}
              >
                {isGenerating ? "Stop" : "Generate with AI"}
              </Button>

              {errorMessage && (
                <div style={{ color: "red", fontSize: 12, marginTop: 8 }}>
                  {errorMessage}
                </div>
              )}
            </Box>

            <div className="flex justify-between pt-6 items-center pb-5">
              <Button variant="default" radius="sm" px={40}>
                Save Draft
              </Button>

              <Button
                rightSection={<IconArrowRight size={18} />}
                type="submit"
                radius="sm"
                color="dark"
                px={35}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobSetup;