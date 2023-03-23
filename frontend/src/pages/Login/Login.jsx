import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import Button from '../../components/Button/Button';

function Login() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
        console.log(inputs);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/home");
        } catch (err) {
            alert(err.response.data);
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.loginHeader}>
                <h4>GymJourney</h4>
                
            </div>
            <form className={styles.loginForm}>
                <div className={styles.loginInputContainer}>
                    <InputField id="loginUsername" labelText="Benutzername: " type="text"
                        name="username" onChange={handleChange} placeholder="Benutzername" />
                </div>
                <div className={styles.loginInputContainer}>
                    <InputField id="loginPassword" labelText="Passwort: " type="password"
                        name="password" onChange={handleChange} placeholder="Passwort" />
                </div>
                <Button onClick={handleLogin} text="Anmelden"/>
            </form>
            <p className={styles.register}>Neu bei GymJourney?
                <span className={styles.registerBtn} onClick={() => navigate("/register")}> Jetzt registrieren!</span>
            </p>
        </div>
    )
}

export default Login;