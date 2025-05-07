import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './minesweeper.css';

// Простой компонент ячейки
function Cell({ isRevealed, isMine, isFlagged, mineCount, onClick, onRightClick }) {
  let content = "";
  let cellClass = "cell";

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

  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick();
  };

  return (
    <div 
      className={cellClass}
      onClick={onClick}
      onContextMenu={handleRightClick}
    >
      {content}
    </div>
  );
}

// Простой компонент игрового поля
function GameBoard() {
  const width = 8;
  const height = 8;
  
  // Состояние для ячеек
  const [cells, setCells] = useState(
    Array(height).fill(null).map(() => 
      Array(width).fill(null).map(() => ({
        isRevealed: false,
        isMine: Math.random() < 0.15, // 15% вероятность мины
        isFlagged: false,
        mineCount: 0
      }))
    )
  );

  // Обработчик клика по ячейке
  const handleCellClick = (x, y) => {
    if (cells[y][x].isFlagged) return;
    
    setCells(prevCells => {
      const newCells = [...prevCells.map(row => [...row])];
      newCells[y][x].isRevealed = true;
      return newCells;
    });
  };

  // Обработчик правого клика по ячейке
  const handleCellRightClick = (x, y) => {
    setCells(prevCells => {
      const newCells = [...prevCells.map(row => [...row])];
      newCells[y][x].isFlagged = !newCells[y][x].isFlagged;
      return newCells;
    });
  };

  return (
    <div className="game-container">
      <h1>Minesweeper Test</h1>
      
      <div 
        className="game-board"
        style={{ 
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          width: `${width * 3}rem`,
        }}
      >
        {cells.map((row, y) => 
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              isRevealed={cell.isRevealed}
              isMine={cell.isMine}
              isFlagged={cell.isFlagged}
              mineCount={cell.mineCount}
              onClick={() => handleCellClick(x, y)}
              onRightClick={() => handleCellRightClick(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Основное приложение
function App() {
  return (
    <div className="container">
      <GameBoard />
    </div>
  );
}

// Рендерим приложение
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
