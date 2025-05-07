import { memo } from "react";
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
    // Добавляем отладочную информацию
    console.log('GameState debug:', {
      width: gameState.width,
      height: gameState.height,
      mines: gameState.mines,
      revealed: gameState.revealed,
      flags: gameState.flags
    });
    
    return (
      <div style={{ padding: '20px', backgroundColor: '#ffcccc', borderRadius: '8px', margin: '20px' }}>
        <h3>Отладочная информация:</h3>
        <p>width: {typeof gameState.width === 'number' ? gameState.width : 'не число'}</p>
        <p>height: {typeof gameState.height === 'number' ? gameState.height : 'не число'}</p>
        <p>mines: {gameState.mines ? 'есть' : 'нет'}</p>
        <p>revealed: {gameState.revealed ? 'есть' : 'нет'}</p>
        <p>flags: {gameState.flags ? 'есть' : 'нет'}</p>
      </div>
    );
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
      
      // Определяем класс и содержимое ячейки
      let cellClass = "cell";
      let content = "";
      
      if (isFlagged) {
        content = "🚩";
        cellClass += " flagged";
      } else if (isRevealed) {
        cellClass += " revealed";
        if (isMine) {
          content = "💣";
          cellClass += " mine";
        } else if (mineCount > 0) {
          content = mineCount.toString();
          cellClass += ` cell-${mineCount}`;
        }
      }
      
      // Показываем мины в конце игры
      if (gameState.gameOver && isMine && !isFlagged) {
        content = "💣";
        cellClass = "cell mine revealed";
      }
      
      cells.push(
        <div
          key={`${x}-${y}`}
          className={cellClass}
          data-x={x}
          data-y={y}
          onClick={() => onCellClick(x, y)}
          onContextMenu={(e) => {
            e.preventDefault();
            onCellRightClick(x, y, e);
          }}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            cursor: 'pointer',
            borderRadius: '0.25rem',
            border: '2px solid #9ca3af',
            backgroundColor: isFlagged ? '#eff6ff' : isRevealed ? '#e5e7eb' : '#f9fafb',
            boxShadow: isRevealed ? 'inset 0 2px 4px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.05)',
            transition: 'all 0.2s ease',
            userSelect: 'none'
          }}
        >
          {content}
        </div>
      );
    }
  }

  return (
    <div 
      className="game-board"
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${gameState.width}, 1fr)`,
        gap: '4px',
        padding: '8px',
        backgroundColor: '#d1d5db',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 2px rgba(0, 0, 0, 0.05)',
        width: `${gameState.width * 48}px`,
        margin: '0 auto'
      }}
    >
      {cells}
    </div>
  );
}

export default memo(GameBoard);
