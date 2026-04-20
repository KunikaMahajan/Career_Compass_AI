import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    // Profile
    education: { type: String, default: "" },
    favoriteSubjects: { type: String, default: "" },
    interests: { type: String, default: "" },
    skills: { type: String, default: "" },
    careerGoal: { type: String, default: "" },

    // ML Scores
    interestScores: {
      logical: { type: Number, default: 0 },
      creative: { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      leadership: { type: Number, default: 0 }
    },

    testAnswers: {
      type: Object,
      default: {}
    },

    // Recommendations
    recommendedCareers: [
      {
        title: String,
        category: String,
        description: String,
        skills: [String],
        salaryRange: String,
        roadmap: [String],
        featureScores: {
          logical: Number,
          creative: Number,
          technical: Number,
          social: Number,
          leadership: Number
        }
      }
    ],

    recommendationExplanation: { type: String, default: "" },
    lastTestAt: { type: Date },

    isProfileCompleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// 🔥 IMPORTANT FIX
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;