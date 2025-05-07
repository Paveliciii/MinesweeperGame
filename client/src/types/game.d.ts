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
  isFlagMode?: boolean;
}