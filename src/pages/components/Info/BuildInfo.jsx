import React, { Component } from 'react';

class BuildInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="infobox" style={{left: 550, width: 462.88 }}>
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
          <span>建筑总高度</span>
          <div>
            <span>主楼:约258米</span><br />
            <span>裙楼:约24米</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>建筑总层数</span>
          <div>
            <span>主楼:54层(实际层)</span><br />
            <span>裙楼:6层(实际层)</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>建筑概况，房屋用途</span>
          <div>
            <span>主楼1幢，用途：自用办公楼</span><br />
            <span>裙楼1幢，用途：自用办公楼</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>产权单位名称</span>
          <div>
            <span>交通银行交银金融大厦有限公司</span>
          </div>
        </div>
        <div className='buildinfo'>
          <span>物业管理单位</span>
          <div>
            <span>交银企业上海服务有限公司</span>
          </div>
        </div>
        {/* <a onClick={this.props.handleShowDetailInfo}>更多详细信息</a> */}
      </div>
    );
  }
}

export default BuildInfo;
