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
    <div className="flex flex-col w-full p-4 rounded-2xl shadow-lg gap-4 backdrop-blur-sm bg-opacity-20" 
         style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #454545)' }}>
      <h1 className="text-center font-bold text-2xl text-white tracking-wide">Сапёр</h1>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="bg-opacity-20 backdrop-blur-sm bg-white p-3 rounded-xl flex items-center gap-2">
            <span className="text-2xl">🚩</span>
            <span className="font-bold text-xl text-white">{minesRemaining}</span>
          </div>
          <div className="bg-opacity-20 backdrop-blur-sm bg-white p-3 rounded-xl flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <span className="font-bold text-xl text-white">{formatTime(time)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onFlagModeToggle}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isFlagMode 
                ? "bg-white bg-opacity-90 text-black" 
                : "bg-white bg-opacity-20 text-white"
            }`}
            title={isFlagMode ? "Режим флажков включен" : "Режим флажков выключен"}
          >
            <span className="text-xl">🚩</span>
          </button>
          
          <button
            onClick={onHelpClick}
            className="p-3 rounded-xl bg-white bg-opacity-20 text-white transition-all duration-200 hover:bg-opacity-30"
            title="Помощь"
          >
            <span className="text-xl">❓</span>
          </button>
          
          <button
            onClick={onNewGameClick}
            className="p-3 rounded-xl bg-white bg-opacity-20 text-white transition-all duration-200 hover:bg-opacity-30"
            title="Новая игра"
          >
            <span className="text-xl">🔄</span>
          </button>
        </div>
      </div>

      {isMobile && (
        <div className="text-sm text-center mt-2">
          {isFlagMode ? (
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full inline-block text-white">
              🚩 Режим флажков - нажмите на клетку, чтобы поставить флажок
            </span>
          ) : (
            <span className="text-white text-opacity-80">
              Нажмите, чтобы открыть | Удерживайте для установки флажка
            </span>
          )}
        </div>
      )}
    </div>
  );
}
