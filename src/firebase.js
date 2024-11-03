import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAPvXqrkoUJxxXT_cN_DxTWgSKswOwCweo",
  authDomain: "chatapp-10d4e.firebaseapp.com",
  projectId: "chatapp-10d4e",
  storageBucket: "chatapp-10d4e.appspot.com",
  messagingSenderId: "208443733730",
  appId: "1:208443733730:web:62e5b4dc90c66a83b4d0bb",
  measurementId: "G-F5KPEJDWMR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
