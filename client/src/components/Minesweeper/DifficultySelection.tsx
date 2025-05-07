interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export default function DifficultySelection({ onDifficultySelect }: DifficultySelectionProps) {
  return (
    <div className="difficulty-selection">
      <h2>Select Difficulty</h2>
      
      <button 
        className="difficulty-button"
        onClick={() => onDifficultySelect('easy')}
      >
        Easy (8×8, 10 mines)
      </button>
      
      <button 
        className="difficulty-button"
        onClick={() => onDifficultySelect('medium')}
      >
        Medium (10×10, 15 mines)
      </button>
      
      <button 
        className="difficulty-button"
        onClick={() => onDifficultySelect('hard')}
      >
        Hard (12×12, 25 mines)
      </button>
    </div>
  );
}
