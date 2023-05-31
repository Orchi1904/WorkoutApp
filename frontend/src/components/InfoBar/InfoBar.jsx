import React, { useCallback } from 'react';
import styles from './InfoBar.module.css';
import Logo from '../../assets/logo.svg';
import IconButton from '../IconButton/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import jwt_decode from "jwt-decode";

function InfoBar() {
    const navigate = useNavigate();
    const { getUser } = AuthService;
    const token = getUser();
    const user = jwt_decode(token);

    const handleLogout = useCallback(() => {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
    }, [navigate]);

    return (
        <div className={styles.infoBar}>
            <div className={styles.leftSide} onClick={() => navigate("/")}>
                <img src={Logo} alt={"GymJourney Logo"}></img>
                <h3>GymJourney</h3>
            </div>
            <div className={styles.middle}>
                <p>{user.username}</p>
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