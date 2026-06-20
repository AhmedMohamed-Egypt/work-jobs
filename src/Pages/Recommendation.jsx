import {
  Stack,
  Paper,
  Group,
  Text,
  Button,
  ActionIcon,
  MultiSelect,
  Select,
  TextInput,
  Textarea,
  TagsInput,
  Badge,
  Input,
  ThemeIcon,
  Checkbox,
} from "@mantine/core";
import ButtonDefault from "../UiCompoents/Button";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconBracesOff,
  IconBriefcase,
  IconCheck,
  IconChecklist,
  IconGripVertical,
  IconNote,
  IconPlus,
  IconSparkles,
} from "@tabler/icons-react";
import { useJob } from "../context/JobContext";
import { useEffect, useState } from "react";
import { list } from "postcss";
import DndListHandle from "../UiCompoents/DndListHandle";
import ModalMaintin from "../UiCompoents/ModalMaintin";
import TalentForgeJobCreation from "./TalentForgeJobCreation";
import { useGenerateJob } from "../hooks/FetchGenerateJob";
import JobPreview from "./JobPreview";

export default function Recommendation() {
  const { currentStep, setCurrentStep, jobData, setJobData } = useJob();
  const requiredSkills = jobData.basicInfo.skills;
  const [localSkills, setLocalSkills] = useState(requiredSkills);
  const [skills, setSkills] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { generateJob,jobDataAi,loading,error} = useGenerateJob();
   
  
const handleApplySuggestion = async () => {
  setOpenModal(true)
  
  await generateJob({
    title: jobData.basicInfo.title,
    skills: jobData.basicInfo.skills,
  });
  
};
const onGenerate=async()=>{
   await generateJob({
    title: jobData.basicInfo.title,
    skills: jobData.basicInfo.skills,
  });
}
  const handleSkillsChange = (index) => {
    setLocalSkills(index);
    setJobData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, skills: index },
    }));
  };
  const [value, setValue] = useState("");

  const addSkill = () => {
    const skillName = value.trim();

    if (!skillName) return;

    const exists = skills.some(
      (skill) => skill.name.toLowerCase() === skillName.toLowerCase(),
    );

    if (exists) return;

    const updatedSkills = [
      ...skills,
      {
        id: crypto.randomUUID(),
        name: skillName,
      },
    ];

    setSkills(updatedSkills);
    const setRequirementsSkils = updatedSkills.map((item) => item.name);

    setJobData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
      },
      requirements: {
        ...prev.requirements,
        criteria: [...setRequirementsSkils],
      },
    }));

    setValue("");
  };
  const removeSkill = (id) => {
    setSkills((prev) => prev.filter((item) => item.id !== id));
    const updatedSkills = skills
      .filter((item) => item.id !== id)
      .map((item) => item.name);

    setJobData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
      },

      requirements: {
        ...prev.requirements,
        criteria: [...updatedSkills],
      },
    }));
  };

  return (
    <Stack gap="lg" flex={1} ml={24}>
      <Paper withBorder p="lg" radius="md">
        <Group align="flex-start" gap="md">
          <ThemeIcon size={42} radius="md" color="indigo" variant="light">
            <IconSparkles size={20} />
          </ThemeIcon>

          <Stack gap={4} flex={1}>
            <Group>
              <div>
                <Text fw={600} size="lg">
                  AI Suggestions
                </Text>

                <Text size="sm" c="dimmed">
                  Generate recommended skills, experience requirements, and
                  candidate criteria based on the job title and level.
                </Text>
              </div>
              <ModalMaintin
                openVal={openModal}
                onClick={() => setOpenModal(false)}
                classes={{
                  content: "p-3",
                  header:
                    "!top-[15px] !p-0 !min-h-[auto] !absolute !right-[15px] ",
                  body: "!p-0",
                  content: "!relative !flex-1 !max-w-[50%]",
                }}
              >
                <div className="flex items-center pl-5 py-3">
                  <IconSparkles size={20} color="var(--violet)" />
                  <div className="ml-2">
                    <h2 className="font-bold font-manpore text-[20px] flex items-center">
                      <span>AI Suggestion</span>
                    </h2>
                    <p className="font-bold text-xsss font-manpore text-grey300">
                      Review Ai Suggestion and apply to your Job
                    </p>
                  </div>
                </div>
                <div>
                  <TalentForgeJobCreation onGenerate={onGenerate} jobDataAi={jobDataAi}  loading={loading} error={error} onClick={() => setOpenModal(false)} />
                </div>
              </ModalMaintin>

              <Button
                onClick={() => handleApplySuggestion()}
                leftSection={<IconSparkles size={16} />}
                bg="#EEF4FF"
                c="#2563EB"
                styles={{
                  root: {
                    border: "1px solid #C7D2FE",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    marginLeft: "auto",

                    "&:hover": {
                      backgroundColor: "#E0EAFF",
                    },
                  },
                }}
              >
                Apply Suggestions
              </Button>
            </Group>

            {/* Show after applying */}
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder p="lg" radius="md">
        <Group align="flex-start" gap="md">
          <ThemeIcon size={42} radius="md" color="blue" variant="light">
            <IconBookmark size={20} />
          </ThemeIcon>

          <Stack gap={2} flex={1}>
            <Text fw={600} size="lg">
              Required Skills
            </Text>

            <Text size="sm" c="dimmed">
              Skills candidates must have
            </Text>

            <TagsInput
              my={10}
              value={localSkills}
              onChange={(index) => handleSkillsChange(index)}
            />

            <Text size="xs" c="dimmed">
              Press Enter after each skill
            </Text>
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder p="lg" radius="md">
        <Group align="flex-start" gap="md">
          <ThemeIcon size={42} radius="md" color="green" variant="light">
            <IconBriefcase size={20} />
          </ThemeIcon>

          <Stack gap={2} flex={1}>
            <Text fw={600} size="lg">
              Experience
            </Text>

            <Text size="sm" c="dimmed">
              Minimum experience required for this role
            </Text>

            <Group mt="sm" align="flex-end">
              <Select
                flex={1}
                placeholder="Select experience"
                data={[
                  "No Experience",
                  "1+ Years",
                  "2+ Years",
                  "3+ Years",
                  "5+ Years",
                ]}
              />

              <Badge size="lg" radius="sm" color="green" variant="light">
                {jobData.basicInfo.experience}
              </Badge>
            </Group>
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder p="lg" radius="md">
        <Group align="flex-start" gap="md">
          <ThemeIcon size={42} radius="md" color="violet" variant="light">
            <IconChecklist size={20} />
          </ThemeIcon>

          <Stack gap="sm" flex={1}>
            <div>
              <Text fw={600} size="lg">
                Required Criteria
              </Text>

              <Text size="sm" c="dimmed">
                Define the key requirements candidates must meet
              </Text>
            </div>

            <Group align="flex-end">
              <Input
                flex={1}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. Strong JavaScript fundamentals"
              />

              <Button
                onClick={addSkill}
                leftSection={<IconPlus size={16} />}
                variant="default"
                styles={{
                  root: {
                    border: "1px solid #89787857",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
                    backgroundColor: "#fff",
                    color: "#000",

                    "&:hover": {
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
                    },
                  },
                }}
              >
                Add
              </Button>
            </Group>

            <DndListHandle
              items={skills}
              onChange={setSkills}
              onRemove={removeSkill}
              renderItem={(item) => (
                <Group justify="space-between" w="100%">
                  <Group gap="xs">
                    <IconGripVertical size={18} />
                    <Text>{item.name}</Text>
                  </Group>
                </Group>
              )}
            />
          </Stack>
        </Group>
      </Paper>

      <Paper withBorder p="lg" radius="md">
        <Group align="flex-start" gap="md">
          <ThemeIcon size={42} radius="md" color="orange" variant="light">
            <IconNote size={20} />
          </ThemeIcon>

          <Stack gap={2} flex={1}>
            <Text fw={600} size="lg">
              Notes for Candidates
            </Text>

            <Text size="sm" c="dimmed">
              Additional information applicants should know before applying
            </Text>

            <Textarea
              mt="sm"
              autosize
              minRows={4}
              placeholder={`Examples:
• Hybrid work schedule
• Occasional travel required
• Must be eligible to work in the country
• Flexible working hours`}
            />
          </Stack>
        </Group>
      </Paper>
     

      {/* Actions */}
      <div className="flex justify-between pt-6 items-center pb-5">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          classNames={{
            root: "!px-8",
            inner: "flex ",
            label: "order-5 text-black",
            section: "!m-0 !mr-1",
          }}
          bg="white"
          c="black"
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "white",
              },
            },
          }}
          rightSection={
            <IconArrowLeft size={18} style={{ order: 0, color: "#000" }} />
          }
        >
          Back
        </Button>

        <Button
          rightSection={<IconArrowRight size={18} />}
          radius="sm"
          color="dark"
          bg="#000"
          px={35}
        >
          Continue
        </Button>
      </div>
    </Stack>
  );
}
