import React, { createContext, useEffect, useState } from "react";
import http from "../utils/http";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // check if token is present in local storage
    useEffect(() => {
        // set token in local storage
        if (token) {
            setAuthToken(token);
            http
                .get("/user")
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    setToken(null);
                    localStorage.removeItem("token");
                    console.log(err);
                    setAuthToken(null);
                });
        }
    }, [token]);

    // login function
    const login = async (email, password) => {
        const res = await http.post("/auth/login", { email, password });
        const { token } = res.data; // token is the JWT token
        setToken(token);
        localStorage.setItem("token", token);// set the token in local storage
        console.log("Token", token);
        setAuthToken(token);
        const userResponse = await http.get("/user");
        console.log("User Response", userResponse.data);
        setUser(userResponse.data);
    };
    // logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 