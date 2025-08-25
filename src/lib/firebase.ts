// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "binarta-luhur",
  appId: "1:889537582130:web:4a8e3304b4d8aad676d82b",
  storageBucket: "binarta-luhur.appspot.com",
  apiKey: "AIzaSyBZKSe0UgfUDHZhCwTPcp2c9h-50wazoQs",
  authDomain: "binarta-luhur.firebaseapp.com",
  messagingSenderId: "889537582130",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { app, storage };
