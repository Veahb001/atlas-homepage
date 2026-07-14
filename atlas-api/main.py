from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from devices import devices

import random

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
    updated = []
    for device in devices:
        updated.append({
            **device,
            "cpu": random.randint(5, 80),
            "memory": random.randint(25, 90),
            "disk": random.randint(35, 70),
            "uptime": f"{random.randint(0, 30)} days {random.randint(0, 24)} hours"
        })

    return updated
    # return devices

@app.get("/devices/{device_id}")
def get_device(device_id: str):
    updated = []
    for device in devices:
        updated.append({
            **device,
            "cpu": random.randint(5, 80),
            "memory": random.randint(25, 90),
            "disk": random.randint(35, 70),
            "uptime": f"{random.randint(0, 30)} days {random.randint(0, 24)} hours"
        })

    raise HTTPException(status_code=404, detail="Device not found")

    #     if device["id"] == device_id:
    #         return device

    # raise HTTPException(status_code=404, detail="Device not found")