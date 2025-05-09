interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function DifficultySelection({ onDifficultySelect }: DifficultySelectionProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-6">      <div className="text-center mb-2 animate-fade-in">
        <h2 className="text-3xl font-bold text-tg-text mb-2">
          Выберите уровень сложности
        </h2>
        <p className="text-tg-hint">Выберите подходящий для вас уровень</p>
      </div>
      
      <div className="grid gap-4">
        <button
          onClick={() => onDifficultySelect('easy')}
          className="group flex items-center justify-between p-5 bg-gradient-glass backdrop-blur-glass rounded-xl shadow-glass border border-white/10 hover:shadow-glass-hover active:opacity-90 transition-all duration-200 animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-glass shadow-glass border border-white/10">
              🌱
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-lg text-tg-text mb-1">Легкий</span>
              <span className="text-sm text-tg-hint">Идеально для новичков</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-tg-hint px-3 py-1.5 rounded-lg bg-gradient-glass shadow-glass border border-white/10">
            <span>8×8</span>
            <span className="text-white/20">•</span>
            <span>10 мин</span>
          </div>
        </button>

        <button
          onClick={() => onDifficultySelect('medium')}
          className="group flex items-center justify-between p-5 bg-gradient-glass backdrop-blur-glass rounded-xl shadow-glass border border-white/10 hover:shadow-glass-hover active:opacity-90 transition-all duration-200 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-glass shadow-glass border border-white/10">
              🌿
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-lg text-tg-text mb-1">Средний</span>
              <span className="text-sm text-tg-hint">Для опытных игроков</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-tg-hint px-3 py-1.5 rounded-lg bg-gradient-glass shadow-glass border border-white/10">
            <span>10×10</span>
            <span className="text-white/20">•</span>
            <span>15 мин</span>
          </div>
        </button>

        <button
          onClick={() => onDifficultySelect('hard')}
          className="group flex items-center justify-between p-5 bg-gradient-glass backdrop-blur-glass rounded-xl shadow-glass border border-white/10 hover:shadow-glass-hover active:opacity-90 transition-all duration-200 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-glass shadow-glass border border-white/10">
              🌳
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-lg text-tg-text mb-1">Сложный</span>
              <span className="text-sm text-tg-hint">Для настоящих экспертов</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-tg-hint px-3 py-1.5 rounded-lg bg-gradient-glass shadow-glass border border-white/10">
            <span>12×12</span>
            <span className="text-white/20">•</span>
            <span>25 мин</span>
          </div>
        </button>
      </div>
    </div>
  );
}
