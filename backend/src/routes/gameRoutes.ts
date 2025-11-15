import { Router, Request, Response } from 'express';
import { stateManager, initializeGame } from '../state/stateManager';
import { executeMove, detectWinner } from '../engine/gameEngine';
import { calculateAIMove } from '../ai/aiEngine';
import { GameMode, PlayerColor } from '../types';

const router = Router();

/**
 * POST /game/start
 * Start a new game
 */
router.post('/game/start', (req: Request, res: Response) => {
  try {
    const { mode } = req.body;
    
    // Validate mode
    if (!mode || (mode !== 'PvP' && mode !== 'PvAI')) {
      return res.status(400).json({
        error: 'Invalid mode',
        message: 'Mode must be either "PvP" or "PvAI"',
        statusCode: 400
      });
    }
    
    // Initialize new game
    const gameState = initializeGame(mode as GameMode);
    
    // Store the game
    stateManager.createGame(gameState);
    
    // Return the game state
    res.status(201).json(gameState);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    });
  }
});

export default router;

/**
 * GET /game/state/:id
 * Retrieve game state by ID
 */
router.get('/game/state/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Retrieve game state
    const gameState = stateManager.getGame(id);
    
    if (!gameState) {
      return res.status(404).json({
        error: 'Game not found',
        message: `Game with id ${id} does not exist`,
        statusCode: 404
      });
    }
    
    res.json(gameState);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    });
  }
});

/**
 * POST /game/move
 * Execute a player move
 */
router.post('/game/move', (req: Request, res: Response) => {
  try {
    const { gameId, player, row, col } = req.body;
    
    // Validate request body
    if (!gameId || !player || row === undefined || col === undefined) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Missing required fields: gameId, player, row, col',
        statusCode: 400
      });
    }
    
    // Validate player color
    if (player !== 'R' && player !== 'G') {
      return res.status(400).json({
        error: 'Invalid player',
        message: 'Player must be either "R" or "G"',
        statusCode: 400
      });
    }
    
    // Validate coordinates
    if (!Number.isInteger(row) || !Number.isInteger(col) || row < 0 || row > 5 || col < 0 || col > 5) {
      return res.status(400).json({
        error: 'Invalid coordinates',
        message: 'Row and col must be integers between 0 and 5',
        statusCode: 400
      });
    }
    
    // Retrieve game state
    const gameState = stateManager.getGame(gameId);
    
    if (!gameState) {
      return res.status(404).json({
        error: 'Game not found',
        message: `Game with id ${gameId} does not exist`,
        statusCode: 404
      });
    }
    
    // Check if game is already over
    if (gameState.winner !== null) {
      return res.status(409).json({
        error: 'Game already ended',
        message: 'Cannot make moves after game has ended',
        statusCode: 409
      });
    }
    
    // Execute the move
    try {
      const newState = executeMove(gameState, player as PlayerColor, row, col);
      
      // Check for winner
      const winner = detectWinner(newState);
      if (winner !== null) {
        newState.winner = winner;
      }
      
      // Update stored state
      stateManager.updateGame(gameId, newState);
      
      res.json(newState);
    } catch (moveError) {
      return res.status(400).json({
        error: 'Invalid move',
        message: moveError instanceof Error ? moveError.message : 'Move is not legal',
        statusCode: 400
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    });
  }
});

/**
 * POST /ai/move
 * Calculate and execute AI move
 */
router.post('/ai/move', (req: Request, res: Response) => {
  try {
    const { gameId } = req.body;
    
    // Validate request body
    if (!gameId) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Missing required field: gameId',
        statusCode: 400
      });
    }
    
    // Retrieve game state
    const gameState = stateManager.getGame(gameId);
    
    if (!gameState) {
      return res.status(404).json({
        error: 'Game not found',
        message: `Game with id ${gameId} does not exist`,
        statusCode: 404
      });
    }
    
    // Check if game is already over
    if (gameState.winner !== null) {
      return res.status(409).json({
        error: 'Game already ended',
        message: 'Cannot make moves after game has ended',
        statusCode: 409
      });
    }
    
    // Calculate AI move
    try {
      const aiMove = calculateAIMove(gameState);
      const aiPlayer = gameState.currentPlayer;
      
      // Execute the AI move
      const newState = executeMove(gameState, aiPlayer, aiMove.row, aiMove.col);
      
      // Check for winner
      const winner = detectWinner(newState);
      if (winner !== null) {
        newState.winner = winner;
      }
      
      // Update stored state
      stateManager.updateGame(gameId, newState);
      
      // Return the move coordinates and updated state
      res.json({
        row: aiMove.row,
        col: aiMove.col,
        gameState: newState
      });
    } catch (aiError) {
      return res.status(500).json({
        error: 'AI calculation error',
        message: aiError instanceof Error ? aiError.message : 'Failed to calculate AI move',
        statusCode: 500
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    });
  }
});
