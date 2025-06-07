from fastapi import FastAPI
from fastapi import Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

import matplotlib.pyplot as plt
import numpy as np
from scores_chart_script import getScores
from scores_chart_script import makeGraph
import matplotlib as mpl
import requests

from MemoryChart import MemoryChart
import base64

# python -m uvicorn main:app --reload

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/chart/scores/{userPatientId}/{gameType}/pagination")
async def readChart(userPatientId: int, gameType: str):
    
    r = requests.get(f'http://localhost:8080/scores/{userPatientId}/{gameType}')
    if r.status_code == 200:
        scores = r.json()
    else :
        print(r.status_code)
        return {"message": "Unable to get scores"}

    if(gameType == "MEMORY"):
        memoryChart = MemoryChart()
        processedScores = memoryChart.processData(scores)
        return memoryChart.createPaginatedChart(processedScores)

@app.get("/chart/scores/{userPatientId}/{gameType}/")
async def readChart(userPatientId: int, gameType: str):
    
    scores = getScores(userPatientId, gameType)

    if(gameType == "MEMORY"):
        memoryChart = MemoryChart()
        processedScores = memoryChart.processData(scores)
        return memoryChart.createChart(processedScores)

@app.get("/")
async def root():
    return {"message": "Hello World"}

