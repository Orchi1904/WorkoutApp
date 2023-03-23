import React from 'react';
import styles from './InputField.module.css';

function InputField({id, labelText, type, name, onChange, placeholder}) {
    return (
        <>
            <label htmlFor={id} hidden> {labelText} </label>
            <input id={id} className={styles.field}
                type={type} name={name} onChange={onChange} placeholder={placeholder}
            />
        </>
    )
}

export default InputField