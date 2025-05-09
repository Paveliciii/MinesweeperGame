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
  // const isMobile = useMobile(); // Removed as it is not used

  return (
    <div className="w-full px-1 py-2">
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-1.5">
          {/* Счетчик мин */}
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10">
            <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-medium text-xs text-white/90">{minesRemaining}</span>
          </div>
          {/* Таймер */}
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10">
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-xs text-white/90">{formatTime(time)}</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {/* Флаг */}
          <button
            onClick={onFlagModeToggle}
            className={`p-1.5 rounded-xl bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 transition ${isFlagMode ? 'ring-2 ring-blue-400' : ''}`}
            title={isFlagMode ? "Режим флажков включен" : "Режим флажков выключен"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </button>
          {/* Помощь */}
          <button
            onClick={onHelpClick}
            className="p-1.5 rounded-xl bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 transition"
            title="Помощь"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {/* Новая игра */}
          <button
            onClick={onNewGameClick}
            className="p-1.5 rounded-xl bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 transition"
            title="Новая игра"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
