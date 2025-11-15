import React from 'react';
import { GameMode } from '../types';

interface MenuProps {
  onStartGame: (mode: GameMode) => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame }) => {
  return (
    <div className="menu">
      <h1>Infinity Grid Duel</h1>
      <p>Choose your game mode:</p>
      <div className="menu-buttons">
        <button onClick={() => onStartGame('PvP')} className="menu-button">
          Player vs Player
        </button>
        <button onClick={() => onStartGame('PvAI')} className="menu-button">
          Player vs AI
        </button>
      </div>
    </div>
  );
};

export default Menu;
