import { useMinesweeper } from "../hooks/useMinesweeper";
import GameBoard from "../components/Minesweeper/GameBoard";
import GameHeader from "../components/Minesweeper/GameHeader";
import DifficultySelection from "../components/Minesweeper/DifficultySelection";
import HelpModal from "../components/Minesweeper/HelpModal";
import GameOverModal from "../components/Minesweeper/GameOverModal";

export default function MinesweeperPage() {
  const {
    gameState,
    time,
    isHelpVisible,
    isGameOverModalVisible,
    gameResult,
    handleDifficultySelect,
    handleCellClick,
    handleCellRightClick,
    toggleFlagMode,
    showDifficultySelection,
    showHelp,
    closeHelp,
    closeGameOverModal,
    handleNewGame
  } = useMinesweeper();

  return (
    <div className="container">
      <GameHeader 
        minesRemaining={gameState.remainingMines}
        time={time}
        isFlagMode={gameState.isFlagMode}
        onFlagModeToggle={toggleFlagMode}
        onNewGameClick={showDifficultySelection}
        onHelpClick={showHelp}
      />

      {gameState.showDifficultySelection ? (
        <DifficultySelection onDifficultySelect={handleDifficultySelect} />
      ) : (
        <>
          <GameBoard 
            gameState={gameState}
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
          />
        </>
      )}

      <HelpModal isVisible={isHelpVisible} onClose={closeHelp} />
      
      <GameOverModal 
        isVisible={isGameOverModalVisible} 
        isVictory={gameResult.isVictory} 
        gameTime={gameResult.gameTime}
        onClose={closeGameOverModal}
        onNewGame={handleNewGame}
      />
    </div>
  );
}
