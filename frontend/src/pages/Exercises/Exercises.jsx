import React, { useState, useEffect, useCallback } from 'react';
import styles from './Exercises.module.css';
import { useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import background from '../../assets/background.svg';
import Accordion from '../../components/Accordion/Accordion';
import ExercisePopup from '../../components/ExercisePopup/ExercisePopup';
import Popup from 'reactjs-popup';
import DeletePopup from '../../components/DeletePopup/DeletePopup';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { getRequest, useDeleteMutation, usePostMutation, useUpdateMutation } from '../../services/query.service';
import { toast } from 'react-toastify';
import Toast from '../../components/Toast/Toast';

function Exercises() {
    const [createExerciseOpen, setCreateExerciseOpen] = useState(false);
    const [updateExerciseOpen, setUpdateExerciseOpen] = useState(false);
    const [deleteExerciseOpen, setDeleteExerciseOpen] = useState(false);
    const [createExercise, setCreateExercise] = useState({
        name: "", numberOfSets: "", repsPerSet: "",
        weight: "", ytLink: "", description: "", id: undefined
    });
    const [updateExercise, setUpdateExercise] = useState({
        name: "", numberOfSets: "", repsPerSet: "",
        weight: "", ytLink: "", description: "", id: undefined
    });
    const [deleteExercise, setDeleteExercise] = useState({ name: "", id: undefined });
    const [exercises, setExercises] = useState([]);
    const [workout, setWorkout] = useState([]);

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { workout_planId, workoutId } = useParams();

    const refetch = useCallback((operation) => {
        toast.success(`Übung ${operation}`);
        queryClient.invalidateQueries("exercises");
    }, [queryClient]);

    const onError = useCallback((error) => {
        toast.error(error);
    }, []);

    const { status } = useQuery(["exercises"],
        () => getRequest(`/exercises/workouts/${workoutId}`, setExercises, navigate)
    );

    //Used for workout request, to show workout name as page title
    useEffect(() => {
        getRequest(`/workouts/${workoutId}/workoutPlans/${workout_planId}`, setWorkout, navigate);
    }, []);

    const postMutation = usePostMutation(`/exercises/workouts/${workoutId}`, refetch, onError);
    const updateMutation = useUpdateMutation(`/exercises/${updateExercise.id}/workouts/${workoutId}`, refetch, onError);
    const deleteMutation = useDeleteMutation(`/exercises/${deleteExercise.id}/workouts/${workoutId}`, refetch, onError);

    const handleNewExercise = useCallback((e) => {
        e.preventDefault();
        postMutation.mutate({ ...createExercise, id: workoutId });
        setCreateExercise({
            name: "", numberOfSets: "", repsPerSet: "",
            weight: "", ytLink: "", description: "", id: undefined
        });
        setCreateExerciseOpen(false);
    }, [createExercise, postMutation, workoutId]);

    const handleUpdateExercise = useCallback((e) => {
        e.preventDefault();
        updateMutation.mutate(updateExercise);
        setUpdateExerciseOpen(false);
    }, [updateMutation, updateExercise]);

    const handleDeleteExercise = useCallback(() => {
        deleteMutation.mutate(deleteExercise);
        setDeleteExerciseOpen(false);
    }, [deleteMutation, deleteExercise]);

    const handleEditClick = useCallback((name, numberOfSets, repsPerSet, weight, ytLink, description, id) => {
        setUpdateExerciseOpen(true);
        setUpdateExercise({ name, numberOfSets, repsPerSet, weight, ytLink, description, id });
    }, []);

    const handleDeleteClick = useCallback((name, id) => {
        setDeleteExerciseOpen(true);
        setDeleteExercise({ name, id });
    }, []);

    return (
        <div className={styles.exercises}>
            <div className={styles.exercisesHeader}>
                <h1 className={styles.exercisesTitle}>"{workout[0]?.name}" - Übungen</h1>
                <Button text="+" onClick={() => setCreateExerciseOpen(true)} />
            </div>

            {/*Create Exercise popup*/}
            <ExercisePopup isOpen={createExerciseOpen} title="Übung erstellen"
                exercise={createExercise}
                setExercise={setCreateExercise} onSubmit={(e) => handleNewExercise(e)}
                onClose={() => setCreateExerciseOpen(false)}
            />

            {/*Update Exercise popup*/}
            <ExercisePopup isOpen={updateExerciseOpen} title="Übung bearbeiten"
                exercise={updateExercise}
                setExercise={setUpdateExercise} onSubmit={(e) => handleUpdateExercise(e)}
                onClose={() => setUpdateExerciseOpen(false)}
            />

            {/*Delete Exercise popup*/}
            <Popup open={deleteExerciseOpen}
                position="center"
                onClose={() => setDeleteExerciseOpen(false)}
                modal>
                <DeletePopup close={() => setDeleteExerciseOpen(false)}
                    text={`Übung "${deleteExercise.name}" endgültig löschen?`}
                    confirmBtnText={<CheckIcon />} cancelBtnText={<ClearIcon />}
                    onCancel={setDeleteExerciseOpen}
                    onConfirm={handleDeleteExercise}
                />
            </Popup>

            {!exercises.length ?
                <div className={styles.exercisesEmptyContainer}>
                    <img className={styles.backgroundImg} src={background} alt="Empty exercises image" />
                    <p className={styles.emptyExercisesHint}>
                        Ziemlich leer hier... Füge doch einfach neue Übungen hinzu!
                    </p>
                </div>
                :
                <div className={styles.exercisesContainer}>
                    <div className={styles.accordionContainer}>
                        {exercises?.length &&
                            exercises.map((exercise) => (
                                <Accordion key={exercise.id} data={exercise}
                                    handleEditClick={() => handleEditClick(exercise.name, exercise.numberOfSets,
                                        exercise.repsPerSet, exercise.weight, exercise.ytLink,
                                        exercise.description, exercise.id)}
                                    handleDeleteClick={() => handleDeleteClick(exercise.name, exercise.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            }
            <Toast />
        </div>
    )
}

export default Exercises;