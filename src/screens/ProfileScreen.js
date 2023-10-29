import React from 'react';
import Nav from '../Nav';
import './ProfileScreen.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import PlanScreen from './PlanScreen';


function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="ProfileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              
              <PlanScreen /> {/* Render the PlanScreen component here */}
              <button onClick={() => auth.signOut()} className="profileScreen__signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
