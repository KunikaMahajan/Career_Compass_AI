import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "" },
    description: { type: String, default: "" },

    skills: {
      type: [String],
      default: []
    },

    salaryRange: { type: String, default: "" },

    roadmap: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Career =
  mongoose.models.Career || mongoose.model("Career", careerSchema);

export default Career;