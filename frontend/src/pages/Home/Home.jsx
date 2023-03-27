import { React, useState } from 'react';
import './Home.css';
import background from '../../assets/background.svg';
import Button from '../../components/Button/Button';
import { makeRequest } from '../../request';
import { useAuth } from '../../context/AuthContext';
import WorkoutPlan from '../../components/WorkoutPlan/WorkoutPlan';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import WorkoutPlanPopup from '../../components/WorkoutPlanPopup/WorkoutPlanPopup';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, login, logout } = useAuth();
  const [workoutPlanName, setWorkoutPlanName] = useState("");
  const [updateWorkoutPlan, setUpdateWorkoutPlan] = useState({ name: "", id: null });
  const [updateWorkoutPlanOpen, setUpdateWorkoutPlanOpen] = useState(false);
  const [deleteWorkoutPlan, setDeleteWorkoutPlan] = useState({ name: "", id: null });
  const [deleteWorkoutPlanOpen, setDeleteWorkoutPlanOpen] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["workoutPlans"], () =>
    makeRequest.get("/workoutPlans").then((res) => {
      return res.data;
    }));

  const postMutation = useMutation((workoutPlan) => {
    return makeRequest.post("/workoutPlans", workoutPlan);
  },
    {
      //refetch workoutPlans on success
      onSuccess: () => {
        queryClient.invalidateQueries("workoutPlans");
      },
    }
  )

  const updateMutation = useMutation((updateWorkoutPlan) => {
    return makeRequest.put("/workoutPlans", updateWorkoutPlan);
  },
    {
      //refetch workoutPlans on success
      onSuccess: () => {
        queryClient.invalidateQueries("workoutPlans");
      }
    }
  )

  const deleteMutation = useMutation((deleteWorkoutPlan) => {
    return makeRequest.delete("/workoutPlans/" + deleteWorkoutPlan.id);
  },
    {
      //refetch workoutPlans on success
      onSuccess: () => {
        queryClient.invalidateQueries("workoutPlans");
      }
    }
  )

  const handleNewWorkoutPlan = (closePopup) => {
    postMutation.mutate({ name: workoutPlanName });
    closePopup();
  }

  const handleUpdateWorkoutPlan = (closePopup) => {
    updateMutation.mutate(updateWorkoutPlan);
    closePopup();
  }

  const handleDeleteWorkoutPlan = (closePopup) => {
    deleteMutation.mutate({ id: deleteWorkoutPlan.id });
    closePopup();
  }

  const handleEditClick = (name, id) => {
    setUpdateWorkoutPlanOpen(true);
    setUpdateWorkoutPlan({ name, id });
  }

  const handleWorkoutPlanNameChange = (newName) => {
    setUpdateWorkoutPlan({ ...updateWorkoutPlan, name: newName });
  }

  const handleDeleteClick = (name, id) => {
    setDeleteWorkoutPlanOpen(true);
    setDeleteWorkoutPlan({ name, id });
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
              btnText="Erstellen" onBtnClick={handleNewWorkoutPlan} />
          )}
        </Popup>

        {/*Update WorkoutPlan popup*/}
        <Popup open={updateWorkoutPlanOpen}
          position="center"
          onClose={() => setUpdateWorkoutPlanOpen(false)}
          modal>
          <WorkoutPlanPopup title="Trainingsplan bearbeiten" close={() => setUpdateWorkoutPlanOpen(false)}
            inputPlaceholder="Name des Trainingsplans" onInputChange={handleWorkoutPlanNameChange}
            btnText="Speichern" onBtnClick={handleUpdateWorkoutPlan} value={updateWorkoutPlan.name} />
        </Popup>

        {/*Delete WorkoutPlan popup*/}
        <Popup open={deleteWorkoutPlanOpen}
          position="center"
          onClose={() => setDeleteWorkoutPlanOpen(false)}
          modal>
          <DeletePopup close={() => setDeleteWorkoutPlanOpen(false)}
            itemName={deleteWorkoutPlan.name}
            confirmBtnText={<CheckIcon />} cancelBtnText={<ClearIcon />}
            onCancel={setDeleteWorkoutPlanOpen}
            onConfirm={handleDeleteWorkoutPlan}
          />
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
                  <WorkoutPlan key={workoutPlan.id} name={workoutPlan.name}
                    onWorkoutPlanClick={() => navigate(`/workoutPlans/${workoutPlan.id}/workouts`)}
                    onEditClick={() => handleEditClick(workoutPlan.name, workoutPlan.id)}
                    onDeleteClick={() => handleDeleteClick(workoutPlan.name, workoutPlan.id)}
                  />
                ))}
            </div>
        }
      </div >
    </div >
  )
}

export default Home;