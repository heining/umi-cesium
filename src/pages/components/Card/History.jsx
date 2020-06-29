import React, { Component } from 'react';
import { Timeline } from 'antd';
import Zmage from 'react-zmage';
import './index.css';

const Item = Timeline.Item;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHistory: true
    }
  }

  closeHistory = () => {
    this.setState({
      showHistory: false
    })
  }

  render() {
    return (
      <div className="infobox" style={{ left: 10 }}>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer', zIndex: 10 }}
          onClick={this.closeHistory}
        >
          X
        </div>
        <Timeline>
          <Item>
            <span style={{ color: 'white' }}>一个月前</span>
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '80%', height: '80%' }} />
          </Item>
          <Item>
            <span style={{ color: 'white' }}>半个月前</span>
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '80%', height: '80%' }} />
          </Item>
          <Item>
            <span style={{ color: 'white' }}>一周前</span>
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '80%', height: '80%' }} />
          </Item>
          <Item>
            <span style={{ color: 'white' }}>三天前</span>
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '80%', height: '80%' }} />
          </Item>
        </Timeline>
      </div>
    );
  }
}

export default History;
