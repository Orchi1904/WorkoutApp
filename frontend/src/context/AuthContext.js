import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const API_URL = "http://localhost:8800/api/auth";
    const [user, setUser] = useState((async() => await getUser()) || null);

    const login = async (inputs) => {
        return await axios
            .post(API_URL + "/login", inputs)
            .then((response) => {
                if (response.data.accessToken) {
                    setUser(JSON.stringify(response.data));
                }

                return response.data;
            });
    };

    const logout = async () => {
        await axios.get(API_URL + "/logout");
        setUser(null);
    };

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8800/api" + "/users/getUser");
            console.log("AAAAAAAAAAAAAA");
            return response.data;
        } catch (error) {
            console.log("WSE");
            return null;
        }
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);