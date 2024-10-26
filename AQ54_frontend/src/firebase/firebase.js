import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNn5aZP7TqWEgjSGEnAniaxGKQ6NiucmY",
  authDomain: "aq54-54da0.firebaseapp.com",
  projectId: "aq54-54da0",
  storageBucket: "aq54-54da0.appspot.com",
  messagingSenderId: "41704080568",
  appId: "1:41704080568:web:2604f823eecbef1007204d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
