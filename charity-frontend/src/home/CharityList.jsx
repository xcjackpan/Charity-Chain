import React from 'react';
import Charity from './Charity';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default class CharityList extends React.Component {
  constructor(props) {
    super(props)
    this.listScroll = React.createRef();
    this.state = {
      left: false,
      right: true,
    }
  }

  onScrollList = () => {
    // console.log(this.listScroll.current);
    if (this.listScroll.current) {
      const current = this.listScroll.current;
      if (current.scrollLeft == 0 && this.state.left) this.setState({ left: false });
      if (current.scrollLeft != 0 && !this.state.left) this.setState({ left: true });
      if (current.scrollLeft == current.scrollWidth - current.offsetWidth && this.state.right) this.setState({ right: false });
      if (current.scrollLeft != current.scrollWidth - current.offsetWidth && !this.state.right) this.setState({ right: true });
    }
    // console.log(this.listScroll.current.scrollLeft + " " + this.listScroll.current.scrollWidth + " " + this.listScroll.current.offsetWidth);
  }

  render() {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    return (
      <div className="charity-list">
        <h2>Charity Category</h2>
        <div className="charity-list-scroll-container">
          {this.state.left && <div className="charity-list-scroll-left"><ChevronLeft /></div>}
          <div className="charity-list-scroll" ref={this.listScroll} onScroll={this.onScrollList}>
            {/* map charity to charity component, pass in data as props */}
            {arr.map(e => <Charity />)}
          </div>
          {this.state.right && <div className="charity-list-scroll-right"><ChevronRight /></div>}
        </div>
      </div>
    );
  }
}