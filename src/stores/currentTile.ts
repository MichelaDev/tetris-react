import { create } from 'zustand'
import { generateColor, generateShape } from '../components/Tiles/Tiles'

type State = {
  tile: Array<Array<number[]>> | null,
  color: string | "",
  position: number[],
  rotation: number
}

type Action = {
  updatePosition: (coord: number[]) => void,
  updateRotation: (rot: number) => void,
  createTile: () => void,
  clearTile: () => void
}

const useCurrentTileStore = create<State & Action>((set) => ({
  tile: null,
  color: "",
  position: [0, 3],
  rotation: 0,
  updatePosition: (coord) => set(() => ({position: coord})),
  updateRotation: (rot) => set(() => ({rotation: rot})),
  createTile: () => set(() => ({tile: generateShape(), color: generateColor()})),
  clearTile: () => set(() => ({tile: null}))
}))

export default useCurrentTileStore;