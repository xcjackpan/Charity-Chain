import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-feather'
import CharityBox from './CharityBox';
import './ProfileView.css';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactions, match } = this.props;
    console.log(transactions);
    return (
      <div className='profile-container'>
        <Link to={`/user/${match.params.id}/browse`}><div><Grid /><span>Browse Charities</span></div></Link>
        <div className='profile-charities-container'>
          {transactions ?
            transactions.map(transaction => 
              <CharityBox
                name={'1'}
                transactionId={transaction.transactionId}
                amount={transaction.amount}
                timestamp={transaction.timestamp}
              />) : null}
        </div>
      </div>
    );
  }
}

const transaction = {
  amount: 0,
  sentTo: '',
  timestamp: new Date()
}
