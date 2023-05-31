import React, { useCallback } from 'react';
import styles from './DisplayContainer.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '../IconButton/IconButton';

function DisplayContainer({ textArr, onEditClick, onDeleteClick, onContainerClick }) {
  const handleEditClick = useCallback((e) => {
    e.stopPropagation();
    onEditClick();
  }, [onEditClick]);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    onDeleteClick();
  }, [onDeleteClick]);

  return (
    <div className={styles.displayContainer} onClick={onContainerClick}>
      <div className={styles.textContainer}>
        {textArr?.length && textArr.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div className={styles.displayContainerIcons}>
        <IconButton onClick={handleEditClick} iconColor="white" hoverColor="#2c703e"><EditIcon /></IconButton>
        <IconButton onClick={handleDeleteClick} iconColor="white" hoverColor="#ff6347"><DeleteForeverIcon /></IconButton>
      </div>
    </div >
  )
}

export default DisplayContainer;