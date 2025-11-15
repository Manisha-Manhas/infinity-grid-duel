import React, { useEffect, useRef } from 'react';
import { Move } from '../types';

interface MoveListProps {
  moves: Move[];
}

const MoveList: React.FC<MoveListProps> = ({ moves }) => {
  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest move
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [moves]);

  return (
    <div className="move-list">
      <h3>Move History</h3>
      <div className="move-list-container">
        {moves.length === 0 ? (
          <p className="no-moves">No moves yet</p>
        ) : (
          <ul>
            {moves.map((move, index) => (
              <li key={index} className={`move-item move-${move.player}`}>
                <span className="move-number">#{index + 1}</span>
                <span className="move-player">{move.player}</span>
                <span className="move-position">
                  ({move.row}, {move.col})
                </span>
                {move.capturedCount > 0 && (
                  <span className="move-captures">
                    +{move.capturedCount} captured
                  </span>
                )}
              </li>
            ))}
            <div ref={listEndRef} />
          </ul>
        )}
      </div>
    </div>
  );
};

export default MoveList;
