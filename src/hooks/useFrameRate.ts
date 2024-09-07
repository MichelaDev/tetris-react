import { useEffect, useState } from "react";

const useFrameTime = (isRunning: boolean) => {
  const [frameTime, setFrameTime] = useState(0);
  const [currentInt, setCurrentInt] = useState<NodeJS.Timer | null>(null);

  const loop = () => {
    setFrameTime((prev) => prev + 1)
  }

  useEffect(() => {
    if(!currentInt) {
      setFrameTime(0)
    }
  }, [currentInt])

  useEffect(() => {
    let interval:  NodeJS.Timer | null = null

    if(isRunning && !interval) {
      interval = setInterval(loop, 400)
    } 

    if(!isRunning && interval) {
      clearInterval(interval)
    }

    setCurrentInt(interval)

    return () => {if(interval) clearInterval(interval);}

  }, [isRunning]);
  
  return frameTime;
};

export default useFrameTime;