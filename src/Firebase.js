import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDNKZcehWx2X1jeBr81A80wH5svIjP6BH0",
  authDomain: "testing-26912.firebaseapp.com",
  projectId: "testing-26912",
  storageBucket: "testing-26912.appspot.com",
  messagingSenderId: "414086349123",
  appId: "1:414086349123:web:4a1e0cdd6bce6233f8eff6",
  measurementId: "G-ZCL1VS96XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)