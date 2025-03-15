// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC43pviE6r-psD4bvgv7Siz3DlkZXbj9UA",
  authDomain: "munch-mate-9003f.firebaseapp.com",
  projectId: "munch-mate-9003f",
  storageBucket: "munch-mate-9003f.firebasestorage.app",
  messagingSenderId: "453571680407",
  appId: "1:453571680407:web:6aaff905a4733e305ff1d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };