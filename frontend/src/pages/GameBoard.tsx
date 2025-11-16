import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardGrid from '../components/BoardGrid';
import TurnIndicator from '../components/TurnIndicator';
import MoveList from '../components/MoveList';
import RestartButton from '../components/RestartButton';
import { GameState, GameMode } from '../types';
import { startGame, makeMove, makeAIMove } from '../api/gameApi';

interface GameBoardProps {
  mode: GameMode;
}

const GameBoard: React.FC<GameBoardProps> = ({ mode }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Handle AI turn
  useEffect(() => {
    if (gameState && mode === 'PvAI' && gameState.currentPlayer === 'G' && !gameState.winner) {
      handleAIMove();
    }
  }, [gameState?.currentPlayer, gameState?.winner]);

  const initializeGame = async () => {
    try {
      setLoading(true);
      const newGame = await startGame(mode);
      setGameState(newGame);
      setError(null);
    } catch (err) {
      setError('Failed to start game');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (!gameState || gameState.winner || loading) return;
    
    // In PvAI mode, only allow human player (Red) to click
    if (mode === 'PvAI' && gameState.currentPlayer === 'G') return;

    try {
      setLoading(true);
      const updatedGame = await makeMove(gameState.id, gameState.currentPlayer, row, col);
      setGameState(updatedGame);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid move');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleAIMove = async () => {
    if (!gameState || loading) return;

    try {
      setLoading(true);
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await makeAIMove(gameState.id);
      setGameState(response.gameState);
      setError(null);
    } catch (err) {
      setError('AI move failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = async () => {
    await initializeGame();
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  if (!gameState) {
    return <div className="loading">Loading game...</div>;
  }

  const getWinnerMessage = () => {
    if (!gameState.winner) return null;
    
    if (gameState.winner === 'draw') {
      return "It's a Draw!";
    }
    
    if (mode === 'PvAI') {
      return gameState.winner === 'R' ? '🎉 You Win!' : '🤖 AI Wins!';
    }
    
    return gameState.winner === 'R' ? '🎉 Red Wins!' : '🎉 Green Wins!';
  };

  return (
    <div className="game-board-page">
      {/* Winner Modal */}
      {gameState.winner && (
        <div className="winner-overlay">
          <div className="winner-modal">
            <h1 className="winner-title">{getWinnerMessage()}</h1>
            <p className="winner-subtitle">
              {gameState.winner === 'draw' 
                ? 'The board is full with no clear winner!' 
                : `${gameState.winner === 'R' ? 'Red' : 'Green'} player dominated the board!`}
            </p>
            <div className="winner-actions">
              <button onClick={handleRestart} className="btn-primary">
                Play Again
              </button>
              <button onClick={handleBackToMenu} className="btn-secondary">
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="game-header">
        <button onClick={handleBackToMenu} className="back-button">
          ← Back to Menu
        </button>
        <TurnIndicator
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          mode={mode}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-indicator">Processing...</div>}

      <div className="game-content">
        <div className="game-main">
          <BoardGrid
            board={gameState.board}
            onCellClick={handleCellClick}
            disabled={loading || gameState.winner !== null}
          />
        </div>

        <div className="game-sidebar">
          <MoveList moves={gameState.moveHistory} />
          <RestartButton onRestart={handleRestart} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
