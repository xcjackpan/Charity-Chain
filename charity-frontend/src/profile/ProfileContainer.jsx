import React, { Component } from 'react';
import ProfileView from './ProfileView';
import _ from 'lodash';
import { db } from '../configs/index';
import { getListOfUsers } from '../configs/db';
import { wallet } from '../configs';

export default class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        transactions: [],
        identity: {}
    }
  }

  componentDidMount() {
    let uid;
    getListOfUsers()
      .then(res => {
        const userArr = Object.values(res);
        userArr.forEach((elem) => {
          if (elem.username === this.props.match.params.id) {
            uid = elem.uid;
          }
        });
        return uid;
      })
      .then(uid => {
        db.getRefOfTransactions(uid)
          .then(res => {
            
            let transactions_of_user =  Object.keys(res).map(key => res[key])
            wallet.getAllReimbursements().then(res => {
              let user_reimbursements = res.data.filter((e) => uid !== e.reimburseFrom.split("@")[0]);
              for(let i = 0; i < transactions_of_user.length; i++) {
                console.log(user_reimbursements.filter(e => e.reimburseFrom.split('@')[1] === transactions_of_user[i].timestamp));
              }
              console.log(user_reimbursements);
            });
          })
            // .sort((a, b) => b.timestamp - a.timestamp))
          // .then(res => this.setState({ transactions: res }));
        })
  }

  render() {
    // wallet.reimburseTransaction(10, '0x78b9b2b62571760a013053bd27b4c805fad7715c', '123', 'SHOPPING').then(res => console.log(res));
    wallet.getBalance("0x78b9b2b62571760a013053bd27b4c805fad7715c").then(res => console.log(res));
    return (
        <ProfileView { ...this.props } transactions={this.state.transactions} />
    );
  }
}
