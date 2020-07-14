/**
 * @ Select选择框联动
 * date: 2020-06-30
 */

import React, { Component } from 'react';
import request from 'umi-request';
import * as Cesium from 'cesium';
import { Select, Input, Radio, Button, message } from 'antd';
import { getEffect } from './getEffect';
import '../Card/index.css';

const { Option } = Select;
let WFfloor = [];
let GFfloor = [];
let WFglass = [];
let GFglass = [];
// let className = '';
// let floorNum = '';
let Nnum = '';
// let eArrs = [];
// let nArrs = [];
// let sArrs = [];
// let wArrs = [];
let ids = [];
let arrAll = [];
let arr = [];
let arr0 = [];
let arr1 = [];
let arr2 = [];
let arr3 = [];
let arr4 = [];
let arr5 = [];
let arr6 = [];
let num = 0;
let area = 0;
const pinBuilder = new Cesium.PinBuilder();
const selectedEntity = new Cesium.Entity();
const Color = ['RED', 'ORANGE', 'YELLOW', 'RED', 'BLACK', 'BLUE', 'PURPLE'];

class Info extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      id: '',
      ids3: '',
      // arrs: [],
      style: '',
      WFf: '',
      GFf: '',
      WFfloor: [],
      GFfloor: [],
      WFglass: [],
      GFglass: [],
      value: '',
      state: '',
      detected1: '',
      detected2: '',
      detected3: '',
      notdetected5: '',
      notdetected6: '',
      notdetected7: '',
      buttonISClick: false,
      PodiumArea: 0,
      mainArea: 0,
      PodiumNum: 0,
      mainNum: 0,
      num: 0,
      area: 0,
      allNum: 0,
      allArea: 0,
      arrAll: [],
      btn: false,
    };
  }

  handleStyleChange = e => {
    console.log(e);
    // 玻璃集合
    let arrs = this.props.arrs;
    // 石材集合
    let WFarrs = this.props.WFarrs;
    // eArrs = [];
    // nArrs = [];
    // sArrs = [];
    // wArrs = [];
    // if (arrs) {
    //   arrs.map((item, index) => {
    //     className = item.split('(')[1].split(')')[0];
    //     let floor = item.split('F')[1];
    //     floorNum = parseInt(floor);
    //     Nnum = item.slice(4, 6);
    //     if (Nnum >= 70 && Nnum <= 107) {
    //       eArrs.push(item);
    //     } else if (Nnum >= 1 && Nnum <= 15) {
    //       nArrs.push(item);
    //     } else if (Nnum >= 54 && Nnum <= 69) {
    //       sArrs.push(item);
    //     } else {
    //       wArrs.push(item);
    //     }
    //     // floorNum = item.split(')'[1]);
    //     styleArr.push(className);
    //     floorArr.push(floorNum);
    //     // 数组去重
    //     styleArr = Array.from(new Set(styleArr));
    //     floorArr = Array.from(new Set(floorArr));
    //   });
    // }
    if (arrs) {
      arrs.map((item, index) => {
        let f = parseInt(item.slice(15, 17));
        if (f) {
          GFfloor.push(f);
        }
      });
      GFfloor = Array.from(new Set(GFfloor));
      GFfloor = GFfloor.sort();
    }
    if (WFarrs) {
      WFarrs.map((item, index) => {
        let f = parseInt(item.split('F')[1]);
        WFfloor.push(f);
      });
      WFfloor = Array.from(new Set(WFfloor));
      WFfloor = WFfloor.sort();
    }
    this.setState({
      style: e,
      arrs,
      WFfloor,
      GFfloor,
    });
    // 跳转
    // this.props.viewer.flyTo(this.props.jyds);
  };

  handleWFChange = e => {
    console.log(e);
    this.setState({
      WFf: e,
    });
    this.selectWFColor(this.props.jyds, e);
  };

  // 设置选中同一层石材的颜色
  selectWFColor = (target, floor) => {
    const that = this;
    WFglass = [];
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (that.props.WFarrs.includes(featureId) && featureId.includes(floor)) {
            WFglass.push(featureId);
            WFglass = Array.from(new Set(WFglass));
            that.setState({
              WFglass,
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
      GFf: e,
    });
    this.selectGFColor(this.props.jyds, e);
  };

  // 设置选中同一楼层的颜色
  selectGFColor = (target, floor) => {
    const that = this;
    GFglass = [];
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (that.props.arrs.includes(featureId) && featureId.includes(floor)) {
            GFglass.push(featureId);
            GFglass = Array.from(new Set(GFglass));
            that.setState({
              GFglass,
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
    console.log(id);
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

  // // 画布
  // createPin = (lon, lat, shu, colorpin, height) => {
  //   return this.props.viewer.entities.add({
  //     // name: name,
  //     show: false,
  //     position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
  //     billboard: {
  //       image: pinBuilder.fromText(shu, Cesium.Color[colorpin], 88).toDataURL(),
  //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  //     },
  //   });
  // };

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

  // handleCheck = () => {
  //   const detected1 = this.createPin(121.503149, 31.236429, '已检测', 'GREEN', 492); // 上海环球金融中心
  //   const detected2 = this.createPin(121.498059, 31.241105, '已检测', 'GREEN', 170); // 中国平安金融大厦
  //   const detected3 = this.createPin(121.495987, 31.235635, '已检测', 'GREEN', 180); //花旗集团大厦
  //   const notdetected5 = this.createPin(121.504343, 31.241308, '待检测', 'RED', 86); // 华夏银行大厦
  //   const notdetected6 = this.createPin(121.497781, 31.238941, '待检测', 'RED', 250); //国金中心
  //   const notdetected7 = this.createPin(121.495841, 31.23787, '待检测', 'RED', 130); //香格里拉大酒店
  //   this.setState({
  //     detected1,
  //     detected2,
  //     detected3,
  //     notdetected5,
  //     notdetected6,
  //     notdetected7,
  //   },);
  //   detected1.show = true;
  //   detected2.show = true;
  //   detected3.show = true;
  //   notdetected5.show = true;
  //   notdetected6.show = true;
  //   notdetected7.show = true;
  //   // this.floorcolor(this.props.model11);
  //   this.props.viewer.flyTo(this.props.model11, {
  //     duration: 3,
  //     offset: new Cesium.HeadingPitchRange(
  //       -10,
  //       -0.5,
  //       this.props.model11.boundingSphere.radius * 1.6,
  //     ),
  //   });
  //   this.setState({
  //     showCheckStatus: true,
  //   });
  // };

  // handleHidePin = () => {
  //   let { detected1, detected2, detected3, notdetected5, notdetected6, notdetected7 } = this.state;
  //   console.log(detected1);
  //   detected1.show = false;
  //   detected2.show = false;
  //   detected3.show = false;
  //   notdetected5.show = false;
  //   notdetected6.show = false;
  //   notdetected7.show = false;
  //   this.setState({
  //     showCheckStatus: false,
  //   });
  // };

  // 7个问题，7种颜色
  handleProblemChange = e => {
    console.log(e);
    const that = this;
    ids = [];
    that.setState({
      state: e,
    });
    // 请求问题玻璃的所有id
    const formData = new FormData();
    formData.append('state', Math.pow(2, e));
    request
      .post('api/v1/get/matter/glass', {
        data: formData,
      })
      .then(async response => {
        if (response) {
          response.map((item, index) => {
            ids.push(item.raw_id);
          });
          // that.setState({
          //   ids,
          // })
        } else {
          message.info('查询失败，请重试！');
        }
        that.setColor(that.props.jyds, ids, Color[e]);
        if (e == 3) {
          that.damagedArea(ids);
          // that.setState({
          //   ids3: ids,
          // });
        } else {
          console.log(ids)
          that.area(ids);
          console.log(num, area)
        }
        if (e == 0 || e == 3 || e == 7) {
          // 北面
          that.flyTo(121.495592, 31.2439895, 120.0, 130);
        } else if (e == 6) {
          // 南面
          that.flyTo(121.503292, 31.2385895, 120.0, -50);
        } else {
          // 初始
          that.props.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(121.494521, 31.242109, 120.0), // 设置位置
            orientation: {
              heading: Cesium.Math.toRadians(100), // 方向
              pitch: Cesium.Math.toRadians(0), // 倾斜角度
              roll: 0,
            },
            maximumHeight: 120,
            duration: 2, // 设置飞行持续时间，默认会根据距离来计算
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getAllArea = async () => {
    const that = this;
    arr0 = [];
    arr1 = [];
    arr2 = [];
    arr3 = [];
    arr4 = [];
    arr5 = [];
    arr6 = [];
    for (let i = 0; i < 7; i++) {
      // 请求问题玻璃的所有id
      const formData = new FormData();
      formData.append('state', Math.pow(2, i));
      // 异步
      await request
        .post('api/v1/get/matter/glass', {
          data: formData,
        })
        .then(function(response) {
          if (response) {
            response.map((item, index) => {
              arrAll.push(item.raw_id);
              switch (item.state) {
                case 1:
                  arr0.push(item.raw_id);
                  break;
                case 2:
                  arr1.push(item.raw_id);
                  break;
                case 4:
                  arr2.push(item.raw_id);
                  break;
                case 8:
                  arr3.push(item.raw_id);
                  break;
                case 16:
                  arr4.push(item.raw_id);
                  break;
                case 32:
                  arr5.push(item.raw_id);
                  break;
                case 64:
                  arr6.push(item.raw_id);
                  break;
                default:
                  break;
              }
            });
            // that.state.arrAll = arrAll;
          } else {
            message.info('查询失败，请重试！');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // console.log(arr0)
    }
    // that.area(arrAll);
    // that.setState({
    //   allNum: arrAll.length,
    //   allArea: this.state.area,
    // });
    // 选中效果
    // that.props.jyds.style = new Cesium.Cesium3DTileStyle({
    //   // show: true,
    //   // feature: 切片
    //   color: {
    //     evaluateColor: function (feature, result) {
    //       const featureId = feature.getProperty('id');
    //       if (arrAll.includes(featureId)) {
    //         return Cesium.Color.clone(Cesium.Color.PURPLE, result);
    //       } else {
    //         return Cesium.Color.clone(Cesium.Color.WHITE, result);
    //       }
    //     },
    //   },
    // });
  };

  // 设置颜色,其中target：jyds, glass: 问题玻璃集合, Color 颜色集合
  setColor = (target, glass, Color) => {
    // console.log(glass)
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          // console.log(glass.includes(featureId))
          if (glass.includes(featureId)) {
            return Cesium.Color.clone(Cesium.Color[Color], result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  // 密封胶破损面积
  damagedArea = array => {
    // 裙楼密封胶玻璃集合
    let Podium = [];
    let PodiumArea = 0;
    // 主楼密封胶玻璃集合
    let mainBuilding = [];
    let mainArea = 0;
    let pnum1 = 0;
    let pnum2 = 0;
    let mnum1 = 0;
    let mnum2 = 0;
    let mnum3 = 0;
    let mnum4 = 0;
    array.map((item, index) => {
      if (Number.parseInt(item.split('F')[1]) < 6) {
        Podium.push(item);
      } else {
        mainBuilding.push(item);
      }
    });
    Podium.map((item, index) => {
      if (item.split('(')[1].split(')')[0] == 'C01') {
        pnum1 = pnum1 + 1;
      } else if (item.split('(')[1].split(')')[0] == 'C02') {
        pnum2 = pnum2 + 1;
      }
    });
    let PodiumNum = pnum1 + pnum2;
    PodiumArea = 3.3 * pnum1 + 1.6 * pnum2;
    // console.log(PodiumArea.toFixed(3))
    mainBuilding.map((item, index) => {
      if (item.includes('GF')) {
        if (item.split('(')[1].split(')')[0] == 'C01') {
          mnum1 = mnum1 + 1;
        } else if (item.split('(')[1].split(')')[0] == 'C03') {
          mnum2 = mnum2 + 1;
        } else if (item.split('(')[1].split(')')[0] == 'C05') {
          mnum3 = mnum3 + 1;
        }
      } else if (item.includes('WF')) {
        if (item.split('(')[1].split(')')[0] == 'C02') {
          mnum4 = mnum4 + 1;
        }
      }
    });
    let mainNum = mnum1 + mnum2 + mnum3 + mnum4;
    mainArea = 3.3 * mnum1 + 0.8 * mnum2 + 3.6 * mnum3 + 0.75 * mnum4;
    // console.log(mainArea.toFixed(3))
    this.setState({
      PodiumArea: PodiumArea.toFixed(3),
      mainArea: mainArea.toFixed(3),
      mainNum,
      PodiumNum,
    });
  };

  // 问题玻璃的面积
  // array: 问题玻璃集合
  area = array => {
    num = 0;
    area = 0;
    const that = this;
    let Wnum1 = 0;
    let Wnum2 = 0;
    let Wnum3 = 0;
    let Gnum1 = 0;
    let Gnum2 = 0;
    let Gnum3 = 0;
    let Gnum4 = 0;
    let Gnum5 = 0;
    let Gnum6 = 0;

    array.map((item, Index) => {
      if (item.includes('WF')) {
        if (item.split('(')[1].split(')')[0] == 'C01' && item.slice(1, 2) == 'L0') {
          Wnum1 = Wnum1 + 1;
        } else if (item.slice(1, 2) == 'L1') {
          if (item.split('(')[1].split(')')[0] == 'C03') {
            Wnum2 = Wnum2 + 1;
          } else {
            Wnum3 = Wnum3 + 1;
          }
        }
      } else if (item.includes('GF')) {
        switch (item.split('(')[1].split(')')[0]) {
          case 'C01':
            Gnum1 = Gnum1 + 1;
            break;
          case 'C02':
            Gnum2 = Gnum2 + 1;
            break;
          case 'C03':
            Gnum3 = Gnum3 + 1;
            break;
          case 'C04':
            Gnum4 = Gnum4 + 1;
            break;
          case 'C05':
            Gnum5 = Gnum5 + 1;
            break;
          case 'C06':
            Gnum6 = Gnum6 + 1;
            break;
          default:
            break;
        }
      }
    });
    num = Wnum1 + Wnum2 + Wnum3 + Gnum1 + Gnum2 + Gnum3 + Gnum4 + Gnum5 + Gnum6;
    area =
      Wnum1 * 19 +
      Wnum2 * 0.25 +
      Wnum3 * 0.75 +
      Gnum1 * 3.3 +
      Gnum2 * 1.65 +
      Gnum3 * 0.825 +
      Gnum4 * 6.97 +
      Gnum5 * 3.72 +
      Gnum6 * 1;
    that.setState({
      num,
      area: area.toFixed(3),
    });
    console.log(num, area);
  };

  // 立面信息
  flyTo = (lon, lat, hight, heading) => {
    this.props.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, hight), // 设置位置
      orientation: {
        heading: Cesium.Math.toRadians(heading), // 方向
        pitch: Cesium.Math.toRadians(0), // 倾斜角度
        roll: 0,
      },
      maximumHeight: 120,
      // flyOverLongitude: Cesium.Math.toRadians(1.0),
      duration: 2, // 设置飞行持续时间，默认会根据距离来计算
    });
  };

  handleEast = () => {
    this.flyTo(121.502592, 31.2443895, 120.0, -140);
  };

  handleSouth = () => {
    this.flyTo(121.503292, 31.2385895, 120.0, -50);
  };

  handleWest = () => {
    this.flyTo(121.496292, 31.2378895, 120.0, 40);
  };

  handleNorth = () => {
    this.flyTo(121.495592, 31.2439895, 120.0, 130);
  };

  // 密封胶受影响区
  handleEffect = () => {
    let effectArr = [];
    const that = this;
    that.state.ids3.map((item, index) => {
      effectArr = effectArr.concat(getEffect(item));
    });
    that.props.jyds.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (effectArr.includes(featureId)) {
            return Cesium.Color.clone(Cesium.Color.RED, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  // 总检查结果
  handleBtn = async () => {
    const that = this;
    await that.getAllArea();
    // console.log(arr0,arr1,arr2,arr4,arr5,arr6)
    // 选中效果
    that.props.jyds.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      // feature: 切片
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (arrAll.includes(featureId)) {
            return Cesium.Color.clone(Cesium.Color.PURPLE, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
    that.area(arr0);
    that.setState({
      num0: num,
      area0: area.toFixed(3),
    });
    console.log(that.state.num0, that.state.area0, arr1);
    that.area(arr1);
    that.setState({
      num1: num,
      area1: area.toFixed(3),
    });
    console.log(that.state.num1, that.state.area1);
    that.area(arr2);
    that.setState({
      num2: num,
      area2: area.toFixed(3),
    });
    console.log(that.state.num2, that.state.area2);
    that.damagedArea(arr3);
    that.area(arr4);
    that.setState({
      num4: num,
      area4: area.toFixed(3),
    });
    console.log(that.state.num4, that.state.area4);
    that.area(arr5);
    that.setState({
      num5: num,
      area5: area.toFixed(3),
    });
    console.log(that.state.num5, that.state.area5);
    that.area(arr6);
    that.setState({
      num6: num,
      area6: area.toFixed(3),
    });
    console.log(that.state.num6, that.state.area6);
    that.area(arrAll);
    that.setState({
      btn: true,
      allNum: num,
      allArea: area.toFixed(3),
    });
  };

  render() {
    return (
      <div className="infobox">
        <div
          className="infoline"
          style={{ marginBottom: 10, width: 150, fontSize: 18, fontWeight: 600, color: 'red' }}
        >
          交银金融大厦
        </div>
        {/* 楼宇信息 */}
        <div className="infoline">
          <div
            style={{ marginBottom: 5, textDecoration: 'underline', width: 100, float: 'left' }}
            onClick={this.props.handleShowBuildInfo}
          >
            建筑信息
          </div>
          <div
            style={{ marginBottom: 5, textDecoration: 'underline', width: 100, float: 'left' }}
            onClick={this.props.handleShowGlassInfo}
          >
            幕墙信息
          </div>
          <div
            style={{ marginBottom: 5, textDecoration: 'underline', width: 100, float: 'left' }}
            onClick={this.props.handleShowInfo}
          >
            构件信息
          </div>
        </div>

        {/* 新增功能，date: 2020-07-02 */}
        <div style={{ textAlign: 'left' }}>
          <Radio.Group
            onChange={this.onChange}
            value={this.state.value}
            style={{ color: 'white', marginTop: 10 }}
          >
            <Radio style={{ color: 'white' }} value={1} onClick={this.props.handleShowBuildings}>
              显示楼群
            </Radio>
            <Radio
              style={{ color: 'white' }}
              value={2}
              onClick={() => {
                this.props.handleHideBuildings();
                // this.handleHidePin();
              }}
            >
              隐藏楼群
            </Radio>
            {/* <Radio value={3} style={{ color: 'white' }} onClick={this.handleCheck}>
              检测状态
            </Radio> */}
          </Radio.Group>
          <Button ghost onClick={this.props.jydsPosition}>
            视图复位
          </Button>
        </div>
        {/* 新增功能, date: 2020-07-04, 立面信息 */}
        {/* <div className="infoline" style={{ width: 500 }}>
          <label>各方位的玻璃总块数</label>
          <span style={{ width: 80, marginRight: 5 }}>东面：{eArrs.length}</span>
          <span style={{ width: 80, marginRight: 5 }}>西面：{wArrs.length}</span>
          <br />
          <span style={{ width: 80, marginRight: 5 }}>南面：{sArrs.length}</span>
          <span style={{ width: 80 }}>北面：{nArrs.length}</span>
        </div> */}
        <div className="infoline" style={{ marginTop: 15 }}>
          <label>方位</label>
          <Button ghost style={{ marginRight: 15, marginLeft: 20 }} onClick={this.handleEast}>
            东
          </Button>
          <Button ghost style={{ marginRight: 15 }} onClick={this.handleSouth}>
            南
          </Button>
          <Button ghost style={{ marginRight: 15 }} onClick={this.handleWest}>
            西
          </Button>
          <Button ghost onClick={this.handleNorth}>
            北
          </Button>
        </div>

        <div style={{ marginTop: 15 }}>
          <label style={{ float: 'left', marginRight: 5 }}>幕墙位置</label>
          <Select
            placeholder={'请选择分类'}
            style={{ width: 100, marginRight: 20, float: 'left', background: 'transparent ' }}
            onChange={this.handleStyleChange}
          >
            <Option value="GF">玻璃</Option>
            <Option value="WF">石材</Option>
          </Select>
          {this.state.style == 'GF' ? (
            <>
              <Select
                placeholder={'请选择楼层'}
                style={{ width: 100, marginRight: 20, float: 'left' }}
                onChange={this.handleGFChange}
              >
                {this.state.GFfloor.map((item, index) => (
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
                {this.state.GFglass.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </>
          ) : (
            <div style={{ float: 'left' }}></div>
          )}
          {this.state.style == 'WF' ? (
            <>
              <Select
                placeholder={'请选择楼层'}
                style={{ width: 100, marginRight: 20, float: 'left' }}
                onChange={this.handleWFChange}
              >
                {this.state.WFfloor.map((item, index) => (
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
                {this.state.WFglass.map((item, index) => (
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
            style={{ width: 250, marginTop: 30, display: 'block' }}
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

        {/* 新增功能, date: 2020-07-04 */}
        <div className="infoline" style={{ marginTop: 15, width: 400 }}>
          <label style={{ width: 90, marginRight: 10 }}>幕墙检查结果</label>
          <Select
            placeholder={'问题分类'}
            style={{ width: 300, marginTop: 10 }}
            onChange={this.handleProblemChange}
          >
            <Option value="0">幕墙面板问题</Option>
            <Option value="1">外露构件问题</Option>
            <Option value="2">承力构件、连接件、连接螺栓问题</Option>
            <Option value="3">硅酮密封胶、胶条问题</Option>
            <Option value="4">开启部分问题</Option>
            <Option value="5">幕墙排水系统问题</Option>
            <Option value="6">硅酮结构密封胶、粘接性能问题</Option>
          </Select>
        </div>
        {this.state.state == '0' ? (
          <div
            className="colorline"
            style={{
              justifyContent: 'flex-start',
              marginTop: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>幕墙面板问题</span>
              <span style={{ marginLeft: 68 }}>幕墙破损：{this.state.num}块</span>
              <span style={{ marginLeft: 20 }}>破损面积：{this.state.area} </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {this.state.state == '1' ? (
          <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'orange' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>外露构件问题</span>
              <span style={{ marginLeft: 68 }}>幕墙破损：{this.state.num}块</span>
              <span style={{ marginLeft: 20 }}>破损面积：{this.state.area} </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {this.state.state == '2' ? (
          <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'yellow' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>承力构件、连接件、连接螺栓问题</span>
              <span style={{ marginLeft: 68 }}>幕墙破损：{this.state.num}块</span>
              <span style={{ marginLeft: 20 }}>破损面积：{this.state.area} </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {this.state.state == '3' ? (
          <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>硅酮密封胶、胶条问题</span>
              <hr />
              <div>
                <span style={{ marginLeft: 68 }}>主楼幕墙破损：{this.state.PodiumNum}块</span>
                <span style={{ marginLeft: 20 }}>主楼破损面积：{this.state.PodiumArea} </span>
                <br />
                <span style={{ marginLeft: 65 }}>裙楼幕墙破损：{this.state.mainNum}块</span>
                <span style={{ marginLeft: 20 }}>裙楼破损面积：{this.state.mainArea}</span>
                <br />
                <Button ghost onClick={this.handleEffect} style={{ marginTop: 10 }}>
                  密封胶受影响区域
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {this.state.state == '4' ? (
          <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'black' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>开启部分问题</span>
              <span style={{ marginLeft: 68 }}>幕墙破损：{this.state.num}块</span>
              <span style={{ marginLeft: 20 }}>破损面积：{this.state.area} </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {this.state.state == '5' ? (
          <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'blue' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>幕墙排水系统问题</span>
              <span style={{ marginLeft: 68 }}>幕墙破损：{this.state.num}块</span>
              <span style={{ marginLeft: 20 }}>破损面积：{this.state.area} </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {this.state.state == '6' ? (
          <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="colorbox" style={{ backgroundColor: 'purple' }}></span>
              <span style={{ fontSize: 12, marginLeft: 10 }}>硅酮结构密封胶、粘接性能问题</span>
              <span style={{ marginLeft: 68 }}>幕墙破损：{this.state.num}块</span>
              <span style={{ marginLeft: 20 }}>破损面积：{this.state.area} </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* <div className="infoline" style={{ marginTop: 15, width: 400 }}> */}
        {/* <label style={{ width: 90, marginRight: 10 }}>幕墙总检查结果</label> */}
        <Button onClick={this.handleBtn}>幕墙总检查结果</Button>
        {this.state.btn ? (
          <>
            <div
              className="colorline"
              style={{
                justifyContent: 'flex-start',
                marginTop: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>幕墙面板问题</span>
                <span>幕墙破损：{this.state.num0}块</span>
                <span>破损面积：{this.state.area0} </span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'orange' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>外露构件问题</span>
                <span>幕墙破损：{this.state.num1}块</span>
                <span>破损面积：{this.state.area1} </span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'yellow' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>承力构件、连接件、连接螺栓问题</span>
                <span>幕墙破损：{this.state.num2}块</span>
                <span>破损面积：{this.state.area2} </span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>硅酮密封胶、胶条问题</span>
                <hr />
                <div>
                  <span>主楼幕墙破损：{this.state.PodiumNum}块</span>
                  <span>主楼破损面积：{this.state.PodiumArea} </span>
                  <br />
                  <span>裙楼幕墙破损：{this.state.mainNum}块</span>
                  <span>裙楼破损面积：{this.state.mainArea}</span>
                </div>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'black' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>开启部分问题</span>
                <span>幕墙破损：{this.state.num4}块</span>
                <span>破损面积：{this.state.area4} </span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'blue' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>幕墙排水系统问题</span>
                <span>幕墙破损：{this.state.num5}块</span>
                <span>破损面积：{this.state.area5} </span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'purple' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>硅酮结构密封胶、粘接性能问题</span>
                <span>幕墙破损：{this.state.num6}块</span>
                <span>破损面积：{this.state.area6} </span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>幕墙总破损：{this.state.allNum}块</span>
                <span>破损总面积：{this.state.allArea} </span>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
      // </div>
    );
  }
}

export default Info;
