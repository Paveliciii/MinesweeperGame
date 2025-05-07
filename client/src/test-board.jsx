import React from 'react';

function TestBoard() {
  return (
    <div className="container">
      <h1>Minesweeper Test</h1>
      
      <div 
        className="game-board"
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '4px',
          padding: '10px',
          backgroundColor: '#d1d5db',
          borderRadius: '8px',
          boxShadow: 'inset 0 0 0 2px rgba(0, 0, 0, 0.05)',
          width: '360px',
          margin: '0 auto'
        }}
      >
        {/* 8x8 grid of cells */}
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        
        <Cell revealed number={1} />
        <Cell revealed number={2} />
        <Cell revealed number={3} />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        
        <Cell revealed />
        <Cell flagged />
        <Cell revealed number={1} />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        
        <Cell revealed />
        <Cell revealed number={1} />
        <Cell revealed number={1} />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell mine />
        <Cell />
        
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
}

function Cell({ revealed, flagged, mine, number }) {
  let content = "";
  let cellStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    fontWeight: 'bold',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '2px solid #9ca3af',
    backgroundColor: '#f9fafb',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    userSelect: 'none',
    transition: 'all 0.2s ease'
  };
  
  if (flagged) {
    content = "🚩";
    cellStyle.backgroundColor = '#eff6ff';
    cellStyle.borderColor = '#3b82f6';
  } else if (revealed) {
    cellStyle.backgroundColor = '#e5e7eb';
    cellStyle.borderColor = '#9ca3af';
    cellStyle.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.1)';
    
    if (mine) {
      content = "💣";
      cellStyle.backgroundColor = '#ef4444';
      cellStyle.color = 'white';
      cellStyle.borderColor = '#b91c1c';
    } else if (number) {
      content = number.toString();
      
      // Цвета для разных чисел
      const colors = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000000', '#808080'];
      cellStyle.color = colors[number] || 'black';
    }
  }
  
  return (
    <div style={cellStyle}>
      {content}
    </div>
  );
}

export default TestBoard;
