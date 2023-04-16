import React from 'react';
import styles from './InfoBar.module.css';
import Logo from '../../assets/logo.svg';
import Button from '../Button/Button';
import { useAuth } from '../../context/AuthContext';
import IconButton from '../IconButton/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import jwt_decode from "jwt-decode";

function InfoBar() {
    //const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("user");
    const user = jwt_decode(token);

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    }

    return (
        <div className={styles.infoBar}>
            <div className={styles.leftSide} onClick={() => navigate("/")}>
                <img src={Logo} alt={"GymJourney Logo"}></img>
                <h3>GymJourney</h3>
            </div>
            <div className={styles.middle}>
                <p>Angemeldet als: {user.username}</p>
            </div>
            <div className={styles.rightSide}>
                <IconButton backgroundColor="#607D8B" hoverColor="#455A64" onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default InfoBar;