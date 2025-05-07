import { memo } from "react";
import Cell from "./Cell";
import { GameState } from "../../hooks/useMinesweeper";

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number, e: React.MouseEvent) => void;
}

function GameBoard({ gameState, onCellClick, onCellRightClick }: GameBoardProps) {
  if (gameState.showDifficultySelection) {
    return null;
  }

  // Защита от отсутствия необходимых полей
  if (
    typeof gameState.width !== 'number' ||
    typeof gameState.height !== 'number' ||
    !gameState.mines ||
    !gameState.revealed ||
    !gameState.flags
  ) {
    return null;
  }

  // Создаем массив ячеек
  const cells = [];
  
  for (let y = 1; y <= gameState.height; y++) {
    for (let x = 1; x <= gameState.width; x++) {
      const isMine = !!gameState.mines[x]?.[y];
      const isRevealed = !!gameState.revealed[x]?.[y];
      const isFlagged = !!gameState.flags[x]?.[y];
      
      // Получаем количество соседних мин для открытых ячеек
      let mineCount = 0;
      if (isRevealed && !isMine) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 1 && nx <= gameState.width &&
                ny >= 1 && ny <= gameState.height &&
                gameState.mines[nx]?.[ny]) {
              mineCount++;
            }
          }
        }
      }
      
      cells.push(
        <Cell
          key={`${x}-${y}`}
          x={x}
          y={y}
          isRevealed={isRevealed}
          isMine={isMine}
          isFlagged={isFlagged}
          mineCount={mineCount}
          gameOver={gameState.gameOver}
          onClick={() => onCellClick(x, y)}
          onRightClick={(e) => onCellRightClick(x, y, e)}
        />
      );
    }
  }

  return (
    <div 
      className="game-board"
      style={{ 
        gridTemplateColumns: `repeat(${gameState.width}, minmax(0, 1fr))`,
        width: `${gameState.width * 2.8}rem`,
        height: `${gameState.height * 2.8}rem`,
      }}
    >
      {cells}
    </div>
  );
}

export default memo(GameBoard);
