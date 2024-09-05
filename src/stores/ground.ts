import { create } from 'zustand'
import { COLUMNS, ROWS } from '../constants';

type State = {
  groundMatrix: Array<string[]>;
}

type Action = {
  updateGroundMatrix: (matrix: State['groundMatrix']) => void,
  clearGroundMatrix: () => void
}

const useGroundStore = create<State & Action>((set) => ({
  groundMatrix: Array.from({ length: ROWS }, () => new Array(COLUMNS).fill("")),
  updateGroundMatrix: (matrix) => set(() => ({ groundMatrix: matrix })),
  clearGroundMatrix: () => set(() => ({groundMatrix: Array.from({ length: ROWS }, () => new Array(COLUMNS).fill(""))}))
}))

export default useGroundStore;