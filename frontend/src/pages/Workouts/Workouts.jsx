import React from 'react';
import styles from './Workouts.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { makeRequest } from '../../request';

function Workouts() {
    const {workout_planId} = useParams();

    const { isLoading, error, data } = useQuery(["workouts"], () =>
    makeRequest.get("/workouts/" + workout_planId).then((res) => {
        console.log(res.data);
        return res.data;
    }));
    
    return (
        <h1>
            Hi {data && data[0].weekday}
        </h1>
    )
}

export default Workouts;