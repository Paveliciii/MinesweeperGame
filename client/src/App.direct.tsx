import GameBoardDirect from "./components/Minesweeper/GameBoard.direct";
import { useMinesweeper } from "./hooks/useMinesweeper";

function AppDirect() {
  const {
    gameState,
    handleCellClick,
    handleCellRightClick,
    handleDifficultySelect,
    toggleFlagMode,
    showDifficultySelection,
    showHelp,
    closeHelp,
    time,
    isHelpVisible,
    closeGameOverModal,
    isGameOverModalVisible,
    gameResult,
    handleNewGame
  } = useMinesweeper();

  // Если выбор сложности, показываем стандартный компонент
  if (gameState.showDifficultySelection) {
    return (
      <div className="container">
        <div className="difficulty-selection">
          <h2>Select Difficulty</h2>
          
          <button 
            className="difficulty-button"
            onClick={() => handleDifficultySelect('easy')}
          >
            Easy (8×8, 10 mines)
          </button>
          
          <button 
            className="difficulty-button"
            onClick={() => handleDifficultySelect('medium')}
          >
            Medium (10×10, 15 mines)
          </button>
          
          <button 
            className="difficulty-button"
            onClick={() => handleDifficultySelect('hard')}
          >
            Hard (12×12, 25 mines)
          </button>
        </div>
      </div>
    );
  }

  // Иначе показываем игровое поле с прямым рендерингом
  return (
    <div className="container">
      <div className="header">
        <div>Mines: {gameState.remainingMines}</div>
        <div>{time}</div>
        <div>
          Tap cells to open | Long-press to place/remove flags
        </div>
        <div className="controls">
          <button onClick={toggleFlagMode}>🚩</button>
          <button onClick={showHelp}>?</button>
          <button onClick={showDifficultySelection}>↻</button>
        </div>
      </div>

      <pre style={{background:'#eee',padding:'8px',fontSize:'12px',overflow:'auto',maxHeight:'200px'}}>
        {JSON.stringify(gameState, null, 2)}
      </pre>
      <GameBoardDirect 
        gameState={gameState}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />
    </div>
  );
}

export default AppDirect;
