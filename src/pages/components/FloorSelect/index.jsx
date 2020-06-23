/**
 * @ Select选择框联动
 * date: 2020-06-18
 */

import React, { Component } from 'react';
import * as Cesium from 'cesium';
import { Select, Input } from 'antd';
import '../Card/index.css';

const { Option } = Select;

class FloorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      floor: 0
    };
    console.log(this.state.id);
  }

  handleFloorChange = e => {
    console.log(e);
    // 跳转
    this.props.viewer.flyTo(this.props.prds);
    this.selectFloorColor(this.props.prds, e);
    this.setState({
      floor: e,
    });
  };

  // 设置选中楼层的颜色
  selectFloorColor = (target, level) => {
    const v = level + 'f';
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (featureId.includes(v)) {
            return Cesium.Color.clone(Cesium.Color.GREEN, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  // 玻璃改变
  handleGlassChange = e => {
    console.log(e)
    // 选中效果
    this.props.prds.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      // feature: 切片
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          // 循环遍历的id值要等于输入的id
          if (featureId == e) {
            
            return Cesium.Color.clone(Cesium.Color.RED, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  // 获取input中输入的值
  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      id: e.target.value,
    });
  };

  // 按下回车
  handleEnter = () => {
    const { id } = this.state;
    // 跳转
    this.props.viewer.flyTo(this.props.prds);
    // 选中效果
    this.props.prds.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      // feature: 切片
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          // 循环遍历的id值要等于输入的id
          if (featureId == id) {
            return Cesium.Color.clone(Cesium.Color.RED, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    })
  };

  render() {
    return (
      <div className="infobox">
        <div className="infoline" style={{ marginBottom: 10 }}>
          交银大厦
        </div>
        <Select
          placeholder={'请选择楼层'}
          style={{ width: 100, marginRight: 20, float: 'left' }}
          onChange={this.handleFloorChange}
        >
          <Option value="1">1F</Option>
          <Option value="2">2F</Option>
          <Option value="3">3F</Option>
          <Option value="4">4F</Option> 
          <Option value="5">5F</Option>
          <Option value="6">6F</Option>
          <Option value="7">7F</Option>
          <Option value="8">8F</Option>
          <Option value="9">9F</Option>
        </Select>
        <div style={{float: 'left'}}>-</div>
       { (this.state.floor == 1 ) ? (
        <Select placeholder={'请选择玻璃'} style={{ width: 100 }} onSelect={this.handleGlassChange}>
          <Option value='1f-010'>010</Option>
          <Option value='1f-015'>015</Option>
          <Option value='1f-011'>011</Option>
          <Option value='1f-016'>016</Option>
          <Option value='1f-017'>017</Option>
          <Option value='1f-023'>023</Option>
          <Option value='1f-001'>001</Option>
          <Option value='1f-021'>021</Option>
          <Option value='1f-003'>003</Option>
          <Option value='1f-018'>018</Option>
        </Select>
       ) : <div></div>}
        { (this.state.floor == 2 ) ? (
          <Select placeholder={'请选择玻璃'} style={{ width: 100 }} onSelect={this.handleGlassChange}>
          <Option value='2f-0178'>0178</Option>
          <Option value='2f-060'>060</Option>
          <Option value='2f-0185'>0185</Option>
          <Option value='2f-063'>063</Option>
          <Option value='2f-0169'>0169</Option>
          <Option value='2f-0205'>0205</Option>
          <Option value='2f-056'>056</Option>
          <Option value='2f-0166'>0166</Option>
          <Option value='2f-0191'>0191</Option>
          <Option value='2f-057'>057</Option>
          <Option value='2f-0174'>0174</Option>
          <Option value='2f-0188'>0188</Option>
          <Option value='2f-058'>058</Option>
          <Option value='2f-0179'>0179</Option>
          <Option value='2f-0204'>0204</Option>
          <Option value='2f-053'>053</Option>
          <Option value='2f-0173'>0173</Option>
          <Option value='2f-0200'>0200</Option>
          <Option value='2f-064'>064</Option>
          <Option value='2f-0183'>0183</Option>
          <Option value='2f-0190'>0190</Option>
          <Option value='2f-051'>051</Option>
          <Option value='2f-0184'>0184</Option>
          <Option value='2f-0194'>0194</Option>
        </Select>
        ) : <div></div>}
        <Input
          style={{ width: 240, marginTop: 20 }}
          placeholder="请输入玻璃编号"
          allowClear
          onChange={this.handleChange}
          onPressEnter={this.handleEnter}
        />
        <div style={{ color: 'red', fontSize: 12 }}>请按照当前格式输入：1f-1025</div>
      </div>
    );
  }
}

export default FloorSelect;
