import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAf6u4A-cLtwFyHa_8_5OfbEQ445PcrV1Y",
  authDomain: "todo-app-1992e.firebaseapp.com",
  projectId: "todo-app-1992e",
  storageBucket: "todo-app-1992e.appspot.com",
  messagingSenderId: "319378357811",
  appId: "1:319378357811:web:64603ff1893eba0e7f6d46"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage