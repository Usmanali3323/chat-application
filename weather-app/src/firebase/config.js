
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAiFaNFQrA0uPs7QCmf1e201GUQcPD9WsE",
  authDomain: "weatherapp-c50ba.firebaseapp.com",
  databaseURL: "https://weatherapp-c50ba-default-rtdb.firebaseio.com",
  projectId: "weatherapp-c50ba",
  storageBucket: "weatherapp-c50ba.appspot.com",
  messagingSenderId: "318051026560",
  appId: "1:318051026560:web:78f97dfb7a9955b8fa0865",
  measurementId: "G-Q445EVQXDZ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;