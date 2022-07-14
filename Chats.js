import React, { useRef, useState, useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  //console.log(user);
  const [loading, setloading] = useState(true);
  const getfile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  const handlelogout = async () => {
    {
      await auth.signOut();
      history.push("/");
    }
  };
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setloading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getfile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY },
            })
            .then(() => setloading(false))
            .catch((err) => console.log(err));
        });
      });
  }, [user, history]);
  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">RichPanel</div>
        <div onClick={handlelogout} className="logout-tab">
          logout
          
        </div>
        
      </div>
      <ChatEngine
        offset={6}
        height="calc(100vh-66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        
      />
    </div>
  );
};
export default Chats;
