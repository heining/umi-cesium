import React, { Component } from 'react';
import { message, Radio } from 'antd';
import request from 'umi-request';
// import FileUpload from './FileUpload';
import Zmage from 'react-zmage';
import QRCode from 'qrcode.react';
import './index.css';

let url = '';
let arrAll = [];

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      glassID: 0,
      showDetail: true,
      showUpload: true,
      files: [],
      url: '',
      arrAll: [],
      currentlog: {},
    };
  }

  getPic = v => {
    let glassID = 0;
    let currentlogID = 0;
    const that = this;
    // 玻璃ID换取数据库glass的ID
    const formData1 = new FormData();
    formData1.append('raw_glass_id', v || this.props.id);
    request
      .post('/api/v1/get/glass', {
        data: formData1,
      })
      .then(function(response) {
        if (response.result != 'failed') {
          glassID = response.id;
          that.props.back(glassID);
          // 数据库glass的ID换取log(历史记录)的ID
          const formData2 = new FormData();
          formData2.append('glass_id', glassID);
          request
            .post('/api/v1/get/log', {
              data: formData2,
            })
            .then(function(response) {
              if (response.length > 0) {
                currentlogID = response[response.length - 1].id;
        
                that.setState({
                  currentlog: response[response.length - 1],
                });
                // 通过log(历史记录)的ID查询图片
                const formData3 = new FormData();
                formData3.append('log_id', currentlogID);
                request
                  .post('/api/v1/get/picture', {
                    data: formData3,
                  })
                  .then(function(response) {
                    if (response.result != 'failed') {
                  
                      url = response[0].my_file;
                      that.setState({
                        url,
                      });
                 
                    } else if (!response) {
                      that.setState({
                        url: '',
                      });
                    } else {
                      that.setState({
                        url: '',
                      });
                      message.info('该图片不存在，请重试！');
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          that.setState({
            glassID,
            url,
          });
        } else {
          message.info('该玻璃未录入数据库');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.state.arrAll = [];
    url = '';
    arrAll = [];
    this.getPic();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextState);
    if (nextProps.id == this.props.id) {
      // console.log('no-up');
      this.state.url = '';
      url = '';
      this.state.arrAll = [];
      this.state.currentlog = {};
      arrAll = [];
      return true;
    } else {
      // console.log('up');
      this.state.url = '';
      url = '';
      this.state.arrAll = [];
      this.state.currentlog = {};
      arrAll = [];
      this.getPic(nextProps.id);
      return true;
    }
  }

  // 面积
  areaRender = () => {
    const id = this.props.id;
    // console.log(id.split(')')[1].split('0')[0]);
    if (id.split(')')[1].split('0')[0] == 'WF') {
      if (id.split('(')[1].split(')')[0] == 'C01' && id.slice(1, 2) == 'L0') {
        return (
          <span>
            19 m<sup>2</sup>
          </span>
        );
      } else if (id.slice(1, 2) == 'L1') {
        if (id.split('(')[1].split(')')[0] == 'C03') {
          return (
            <span>
              0.25 m<sup>2</sup>
            </span>
          );
        } else {
          return (
            <span>
              0.75 m<sup>2</sup>
            </span>
          );
        }
      }
    } else if (id.split(')')[1].split('0')[0] == 'GF') {
      switch (id.split('(')[1].split(')')[0]) {
        case 'C01':
          return (
            <span>
              3.3 m<sup>2</sup>
            </span>
          );
          break;
        case 'C02':
          return (
            <span>
              1.65 m<sup>2</sup>
            </span>
          );
          break;
        case 'C03':
          return (
            <span>
              0.825 m<sup>2</sup>
            </span>
          );
          break;
        case 'C04':
          return (
            <span>
              6.97 m<sup>2</sup>
            </span>
          );
          break;
        case 'C05':
          return (
            <span>
              3.72 m<sup>2</sup>
            </span>
          );
          break;
        case 'C06':
          return (
            <span>
              1 m<sup>2</sup>
            </span>
          );
          break;
        default:
          break;
      }
    }
  };

  // 尺寸
  sizeRender = () => {
    const id = this.props.id;
    // console.log(id.split(')')[1].split('0')[0]);
    if (id.split(')')[1].split('0')[0] == 'WF') {
      if (id.split('(')[1].split(')')[0] == 'C01' && id.slice(1, 2) == 'L0') {
        return <span>4700 x 4100</span>;
      } else if (id.slice(1, 2) == 'L1') {
        if (id.split('(')[1].split(')')[0] == 'C03') {
          return <span>500 x 500</span>;
        } else {
          return <span>500 x 1500</span>;
        }
      }
    } else if (id.split(')')[1].split('0')[0] == 'GF') {
      switch (id.split('(')[1].split(')')[0]) {
        case 'C01':
          return <span>1100 x 3000</span>;
          break;
        case 'C02':
          return <span>1500 x 1100</span>;
          break;
        case 'C03':
          return <span>750 x 1100</span>;
          break;
        case 'C04':
          return <span>410 x 1700</span>;
          break;
        case 'C05':
          return <span>3100 x 1800</span>;
          break;
        case 'C06':
          return <span>1000 x 1000</span>;
          break;
        default:
          break;
      }
    }
  };

  // 玻璃状态
  statusRender = () => {
    const that = this;
    for (let i = 0; i < 7; i++) {
      // 请求问题玻璃的所有id
      const formData = new FormData();
      formData.append('state', Math.pow(2, i));
      request
        .post('api/v1/get/matter/glass', {
          data: formData,
        })
        .then(function(response) {
          if (response) {
            response.map((item, index) => {
              arrAll.push(item.raw_id);
            });
            that.state.arrAll = arrAll;
          } else {
            message.info('查询失败，请重试！');
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
    if (arrAll.includes(that.props.id)) {
      return '破损';
    } else {
      return '正常';
    }
  };

  // 单选按钮切换
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
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
        <div className="infoline" style={{ fontSize: 16, marginBottom: 15 }}>
          <span>编号：</span>
          <span>{this.props.id}</span>
        </div>
        <div className="infoline">
          <span>状态：</span>
          <span>{this.state.currentlog && this.state.currentlog.state ? '破损' : '正常'}</span>
        </div>
        <div className="infoline">
          <span>钢化：</span>
          <span>
            <Radio.Group
              onChange={this.onChange}
              value={this.state.value}
              style={{ color: 'white', marginTop: 10 }}
            >
              <Radio style={{ color: 'white' }} value={1}>
                是
              </Radio>
              <Radio style={{ color: 'white' }} value={2}>
                否
              </Radio>
            </Radio.Group>
          </span>
        </div>
        <div className="infoline">
          <span>配置：</span>
          <span>6mm-low-e+12A+6mm</span>
        </div>
        <div className="infoline">
          <span>尺寸：</span>
          <span>{this.sizeRender()}</span>
        </div>
        <div className="infoline">
          <span>面积：</span>
          <span>{this.areaRender()}</span>
        </div>
        <div className="infoline">
          <span>位置：</span>
          <span>
            {this.props.id.slice(15, 17)}楼{this.props.id.slice(3, 6)}号
          </span>
        </div>
        <div className="infoline">
          <span>当前图片：</span>
          {this.state.url ? (
            <Zmage
              src={'http://113.31.105.181:8180/media/' + this.state.url}
              style={{ width: '70%', height: '70%' }}
            />
          ) : (
            <Zmage src={require('@/assets/good.jpg')} style={{ width: '60%', height: '60%' }} />
          )}
        </div>
        <div className="infoline">
          <a onClick={this.props.showhistory}>历史图片</a>
        </div>
        {/* <div className="infoline">
          <FileUpload id={this.props.id} glassID={this.state.glassID} />
        </div> */}
        <div className="infoline">
          <span>详细信息：</span>
          <div style={{ display: 'flex', justifyContent: 'left', width: 180, margin: 10 }}>
            {/* 二维码 */}
            <QRCode
              value={`http://lesuidao.cn/smart_city_mobile/#/windowdetail?code=${this.props.id}&status=ok`} // 生成二维码的内容
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
