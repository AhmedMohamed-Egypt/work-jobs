import { GoogleGenerativeAI } from "@google/generative-ai";
import { JobSchema } from "./validation/jobSchema.js";
import { safeParseAI } from "./utils/safeParse.js";
const buildPrompt = (title, skills) => `
You are a system that generates structured job data and generate 6 skills based on provided skills and based on provided title.

IMPORTANT RULES:
- Return ONLY valid JSON
- No explanations
- No markdown
- No text before or after JSON

JSON format:
{ 
 "title":"string",
  "requirements": [|
  "string"],
  "skills": ["string"],
  "jobDescription":"string"
  
}

Job Title: ${title}

Skills: ${skills.join(", ")}
`;
export const generateJobAi = async (req, res) => {
  try {
     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const { title, skills } = req.body;

    // STEP 1: build prompt
    const prompt = buildPrompt(title, skills);

    // STEP 2: call AI
    const aiResponse = await model.generateContent(prompt);

    const text = aiResponse.response.text();

    // STEP 3: parse safely
    const parsed = safeParseAI(text);

    // STEP 4: validate structure
    const validated = JobSchema.parse(parsed);

    // STEP 5: return clean result
    return res.json({
      success: true,
      data: validated
    });
    

  } catch (err) {
    console.error("ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to generate job data"
    });
  }
};
