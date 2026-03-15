from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Fullstack Template API")


class HelloResponse(BaseModel):
    message: str


@app.get("/api/hello", tags=["hello"], operation_id="getHello", response_model=HelloResponse)
def hello() -> HelloResponse:
    return HelloResponse(message="Hello from FastAPI")
