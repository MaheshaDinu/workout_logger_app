// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHJFC5a6yW0dZQBpfuZDzIolG8hpXkIbI",
  authDomain: "workout-logger-by-mahesha.firebaseapp.com",
  projectId: "workout-logger-by-mahesha",
  storageBucket: "workout-logger-by-mahesha.firebasestorage.app",
  messagingSenderId: "889049541212",
  appId: "1:889049541212:web:8e1d37cc2fa84ff3199499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);