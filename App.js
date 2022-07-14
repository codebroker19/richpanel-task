import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";
import SignUp from "./SignUp";
import Chats from "./Chats";
import Login from "./Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
          
            <Route path="/chats" component={Chats} />
            <Route path="/login" component={Login} />
            <Route path="/" component={SignUp} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
