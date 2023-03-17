import { initializeApp } from "firebase/app";
import {
 getAuth,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 sendPasswordResetEmail,
 signOut,
} from "firebase/auth";
import {
 getFirestore,
 setDoc,
 doc,
} from "firebase/firestore";

// Reference: https://blog.logrocket.com/user-authentication-firebase-react-apps/
//            https://github.com/atharvadeosthale/firebase-auth-article/tree/master/src

const firebaseConfig = {
  apiKey: "AIzaSyC58tOLUBFaRVvWqQo4J-tnfI_GD5I3bAQ",
  authDomain: "cafenaut-511b2.firebaseapp.com",
  projectId: "cafenaut-511b2",
  storageBucket: "cafenaut-511b2.appspot.com",
  messagingSenderId: "1008137617927",
  appId: "1:1008137617927:web:f6b296f68df3de7835e0a2",
  measurementId: "G-KXQ8Q36XVZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email: any) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
