import React from 'react';
import td_auth from './td_auth';
import { Checkbox, Table, Layout } from 'antd';
import './CharityView.css';
import axios from 'axios';

const { Header, Sider, Content } = Layout;  
const {apiKey, initialCustomerId} = td_auth;
const td_uri = 'https://api.td-davinci.com/api/';
const config = {
  headers: {'Authorization': `${apiKey}`}
};

/*
Sample Transaction Object:
-------------------
accountId: "fe7c6f24-4dbf-491d-bead-ac5c9a0e98d3"
categoryTags: ["Food and Dining"]
currencyAmount: 4.4
customerId: "f6c73e41-81ba-428b-96d5-fcdf2216d54c"
description: "MCDONALD'S #21038 QPS"
id: "f6c73e41-00b60dbc-1223-47ce-8c10-f55644799c28"
locationCity: "Toronto"
locationCountry: "CA"
locationLatitude: 43.6715428613
locationLongitude: -79.3779792403
locationPostalCode: "M4W 3J6"
locationRegion: "ON"
locationStreet: "345 Bloor St E"
merchantCategoryCode: "5814"
merchantId: "34e2b832-8060-4199-9080-2ba9ad623421"
merchantName: "McDonald's"
originationDateTime: "2019-05-02T10:03:00Z"
source: "POS"
type: "CreditCardTransaction"
*/

const columns = [
  {
    title: 'Date',
    dataIndex: 'originationDateTime',
    key: 'originationDateTime',
    render: text => text.split('T')[0]
  },
  {
    title: 'Amount',
    dataIndex: 'currencyAmount',
    key: 'currencyAmount',
    render: text =>`$${text}`,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
];

export default class CharityView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transactionData: [],
      selectedRowKeys: [],
    }
    axios.get(`${td_uri}customers/${initialCustomerId}/transactions`,
              config)
      .then((res) => {
        let tmpArray = [];
        res.data.result.forEach((elem, index) => {
          let tmpTransaction = elem;
          tmpTransaction.key = index;
          tmpTransaction.location = elem.locationCity ? `${elem.locationCity}, ${elem.locationCountry}` : "N/A";
          tmpArray.push(elem);
        });
        this.setState({transactionData: tmpArray}, () => {console.log(this.state.transactionData)})
      })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
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
              <Table rowSelection={rowSelection} dataSource={this.state.transactionData} columns={columns} />
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