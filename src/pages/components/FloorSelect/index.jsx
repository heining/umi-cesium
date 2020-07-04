/**
 * @ Select选择框联动
 * date: 2020-06-30
 */

import React, { Component } from 'react';
import request from 'umi-request';
import * as Cesium from 'cesium';
import { Select, Input, Radio } from 'antd';
import '../Card/index.css';

const { Option } = Select;
let styleArr = [];
let floorArr = [];
let Cgrass = [];
let GFgrass = [];
let className = '';
let floorNum = '';
const pinBuilder = new Cesium.PinBuilder();
const selectedEntity = new Cesium.Entity();

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
      value: '',
      showCheckStatus: false,
      detected1: '',
      detected2: '',
      detected3: '',
      notdetected5: '',
      notdetected6: '',
      notdetected7: '',
    };
  }

  handleStyleChange = e => {
    console.log(e);
    const arrs = this.props.arrs;
    if (arrs) {
      arrs.map((item, index) => {
        className = item.split('(')[1].split(')')[0];
        floorNum = item.slice(12, 17);
        // floorNum = item.split(')'[1]);
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
            console.log(Cgrass);
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
    console.log(target);
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

  /**
   * @ 新增功能
   */
  // 单选按钮切换
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  // 画布
  createPin = (lon, lat, shu, colorpin, height) => {
    return this.props.viewer.entities.add({
      // name: name,
      show: false,
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      billboard: {
        image: pinBuilder.fromText(shu, Cesium.Color[colorpin], 88).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
    });
  };

  // 检测状态的颜色分类
  // floorcolor = target => {
  //   target.style = new Cesium.Cesium3DTileStyle({
  //     show: true,
  //     color: {
  //       conditions: [
  //         // ['${floor} >= 70', "color('red')"],
  //         // ['${floor} === 40', "color('red')"],
  //         // ['${floor} === 20', "color('orange')"],
  //         ['true', "color('white')"],
  //       ],
  //     },
  //   });
  //   // this.props.model11.style = new Cesium.Cesium3DTileStyle({
  //   //   color: "color('Cesium.Color.GREEN')",
  //   // });
  // };

  handleCheck = () => {
    const detected1 = this.createPin(121.503149, 31.236429, '已检测', 'GREEN', 492); // 上海环球金融中心
    const detected2 = this.createPin(121.498059, 31.241105, '已检测', 'GREEN', 170); // 中国平安金融大厦
    const detected3 = this.createPin(121.495987, 31.235635, '已检测', 'GREEN', 180); //花旗集团大厦
    const notdetected5 = this.createPin(121.504343, 31.241308, '待检测', 'RED', 86); // 华夏银行大厦
    const notdetected6 = this.createPin(121.497781, 31.238941, '待检测', 'RED', 250); //国金中心
    const notdetected7 = this.createPin(121.495841, 31.23787, '待检测', 'RED', 130); //香格里拉大酒店
    this.setState({
      detected1,
      detected2,
      detected3,
      notdetected5,
      notdetected6,
      notdetected7,
    });
    console.log(this.state.detected1);
    detected1.show = true;
    detected2.show = true;
    detected3.show = true;
    notdetected5.show = true;
    notdetected6.show = true;
    notdetected7.show = true;
    // this.floorcolor(this.props.model11);
    this.props.viewer.flyTo(this.props.model11, {
      duration: 3,
      offset: new Cesium.HeadingPitchRange(
        -10,
        -0.5,
        this.props.model11.boundingSphere.radius * 1.6,
      ),
    });
    this.setState({
      showCheckStatus: true,
    });
  };

  handleHidePin = () => {
    let { detected1, detected2, detected3, notdetected5, notdetected6, notdetected7 } = this.state;
    console.log(detected1);
    detected1.show = false;
    detected2.show = false;
    detected3.show = false;
    notdetected5.show = false;
    notdetected6.show = false;
    notdetected7.show = false;
    this.setState({
      showCheckStatus: false,
    });
  };

  // 7个问题，7种颜色
  handleProblemChange = e => {
    console.log(e);
    const that = this;
    // 请求问题玻璃的所有id
    const urlencoded = new URLSearchParams();
    urlencoded.append('pic_id', this.props.id);
    request
      .post('/api/v1/get/picture/url', {
        data: urlencoded,
      })
      .then(function(response) {
        if (response.result == 'success') {
        
        } else {
         
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // // 设置颜色,其中target：jyds, glass: 问题玻璃集合, color： 颜色集合
  // setColor = (target, glass, color) => {
  //   target.style = new Cesium.Cesium3DTileStyle({
  //     // show: true,
  //     color: { 
  //       evaluateColor: function(feature, result) {
  //         const featureId = feature.getProperty('id');
  //         if (featureId.includes(glass)) {
  //           return Cesium.Color.clone(Cesium.Color.color, result);
  //         } else {
  //           return Cesium.Color.clone(Cesium.Color.WHITE, result);
  //         }
  //       },
  //     },
  //   });
  // };

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
            style={{ width: 250, marginTop: 20, display: 'block' }}
            placeholder="请输入幕墙编号"
            allowClear
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
          />
          <div style={{ color: 'green', fontSize: 12, textAlign: 'left' }}>
            请按照当前格式输入：L2N072-(C74)GF013
          </div>
          <div style={{ color: 'green', fontSize: 12, textAlign: 'left' }}>
            其中L2:幕墙中的小层, N072: 每块幕墙的序列号, C74: 幕墙类型, GF013: 幕墙楼层
          </div>
        </div>

        {/* 新增功能，date: 2020-07-02 */}
        <Radio.Group
          onChange={this.onChange}
          value={this.state.value}
          style={{ color: 'white', marginTop: 10 }}
        >
          <Radio value={1} style={{ color: 'white' }} onClick={this.handleCheck}>
            检测状态
          </Radio>
          <Radio
            style={{ color: 'white' }}
            value={2}
            onClick={() => {
              this.props.handleHideBuildings();
              this.handleHidePin();
            }}
          >
            隐藏楼群
          </Radio>
          <Radio style={{ color: 'white' }} value={3} onClick={this.props.handleShowBuildings}>
            显示楼群
          </Radio>
        </Radio.Group>
        {this.state.showCheckStatus ? (
          <>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
                <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>未检测</span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'green' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>已检测</span>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}

        {/* 新增功能, date: 2020-07-04 */}
        <Select
          placeholder={'问题分类'}
          style={{ width: 200, marginTop: 15 }}
          onChange={this.handleProblemChange}
        >
          <Option value="1">幕墙面板问题</Option>
          <Option value="2">外露构件问题</Option>
          <Option value="3">承力构件、连接件、连接螺栓问题</Option>
          <Option value="4">硅酮密封胶、胶条问题</Option>
          <Option value="5">开启部分问题</Option>
          <Option value="6">幕墙排水系统问题</Option>
          <Option value="7">硅酮结构密封胶、粘接性能问题</Option>
        </Select>
      </div>
    );
  }
}

export default FloorSelect;
