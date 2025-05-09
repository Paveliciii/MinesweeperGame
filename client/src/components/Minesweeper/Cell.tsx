import { memo } from "react";
import type { CellProps } from "../../types/game";

// Ensure the Telegram Web App API is defined
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        showAlert: (message: string) => void;
        platform: string;
        sendData?: (data: string) => void;
        backgroundColor?: string;
        textColor?: string;
        buttonColor?: string;
        buttonTextColor?: string;
        initData?: string;
      };
    };
  }
}

// Initialize Telegram Web App if available
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.expand();
}

export default function Cell({ x, y, isRevealed, isMine, isFlagged, mineCount }: CellProps) {
  const getCellContent = () => {
    if (isFlagged) return '🚩';
    if (!isRevealed) return '';
    if (isMine) return '💣';
    return mineCount > 0 ? mineCount : '';
  };

  const getNumberColor = () => {
    const colors = {
      1: 'text-blue-600',
      2: 'text-green-600',
      3: 'text-red-500',
      4: 'text-indigo-700',
      5: 'text-red-700',
      6: 'text-teal-600',
      7: 'text-gray-800',
      8: 'text-gray-600',
    };
    return colors[mineCount as keyof typeof colors] || '';
  };

  return (
    <button
      data-x={x}
      data-y={y}
      className={`
        w-10 h-10 flex items-center justify-center rounded-lg text-lg font-medium 
        transition-all duration-200 select-none
        ${isRevealed 
          ? 'bg-surface shadow-neumorphic-inset' 
          : 'bg-surface shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset'
        }
        ${isRevealed && !isMine && !isFlagged ? getNumberColor() : 'text-primary-dark'}
        ${isRevealed ? 'animate-reveal' : ''}
      `}
    >
      {getCellContent()}
    </button>
  );
}
