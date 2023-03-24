import React from 'react';
import styles from './WorkoutPlan.module.css';

function WorkoutPlan({name}) {
  return (
    <div className={styles.workoutPlan}>
        <p>{name}</p>
    </div>
  )
}

export default WorkoutPlan