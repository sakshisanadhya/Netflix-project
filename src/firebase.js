import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCefo7M3EfTqGtp8zv1mNq6uLn8BzJ1N9U",
    authDomain: "netflix-clone-74d20.firebaseapp.com",
    projectId: "netflix-clone-74d20",
    storageBucket: "netflix-clone-74d20.appspot.com",
    messagingSenderId: "395480795178",
    appId: "1:395480795178:web:4f5bc9dab82e6050599b53"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth };