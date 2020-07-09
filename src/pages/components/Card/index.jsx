import React, { Component } from 'react';
import { message } from 'antd';
import request from 'umi-request';
// import FileUpload from './FileUpload';
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
      glassID: 0,
      showDetail: true,
      showUpload: true,
      files: [],
      url: '',
    };
    console.log(this.props.id);
  }

  getPic = v => {
    url = [];
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
                console.log(response.length);
                currentlogID = response[response.length - 1].id;
                console.log(currentlogID);
                // 通过log(历史记录)的ID查询图片
                const formData3 = new FormData();
                formData3.append('log_id', currentlogID);
                request
                  .post('/api/v1/get/picture', {
                    data: formData3,
                  })
                  .then(function(response) {
                    if (response.result != 'failed') {
                      console.log(response[0]);
                      url = response[0].my_file;
                      that.setState({
                        url,
                      });
                      console.log(url);
                    } else {
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
    console.log('step');
    this.getPic();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, this.props.id);
    if (nextProps.id == this.props.id) {
      console.log('no-up');
      return true;
    } else {
      console.log('up');
      this.getPic(nextProps.id);
      return true;
    }
  }

  sizeRender = () => {
    const id = this.props.id;
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
    // if(id.slice(1, 2) == 'L1') {
    //   if(id.split('(')[1].split(')')[0] == 'C001') {
    //     return (
    //           <span>
    //             3.5 m<sup>2</sup>
    //           </span>
    //         );
    //   }else if(id.split('(')[1].split(')')[0] >= 'C002' && id.split('(')[1].split(')')[0] <= 'C034') {
    //     return (
    //       <span>
    //         0.75 m<sup>2</sup>
    //       </span>
    //     );
    //   }else if(id.split('(')[1].split(')')[0] >= 'C035' && id.split('(')[1].split(')')[0] <= 'C039') {
    //     return (
    //       <span>
    //         7 m<sup>2</sup>
    //       </span>
    //     );
    //   }else if(id.split('(')[1].split(')')[0] >= 'C040' && id.split('(')[1].split(')')[0] <= 'C051') {
    //     return (
    //       <span>
    //         6.15 m<sup>2</sup>
    //       </span>
    //     );
    //   }else if(id.split('(')[1].split(')')[0] >= 'C052' && id.split('(')[1].split(')')[0] <= 'C055') {
    //     return (
    //       <span>
    //         5.3 m<sup>2</sup>
    //       </span>
    //     );
    //   }else if(id.split('(')[1].split(')')[0] == 'C056') {
    //     return (
    //       <span>
    //         3.5 m<sup>2</sup>
    //       </span>
    //     );
    //   }else if(id.split('(')[1].split(')')[0] >= 'C057' && id.split('(')[1].split(')')[0] <= 'C088') {
    //     return (
    //       <span>
    //         0.75 m<sup>2</sup>
    //       </span>
    //     );
    //   }else if(id.split('(')[1].split(')')[0] >= 'C089' && id.split('(')[1].split(')')[0] <= 'C094') {
    //     return (
    //       <span>
    //         7 m<sup>2</sup>
    //       </span>
    //     );
    //   }
    // }
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
          {this.state.url ? (
            <Zmage
              src={'http://113.31.105.181:8180/media/' + this.state.url}
              style={{ width: '70%', height: '70%' }}
            />
          ) : (
            <div></div>
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
