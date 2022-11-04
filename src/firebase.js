// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmcm_baMaYSQZduRozDexcmJf6snBtzbk",
  authDomain: "login-sistema-inv-auth.firebaseapp.com",
  projectId: "login-sistema-inv-auth",
  storageBucket: "login-sistema-inv-auth.appspot.com",
  messagingSenderId: "94797974101",
  appId: "1:94797974101:web:97f22714bb0cb54876a2dc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)