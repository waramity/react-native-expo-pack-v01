import { useState, useEffect } from "react";

const useLoadingProgress = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 0.9) {
          clearInterval(interval);
        }
        return prevProgress + 0.1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return loadingProgress;
};

export default useLoadingProgress;
