import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxiM3vMRVSeRAX2mPXMu-RSSTrFM3Ug0k",
  authDomain: "finalassesment-4480b.firebaseapp.com",
  projectId: "finalassesment-4480b",
  storageBucket: "finalassesment-4480b.firebasestorage.app",
  messagingSenderId: "387861426913",
  appId: "1:387861426913:web:4ea42bf671f2d9026ffda0",
  measurementId: "G-P18LR3S446"
};

const mhApp = initializeApp(firebaseConfig); // <-- FIXED
export const mhAuth = getAuth(mhApp);
export const mhFirestore = getFirestore(mhApp);
export default mhApp;
