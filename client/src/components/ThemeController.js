import React from 'react';
import Styles from '../utils/styles';
import Button from './Button';

export default function ThemeController(props) {
  return (
    <div>
      <Button 
        text={`Theme: ${props.theme}`}
        onClick={() => {props.setTheme(props.theme === Styles.dark ? Styles.light : Styles.dark)}}
      />
    </div>
  )
}