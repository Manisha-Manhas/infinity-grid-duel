import { v4 as uuidv4 } from 'uuid';
import { GameState, GameMode } from '../types';
import { initializeBoard } from '../utils/boardUtils';

/**
 * In-memory storage for game states
 */
class StateManager {
  private games: Map<string, GameState>;

  constructor() {
    this.games = new Map();
  }

  /**
   * Create a new game and store it
   * Returns the game ID
   */
  createGame(initialState: GameState): string {
    const gameId = initialState.id;
    this.games.set(gameId, initialState);
    return gameId;
  }

  /**
   * Retrieve a game by ID
   * Returns null if game not found
   */
  getGame(id: string): GameState | null {
    return this.games.get(id) || null;
  }

  /**
   * Update an existing game state
   */
  updateGame(id: string, state: GameState): void {
    if (!this.games.has(id)) {
      throw new Error(`Game with id ${id} not found`);
    }
    this.games.set(id, state);
  }

  /**
   * Delete a game
   */
  deleteGame(id: string): void {
    this.games.delete(id);
  }

  /**
   * Get all game IDs (useful for debugging)
   */
  getAllGameIds(): string[] {
    return Array.from(this.games.keys());
  }

  /**
   * Clear all games (useful for testing)
   */
  clearAll(): void {
    this.games.clear();
  }
}

// Export singleton instance
export const stateManager = new StateManager();

/**
 * Initialize a new game with the specified mode
 */
export function initializeGame(mode: GameMode): GameState {
  const gameId = uuidv4();
  
  const initialState: GameState = {
    id: gameId,
    board: initializeBoard(),
    currentPlayer: 'R', // Red always starts
    mode: mode,
    winner: null,
    moveHistory: []
  };
  
  return initialState;
}
