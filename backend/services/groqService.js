import axios from "axios";
import env from "../config/env.js";

export const generateCareerChat = async (data) => {
  try {
    // ✅ CONVERT OBJECT → STRING
    const userMessage = `
User Message: ${data.message}

User Profile:
Name: ${data.profile?.name}
Education: ${data.profile?.education}
Skills: ${data.profile?.skills}
Interests: ${data.profile?.interests}

Scores:
Logical: ${data.scores?.logical}
Creative: ${data.scores?.creative}
Technical: ${data.scores?.technical}
Social: ${data.scores?.social}
Leadership: ${data.scores?.leadership}

Give career guidance based on this.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: env.GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an expert career guidance AI."
          },
          {
            role: "user",
            content: userMessage // ✅ STRING ONLY
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Groq Chat Error:", error.response?.data || error.message);
    return "⚠️ Chatbot is currently unavailable. Please try again.";
  }
};