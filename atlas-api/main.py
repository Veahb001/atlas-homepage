from fastapi import FastAPI, HTTPException
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
def get_devices():
    return devices

@app.get("/devices/{device_id}")
def get_device(device_id: str):
    for device in devices:
        if device["id"] == device_id:
            return device

    raise HTTPException(status_code=404, detail="Device not found")