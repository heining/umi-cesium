/**
 * @ Select选择框联动
 * date: 2020-06-18
 */

import React, { Component } from 'react';
import * as Cesium from 'cesium';
import { Select, Input } from 'antd';
import '../Card/index.css';

const { Option } = Select;
const styleArr = [];
const floorArr = [];
let className = '';
let floorNum = '';

class FloorSelect extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      id: '',
      arrs: [],
      style: '',
      styleName: '',
      floor: '',
      styleArr: [],
      floorArr: [],
    };
  }

  handleStyleChange = e => {
    const arrs = this.props.arrs;
    console.log(arrs);
    if (arrs) {
      arrs.map((item, index) => {
        className = item.split('(')[1].split(')')[0];
        floorNum = item.slice(12, 17)
        styleArr.push(className);
        // 数组去重
        Array.from(new Set(styleArr));
        floorArr.push(floorNum);
        Array.from(new Set(floorArr));
      });
    }
    this.setState({
      style: e,
      arrs,
      styleArr,
      floorArr,
    });
    // 跳转
    this.props.viewer.flyTo(this.props.jyds);
  };

  handleCChange = e => {
    console.log(e);
    this.setState({
      styleName: e,
    });
    this.selectCColor(this.props.jyds, e);
  };

  // 设置选中同一类的颜色
  selectCColor = (target, style) => {
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (featureId.includes(style)) {
            return Cesium.Color.clone(Cesium.Color.BLUE, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  handleGFChange = e => {
    this.selectGFColor(this.props.jyds, e);
    this.setState({
      floor: e,
    });
  };

  // 设置选中楼层的颜色
  selectGFColor = (target, level) => {
    const v = 'GF' + level;
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
    console.log(e);
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

  // // 获取input中输入的值
  // handleChange = e => {
  //   console.log(e.target.value);
  //   this.setState({
  //     id: e.target.value,
  //   });
  // };

  // // 按下回车
  // handleEnter = () => {
  //   const { id } = this.state;
  //   // 跳转
  //   this.props.viewer.flyTo(this.props.prds);
  //   // 选中效果
  //   this.props.prds.style = new Cesium.Cesium3DTileStyle({
  //     // show: true,
  //     // feature: 切片
  //     color: {
  //       evaluateColor: function(feature, result) {
  //         const featureId = feature.getProperty('id');
  //         // 循环遍历的id值要等于输入的id
  //         if (featureId == id) {
  //           return Cesium.Color.clone(Cesium.Color.RED, result);
  //         } else {
  //           return Cesium.Color.clone(Cesium.Color.WHITE, result);
  //         }
  //       },
  //     },
  //   })
  // };

  render() {
    return (
      <div className="infobox">
        <div className="infoline" style={{ marginBottom: 10 }}>
          交银大厦
        </div>
        <Select
          placeholder={'请选择分类'}
          style={{ width: 100, marginRight: 20, float: 'left' }}
          onChange={this.handleStyleChange}
        >
          <Option value="C">幕墙类型</Option>
          <Option value="GF">楼层</Option>
        </Select>
        {this.state.style == 'C' ? (
          <Select
            placeholder={'请选择幕墙类型'}
            style={{ width: 100, marginRight: 20, float: 'left' }}
            onChange={this.handleCChange}
          >
            {this.state.styleArr.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        ) : (
          <div style={{ float: 'left' }}></div>
        )}
        {this.state.style == 'GF' ? (
          <Select
            placeholder={'请选择楼层'}
            style={{ width: 100, marginRight: 20, float: 'left' }}
            onChange={this.handleGFChange}
          >
            {this.state.floorArr.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        ) : (
          <div style={{ float: 'left' }}></div>
        )}
        {/* {(this.state.styleName == className) ? (
          <Select
            placeholder={'请选择幕墙'}
            style={{ width: 100, marginRight: 20, float: 'left' }}
            onChange={this.handleGlassChange}
          >
            {this.state.arrs.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        ) : (
          <div style={{ float: 'left' }}></div>
        )} */}
        {/* {(this.state.floor == floorNum) ? (
          <Select
            placeholder={'请选择幕墙'}
            style={{ width: 100, marginRight: 20, float: 'left' }}
            onChange={this.handleGlassChange}
          >
            {this.state.arrs.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        ) : (
          <div></div>
        )} */}

        {/* <Input
          style={{ width: 240, marginTop: 20 }}
          placeholder="请输入玻璃编号"
          allowClear
          onChange={this.handleChange}
          onPressEnter={this.handleEnter}
        />
        <div style={{ color: 'red', fontSize: 12 }}>请按照当前格式输入：1f-1025</div> */}
      </div>
    );
  }
}

export default FloorSelect;
