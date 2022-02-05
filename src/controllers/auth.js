import  { createContext, useContext, useState } from "react";
import AuthModel from "../model/authModel";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkFunc = (data, setLoader) => {
    if (!data.result) {
      setLoader(false)
      alert(data.message);
    } else {
      setLoader(false)
      setUser({...data.response, _api_key : data.apikey })
      setIsAuthenticated(true)
      return true;
    }
  };

  const signIn = (data, cb, setLoader) => {
    
    return AuthModel.signIn(() => {
      try {
        fetch(`${BASE_URL}/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            let isCompleted = checkFunc(data, setLoader);
            if (isCompleted) {
              cb();
            }
          });
      } catch (err) {
        console.log(err.message);
        alert("error occur");
      }
    });
  };

  const signOut = (cb) =>{
    return AuthModel.signOut(()=>{
      setUser(null)
      setIsAuthenticated(false)
      cb()
    })
  }

  return {
    signIn,
    signOut,
    user,
    isAuthenticated
  };
};

export { AuthProvider, authContext };
