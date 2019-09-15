import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharityView from './charity/CharityView';
import Login from './login/Login';
import Home from './home/Home';
import ProfileContainer from './profile/ProfileContainer';
import { firebase, auth, db } from './configs';
import history from "./history";
import './App.css';
import 'antd/dist/antd.css';

// async function testEndpoint() {
//   const res = await db.incrementDonation('-LokjEwXV8gjG1Ut-8lU');
//   console.log(res);
// }

function App() {
  // testEndpoint();

  let logIn = (name, charity) => {
    // Name will be a userID passed into component
    // Component, when mounted, makes a query to get all the informatin it needs about itself
    // We query for the details (money) associated with the userID
    console.log(name);
    if (!charity) {
      history.push(`/user/${name}`);
    } else {
      history.push(`/charity/${name}`);
    }
    window.location.reload()
  }

  let logOut = () => {
    history.push(`/`);
    window.location.reload()
  }

  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/user" render={(props) => <Home {...props} logOut={logOut} />} />
          <Route path="/charity/:id" render={(props) => <CharityView {...props} logOut={logOut} />} />
          <Route path="/profile" render={(props) => <ProfileContainer {...props} logOut={logOut} />} /> 

          <Route exact path="/" render={() => <Login logIn={logIn} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
