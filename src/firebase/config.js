import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC-amHSC5SvKQRKSxW9Vcr2tkQrvmg3VEg",
    authDomain: "whatsapp-clone-48de4.firebaseapp.com",
    projectId: "whatsapp-clone-48de4",
    storageBucket: "whatsapp-clone-48de4.appspot.com",
    messagingSenderId: "255007520369",
    appId: "1:255007520369:web:c9c941ba2102f9c4980dd0"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  export default db;
  export {auth, provider}