import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import styles from './Login.module.css';
import Button from '../../components/Button/Button';
import Logo from '../../assets/logo.svg';
import AuthService from "../../services/auth.service";
import Toast from '../../components/Toast/Toast';
import { toast } from "react-toastify";

function Login() {
    const { login } = AuthService;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = useCallback((e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    }, []);

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        try {
            await login(inputs).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    toast.error(error.response.data.msg);
                }
            );
        } catch (err) {
            alert(err.response.data);
        }
    }, [inputs, navigate, login]);

    return (
        <div className={styles.login}>
            <div className={styles.loginHeader}>
                <img src={Logo} alt="GymJorney Logo" />
                <h4>GymJourney</h4>
            </div>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.loginInputContainer}>
                    <InputField id="loginUsername" labelText="Benutzername: " type="text"
                        name="username" onChange={handleChange} placeholder="Benutzername"
                        required={true}
                    />
                </div>
                <div className={styles.loginInputContainer}>
                    <InputField id="loginPassword" labelText="Passwort: " type="password"
                        name="password" onChange={handleChange} placeholder="Passwort"
                        required={true}
                    />
                </div>
                <Button text="Anmelden" />
            </form>
            <p className={styles.register}>Neu bei GymJourney?
                <span className={styles.registerBtn} onClick={() => navigate("/register")}> Jetzt registrieren!</span>
            </p>
            <Toast />
        </div>
    )
}

export default Login;