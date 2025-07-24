import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic import constr


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*frontend.*",
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input data model
class InputData(BaseModel):
    name: constr(min_length=1, max_length=200)


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
