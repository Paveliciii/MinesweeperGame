import { memo } from 'react';
import Cell from './Cell';
import type { GameState } from '../../types/game';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
}

function GameBoard({ gameState, onCellClick, onCellRightClick }: GameBoardProps) {
  // Вычисляем размер ячейки на основе размера экрана и размера поля
  const getCellSize = () => {
    const maxWidth = Math.min(window.innerWidth - 32, 500); // 32px для отступов
    return Math.floor(maxWidth / gameState.width);
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

  const cellSize = getCellSize();

  return (
    <div className="flex justify-center items-center p-4">
      <div 
        className="grid gap-2 p-6 rounded-2xl bg-surface/90 shadow-neumorphic animate-reveal"
        style={{
          gridTemplateColumns: `repeat(${gameState.width}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: gameState.height }, (_, y) => (
          Array.from({ length: gameState.width }, (_, x) => (
            <Cell
              key={`${x}-${y}`}
              x={x + 1}
              y={y + 1}
              isRevealed={gameState.revealed[x + 1][y + 1]}
              isMine={gameState.mines[x + 1][y + 1]}
              isFlagged={gameState.flags[x + 1][y + 1]}
              mineCount={gameState.mineCount}
              onClick={() => handleCellClick(x + 1, y + 1)}
              onRightClick={(e) => handleCellRightClick(e, x + 1, y + 1)}
            />
          ))
        )).flat()}
      </div>
    </div>
  );
}

export default memo(GameBoard);
