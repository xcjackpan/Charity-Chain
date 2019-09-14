import React from 'react';
import Charity from './Charity';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default class CharityList extends React.Component {
  constructor(props) {
    super(props)
    this.listScroll = React.createRef();
    this.state = {
      left: false,
      right: false,
    }
  }

  componentDidMount() {
    this.updateArrows();
  }

  onScrollList = () => this.updateArrows();

  updateArrows = () => {
    if (this.listScroll.current) {
      const current = this.listScroll.current;
      if (current.scrollLeft === 0 && this.state.left) this.setState({ left: false });
      if (current.scrollLeft !== 0 && !this.state.left) this.setState({ left: true });
      if (current.scrollLeft === current.scrollWidth - current.offsetWidth && this.state.right) this.setState({ right: false });
      if (current.scrollLeft < current.scrollWidth - current.offsetWidth && !this.state.right) this.setState({ right: true });
    }
  }

  render() {
    const { category, charities } = this.props;
    return (
      <div className="charity-list">
        <h2>{category}</h2>
        <div className="charity-list-scroll-container">
          {this.state.left && <div className="charity-list-scroll-left"><ChevronLeft /></div>}
          <div className="charity-list-scroll" ref={this.listScroll} onScroll={this.onScrollList}>
            {charities.map(charity => <Charity charity={charity} key={charity.td_id}/>)}
          </div>
          {this.state.right && <div className="charity-list-scroll-right"><ChevronRight /></div>}
        </div>
      </div>
    );
  }
}