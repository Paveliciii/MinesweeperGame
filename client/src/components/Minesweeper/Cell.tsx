import type { CellProps } from "../../types/game";

export default function Cell({ 
  x, y, isRevealed, isMine, isFlagged, mineCount, gameOver,
  onClick, onRightClick 
}: CellProps) {
  const getCellContent = () => {
    if (isFlagged) return '';
    if (!isRevealed) return '';
    if (isMine) return '';
    return mineCount > 0 ? mineCount : '';
  };

  const getClassNames = () => {
    const classes = ['cell'];
    if (isRevealed) classes.push('revealed');
    if (isFlagged) classes.push('flagged');
    if (isRevealed && isMine) classes.push('mine');
    
    return classes.join(' ');
  };

  return (
    <button
      data-x={x}
      data-y={y}
      data-value={mineCount}
      onClick={onClick}
      onContextMenu={onRightClick}
      disabled={gameOver}
      className={getClassNames()}
    >
      {getCellContent()}
    </button>
  );
}
