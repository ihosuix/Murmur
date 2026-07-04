import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAfqbE8fisuhFa3PsoYRutlH3_RiBJ_lxE",
  authDomain: "murmur-80eb4.firebaseapp.com",
  projectId: "murmur-80eb4",
  storageBucket: "murmur-80eb4.firebasestorage.app",
  messagingSenderId: "960299633712",
  appId: "1:960299633712:web:96fcea4d5bbb3e17f071f5"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)