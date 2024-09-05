import { useEffect, useState } from 'react';

export const useResize = () => {
  const [windowH, setWindowH] = useState(window.innerHeight);

  useEffect(() => {

    const setNewHeight = () => setWindowH(window.innerHeight)

    window.addEventListener('resize', setNewHeight);

    return () => window.removeEventListener('resize', setNewHeight);

  }, []);

  return windowH;
};
