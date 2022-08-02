import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { userHandle } from "utils";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKXUVXd8E577yn4XYfO3MGmg9MIB7a9vI",
  authDomain: "instagram-clone-c50c1.firebaseapp.com",
  projectId: "instagram-clone-c50c1",
  storageBucket: "instagram-clone-c50c1.appspot.com",
  messagingSenderId: "365496684599",
  appId: "1:365496684599:web:c674eb269abe43d3552fb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
 
onAuthStateChanged(auth,user => {
    userHandle(user || false)
})

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

  } catch (error) {
    toast.error(error.code);
  }
}

export const logout = async () => {
  try{
    await signOut(auth)
  } catch(err){
    toast.error(err.code)
  }
}