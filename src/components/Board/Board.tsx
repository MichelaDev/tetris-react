import React, { useCallback, useEffect, useMemo } from "react";
import { BoardProps } from "./Board.type";
import { useResize } from "../../hooks/useResize";
import useMatrixStore from "../../stores/matrix";
import { ROWS } from "../../constants";
import useCurrentTileStore from "../../stores/currentTile";
import useGroundStore from "../../stores/ground";
import useScoreStore from "../../stores/score";

const Board = ({ frame, isRunning, setIsRunning, gameOver, setGameOver }: BoardProps) => {

  const matrix = useMatrixStore((state) => state.matrix);
  const updateMatrix = useMatrixStore((state) => state.updateMatrix)
  const windowHeight = useResize();
  const cellHeight = (80 * windowHeight) / 100 / ROWS;
  const currentTile = useCurrentTileStore((state) => state.tile)
  const tilePosition = useCurrentTileStore((state) => state.position)
  const tileRotation = useCurrentTileStore((state) => state.rotation)
  const tileColor = useCurrentTileStore((state) => state.color)
  const updateTilePosition = useCurrentTileStore((state) => state.updatePosition)
  const updateTileRotation = useCurrentTileStore((state) => state.updateRotation)
  const createTile = useCurrentTileStore((state) => state.createTile)
  const clearTile = useCurrentTileStore((state) => state.clearTile)
  const updateGround = useGroundStore((state) => state.updateGroundMatrix)
  const groundMatrix = useGroundStore((state) => state.groundMatrix)
  const updateScore = useScoreStore((state) => state.update);
  const score = useScoreStore((state) => state.score);

  const tileOffset = useMemo(() => {
    if(!currentTile) return 0
    return Math.max(...currentTile[tileRotation].map((cell) => cell[0]))+1
  }, [currentTile])


  const clearCurrentTile = () => {
    const newMatrix = [...matrix.map((el) => [...el])]
    currentTile?.[tileRotation].forEach((cell) => {
      const y = cell[0]+tilePosition[0]-tileOffset
      if(y < 0) return;
      newMatrix[y][cell[1]+tilePosition[1]] = "";
    })
    updateMatrix(newMatrix)
  }

  const handleClickDown = useCallback((e: KeyboardEvent) => {
    if(!currentTile) return
    switch(e.code) {
      case "ArrowRight":
        if(detectBorderCollision("right")) break;
        clearCurrentTile()
        updateTilePosition([tilePosition[0], tilePosition[1]+1])
        break
      case "ArrowLeft":
        if(detectBorderCollision("left")) break;
        clearCurrentTile()
        updateTilePosition([tilePosition[0], tilePosition[1]-1])
        break
      case "ArrowUp":
        if(detectBorderCollision("up")) break;
        const rot = tileRotation === currentTile.length-1 ? 0 : tileRotation+1
        clearCurrentTile()
        updateTileRotation(rot)
        break
      default:
        break
    }
  }, [currentTile, tileRotation, tilePosition])

  const handleUpdateGround = () => {
    if(!currentTile) return;
    const newGroundMatrix = [...groundMatrix.map((el) => [...el])]
    for(const cell of currentTile[tileRotation]) {
      if(cell[0]+tilePosition[0]-tileOffset === 0) {
        setIsRunning(false)
        setGameOver(true)
        break;
      }
      const y = cell[0]+tilePosition[0]-tileOffset
      if(y < 0) continue;
      newGroundMatrix[y][cell[1]+tilePosition[1]] = tileColor;
    }

    for(let i = 0; i < newGroundMatrix.length; i++) {
      const indexComplete = !newGroundMatrix[i].includes('');
      if(indexComplete) {
        updateScore(score+10)
        newGroundMatrix.splice(i, 1);
        newGroundMatrix.unshift(Array(10).fill(""));
      }
    }
    updateGround(newGroundMatrix);
    updateMatrix(newGroundMatrix);
  }

  const detectCollision = () => {
    if(!currentTile) return false

    let collision = false
    
    for(const cell of currentTile[tileRotation]) {
      const y = cell[0]+tilePosition[0]-tileOffset
      if(y < -1) continue;
      if(y >= ROWS-1) {
        collision = true
        break
      }
      if(groundMatrix[y+1][cell[1]+tilePosition[1]]) {
        collision = true
        break
      }
    }

    if(collision) {
      handleUpdateGround()
    }
    
    return collision
  }

  const detectBorderCollision = (direction: "right" | "left" | "up") => {
    if(!currentTile) return false
    let collision = false

    if(direction === "up") {
      const rot = tileRotation === currentTile.length-1 ? 0 : tileRotation+1
      for(const cell of currentTile[rot]) {
        const y = cell[0]+tilePosition[0]-tileOffset
        const x = cell[1]+tilePosition[1]
        if(y < 0) continue;
        if(groundMatrix[y][x]) {
          collision = true;
          break
        }
        if(x >= 9 || x <= 0) {
          collision = true;
          break
        }
      }

    } else {

      for(const cell of currentTile[tileRotation]) {
        const y = cell[0]+tilePosition[0]-tileOffset
        const x = cell[1]+tilePosition[1]
        if(y < 0) continue;
        if(direction === "right" && (x >= 9 || groundMatrix[y][x+1])) {
          collision = true
          break
        }
        if(direction === "left" && (x <= 0 || groundMatrix[y][x-1])) {
          collision = true
          break
        }
      }
    }

    return collision
  }

  useEffect(() => {
    if(!currentTile) return
    window.addEventListener('keydown', handleClickDown)
    return () => window.removeEventListener('keydown', handleClickDown)
  }, [handleClickDown])

  useEffect(() => {
    if(!currentTile) {
      createTile();
      return
    }

    if(detectCollision()) {
      clearTile()
      updateTilePosition([0, 3])
      updateTileRotation(0)
      return
    }

    clearCurrentTile()
    updateTilePosition([tilePosition[0]+1, tilePosition[1]])

  }, [frame])

  useEffect(() => {
    if(!currentTile) return;
    
    const newMatrix = [...matrix.map((el) => [...el])]
    currentTile?.[tileRotation].forEach((cell) => {
      const y = cell[0]+tilePosition[0]-tileOffset
      if(y < 0) return;
      newMatrix[y][cell[1]+tilePosition[1]] = tileColor;
    })
    updateMatrix(newMatrix)

  }, [tilePosition, tileRotation])
  
  return (
    <div className="game-board">
      {matrix.flat().map((cell, index) => (
        <div key={index} className="cell" style={{ height: cellHeight, backgroundColor: cell }}></div>
      ))}
    </div>
  );
};

export default Board;
