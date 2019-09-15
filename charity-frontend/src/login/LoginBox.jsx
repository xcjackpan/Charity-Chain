import React from 'react';
import { Spin, Form, Icon, Input, Button, Checkbox } from 'antd';
import { Heart, User } from 'react-feather';
import { getRefOfCharities, getListOfUsers } from '../configs/db.js';
import './Login.css';

export default class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: false,
      loading: false,
    }
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyPress, false);
}

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyPress, false);
  }

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.submitLogin();
    }
  }

  updateUsername = (e) => {
    this.setState({
      loginError: false,
      username: e.target.value,
    });
  }

  updatePassword = (e) => {
    this.setState({
      loginError: false,
      password: e.target.value,
    });
  }

  submitLogin = () => {
    this.setState({ loading: true })
    if (this.props.isCharity) {
      getRefOfCharities().then(res => {
        const charitiesArr = Object.values(res);
        let flag = false;
        charitiesArr.forEach((elem) => {
          if (elem.email === this.state.username) {
            flag = true;
            this.props.logIn(elem, this.props.isCharity);
          }
        })
        if (!flag) {
          this.setState({ loginError: true, loading: false })
        }
        return;
      })
    } else {
      getListOfUsers().then(res => {
        const userArr = Object.values(res);
        let flag = false;
        userArr.forEach((elem) => {
          if (elem.email === this.state.username) {
            flag = true;
            this.props.logIn(elem, this.props.isCharity);
          }
        })
        if (!flag) {
          this.setState({ loginError: true, loading: false })
        }
        return;
      })
    }
  }

  render() {
    return (
      <div className="login-box">
        {
          this.props.isCharity ?
            <Heart className="icon" size={100} /> :
            <User className="icon" size={100} />
        }
        <Form className="login-form">
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
              onChange={this.updateUsername}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.updatePassword}
            />
          </Form.Item>
          <Form.Item>
            {
              this.state.loading ?
                <Spin /> :
                <div id="login-options">
                  <span className="login-span">
                    <Checkbox>Remember me</Checkbox>
                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </span>
                  <Button type="primary" className="login-form-button"
                          onClick={this.submitLogin}>
                    Log in
                  </Button>
                  <span>
                    Or <a href="">register now!</a>
                  </span>
                  <span style={{color: "#f5222d", display: this.state.loginError ? "block" : "none"}}>
                    Incorrect login information.
                  </span>
                </div>
            }
          </Form.Item>
        </Form>
        <Button
          className="back"
          type="primary"
          onClick={() => {
            this.props.changeLogin(0);
          }} 
        >
          Back
        </Button>
      </div>
    );
  }
}