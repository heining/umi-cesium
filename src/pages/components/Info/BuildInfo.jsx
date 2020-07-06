import React, { Component } from 'react';

class BuildInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="infobox" style={{top: 400}}>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
          onClick={this.props.handleHideBuildInfo}
        >
          X
        </div>
        <div className='buildinfo'>
          <span>建筑名称</span>
          <span>交银金融大厦-北楼</span>
        </div>
        <div className='buildinfo'>
          <span>建筑地址</span>
          <span>上海市浦东新区银城中路188号</span>
        </div>
        <div className='buildinfo'>
          <span>幕墙总面积</span>
          <span>
            约43658 m<sup>2</sup>
          </span>
        </div>
        <div className='buildinfo'>
          <span>幕墙使用高度</span>
          <div>
            <span>主楼:约258米</span><br />
            <span>裙楼:约24米</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>幕墙使用层数</span>
          <div>
            <span>主楼:54层(实际层)</span><br />
            <span>裙楼:6层(实际层)</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>幕墙类型</span>
          <div>
            <span>主楼:玻璃金属板组合型,玻璃石材组合型</span><br />
            <span>裙楼:玻璃石材组合型,玻璃面板型</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>玻璃类型</span>
          <div>
            <span>主楼:安全玻璃</span><br />
            <span>裙楼:安全玻璃</span>
          </div>
        </div>
        <a onClick={this.props.handleShowDetailInfo}>更多详细信息</a>
      </div>
    );
  }
}

export default BuildInfo;
