import requests

def get_apollo_telemetry():

    try:
        response = requests.get(
            "http://192.168.1.6:9000/telemetry",
            timeout=2
        )

        return response.json()

    except Exception:
        return None

def update_device_status():

    telemetry = get_apollo_telemetry()

    for device in devices:

        if device["id"] == "apollo":

            if telemetry:

                device["status"] = "online"
                device["cpu"] = telemetry["cpu"]
                device["memory"] = telemetry["memory"]
                device["disk"] = telemetry["disk"]
                device["uptime"] = telemetry["uptime"]

            else:

                device["status"] = "offline"
                device["cpu"] = None
                device["memory"] = None
                device["disk"] = None
                device["uptime"] = None
                
devices = [
        {
            "id": "atlas",
            "name": "Atlas",
            "role": "Main Server",
            "status": "online",
            "cpu": None,
            "memory": None,
            "disk": None,
            "uptime": None,
            "last_online": "Today 8:43",
            "last_offline":"Yesterday 22:14",
            "os": "Ubuntu Server 24.04",
            "cpu_model": "Intel i5-6500",
            "memory_total": "16 GB",
            "storage": "512 GB SSD",
            "services": [
                {"name": "Docker", "status": "running"},
                {"name": "Homepage", "status": "running"},
                {"name": "Tailscale", "status": "running"},
                {"name": "Uptime Kuma", "status": "stopped"},
                {"name": "SSH", "status": "available"}
            ]
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
            "last_online": "Today 8:43",
            "last_offline":"Yesterday 22:14",
            "os": "Fedora Linux",
            "cpu_model": "Ryzen 7",
            "memory_total": "32 GB",
            "storage": "1 TB SSD"
            #Fake data for service list testing
            "services": [
                {
                    "name": "Apollo API",
                    "status": "running"
                }
            ],

            "containers": [
                {
                    "name": "Docker",
                    "status": "running"
                }
            ],

            "applications": [
                {
                    "name": "VS Code",
                    "status": "running"
                },
                {
                    "name": "Firefox",
                    "status": "running"
                }
            ],
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
            "last_online": "Today 8:43",
            "last_offline":"Yesterday 22:14",
            "os": "Windows 11",
            "cpu_model": "Ryzen 7 7800X3D",
            "memory_total": "64 GB",
            "storage": "2 TB NVMe SSD"
        },
    ]