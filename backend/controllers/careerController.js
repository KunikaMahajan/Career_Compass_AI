import User from "../models/user.js";
import { getCareerPrediction } from "../services/mlService.js";
import { generateCareerChat } from "../services/groqService.js";

/* ==============================
   🎯 PREDICT CAREER (ML)
============================== */
export const predictCareer = async (req, res) => {
  try {
    const { scores, answers } = req.body;

    if (!scores) {
      return res.status(400).json({ message: "Scores are required" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const aiResult = await getCareerPrediction(scores);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        interestScores: scores,
        testAnswers: answers || {},
        recommendedCareers: aiResult.careers,
        recommendationExplanation: aiResult.explanation,
        lastTestAt: new Date()
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      user: updatedUser,
      careers: aiResult.careers,
      explanation: aiResult.explanation
    });

  } catch (error) {
    console.error("predictCareer error:", error);
    res.status(500).json({
      success: false,
      message: "Career prediction failed",
      error: error.message
    });
  }
};

/* ==============================
   🤖 CHATBOT (GROQ AI)
============================== */
export const askCareerAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reply = await generateCareerChat({
      message,
      profile: user,
      scores: user.interestScores
    });

    res.json({ reply });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      message: "AI chat failed",
      error: error.message
    });
  }
};