import React from 'react';
import styles from './Button.module.css';

function Button({onClick, text}) {
  return (
    <button onClick={onClick} className={styles.button}>{text}</button>
  )
}

export default Button