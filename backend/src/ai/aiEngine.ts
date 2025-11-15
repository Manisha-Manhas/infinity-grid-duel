import { GameState, Position, ScoredMove, PlayerColor } from '../types';
import { validateMove, getAdjacentCells } from '../engine/gameEngine';
import { isCellEmpty } from '../utils/boardUtils';

/**
 * Find all legal moves for the AI player
 */
export function findLegalMoves(state: GameState): Position[] {
  const legalMoves: Position[] = [];
  const aiPlayer = state.currentPlayer;
  
  // Check all cells on the board
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (validateMove(state, aiPlayer, row, col)) {
        legalMoves.push({ row, col });
      }
    }
  }
  
  return legalMoves;
}

/**
 * Calculate how many opponent tiles would be captured by this move
 */
function calculateCaptureCount(state: GameState, position: Position): number {
  const { row, col } = position;
  const aiPlayer = state.currentPlayer;
  const opponent: PlayerColor = aiPlayer === 'R' ? 'G' : 'R';
  
  const adjacentCells = getAdjacentCells(row, col);
  let captureCount = 0;
  
  for (const pos of adjacentCells) {
    if (state.board[pos.row][pos.col] === opponent) {
      captureCount++;
    }
  }
  
  return captureCount;
}

/**
 * Calculate how many opponent expansion opportunities this move blocks
 */
function calculateBlockCount(state: GameState, position: Position): number {
  const { row, col } = position;
  const aiPlayer = state.currentPlayer;
  const opponent: PlayerColor = aiPlayer === 'R' ? 'G' : 'R';
  
  const adjacentCells = getAdjacentCells(row, col);
  let blockCount = 0;
  
  // Check if this position is adjacent to opponent tiles
  // If so, it blocks their expansion in this direction
  for (const pos of adjacentCells) {
    if (state.board[pos.row][pos.col] === opponent) {
      blockCount++;
    }
  }
  
  return blockCount;
}

/**
 * Score all legal moves based on AI strategy
 * Priority: Capture (10 pts) > Block (5 pts) > Expand (1 pt)
 */
export function scoreMoves(state: GameState, legalMoves: Position[]): ScoredMove[] {
  const scoredMoves: ScoredMove[] = [];
  
  for (const position of legalMoves) {
    const captureCount = calculateCaptureCount(state, position);
    const blockCount = calculateBlockCount(state, position);
    
    // Calculate total score
    const score = (captureCount * 10) + (blockCount * 5) + 1; // +1 for expansion
    
    scoredMoves.push({
      position,
      score,
      captureCount,
      blockCount
    });
  }
  
  return scoredMoves;
}

/**
 * Calculate the best move for the AI
 * Returns the position to play
 */
export function calculateAIMove(state: GameState): Position {
  // Find all legal moves
  const legalMoves = findLegalMoves(state);
  
  if (legalMoves.length === 0) {
    throw new Error('No legal moves available for AI');
  }
  
  // If only one move, return it
  if (legalMoves.length === 1) {
    return legalMoves[0];
  }
  
  // Score all moves
  const scoredMoves = scoreMoves(state, legalMoves);
  
  // Find the highest score
  const maxScore = Math.max(...scoredMoves.map(m => m.score));
  
  // Get all moves with the highest score
  const bestMoves = scoredMoves.filter(m => m.score === maxScore);
  
  // If there's a tie, pick randomly
  const selectedMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
  
  return selectedMove.position;
}
