import React from 'react';
import { Link} from 'react-router-dom';
import td_auth from './td_auth';
import { Button, Table, Layout, Modal, Spin } from 'antd';
import CharitySider from './CharitySider';
import './CharityView.css';
import axios from 'axios';
import { wallet, firebase, auth, db } from '../configs';
import { getRefOfCharities, doAppendToAggregateDonations } from '../configs/db.js';
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

export default class CharityView extends React.Component {

  componentDidMount() {
    return getRefOfCharities().then(res => {
      const charitiesArr = Object.values(res);
      const keysArr = Object.keys(res);
      let len = charitiesArr.length;
      for (let i = 0; i < len; i++) {
        if (charitiesArr[i].account_number.toString() === this.props.match.params.id) {
          let identity = charitiesArr[i];
          identity.key = keysArr[i];
          this.setState({ identity: charitiesArr[i] }, () => {
            axios.get(`${td_uri}customers/${this.state.identity.td_id}/transactions`, config)
            .then((res) => {
              wallet.getAllReimbursements().then((reimbursements) => {
                let tmpArray = [];
                let i = 0;
                res.data.result.forEach((elem) => {
                  let flag = false;
                  
                  let len = reimbursements.data.length;
                  for (let i = 0; i < len; i++) {
                    if ((elem.id === reimbursements.data[i].tdTransactionRecord) &&
                        (reimbursements.data[i].reimburseTo === this.state.identity.address)) {
                      console.log(elem)
                      flag = true;
                      break;
                    }
                  }

                  if (!flag && elem.currencyAmount > 0) {
                    let tmpTransaction = elem;
                    tmpTransaction.currencyAmount = this.precise(tmpTransaction.currencyAmount, true);
                    tmpTransaction.key = i;
                    i += 1;
                    tmpTransaction.location = elem.locationCity ? `${elem.locationCity}, ${elem.locationCountry}` : "N/A";
                    tmpArray.push(elem);
                  }
                });
                this.setState({transactionData: tmpArray, loading: false})
              })
            })
            wallet.getBalance(this.state.identity.address).then((res) => {
              this.setState({balance: res.balance/100})
            })
          });
          break;
        }
      }
      return;
    })
  }

  // wallet.get('/getBalanceOfWallet')
  // addCharity = () => db.doCreateCharity("id", 1522322348, "charity@we.com", 'Humanitarian', 'WE Charity')

  constructor(props) {
    super(props);
    this.state = {
      identity: {},
      balance: 0,
      amount: 0,
      name: "",
      loading: true,
      transactionData: [],
      selectedRowKeys: [],
    }
  }

  precise = (num, returnAsString) => {
    let ret = parseFloat(Math.round(num * 100) / 100).toFixed(2);
    return returnAsString ? ret : parseFloat(ret);
  }

  onSelectChange = selectedRowKeys => {
    let amount = 0;
    selectedRowKeys.forEach((elem) => {
      amount += parseFloat(this.state.transactionData[elem].currencyAmount);
    })
    this.setState({ selectedRowKeys, amount: this.precise(amount, false) });
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
      onOk: () => {
        this.reimburse(amount);
      },
    });
  };

  convertCurrencyAmountToInt = (currencyAmount) => {
    return Math.floor(100 * parseFloat(currencyAmount));
  }

  reimburse = (amount) => {
    this.resetCheckboxes();
    amount = this.convertCurrencyAmountToInt(amount.substr(1));
    /*
    wallet.getBalance(this.state.identity.address).then((res) => {
      this.setState({balance: res.balance})
    })
    */
    console.log(this.state.transactionData);
    let selected_rows = this.state.selectedRowKeys.map(x => this.state.transactionData[x].id);
    let filtered_transaction_data = this.state.transactionData.filter(x => !selected_rows.includes(x.id));
    console.log(filtered_transaction_data);

    this.setState({balance: ((this.state.balance * 100) - amount)/100, transactionData: filtered_transaction_data})
    let aggregate_donations = {};
    this.state.selectedRowKeys.forEach((elem) => {
      let type = this.state.transactionData[elem].categoryTags[0];
      if (aggregate_donations[type]) {
        aggregate_donations[type] += this.convertCurrencyAmountToInt(this.state.transactionData[elem].currencyAmount);
      } else {
        aggregate_donations[type] = this.convertCurrencyAmountToInt(this.state.transactionData[elem].currencyAmount);
      }
    })
    this.state.selectedRowKeys.forEach((elem) => {
      console.log("amount: " + this.convertCurrencyAmountToInt(this.state.transactionData[elem].currencyAmount))
      console.log("address: " + this.state.identity.address)
      console.log("td_id: " + this.state.transactionData[elem].id)
      console.log("tag: " + this.state.transactionData[elem].categoryTags[0])
      wallet.reimburseTransaction(this.convertCurrencyAmountToInt(this.state.transactionData[elem].currencyAmount), 
                                  this.state.identity.address, 
                                  this.state.transactionData[elem].id,
                                  this.state.transactionData[elem].categoryTags[0]).then((res) => {
                                    console.log("Transaction result : ", res)
                                  })
    })
    doAppendToAggregateDonations(this.state.identity.key, aggregate_donations).then((res) => {
      // console.log(res);
    });
  }

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
              <span className="name">{this.state.identity.name}</span>
              <span className="credits">{`Current Balance: $${this.precise(this.state.balance, true)}`}</span>
              <Link style={{ marginLeft: "2%" }} to={`/`}>
                <Button className="logout">Log out</Button>
              </Link>
              {/* <button onClick={this.addCharity}>Add Charity</button> */}
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
            </Content>
            <Sider width={400} className="sider">
              <CharitySider amount={`$${this.precise(this.state.amount, true)}`}
                            balance={this.state.balance}
                            reset={this.resetCheckboxes}
                            openModal={this.confirmModal}/>
            </Sider>
          </Layout>
        </Layout>
      </div>
    );
  }
}
