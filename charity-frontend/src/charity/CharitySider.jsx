import React from 'react';
import { Button } from 'antd';

export default class CharitySider extends React.Component {

  convertCurrencyAmountToInt = (currencyAmount) => {
    return Math.floor(100 * parseFloat(currencyAmount));
  }

  render() {
    const disableButtons = this.props.amount === "$0.00";
    const canReimburse = this.convertCurrencyAmountToInt(this.props.amount.substr(1)) < (this.props.balance * 100);
    return (
      <div id="charity-sider">
        <span className="current-amount">{this.props.amount}</span>
        <div style={{width: "80%"}}>
          <Button block type="primary" size="large" className="button" disabled={disableButtons} 
                  onClick={this.props.reset}>Reset</Button>
          <Button block type="primary" size="large" className="button" disabled={!canReimburse || disableButtons} 
                  onClick={() => {this.props.openModal(this.props.amount)}}>Reimburse</Button>
        </div>
      </div>
    );
  }
}