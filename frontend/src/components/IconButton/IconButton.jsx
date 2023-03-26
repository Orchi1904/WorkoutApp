import React, { useState } from 'react';
import styles from './IconButton.module.css';

function IconButton({ children, hoverColor, iconColor, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button className={styles.iconButton} onClick={onClick}
            style={{
                color: iconColor,
                backgroundColor: isHovered ? hoverColor : "transparent"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </button>
    )
}

export default IconButton