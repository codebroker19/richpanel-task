import React from "react";
import SignUp from "./SignUp";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase from "firebase/app";
import Selflogin from "./Selflogin";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "30vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Selflogin />
          </div>
        </Container>

        <br />
        <br />
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined />
          Login with Google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined />
          Login with Facebook
        </div>
      </div>
    </div>
  );
};
export default Login;
