// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAd_QZ3befiDEKsyP-9oFnZ6HP_CS6JnRY",
  authDomain: "spacex-b7360.firebaseapp.com",
  projectId: "spacex-b7360",
  storageBucket: "spacex-b7360.appspot.com",
  messagingSenderId: "151224708929",
  appId: "1:151224708929:web:e26e735eaedead7356fbc0",
  measurementId: "G-X5H01HBNMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)