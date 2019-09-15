import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharityView from './charity/CharityView';
import Login from './login/Login';
import Home from './home/Home';
import ProfileContainer from './profile/ProfileContainer';
import history from "./history";
import './App.css';
import 'antd/dist/antd.css';

import { consumeTransactionFromUser } from './configs/db';

function App() {
  consumeTransactionFromUser('1', '105');
  let logIn = (identityObj, charity) => {
    // Name will be a userID passed into component
    // Component, when mounted, makes a query to get all the informatin it needs about itself
    // We query for the details (money) associated with the userID
    if (!charity) {
      history.push(`/user/${identityObj.username}/browse`);
    } else {
      history.push(`/charity/${identityObj.account_number}`);
    }
    window.location.reload()
  }

  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/user/:id/browse" render={(props) => <Home {...props} />} />
          <Route path="/user/:id/profile" render={(props) => <ProfileContainer {...props} />} /> 
          <Route path="/charity/:id" render={(props) => <CharityView {...props} />} />

          <Route exact path="/" render={() => <Login logIn={logIn} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
