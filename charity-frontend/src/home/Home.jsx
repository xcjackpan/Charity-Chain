import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Button, Select, Layout } from 'antd';
import { User, Link as Chain } from 'react-feather'
import CharityList from './CharityList';
import { getListOfUsers, getRefOfCharities } from '../configs/db.js';
import './Home.css';

const { Header } = Layout;

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      charities: [],
      sort: 'popular',
      identity: {},
    }
  }

  componentDidMount() {
  
    getListOfUsers().then(res => {
      const userArr = Object.values(res);
      userArr.forEach((elem) => {
        if (elem.username === this.props.match.params.id) {
          this.setState({identity: elem})
        }
      })
      return;
    })

    return getRefOfCharities()
      .then(res => {
        const charitiesArr = Object.values(res);
        const charities = _.groupBy(charitiesArr, 'category')
        this.setState({ charities }, () => this.processAndSortCharities());
      });
  }

  changeSort = (value) => {
    console.log(value)
    this.setState({ sort: value }, () => {
      this.processAndSortCharities();
    }) 
  }

  processAndSortCharities = () => {
    const charities = this.state.charities
      Object.keys(charities).forEach(category => {
        let charityList = charities[category];
        // console.log(charityList)
        charityList = charityList.map(charity => {
          const sum = charity.aggregate_donations ? _.sum(Object.values(charity.aggregate_donations)) : 0;
          // console.log(sum)
          if (sum) {
            Object.keys(charity.aggregate_donations)
              .forEach(key => {
                charity.aggregate_donations[key] = Math.round((charity.aggregate_donations[key] / sum) * 100);
              });
          }
          if (charity.aggregate_donations) {
            Object.keys(charity.aggregate_donations).forEach(key => { 
              if (charity.aggregate_donations[key] === 0) {
                console.log(key)
                delete charity.aggregate_donations[key];
              }
            })
          }
          return charity;
        })
        charities[category] = charityList;
        if (this.state.sort === 'popular') {
          charities[category] = _.reverse(_.sortBy(charities[category], ['donation_count']));
        } else {
          charities[category] = _.sortBy(charities[category], [`aggregate_donations.${this.state.sort}`])
        }
      })
      console.log(charities);
      this.setState({ charities });
  }

  render() {
    return (
      <div className="home">
        <Layout>
          <Header className="header">
            <div className="top-bar">
              <h1 style={{ display: "flex", alignItems: "center", marginRight: "4px" }}><Chain size={36} />CharityChain</h1>
              <span id="username"><User style={{ marginRight: "8px" }} />{this.props.match.params.id}</span>
              <Link style={{ marginRight: "2%" }} to={`/user/${this.props.match.params.id}/profile`}>
                <Button className="logout">My Profile</Button>
              </Link>
              <Link to={`/`}>
                <Button className="logout">Log out</Button>
              </Link>
            </div>
          </Header>
        </Layout>
        <div className="browse-container">
          <div className="sort-container">
            <span style={{ marginRight: "8px" }}>Sort By</span>
            <Select defaultValue="popular" onChange={this.changeSort} style={{ width: 150 }}>
              <Select.Option value="popular">Popular</Select.Option>
              <Select.OptGroup label="Spending Category">
                <Select.Option value="Auto and Transport">Auto and Transport</Select.Option>
                <Select.Option value="Bills and Utilities">Bills and Utilities</Select.Option>
                <Select.Option value="Food and Dining">Food and Dining</Select.Option>
                <Select.Option value="Home">Home</Select.Option>
              </Select.OptGroup>
            </Select>
          </div>
          {Object.keys(this.state.charities)
            .map(category => <CharityList key={category} category={category} charities={this.state.charities[category]} user={this.state.identity} />)}
        </div>
      </div>
    );
  }
}