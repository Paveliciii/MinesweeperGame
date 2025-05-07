import React, { useState, useEffect, useCallback } from 'react';
import { useMobile } from './hooks/use-mobile';
import './minesweeper.css';

// Типы данных
interface GameState {
  width: number;
  height: number;
  mineCount: number;
  remainingMines: number;
  gameOver: boolean;
  gameWon: boolean;
  showDifficultySelection: boolean;
  mines: boolean[][];
  revealed: boolean[][];
  flags: boolean[][];
}

// Настройки сложности
const difficulties = {
  easy: { size: 8, mineCount: 10 },
  medium: { size: 10, mineCount: 15 },
  hard: { size: 12, mineCount: 25 }
};

function FixedMinesweeper() {
  const isMobile = useMobile();
  const [isFlagMode, setIsFlagMode] = useState(false);
  const [time, setTime] = useState('00:00');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [touchTimeout, setTouchTimeout] = useState<number | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number, y: number } | null>(null);

  // Определяем sendGameResult до его использования
  const sendGameResult = useCallback((won: boolean) => {
    if (window.Telegram?.WebApp) {
      const result = {
        event: 'gameOver',
        won,
        time,
        difficulty: `${gameState.width}x${gameState.height}`,
        mineCount: gameState.mineCount
      };

      try {
        window.Telegram.WebApp.sendData(JSON.stringify(result));
      } catch (error) {
        console.error('Error sending data to Telegram:', error);
      }

      // Также отправляем на сервер для таблицы лидеров
      fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result)
      }).catch(console.error);
    }
  }, [time]);

  // Состояние игры
  const [gameState, setGameState] = useState<GameState>(() => {
    // Инициализируем с размерами по умолчанию
    const width = 8;
    const height = 8;
    const mineCount = 10;
    
    // Расширяем окно Telegram WebApp при запуске
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      
      // Устанавливаем цвет темы
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color',
        window.Telegram.WebApp.backgroundColor || '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-text-color',
        window.Telegram.WebApp.textColor || '#000000'
      );
    }
    
    // Создаем пустые массивы с правильными размерами (используя 1-индексированную сетку)
    const mines = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    const revealed = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    const flags = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    
    return {
      width,
      height,
      mineCount,
      remainingMines: mineCount,
      gameOver: false,
      gameWon: false,
      showDifficultySelection: false,
      mines,
      revealed,
      flags
    };
  });
  
  // Время
  const [time, setTime] = useState('00:00');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // В начале файла, где определены другие состояния, добавляем:
  const [touchTimeout, setTouchTimeout] = useState<number | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number, y: number } | null>(null);

  // Функция форматирования времени
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  // Запуск таймера при первом клике
  const startTimer = () => {
    if (intervalId === null) {
      const start = Date.now();
      setStartTime(start);
      const id = window.setInterval(() => {
        setTime(formatTime(Date.now() - start));
      }, 1000);
      setIntervalId(id);
    }
  };

  // Остановка таймера при окончании игры
  const stopTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Сброс таймера при новой игре
  useEffect(() => {
    if (gameState.showDifficultySelection) {
      stopTimer();
      setTime('00:00');
    }
  }, [gameState.showDifficultySelection]);

  // Остановка таймера при окончании игры
  useEffect(() => {
    if (gameState.gameOver) {
      stopTimer();
    }
  }, [gameState.gameOver]);

  // Очистка таймера при размонтировании компонента
  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Выбор сложности
  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    const settings = difficulties[difficulty];
    const width = settings.size;
    const height = settings.size;
    const mineCount = settings.mineCount;
    
    // Создаем пустые массивы с правильными размерами
    const mines = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    const revealed = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    const flags = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    
    // Размещаем мины случайным образом
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const x = Math.floor(Math.random() * width) + 1;
      const y = Math.floor(Math.random() * height) + 1;
      
      if (!mines[x][y]) {
        mines[x][y] = true;
        minesPlaced++;
      }
    }
    
    setGameState({
      width,
      height,
      mineCount,
      remainingMines: mineCount,
      gameOver: false,
      gameWon: false,
      showDifficultySelection: false,
      mines,
      revealed,
      flags
    });
  };
  
  // Показать выбор сложности
  const showDifficultySelection = () => {
    setGameState(prev => ({
      ...prev,
      showDifficultySelection: true
    }));
  };
  
  // Проверка на победу
  const checkWin = useCallback(() => {
    // Проверяем все ли мины помечены флагами
    let allMinesFlagged = true;
    let allSafeCellsRevealed = true;

    for (let x = 1; x <= gameState.width; x++) {
      for (let y = 1; y <= gameState.height; y++) {
        if (gameState.mines[x][y]) {
          if (!gameState.flags[x][y]) {
            allMinesFlagged = false;
          }
        } else {
          if (!gameState.revealed[x][y]) {
            allSafeCellsRevealed = false;
          }
        }
      }
    }

    if (allMinesFlagged || allSafeCellsRevealed) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        gameWon: true
      }));
      stopTimer();
      sendGameResult(true);
    }
  }, [stopTimer, sendGameResult]);

  // Обработка chord click (клик по открытой цифре)
  const handleChordClick = (x: number, y: number) => {
    if (gameState.gameOver || !gameState.revealed[x][y]) return;
    
    // Подсчитываем количество мин и флагов вокруг ячейки
    let adjacentMines = 0;
    let adjacentFlags = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 1 && nx <= gameState.width && ny >= 1 && ny <= gameState.height) {
          if (gameState.mines[nx][ny]) {
            adjacentMines++;
          }
          if (gameState.flags[nx][ny]) {
            adjacentFlags++;
          }
        }
      }
    }
    
    // Если количество флагов совпадает с числом на ячейке,
    // открываем все соседние неотмеченные ячейки
    if (adjacentFlags === adjacentMines) {
      const newRevealed = [...gameState.revealed.map(row => [...row])];
      let hitMine = false;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          
          const nx = x + dx;
          const ny = y + dy;
          
          if (nx >= 1 && nx <= gameState.width && 
              ny >= 1 && ny <= gameState.height && 
              !gameState.flags[nx][ny] && 
              !gameState.revealed[nx][ny]) {
            
            // Если попали на мину - игра окончена
            if (gameState.mines[nx][ny]) {
              hitMine = true;
              break;
            }
            
            newRevealed[nx][ny] = true;
            
            // Если открыли пустую ячейку, рекурсивно открываем соседние
            let surroundingMines = 0;
            for (let dx2 = -1; dx2 <= 1; dx2++) {
              for (let dy2 = -1; dy2 <= 1; dy2++) {
                const nx2 = nx + dx2;
                const ny2 = ny + dy2;
                if (nx2 >= 1 && nx2 <= gameState.width && 
                    ny2 >= 1 && ny2 <= gameState.height && 
                    gameState.mines[nx2][ny2]) {
                  surroundingMines++;
                }
              }
            }
            
            if (surroundingMines === 0) {
              for (let dx2 = -1; dx2 <= 1; dx2++) {
                for (let dy2 = -1; dy2 <= 1; dy2++) {
                  if (dx2 === 0 && dy2 === 0) continue;
                  const nx2 = nx + dx2;
                  const ny2 = ny + dy2;
                  if (nx2 >= 1 && nx2 <= gameState.width && 
                      ny2 >= 1 && ny2 <= gameState.height && 
                      !gameState.flags[nx2][ny2]) {
                    newRevealed[nx2][ny2] = true;
                  }
                }
              }
            }
          }
        }
        if (hitMine) break;
      }

      if (hitMine) {
        // Показываем все мины и заканчиваем игру
        setGameState(prev => ({
          ...prev,
          gameOver: true,
          revealed: prev.revealed.map((row, rx) => 
            row.map((cell, ry) => 
              prev.mines[rx][ry] ? true : cell
            )
          )
        }));
        stopTimer();
      } else {
        setGameState(prev => ({
          ...prev,
          revealed: newRevealed
        }));
        // Проверяем победу после хода
        checkWin();
      }
    }
  };

  // Обработка клика по ячейке
  const handleCellClick = useCallback((x: number, y: number) => {
    if (gameState.gameOver || gameState.flags[x][y]) return;

    // Если кликнули по открытой ячейке с цифрой
    if (gameState.revealed[x][y]) {
      handleChordClick(x, y);
      return;
    }

    // Запускаем таймер при первом клике
    if (intervalId === null) {
      startTimer();
    }

    // Проверяем, попали ли на мину
    if (gameState.mines[x][y]) {
      // Игра окончена
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        gameWon: false,
        revealed: prev.revealed.map((row, rx) => 
          row.map((cell, ry) => 
            prev.mines[rx][ry] ? true : cell
          )
        )
      }));
      stopTimer();
      sendGameResult(false);
      return;
    }
    
    // Открываем ячейку и соседние, если нет мин рядом
    const newRevealed = [...gameState.revealed.map(row => [...row])];
    
    // Рекурсивная функция для открытия ячеек
    const revealCell = (cx: number, cy: number) => {
      if (
        cx < 1 || cx > gameState.width || 
        cy < 1 || cy > gameState.height || 
        newRevealed[cx][cy] || 
        gameState.flags[cx][cy]
      ) {
        return;
      }
      
      newRevealed[cx][cy] = true;
      
      // Проверяем количество мин вокруг
      let mineCount = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          
          const nx = cx + dx;
          const ny = cy + dy;
          
          if (nx >= 1 && nx <= gameState.width &&
              ny >= 1 && ny <= gameState.height &&
              gameState.mines[nx][ny]) {
            mineCount++;
          }
        }
      }
      
      // Если нет мин вокруг, открываем соседние ячейки
      if (mineCount === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            revealCell(cx + dx, cy + dy);
          }
        }
      }
    };
    
    revealCell(x, y);
    
    setGameState(prev => ({
      ...prev,
      revealed: newRevealed
    }));

    // Проверяем победу после хода
    checkWin();
  }, [gameState, sendGameResult, stopTimer]);
  
  // Обработка правого клика (установка флага)
  const handleCellRightClick = (x: number, y: number, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (gameState.gameOver || gameState.revealed[x][y]) return;
    
    setGameState(prev => {
      const newFlags = [...prev.flags.map(row => [...row])];
      let newRemainingMines = prev.remainingMines;
      
      if (newFlags[x][y]) {
        newFlags[x][y] = false;
        newRemainingMines++;
      } else {
        newFlags[x][y] = true;
        newRemainingMines--;
      }
      
      return {
        ...prev,
        flags: newFlags,
        remainingMines: newRemainingMines
      };
    });

    // Запускаем таймер при первом действии
    if (intervalId === null) {
      startTimer();
    }

    // Проверяем победу после установки флага
    checkWin();
  };

  // Обработчики для мобильных устройств
  const handleTouchStart = (x: number, y: number, e: React.TouchEvent) => {
    e.preventDefault();
    if (gameState.gameOver) return;

    setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    
    // Устанавливаем таймер для определения длительного нажатия
    const timeout = window.setTimeout(() => {
      handleCellRightClick(x, y, e as unknown as React.MouseEvent);
      setTouchTimeout(null);
    }, 500);
    
    setTouchTimeout(timeout);
  };

  const handleTouchEnd = (x: number, y: number, e: React.TouchEvent) => {
    e.preventDefault();
    if (gameState.gameOver) return;

    // Если был таймер длительного нажатия, очищаем его
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }

    // Проверяем, не было ли значительного движения пальца
    if (touchStartPos) {
      const moveX = Math.abs(e.changedTouches[0].clientX - touchStartPos.x);
      const moveY = Math.abs(e.changedTouches[0].clientY - touchStartPos.y);
      
      // Если движение было минимальным и не было длительного нажатия
      if (moveX < 10 && moveY < 10) {
        // В режиме флажков обрабатываем как правый клик
        if (isFlagMode) {
          handleCellRightClick(x, y, e as unknown as React.MouseEvent);
        } else {
          handleCellClick(x, y);
        }
      }
    }
    
    setTouchStartPos(null);
  };

  const handleTouchMove = () => {
    // Если палец двигается, отменяем таймер длительного нажатия
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  };

  // Добавляем функцию для отправки результатов в Telegram
  const sendScoreToTelegram = useCallback((won: boolean, time: string) => {
    if (window.Telegram?.WebApp) {
      const message = won 
        ? `🎉 Победа! Время: ${time}`
        : `💣 Игра окончена. Время: ${time}`;
      
      window.Telegram.WebApp.sendData(JSON.stringify({
        event: 'gameOver',
        won,
        time,
        difficulty: `${gameState.width}x${gameState.height}`,
        mineCount: gameState.mineCount
      }));
    }
  }, [gameState.width, gameState.height, gameState.mineCount]);

  useEffect(() => {
    // Расширяем окно Telegram WebApp при запуске
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      
      // Устанавливаем цвета темы из Telegram
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color',
        window.Telegram.WebApp.backgroundColor || '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-text-color',
        window.Telegram.WebApp.textColor || '#000000'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-color',
        window.Telegram.WebApp.buttonColor || '#3390ec'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-text-color',
        window.Telegram.WebApp.buttonTextColor || '#ffffff'
      );
    }
  }, []);

  // Если выбор сложности, показываем меню
  if (gameState.showDifficultySelection) {
    return (
      <div className="container">
        <div className="difficulty-selection">
          <h2>Select Difficulty</h2>
          
          <button 
            className="difficulty-button"
            onClick={() => handleDifficultySelect('easy')}
          >
            Easy (8×8, 10 mines)
          </button>
          
          <button 
            className="difficulty-button"
            onClick={() => handleDifficultySelect('medium')}
          >
            Medium (10×10, 15 mines)
          </button>
          
          <button 
            className="difficulty-button"
            onClick={() => handleDifficultySelect('hard')}
          >
            Hard (12×12, 25 mines)
          </button>
        </div>
      </div>
    );
  }
  
  // Создаем массив ячеек
  const cells = [];
  
  for (let y = 1; y <= gameState.height; y++) {
    for (let x = 1; x <= gameState.width; x++) {
      const isMine = gameState.mines[x][y];
      const isRevealed = gameState.revealed[x][y];
      const isFlagged = gameState.flags[x][y];
      
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
                gameState.mines[nx][ny]) {
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
          onClick={isMobile ? undefined : () => handleCellClick(x, y)}
          onContextMenu={(e) => handleCellRightClick(x, y, e)}
          onTouchStart={(e) => handleTouchStart(x, y, e)}
          onTouchEnd={(e) => handleTouchEnd(x, y, e)}
          onTouchMove={handleTouchMove}
          title={isRevealed && mineCount > 0 ? "Нажмите на цифру, чтобы открыть соседние ячейки, если вокруг поставлено правильное количество флажков" : ""}
        >
          {content}
        </div>
      );
    }
  }
  
  return (
    <div className="container" style={{
      backgroundColor: 'var(--tg-theme-bg-color, #ffffff)',
      color: 'var(--tg-theme-text-color, #000000)'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Сапер</h1>
      <div className="header">
        <div style={{ fontWeight: 'bold' }}>🚩 Мины: {gameState.remainingMines}</div>
        <div style={{ fontWeight: 'bold' }}>⏱️ {time}</div>
        <div className="controls">
          {isMobile && (
            <button 
              onClick={() => setIsFlagMode(!isFlagMode)}
              title={isFlagMode ? "Режим открытия ячеек" : "Режим установки флажков"}
              style={{
                backgroundColor: isFlagMode ? '#ef4444' : '#3b82f6',
                marginRight: '0.5rem'
              }}
            >
              🚩
            </button>
          )}
          <button onClick={showDifficultySelection} title="Новая игра">🔄</button>
        </div>
      </div>
      
      {isMobile && (
        <div style={{ 
          marginBottom: '1rem',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          backgroundColor: '#f3f4f6',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          {isFlagMode ? 
            "Нажмите на ячейку, чтобы поставить/убрать флажок" :
            "Нажмите на ячейку, чтобы открыть её. Удерживайте для установки флажка"}
        </div>
      )}

      {gameState.gameOver && (
        <div style={{ 
          marginBottom: '1рем', 
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: gameState.gameWon ? '#4ade80' : '#ef4444',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {gameState.gameWon ? 'Победа! 🎉' : 'Игра окончена! 💣'}
        </div>
      )}
      
      <div 
        className="game-board"
        style={{ 
          gridTemplateColumns: `repeat(${gameState.width}, 1fr)`,
        }}
      >
        {cells}
      </div>
    </div>
  );
}

export default FixedMinesweeper;
