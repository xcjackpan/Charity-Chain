import React from 'react';
import _ from 'lodash';
import { Radio, Select } from 'antd';
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
        <Radio.Group onChange={this.changeSort} defaultValue="popular">
          <Radio.Button value="popular">Popular</Radio.Button>
          <Radio.Button value="spending">Spending</Radio.Button>
        </Radio.Group>
        {this.state.sort === 'spending' &&
        <Select defaultValue="food">
          <Select.Option value="food">Food</Select.Option>
          <Select.Option value="retail">Retail</Select.Option>
        </Select>}
        {Object.keys(this.state.charities)
          .map(category => <CharityList category={category} charities={this.state.charities[category]} sort={this.state.sort} />)}
      </div>
    );
  }
}