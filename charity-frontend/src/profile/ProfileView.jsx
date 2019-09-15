import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User, Link as Chain } from 'react-feather'
import { PageHeader, Layout, Button } from 'antd';
import CharityBox from './CharityBox';
import './ProfileView.css';

const { Header } = Layout;

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { consumedTransactions, unconsumedTransactions, match } = this.props;
    console.log(unconsumedTransactions);
    return (
      <div className='profile-container'>
        <Header className="header">
          <div className="top-bar">
            <h1 style={{ display: "flex", alignItems: "center", marginRight: "4px" }}><Chain size={36} />CharityChain</h1>
            <span id="username"><User style={{ marginRight: "8px" }} />{match.params.id}</span>
            <Link style={{ marginRight: "2%" }} to={`/user/${match.params.id}/browse`}>
              <Button className="logout">Browse Charities</Button>
            </Link>
            <Link to={`/`}>
              <Button className="logout">Log out</Button>
            </Link>
          </div>
        </Header>
        <div className="profile-view-body">
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
                    spending={transaction.reimbursements
                    .map(elem => elem.category)
                    .filter(onlyUnique)
                    }
                />
                )}
            </div>
            </div> : null}
            {unconsumedTransactions && unconsumedTransactions.length > 0 ?
            <div>
            <PageHeader title="Unused Donations" subTitle="Donations that have been not spent by the charity" />
            <div className='profile-charities-container'>
            {unconsumedTransactions.map(transaction => 
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
      </div>
    );
  }
}
