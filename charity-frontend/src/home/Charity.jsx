import React from 'react';
import { Card, Modal } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

    const data = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Charity extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      isHovering: false,
    };
  }

  showModal = () => { this.setState({ visible: true }) }

  closeModal = () => { this.setState({ visible: false }) }

  onMouseOver= () => { this.setState({ isHovering: true }) }
  
  onMouseOut= () => { this.setState({ isHovering: false }) }

  renderLabel = (entry) => `${entry.name}, ${entry.value}%`
  
  render() {
    const { charity } = this.props;
    
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
          okText="Donate"
          cancelText="Close"
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