import { useState } from "react";

const windowPath = JSON.stringify(window.location.pathname);
const _pageViewNum = 1 + (JSON.parse(localStorage.getItem(windowPath))) ?? 0;
    localStorage.setItem(windowPath, _pageViewNum);

export default function useCounter() {
  const [counter, setCounter] = useState(_pageViewNum);

  const clearCounter = () => { setCounter(0); localStorage.removeItem(windowPath) }
  return [counter, clearCounter];
}