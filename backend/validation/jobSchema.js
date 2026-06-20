import { z } from "zod";

export const JobSchema = z.object({
  title: z.string(),
  requirements: z.array(z.string()),
  skills: z.array(z.string()),
  jobDescription: z.string(),
});
