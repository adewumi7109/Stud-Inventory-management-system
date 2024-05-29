"use client"
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const AuthContext = createContext({});

export const AuthProvider = ({children})=>{
    const [userData, setUserData] = useState(null);
    const router = useRouter();
    const signin = (userData) => {
        const userDataString = JSON.stringify(userData);
  setUserData(userData);
  localStorage.setItem('userData', userDataString);
      };

      const getUserName =() =>{
        const user = localStorage.getItem('userData')
        const userData = user ? JSON.parse(user) : null;
        if (userData && userData.response && userData.response.userName) {
            return userData.response.userName;
          } else {
            return null; 
          }
    }

      const logout = () => {
        setUserData(null);
        localStorage.removeItem('userData');
        router.push('/')
      };
    return(
        <AuthContext.Provider value={{signin, getUserName, logout, userData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;