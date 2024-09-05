import React, { useCallback, useEffect, useMemo } from "react";
import { BoardProps } from "./Board.type";
import { useResize } from "../../hooks/useResize";
import useMatrixStore from "../../stores/matrix";
import { ROWS } from "../../constants";
import useCurrentTileStore from "../../stores/currentTile";
import useFrameTime from "../../hooks/useFrameRate";
import useGroundStore from "../../stores/ground";

const Board = ({ ...props }: BoardProps) => {

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

  const frame = useFrameTime();

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
        const rot = tileRotation === currentTile.length-1 ? 0 : tileRotation+1
        clearCurrentTile()
        updateTileRotation(rot)
        break
      default:
        break
    }
  }, [currentTile, tileRotation, tilePosition])

  const handleUpdateGround = () => {
    const newGroundMatrix = [...groundMatrix.map((el) => [...el])]
    currentTile?.[tileRotation].forEach((cell) => {
      const y = cell[0]+tilePosition[0]-tileOffset
      newGroundMatrix[y][cell[1]+tilePosition[1]] = tileColor;
    })
    updateGround(newGroundMatrix)
  }

  const detectCollision = () => {
    if(!currentTile) return false

    let collision = false
    
    for(let cell of currentTile[tileRotation]) {
      const y = cell[0]+tilePosition[0]-tileOffset
      if(y < 0) return;
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

  const detectBorderCollision = (direction: "right" | "left") => {
    if(!currentTile) return false
    let collision = false
    for(let cell of currentTile[tileRotation]) {
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
    return collision
  }

  useEffect(() => {
    if(!currentTile) return
    window.addEventListener('keydown', handleClickDown)
    return () => window.removeEventListener('keydown', handleClickDown)
  }, [handleClickDown])

  

  useEffect(() => {
    if(!currentTile) return;

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
    if(!currentTile) {
      createTile();
      return
    }
    
    const newMatrix = [...matrix.map((el) => [...el])]
    currentTile?.[tileRotation].forEach((cell) => {
      const y = cell[0]+tilePosition[0]-tileOffset
      if(y < 0) return;
      // console.log(y, cell[1]+tilePosition[1])
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
