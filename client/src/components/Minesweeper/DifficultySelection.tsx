interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function DifficultySelection({ onDifficultySelect }: DifficultySelectionProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-primary tracking-wide font-[Inter]">
        Выберите уровень сложности
      </h2>
      
      <div className="grid gap-4">
        <button
          onClick={() => onDifficultySelect('easy')}
          className="group flex items-center justify-between p-5 bg-surface rounded-xl shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset transition-all duration-200"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium text-lg text-primary-dark mb-1">Легкий</span>
            <span className="text-sm text-primary-light">Идеально для новичков</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-light">
            <span>8×8</span>
            <span>•</span>
            <span>10 мин</span>
          </div>
        </button>

        <button
          onClick={() => onDifficultySelect('medium')}
          className="group flex items-center justify-between p-5 bg-surface rounded-xl shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset transition-all duration-200"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium text-lg text-primary-dark mb-1">Средний</span>
            <span className="text-sm text-primary-light">Для опытных игроков</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-light">
            <span>10×10</span>
            <span>•</span>
            <span>15 мин</span>
          </div>
        </button>

        <button
          onClick={() => onDifficultySelect('hard')}
          className="group flex items-center justify-between p-5 bg-surface rounded-xl shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset transition-all duration-200"
        >
          <div className="flex flex-col items-start">
            <span className="font-medium text-lg text-primary-dark mb-1">Сложный</span>
            <span className="text-sm text-primary-light">Для настоящих экспертов</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary-light">
            <span>12×12</span>
            <span>•</span>
            <span>25 мин</span>
          </div>
        </button>
      </div>
    </div>
  );
}
