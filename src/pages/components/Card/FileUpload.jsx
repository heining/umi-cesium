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
    this.state.files.push(file.fileList[0])
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
    const formData = new FormData();
    formData.append('pic_id', this.props.id[0]);
    // formData.append('pic_id', 2);
    formData.append('title', 'pictest');
    formData.append('my_file', this.state.files[0].name);
    request
      .post('/api/v1/upload/picture', {
        data: formData,
      })
      .then(function(response) {
        console.log(response);
        if (response.result == 'failed') {
          message.info('上传失败，请重试！');
        } else {
          // this.setState({
          //   files: [],
          // });
          message.info('上传成功！');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { previewVisible, previewImage } = this.state;

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = this.state.files.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
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
