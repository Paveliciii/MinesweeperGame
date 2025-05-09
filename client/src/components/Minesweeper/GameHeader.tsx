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
  return (    <div className="flex flex-col w-full p-3 rounded-lg shadow-md gap-2" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #454545)' }}>
      <h1 className="text-center font-bold text-2xl mb-2" style={{ color: 'var(--tg-theme-text-color, #ffffff)' }}>Сапёр</h1><div className="flex items-center justify-between w-full">
        <div id="mines-counter" className="font-bold text-xl" style={{ color: 'var(--tg-theme-text-color, #ffffff)' }}>
          🚩 {minesRemaining}
        </div>
        <div id="timer" className="font-bold text-xl" style={{ color: 'var(--tg-theme-text-color, #ffffff)' }}>
          ⏱️ {formatTime(time)}
        </div>
      </div>
      
      {isMobile && (
        <div className="text-xs text-center w-full">
          {isFlagMode ? (
            <span className="bg-foreground text-background px-2 py-1 rounded-md">
              🚩 Flag Mode: ON - Tap cells to place flags
            </span>
          ) : (
            <span>
              Tap cells to open | Long-press to place/remove flags
            </span>
          )}
        </div>
      )}
      <div className="flex gap-2 justify-end w-full">
        <button
          id="flag-mode"
          className={`w-10 h-10 flex items-center justify-center ${
            isFlagMode 
            ? "bg-foreground text-background" 
            : "bg-primary text-primary-foreground"
          } rounded-lg hover:opacity-80 transition`}
          onClick={onFlagModeToggle}
          aria-label="Toggle flag mode"
        >
          🚩
        </button>
        <button
          id="help"
          className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition"
          onClick={onHelpClick}
          aria-label="Help"
        >
          ❓
        </button>
        <button
          id="new-game"
          className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition"
          onClick={onNewGameClick}
          aria-label="New Game"
        >
          🔄
        </button>
      </div>
    </div>
  );
}
