import { useState } from "react";

export const useCounter = (init: number = 0) => {
    const [count, setCount] = useState(init);
  
    const increment = () => setCount((prevValue: number) => prevValue + 1);
    const decrement = () => setCount((prevValue: number) => prevValue - 1);
  
    return { count, increment, decrement };
};