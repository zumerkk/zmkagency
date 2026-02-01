import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ZMK Agency Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVK6j5M3J9cKe3V_ToNh5zDUlQt6K5XYU",
    authDomain: "zmkagency.firebaseapp.com",
    projectId: "zmkagency",
    storageBucket: "zmkagency.firebasestorage.app",
    messagingSenderId: "719082946825",
    appId: "1:719082946825:web:553b8567cf5063478153d8",
    measurementId: "G-KL7PQ6X9W7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
