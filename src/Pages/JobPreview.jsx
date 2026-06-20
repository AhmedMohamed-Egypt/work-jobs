import {
  Avatar,
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Image,
  Paper,
  Progress,
  RingProgress,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";

import {
  IconBriefcase,
  IconCategory,
  IconClock,
  IconCode,
  IconCurrencyDollar,
  IconMapPin,
} from "@tabler/icons-react";
import { useJob } from "../context/JobContext";

export default function JobPreview({ dataPreview }) {
  const job = {
    title: "Front End Developer",
    category: "Development",
    location: "Remote",
    experience: "Senior",
    salary: "$3,500",
    description:
      "We are looking for a talented Front-End Developer with experience in React, Next.js, and TypeScript. You will work closely with designers and backend engineers to create modern web applications.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
  };

  const completionPercentage = 75;
  const score = 85;
  const {
    title,
    category,
    Location,
    deadline,
    description,
    experience,
    salary,
    skills,
  } = dataPreview;

  const date = new Date(deadline);

const formatted = date.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

console.log(formatted); // 12 June 2026

  return (
    <Box
      style={{
        position: "sticky",
        top: 20,
        maxWidth: "500px",
      }}
    >
      {/* Completion Card */}
      <Card withBorder radius="lg" p="md" mb="md">
        <Group justify="space-between">
          <div>
            <Text fw={700}>Job Completion</Text>
            <Text size="sm" c="dimmed">
              Complete your job post
            </Text>
          </div>

          <RingProgress
            size={70}
            thickness={7}
            sections={[
              {
                value: completionPercentage,
                color: "dark",
              },
            ]}
            label={
              <Text ta="center" fw={700} size="xs">
                {completionPercentage}%
              </Text>
            }
          />
        </Group>

        <Progress mt="md" value={completionPercentage} color="dark" />
      </Card>

      {/* Main Preview */}
      <Paper
        withBorder
        radius="lg"
        shadow="xs"
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Header */}
        <Image h={150} src="src/assets/bkground-contarctor.jpg" />

        {/* Logo */}
        <Avatar
          radius="xl"
          size={72}
          color="dark"
          style={{
            position: "absolute",
            top: 115,
            left: 24,
            border: "4px solid white",
            backgroundColor: "#fff",
          }}
        >
          HW
        </Avatar>

        <Stack p="lg" pt={55} gap="md">
          <Group justify="space-between">
            <Badge color="green">Live Preview</Badge>

            <Text size="xs" c="dimmed">
              Updates automatically
            </Text>
          </Group>

          {/* Title */}
          {title ? (
            <div>
              <Text fw={700} size="xl">
                {title}
              </Text>

              <Group gap={6} mt={4}>
                <IconClock size={14} />
                <Text size="sm" c="dimmed">
                  Posted just now
                </Text>
              </Group>
            </div>
          ) : (
            <Skeleton height={32} width="70%" />
          )}

          <Divider />

          {/* Details */}
          <Stack gap="sm">
            <Group justify="space-between">
              <Group gap={8}>
                <ThemeIcon color="violet" variant="light">
                  <IconCategory size={16} />
                </ThemeIcon>

                <Text size="sm">Category</Text>
              </Group>

              <Text fw={500}>{category}</Text>
            </Group>

            <Group justify="space-between">
              <Group gap={8}>
                <ThemeIcon color="blue" variant="light">
                  <IconMapPin size={16} />
                </ThemeIcon>

                <Text size="sm">Location</Text>
              </Group>

              <Text fw={500}>{Location}</Text>
            </Group>

            <Group justify="space-between">
              <Group gap={8}>
                <ThemeIcon color="green" variant="light">
                  <IconBriefcase size={16} />
                </ThemeIcon>

                <Text size="sm">Experience</Text>
              </Group>

              <Text fw={500}>{experience}</Text>
            </Group>

            <Group justify="space-between">
              <Group gap={8}>
                <ThemeIcon color="yellow" variant="light">
                  <IconCurrencyDollar size={16} />
                </ThemeIcon>

                <Text size="sm">Salary</Text>
              </Group>

              <Text fw={700}>{salary}</Text>
            </Group>
          </Stack>

          <Divider />

          {/* Description */}
          <Stack gap={8}>
            <Text fw={600}>Job Description</Text>

            {job.description ? (
              <Text size="sm" c="dimmed" lineClamp={5}>
                {job.description}
              </Text>
            ) : (
              <>
                <Skeleton height={10} />
                <Skeleton height={10} />
                <Skeleton height={10} width="80%" />
              </>
            )}
          </Stack>

          <Divider />

          {/* Skills */}
          <Stack gap="xs">
            <Group gap={8}>
              <ThemeIcon color="indigo" variant="light">
                <IconCode size={16} />
              </ThemeIcon>

              <Text fw={600}>Required Skills</Text>
            </Group>

            <Group gap="xs">
              {skills?.length ? (
                skills.map((skill) => (
                  <Badge key={skill} radius="md" size="lg" variant="light" fw={500}>
                    {skill}
                  </Badge>
                ))
              ) : (
                <Text size="sm" c="dimmed">
                  Add skills to preview them
                </Text>
              )}
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
