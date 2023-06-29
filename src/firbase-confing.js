import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import 'firebase/storage'
import { getStorage } from "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2_FzaH7-24RLLfpJRN2gwpo5tXWdD3Vk",
  authDomain: "waz1-85eb2.firebaseapp.com",
  projectId: "waz1-85eb2",
  storageBucket: "waz1-85eb2.appspot.com",
  messagingSenderId: "572477444036",
  appId: "1:572477444036:web:7706f52e63a584815b5e91"
};
let app;
app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth };
export { db };
export  { storage };
