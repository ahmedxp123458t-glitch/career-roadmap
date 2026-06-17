# Career Roadmap

A full-stack MERN application for career selection, skill gap analysis, and learning path management.

## Features

- **Career Selection** – Browse available careers with required skills and salary info
- **Skill Gap Analysis** – Compare your skills against career requirements with visual match percentage
- **Learning Path Creation** – Step-by-step learning path with resources and durations
- **Progress Monitoring** – Track completed steps, overall percentage, and per-path stats

## Architecture

```
career-roadmap/
├── server/
│   ├── config/db.js
│   ├── models/
│   │   ├── Career.js
│   │   ├── UserProfile.js
│   │   ├── LearningPath.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── careers.js
│   │   ├── profiles.js
│   │   ├── learningPaths.js
│   │   └── progress.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── client/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       ├── CareerSelector.js
│   │       ├── SkillGap.js
│   │       ├── LearningPath.js
│   │       └── ProgressTracker.js
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/careers | List careers |
| POST   | /api/careers | Create career |
| GET    | /api/profiles/:userId | Get user profile |
| POST   | /api/profiles | Create/update profile |
| GET    | /api/learning-paths | List learning paths |
| POST   | /api/learning-paths | Create learning path |
| GET    | /api/progress | Get progress records |
| POST   | /api/progress | Create/update progress |

## Usage

1. Start MongoDB on port 27017
2. `cd server && npm install && npm run seed && npm start`
3. `cd client && npm install && npm start`
4. Open `http://localhost:3000`
