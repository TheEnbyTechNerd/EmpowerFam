// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5XNNElPjxzez5_N35A4uKQaTEzNyiONk",
  authDomain: "empowerfam-362d5.firebaseapp.com",
  projectId: "empowerfam-362d5",
  storageBucket: "empowerfam-362d5.firebasestorage.app",
  messagingSenderId: "1031204995630",
  appId: "1:1031204995630:web:65fa0cf1df7c8615fe15bf",
  measurementId: "G-VJ81VXJE7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);