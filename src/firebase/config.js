<<<<<<< HEAD
=======
// src/firebase/config.js
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

=======
  apiKey: "AIzaSyB1T6SBSs4iyBpmzNGtTuaPUt3ZHuzOc1o",
  authDomain: "placement-8b2ea.firebaseapp.com",
  projectId: "placement-8b2ea",
  storageBucket: "placement-8b2ea.appspot.com",
  messagingSenderId: "286483392611",
  appId: "1:286483392611:web:f633624b5751706490b056",
  measurementId: "G-P42X65CHNQ"
};


>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

<<<<<<< HEAD
export { auth, db };
=======
export { auth, db };
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
