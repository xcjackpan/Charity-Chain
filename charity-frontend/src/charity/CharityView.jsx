import React from 'react';
import td_auth from './td_auth';
import { Layout } from 'antd';
import './CharityView.css';

const { Header, Footer, Sider, Content } = Layout;  
const {apiKey, initialCustomerId} = td_auth;

export default class CharityView extends React.Component {

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