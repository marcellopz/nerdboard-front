// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf_S66QI7UE_awAXdPuMx1FiBvxqAN4ic",
  authDomain: "nerdboard-956ae.firebaseapp.com",
  projectId: "nerdboard-956ae",
  storageBucket: "nerdboard-956ae.firebasestorage.app",
  messagingSenderId: "73295797051",
  appId: "1:73295797051:web:b21d41844ec60293e4b51e",
  measurementId: "G-ZMXMVGJ592",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getDatabase(app);

const dbRef = ref(db);

const storage = getStorage(app);

const storageRef = refStorage(storage);

export default auth;

export { dbRef, db, storage, storageRef };
