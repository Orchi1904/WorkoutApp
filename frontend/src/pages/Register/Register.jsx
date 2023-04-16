import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import axios from 'axios';
import Logo from '../../assets/logo.svg';
import AuthService from "../../services/auth.service";

function Register() {
  const { register } = AuthService;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    repPassword: "",
  });

  const handleChange = (e) => {
    setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(inputs).then(
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
    <div className={styles.register}>
      <div className={styles.registerHeader}>
        <img src={Logo} alt="GymJorney Logo" />
        <h4>GymJourney</h4>
      </div>
      <form className={styles.registerForm}>
        <div className={styles.registerInputContainer}>
          <InputField id="registerUsername" labelText="Benutzername: " type="text"
            name="username" onChange={handleChange} placeholder="Benutzername" />
        </div>
        <div className={styles.registerInputContainer}>
          <InputField id="registerEmail" labelText="E-Mail: " type="email"
            name="email" onChange={handleChange} placeholder="E-Mail" />
        </div>
        <div className={styles.registerInputContainer}>
          <InputField id="registerPassword" labelText="Passwort: " type="password"
            name="password" onChange={handleChange} placeholder="Passwort" />
        </div>
        <div className={styles.registerInputContainer}>
          <InputField id="registerRepPassword" labelText="Passwort wiederholen: " type="password"
            name="repPassword" onChange={handleChange} placeholder="Passwort wiederholen" />
        </div>
        <Button onClick={handleRegister} text="Registrieren" />
      </form>
      <p className={styles.login}>Bereits bei GymJourney?
        <span className={styles.loginBtn} onClick={() => navigate("/login")}> Jetzt anmelden!</span>
      </p>
    </div>
  )
}

export default Register;