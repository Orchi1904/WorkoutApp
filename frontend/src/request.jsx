import axios from "axios";

axios.defaults.withCredentials = true;

export const makeRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true,
})