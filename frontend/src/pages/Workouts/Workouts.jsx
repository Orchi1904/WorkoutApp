import React, { useEffect, useState } from 'react';
import styles from './Workouts.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import DisplayContainer from '../../components/DisplayContainer/DisplayContainer';
import Popup from 'reactjs-popup';
import Button from '../../components/Button/Button';
import noWorkoutsImg from '../../assets/noWorkouts.svg';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import WorkoutPopup from '../../components/WorkoutPopup/WorkoutPopup';
import { getRequest, useDeleteMutation, usePostMutation, useUpdateMutation } from '../../services/query.service';
import { toast } from 'react-toastify';
import Toast from '../../components/Toast/Toast';

function Workouts() {
    const weekdaysArr = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const { workout_planId } = useParams();
    const [createWorkout, setCreateWorkout] = useState({ name: "", weekday: "", duration: "", id: undefined });
    const [updateWorkout, setUpdateWorkout] = useState({ name: "", weekday: "", duration: "", id: undefined });
    const [deleteWorkout, setDeleteWorkout] = useState({ name: "", id: undefined });
    const [updateWorkoutOpen, setUpdateWorkoutOpen] = useState(false);
    const [deleteWorkoutOpen, setDeleteWorkoutOpen] = useState(false);
    const [createWorkoutOpen, setCreateWorkoutOpen] = useState(false);
    const [currentDay, setCurrentDay] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [workoutPlan, setWorkoutPlan] = useState([]);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const refetch = (operation) => {
        toast.success(`Workout ${operation}`)
        queryClient.invalidateQueries("workouts");
    }

    //Quick Fix - useQuery is needed so mutations are able to refetch...
    const { isLoading, error, data } = useQuery(["workouts"],
        () => getRequest(`/workouts/workoutPlans/${workout_planId}`, setWorkouts, navigate));

    useEffect(() => {
        getRequest(`/workoutPlans/${workout_planId}`, setWorkoutPlan, navigate);
    }, []);

    useEffect(() => {
        //Another weekdaysArr so I dont have to start with Sunday on my Website
        const weekdaysArrEnglishOrder = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        const today = new Date();
        const dayOfWeek = today.getDay();
        setCurrentDay(weekdaysArrEnglishOrder[dayOfWeek]);
    })

    const postMutation = usePostMutation("/workouts", refetch);
    const updateMutation = useUpdateMutation("/workouts", refetch);
    const deleteMutation = useDeleteMutation("/workouts/", refetch);

    const handleNewWorkout = (e) => {
        e.preventDefault();
        postMutation.mutate({
            name: createWorkout.name, weekday: createWorkout.weekday || "Montag",
            duration: createWorkout.duration, workout_planId
        });
        setCreateWorkout({ name: "", weekday: "", duration: "", id: undefined });
        setCreateWorkoutOpen(false);
    }

    const handleUpdateWorkout = (e) => {
        e.preventDefault();
        updateMutation.mutate(updateWorkout);
        setUpdateWorkoutOpen(false);
    }

    const handleDeleteWorkout = (closePopup) => {
        deleteMutation.mutate({ id: deleteWorkout.id });
        closePopup();
    }

    const handleEditClick = (name, weekday, duration, id) => {
        setUpdateWorkoutOpen(true);
        setUpdateWorkout({ name, weekday, duration, id });
    }

    const handleDeleteClick = (name, id) => {
        setDeleteWorkoutOpen(true);
        setDeleteWorkout({ name, id });
    }

    return (
        <div className={styles.workouts}>
            <div className={styles.workoutsHeader}>
                <h1 className={styles.workoutsTitle}>"{workoutPlan[0]?.name}" - Workouts</h1>

                <Button text="+" onClick={() => setCreateWorkoutOpen(true)} />
            </div>

            {/*Create Workout popup*/}
            <WorkoutPopup isOpen={createWorkoutOpen} title="Workout erstellen"
                weekdaysArr={weekdaysArr} workout={createWorkout}
                setWorkout={setCreateWorkout} onSubmit={(e) => handleNewWorkout(e)}
                onClose={() => setCreateWorkoutOpen(false)}
            />

            {/*Update Workout popup*/}
            <WorkoutPopup isOpen={updateWorkoutOpen} title="Workout bearbeiten"
                weekdaysArr={weekdaysArr} workout={updateWorkout}
                setWorkout={setUpdateWorkout} onSubmit={(e) => handleUpdateWorkout(e)}
                onClose={() => setUpdateWorkoutOpen(false)}
            />

            {/*Delete Workout popup*/}
            <Popup open={deleteWorkoutOpen}
                position="center"
                onClose={() => setDeleteWorkoutOpen(false)}
                modal>
                <DeletePopup close={() => setDeleteWorkoutOpen(false)}
                    text={`Workout "${deleteWorkout.name}" endgültig löschen?`}
                    confirmBtnText={<CheckIcon />} cancelBtnText={<ClearIcon />}
                    onCancel={setDeleteWorkoutOpen}
                    onConfirm={handleDeleteWorkout}
                />
            </Popup>

            {
                weekdaysArr.map((weekday, index) => {
                    const filteredWorkouts = Array.isArray(workouts) && workouts?.filter((workout) => workout.weekday === weekday) || [];
                    return (
                        <div className={styles.resultContainer} key={index}>
                            <div className={`${styles.workoutDays} ${currentDay === weekday && styles.currentWorkoutDay}`}>
                                {weekday}
                            </div>
                            {!filteredWorkouts.length ?
                                <div className={styles.noWorkoutsContainer}>
                                    <img className={styles.noWorkoutsImg} src={noWorkoutsImg}
                                        alt="No workouts">
                                    </img>
                                    <p className={styles.noWorkoutsText}>Trainingsfrei</p>
                                </div>

                                :

                                <div className={styles.workoutContainer}>
                                    {filteredWorkouts.map((workout) => {
                                        return (
                                            <DisplayContainer key={workout.id} textArr={[workout.name, workout.duration + " min"]}
                                                onDeleteClick={() => handleDeleteClick(workout.name, workout.id)}
                                                onEditClick={() => handleEditClick(workout.name, workout.weekday, workout.duration, workout.id)}
                                                onContainerClick={() =>
                                                    navigate(`/workoutPlans/${workout_planId}/workouts/${workout.id}/exercises`)}
                                            />
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    )
                })
            }
            <Toast />
        </div>
    )
}

export default Workouts;