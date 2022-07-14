import firebase from "firebase/app";
import "firebase/auth";
export const auth = firebase.initializeApp({
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "richpanel-95e3b.firebaseapp.com",
    projectId: "richpanel-95e3b",
    storageBucket: "richpanel-95e3b.appspot.com",
    messagingSenderId: "298875564785",
    appId: "1:298875564785:web:0cd0b02046b664cd84ef50"
  }).auth();