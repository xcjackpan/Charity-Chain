import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharityView from './charity/CharityView';
import Login from './login/Login';
import Home from './home/Home';
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

  const [name, setName] = useState("");

  let logIn = (name, charity) => {
    setName(name);
    if (!charity) {
      history.push(`/user`);
    } else {
      history.push(`/charity`);
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
          <Route path="/user" render={() => <Home logOut={logOut} name={name}/>} />
          <Route path="/charity" render={() => <CharityView logOut={logOut} name={name}/>} />
          {/* user and charity views */}
          <Route exact path="/" render={() => <Login logIn={logIn} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
