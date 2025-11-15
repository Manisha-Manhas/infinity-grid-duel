import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import GameBoard from './pages/GameBoard';
import { GameMode } from './types';
import './App.css';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (mode: GameMode) => {
    navigate(`/game/${mode}`);
  };

  return <Menu onStartGame={handleStartGame} />;
};

const GamePage: React.FC<{ mode: GameMode }> = ({ mode }) => {
  return <GameBoard mode={mode} />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/game/PvP" element={<GamePage mode="PvP" />} />
          <Route path="/game/PvAI" element={<GamePage mode="PvAI" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
