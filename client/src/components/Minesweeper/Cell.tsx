import type { CellProps } from "../../types/game";

export default function Cell({ 
  x, y, isRevealed, isMine, isFlagged, mineCount, gameOver,
  onClick, onRightClick 
}: CellProps) {
  const getCellContent = () => {
    if (isFlagged) return '🚩';
    if (!isRevealed) return '';
    if (isMine) return '💣';
    return mineCount > 0 ? mineCount : '';
  };

  const getNumberColor = () => {
    const colors = {
      1: 'text-blue-500',
      2: 'text-emerald-500',
      3: 'text-rose-500',
      4: 'text-blue-700',
      5: 'text-rose-700',
      6: 'text-teal-600',
      7: 'text-slate-700',
      8: 'text-slate-500'
    };
    return colors[mineCount as keyof typeof colors] || '';
  };

  return (
    <button
      data-x={x}
      data-y={y}
      onClick={onClick}
      onContextMenu={onRightClick}
      disabled={gameOver}
      className={`
        w-9 h-9 sm:w-10 sm:h-10 
        flex items-center justify-center
        text-lg font-medium
        rounded-lg 
        transition-all duration-200
        select-none
        ${isRevealed
          ? 'bg-white/10 backdrop-blur-sm'
          : 'bg-white/20 hover:bg-white/25 active:bg-white/15'
        }
        ${isRevealed && !isMine && !isFlagged ? getNumberColor() : 'text-white'}
        ${isRevealed ? 'scale-100' : 'hover:scale-105 active:scale-95'}
      `}
    >
      {getCellContent()}
    </button>
  );
}
