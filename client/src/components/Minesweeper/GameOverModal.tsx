import { Dialog } from "@/components/ui/dialog";
import { formatTime } from "@/lib/minesweeperUtils";

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameWon: boolean;
  gameTime: number;
  onNewGame: () => void;
}

export default function GameOverModal({
  isOpen,
  onClose,
  gameWon,
  gameTime,
  onNewGame,
}: GameOverModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 transform transition-all">
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl mb-2">
              {gameWon ? "🎉" : "💣"}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">
              {gameWon ? "Победа!" : "Игра окончена"}
            </h2>
            
            <p className="text-gray-600 text-center">
              {gameWon
                ? `Ваше время: ${formatTime(gameTime)}`
                : "Попробуйте еще раз!"}
            </p>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={onNewGame}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                Новая игра 🔄
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Закрыть ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
