import React from 'react';
import { Card, Modal, Button, Input } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { wallet, db } from '../configs';
    
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#f5222d'];

export default class Charity extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      isDonating: false,
      amount: '',
      isLoading: false,
    };

    // wallet.getAllDeposits().then(res => console.log(res))
  }

  showModal = () => { this.setState({ visible: true }) }

  closeModal = () => { this.setState({ visible: false }) }

  onClickDonate = async () => {
    if (this.state.isDonating) {
      let timestamp = new Date().getTime();
      await db.createTransaction(this.props.user.uid, this.state.amount, this.props.charity.address, timestamp);
      console.log('donate');
      console.log(this.state.amount);
      wallet.sendToCharity(this.state.amount * 100, this.props.user.address, this.props.charity.address, timestamp)
        .then(res => console.log(res));
      this.closeModal();
    } else {
      this.setState({ isDonating: true })
    }
  }

  onInputChange = (e) => {
    this.setState({ amount: e.target.value })
  }

  // onMouseOver= () => { this.setState({ isHovering: true }) }
  
  // onMouseOut= () => { this.setState({ isHovering: false }) }

  renderLabel = (entry) => `${entry.name}, ${entry.value}%`
  
  render() {
    const { charity } = this.props;
    const { aggregate_donations } = charity;
    const data = aggregate_donations ?
      Object.keys(aggregate_donations).map(key => ({ name: key, value: aggregate_donations[key] })) : [];
    // console.log(data)
    const footer = (
      <div>
        {this.state.isDonating &&
        <div className="donate-input">
          <div>Amount</div>
          <Input value={this.state.amount} placeholder="Enter an amount ($)" onChange={this.onInputChange} autoFocus />
        </div>}
        <Button key="back" onClick={this.closeModal}>
          Close
        </Button>
        <Button key="submit" type="primary" onClick={this.onClickDonate}>
          Donate
        </Button>
      </div>
    )
    
    return (
      <div>
        <Card
          className="charity-card"
          cover={
            // this.state.isHovering ?
            // <PieChart isAnimationActive width={400} height={300}>
            //   <Pie
            //     data={data}
            //     dataKey="value"
            //     nameKey="name"
            //     innerRadius={60}
            //     outerRadius={100}
            //     label={this.renderLabel}
            //     isAnimationActive
            //     animationBegin={100}
            //     animationDuration={1000}
            //   >
            //     {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            //   </Pie>
            // </PieChart> :
            <img src={charity.image} />
          }
          onClick={this.showModal}
          onMouseEnter={this.onMouseOver}
          onMouseLeave={this.onMouseOut}
        />
        <Modal
          className="charity-modal"
          title="charity name"
          visible={this.state.visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          footer={footer}
        >
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} label={this.renderLabel}>
                  {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Modal>
      </div>
    );
  }
}