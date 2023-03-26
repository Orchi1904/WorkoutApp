import React from 'react';
import IconButton from '../IconButton/IconButton';
import InputField from '../InputField/InputField';
import styles from './WorkoutPlanPopup.module.css';
import Button from '../Button/Button';
import CloseIcon from '@mui/icons-material/Close';

function WorkoutPlanPopup({title, close, inputPlaceholder, onInputChange, btnText, onBtnClick}) {
    return (
        <div className={styles.workoutPlanPopup}>
            <div className={styles.workoutPlanPopupHead}>
                <h2>{title}</h2>
                <IconButton onClick={close} iconColor="white" hoverColor="#2f69c8"><CloseIcon /></IconButton>
            </div>
            <InputField placeholder={inputPlaceholder} onChange={(e) => onInputChange(e.target.value)} />
            <Button text={btnText} onClick={(e) => onBtnClick(e, close)} />
        </div>
    )
}

export default WorkoutPlanPopup;