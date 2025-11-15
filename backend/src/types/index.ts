// Cell types
export type Cell = 0 | 'R' | 'G';

// Board is a 6x6 grid
export type Board = Cell[][];

// Game modes
export type GameMode = 'PvP' | 'PvAI';

// Player colors
export type PlayerColor = 'R' | 'G';

// Position on the board
export interface Position {
  row: number;
  col: number;
}

// Move record
export interface Move {
  player: PlayerColor;
  row: number;
  col: number;
  timestamp: number;
  capturedCount: number;
}

// Player information
export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  isAI: boolean;
}

// Complete game state
export interface GameState {
  id: string;
  board: Board;
  currentPlayer: PlayerColor;
  mode: GameMode;
  winner: PlayerColor | 'draw' | null;
  moveHistory: Move[];
}

// Scored move for AI evaluation
export interface ScoredMove {
  position: Position;
  score: number;
  captureCount: number;
  blockCount: number;
}
