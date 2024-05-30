"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

      }
    }, []);

    const signin = (userData) => {
        const userDataString = JSON.stringify(userData);
        setUserData(userData);
        if (typeof window !== "undefined") {
            localStorage.setItem('userData', userDataString);
        }
    };

    const getUserName = () => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem('userData');
            const userData = user ? JSON.parse(user) : null;
            if (userData && userData.response && userData.response.userName) {
                return userData.response.userName;
            }
        }
        return null;
    };

    const logout = () => {
        setUserData(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem('userData');
        }
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ signin, getUserName, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
