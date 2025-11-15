import React from 'react';
import { PlayerColor } from '../types';

interface TurnIndicatorProps {
  currentPlayer: PlayerColor;
  winner: PlayerColor | 'draw' | null;
  mode: string;
}

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ currentPlayer, winner, mode }) => {
  const getPlayerName = (player: PlayerColor): string => {
    if (mode === 'PvAI' && player === 'G') {
      return 'AI (Green)';
    }
    return player === 'R' ? 'Red' : 'Green';
  };

  if (winner) {
    if (winner === 'draw') {
      return (
        <div className="turn-indicator">
          <h2>Game Over - It's a Draw!</h2>
        </div>
      );
    }
    return (
      <div className="turn-indicator">
        <h2>Game Over - {getPlayerName(winner)} Wins!</h2>
      </div>
    );
  }

  return (
    <div className="turn-indicator">
      <h2>Current Turn: {getPlayerName(currentPlayer)}</h2>
    </div>
  );
};

export default TurnIndicator;
