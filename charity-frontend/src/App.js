import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharityView from './charity/CharityView';
import Login from './login/Login';
import Home from './home/Home';
import { firebase, auth, db } from './configs';
import './App.css';
import 'antd/dist/antd.css';

async function testEndpoint() {
  const res = await db.getSpecificCharity('-LokgL9xMCJ0MbybwJis');
  console.log(res);
}

function App() {
  testEndpoint();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/charity" component={CharityView} />
          {/* user and charity views */}
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
