import React, { Component } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import './index.css';

// 刷新页面的随机取
const items = ['良好', '破损'];
const item = items[Math.floor(Math.random() * 2)];

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: this.props.showDetail
    };
  }

  componentDidMount() {
    // fetch('http://113.31.105.181:8180/api/v1/get/picture/url', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		pic_id: this.props.id
		// 	})
		// })
    //   .then(function(response) {
		// 		console.log(response)
    //     return response;
		//   })
		const { data, error, loading } = useRequest((services) => {
			return services.getUserList('/api/v1/get/picture/url');
		});
  }

  closeInfo = () => {
    this.setState({
      showDetail: false,
    });
  };

  render() {
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
          <img src={require('')}/>
        </div>
        <div className="infoline">
          <span>上传此次照片：</span>
          <Upload
            listType="picture-card"
            // onPreview={this.handlePreview}
            // onChange={this.handleChange}
          >
            上传图片
          </Upload>
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
