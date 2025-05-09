import type { GameState } from '../../types/game';
import Cell from './Cell';
import { useMemo } from 'react';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
}

export default function GameBoard({ gameState, onCellClick, onCellRightClick }: GameBoardProps) {
  const getCellSize = () => {
    const maxWidth = Math.min(window.innerWidth - 32, 480);
    const cellSize = Math.floor(maxWidth / gameState.width);
    return Math.min(cellSize, 40); // Максимальный размер ячейки
  };

  const handleCellClick = (x: number, y: number) => {
    if (!gameState.gameOver) {
      onCellClick(x, y);
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (!gameState.gameOver) {
      onCellRightClick(x, y);
    }
  };

  const cellSize = useMemo(getCellSize, [gameState.width]);  const gridStyle = useMemo(() => ({
    gridTemplateColumns: `repeat(${gameState.width}, minmax(0, 1fr))`,
    gap: '2px',
    width: '100%',
    maxWidth: `${gameState.width * 36}px`,
    padding: '8px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }), [gameState.width, cellSize]);

  return (    <div className="flex justify-center items-center px-2 py-4">
      <div
        className="grid animate-fade-in"
        style={gridStyle}
      >
        {Array.from({ length: gameState.height }, (_, y) =>
          Array.from({ length: gameState.width }, (_, x) => {
            const adjustedX = x + 1;
            const adjustedY = y + 1;
            return (
              <Cell
                key={`${adjustedX}-${adjustedY}`}
                x={adjustedX}
                y={adjustedY}
                isRevealed={gameState.revealed[adjustedX][adjustedY]}
                isMine={gameState.mines[adjustedX][adjustedY]}
                isFlagged={gameState.flags[adjustedX][adjustedY]}
                mineCount={gameState.mineCount}
                gameOver={gameState.gameOver}
                onClick={() => handleCellClick(adjustedX, adjustedY)}
                onRightClick={(e) => handleCellRightClick(e, adjustedX, adjustedY)}
              />
            );
          })
        ).flat()}
      </div>
    </div>
  );
}
