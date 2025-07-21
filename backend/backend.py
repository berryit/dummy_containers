from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only; restrict in prod
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input data model
class InputData(BaseModel):
    name: str


# Output data model
class OutputData(BaseModel):
    name: str
    status: str
    timestamp: int


@app.post("/", response_model=OutputData)
async def main(data: InputData):
    current_timestamp = int(time.time())  # Unix epoch timestamp
    return OutputData(
        name=data.name,
        status="ok",
        timestamp=current_timestamp
    )
