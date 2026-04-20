from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from predict import predict   # make sure predict.py exists

# Initialize FastAPI app
app = FastAPI(title="Career Compass ML Service")

# Request Model
class PredictionRequest(BaseModel):
    scores: Dict[str, int]
    top_k: int = 3

# Root API
@app.get("/")
def root():
    return {"status": "ML service running"}

# Prediction API
@app.post("/predict")
async def predict_endpoint(data: PredictionRequest):
    try:
        scores = data.scores
        top_k = data.top_k

        result = predict(scores, top_k)
        return {"career": result}

    except Exception as e:
        return {"error": str(e)}