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

  // Определяем размер поля для стилей
  const boardSize = `${gameState.width}x${gameState.height}`;

  // Создаем массив ячеек
  const cells = [];
  
  for (let y = 1; y <= gameState.height; y++) {
    for (let x = 1; x <= gameState.width; x++) {
      const isMine = Boolean(gameState.mines[x]?.[y]);
      const isRevealed = Boolean(gameState.revealed[x]?.[y]);
      const isFlagged = Boolean(gameState.flags[x]?.[y]);
      
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
          isFlagged={isFlagged}
          isMine={isMine}
          mineCount={mineCount}
          gameOver={gameState.gameOver}
          onClick={() => onCellClick(x, y)}
          onRightClick={(e) => onCellRightClick(x, y, e)}
        />
      );
    }
  }

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch' as const
  };

  return (
    <div style={containerStyle}>
      <div 
        className="game-board"
        data-size={boardSize}
        style={{
          gridTemplateColumns: `repeat(${gameState.width}, 1fr)`,
          width: 'fit-content',
          maxWidth: '100%'
        }}
      >
        {cells}
      </div>
    </div>
  );
}

export default memo(GameBoard);
