// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJSvlG36k4gHvmvHLQJSOu8UGejgfzyug",
  authDomain: "react-course-e6940.firebaseapp.com",
  projectId: "react-course-e6940",
  storageBucket: "react-course-e6940.appspot.com",
  messagingSenderId: "582925949148",
  appId: "1:582925949148:web:b2814d8f35b32d74757c19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);