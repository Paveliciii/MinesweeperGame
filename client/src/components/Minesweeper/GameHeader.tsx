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
    <div className="flex flex-col w-full p-4 rounded-2xl bg-surface/90 backdrop-blur-sm shadow-neumorphic gap-4">
      <h1 className="text-center font-bold text-2xl text-primary tracking-wide font-[Inter]">Сапёр</h1>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="bg-surface px-5 py-3 rounded-xl shadow-neumorphic flex items-center gap-3 animate-reveal">
            <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-medium text-primary-dark text-lg">{minesRemaining}</span>
          </div>
          <div className="bg-surface px-5 py-3 rounded-xl shadow-neumorphic flex items-center gap-3 animate-reveal">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-primary-dark text-lg">{formatTime(time)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onFlagModeToggle}
            className={`w-12 h-12 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isFlagMode 
                ? "bg-accent-blue text-white shadow-neumorphic-pressed" 
                : "bg-surface text-primary shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset"
            }`}
            title={isFlagMode ? "Режим флажков включен" : "Режим флажков выключен"}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </button>
          
          <button
            onClick={onHelpClick}
            className="w-12 h-12 rounded-xl bg-surface text-primary shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset transition-all duration-200"
            title="Помощь"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <button
            onClick={onNewGameClick}
            className="w-12 h-12 rounded-xl bg-surface text-primary shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset transition-all duration-200"
            title="Новая игра"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {isMobile && (
        <div className="text-sm text-center mt-2 animate-reveal">
          {isFlagMode ? (
            <span className="bg-surface/80 px-4 py-2 rounded-full inline-block text-primary shadow-neumorphic">
              🚩 Режим флажков - нажмите на клетку, чтобы поставить флажок
            </span>
          ) : (
            <span className="text-primary-light">
              Нажмите, чтобы открыть | Удерживайте для установки флажка
            </span>
          )}
        </div>
      )}
    </div>
  );
}
