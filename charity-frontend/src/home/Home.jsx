import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Button, Select, Layout } from 'antd';
import { User} from 'react-feather'
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
    /*
    getListOfUsers().then(res => {
      const userArr = Object.values(res);
      userArr.forEach((elem) => {
        if (elem.username === this.props.match.params.id) {
          this.setState({identity: elem})
        }
      })
      return;
    })
    */
    return getRefOfCharities()
      .then(res => {
        const charitiesArr = Object.values(res);
        const charities = _.groupBy(charitiesArr, 'category')
        Object.keys(charities).forEach(category => {
          if (this.state.sort === 'popular') {
            charities[category] = _.reverse(_.sortBy(charities[category], ['donation_count']));
          }
        })
        this.setState({ charities });
      });
  }

  changeSort = (e) => {
    this.setState({ sort: e.target.value })
  }

  render() {
    return (
      <div className="home">
        <Layout>
          <Header className="header">
            <div className="top-bar">
              <h1>CharityChain</h1>
              <span id="username">{this.props.match.params.id}</span>
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
          <Select defaultValue="popular" onChange={this.changeSort} style={{ width: 150 }}>
            <Select.Option value="popular">Popular</Select.Option>
            <Select.OptGroup label="Spending Category">
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="retail">Retail</Select.Option>
            </Select.OptGroup>
          </Select>
          {Object.keys(this.state.charities)
            .map(category => <CharityList key={category} category={category} charities={this.state.charities[category]} sort={this.state.sort} />)}
        </div>
      </div>
    );
  }
}