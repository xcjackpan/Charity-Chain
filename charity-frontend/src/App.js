import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharityView from './charity/CharityView';
import Login from './login/Login';
import Home from './home/Home';
import './configs';
import './App.css';
import 'antd/dist/antd.css';

function App() {
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
