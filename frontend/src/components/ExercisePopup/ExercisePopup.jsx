import React from 'react';
import Popup from 'reactjs-popup';
import Button from '../../components/Button/Button';
import IconButton from '../../components/IconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputField from '../../components/InputField/InputField';
import styles from './ExercisePopup.module.css';

function ExercisePopup({ title, isOpen, onClose, onSubmit, exercise, setExercise }) {

    return (
        <Popup position="center" modal open={isOpen} onClose={onClose}>
            <div className={styles.exercisePopup}>
                <div className={styles.exercisePopupHead}>
                    <h2>{title}</h2>
                    <IconButton onClick={onClose} iconColor="white" hoverColor="#2f69c8">
                        <CloseIcon />
                    </IconButton>
                </div>
                <p className={styles.exercisePopupRequired}>* Erforderlich</p>
                <div className={styles.exercisePopupContent}>
                    <form onSubmit={onSubmit}>
                        <InputField id="exerciseName" type="text" labelText="Name der Übung *"
                            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
                            value={exercise.name} useLabel={true} required={true} />
                        <InputField id="exerciseSets" type="number" labelText="Anzahl der Sätze *"
                            onChange={(e) => setExercise({ ...exercise, numberOfSets: e.target.value })}
                            value={exercise.numberOfSets} useLabel={true} required={true} />
                        <InputField id="exerciseReps" type="number" labelText="Anzahl der Wiederholungen pro Satz *"
                            onChange={(e) => setExercise({ ...exercise, repsPerSet: e.target.value })}
                            value={exercise.repsPerSet} useLabel={true} required={true} />
                        <InputField id="exerciseWeight" type="number" labelText="Gewicht in kg"
                            onChange={(e) => setExercise({ ...exercise, weight: e.target.value })}
                            value={exercise.weight} useLabel={true} />
                        <InputField id="exerciseYtLink" type="text" labelText="Link eines YT-Tutorials"
                            onChange={(e) => setExercise({ ...exercise, ytLink: e.target.value })}
                            value={exercise.ytLink} useLabel={true} />
                        <InputField id="exerciseDescription" type="text" labelText="Beschreibung der Übung"
                            onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
                            value={exercise.description} useLabel={true} />
                        <div className={styles.exercisePopupButton}>
                            <Button text="Speichern" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    )
}

export default ExercisePopup;
