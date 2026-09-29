# System Architecture

## Current implementation

The current repository is a frontend prototype. Detection, camera, analytics, and hotspot values are generated or stored locally in React components.

```text
React Components
      |
      +--> Dashboard
      +--> Camera Feed
      +--> Alerts
      +--> Analytics
      +--> Hotspots
```

## Target architecture

```text
Video Source
    |
    v
AI Inference Service
    |
    +--> Person Detection
    +--> Tracking
    +--> Gesture Detection
    +--> Context Analysis
    |
    v
Threat Engine
    |
    v
Backend API / WebSocket
    |
    v
React Dashboard
```

## Event model

A normalized alert should eventually contain:

```json
{
  "id": "ALT-1024",
  "severity": "HIGH",
  "type": "SOS_GESTURE",
  "cameraId": "CAM-003",
  "location": "Park Entrance",
  "confidence": 0.94,
  "timestamp": "2026-09-30T00:00:00Z",
  "status": "ACTIVE"
}
```

This keeps the frontend independent from the AI implementation and makes it easier to replace mock data with a real API later.
