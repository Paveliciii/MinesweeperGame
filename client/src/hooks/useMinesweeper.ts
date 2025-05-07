import { useState, useEffect, useCallback } from 'react';

// Определение типов
interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export interface GameState {
  board: Cell[][];
  rows: number;
  cols: number;
  totalMines: number;
  remainingMines: number;
  isGameOver: boolean;
  isVictory: boolean;
  isFlagMode: boolean;
  showDifficultySelection: boolean;
  width?: number;
  height?: number;
  mines?: Record<number, Record<number, boolean>>;
  revealed?: Record<number, Record<number, boolean>>;
  flags?: Record<number, Record<number, boolean>>;
  gameOver?: boolean;
}

interface GameResult {
  isVictory: boolean;
  gameTime: number;
}

// Уровни сложности
const DIFFICULTY_LEVELS = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
};

export function useMinesweeper() {
  // Состояние игры
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    rows: 0,
    cols: 0,
    totalMines: 0,
    remainingMines: 0,
    isGameOver: false,
    isVictory: false,
    isFlagMode: false,
    showDifficultySelection: true,
  });

  // Время игры
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Модальные окна
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [isGameOverModalVisible, setIsGameOverModalVisible] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>({ isVictory: false, gameTime: 0 });

  // Инициализация новой игры
  const initializeGame = useCallback((rows: number, cols: number, mines: number) => {
    // Создаем пустую доску
    const newBoard: Cell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );
    
    // Размещаем мины случайным образом
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }
    
    // Вычисляем количество соседних мин для каждой ячейки
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let adjacentMines = 0;
          
          // Проверяем все соседние ячейки
          for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
              if (newBoard[r][c].isMine) {
                adjacentMines++;
              }
            }
          }
          
          newBoard[row][col].adjacentMines = adjacentMines;
        }
      }
    }
    
    setGameState({
      board: newBoard,
      rows,
      cols,
      totalMines: mines,
      remainingMines: mines,
      isGameOver: false,
      isVictory: false,
      isFlagMode: false,
      showDifficultySelection: false,
    });
    
    // Сбрасываем и запускаем таймер
    setTime(0);
    setTimerActive(true);
  }, []);

  // Обработка выбора уровня сложности
  const handleDifficultySelect = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const { rows, cols, mines } = DIFFICULTY_LEVELS[difficulty];
    initializeGame(rows, cols, mines);
  }, [initializeGame]);

  // Открытие ячейки
  const revealCell = useCallback((row: number, col: number) => {
    if (gameState.isGameOver || gameState.board[row][col].isRevealed || gameState.board[row][col].isFlagged) {
      return;
    }

    const newBoard = [...gameState.board];
    
    // Если попали на мину - игра окончена
    if (newBoard[row][col].isMine) {
      // Открываем все мины
      for (let r = 0; r < gameState.rows; r++) {
        for (let c = 0; c < gameState.cols; c++) {
          if (newBoard[r][c].isMine) {
            newBoard[r][c].isRevealed = true;
          }
        }
      }
      
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        isGameOver: true,
      }));
      
      setTimerActive(false);
      setGameResult({ isVictory: false, gameTime: time });
      setIsGameOverModalVisible(true);
      return;
    }
    
    // Функция для рекурсивного открытия пустых ячеек
    const revealEmpty = (r: number, c: number) => {
      if (r < 0 || r >= gameState.rows || c < 0 || c >= gameState.cols || 
          newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) {
        return;
      }
      
      newBoard[r][c].isRevealed = true;
      
      // Если ячейка пустая, открываем соседние
      if (newBoard[r][c].adjacentMines === 0) {
        for (let nr = Math.max(0, r - 1); nr <= Math.min(gameState.rows - 1, r + 1); nr++) {
          for (let nc = Math.max(0, c - 1); nc <= Math.min(gameState.cols - 1, c + 1); nc++) {
            if (nr !== r || nc !== c) {
              revealEmpty(nr, nc);
            }
          }
        }
      }
    };
    
    revealEmpty(row, col);
    
    // Проверяем, выиграл ли игрок
    let unrevealedCells = 0;
    for (let r = 0; r < gameState.rows; r++) {
      for (let c = 0; c < gameState.cols; c++) {
        if (!newBoard[r][c].isRevealed && !newBoard[r][c].isMine) {
          unrevealedCells++;
        }
      }
    }
    
    if (unrevealedCells === 0) {
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        isGameOver: true,
        isVictory: true,
        remainingMines: 0,
      }));
      
      setTimerActive(false);
      setGameResult({ isVictory: true, gameTime: time });
      setIsGameOverModalVisible(true);
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
    }));
  }, [gameState, time]);

  // Установка/снятие флага
  const toggleFlag = useCallback((row: number, col: number) => {
    if (gameState.isGameOver || gameState.board[row][col].isRevealed) {
      return;
    }

    const newBoard = [...gameState.board];
    const cell = newBoard[row][col];
    
    // Если флаг уже установлен, снимаем его
    if (cell.isFlagged) {
      cell.isFlagged = false;
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        remainingMines: prev.remainingMines + 1,
      }));
    } 
    // Иначе устанавливаем флаг, если остались
    else if (gameState.remainingMines > 0) {
      cell.isFlagged = true;
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        remainingMines: prev.remainingMines - 1,
      }));
    }
  }, [gameState]);

  // Обработка клика по ячейке
  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState.isFlagMode) {
      toggleFlag(row, col);
    } else {
      revealCell(row, col);
    }
  }, [gameState.isFlagMode, revealCell, toggleFlag]);

  // Обработка правого клика по ячейке (для установки флага)
  const handleCellRightClick = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    toggleFlag(row, col);
  }, [toggleFlag]);

  // Переключение режима установки флагов
  const toggleFlagMode = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isFlagMode: !prev.isFlagMode,
    }));
  }, []);

  // Показать выбор сложности
  const showDifficultySelection = useCallback(() => {
    setTimerActive(false);
    setGameState(prev => ({
      ...prev,
      showDifficultySelection: true,
    }));
  }, []);

  // Начать новую игру
  const handleNewGame = useCallback(() => {
    setIsGameOverModalVisible(false);
    showDifficultySelection();
  }, [showDifficultySelection]);

  // Управление модальным окном помощи
  const showHelp = useCallback(() => {
    setIsHelpVisible(true);
  }, []);

  const closeHelp = useCallback(() => {
    setIsHelpVisible(false);
  }, []);

  // Закрытие модального окна окончания игры
  const closeGameOverModal = useCallback(() => {
    setIsGameOverModalVisible(false);
  }, []);

  // Обновление таймера
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

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
