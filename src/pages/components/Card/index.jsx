import React, { Component } from 'react';
import request from 'umi-request';
import FileUpload from './FileUpload';
import './index.css';

// 刷新页面的随机取
const items = ['良好', '破损'];
const item = items[Math.floor(Math.random() * 2)];
const url = '';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: this.props.showDetail,
      result: false,
      showUpload: true,
    };
  }

  componentDidMount() {
    // 每点击一块玻璃，进行一次请求
    const urlencoded = new URLSearchParams();
    urlencoded.append('pic_id', this.props.id[0]);
    request
      .post('/api/v1/get/picture/url', {
        data: urlencoded,
      })
      .then(function(response) {
        console.log(response);
        if (response.result == 'success') {
          this.setState({
            result: true,
          });
          this.response.url = url;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  closeInfo = () => {
    this.setState({
      showDetail: false,
    });
  };

  render() {
    // const { previewVisible, previewImage } = this.state;

    return (
      <div className="infobox" style={{ right: 20 }}>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
          onClick={this.closeInfo}
        >
          X
        </div>
        <div
          className="infoline"
          style={{ justifyContent: 'flex-start', fontSize: 16, marginBottom: 15 }}
        >
          <span>编号：</span>
          <span>{this.props.id}</span>
        </div>
        <div className="infoline">
          <span>状态：</span>
          <span>{item}</span>
        </div>
        <div className="infoline">
          <span>尺寸：</span>
          <span>
            1.36 m<sup>2</sup>
          </span>
        </div>
        <div className="infoline">
          <span>材质：</span>
          <span>钢化玻璃</span>
        </div>
        <div className="infoline">
          <span>位置：</span>
          <span>{this.props.id[0]}f前向左侧第3列</span>
        </div>
        <div className="infoline">
          <span>图片：</span>
          {this.result ? <img src={require(url)} style={{width: '75%', height: '75%'}} /> : <img src={require('@/assets/good.jpg')} style={{width: '75%', height: '75%'}} />}
        </div>
        <div className="infoline">
          <FileUpload id={this.props.id} />
        </div>
        <div className="infoline">
          <span>详细信息：</span>
          <span>手机扫码查看</span>
        </div>
      </div>
    );
  }
}

export default Card;
