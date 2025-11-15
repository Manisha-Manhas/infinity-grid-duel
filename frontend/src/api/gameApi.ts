import axios from 'axios';
import { GameState, GameMode, PlayerColor } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const startGame = async (mode: GameMode): Promise<GameState> => {
  const response = await axios.post(`${API_BASE_URL}/game/start`, { mode });
  return response.data;
};

export const getGameState = async (gameId: string): Promise<GameState> => {
  const response = await axios.get(`${API_BASE_URL}/game/state/${gameId}`);
  return response.data;
};

export const makeMove = async (
  gameId: string,
  player: PlayerColor,
  row: number,
  col: number
): Promise<GameState> => {
  const response = await axios.post(`${API_BASE_URL}/game/move`, {
    gameId,
    player,
    row,
    col
  });
  return response.data;
};

export const makeAIMove = async (gameId: string): Promise<{ row: number; col: number; gameState: GameState }> => {
  const response = await axios.post(`${API_BASE_URL}/ai/move`, { gameId });
  return response.data;
};
