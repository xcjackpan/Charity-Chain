import React from 'react';
import td_auth from './td_auth';
import { Layout } from 'antd';
import './CharityView.css';

import { doCreateCharity,getRefOfCharities } from '../configs/db.js';

const { Header, Footer, Sider, Content } = Layout;  
const {apiKey, initialCustomerId} = td_auth;

const base64 = "";

export default class CharityView extends React.Component {
  componentDidMount() {
    getRefOfCharities()
  }

  // addCharity = () => doCreateCharity("id", 4242584820, "donate@wwf.com", "Animals", base64)

  render() {
    return (
      <div id="charity-view-container">
        <Layout>
          <Header className="header">
            <div className="top-bar">
              <span className="name">UNICEF</span>
              <span className="credits">300 credits</span>
            </div>
          </Header>
          <Layout>
            <Content className="content">
              TRANSACTION HISTORY
              <button onClick={this.addCharity}>Add Charity</button>
            </Content>
            <Sider width={400} className="sider">
              SIDER INFO BAR
            </Sider>
          </Layout>
        </Layout>
      </div>
    );
  }
}