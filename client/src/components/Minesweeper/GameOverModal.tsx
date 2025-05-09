import { Dialog } from "@/components/ui/dialog";
import { formatTime } from "@/lib/minesweeperUtils";

interface GameOverModalProps {
  isVisible: boolean;
  onClose: () => void;
  isVictory: boolean;
  gameTime: number;
  onNewGame: () => void;
}

export default function GameOverModal({
  isVisible,
  onClose,
  isVictory,
  gameTime,
  onNewGame,
}: GameOverModalProps) {
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">        <div className="bg-gradient-glass backdrop-blur-glass rounded-2xl p-8 shadow-glass border border-white/10 max-w-sm w-full mx-4 transform transition-all animate-scale-in">
          <div className="flex flex-col items-center gap-6">
            <div className="text-6xl mb-2 animate-bounce">
              {isVictory ? "🎉" : "💣"}
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-tg-text mb-2">
                {isVictory ? "Победа!" : "Игра окончена"}
              </h2>
              <p className="text-tg-hint">
                {isVictory
                  ? `Ваше время: ${formatTime(gameTime)}`
                  : "Попробуйте еще раз!"}
              </p>
            </div>
              <div className="flex gap-4 w-full">
              <button
                onClick={onNewGame}
                className="flex-1 px-6 py-3 bg-gradient-button text-tg-button-text rounded-xl font-medium shadow-button hover:shadow-button-hover active:opacity-90 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: '0.1s' }}
              >
                Новая игра
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gradient-glass backdrop-blur-glass text-tg-text rounded-xl font-medium shadow-button hover:shadow-button-hover active:opacity-90 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
