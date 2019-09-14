import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Select } from 'antd';
import { User} from 'react-feather'
import CharityList from './CharityList';
import { getRefOfCharities } from '../configs/db.js';
import './Home.css';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      charities: [],
      sort: 'popular',
    }
  }

  componentDidMount() {
    return getRefOfCharities()
      .then(res => {
        const charitiesArr = Object.values(res);
        const charities = _.groupBy(charitiesArr, 'category')
        this.setState({ charities });
      });
  }

  changeSort = (e) => {
    this.setState({ sort: e.target.value })
  }

  render() {
    return (
      <div className="home">
        <h1>CharityChain</h1>
        <Link to="/profile"><div><User /><span>User Profile</span></div></Link>
        <Select defaultValue="popular" onChange={this.changeSort} style={{ width: 150 }}>
          <Select.Option value="popular">Popular</Select.Option>
          <Select.OptGroup label="Spending Category">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="retail">Retail</Select.Option>
          </Select.OptGroup>
        </Select>
        {Object.keys(this.state.charities)
          .map(category => <CharityList category={category} charities={this.state.charities[category]} sort={this.state.sort} />)}
      </div>
    );
  }
}