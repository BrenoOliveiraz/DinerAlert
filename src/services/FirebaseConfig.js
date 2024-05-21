import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

import "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNoruyp_8y8mcPEegKRfgdBkWgkRXN0yw",
  authDomain: "dinner-alert.firebaseapp.com",
  projectId: "dinner-alert",
  storageBucket: "dinner-alert.appspot.com",
  messagingSenderId: "963685809584",
  appId: "1:963685809584:web:84e80175e11745c3f06a75",
  measurementId: "G-9MTZPWTW5Q"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)