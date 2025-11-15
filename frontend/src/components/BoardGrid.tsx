import React from 'react';
import { Board } from '../types';

interface BoardGridProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
}

const BoardGrid: React.FC<BoardGridProps> = ({ board, onCellClick, disabled }) => {
  const getCellClass = (cell: 0 | 'R' | 'G'): string => {
    if (cell === 'R') return 'cell cell-red';
    if (cell === 'G') return 'cell cell-green';
    return 'cell cell-empty';
  };

  return (
    <div className="board-grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClass(cell)}
              onClick={() => !disabled && onCellClick(rowIndex, colIndex)}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              {cell !== 0 && <span className="cell-marker">{cell}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardGrid;
