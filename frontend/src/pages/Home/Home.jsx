import { React, useState, useEffect } from 'react';
import './Home.css';
import background from '../../assets/background.svg';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { makeRequest } from '../../request';
import { useAuth } from '../../context/AuthContext';
import WorkoutPlan from '../../components/WorkoutPlan/WorkoutPlan';
import Popup from 'reactjs-popup';
import InputField from '../../components/InputField/InputField';
import 'reactjs-popup/dist/index.css';
import CloseIcon from '@mui/icons-material/Close';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import IconButton from '../../components/IconButton/IconButton';
import WorkoutPlanPopup from '../../components/WorkoutPlanPopup/WorkoutPlanPopup';

function Home() {
  const { user, login, logout } = useAuth();
  const [workoutPlanName, setWorkoutPlanName] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["workoutPlans"], () =>
    makeRequest.get("/workoutPlans", user.id).then((res) => {
      return res.data;
    }));

  const mutation = useMutation((workoutPlanName) => {
    return makeRequest.post("/workoutPlans", workoutPlanName)
  },
    {
      //refetch workoutPlans on success
      onSuccess: () => {
        queryClient.invalidateQueries("workoutPlans");
      },
    }
  )

  const handleNewWorkoutPlan = (e, closePopup) => {
    e.preventDefault();
    mutation.mutate({name: workoutPlanName});
    closePopup();
  }


  return (
    <div className="home">
      <div className="homeContainer">
        <h1 className="homeTitle">Meine Trainingspläne</h1>

        {/*Create WorkoutPlan popup*/}
        <Popup trigger={<Button text="+" />}
          position="center" modal>
          {/*close from reactjs-popup*/}
          {close => (
            <WorkoutPlanPopup title="Trainingsplan erstellen" close={close} 
                              inputPlaceholder="Name des Trainingsplans" onInputChange={setWorkoutPlanName} 
                              btnText="Erstellen" onBtnClick={handleNewWorkoutPlan}/>
          )}
        </Popup>

        {
          !data?.length && !isLoading ?
            <div className="homeEmptyContainer">
              <img className="backgroundImg" src={background} alt="" />
              <p className="homeHint">
                Ziemlich leer hier... Füge doch einfach einen neuen Trainingsplan hinzu!
              </p>
            </div>
            :
            <div className="homeWorkoutPlanContainer">
              {data?.length &&
                data.map((workoutPlan) => (
                  <WorkoutPlan key={workoutPlan.id} name={workoutPlan.name} />
                ))}
            </div>
        }
      </div >
    </div >
  )
}

export default Home;