import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateJobDescription = async (req, res) => {
  try {
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      "Write  short frontend developer job description",
    );

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
