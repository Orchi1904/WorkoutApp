import { React, useState, useCallback } from 'react';
import './Home.css';
import background from '../../assets/background.svg';
import Button from '../../components/Button/Button';
import DisplayContainer from '../../components/DisplayContainer/DisplayContainer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useQuery, useQueryClient, } from 'react-query';
import WorkoutPlanPopup from '../../components/WorkoutPlanPopup/WorkoutPlanPopup';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { getRequest, useDeleteMutation, usePostMutation, useUpdateMutation } from '../../services/query.service';
import { toast } from 'react-toastify';
import Toast from '../../components/Toast/Toast';

function Home() {
  const [createWorkoutPlan, setCreateWorkoutPlan] = useState({ name: "", id: null });
  const [updateWorkoutPlan, setUpdateWorkoutPlan] = useState({ name: "", id: null });
  const [deleteWorkoutPlan, setDeleteWorkoutPlan] = useState({ name: "", id: null });
  const [updateWorkoutPlanOpen, setUpdateWorkoutPlanOpen] = useState(false);
  const [deleteWorkoutPlanOpen, setDeleteWorkoutPlanOpen] = useState(false);
  const [createWorkoutPlanOpen, setCreateWorkoutPlanOpen] = useState(false);
  const [workoutPlans, setWorkoutPlans] = useState([]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const refetch = useCallback((operation) => {
    toast.success(`Trainingsplan ${operation}`)
    queryClient.invalidateQueries("workoutPlans");
  }, [queryClient]);

  const onError = useCallback((error) => {
    toast.error(error);
  }, []);

  const { status } = useQuery(["workoutPlans"],
    () => getRequest("/workoutPlans", setWorkoutPlans, navigate));

  const postMutation = usePostMutation("/workoutPlans", refetch, onError);
  const updateMutation = useUpdateMutation(`/workoutPlans/${updateWorkoutPlan.id}`, refetch, onError);
  const deleteMutation = useDeleteMutation(`/workoutPlans/${deleteWorkoutPlan.id}`, refetch, onError);

  const handleNewWorkoutPlan = useCallback((e) => {
    e.preventDefault();
    postMutation.mutate({ name: createWorkoutPlan.name });
    setCreateWorkoutPlan({ name: "", id: null });
    setCreateWorkoutPlanOpen(false);
  }, [postMutation, createWorkoutPlan]);

  const handleUpdateWorkoutPlan = useCallback((e) => {
    e.preventDefault();
    updateMutation.mutate(updateWorkoutPlan);
    setUpdateWorkoutPlanOpen(false);
  }, [updateMutation, updateWorkoutPlan]);

  const handleDeleteWorkoutPlan = useCallback((closePopup) => {
    deleteMutation.mutate({ id: deleteWorkoutPlan.id });
    closePopup();
  }, [deleteMutation, deleteWorkoutPlan]);

  const handleEditClick = useCallback((name, id) => {
    setUpdateWorkoutPlanOpen(true);
    setUpdateWorkoutPlan({ name, id });
  }, []);

  const handleDeleteClick = useCallback((name, id) => {
    setDeleteWorkoutPlanOpen(true);
    setDeleteWorkoutPlan({ name, id });
  }, []);

  return (
    <div className="home">
      <div className="homeContainer">
        <h1 className="homeTitle">Meine Trainingspläne</h1>
        <Button text="+" onClick={() => setCreateWorkoutPlanOpen(true)} />

        {/*Create workout plan popup*/}
        <WorkoutPlanPopup isOpen={createWorkoutPlanOpen} title="Trainingsplan erstellen"
          workoutPlan={createWorkoutPlan} setWorkoutPlan={setCreateWorkoutPlan}
          onSubmit={(e) => handleNewWorkoutPlan(e)} onClose={() => setCreateWorkoutPlanOpen(false)}
        />

        {/*Update workout plan popup*/}
        <WorkoutPlanPopup isOpen={updateWorkoutPlanOpen} title="Trainingsplan bearbeiten"
          workoutPlan={updateWorkoutPlan} setWorkoutPlan={setUpdateWorkoutPlan}
          onSubmit={(e) => handleUpdateWorkoutPlan(e)} onClose={() => setUpdateWorkoutPlanOpen(false)}
        />

        {/*Delete workout plan popup*/}
        <Popup open={deleteWorkoutPlanOpen}
          position="center"
          onClose={() => setDeleteWorkoutPlanOpen(false)}
          modal>
          <DeletePopup close={() => setDeleteWorkoutPlanOpen(false)}
            text={`Trainingsplan "${deleteWorkoutPlan.name}" endgültig löschen?`}
            confirmBtnText={<CheckIcon />} cancelBtnText={<ClearIcon />}
            onCancel={setDeleteWorkoutPlanOpen}
            onConfirm={handleDeleteWorkoutPlan}
          />
        </Popup>

        {
          !workoutPlans?.length ?
            <div className="homeEmptyContainer">
              <img className="backgroundImg" src={background} alt="Empty workout plans image" />
              <p className="homeHint">
                Ziemlich leer hier... Füge doch einfach einen neuen Trainingsplan hinzu!
              </p>
            </div>
            :
            <div className="homeWorkoutPlanContainer">
              {workoutPlans?.length &&
                workoutPlans.map((workoutPlan) => (
                  <DisplayContainer key={workoutPlan.id} textArr={[workoutPlan.name]}
                    onContainerClick={() => navigate(`/workoutPlans/${workoutPlan.id}/workouts`)}
                    onEditClick={() => handleEditClick(workoutPlan.name, workoutPlan.id)}
                    onDeleteClick={() => handleDeleteClick(workoutPlan.name, workoutPlan.id)}
                  />
                ))}
            </div>
        }
      </div >
      <Toast />
    </div >
  )
}

export default Home;