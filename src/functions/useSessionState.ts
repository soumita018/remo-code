import { useState } from "react";

const useSessionState = (name: string, value: number): [number, any] => {
  const [state, setState]: [number, any] = useState((): number => {
    if (localStorage[name]) return +localStorage[name];
    localStorage[name] = value;
    return value;
  });
  const updateSession = (newState: number) => {
    setState(newState);
    localStorage[name] = newState;
  };
  return [state, updateSession];
}; // Custom hook that stores data to localStorage when useState hook is used

export default useSessionState;
