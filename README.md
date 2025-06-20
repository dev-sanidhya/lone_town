# Lone Town - Intelligent Matchmaking System

Lone Town is a mindful dating platform that provides just one carefully chosen match per day, based on deep emotional, psychological, and behavioral compatibility. The system is designed to promote intentional, meaningful connections and eliminate swipe fatigue.

## Features

### Core Features
- **Deep Compatibility Algorithm:** Matches users based on emotional intelligence, psychological traits, behavioral patterns, and relationship values.
- **Exclusive Match Management:** Only one match at a time, no parallel dating.
- **Complex State Engine:** User states include available, matched, pinned, and frozen, with automatic transitions.
- **Intelligent Timer Systems:** 24-hour freeze for unpinned users, 2-hour wait for the other.
- **Conversation Milestone Tracking:** 100 messages in 48 hours unlocks video calling.
- **Real-time Messaging:** WebSocket-based chat with message counting and timestamp tracking.
- **Intentionality Analytics:** Tracks user behavior to improve matching and identify commitment levels.

### Frontend Features
- **Mindful Match Interface:** Clean UI showing a single daily match.
- **Pin/Unpin Decision Flow:** Requires conscious decisions to continue or end matches.
- **Milestone Display:** Visual progress toward video call unlock.
- **Freeze Period Communication:** Empathetic UI for reflection periods and wait times.
- **Match Feedback Display:** Personalized insights on why previous matches didn't work.
- **Intentional Onboarding:** Deep compatibility assessment beyond surface preferences.
- **State Awareness:** Visual indicators for user state and milestone progress.

### Bonus Features (Fully Implemented)
- **Machine Learning Analytics:**
  - Collects data (message length, response time, match outcome, feedback) for future ML-based match improvements.
  - Data can be exported for training models to further enhance compatibility scoring.
- **Advanced Analytics Dashboard:**
  - Admin dashboard (`/admin`) with:
    - Match success rates
    - Average messages per match
    - Average response time
    - Bar chart of match outcomes (success/fail)
- **Voice Messaging:**
  - Record and send voice messages in chat.
  - Voice messages are stored and can be played back in the chat interface.

## Tech Stack
- **Frontend:** React.js, Material-UI, Chart.js
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB (Mongoose)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <project-root>
   ```
2. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

### Running Locally
1. **Start MongoDB** (if running locally):
   ```sh
   mongod
   ```
2. **Start the backend:**
   ```sh
   cd backend
   node server.js
   ```
3. **Start the frontend:**
   ```sh
   cd frontend
   npm start
   ```
4. **Open your browser:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Usage
- **Onboarding:** Fill out the onboarding form to create your profile.
- **Match:** Get your daily exclusive match and chat in real time.
- **Pin/Unpin:** Make intentional decisions; unpinning triggers reflection freeze.
- **Milestones:** Track message progress and unlock video calls.
- **Feedback:** See insights on why previous matches ended.
- **Voice Messaging:** Record and send voice messages in chat.
- **Admin Dashboard:** Visit `/admin` for analytics (admin only).

## Matchmaking Algorithm
- Weighted scoring based on:
  - Emotional intelligence (numeric)
  - Psychological traits (string similarity)
  - Behavioral patterns (string similarity)
  - Relationship values (string similarity)
- Only users in the `available` state are considered for matching.
- Feedback and analytics are collected for future ML improvements.

## Deployment
- **Frontend:** Deploy to Vercel, Netlify, or similar.
- **Backend:** Deploy to Render, Heroku, or similar.
- **Database:** Use MongoDB Atlas for cloud hosting.

## License
MIT

---

## Credits
**Made by Sanidhya**

**Built with ❤️ for mindful, intentional relationships.** 