import React from 'react';
import './Login.css';
import { Heart, User } from 'react-feather';

const LoginSelect = (props) => {
  return (
    <div className="login-select">
      {
        props.isCharity ?
        <Heart className="icon"
               size={250} 
               onClick={() => {
                 props.changeLogin(1);
               }}/> :
        <User className="icon"
              size={250} 
              onClick={() => {
                props.changeLogin(2);
              }} />
      }
      <span className="label">
        {props.isCharity ? "Charity" : "User"}
      </span>
    </div>
  );
}

export default LoginSelect;