import React, { useState } from 'react';
import styles from './Workouts.module.css';
import { useParams } from 'react-router-dom';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'
import { makeRequest } from '../../request';
import DisplayContainer from '../../components/DisplayContainer/DisplayContainer';
import Popup from 'reactjs-popup';
import Button from '../../components/Button/Button';
import noWorkoutsImg from '../../assets/noWorkouts.svg';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import WorkoutPopup from '../../components/WorkoutPopup/WorkoutPopup';

function Workouts() {
    const weekdaysArr = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    const { workout_planId } = useParams();
    const [createWorkout, setCreateWorkout] = useState({ name: "", weekday: "", duration: null, id: null });
    const [updateWorkout, setUpdateWorkout] = useState({ name: "", weekday: "", duration: null, id: null })
    const [deleteWorkout, setDeleteWorkout] = useState({ name: "", id: null });
    const [updateWorkoutOpen, setUpdateWorkoutOpen] = useState(false);
    const [deleteWorkoutOpen, setDeleteWorkoutOpen] = useState(false);
    const [createWorkoutOpen, setCreateWorkoutOpen] = useState(false);

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery(["workouts"], () =>
        makeRequest.get("/workouts/" + workout_planId).then((res) => {
            console.log(res.data);
            return res.data;
        }));

    const postMutation = useMutation((workout) => {
        return makeRequest.post("/workouts", workout);
    },
        {
            //refetch workouts on success
            onSuccess: () => {
                queryClient.invalidateQueries("workouts");
            },
        }
    );

    const updateMutation = useMutation((workout) => {
        return makeRequest.put("/workouts", workout);
    },
        {
            //refetch workouts on success
            onSuccess: () => {
                queryClient.invalidateQueries("workouts");
            },
        }
    );

    const deleteMutation = useMutation((deleteWorkout) => {
        return makeRequest.delete(`/workouts/${deleteWorkout.id}`);
    },
        {
            //refetch workouts on success
            onSuccess: () => {
                queryClient.invalidateQueries("workouts");
            },
        }
    );

    const handleNewWorkout = () => {
        postMutation.mutate({
            name: createWorkout.name, weekday: createWorkout.weekday,
            duration: createWorkout.duration, workout_planId
        });
        setCreateWorkout({ name: "", weekday: "", duration: null, id: null });
        setCreateWorkoutOpen(false);
    }

    const handleUpdateWorkout = () => {
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
            <div className={styles.workoutHeader}>
                <h1 className={styles.workoutsTitle}>Meine Workouts</h1>

                <Button text="+" onClick={() => setCreateWorkoutOpen(true)} />

                {/*Create Workout popup*/}
                <WorkoutPopup isOpen={createWorkoutOpen} title="Workout erstellen"
                    weekdaysArr={weekdaysArr} workout={createWorkout}
                    setWorkout={setCreateWorkout} onSubmit={() => handleNewWorkout()}
                    onClose={() => setCreateWorkoutOpen(false)}
                />

                {/*Update Workout popup*/}
                <WorkoutPopup isOpen={updateWorkoutOpen} title="Workout bearbeiten"
                    weekdaysArr={weekdaysArr} workout={updateWorkout}
                    setWorkout={setUpdateWorkout} onSubmit={() => handleUpdateWorkout()}
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
            </div>

            {
                weekdaysArr.map((weekday, index) => {
                    const filteredWorkouts = data?.filter((workout) => workout.weekday === weekday) || [];
                    return (
                        <div className={styles.resultContainer} key={index}>
                            <div className={styles.workoutDays}>
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
                                            />
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Workouts;