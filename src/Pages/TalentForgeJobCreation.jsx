import React, { useEffect, useState } from "react";
import {
  AppShell,
  Group,
  Button,
  Text,
  Title,
  Stepper,
  TextInput,
  Stack,
  Badge,
  ActionIcon,
  Grid,
  Card,
  Divider,
  Modal,
  Avatar,
  Box,
  rem,
  Container,
  Paper,
  UnstyledButton,
  List,
} from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconSparkles,
  IconMapPin,
  IconClock,
  IconArrowRight,
  IconReload,
  IconX,
  IconChevronRight,
  IconSun,
  IconBell,
} from "@tabler/icons-react";
import { useGenerateJob } from "../hooks/FetchGenerateJob";
import SpinLoader from "../UiCompoents/SpinLoader";
import { useJob } from "../context/JobContext";

const TalentForgeJobCreation = ({ onClick, jobDataAi, loading, error,onGenerate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [modalOpened, setModalOpened] = useState(true);
  const [gneratedDataAi, setGeneratedAi] = useState({});
  const { generateJob } = useGenerateJob();
  const { jobData } = useJob();
  const skills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
  ];
  const aiSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "REST API",
    "Git",
    "Redux",
  ];
  const dataFromAi = jobDataAi?.data;
  const titleAi = dataFromAi?.title;
  const requirmentsAi = dataFromAi?.requirements;
  const jobDescriptionFromAi = dataFromAi?.jobDescription;
  const skillsfromAi = dataFromAi?.skills;
  const handleApplyAll = () => {
    setGeneratedAi({
      title: titleAi,
      requirments: requirmentsAi,
      jobDescriptionAi: jobDescriptionFromAi,
      skillFromAi: skillsfromAi,
    });
  };
  const handleGenerate = async () => {
    console.log(5)
    await generateJob({
      title: jobData.basicInfo.title,
      skills: jobData.basicInfo.skills,
    });
  };
  useEffect(() => {
    console.log(gneratedDataAi);
  }, [gneratedDataAi]);

  const AiSuggestComponent = () => {
    if (loading) return <SpinLoader />;
    if (error) {
      return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
      <Grid.Col>
        <Paper withBorder radius="md" p="xl" bg="#FAFBFC">
          <Group justify="space-between" mb="lg">
            <Text fw={700} size="sm">
              AI Suggested Content
            </Text>
            <Badge fw={500} color="green" variant="light" radius="sm" tt="none">
              AI Generated
            </Badge>
          </Group>

          <Stack gap="md">
            <Box>
              <Text size="xs" fw={500} c="dimmed" mb={4}>
                Job Title
              </Text>
              <Text fw={500} size="sm">
                {titleAi}
              </Text>
            </Box>

            <Box>
              <Text size="xs" fw={500} c="dimmed" mb={4}>
                Job Description
              </Text>
              <Text size="sm" lh={1.5}>
                {jobDescriptionFromAi}
              </Text>
            </Box>

            <Box>
              <Text size="xs" fw={500} c="dimmed" mb={8}>
                Skills
              </Text>
              <Group gap={6}>
                {skillsfromAi.map((skill) => (
                  <Badge
                    key={skill}
                    fw={500}
                    variant="light"
                    color="teal"
                    size="sm"
                    radius="sm"
                    tt="none"
                  >
                    {skill}
                  </Badge>
                ))}
              </Group>
            </Box>

            <Box>
              <Text size="xs" fw={500} c="dimmed" mb={8}>
                Requirements
              </Text>
              <List listStyleType="decimal" start={1}>
                {requirmentsAi.map((req, i) => (
                  <List.Item key={i}>{req}</List.Item>
                ))}
              </List>
            </Box>
          </Stack>
        </Paper>
      </Grid.Col>
    );
  };

  return (
    <AppShell header={{ height: 64 }} padding="md" bg="">
      <Box p={24}>
        <Grid gutter="xl">
          {/* AI Suggested Content */}

          <div className="w-[50%] flex flex-col justify-center items-center">
            <AiSuggestComponent />
          </div>

          {/* Current Content */}
          <Grid.Col span={6} ml={"auto"}>
            <Paper withBorder radius="md" p="xl">
              <Text fw={700} size="sm" mb="lg">
                Current Content
              </Text>

              <Stack gap="md">
                <Box>
                  <Text size="xs" fw={500} c="dimmed" mb={4}>
                    Job Title
                  </Text>
                  <Text fw={500} size="sm">
                    {jobData.basicInfo.title}
                  </Text>
                </Box>

                <Box>
                  <Text size="xs" fw={500} c="dimmed" mb={4}>
                    Job Description
                  </Text>
                  <Text size="sm" lh={1.5}>
                  {jobData.basicInfo.description}
                  </Text>
                </Box>

                <Box>
                  <Text size="xs" fw={500} c="dimmed" mb={8}>
                    Skills
                  </Text>
                  <Group gap={6}>
                    {jobData.basicInfo.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="light"
                        color="indigo"
                        size="sm"
                        radius="sm"
                        tt="none"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </Group>
                </Box>

                <Box>
                  <Text size="xs" fw={500} c="dimmed" mb={8}>
                    Requirements
                  </Text>
                  <Text size="sm" c="dimmed" fs="italic">
                    No requirements added yet.
                  </Text>
                </Box>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>

        <Box mt={30} pt="xl" style={{ borderTop: "1px solid #e9ecef" }}>
          <Group justify="space-between">
            <Button
              onClick={onGenerate}
              variant="subtle"
              color="indigo"
              leftSection={<IconReload size={16} />}
            >
              Regenerate
            </Button>
            <Group gap="md">
              <Button variant="subtle" color="gray" onClick={onClick}>
                Cancel
              </Button>
              <Button variant="outline" color="indigo" radius="md">
                Apply Selected
              </Button>
              <Button bg="#4F46E5" radius="md" onClick={() => handleApplyAll()}>
                Apply All
              </Button>
            </Group>
          </Group>
        </Box>
      </Box>
    </AppShell>
  );
};

export default TalentForgeJobCreation;
