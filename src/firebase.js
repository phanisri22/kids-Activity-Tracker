// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr2XOAeLK0Pius-Sg8GnmkJvYTA_h1Q6s",
  authDomain: "kidactivity-90304.firebaseapp.com",
  projectId: "kidactivity-90304",
  storageBucket: "kidactivity-90304.firebasestorage.app",
  messagingSenderId: "835999205257",
  appId: "1:835999205257:web:4436f78e152e521f0d0358",
  measurementId: "G-7P6QK2RJ1G",
  databaseURL: "https://kidactivity-90304-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
