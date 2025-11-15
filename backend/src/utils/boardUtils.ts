import { Board, Cell } from '../types';

/**
 * Initialize a 6x6 board with all cells empty (0)
 */
export function initializeBoard(): Board {
  const board: Board = [];
  for (let i = 0; i < 6; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 6; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

/**
 * Create a deep copy of the board
 */
export function copyBoard(board: Board): Board {
  return board.map(row => [...row]);
}

/**
 * Validate if coordinates are within board bounds (0-5)
 */
export function isValidCoordinate(row: number, col: number): boolean {
  return row >= 0 && row < 6 && col >= 0 && col < 6;
}

/**
 * Check if a cell is empty
 */
export function isCellEmpty(board: Board, row: number, col: number): boolean {
  if (!isValidCoordinate(row, col)) {
    return false;
  }
  return board[row][col] === 0;
}

/**
 * Count total tiles for a specific player
 */
export function countPlayerTiles(board: Board, player: 'R' | 'G'): number {
  let count = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === player) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Check if the board is full (all 36 cells filled)
 */
export function isBoardFull(board: Board): boolean {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}
