import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDicvatRkjOnJGbKe_YreXDTTNN4ZBI3Lw",
  authDomain: "tech119-1fd20.firebaseapp.com",
  projectId: "tech119-1fd20",
  storageBucket: "tech119-1fd20.firebasestorage.app",
  messagingSenderId: "788925792482",
  appId: "1:788925792482:web:dda723abf545a80d019ebb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };