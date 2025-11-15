# Infinity Grid Duel - Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend API will run on **http://localhost:3000**

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on **http://localhost:5173**

## How to Play

1. Open your browser to http://localhost:5173
2. Choose your game mode:
   - **Player vs Player (PvP)**: Two human players take turns
   - **Player vs AI (PvAI)**: Play against the computer

### Game Rules

- The board is a 6x6 grid
- Red player always goes first
- **First two moves**: Red and Green can place anywhere on the board
- **Subsequent moves**: Must be placed adjacent (horizontally or vertically) to your existing tiles
- **Capturing**: When you place a tile, all adjacent opponent tiles are captured and converted to your color
- **Winning**: The game ends when all 36 cells are filled. The player with the most tiles wins!

### Controls

- Click on any empty cell to place your tile
- Use the "Restart Game" button to start a new match
- Use "Back to Menu" to change game modes

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── engine/        # Game logic and rules
│   │   ├── ai/            # AI strategy
│   │   ├── state/         # State management
│   │   ├── routes/        # API endpoints
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API service
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app component
│   └── package.json
│
└── .kiro/specs/           # Project specifications
```

## API Endpoints

- `POST /game/start` - Start a new game
- `GET /game/state/:id` - Get game state
- `POST /game/move` - Make a player move
- `POST /ai/move` - Calculate and execute AI move

## Development

### Backend

- TypeScript with Node.js and Express
- In-memory state storage
- Rule-based AI with strategic priorities

### Frontend

- React with TypeScript
- Vite for fast development
- React Router for navigation
- Axios for API calls

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

**Backend**: Set a different port
```bash
PORT=3001 npm run dev
```

**Frontend**: Update `vite.config.ts` to use a different port

### CORS Issues

The backend is configured with CORS enabled. If you encounter issues, check that:
- Backend is running on port 3000
- Frontend proxy is configured in `vite.config.ts`

## Next Steps

- Install dependencies in both backend and frontend
- Start both servers
- Open http://localhost:5173 in your browser
- Enjoy the game!
