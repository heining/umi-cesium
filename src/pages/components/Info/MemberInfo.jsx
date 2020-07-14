import React, { Component } from 'react';
import Zmage from 'react-zmage';

class MemberInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="infobox" style={{right: 20, top: 390, width: 462.88 }}>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
          onClick={this.props.handleHideMemberInfo}
        >
          X
        </div>
        <Zmage src={require('@/assets/gj.png')} style={{ width: '70%', height: '70%' }} />
      </div>
    );
  }
}

export default MemberInfo;
