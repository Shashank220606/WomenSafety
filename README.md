# Women Safety Analytics

> AI-assisted surveillance and safety monitoring dashboard for detecting potentially risky situations and managing security alerts.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## Overview

Women Safety Analytics is a React + TypeScript dashboard designed as the monitoring interface for an AI-based women-safety surveillance system.

The current frontend provides a realistic control-center experience for:

- Live camera monitoring
- Security alert management
- Detection statistics
- Safety analytics
- Hotspot visualization
- Camera network status
- Threat-level monitoring

The repository currently uses **simulated detection data** so the dashboard can be developed and demonstrated without a connected CCTV or AI inference service. The planned architecture allows the simulated layer to be replaced by a real YOLO/OpenCV inference API.

## Features

### Monitoring Dashboard
- Person and camera statistics
- Active alert summary
- Camera status overview
- Safety/threat indicator
- Quick response actions

### Live Camera Monitoring
- Multi-camera grid
- Camera status indicators
- Detection overlays
- Person counts
- Alert state visualization

### Alert Management
- High/medium/low severity
- Search and filtering
- Alert dismissal
- Camera and location context
- Response-action controls

### Safety Analytics
- Incident trends
- Resolution metrics
- Peak activity hours
- Location-based analysis
- Gender distribution visualization

### Hotspot Analysis
- Interactive safety zones
- Incident intensity visualization
- Zone statistics
- Camera coverage information

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend/API | Planned |
| AI Inference | Planned: YOLO + OpenCV |
| Data Storage | Planned: Supabase/PostgreSQL |

## Architecture

The intended production architecture is:

```text
CCTV / Video Stream
        |
        v
AI Inference Service
(YOLO + OpenCV + Tracking)
        |
        v
Threat / Alert Engine
        |
        v
REST / WebSocket API
        |
        v
React Monitoring Dashboard
        |
        +---- Alerts
        +---- Analytics
        +---- Hotspots
        +---- Camera Monitoring
```

### Planned AI capabilities

- Person detection
- Person tracking
- Gender classification
- SOS gesture detection
- Lone-person detection
- Crowd/context analysis
- Configurable threat scoring
- Real-time alert generation

> **Important:** AI inference is not yet connected to the frontend. Current dashboard values and camera feeds are demonstration data.

## Project Structure

```text
src/
├── components/
│   ├── AlertPanel.tsx
│   ├── AlertSummary.tsx
│   ├── Analytics.tsx
│   ├── CameraFeed.tsx
│   ├── Dashboard.tsx
│   ├── GenderChart.tsx
│   ├── Header.tsx
│   ├── HotspotMap.tsx
│   ├── LiveFeed.tsx
│   ├── Sidebar.tsx
│   └── StatCard.tsx
├── App.tsx
├── index.css
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Shashank220606/WomenSafety.git
cd WomenSafety
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Development Roadmap

- [x] Monitoring dashboard
- [x] Camera monitoring UI
- [x] Alert management UI
- [x] Analytics dashboard
- [x] Hotspot visualization
- [ ] Connect real video input
- [ ] Add YOLO inference service
- [ ] Add person tracking
- [ ] Add SOS gesture detection
- [ ] Add threat-scoring engine
- [ ] Connect real-time API/WebSocket events
- [ ] Persist alerts and incidents
- [ ] Add authentication and role-based access
- [ ] Add automated testing
- [ ] Add deployment configuration

## Responsible Use

This project is intended for research, education, and safety-monitoring prototyping.

Computer-vision systems can produce false positives and should not be treated as autonomous decision-makers. Any real deployment should include human review, appropriate privacy controls, secure data handling, access controls, and compliance with applicable laws and organizational policies.

## Contributing

1. Create a feature branch.
2. Make focused changes.
3. Run `npm run lint` and `npm run build`.
4. Open a pull request with a clear description.

## License

This project currently does not declare an open-source license. Add a license before accepting external contributions or redistributing the project.
