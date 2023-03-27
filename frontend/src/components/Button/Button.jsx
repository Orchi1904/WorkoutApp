import React, {forwardRef, useState} from 'react';
import styles from './Button.module.css';

const Button = forwardRef(({onClick, text, hoverColor}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const buttonStyle = {
    backgroundColor: isHovered ? hoverColor : styles.button.backgroundColor,
  };
  
  return (
    <button ref={ref} onClick={onClick} className={styles.button}
            style={buttonStyle} onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}>{text}</button>
  )
});

export default Button