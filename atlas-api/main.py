from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from devices import devices

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
            "id": "atlas",
            "name": "Atlas",
            "role": "Main Server",
            "status": "online",
            "cpu": None,
            "memory": None,
            "disk": None,
            "uptime": None,
        },
        {
            "id": "apollo",
            "name": "Apollo",
            "role": "Primary Workstation",
            "status": "online",
            "cpu": None,
            "memory": None,
            "disk": None,
            "uptime": None,
        },
        {
            "id": "hyperion",
            "name": "Hyperion",
            "role": "Home PC",
            "status": "online",
            "cpu": None,
            "memory": None,
            "disk": None,
            "uptime": None,
        },
    ]