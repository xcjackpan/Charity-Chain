import React from 'react';
import td_auth from './td_auth';
import { Button, Table, Layout, Modal, Spin } from 'antd';
import CharitySider from './CharitySider';
import './CharityView.css';
import axios from 'axios';
import { wallet, firebase, auth, db } from '../configs';
import { doCreateCharity, getRefOfCharities } from '../configs/db.js';
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

const { confirm } = Modal;

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

const base64 = "";

export default class CharityView extends React.Component {
  componentDidMount() {
    getRefOfCharities()
  }

  // wallet.get('/getBalanceOfWallet')
  // addCharity = () => doCreateCharity("id", 4242584820, "donate@wwf.com", "Animals", base64)

  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      loading: true,
      transactionData: [],
      selectedRowKeys: [],
    }
    axios.get(`${td_uri}customers/${initialCustomerId}/transactions`,
              config)
      .then((res) => {
        let tmpArray = [];
        res.data.result.forEach((elem, index) => {
          if (elem.currencyAmount > 0) {
            let tmpTransaction = elem;
            tmpTransaction.currencyAmount = this.precise(tmpTransaction.currencyAmount, true);
            tmpTransaction.key = index;
            tmpTransaction.location = elem.locationCity ? `${elem.locationCity}, ${elem.locationCountry}` : "N/A";
            tmpArray.push(elem);
          }
        });
        this.setState({transactionData: tmpArray, loading: false})
      })
  }

  precise = (num, returnAsString) => {
    let ret = parseFloat(Math.round(num * 100) / 100).toFixed(2);
    return returnAsString ? ret : parseFloat(ret);
  }

  onSelectChange = selectedRowKeys => {
    let amount = 0;
    selectedRowKeys.forEach((elem) => {
      amount += this.precise(this.state.transactionData[elem].currencyAmount, false);
    })
    this.setState({ selectedRowKeys, amount: amount });
  };

  resetCheckboxes = () => {
    this.setState({
      selectedRowKeys: [],
      amount: 0,
    })
  }

  confirmModal = (amount) => {
    confirm({
      title: 'Confirm reimbursement',
      content: `Are you sure you want to reimburse ${amount}? This can't be undone!`,
      okText: 'Yes',
      cancelText: 'Let me think about it',
      width: "30vw",
      maskClosable: true,
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: false, // Column configuration not to be checked
      }),
    };
    return (
      <div id="charity-view-container">
        <Layout>
          <Header className="header">
            <div className="top-bar">
              <span className="name">UNICEF</span>
              <span className="credits">300 credits</span>
              <Button className="logout" onClick={this.props.logOut}>Log out</Button>
            </div>
          </Header>
          <Layout>
            <Content className="content">
              {
                this.state.loading ?
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
                    <Spin />
                  </div> :
                <Table rowSelection={rowSelection} dataSource={this.state.transactionData} columns={columns} />
              }
              <button onClick={this.addCharity}>Add Charity</button>
            </Content>
            <Sider width={400} className="sider">
              <CharitySider amount={`$${this.precise(this.state.amount, true)}`}
                            reset={this.resetCheckboxes}
                            openModal={this.confirmModal}/>
            </Sider>
          </Layout>
        </Layout>
      </div>
    );
  }
}