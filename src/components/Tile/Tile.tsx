import React, { useEffect } from "react";
import { TileProps } from "./Tile.type";
import useCurrentTileStore from "../../stores/currentTile";
import useMatrixStore from "../../stores/matrix";

const Tile = ({ ...props }: TileProps) => {
  
  const matrix = useMatrixStore((state) => state.matrix);
  const updateMatrix = useMatrixStore((state) => state.updateMatrix)
  const currentTile = useCurrentTileStore((state) => state.tile)
  const tilePosition = useCurrentTileStore((state) => state.position)
  const tileRotation = useCurrentTileStore((state) => state.rotation)
  const tileColor = useCurrentTileStore((state) => state.color)
  const createTile = useCurrentTileStore((state) => state.createTile)

  return (
    <></>
  )
};

export default Tile;