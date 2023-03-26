import React from 'react';
import styles from './WorkoutPlan.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '../IconButton/IconButton';

function WorkoutPlan({ name, onEditClick }) {
  return (
    <div className={styles.workoutPlan}>
      <p>{name}</p>
      <div className={styles.workoutPlanIcons}>
        <IconButton onClick={onEditClick} iconColor="white" hoverColor="#2c703e"><EditIcon /></IconButton>
        <IconButton iconColor="white" hoverColor="#ff6347"><DeleteForeverIcon /></IconButton>
      </div>
    </div >
  )
}

export default WorkoutPlan