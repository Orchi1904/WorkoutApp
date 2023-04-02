import React from 'react';
import IconButton from '../IconButton/IconButton';
import styles from './DeletePopup.module.css';
import Button from '../Button/Button';
import CloseIcon from '@mui/icons-material/Close';

function DeletePopup({ title, close, text, confirmBtnText, cancelBtnText, onConfirm, onCancel }) {
    return (
        <div className={styles.deletePopup}>
            <div className={styles.deletePopupHead}>
                <h2>{title}</h2>
                <IconButton onClick={close} iconColor="white" hoverColor="#2f69c8"><CloseIcon /></IconButton>
            </div>
            <p>{text}</p>
            <div className={styles.buttons}>
                <Button text={confirmBtnText} onClick={() => onConfirm(close)} 
                        hoverColor="#2c703e"/>
                <Button text={cancelBtnText} onClick={() => onCancel(false)} 
                        hoverColor="#ff6347"/>
            </div>
        </div>
    )
}

export default DeletePopup;