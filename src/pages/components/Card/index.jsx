import React, { Component } from 'react';
import request from 'umi-request';
import FileUpload from './FileUpload';
import Zmage from 'react-zmage';
import QRCode from 'qrcode.react';
import './index.css';

// 刷新页面的随机取
const items = ['良好', '破损'];
const item = items[Math.floor(Math.random() * 2)];
let url = '';

class Card extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      ...props,
      showDetail: true,
      showImg: false,
      showUpload: true,
      files: [],
    };
  }

  componentDidMount() {
    const that = this;
    // 每点击一块玻璃，进行一次请求(render)
    const urlencoded = new URLSearchParams();
    urlencoded.append('pic_id', this.props.id);
    urlencoded.append('title', 'pictest');
    request
      .post('/api/v1/get/picture/url', {
        data: urlencoded,
      })
      .then(function(response) {
        if (response.result == 'success') {
          that.setState({
            showImg: true,
          });
          url = response.url;
          console.log(url);
        } else {
          that.setState({
            showImg: false,
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  sizeRender = () => {
    const id = this.props.id;
    console.log(id)
    if (id.split('(')[1].split(')')[0] == 'C01') {
      return (
        <span>
          3.322 m<sup>2</sup>
        </span>
      );
    } else {
      if (id.slice(1, 2) == 'L2') {
        return (
          <span>
            1.595 m<sup>2</sup>
          </span>
        );
      } else {
        return (
          <span>
            0.715 m<sup>2</sup>
          </span>
        );
      }
    }
  };

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
          style={{fontSize: 16, marginBottom: 15 }}
        >
          <span >编号：</span>  
          <span>{this.props.id}</span>
        </div>
        <div className="infoline">
          <span>状态：</span>
          <span>{item}</span>
        </div>
        <div className="infoline">
          <span>尺寸：</span>
          {this.sizeRender()}
        </div>
        <div className="infoline">
          <span>材质：</span>
          <span>钢化玻璃</span>
        </div>
        <div className="infoline">
          <span>位置：</span>
          <span>
            {this.props.id.slice(15, 17)}楼{this.props.id.slice(3, 6)}号
          </span>
        </div>
        <div className="infoline">
          <span>当前图片：</span>
          {this.state.showImg ? (
            <Zmage src={require(url)} style={{ width: '70%', height: '70%' }} />
          ) : (
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '70%', height: '70%' }} />
          )}
        </div>
        <div className="infoline">
          <a onClick={this.props.showhistory}>历史图片</a>
        </div>
        <div className="infoline">
          <FileUpload id={this.props.id} />
        </div>
        <div className="infoline">
          <span>详细信息：</span>
          <div style={{ display: 'flex', justifyContent: 'center', width: 180, margin: 10 }}>
            {/* 二维码 */}
            <QRCode
              value={`http://lesuidao.cn/smart_city_mobile/#/windowdetail?code=${this.props.id}&status=ok`}// 生成二维码的内容
              size={88} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
            />
          </div>
        </div>
        <span style={{ width: 200, textAlign: 'center' }}>(手机扫码查看)</span>
      </div>
    );
  }
}

export default Card;
