import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyDfge-sCki_b_B73mZSHfqRedPUKKY49-I",
  authDomain: "smartassist-5da80.firebaseapp.com",
  projectId: "smartassist-5da80",
  storageBucket: "smartassist-5da80.firebasestorage.app",
  messagingSenderId: "816438512300",
  appId: "1:816438512300:web:f3fa63517ebffb8727ad09",
  measurementId: "G-14HXNG71L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);