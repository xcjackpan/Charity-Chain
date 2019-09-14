import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Heart, User } from 'react-feather';
import './Login.css';

export default class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  updateUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
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
              placeholder="Username"
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
            <div id="login-options">
              <span className="login-span">
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </span>
              <Button type="primary" className="login-form-button"
                      onClick={() => {this.props.logIn(this.state.username, this.props.isCharity);}}>
                Log in
              </Button>
              <span>
                Or <a href="">register now!</a>
              </span>
            </div>
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