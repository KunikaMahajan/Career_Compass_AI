import axios from "axios";

export const getCareerPrediction = async (scores) => {
  try {
    const response = await axios.post("http://localhost:8000/predict", {
      scores: scores,
      top_k: 3
    });

    return response.data;
  } catch (error) {
    console.error("ML Error:", error.message);
    return null;
  }
};