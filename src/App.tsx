import React, { useState } from 'react';
import Board from './components/Board/Board';
import useFrameTime from './hooks/useFrameRate';
import useMatrixStore from './stores/matrix';
import useGroundStore from './stores/ground';
import useCurrentTileStore from './stores/currentTile';
import useScoreStore from './stores/score';

function App() {

  const [isRunning, setIsRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const clearMatrix = useMatrixStore((state) => state.clearMatrix);
  const clearGroundMatrix = useGroundStore((state) => state.clearGroundMatrix);
  const clearTile = useCurrentTileStore((state) => state.clearTile);
  const score = useScoreStore((state) => state.score);
  const resetScore = useScoreStore((state) => state.reset);

  const frame = useFrameTime(isRunning);

  const handleClick = () => {
    if(!gameOver) {
      setIsRunning(!isRunning);
      return;
    }

    clearMatrix();
    clearGroundMatrix();
    clearTile();
    resetScore();

    setGameOver(false);
    setIsRunning(true);

  }

  return (
    <div className="App">
      <header>
        Tetris
      </header>
      <main>
        <section className='section'>
          <button onClick={handleClick}>{gameOver ? "Restart" : isRunning ? "Pause" : "Start"}</button>
          <div>Score: {score}</div>
          <div>{gameOver && "GAME OVER!"}</div>
        </section>
        <section className='section'>
          <Board frame={frame} isRunning={isRunning} setIsRunning={setIsRunning} gameOver={gameOver} setGameOver={setGameOver} />
        </section>
      </main>
    </div>
  );
}

export default App;
