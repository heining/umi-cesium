/**
 * @ Select选择框联动
 * date: 2020-06-30
 */

import React, { Component } from 'react';
import request from 'umi-request';
import * as Cesium from 'cesium';
import { Select, Input, Radio, Button, message } from 'antd';
import '../Card/index.css';

const { Option } = Select;
let styleArr = [];
let floorArr = [];
let Cgrass = [];
let GFgrass = [];
let className = '';
let floorNum = '';
let Nnum = '';
let eArrs = [];
let nArrs = [];
let sArrs = [];
let wArrs = [];
let ids = [];
const pinBuilder = new Cesium.PinBuilder();
const selectedEntity = new Cesium.Entity();
const Color = ['RED', 'ORANGE', 'YELLOW', 'RED', 'BLACK', 'BLUE', 'PURPLE'];

class Info extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      id: '',
      // ids: '',
      // arrs: [],
      style: '',
      styleName: '',
      floor: '',
      styleArr: [],
      floorArr: [],
      Cgrass: [],
      GFgrass: [],
      value: '',
      showProblemStatus: false,
      detected1: '',
      detected2: '',
      detected3: '',
      notdetected5: '',
      notdetected6: '',
      notdetected7: '',
      buttonISClick: false,
      PodiumArea: 0,
      mainArea: 0,
    };
  }

  handleStyleChange = e => {
    console.log(e);
    const arrs = this.props.arrs;
    eArrs = [];
    nArrs = [];
    sArrs = [];
    wArrs = [];
    if (arrs) {
      arrs.map((item, index) => {
        className = item.split('(')[1].split(')')[0];
        let floor = item.split('F')[1];
        floorNum = parseInt(floor)
        Nnum = item.slice(4, 6);
        if (Nnum >= 70 && Nnum <= 107) {
          eArrs.push(item);
        } else if (Nnum >= 1 && Nnum <= 15) {
          nArrs.push(item);
        } else if (Nnum >= 54 && Nnum <= 69) {
          sArrs.push(item);
        } else {
          wArrs.push(item);
        }
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
    // this.props.viewer.flyTo(this.props.jyds);
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
    const that = this;
    ids = [];
    that.setState({
      showProblemStatus: true,
    });
    // 请求问题玻璃的所有id
    const formData = new FormData();
    formData.append('state', Math.pow(2, e));
    request
      .post('api/v1/get/matter/glass', {
        data: formData,
      })
      .then(function(response) {
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
        that.damagedArea(ids);
      })
      .catch(function(error) {
        console.log(error);
      });
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
    mainArea = 3.3 * mnum1 + 0.8 * mnum2 + 3.6 * mnum3 + 0.75 * mnum4;
    // console.log(mainArea.toFixed(3))
    this.setState({
      PodiumArea: PodiumArea.toFixed(3),
      mainArea: mainArea.toFixed(3),
    });
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
      duration: 2, // 设置飞行持续时间，默认会根据距离来计算
    });
  };

  handleEast = () => {
    this.flyTo(121.506817, 31.247081, 150.0, -140);
  };

  handleSouth = () => {
    this.flyTo(121.505792, 31.236161, 150.0, -50);
  };

  handleWest = () => {
    this.flyTo(121.495657, 31.236170, 150.0, 40);
  };

  handleNorth = () => {
    this.flyTo(121.492771, 31.245409, 150.0, 130);
  };

  // handleEast = () => {
  //   this.flyTo(121.500511, 31.242533, 100.0, -140);
  // };

  // handleSouth = () => {
  //   this.flyTo(121.501162, 31.24025, 100.0, -50);
  // };

  // handleWest = () => {
  //   this.flyTo(121.498733, 31.240147, 100.0, 40);
  // };

  // handleNorth = () => {
  //   this.flyTo(121.498322, 31.241935, 100.0, 130);
  // };

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
          <Button ghost onClick={this.props.jydsPosition}>视图复位</Button>
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
        {this.state.showProblemStatus ? (
          <>
            <div
              className="colorline"
              style={{
                justifyContent: 'flex-start',
                float: 'left',
                marginTop: 10,
                marginRight: 135,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', float: 'left' }}>
                <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>幕墙面板问题</span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'orange' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>外露构件问题</span>
              </div>
            </div>
            <br />
            <div
              className="colorline"
              style={{ justifyContent: 'flex-start', float: 'left', marginRight: 28 }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'yellow' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>承力构件、连接件、连接螺栓问题</span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'red' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>硅酮密封胶、胶条问题</span>
                <span>主楼玻璃破损：{this.state.PodiumArea}</span>
                <span>主楼破损总面积：{this.state.PodiumArea}</span>
                <span>裙楼破损总面积：{this.state.mainArea}</span>
              </div>
            </div>
            <br />
            <div
              className="colorline"
              style={{ justifyContent: 'flex-start', float: 'left', marginRight: 135 }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'black' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>开启部分问题</span>
              </div>
            </div>
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'blue' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>幕墙排水系统问题</span>
              </div>
            </div>
            <br />
            <div className="colorline" style={{ justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="colorbox" style={{ backgroundColor: 'purple' }}></span>
                <span style={{ fontSize: 12, marginLeft: 10 }}>硅酮结构密封胶、粘接性能问题</span>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Info;
