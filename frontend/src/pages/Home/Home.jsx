import { React, useState, useEffect } from 'react';
import styles from './Home.module.css';
import background from '../../assets/background.svg';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useQuery } from 'react-query';
import { makeRequest } from '../../request';
import { useAuth } from '../../context/AuthContext';
import WorkoutPlan from '../../components/WorkoutPlan/WorkoutPlan';
import Popup from 'reactjs-popup';

function Home() {
  const { user, login, logout } = useAuth();
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [addWorkoutPlanWindowOpened, setAddWorkoutPlanWindowOpened] = useState(false);

  const { isLoading, error, data } = useQuery(["workoutPlans"], () =>
    makeRequest.get("/workoutPlans", user.id).then((res) => {
      return res.data;
    }));

    console.log(data);

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>Meine Trainingspläne</h1>
        <Button text="+" onClick={() => setAddWorkoutPlanWindowOpened(true)}/>
        {data && data.length === 0 && !isLoading ?
          <div>
            <img className={styles.backgroundImg} src={background} alt="" />
            <p className={styles.homeHint}>
              Ziemlich leer hier... Füge doch einfach einen neuen Trainingsplan hinzu!
            </p>
          </div>
          :
          <div className={styles.homeWorkoutPlanContainer}>
            {data && data.length > 0 && data.map((workoutPlan) => (
              <WorkoutPlan name={workoutPlan.name} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Home;