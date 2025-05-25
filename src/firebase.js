import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxqjqYUXlWW2cGA_bIrM3-85EiJCRkLTI",
  authDomain: "bb-micofin.firebaseapp.com",
  databaseURL: "https://bb-micofin-default-rtdb.firebaseio.com",
  projectId: "bb-micofin",
  storageBucket: "bb-micofin.firebasestorage.app",
  messagingSenderId: "706472289694",
  appId: "1:706472289694:web:ea7aaaf567168ffd43e28f",
  measurementId: "G-RBDJHZ2HXE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);