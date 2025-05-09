import { useState, useEffect, useCallback } from 'react';
import { placeMines, countAdjacentMines } from '../lib/minesweeperUtils';

// Difficulty settings
const difficulties = {
  easy: { size: 8, mineCount: 10 },
  medium: { size: 10, mineCount: 15 },
  hard: { size: 12, mineCount: 25 }
};

// Define the game state type
export interface GameState {
  width: number;
  height: number;
  mineCount: number;
  remainingMines: number;
  gameOver: boolean;
  gameWon: boolean;
  isFlagMode: boolean;
  showDifficultySelection: boolean;
  mines: boolean[][];
  revealed: boolean[][];
  flags: boolean[][];
}

export function useMinesweeper() {
  // Game state
  const [gameState, setGameState] = useState<GameState>(() => {
    // Инициализируем с размерами по умолчанию
    const width = 10;
    const height = 10;
    const mineCount = 15;
    
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
      isFlagMode: false,
      showDifficultySelection: true,
      mines,
      revealed,
      flags
    };
  });

  // Time tracking
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  // UI state
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);
  const [gameResult, setGameResult] = useState<{ isVictory: boolean, gameTime: number }>({ isVictory: false, gameTime: 0 });

  // Timer update function
  const updateTimer = useCallback(() => {
    if (!gameStarted || gameState.gameOver) return;
    
    const currentTime = Date.now() - startTime;
    setTime(currentTime);
  }, [gameStarted, gameState.gameOver, startTime]);

  // Start timer
  const startTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    const interval = window.setInterval(updateTimer, 1000);
    setTimerInterval(interval);
  }, [timerInterval, updateTimer]);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  // Initialize the game when difficulty changes
  const initializeGame = useCallback((width: number, height: number, mineCount: number) => {
    // Reset game state
    setGameStarted(false);
    setTime(0);
    stopTimer();
    
    // Create empty arrays with correct dimensions (using 1-indexed grid)
    const mines = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    const revealed = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    const flags = Array(width + 2).fill(null).map(() => Array(height + 2).fill(false));
    
    setGameState({
      width,
      height,
      mineCount,
      remainingMines: mineCount,
      gameOver: false,
      gameWon: false,
      isFlagMode: false,
      showDifficultySelection: false,
      mines,
      revealed,
      flags
    });
  }, [stopTimer]);

  // Handle difficulty selection
  const handleDifficultySelect = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const settings = difficulties[difficulty];
    initializeGame(settings.size, settings.size, settings.mineCount);
  }, [initializeGame]);

  // Show difficulty selection
  const showDifficultySelection = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      showDifficultySelection: true
    }));
  }, []);

  // Toggle flag mode
  const toggleFlagMode = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isFlagMode: !prevState.isFlagMode
    }));
  }, []);

  // Help dialog functions
  const showHelp = useCallback(() => {
    setIsHelpVisible(true);
  }, []);
  
  const closeHelp = useCallback(() => {
    setIsHelpVisible(false);
  }, []);
  
  // End game function (needs to be defined before checkWinCondition)
  const endGame = useCallback((win: boolean) => {
    setGameState(prevState => ({
      ...prevState,
      gameOver: true,
      gameWon: win
    }));
    stopTimer();
    
    setGameResult({
      isVictory: win,
      gameTime: time
    });
    
    // Show game over modal
    setTimeout(() => {
      setIsGameOverModalVisible(true);
    }, 300);
  }, [stopTimer, time]);
  
  // Close game over modal
  const closeGameOverModal = useCallback(() => {
    setIsGameOverModalVisible(false);
    
    // If loss, show difficulty selection
    if (!gameResult.isVictory) {
      showDifficultySelection();
    }
  }, [gameResult.isVictory, showDifficultySelection]);
  
  // Start new game button handler
  const handleNewGame = useCallback(() => {
    setIsGameOverModalVisible(false);
    showDifficultySelection();
  }, [showDifficultySelection]);
  
  // Check win condition
  const checkWinCondition = useCallback((state: GameState) => {
    if (state.gameOver) return state;
    
    // Two ways to win:
    // 1. All non-mine cells are revealed
    // 2. All mines are flagged
    
    let allNonMinesRevealed = true;
    let allMinesFlagged = true;
    
    for (let x = 1; x <= state.width; x++) {
      for (let y = 1; y <= state.height; y++) {
        // Check if all non-mine cells are revealed
        if (!state.mines[x]?.[y] && !state.revealed[x]?.[y]) {
          allNonMinesRevealed = false;
        }
        
        // Check if all mines are flagged
        if (state.mines[x]?.[y] && !state.flags[x]?.[y]) {
          allMinesFlagged = false;
        }
      }
    }
    
    if (allNonMinesRevealed || allMinesFlagged) {
      endGame(true);
      return true;
    }
    
    return false;
  }, [endGame]);
  
  // Reveal all mines
  const revealAllMines = useCallback(() => {
    setGameState(prevState => {
      const newRevealed = [...prevState.revealed.map(row => [...row])];
      
      // Reveal all mines
      for (let x = 1; x <= prevState.width; x++) {
        for (let y = 1; y <= prevState.height; y++) {
          if (prevState.mines[x]?.[y]) {
            newRevealed[x][y] = true;
          }
        }
      }
      
      return {
        ...prevState,
        revealed: newRevealed
      };
    });
  }, []);

  // Handle right click (flag placement)
  const handleCellRightClick = useCallback((x: number, y: number) => {
    // Don't allow to flag revealed cells or after game over
    if (gameState.gameOver || gameState.revealed[x]?.[y]) {
      console.log('Cannot flag revealed cell or after game over');
      return;
    }

    setGameState(prevState => {
      // Recheck the revealed status inside the state update to be extra safe
      if (prevState.revealed[x]?.[y]) {
        console.log('Cell already revealed, cannot flag');
        return prevState;
      }
      
      // Copy arrays to avoid mutation
      const newFlags = [...prevState.flags.map(row => [...row])];
      
      // Toggle flag
      let newRemainingMines = prevState.remainingMines;
      
      if (newFlags[x]?.[y]) {
        // Remove flag
        newFlags[x][y] = false;
        newRemainingMines++;
      } else {
        // Add flag if we have remaining mines
        if (newRemainingMines > 0) {
          newFlags[x][y] = true;
          newRemainingMines--;
        } else {
          console.log('No more flags available');
          return prevState;
        }
      }
      
      const newState = {
        ...prevState,
        flags: newFlags,
        remainingMines: newRemainingMines
      };
      
      // Check win condition after flag placement
      checkWinCondition(newState);
      
      return newState;
    });
  }, [gameState.gameOver, gameState.revealed, checkWinCondition]);
  
  // Reveal cell and surrounding cells recursively
  const revealCell = useCallback((x: number, y: number) => {
    // Out of bounds or already revealed or flagged
    if (
      x < 1 || x > gameState.width || 
      y < 1 || y > gameState.height || 
      gameState.revealed[x]?.[y] || 
      gameState.flags[x]?.[y]
    ) {
      return;
    }
    
    setGameState(prevState => {
      // Copy arrays to avoid mutation
      const newRevealed = [...prevState.revealed.map(row => [...row])];
      
      // Recursive function to reveal cells
      const revealRecursive = (cx: number, cy: number) => {
        // Skip if out of bounds or already revealed
        if (
          cx < 1 || cx > prevState.width || 
          cy < 1 || cy > prevState.height || 
          newRevealed[cx][cy] || 
          prevState.flags[cx][cy]
        ) {
          return;
        }
        
        // Mark cell as revealed
        newRevealed[cx][cy] = true;
        
        // If empty cell (no adjacent mines), reveal neighbors
        const adjacentMines = countAdjacentMines(
          prevState.mines, 
          cx, 
          cy, 
          prevState.width, 
          prevState.height
        );
        
        if (adjacentMines === 0) {
          // Reveal all 8 adjacent cells
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
              revealRecursive(cx + dx, cy + dy);
            }
          }
        }
      };
      
      // Start recursive reveal
      revealRecursive(x, y);
      
      const newState = {
        ...prevState,
        revealed: newRevealed
      };
      
      // Check win condition after revealing
      checkWinCondition(newState);
      
      return newState;
    });
  }, [gameState.width, gameState.height, checkWinCondition]);

  // Chord click function - reveal neighboring cells if appropriate number of flags placed
  const handleChordClick = useCallback((x: number, y: number) => {
    if (gameState.gameOver || !gameState.revealed[x]?.[y]) return;
    
    // Only proceed if the cell has a number (adjacent mines)
    let adjacentMines = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 1 && nx <= gameState.width &&
            ny >= 1 && ny <= gameState.height &&
            gameState.mines[nx]?.[ny]) {
          adjacentMines++;
        }
      }
    }
    
    // Count adjacent flags
    let adjacentFlags = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 1 && nx <= gameState.width &&
            ny >= 1 && ny <= gameState.height &&
            gameState.flags[nx]?.[ny]) {
          adjacentFlags++;
        }
      }
    }
    
    // If the number of adjacent flags matches the number of adjacent mines, reveal all unflagged neighbors
    if (adjacentFlags === adjacentMines) {
      // Check if any of the adjacent cells has a mine but is not flagged (this would be a mistake)
      let foundMine = false;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          
          const nx = x + dx;
          const ny = y + dy;
          
          if (nx >= 1 && nx <= gameState.width &&
              ny >= 1 && ny <= gameState.height &&
              !gameState.revealed[nx]?.[ny] && 
              !gameState.flags[nx]?.[ny] && 
              gameState.mines[nx]?.[ny]) {
            foundMine = true;
          }
        }
        if (foundMine) break;
      }

      if (foundMine) {
        // Если нашли мину, сразу заканчиваем игру
        setGameState(prevState => {
          const newRevealed = [...prevState.revealed.map(row => [...row])];
          
          // Только открываем соседние клетки с минами для визуализации
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
              const nx = x + dx;
              const ny = y + dy;
              
              if (nx >= 1 && nx <= prevState.width &&
                  ny >= 1 && ny <= prevState.height &&
                  !prevState.revealed[nx]?.[ny] && 
                  !prevState.flags[nx]?.[ny] && 
                  prevState.mines[nx]?.[ny]) {
                newRevealed[nx][ny] = true;
              }
            }
          }
          
          return {
            ...prevState,
            revealed: newRevealed,
            gameOver: true // Сразу устанавливаем конец игры
          };
        });
        
        // И вызываем функции завершения игры
        revealAllMines();
        endGame(false);
      } else {
        // Если нет мин, продолжаем обычное открытие
        setGameState(prevState => {
          const newRevealed = [...prevState.revealed.map(row => [...row])];
          
          // Открываем все соседние клетки без флагов
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
              const nx = x + dx;
              const ny = y + dy;
              
              if (nx >= 1 && nx <= prevState.width &&
                  ny >= 1 && ny <= prevState.height &&
                  !prevState.revealed[nx]?.[ny] && 
                  !prevState.flags[nx]?.[ny]) {
                newRevealed[nx][ny] = true;
                
                // Если клетка пустая (без соседних мин), рекурсивно открываем соседей
                const adjacentMines = countAdjacentMines(
                  prevState.mines, 
                  nx, 
                  ny, 
                  prevState.width, 
                  prevState.height
                );
                
                if (adjacentMines === 0) {
                  // Используем функцию revealCell для рекурсивного открытия
                  revealCell(nx, ny);
                }
              }
            }
          }
          
          return {
            ...prevState,
            revealed: newRevealed
          };
        });
        
        // Проверяем условие победы
        setTimeout(() => {
          checkWinCondition(gameState);
        }, 100);
      }
    }
  }, [gameState, revealAllMines, endGame, checkWinCondition, revealCell]);
  
  // Handle cell click
  const handleCellClick = useCallback((x: number, y: number) => {
    if (gameState.gameOver || gameState.flags[x]?.[y]) return;
    
    // If clicking on a revealed numbered cell, do a chord click
    if (gameState.revealed[x]?.[y]) {
      handleChordClick(x, y);
      return;
    }
    
    // If in flag mode, handle as right click but only if the cell is not revealed
    if (gameState.isFlagMode) {
      if (!gameState.revealed[x]?.[y]) {
        handleCellRightClick(x, y);
      } else {
        console.log('Cannot flag revealed cell');
      }
      return;
    }
    
    // Handle first click - initialize mines
    if (!gameStarted) {
      setGameStarted(true);
      const newStartTime = Date.now();
      setStartTime(newStartTime);
      startTimer();
      
      // Place mines avoiding first click and its surroundings
      const newMines = [...gameState.mines.map(row => [...row])];
      placeMines(newMines, gameState.width, gameState.height, gameState.mineCount, x, y);
      
      setGameState(prevState => ({
        ...prevState,
        mines: newMines
      }));
    }
    
    // Check if clicked on mine
    if (gameState.mines[x]?.[y]) {
      // Game over - reveal all mines
      revealAllMines();
      endGame(false);
      return;
    }
    
    // Reveal the clicked cell and potentially its neighbors
    revealCell(x, y);
  }, [
    gameState, 
    gameStarted, 
    handleChordClick, 
    handleCellRightClick, 
    startTimer, 
    revealAllMines, 
    endGame, 
    revealCell
  ]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return {
    gameState,
    time,
    isHelpVisible,
    isGameOverModalVisible,
    gameResult,
    handleDifficultySelect,
    handleCellClick,
    handleCellRightClick,
    toggleFlagMode,
    showDifficultySelection,
    showHelp,
    closeHelp,
    closeGameOverModal,
    handleNewGame
  };
}
