export interface GameState {
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
  isFlagMode?: boolean;
}

export interface CellProps {
  x: number;
  y: number;
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  mineCount: number;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  gameOver: boolean;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}