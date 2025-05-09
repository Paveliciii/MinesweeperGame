import type { CellProps } from "../../types/game";

export default function Cell({ 
  x, y, isRevealed, isMine, isFlagged, mineCount, gameOver,
  onClick, onRightClick 
}: CellProps) {  const getCellContent = () => {
    if (isFlagged) {
      return (
        <span className="transform transition-transform duration-200 animate-scale-in" style={{ animationDelay: '50ms' }}>
          🚩
        </span>
      );
    }
    if (!isRevealed) return null;
    if (isMine) {
      return (
        <span className="transform transition-transform duration-200 animate-scale-in" style={{ animationDelay: '50ms' }}>
          💣
        </span>      );
    }
    if (mineCount > 0) {
      return (
        <span 
          className={`font-medium transform transition-transform duration-200 animate-scale-in ${getNumberColor(mineCount)}`}
          style={{ animationDelay: '50ms' }}
        >
          {mineCount}
        </span>
      );
    }
    return null;
  };
  const getClassNames = () => {
    const baseClasses = [
      'w-8 h-8',
      'flex items-center justify-center',
      'text-sm font-medium',
      'border border-white/10',
      'transition-all duration-200',
      'cursor-pointer',
      'select-none',
      'animate-scale-in'
    ];

    if (isRevealed) {
      if (isMine) {
        baseClasses.push(
          'bg-gradient-glass',
          'backdrop-blur-glass',
          'shadow-glass',
          'text-rose-400'
        );
      } else {
        baseClasses.push(
          'bg-gradient-glass',
          'backdrop-blur-glass',
          'shadow-glass',
          mineCount > 0 ? getNumberColor(mineCount) : 'text-white/60'
        );
      }
    } else {
      baseClasses.push(
        'bg-gradient-glass',
        'backdrop-blur-glass',
        'shadow-button',
        'hover:shadow-button-hover',
        'active:shadow-glass',
        'active:transform',
        'active:scale-95'
      );
    }

    if (isFlagged) {
      baseClasses.push('text-tg-button');
    }

    if (gameOver) {
      baseClasses.push('cursor-default', 'opacity-80');
    }

    return baseClasses.join(' ');
  };

  const getNumberColor = (number: number) => {
    const colors = {
      1: 'text-blue-400',
      2: 'text-green-400',
      3: 'text-rose-400',
      4: 'text-purple-400',
      5: 'text-yellow-400',
      6: 'text-pink-400',
      7: 'text-indigo-400',
      8: 'text-orange-400'
    };
    return colors[number as keyof typeof colors] || 'text-white/90';
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
