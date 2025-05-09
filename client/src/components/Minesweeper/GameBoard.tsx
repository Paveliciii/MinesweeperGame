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

  const cellSize = useMemo(getCellSize, [gameState.width]);
  const gridStyle = useMemo(() => ({
    gridTemplateColumns: `repeat(${gameState.width}, minmax(0, 1fr))`,
    gap: '4px',
    maxWidth: `${cellSize * gameState.width + (gameState.width - 1) * 4}px`,
  }), [gameState.width, cellSize]);

  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className="grid w-full bg-black/20 backdrop-blur-sm rounded-2xl p-3"
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
