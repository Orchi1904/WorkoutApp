import axios from "axios";

const API_URL = "http://localhost:8800/api/auth";

const register = async (inputs) => {
    return await axios
    .post(API_URL + "/register", inputs)
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
}

const login = async (inputs) => {
    return await axios
    .post(API_URL + "/login", inputs)
    .then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const authService = {
    register,
    login,
    logout,
    getUser,
};

export default authService;

