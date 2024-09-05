import { useEffect, useState } from "react";

const useFrameTime = () => {
  const [frameTime, setFrameTime] = useState(performance.now());

  useEffect(() => {
    let frameId: number;
    let then = new Date().getTime();
    let interval = 800;

    const frame = (time: number) => {
      const now = new Date().getTime();
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        setFrameTime(time);
      }

      frameId = requestAnimationFrame(frame);
      
    };
    
    requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);
  
  return frameTime;
};

export default useFrameTime;