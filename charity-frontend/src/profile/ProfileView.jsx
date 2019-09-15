import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-feather'
import { PageHeader, Layout, Button } from 'antd';
import CharityBox from './CharityBox';
import './ProfileView.css';

const { Header } = Layout;

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactions, consumedTransactions, match } = this.props;
    return (
      <div className='profile-container'>
        <Header className="header">
          <div className="top-bar">
            <h1>CharityChain</h1>
            <span id="username">{this.props.match.params.id}</span>
            <Link style={{ marginRight: "2%" }} to={`/user/${match.params.id}/browse`}>
              <Button className="logout">Browse Charities</Button>
            </Link>
            <Link to={`/`}>
              <Button className="logout">Log out</Button>
            </Link>
          </div>
        </Header>
        {consumedTransactions && consumedTransactions.length > 0 ?
        <div>
          <PageHeader title="Used Donations" subTitle="Donations that have been spent by the charity" />
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
        <PageHeader title="Unused Donations" subTitle="Donations that have been not spent by the charity" />
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
