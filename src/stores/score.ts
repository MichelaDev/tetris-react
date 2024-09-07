import { create } from 'zustand'

type State = {
  score: number;
}

type Action = {
  update: (score: number) => void,
  reset: () => void
}

const useScoreStore = create<State & Action>((set) => ({
  score: 0,
  update: (score) => set(() => ({ score: score })),
  reset: () => set(() => ({score:0}))
}))

export default useScoreStore;