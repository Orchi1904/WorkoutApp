import React from 'react';
import styles from './InputField.module.css';

function InputField({id, labelText, type, name, onChange, placeholder, value, useLabel}) {
    return (
        <div className={styles.inputField}>
            <label className={styles.inputLabel} htmlFor={id} hidden={!useLabel}> {labelText} </label>
            <input id={id} className={styles.field}
                type={type} name={name} onChange={onChange} placeholder={placeholder}
                value={value}
            />
        </div>
    )
}

export default InputField