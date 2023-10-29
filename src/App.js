import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HomeScreen from "./screens/HomeScreen"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"; 
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { login,logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';



function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
   const unsubscribe = auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        // logged in 
        dispatch (login({
          uid:userAuth.uid,
          email: userAuth.email,
        })
        );
      }else{
        // logged out
        dispatch(logout());
      }
  });

   return unsubscribe;
}, [dispatch]);
  return (
    <div className="app">
       <Router>
        <Routes>
          {!user ? (
            <Route path="/" element={<LoginScreen />} />
          ) : (
            <>
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </>
          )}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
