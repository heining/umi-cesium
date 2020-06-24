import React, { Component } from 'react';
import request from 'umi-request';
import FileUpload from './FileUpload';
import History from './History';
import Zmage from 'react-zmage';
import QRCode from 'qrcode.react';
import './index.css';

// 刷新页面的随机取
const items = ['良好', '破损'];
const item = items[Math.floor(Math.random() * 2)];
const url = '';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: true,
      showImg: false,
      showUpload: true,
      showHistory: false,
      files: []
    };
  }

  handleHistory = () => {
    this.setState({
      showHistory: true
    })
  }

  closeHistory = () => {
    this.setState({
      showHistory: false
    })
  }

  componentDidMount() {
    // 每点击一块玻璃，进行一次请求
    const urlencoded = new URLSearchParams();
    urlencoded.append('pic_id', this.props.id);
    urlencoded.append('title', 'pictest');
    request
      .post('/api/v1/get/picture/url', {
        data: urlencoded,
      })
      .then(function(response) {
        console.log(response);
        if (response.result == 'success') {
          this.response.url = url;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="infobox" style={{ right: 20 }}>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
          onClick={this.props.closeInfo}
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
          <span>{this.props.id.substr(0, 1)}f前向左侧第3列</span>
        </div>
        <div className="infoline">
          <span>图片：</span>
          {this.state.showImg ? (
            <Zmage src={require(url)} style={{ width: '75%', height: '75%' }} />
          ) : (
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '75%', height: '75%' }} />
          )}
        </div>
        <div className="infoline">
          <a onClick={this.handleHistory}>历史图片</a>
          { this.state.showHistory ? <History closeHistory={this.closeHistory}/> : <div></div>}
        </div>
        <div className="infoline">
          <FileUpload id={this.props.id} />
        </div>
        <div className="infoline">
          <span>详细信息：</span>
          <div style={{ display: 'flex', justifyContent: 'center', width: 180, margin: 10 }}>
            {/* 二维码 */}
            <QRCode
              value="http://www.runoob.com" // 生成二维码的内容
              size={88} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
            />
          </div>
          <span style={{ textAlign: 'center', width: 200 }}>(手机扫码查看)</span>
        </div>
      </div>
    );
  }
}

export default Card;
