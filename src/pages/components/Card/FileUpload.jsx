/**
 * @ Upload手动上传
 * date: 2020-06-18
 */

import React, { Component } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import request from 'umi-request';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      previewVisible: false,
      previewImage: '',
    };
  }

  handleChange = file => {
    this.state.files.push(file.fileList[0]);
    this.setState({ files: this.state.files });
  };

  // 图片预览
  handlePreview = async file => {
    this.setState({
      previewVisible: true,
      previewImage: file.url || file.thumbUrl,
    });
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };

  // 文件提交
  handleSubmit = e => {
    console.log(this.state.files[0].name);
    console.log(this.props.glassID);
    const formData1 = new FormData();
    formData1.append('glass_id', this.props.glassID);
    formData1.append('state', 0);
    request('/api/v1/add/picture', {
      method: 'post',
      data: formData1,
    })
      .then(function(response) {
        console.log(response);
        if (response.result == 'failed') {
          message.info('上传失败！');
        } else {
          message.info('上传成功！');
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    const formData2 = new FormData();
    formData2.append('log_id', this.props.logID);
    formData2.append('title', 'pictest');
    formData2.append('my_file', this.state.files[0].name);
    if (this.props.logID) {
      request('/api/v1/add/picture', {
        method: 'post',
        data: formData2,
      })
        .then(function(response) {
          console.log(response);
          if (response.result == 'failed') {
            message.info('上传失败！');
          } else {
            message.info('上传成功！');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      message.info('该玻璃未录入数据库！请重试！');
    }
  };

  render() {
    const { previewVisible, previewImage } = this.state;

    const props = {
      beforeUpload: file => {
        return false;
      },
    };

    return (
      <div style={{ marginLeft: 50 }}>
        <Upload
          {...props}
          listType="picture-card"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <a onClick={this.handleSubmit}>上传此次照片</a>
      </div>
    );
  }
}

export default FileUpload;
