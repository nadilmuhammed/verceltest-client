  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider } from "firebase/auth";

  const firebaseConfig = {
      apiKey: "AIzaSyAar_RjVT_pomT8ori0ZkxXocN-h2sMhzw",
      authDomain: "verification-ca0a5.firebaseapp.com",
      projectId: "verification-ca0a5",
      storageBucket: "verification-ca0a5.appspot.com",
      messagingSenderId: "861229472025",
      appId: "1:861229472025:web:cfd39ac47e33a15bb78d88",
      measurementId: "G-1CBERRDPG6"
    };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
