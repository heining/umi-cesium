/**
 * @ Select选择框联动
 * date: 2020-06-30
 */

import React, { Component } from 'react';
import request from 'umi-request';
import * as Cesium from 'cesium';
import { Select, Input, Radio, Button } from 'antd';
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
const pinBuilder = new Cesium.PinBuilder();
const selectedEntity = new Cesium.Entity();
const color = ['red', 'Orange', 'yello', 'green', 'black', 'blue', 'purple']

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
    eArrs = [];
    nArrs = [];
    sArrs = [];
    wArrs = [];
    if (arrs) {
      arrs.map((item, index) => {
        className = item.split('(')[1].split(')')[0];
        floorNum = item.slice(12, 17);
        Nnum = item.slice(4, 6)
        if(Nnum >= 70 && Nnum <= 107) {
          eArrs.push(item)
        }else if(Nnum >= 1  && Nnum <= 15) {
          nArrs.push(item)
        }else if(Nnum >= 54  && Nnum <= 69) {
          sArrs.push(item)
        }else {
          wArrs.push(item)
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
    let glassID = 0;
    // 请求问题玻璃的所有id 
    // const formData = new FormData();
    // request
    //   .post('/api/v1/get/log', {
    //     data: formData,
    //   })
    //   .then(function(response) {
    //     if(response[0]) {
    //       let ids = [];
    //       ids.push(response[0].pic_id)
    //       // that.setState({
    //       //   ids,
    //       // })
    //       that.setColor(that.props.jyds, ids, color[e-1])
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
     // 玻璃ID换取数据库glass的ID
     const formData = new FormData();
     formData.append('pic_id', this.props.id);
     request
       .post('/api/v1/get/glass', {
         data: formData,
       })
       .then(function(response) {
         glassID = response.id;
       })
       .catch(function(error) {
         console.log(error);
       });
       // 数据库glass的ID换取log(历史记录)的ID
       request
       .post('/api/v1/get/log', {
         data: glassID,
       })
       .then(function(response) {
         if( e == response.state) {

         }
       })
       .catch(function(error) {
         console.log(error);
       });
  };

  // 设置颜色,其中target：jyds, glass: 问题玻璃集合, color： 颜色集合
  setColor = (target, glass, color) => {
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          // const featureId = feature.getProperty('id');
          // if (featureId.includes(glass)) {
          //   return Cesium.Color.clone(Cesium.Color.color, result);
          // } else {
          //   return Cesium.Color.clone(Cesium.Color.WHITE, result);
          // }
          glass.map((item, index) => {
            console.log(item)
            return Cesium.Color.clone(Cesium.Color.color, result);
          })
        },
      },
    });
  };

  flyTo = (lon, lat, hight, heading) => {
    // 相机跳转
    this.props.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, hight), // 设置位置
      orientation: {
        heading: Cesium.Math.toRadians(heading), // 方向
        pitch: Cesium.Math.toRadians(0), // 倾斜角度
        roll: 0,
      },
      duration: 5, // 设置飞行持续时间，默认会根据距离来计算
      complete: function(e) {
        // 到达位置后执行的回调函数 
        console.log(e);
      },
    });
  };

  handleEast = () => {
    this.flyTo(121.501162, 31.240250, 150, -50)
  };

  handleWest = () => {
    this.flyTo(121.498322, 31.241935, 150, 130)
  };    

  handleSouth = () => {
    this.flyTo(121.498733, 31.240147, 150, 40)
  };

  handleNorth = () => {
    this.flyTo(121.500511, 31.242533, 150, -140)
  };

  render() {
    return (
      <div className="infobox">
        <div className="infoline" style={{ marginBottom: 10, float: 'left', width: 150 }}>
          交银大厦
        </div>
        {/* 楼宇信息 */}
        <div
          className="infoline"
          style={{ marginBottom: 10, textDecoration: 'underline', width: 150 }}
          onClick={this.props.handleShowBuildInfo}
        >
          建筑幕墙信息
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
        </div>
        {/* 新增功能, date: 2020-07-04, 立面信息 */}
        <div className="infoline" >
          <label>各方位的玻璃总块数</label>
          <span>东面：{eArrs.length}</span>
          <span>西面：{wArrs.length}</span>
          <span>南面：{sArrs.length}</span>
          <span>北面：{nArrs.length}</span>
        </div>
        <div className="infoline" style={{ marginTop: 15 }}>
          <label>方位</label>
          <Button ghost style={{ marginRight: 15, marginLeft: 20 }} onClick={this.handleEast}>
            东
          </Button>
          <Button ghost style={{ marginRight: 15 }} onClick={this.handleWest}>
            西
          </Button>
          <Button ghost style={{ marginRight: 15 }} onClick={this.handleSouth}>
            南
          </Button>
          <Button ghost onClick={this.handleNorth}>
            北
          </Button>
        </div>

        <div style={{ marginTop: 15 }}>
          <label style={{ float: 'left', marginRight: 10 }}>幕墙位置</label>
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
        <div className="infoline" style={{ marginTop: 15 }}>
          <label style={{width: 75, marginRight: 10}}>幕墙问题</label>
          <Select
            placeholder={'问题分类'}
            style={{ width: 265, marginTop: 10 }}
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
      </div>
    );
  }
}

export default Info;
