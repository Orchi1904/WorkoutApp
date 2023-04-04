import React from 'react';
import styles from './Exercises.module.css';
import { useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../request';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import background from '../../assets/background.svg';


function Exercises() {
    const queryClient = useQueryClient();
    const { workoutId } = useParams();

    const { isLoading, error, data } = useQuery(["exercises"], () =>
        makeRequest.get(`/exercises/${workoutId}`).then((res) => {
            console.log(res.data);
            return res.data;
        })
    );

    return (
        <div className={styles.exercises}>
            <div className={styles.exercisesHeader}>
                <h1 className={styles.exercisesTitle}>Meine Übungen</h1>
                <Button text="+" onClick={() => console.log()} />
            </div>

            {!data?.length && !isLoading ?
                <div className={styles.exercisesEmptyContainer}>
                    <img className={styles.backgroundImg} src={background} alt="Empty exercises image" />
                    <p className={styles.emptyExercisesHint}>
                        Ziemlich leer hier... Füge doch einfach neue Übungen hinzu!
                    </p>
                </div>
                :
                <div className={styles.exercisesContainer}>
                    {data?.length &&
                        data.map((exercise) => (
                            <div>
                                {exercise.name}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Exercises;