import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD5XNNElPjxzez5_N35A4uKQaTEzNyiONk",
  authDomain: "empowerfam-362d5.firebaseapp.com",
  projectId: "empowerfam-362d5",
  storageBucket: "empowerfam-362d5.firebasestorage.app",
  messagingSenderId: "1031204995630",
  appId: "1:1031204995630:web:a70685e12653b35afe15bf",
  measurementId: "G-NDSGJ9WS7P"
};

// Check if Firebase app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
