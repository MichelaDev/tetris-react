export interface BoardProps {
  frame: number, 
  isRunning: boolean, 
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  gameOver: boolean,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
}