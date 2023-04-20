import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import Logo from '../../assets/logo.svg';
import AuthService from "../../services/auth.service";
import { toast } from 'react-toastify';
import Toast from '../../components/Toast/Toast';

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
        (res) => {
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
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerHeader}>
        <img src={Logo} alt="GymJorney Logo" />
        <h4>GymJourney</h4>
      </div>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <div className={styles.registerInputContainer}>
          <InputField id="registerUsername" labelText="Benutzername: " type="text"
            name="username" onChange={handleChange} placeholder="Benutzername"
            required
          />
        </div>
        <div className={styles.registerInputContainer}>
          <InputField id="registerEmail" labelText="E-Mail: " type="email"
            name="email" onChange={handleChange} placeholder="E-Mail"
            required
          />
        </div>
        <div className={styles.registerInputContainer}>
          <InputField id="registerPassword" labelText="Passwort: " type="password"
            name="password" onChange={handleChange} placeholder="Passwort"
            required
          />
        </div>
        <div className={styles.registerInputContainer}>
          <InputField id="registerRepPassword" labelText="Passwort wiederholen: " type="password"
            name="repPassword" onChange={handleChange} placeholder="Passwort wiederholen"
            required
          />
        </div>
        <Button text="Registrieren" />
      </form>
      <p className={styles.login}>Bereits bei GymJourney?
        <span className={styles.loginBtn} onClick={() => navigate("/login")}> Jetzt anmelden!</span>
      </p>
      <Toast />
    </div>
  )
}

export default Register;