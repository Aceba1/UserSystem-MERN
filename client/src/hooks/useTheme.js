import { useState, useEffect } from "react";

import Styles from '../utils/styles'

export default function useTheme() {
  const [theme, setTheme] = useState(Styles.currentStyle);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    Styles.currentStyle = theme;
  }, [theme]);
  return [theme, setTheme];
}