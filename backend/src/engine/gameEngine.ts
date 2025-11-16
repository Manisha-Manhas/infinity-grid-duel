import { GameState, Board, PlayerColor, Position } from '../types';
import { isValidCoordinate, isCellEmpty, copyBoard, isBoardFull, countPlayerTiles } from '../utils/boardUtils';

/**
 * Get adjacent cell positions (up, down, left, right only - no diagonals)
 */
export function getAdjacentCells(row: number, col: number): Position[] {
  const adjacent: Position[] = [];
  
  // Up
  if (isValidCoordinate(row - 1, col)) {
    adjacent.push({ row: row - 1, col });
  }
  
  // Down
  if (isValidCoordinate(row + 1, col)) {
    adjacent.push({ row: row + 1, col });
  }
  
  // Left
  if (isValidCoordinate(row, col - 1)) {
    adjacent.push({ row, col: col - 1 });
  }
  
  // Right
  if (isValidCoordinate(row, col + 1)) {
    adjacent.push({ row, col: col + 1 });
  }
  
  return adjacent;
}

/**
 * Check if a player has any tiles on the board
 */
function hasPlayerTiles(board: Board, player: PlayerColor): boolean {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] === player) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check if a position is adjacent to any of the player's tiles
 */
function isAdjacentToPlayerTile(board: Board, player: PlayerColor, row: number, col: number): boolean {
  const adjacentCells = getAdjacentCells(row, col);
  
  for (const pos of adjacentCells) {
    if (board[pos.row][pos.col] === player) {
      return true;
    }
  }
  
  return false;
}

/**
 * Validate if a move is legal according to game rules
 */
export function validateMove(state: GameState, player: PlayerColor, row: number, col: number): boolean {
  // Check if coordinates are valid
  if (!isValidCoordinate(row, col)) {
    return false;
  }
  
  // Check if cell is empty
  if (!isCellEmpty(state.board, row, col)) {
    return false;
  }
  
  // Check if it's the player's turn
  if (state.currentPlayer !== player) {
    return false;
  }
  
  // Check if game is already over
  if (state.winner !== null) {
    return false;
  }
  
  // First move rules: Red's first move can be anywhere
  if (!hasPlayerTiles(state.board, 'R') && player === 'R') {
    return true;
  }
  
  // Second move rules: Green's first move can be anywhere
  if (!hasPlayerTiles(state.board, 'G') && player === 'G') {
    return true;
  }
  
  // Subsequent moves: must be adjacent to player's existing tiles
  return isAdjacentToPlayerTile(state.board, player, row, col);
}

/**
 * Capture adjacent opponent tiles
 * Returns the updated board and the number of tiles captured
 */
export function captureTiles(board: Board, player: PlayerColor, row: number, col: number): { board: Board; capturedCount: number } {
  const newBoard = copyBoard(board);
  const opponent: PlayerColor = player === 'R' ? 'G' : 'R';
  let capturedCount = 0;
  
  // Get all adjacent cells
  const adjacentCells = getAdjacentCells(row, col);
  
  // Capture all adjacent opponent tiles
  for (const pos of adjacentCells) {
    if (newBoard[pos.row][pos.col] === opponent) {
      newBoard[pos.row][pos.col] = player;
      capturedCount++;
    }
  }
  
  return { board: newBoard, capturedCount };
}

/**
 * Execute a move: validate, place tile, capture opponents, update history, switch player
 */
export function executeMove(state: GameState, player: PlayerColor, row: number, col: number): GameState {
  // Validate the move
  if (!validateMove(state, player, row, col)) {
    throw new Error('Invalid move');
  }
  
  // Create a copy of the board
  let newBoard = copyBoard(state.board);
  
  // Place the player's tile
  newBoard[row][col] = player;
  
  // Capture adjacent opponent tiles
  const { board: boardAfterCapture, capturedCount } = captureTiles(newBoard, player, row, col);
  newBoard = boardAfterCapture;
  
  // Create move record
  const move = {
    player,
    row,
    col,
    timestamp: Date.now(),
    capturedCount
  };
  
  // Switch to the other player
  const nextPlayer: PlayerColor = player === 'R' ? 'G' : 'R';
  
  // Create updated game state
  const newState: GameState = {
    ...state,
    board: newBoard,
    currentPlayer: nextPlayer,
    moveHistory: [...state.moveHistory, move]
  };
  
  return newState;
}

/**
 * Check if a player has any valid moves available
 */
export function hasValidMoves(state: GameState, player: PlayerColor): boolean {
  // If player has no tiles yet, they can place anywhere (first move)
  if (!hasPlayerTiles(state.board, player)) {
    // Check if there are any empty cells
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (isCellEmpty(state.board, i, j)) {
          return true;
        }
      }
    }
    return false;
  }
  
  // Check all empty cells to see if any are adjacent to player's tiles
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (isCellEmpty(state.board, i, j) && isAdjacentToPlayerTile(state.board, player, i, j)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Detect if there's a winner or draw
 * Returns the winner ('R' or 'G'), 'draw', or null if game is still in progress
 */
export function detectWinner(state: GameState): PlayerColor | 'draw' | null {
  // Check if board is full
  if (isBoardFull(state.board)) {
    // Count tiles for each player
    const redCount = countPlayerTiles(state.board, 'R');
    const greenCount = countPlayerTiles(state.board, 'G');
    
    // Determine winner
    if (redCount > greenCount) {
      return 'R';
    } else if (greenCount > redCount) {
      return 'G';
    } else {
      return 'draw';
    }
  }
  
  // Check if current player has no valid moves (trapped)
  if (!hasValidMoves(state, state.currentPlayer)) {
    // Current player is trapped, opponent wins
    const opponent: PlayerColor = state.currentPlayer === 'R' ? 'G' : 'R';
    
    // Count tiles to determine winner
    const redCount = countPlayerTiles(state.board, 'R');
    const greenCount = countPlayerTiles(state.board, 'G');
    
    if (redCount > greenCount) {
      return 'R';
    } else if (greenCount > redCount) {
      return 'G';
    } else {
      return 'draw';
    }
  }
  
  return null;
}
