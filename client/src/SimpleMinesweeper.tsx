import React from 'react';
import './minesweeper.css';

function SimpleMinesweeper() {
  // Размеры игрового поля
  const width = 8;
  const height = 8;
  
  // Создаем массив ячеек
  const cells = [];
  
  // Заполняем массив ячейками
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Случайно определяем, будет ли ячейка открыта, с флагом или с миной
      const isRevealed = Math.random() > 0.7;
      const isFlagged = !isRevealed && Math.random() > 0.8;
      const isMine = isRevealed && Math.random() > 0.8;
      const mineCount = isRevealed && !isMine ? Math.floor(Math.random() * 8) : 0;
      
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
      
      cells.push(
        <div
          key={`${x}-${y}`}
          className={cellClass}
          style={{
            width: '40px',
            height: '40px',
          }}
        >
          {content}
        </div>
      );
    }
  }
  
  return (
    <div className="container">
      <h1>Minesweeper Test</h1>
      <div className="game-board" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gap: '4px',
        padding: '8px',
        backgroundColor: '#d1d5db',
        borderRadius: '8px',
        width: `${width * 48}px`,
        margin: '0 auto'
      }}>
        {cells}
      </div>
    </div>
  );
}

export default SimpleMinesweeper;
