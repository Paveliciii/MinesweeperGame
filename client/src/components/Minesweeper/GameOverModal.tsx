import { formatTime } from "../../lib/minesweeperUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

interface GameOverModalProps {
  isVisible: boolean;
  isVictory: boolean;
  gameTime: number;
  onClose: () => void;
  onNewGame: () => void;
}

export default function GameOverModal({
  isVisible,
  isVictory,
  gameTime,
  onClose,
  onNewGame
}: GameOverModalProps) {
  if (!isVisible) return null;
  
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-2 shadow-lg z-50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isVictory ? "🎉 Поздравляем! Вы победили!" : "💥 Вы проиграли!"}
          </DialogTitle>
        </DialogHeader>        <div className="text-center py-4">
          {isVictory && (
            <div className="mb-4">
              <p>Ваше время: <span className="font-bold">{formatTime(gameTime)}</span></p>
            </div>
          )}
          <p>
            {isVictory
              ? "Вы успешно нашли все мины и остались в живых!"
              : "Вы подорвались на мине. Повезет в следующий раз."}
          </p>
        </div>
        <DialogFooter className="flex justify-center gap-2">
          <Button
            onClick={onNewGame}
            className="w-full"
            variant="default"
          >
            Новая игра
          </Button>
          <Button
            onClick={onClose}
            className="w-full"
            variant="secondary"
          >
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
