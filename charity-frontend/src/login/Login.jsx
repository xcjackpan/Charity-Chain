import React from 'react';
import LoginSelect from './LoginSelect';
import LoginBox from './LoginBox';
import { Link as Chain } from 'react-feather';
import './Login.css';

const NO_LOGIN = 0;
const CHARITY_LOGIN = 1;
const USER_LOGIN = 2;

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      showLogin: NO_LOGIN,
    }
  }

  changeLogin = (newState) => {
    this.setState({showLogin: newState});
  }

  render() {
    return (
      <div className="login-page">
        <h1 style={{ display: "flex", alignItems: "center", marginRight: "4px" }} className="title"><Chain size={36} />CharityChain</h1>
        {this.state.showLogin === NO_LOGIN ? 
          <div id="login-container">
            <LoginSelect isCharity={false} changeLogin={this.changeLogin}/>
            <LoginSelect isCharity changeLogin={this.changeLogin}/>
          </div> :
          <div id="login-container">
            <LoginBox isCharity={this.state.showLogin === CHARITY_LOGIN}
                      changeLogin={this.changeLogin} 
                      logIn={this.props.logIn} />
          </div>
        }
      </div>
      
    )
  }
}