/**
 * @ Select选择框联动
 * date: 2020-06-30
 */

import React, { Component } from 'react';
import * as Cesium from 'cesium';
import { Select, Input } from 'antd';
import '../Card/index.css';

const { Option } = Select;
let styleArr = [];
let floorArr = [];
let Cgrass = [];
let GFgrass = [];
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
      Cgrass: [],
      GFgrass: [],
    };
  }

  handleStyleChange = e => {
    console.log(e);
    const arrs = this.props.arrs;
    if (arrs) {
      arrs.map((item, index) => {
        className = item.split('(')[1].split(')')[0];
        floorNum = item.slice(12, 17);
        styleArr.push(className);
        floorArr.push(floorNum);
        // 数组去重
        styleArr = Array.from(new Set(styleArr));
        floorArr = Array.from(new Set(floorArr));
      });
    }
    this.setState({
      style: e,
      arrs,
      styleArr,
      floorArr,
    });
    // 跳转
    this.props.viewer.flyTo(this.props.model11);
  };

  handleCChange = e => {
    console.log(e);
    this.setState({
      styleName: e,
    });
    this.selectCColor(this.props.jyds, e);
  };

  // 设置选中同一类的颜色
  selectCColor = (target, styleName) => {
    const that = this;
    Cgrass = [];
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (featureId.includes(styleName)) {
            Cgrass.push(featureId);
            console.log(Cgrass)
            Cgrass = Array.from(new Set(Cgrass));
            that.setState({
              Cgrass,
            });
            return Cesium.Color.clone(Cesium.Color.BLUE, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  handleGFChange = e => {
    console.log(e);

    this.setState({
      floor: e,
    });
    this.selectGFColor(this.props.jyds, e);
  };

  // 设置选中同一楼层的颜色
  selectGFColor = (target, floor) => {
    const that = this;
    GFgrass = [];
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (featureId.includes(floor)) {
            GFgrass.push(featureId);
            GFgrass = Array.from(new Set(GFgrass));
            that.setState({
              GFgrass,
            });
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
    this.props.jyds.style = new Cesium.Cesium3DTileStyle({
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
    this.props.viewer.flyTo(this.props.jyds);
    // 选中效果
    this.props.jyds.style = new Cesium.Cesium3DTileStyle({
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
    });
  };

  render() {
    return (
      <div className="infobox">
        <div className="infoline" style={{ marginBottom: 10 }}>
          交银大厦
        </div>
        <div>
          <Select
            placeholder={'请选择分类'}
            style={{ width: 100, marginRight: 20, float: 'left' }}
            onChange={this.handleStyleChange}
          >
            <Option value="C">幕墙类型</Option>
            <Option value="GF">楼层</Option>
          </Select>
          {this.state.style == 'C' ? (
            <>
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
              <Select
                placeholder={'请选择幕墙'}
                defaultValue={Cgrass[0]}
                style={{ width: 200, marginRight: 20, float: 'left' }}
                onChange={this.handleGlassChange}
              >
                {this.state.Cgrass.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </>
          ) : (
            <div style={{ float: 'left' }}></div>
          )}
          {this.state.style == 'GF' ? (
            <>
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
              <Select
                placeholder={'请选择幕墙'}
                defaultValue={GFgrass[0]}
                style={{ width: 200, marginRight: 20, float: 'left' }}
                onChange={this.handleGlassChange}
              >
                {this.state.GFgrass.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </>
          ) : (
            <div></div>
          )}
          <br />
          <Input
            style={{ width: 300, marginTop: 20, left: -100 }}
            placeholder="请输入幕墙编号"
            allowClear
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
          />
          <div style={{ color: 'red', fontSize: 12, textAlign: 'left'}}>请按照当前格式输入：L2N072-(C74)GF013</div>
          <div style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>
            其中L2:幕墙中的小层, N072: 每块幕墙的序列号, C74: 幕墙类型, GF013: 幕墙楼层
          </div>
        </div>
      </div>
    );
  }
}

export default FloorSelect;
