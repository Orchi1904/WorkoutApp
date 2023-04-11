import React, { useState } from 'react';
import styles from './Exercises.module.css';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { makeRequest } from '../../request';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import background from '../../assets/background.svg';
import Accordion from '../../components/Accordion/Accordion';
import ExercisePopup from '../../components/ExercisePopup/ExercisePopup';


function Exercises() {
    const [createExerciseOpen, setCreateExerciseOpen] = useState(false);
    const [updateExerciseOpen, setUpdateExerciseOpen] = useState(false);
    const [createExercise, setCreateExercise] = useState({
        name: "", numberOfSets: null, repsPerSet: null,
        weight: null, ytLink: "", description: "", id: null
    });
    const [updateExercise, setUpdateExercise] = useState({
        name: "", numberOfSets: null, repsPerSet: null,
        weight: null, ytLink: "", description: "", id: null
    });

    const queryClient = useQueryClient();
    const { workoutId } = useParams();

    const { isLoading, error, data } = useQuery(["exercises"], () =>
        makeRequest.get(`/exercises/${workoutId}`).then((res) => {
            console.log(res.data);
            return res.data;
        })
    );

    const postMutation = useMutation((exercise) => {
        return makeRequest.post("/exercises", exercise);
    },
        {
            //refetch workouts on success
            onSuccess: () => {
                queryClient.invalidateQueries("exercises");
            },
        }
    );

    /*const updateMutation = useMutation((exercise) => {
        return makeRequest.put("/exercises", exercise);
    },
        {
            //refetch workouts on success
            onSuccess: () => {
                queryClient.invalidateQueries("exercises");
            },
        }
    );*/

    const handleNewExercise = () => {
        postMutation.mutate({
            name: createExercise.name, numberOfSets: createExercise.numberOfSets,
            repsPerSet: createExercise.repsPerSet, weight: createExercise.weight,
            ytLink: createExercise.ytLink, description: createExercise.description, workoutId
        });
        setCreateExercise({
            name: "", numberOfSets: null, repsPerSet: null,
            weight: null, ytLink: "", description: "", id: null
        });
        setCreateExerciseOpen(false);
    }

    const handleUpdateExercise = () => {
       /* updateMutation.mutate({
            name: createExercise.name, numberOfSets: createExercise.numberOfSets,
            repsPerSet: createExercise.repsPerSet, weight: createExercise.weight,
            ytLink: createExercise.ytLink, description: createExercise.description, workoutId
        });
        setCreateExercise({
            name: "", numberOfSets: null, repsPerSet: null,
            weight: null, ytLink: "", description: "", id: null
        });
        setCreateExerciseOpen(false);*/
    }

    const handleEditClick = (name, numberOfSets, repsPerSet, weight, ytLink, description, id) => {
        setUpdateExerciseOpen(true);
        setUpdateExercise({name, numberOfSets, repsPerSet, weight, ytLink, description, id});
    }

    return (
        <div className={styles.exercises}>
            <div className={styles.exercisesHeader}>
                <h1 className={styles.exercisesTitle}>Meine Übungen</h1>
                <Button text="+" onClick={() => setCreateExerciseOpen(true)} />
            </div>

            {/*Create Exercise popup*/}
            <ExercisePopup isOpen={createExerciseOpen} title="Übung erstellen"
                exercise={createExercise}
                setExercise={setCreateExercise} onSubmit={() => handleNewExercise()}
                onClose={() => setCreateExerciseOpen(false)}
            />

            {/*Update Exercise popup*/}
            <ExercisePopup isOpen={updateExerciseOpen} title="Übung bearbeiten"
                exercise={updateExercise}
                setExercise={setUpdateExercise} onSubmit={() => handleUpdateExercise()}
                onClose={() => setUpdateExerciseOpen(false)}
            />

            {!data?.length && !isLoading ?
                <div className={styles.exercisesEmptyContainer}>
                    <img className={styles.backgroundImg} src={background} alt="Empty exercises image" />
                    <p className={styles.emptyExercisesHint}>
                        Ziemlich leer hier... Füge doch einfach neue Übungen hinzu!
                    </p>
                </div>
                :
                <div className={styles.exercisesContainer}>
                    <div className={styles.accordionContainer}>
                        {data?.length &&
                            data.map((exercise) => (
                                <Accordion key={exercise.id} data={exercise} 
                                           handleEditClick={() => handleEditClick(exercise.name, exercise.numberOfSets,
                                                                  exercise.repsPerSet, exercise.weight, exercise.ytId, 
                                                                  exercise.description, exercise.workoutId)}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Exercises;