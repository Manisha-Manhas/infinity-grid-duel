# Infinity Grid Duel

A 6x6 strategic board game where two players compete to expand territory and capture opponent tiles.

## Features

✅ **Player vs Player (PvP)** - Two human players take turns  
✅ **Player vs AI (PvAI)** - Play against an intelligent AI opponent  
✅ **Strategic Gameplay** - Capture adjacent opponent tiles  
✅ **Move History** - Track all moves throughout the game  
✅ **Win Detection** - Automatic winner determination  
✅ **Responsive UI** - Clean, modern interface with visual feedback

## Quick Start

See [SETUP.md](SETUP.md) for detailed installation and setup instructions.

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Running the Game

```bash
# Terminal 1: Start backend (port 3000)
cd backend
npm run dev

# Terminal 2: Start frontend (port 5173)
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser!

## Game Rules

- **Board**: 6x6 grid
- **Starting**: Red player goes first
- **First Moves**: Red and Green can place anywhere
- **Subsequent Moves**: Must be adjacent to your existing tiles
- **Capturing**: Adjacent opponent tiles are converted to your color
- **Winning**: Most tiles when the board is full wins!

## Project Structure

```
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── engine/   # Game logic and move validation
│   │   ├── ai/       # AI strategy engine
│   │   ├── state/    # State management
│   │   ├── routes/   # REST API endpoints
│   │   ├── types/    # TypeScript interfaces
│   │   └── utils/    # Board utilities
│   └── package.json
│
├── frontend/         # React + TypeScript UI
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Game pages
│   │   ├── api/         # API service layer
│   │   └── types/       # TypeScript interfaces
│   └── package.json
│
└── .kiro/specs/      # Project specifications
    └── infinity-grid-duel/
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

## Technology Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- In-memory state storage
- Rule-based AI with strategic priorities

**Frontend:**
- React 18
- TypeScript
- Vite (fast dev server)
- React Router
- Axios

## API Endpoints

- `POST /game/start` - Initialize a new game
- `GET /game/state/:id` - Retrieve game state
- `POST /game/move` - Execute a player move
- `POST /ai/move` - Calculate and execute AI move

## Development

Both backend and frontend have hot-reload enabled for rapid development.

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Implementation Status

All core features are implemented:
- ✅ Game initialization (PvP & PvAI modes)
- ✅ Move validation and execution
- ✅ Tile capture mechanics
- ✅ AI opponent with strategic decision-making
- ✅ Win condition detection
- ✅ Move history tracking
- ✅ Game restart functionality
- ✅ Complete UI with all components
- ✅ Error handling and loading states

## Contributing

This project was built following a spec-driven development approach. See the `.kiro/specs/` directory for detailed requirements, design, and implementation plans.
