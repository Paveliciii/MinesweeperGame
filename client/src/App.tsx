import { useMinesweeper } from './hooks/useMinesweeper';
import GameBoard from './components/Minesweeper/GameBoard';
import './App.css';

function App() {
  const {
    gameState,
    handleCellClick,
    handleCellRightClick
  } = useMinesweeper();

  return (
    <div className="App">
      <GameBoard 
        gameState={gameState}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />
    </div>
  );
}

export default App;
