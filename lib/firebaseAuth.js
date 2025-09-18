
// lib/firebaseAuth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

export const signUp = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth };