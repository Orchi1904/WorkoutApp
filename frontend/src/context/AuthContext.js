import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true //Because of cookies
        })

        setUser(res.data);
    };

    const logout = async () => {
        await axios.post("http://localhost:8800/api/auth/logout");
        setUser(null);
    };

    console.log("State: ", user);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);