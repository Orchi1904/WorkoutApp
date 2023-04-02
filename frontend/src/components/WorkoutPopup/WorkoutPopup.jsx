import React from 'react';
import Popup from 'reactjs-popup';
import Button from '../../components/Button/Button';
import IconButton from '../../components/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputField from '../../components/InputField/InputField';
import styles from './WorkoutPopup.module.css';

function WorkoutPopup({ title, isOpen, onClose, onSubmit, workout, setWorkout, weekdaysArr }) {

    return (
        <Popup position="center" modal open={isOpen} onClose={onClose}>
            <div className={styles.workoutPopup}>
                <div className={styles.workoutPopupHead}>
                    <h2>{title}</h2>
                    <IconButton onClick={onClose} iconColor="white" hoverColor="#2f69c8">
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={styles.weekdaysSelectorContainer}>
                    <label htmlFor="weekdaysSelector" hidden>Wochentag: </label>
                    <select name="weekdaysSelector" className={styles.weekdaysSelector}
                        onChange={(e) => setWorkout({...workout, weekday: e.target.value})}
                        value={workout.weekday}
                    >
                        {weekdaysArr.map((weekday) => (
                            <option key={weekday} value={weekday}>{weekday}</option>
                        ))}
                    </select>
                </div>
                <InputField id="workoutName" labelText="Name des Workouts"
                    onChange={(e) => setWorkout({...workout, name: e.target.value})}
                    value={workout.name} useLabel={true} />
                <InputField id="workoutDuration" type="number" labelText="Dauer des Workouts (min)"
                    onChange={(e) => setWorkout({...workout, duration: e.target.value})}
                    value={workout.duration} useLabel={true} />
                <div className={styles.workoutPopupButton}>
                    <Button text="Speichern" onClick={onSubmit} />
                </div>
            </div>
        </Popup>
    )
}

export default WorkoutPopup;
