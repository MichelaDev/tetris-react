import { create } from 'zustand'
import { COLUMNS, ROWS } from '../constants';

type State = {
  matrix: Array<string[]>;
}

type Action = {
  updateMatrix: (matrix: State['matrix']) => void,
  clearMatrix: () => void
}

const useMatrixStore = create<State & Action>((set) => ({
  matrix: Array.from({ length: ROWS }, () => new Array(COLUMNS).fill("")),
  updateMatrix: (matrix) => set(() => ({ matrix: matrix })),
  clearMatrix: () => set(() => ({matrix: Array.from({ length: ROWS }, () => new Array(COLUMNS).fill(""))}))
}))

export default useMatrixStore;