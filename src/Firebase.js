import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDzcLCXg76BovH6CFQaMJ1iiQq1aT1csD4",
  authDomain: "frontend-assignment-6e7bb.firebaseapp.com",
  databaseURL: "https://frontend-assignment-6e7bb-default-rtdb.firebaseio.com",
  projectId: "frontend-assignment-6e7bb",
  storageBucket: "frontend-assignment-6e7bb.appspot.com",
  messagingSenderId: "712974371400",
  appId: "1:712974371400:web:7fe68cf1c59a5c5afde67d",
  measurementId: "G-FS5Z6ZQ0CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)