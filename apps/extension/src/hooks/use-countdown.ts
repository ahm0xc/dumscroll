import { useEffect, useState } from "react";

const useCountdown = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count <= 0) return;

    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [count]);

  const reset = () => setCount(initialCount);

  return { count, reset };
};

export default useCountdown;
