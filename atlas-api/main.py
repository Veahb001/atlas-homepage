from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "online"}

@app.get("/devices")
def devices():
    return [
        {
            "name": "Apollo",
            "type": "Development Laptop",
            "os": "Linux"
        },
        {
            "name": "Atlas",
            "type": "Home Server",
            "os": "Ubuntu"
        },
        {
            "name": "Hyperion",
            "type": "PC",
            "os": "Windows"
        }
    ]