import { useMinesweeper } from './hooks/useMinesweeper.tsx';
import { GameBoard } from './components/Minesweeper/GameBoard.tsx';
import './App.css';

function AppDirect() {
  const {
    gameState,
    handleCellClick,
    handleCellRightClick
  } = useMinesweeper();

  return (
    <div className="App">
      <GameBoardDirect 
        gameState={gameState}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />
    </div>
  );
}

export default AppDirect;
