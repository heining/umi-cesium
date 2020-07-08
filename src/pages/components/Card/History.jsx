import React, { Component } from 'react';
import request from 'umi-request';
import { Timeline, message } from 'antd';
// import Scrollbar from './Scrollbar';
import Zmage from 'react-zmage';
import './index.css';

const Item = Timeline.Item;
let urls = [];
let time = '';
let logID = [];
let times = [];

class History extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      showHistory: true,
      urls: [],
      times: '',
    };
  }

  componentDidMount() {
    const that = this;
    // 数据库glass的ID换取log(历史记录)的ID
    const formData2 = new FormData();
    formData2.append('glass_id', that.props.glassID);
    request
      .post('/api/v1/get/log', {
        data: formData2,
      })
      .then(function(response) {
        if (response.length > 0) {
          response.map((item, index) => {
            logID.push(item.id);
            times.push(item.update_time);
            that.setState({ times });
          });
        }
        logID.map((item, index) => {
          // 通过log(历史记录)的ID查询图片
          const formData3 = new FormData();
          formData3.append('log_id', item);
          request
            .post('/api/v1/get/picture', {
              data: formData3,
            })
            .then(function(response) {
              if (response.result != 'failed') {
                let url = response[0].my_file;
                urls.push(url);
                that.setState({
                  urls,
                });
              } else {
                message.info('该图片不存在，请重试！');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  imgRender = () => {
    return (
      // <Scrollbar>
        <Timeline>
          {this.state.urls.map((item, index) => (
            <Item key={index}>
              <span style={{ color: 'white' }}>{this.state.times[index]}</span>
              {urls ? (
                <Zmage
                  src={'http://113.31.105.181:8180/media/' + item}
                  style={{ width: '30%', height: '30%' }}
                />
              ) : (
                <div></div>
              )}
            </Item>
          ))}
        </Timeline>
      // </Scrollbar>
    );
  };

  render() {
    return (
      <div className="infobox" style={{ width: 300, right: 380 }}>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer', zIndex: 10 }}
          onClick={this.props.closehistory}
        >
          X
        </div>
        {this.imgRender()}
      </div>
    );
  }
}

export default History;
