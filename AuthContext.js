import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  // useEffect(()=>{
  // const unsubscribe=auth.onAuthStateChanged(user=>{

  //     setloading(false);
  // })
  // return unsubscribe;
  // },[])

  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setCurrentUser(user);
      setloading(false);
      if (user) history.push("/chats");
      // const unsubscribe=auth.onAuthStateChanged(user=>{

      //     setloading(false);
      // })
      // return unsubscribe;
    });
  }, [user, history]);
  const value = { user, register, currentUser, login };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
