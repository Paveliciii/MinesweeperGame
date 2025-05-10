import type { CellProps } from "../../types/game";
import { Flag, Bomb } from 'lucide-react';

export default function Cell({ 
  x, y, isRevealed, isMine, isFlagged, mineCount, gameOver,
  onClick, onRightClick 
}: CellProps) {
  const getCellContent = () => {
    if (isFlagged) {
      return (
        <Flag className="w-5 h-5 text-blue-500 drop-shadow" strokeWidth={2.2} />
      );
    }
    if (!isRevealed) return null;
    if (isMine) {
      return (
        <Bomb className="w-5 h-5 text-red-500 drop-shadow" strokeWidth={2.2} />
      );
    }
    if (mineCount > 0) {
      return (
        <span 
          className={`font-medium transition-transform duration-200 animate-scale-in ${getNumberColor(mineCount)}`}
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
      'text-sm font-bold',
      'border',
      'border-white/10',
      'rounded-xl',
      'transition-all duration-300',
      'cursor-pointer',
      'select-none',
      'bg-gradient-to-br from-gray-100 to-gray-200',
      'shadow-md',
      'hover:shadow-lg',
      'active:scale-95',
    ];
    if (isRevealed) {
      if (isMine) {
        baseClasses.push(
          'bg-gradient-to-br from-red-600 to-red-800',
          'shadow-lg',
          'text-white',
          'border-red-700'
        );
      } else {
        baseClasses.push(
          'bg-gradient-to-br from-white to-gray-100',
          'shadow-inner',
          mineCount > 0 ? getNumberColor(mineCount) : 'text-gray-400',
          'border-gray-300',
          'animate-scale-in'
        );
      }
    } else if (isFlagged) {
      baseClasses.push('bg-gradient-to-br from-gray-100 to-gray-200');
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
