import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateJobDescription = async (req, res) => {

  const title = req.body.basicInfo.title
  

  try {
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const prompt = `
Write a professional job description for the position:"${title}".

Requirements:
- 100 to 150 words
- Professional tone
- Mention responsibilities
- Mention required skills
- Return plain text only
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      success: true,
      description: response,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
