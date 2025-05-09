import type { CellProps } from "../../types/game";

export default function Cell({ 
  x, y, isRevealed, isMine, isFlagged, mineCount, gameOver,
  onClick, onRightClick 
}: CellProps) {  const getCellContent = () => {    if (isFlagged) {
      return (
        <span 
          className="transform transition-all duration-300 animate-bounce-in"
          style={{ 
            animationDelay: '50ms',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        >
          🚩
        </span>
      );
    }
    if (!isRevealed) return null;
    if (isMine) {
      return (
        <span 
          className="transform transition-all duration-300 animate-bounce-in"
          style={{ 
            animationDelay: '50ms',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        >
          💣
        </span>
      );
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
  };  const getClassNames = () => {
    const baseClasses = [
      'w-8 h-8',
      'flex items-center justify-center',
      'text-sm font-bold',
      'border',
      'border-white/10',
      'rounded-lg',
      'transition-all duration-300',
      'cursor-pointer',
      'select-none',
      'animate-scale-in',
      'backdrop-blur-sm'
    ];    if (isRevealed) {
      if (isMine) {
        baseClasses.push(
          'bg-gradient-to-br from-rose-500/20 to-rose-600/30',
          'shadow-inner',
          'text-rose-400',
          'border-rose-500/30'
        );
      } else {
        baseClasses.push(
          'bg-gradient-to-br from-white/5 to-white/10',
          'shadow-inner',
          mineCount > 0 ? getNumberColor(mineCount) : 'text-white/60',
          'border-white/20'
        );
      }
    } else {
      baseClasses.push(
        'bg-gradient-to-br from-white/10 to-transparent',
        'hover:from-white/15 hover:to-white/5',
        'shadow-lg shadow-black/5',
        'hover:shadow-xl hover:shadow-black/10',
        'active:shadow-inner',
        'active:from-white/5 active:to-transparent',
        'active:transform active:scale-95',
        'border-white/20'
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
      1: 'text-sky-400',
      2: 'text-emerald-400',
      3: 'text-rose-400',
      4: 'text-violet-400',
      5: 'text-amber-400',
      6: 'text-fuchsia-400',
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
