import React from 'react';
import Popup from 'reactjs-popup';
import Button from '../../components/Button/Button';
import IconButton from '../../components/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputField from '../../components/InputField/InputField';
import styles from './WorkoutPlanPopup.module.css';

function WorkoutPlanPopup({ title, isOpen, onClose, onSubmit, workoutPlan, setWorkoutPlan }) {

    return (
        <Popup position="center" modal open={isOpen} onClose={onClose}>
            <div className={styles.workoutPlanPopup}>
                <div className={styles.workoutPlanPopupHead}>
                    <h2>{title}</h2>
                    <IconButton onClick={onClose} iconColor="white" hoverColor="#2f69c8">
                        <CloseIcon />
                    </IconButton>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.inputFieldContainer}>
                        <InputField id="workoutPlanName" placeholder="Name des Trainingsplans"
                            onChange={(e) => setWorkoutPlan({ ...workoutPlan, name: e.target.value })}
                            value={workoutPlan.name} required={true} />
                    </div>
                    <div className={styles.workoutPlanPopupButton}>
                        <Button type="submit" text="Speichern" />
                    </div>
                </form>
            </div>
        </Popup>
    )
}

export default WorkoutPlanPopup;
