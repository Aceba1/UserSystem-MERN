import React, { useContext } from 'react';
import { Theme } from '../contexts/Theme';
import Button from './Button';

export default function ThemeController(props) {
  const theme = useContext(Theme);
  return (
    <div>
      <Button 
        text={`Theme: ${theme.theme}`}
        onClick={() => {theme.setTheme(theme.theme === 'dark' ? 'light' : 'dark')}}
      />
    </div>
  )
}