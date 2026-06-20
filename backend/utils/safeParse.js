export function safeParseAI(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  }
}