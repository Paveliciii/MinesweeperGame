// Place mines on the board, avoiding the first click and its surroundings
export function placeMines(
  mines: boolean[][],
  width: number,
  height: number,
  mineCount: number,
  safeX: number,
  safeY: number
): void {
  let placedMines = 0;

  while (placedMines < mineCount) {
    const x = Math.floor(Math.random() * width) + 1;
    const y = Math.floor(Math.random() * height) + 1;

    // Skip if already a mine or in safe area
    if (
      mines[x][y] || 
      (Math.abs(x - safeX) <= 1 && Math.abs(y - safeY) <= 1)
    ) {
      continue;
    }

    mines[x][y] = true;
    placedMines++;
  }
}

// Count adjacent mines around a cell
export function countAdjacentMines(
  mines: boolean[][],
  x: number,
  y: number,
  width: number,
  height: number
): number {
  let count = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;

      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 1 && 
        nx <= width && 
        ny >= 1 && 
        ny <= height && 
        mines[nx][ny]
      ) {
        count++;
      }
    }
  }

  return count;
}

// Format time in mm:ss format
export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
