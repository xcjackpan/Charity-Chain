import React from 'react';
import './Login.css';
import LoginSelect from './LoginSelect';
import LoginBox from './LoginBox';

const NO_LOGIN = 0;
const CHARITY_LOGIN = 1;
const USER_LOGIN = 2;

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogin: NO_LOGIN,
    }
  }

  changeLogin = (newState) => {
    this.setState({showLogin: newState});
  }

  render() {
    if (this.state.showLogin === NO_LOGIN) {
      return (
        <div id="login-container">
          <LoginSelect isCharity={false} changeLogin={this.changeLogin}/>
          <LoginSelect isCharity changeLogin={this.changeLogin}/>
        </div>
      );
    } else {
      return (
        <div id="login-container">
          <LoginBox isCharity={this.state.showLogin === CHARITY_LOGIN}
                    changeLogin={this.changeLogin}/>
        </div>
      )
    }
  }
}