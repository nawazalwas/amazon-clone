// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { AmazonUseContext } from "./StateProvider";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArAtgCx56QNHsABrkS-TqbXkyCx7amvEw",
  authDomain: "clone-196e9.firebaseapp.com",
  projectId: "clone-196e9",
  storageBucket: "clone-196e9.appspot.com",
  messagingSenderId: "577431301689",
  appId: "1:577431301689:web:8b6e6da17c2e48426427e8",
  measurementId: "G-6T8DHFH8BE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();





export {app,auth,db};