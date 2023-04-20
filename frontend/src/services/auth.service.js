import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8800/api/auth";

const register = async (inputs) => {
    return await axios
    .post(API_URL + "/register", inputs)
    .then((response) => {
        return response.data;
    });
}

const login = async (inputs) => {
    return await axios
    .post(API_URL + "/login", inputs)
    .then((response) => {
        return response.data;
    });
}

const logout = async () => {
    return await axios.post(API_URL + "/logout");
}

const getUser = () => {
    return Cookies.get("accessToken");
}

const authService = {
    register,
    login,
    logout,
    getUser,
};

export default authService;

