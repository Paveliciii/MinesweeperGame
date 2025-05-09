import { useMobile } from "../../hooks/use-mobile";
import { formatTime } from "../../lib/minesweeperUtils";

interface GameHeaderProps {
  minesRemaining: number;
  time: number;
  isFlagMode: boolean;
  onFlagModeToggle: () => void;
  onHelpClick: () => void;
  onNewGameClick: () => void;
}

export default function GameHeader({
  minesRemaining,
  time,
  isFlagMode,
  onFlagModeToggle,
  onHelpClick,
  onNewGameClick
}: GameHeaderProps) {
  const isMobile = useMobile();

  return (
    <div className="w-full p-4 space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {/* Счетчик мин */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-medium text-lg text-white">{minesRemaining}</span>
          </div>

          {/* Таймер */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-lg text-white">{formatTime(time)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Кнопка режима флажков */}
          <button
            onClick={onFlagModeToggle}
            className={`
              p-2 rounded-xl transition-all duration-200
              ${isFlagMode 
                ? 'bg-white text-slate-900' 
                : 'bg-white/10 text-white hover:bg-white/20'
              }
            `}
            title={isFlagMode ? "Режим флажков включен" : "Режим флажков выключен"}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </button>

          {/* Кнопка помощи */}
          <button
            onClick={onHelpClick}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
            title="Помощь"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Кнопка новой игры */}
          <button
            onClick={onNewGameClick}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
            title="Новая игра"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {isMobile && (
        <div className="text-center">
          <span className={`
            text-sm px-4 py-2 rounded-full 
            ${isFlagMode 
              ? 'bg-white text-slate-900' 
              : 'text-white/80'
            }
          `}>
            {isFlagMode 
              ? "🚩 Режим флажков активен" 
              : "Нажмите, чтобы открыть • Удерживайте для флажка"
            }
          </span>
        </div>
      )}
    </div>
  );
}
