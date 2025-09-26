<<<<<<< HEAD
=======
// firebase/auth.js
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

// Login function
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout function
export const logoutUser = async () => {
  await signOut(auth);
};
