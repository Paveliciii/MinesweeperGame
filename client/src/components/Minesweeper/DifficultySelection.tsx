interface DifficultySelectionProps {
  onSelect: (width: number, height: number, mines: number) => void;
}

export default function DifficultySelection({ onSelect }: DifficultySelectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-2">
        Выберите уровень сложности
      </h2>
      
      <div className="grid gap-3">
        <button
          onClick={() => onSelect(8, 8, 10)}
          className="flex items-center justify-between p-4 bg-white bg-opacity-20 rounded-xl text-white hover:bg-opacity-30 transition-all duration-200"
        >
          <span className="font-medium">Легкий</span>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span>8×8</span>
            <span>•</span>
            <span>10 мин</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(16, 16, 40)}
          className="flex items-center justify-between p-4 bg-white bg-opacity-20 rounded-xl text-white hover:bg-opacity-30 transition-all duration-200"
        >
          <span className="font-medium">Средний</span>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span>16×16</span>
            <span>•</span>
            <span>40 мин</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(30, 16, 99)}
          className="flex items-center justify-between p-4 bg-white bg-opacity-20 rounded-xl text-white hover:bg-opacity-30 transition-all duration-200"
        >
          <span className="font-medium">Сложный</span>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span>30×16</span>
            <span>•</span>
            <span>99 мин</span>
          </div>
        </button>
      </div>
    </div>
  );
}
