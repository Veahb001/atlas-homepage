from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from devices import devices
from events import events
from datetime import datetime

import requests

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

def log_event(message: str, event_type: str = "system"):
    events.insert(0, {
        "time": datetime.now().strftime("%H:%M:%S"),
        "message": message,
        "type": event_type,
    })

    # Keep only the 50 most recent events
    if len(events) > 50:
        events.pop()

log_event("API started")

def get_apollo_telemetry():

    try:
        response = requests.get(
            "http://192.168.1.6:9000/telemetry",
            timeout=2
        )

        return response.json()

    except Exception:
        return None

@app.get("/health")
def health():
    return {"status": "online"}

#Legacy Code for testing purposes, will be removed in the future
# @app.get("/devices")
# def get_devices():
#     updated = []
#     for device in devices:
#         updated.append({
#             **device,
#             "cpu": random.randint(5, 80),
#             "memory": random.randint(25, 90),
#             "disk": random.randint(35, 70),
#             "uptime": f"{random.randint(0, 30)} days {random.randint(0, 24)} hours"
#         })

#     return updated
#     # return devices

#New device endpoint using local inforrmation and telemetry from Apollo device
@app.get("/devices")
def get_devices():

    updated = []

    apollo_data = get_apollo_telemetry()

    for device in devices:

        current = {
            **device
        }

        if device["id"] == "apollo":

            if apollo_data:

                current.update({
                    "status": "online",
                    "cpu": apollo_data["cpu"],
                    "memory": apollo_data["memory"],
                    "disk": apollo_data["disk"],
                    "uptime": apollo_data["uptime"]
                })

            else:

                current.update({
                    "status": "offline",
                    "cpu": None,
                    "memory": None,
                    "disk": None,
                    "uptime": None
                })

        updated.append(current)

    return updated

#Legacy code for testing purposes, will be removed in the future
# @app.get("/devices/{device_id}")
# def get_device(device_id: str):
#     for device in devices:
#         if device["id"] == device_id:
#             return {
#                 **device,
#                 "cpu": random.randint(5, 80),
#                 "memory": random.randint(25, 90),
#                 "disk": random.randint(35, 70),
#                 "uptime": f"{random.randint(0, 30)} days {random.randint(0, 24)} hours",
#                 "last_online": "Today 8:43",
#                 "last_offline":"Yesterday 22:14"
#             }

#     raise HTTPException(status_code=404, detail="Device not found")

@app.get("/devices/{device_id}")
def get_device(device_id: str):

    for device in devices:

        if device["id"] == device_id:

            current = {
                **device
            }

            if device_id == "apollo":

                telemetry = get_apollo_telemetry()

                if telemetry:

                    current.update({
                        "status": "online",
                        "cpu": telemetry["cpu"],
                        "memory": telemetry["memory"],
                        "disk": telemetry["disk"],
                        "uptime": telemetry["uptime"]
                    })

                else:

                    current.update({
                        "status": "offline",
                        "cpu": None,
                        "memory": None,
                        "disk": None,
                        "uptime": None
                    })

            return current

    raise HTTPException(status_code=404, detail="Device not found")