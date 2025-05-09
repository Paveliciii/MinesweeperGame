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
      2: 'text-green-600',
      3: 'text-red-500',
      4: 'text-blue-900',
      5: 'text-red-900',
      6: 'text-teal-600',
      7: 'text-black',
      8: 'text-gray-600',
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
        aspect-square w-full
        flex items-center justify-center
        text-base font-medium
        rounded-md border border-white/10
        bg-white/5 shadow-inner
        transition-all duration-150 select-none
        ${isRevealed ? 'bg-white/10' : 'hover:bg-white/15 active:bg-white/5'}
        ${isRevealed && !isMine && !isFlagged ? getNumberColor() : 'text-white'}
        ${!isRevealed && 'hover:-translate-y-0.5 active:translate-y-0'}
        focus:outline-none
      `}
    >
      {getCellContent()}
    </button>
  );
}
