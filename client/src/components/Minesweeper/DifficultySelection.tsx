interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function DifficultySelection({ onDifficultySelect }: DifficultySelectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-2">
        Выберите уровень сложности
      </h2>
      
      <div className="grid gap-3">
        <button
          onClick={() => onDifficultySelect('easy')}
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
          onClick={() => onDifficultySelect('medium')}
          className="flex items-center justify-between p-4 bg-white bg-opacity-20 rounded-xl text-white hover:bg-opacity-30 transition-all duration-200"
        >
          <span className="font-medium">Средний</span>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span>10×10</span>
            <span>•</span>
            <span>15 мин</span>
          </div>
        </button>

        <button
          onClick={() => onDifficultySelect('hard')}
          className="flex items-center justify-between p-4 bg-white bg-opacity-20 rounded-xl text-white hover:bg-opacity-30 transition-all duration-200"
        >
          <span className="font-medium">Сложный</span>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <span>12×12</span>
            <span>•</span>
            <span>25 мин</span>
          </div>
        </button>
      </div>
    </div>
  );
}
