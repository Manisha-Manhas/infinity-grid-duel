import React from 'react';

interface RestartButtonProps {
  onRestart: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => {
  return (
    <button onClick={onRestart} className="restart-button">
      Restart Game
    </button>
  );
};

export default RestartButton;
