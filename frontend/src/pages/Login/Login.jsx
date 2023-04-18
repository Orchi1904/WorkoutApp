import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import styles from './Login.module.css';
import Button from '../../components/Button/Button';
import Logo from '../../assets/logo.svg';
import AuthService from "../../services/auth.service";

function Login() {
    const { login } = AuthService;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            alert(err.response.data);
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.loginHeader}>
                <img src={Logo} alt="GymJorney Logo" />
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
                <Button onClick={handleLogin} text="Anmelden" />
            </form>
            <p className={styles.register}>Neu bei GymJourney?
                <span className={styles.registerBtn} onClick={() => navigate("/register")}> Jetzt registrieren!</span>
            </p>
        </div>
    )
}

export default Login;