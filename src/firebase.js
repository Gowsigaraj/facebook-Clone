
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB19FnDhi7Ek1A607p0hDX33CLQO3D5KAg",
    authDomain: "facebook-react-clone-11d60.firebaseapp.com",
    projectId: "facebook-react-clone-11d60",
    storageBucket: "facebook-react-clone-11d60.appspot.com",
    messagingSenderId: "359445026986",
    appId: "1:359445026986:web:9748bcbc19ff91b39618d3"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);