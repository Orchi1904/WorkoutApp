import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Register.module.css';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import axios from 'axios';

function Register() {
  const { user, login, logout } = useAuth();
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
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      await login(inputs);
      navigate("/home");
    } catch (err) {
      alert(err.response.data);
    }
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerHeader}>
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