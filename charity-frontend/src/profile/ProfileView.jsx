import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-feather'
import { PageHeader } from 'antd';
import CharityBox from './CharityBox';
import './ProfileView.css';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactions, consumedTransactions, match } = this.props;
    return (
      <div className='profile-container'>
        <Link to={`/user/${match.params.id}/browse`}><div><Grid /><span>Browse Charities</span></div></Link>
        {consumedTransactions && consumedTransactions.length > 0 ?
        <div>
          <PageHeader title="Consumed Transactions" subTitle="Donations that have been used" />
          <div className='profile-charities-container'>
            {consumedTransactions.map(transaction => 
              <CharityBox
                name={transaction.charityName}
                logo={transaction.charityLogo}
                transactionId={transaction.transactionId}
                amount={transaction.amount}
                timestamp={transaction.timestamp}
                spending={transaction.spending}
              />
            )}
          </div>
        </div> : null}
        {transactions && transactions.length > 0 ?
        <div>
        <PageHeader title="Unconsumed Transactions" subTitle="Donations that have been not used" />
        <div className='profile-charities-container'>
          {transactions.map(transaction => 
            <CharityBox
              name={transaction.charityName}
              logo={transaction.charityLogo}
              transactionId={transaction.transactionId}
              amount={transaction.amount}
              timestamp={transaction.timestamp}
            />)}
          </div>
        </div> : null}
      </div>
    );
  }
}
