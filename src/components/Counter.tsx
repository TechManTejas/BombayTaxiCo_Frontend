import { useEffect, useState } from 'react';

// Define the hook's parameters and return type
const useCounter = (end: number, duration: number): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    // First set the initial count
    setCount(start);

    // Calculate how many times the counter will update
    // Handle edge cases to prevent division by zero
    if (end <= 0 || duration <= 0) {
      return;
    }
    const interval = duration / end;

    // Update the count every `interval` milliseconds
    const counter = setInterval(() => {
      start += 1;
      setCount(start);

      if (start === end) {
        clearInterval(counter);
      }
    }, interval);

    // Clean up interval on unmount
    return () => clearInterval(counter);
  }, [end, duration]);

  return count;
};

export default useCounter;