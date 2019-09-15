import React, { Component } from 'react';
import ProfileView from './ProfileView';
import _ from 'lodash';
import { db } from '../configs/index';
import { getListOfUsers, getRefOfCharities } from '../configs/db';
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
    let uid, charityList;
    getRefOfCharities()
      .then(res => {
        charityList = Object.keys(res).map(charity => res[charity]);
      })
      .then(() => {
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
                let userTransactions = Object.keys(res).map(key => {
                  const { charityAddress } = Object.keys(res).map(key => res[key])[0];
                  const charity = charityList.filter(charity => charity.address === charityAddress)[0] || null;
                  return {
                    ...res[key],
                    charityName: charity.name,
                    charityLogo: charity.image
                  }
                });
                wallet.getAllReimbursements().then(res => {
                  let userReimbursements = res.data.filter((e) => uid !== e.reimburseFrom.split("@")[0]);
                  for(let i = 0; i < userTransactions.length; i++) {
                    userTransactions[i].reimbursements = userReimbursements
                      .filter(e => e.reimburseFrom.split('@')[1] == userTransactions[i].timestamp);
                  }
                  this.setState({ transactions: userTransactions });
                });
              })
            });
          });
  }

  render() {
    const { transactions } = this.state;
    const consumedTransactions = transactions.filter(transaction => transaction.reimbursements.length > 0);
    const unconsumedTransactions = transactions.filter(transaction => transaction.reimbursements.length === 0);
    wallet.getBalance("0x78b9b2b62571760a013053bd27b4c805fad7715c").then(res => console.log(res));
    return (
      <ProfileView { ...this.props } consumedTransactions={consumedTransactions} unconsumedTransactions={unconsumedTransactions} />
    );
  }
}
