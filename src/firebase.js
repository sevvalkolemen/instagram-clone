import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { userHandle } from "utils";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

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
const db = getFirestore(app);

onAuthStateChanged(auth, async user => {
	if (user) {
		const dbUser = await getDoc(doc(db, "users", user.uid))
		let data = {
			uid: user.uid,
			fullName: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
			...dbUser.data()
		}
		userHandle(data)
	} else {
		userHandle(false)
	}
})

export const login = async (email, password) => {
  try {
    return  await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code);
  }
};

export const getUserInfo = async uname => {
	const username = await getDoc(doc(db, "usernames", uname))
	if (username.exists()) {
		return (await getDoc(doc(db, "users", username.data().user_id))).data()
	} else {
		toast.error("Kullanıcı bulunamadı!")
		throw new Error("Kullanıcı bulunamadı!")
	}
}

export const register = async ({email, password, fullname, username}) => {
	try {
		const user = await getDoc(doc(db, "usernames", username))
		if (user.exists()) {
			toast.error(`${username} kullanıcı adı başkası tarafından kullanılıyor.`)
		} else {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			if (response.user) {

				await setDoc(doc(db, "usernames", username), {
					user_id: response.user.uid
				})

				await setDoc(doc(db, "users", response.user.uid), {
					fullName: fullname,
					username: username,
					followers: [],
					following: [],
					notifications: [],
          website: '',
          bio: '',
          phoneNumber: '',
          gender: '',
          posts: 0
				})

				await updateProfile(auth.currentUser, {
					displayName: fullname
				})

				return response.user

			}
		}
	} catch (err) {
		toast.error(err.code)
	}
}

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.code);
  }
};
