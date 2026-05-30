import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB2ShQ8YPzPGx8-40YhThempzxA_opCzgg",
  authDomain: "mernai-e6181.firebaseapp.com",
  projectId: "mernai-e6181",
  storageBucket: "mernai-e6181.appspot.app",
  messagingSenderId: "485679356411",
  appId: "1:485679356411:web:9e16cf7150eeae53ab135e",
  measurementId: "G-9H4R3XDEYP"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
  hd: ""
});