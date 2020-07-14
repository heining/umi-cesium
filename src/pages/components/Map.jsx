import React, { Component } from 'react';
import * as Cesium from 'cesium';
import Info from './Info/index';
import GlassInfo from './Info/GlassInfo';
import BuildInfo from './Info/BuildInfo';
import MemberInfo from './Info/MemberInfo';
// import DetailInfo from './Info/DetailInfo';
import { Input, Button, message } from 'antd';
import Card from './Card/index';
import History from './Card/History';
import 'cesium/Source/Widgets/widgets.css';

const arrs = [];
const WFarrs = [];
const South = [];

class Map extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      WFid: '',
      arrs: [],
      WFarrs: [],
      showDetail: false,
      showHistory: false,
      showBuildings: true,
      showBuildInfo: false,
      showGlassInfo: false,
      IsLogin: false,
      nameValue: '',
      passValue: '',
    };
  }

  //  模型旋转、平移和贴地
  // toRadians: 将度数转化为弧度
  modelRotation = (tileset, z, lon, lat, height) => {
    const mz = new Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(z));
    const rotationz = Cesium.Matrix4.fromRotationTranslation(mz);
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    const m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
    Cesium.Matrix4.multiply(m, rotationz, m);
    tileset._root.transform = m;
    return tileset;
  };

  // 鼠标移动事件
  mouseMove = movement => {
    // 如果之前有选中的元素，则取消选中
    const highlighted = this.highlighted;
    const selected = this.selected;
    if (Cesium.defined(highlighted.feature)) {
      highlighted.feature.color = highlighted.originalColor;
      highlighted.feature = undefined;
    } else {
      // 重新选中
      const pick = this.scene.pick(movement.endPosition);
      // 判断pick是否为空
      if (Cesium.defined(pick)) {
        // 根据每块玻璃的ID区分
        try {
          const name = pick.getProperty('id');
          // console.log(name)
          if (pick !== selected.feature) {
            highlighted.feature = pick;
            Cesium.Color.clone(pick.color, highlighted.originalColor);
            if (name.includes('GF')) {
              pick.color = Cesium.Color.YELLOW;
            } else if (name.includes('WF')) {
              pick.color = Cesium.Color.BLUE;
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // 鼠标左键事件
  mouseLeftClick = movement => {
    const selected = this.selected;
    const highlighted = this.highlighted;
    // 如果之前有选中的元素，则取消选中
    if (Cesium.defined(selected.feature)) {
      selected.feature.color = selected.originalColor;
      selected.feature = undefined;
    } else {
      // 重新选择
      const pick = this.scene.pick(movement.position);
      // console.log(pick);
      // 判断pick是否为空
      if (Cesium.defined(pick)) {
        // 根据每块玻璃的ID区分
        const name = pick.getProperty('id');
        console.log(name);
        if (name.includes('GF')) {
          selected.feature = pick;
          if (pick === highlighted.feature) {
            Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
            highlighted.feature = undefined;
          } else {
            Cesium.Color.clone(pick.color, selected.originalColor);
          }
          this.setState({
            showDetail: true,
            id: name,
            showHistory: false,
          });
        } else if (name.includes('WF')) {
          selected.feature = pick;
          if (pick === highlighted.feature) {
            Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
            highlighted.feature = undefined;
          } else {
            Cesium.Color.clone(pick.color, selected.originalColor);
          }
          this.setState({
            showDetail: true,
            id: name,
            showHistory: false,
          });
          // console.log(this.state.WFid);
        }
      }
    }
  };

  showhistory = () => {
    this.setState({
      showHistory: true,
    });
  };

  closehistory = () => {
    this.setState({
      showHistory: false,
    });
  };

  handleHideBuildings = () => {
    this.model11.show = false;
  };

  handleShowBuildings = () => {
    if (this.model11) {
      this.model11.show = true;
    } else {
      const model11 = new Cesium.Cesium3DTileset({
        url: 'http://cdn.lesuidao.cn/ljz_714/tileset.json',
        maximumScreenSpaceError: 160, //细化程度的最大屏幕空间错误（提高清晰度）
        maximumMemoryUsage: 1024,
      });
      this.model11 = model11;
      model11.readyPromise
        .then(model11 => {
          this.modelRotation(model11, 5, 121.49892, 31.239405, -141.6177112372341);
          this.scene.primitives.add(model11);
        })
        .otherwise(function(error) {
          console.log(error);
        });
    }
  };

  // 幕墙信息
  handleShowGlassInfo = () => {
    this.setState({
      showGlassInfo: true,
    });
  };

  handleHideGlassInfo = () => {
    this.setState({
      showGlassInfo: false,
    });
  };

  // 建筑信息

  handleShowBuildInfo = () => {
    this.setState({
      showBuildInfo: true,
    });
  };

  handleHideBuildInfo = () => {
    this.setState({
      showBuildInfo: false,
    });
  };

  // 构件信息
  handleShowInfo = () => {
    this.setState({
      showMemberInfo: true,
    });
  };

  handleHideMemberInfo = () => {
    this.setState({
      showMemberInfo: false,
    });
  };

  closeInfo = () => {
    this.setState({
      showDetail: false,
    });
  };

  handleName = e => {
    console.log(e.target.value);
    this.setState({
      nameValue: e.target.value,
    });
    if (this.state.nameValue !== 'inskylab') {
      message.info('用户名错误，请重新输入');
    }
  };
  handlePass = e => {
    console.log(e.target.value);
    this.setState({
      PassValue: e.target.value,
    });
    if (this.state.nameValue !== '123456') {
      message.info('密码错误，请重新输入');
    }
  };

  handleClick = () => {
    message.info('登录成功');
  };

  // handleShowDetailInfo = () => {
  //   this.setState({
  //     showDetailInfo: true,
  //   });
  // };

  // handleHideDetailInfo = () => {
  //   this.setState({
  //     showDetailInfo: false
  //   })
  // }

  flyTO = target => {
    this.viewer.flyTo(target);
  };

  jydsPosition = () => {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(121.494521, 31.242109, 120.0), // 设置位置
      orientation: {
        heading: Cesium.Math.toRadians(100), // 方向
        pitch: Cesium.Math.toRadians(0), // 倾斜角度
        roll: 0,
      },
      duration: 2, // 设置飞行持续时间，默认会根据距离来计算
    });
  };

  componentDidMount() {
    // let script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = `https://cesium.com/downloads/cesiumjs/releases/1.70.1/Build/Cesium/Cesium.js`;
    // document.body.appendChild(script);
    const that = this;
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzYxYTk3My01YjI2LTRiZjktOGU5ZC00MDQxZTJjZTRkYmUiLCJpZCI6Mjg0NjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTEyNjM0NTh9.zXiMNn0iN0bPaIqze4z4OC50aiID0B8-2d59_LkV0QU';
    const viewer = new Cesium.Viewer('cesiumContainer', {
      bottomContainer: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: true,
      vrButton: false,
      infoBox: false,
    });
    // 设置模型灰度
    let layer0 = viewer.scene.imageryLayers.get(0);
    layer0.gamma = 0.88;
    // 隐藏页面控件
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    this.viewer = viewer;
    // 创建场景对象
    const scene = viewer.scene;
    this.scene = scene;
    // 场景的后期处理
    viewer.scene.postProcessStages.fxaa.enabled = true;
    // 添加贴图
    const jyds = new Cesium.Cesium3DTileset({
      url: 'http://cdn.lesuidao.cn/jydsformat/tileset.json',
      maximumScreenSpaceError: 16, //细化程度的最大屏幕空间错误（提高清晰度）
      maximumMemoryUsage: 1024,
    });
    this.jyds = jyds;
    jyds.readyPromise
      .then(jyds => {
        this.modelRotation(jyds, 50, 121.499487, 31.24127, 90.77);
        jyds.style = new Cesium.Cesium3DTileStyle({
          // show: true,
          color: {
            evaluateColor: function(feature, result) {
              const featureId = feature.getProperty('id');
              if (featureId.includes('GF')) {
                arrs.push(featureId);
                // that.setState({
                //   arrs,
                // });
                // 直接赋值
                that.state.arrs = arrs;
              } else if (featureId.includes('WF')) {
                WFarrs.push(featureId);
                that.state.WFarrs = WFarrs;
              }
              return Cesium.Color.clone(Cesium.Color.WHITE, result);
            },
          },
        });
        scene.primitives.add(jyds);
        // scene.primitives.add(model11);
      })
      .otherwise(function(error) {
        console.log(error);
      });

    that.setState({
      arrs,
      WFarrs,
    });

    // 跳转
    this.jydsPosition();

    // 定位
    // viewer.zoomTo(jyds);

    // 初始化选中和高光
    let selected = {
      feature: undefined,
      originalColor: new Cesium.Color(),
    };
    this.selected = selected;
    // 判断viewer是否支持高光
    if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
      let highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color(),
      };
      this.highlighted = highlighted;
    }
    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    // 鼠标移动事件
    handler.setInputAction(movement => {
      this.mouseMove(movement);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    // 鼠标左键事件
    handler.setInputAction(movement => {
      this.mouseLeftClick(movement);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  render() {
    // const layout = {
    //   labelCol: {
    //     span: 8,
    //   },
    //   wrapperCol: {
    //     span: 16,
    //   },
    // };
    return (
      // <div>
      //   <div
      //     style={{
      //       position: 'absolute',
      //       width: '100vw',
      //       height: '100vh',
      //       zIndex: 2,
      //       backgroundColor: 'white',
      //     }}
      //   >
      /* <Form {...layout} style={{paddingTop: '20%'}}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  max: 12,
                  min: 6,
                  pattern: [/a-zA-Z/g],
                  message: 'Please input your username!',
                }
              ]}
              style={{ width: 400 }}
            >
              <Input onChange={this.handleName}/>
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  max: 12,
                  min: 6,
                  pattern: [/a-zA-Z0-9/g],
                  message: 'Please input your password!',
                }
              ]}
              style={{ width: 400 }}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleClick}>
                登录
              </Button>
            </Form.Item>
          </Form> */
      //   <Input placeholder='用户名' style={{width: 300, marginBottom: 20}} maxLength={8} value={this.state.nameValue} onChange={this.handleName}/><br />
      //   <Input placeholder ='密码' style={{width: 300, marginBottom: 20}} maxLength={12} value={this.state.passValue} onChange={this.handlePass}/><br />
      //   <Button onClick={this.handleClick}>登录</Button>
      // </div>
      <div id="cesiumContainer" style={{ width: '100vw', height: '100vh' }}>
        {/* <div
            style={{
              position: 'absolute',
              color: 'white',
              textAlign: 'center',
              top: 20,
              fontSize: 18,
              fontWeight: 400,
              zIndex: 1,
              width: '100%',
            }}
          >
            内部信息，请勿外传！
          </div> */}
        {/* 交银大厦显示层 */}
        <Info
          style={{ position: 'absolute' }}
          viewer={this.viewer}
          jyds={this.jyds}
          model11={this.model11}
          scene={this.scene}
          arrs={this.state.arrs}
          WFarrs={this.state.WFarrs}
          showModel11={this.state.showModel11}
          handleHideBuildings={this.handleHideBuildings}
          handleShowBuildings={this.handleShowBuildings}
          handleShowGlassInfo={this.handleShowGlassInfo}
          handleShowBuildInfo={this.handleShowBuildInfo}
          handleShowInfo={this.handleShowInfo}
          jydsPosition={this.jydsPosition}
        />
        {/* 构件信息 */}
        {this.state.showDetail ? (
          <Card
            style={{ position: 'absolute' }}
            id={this.state.id}
            closeInfo={this.closeInfo}
            back={v => {
              this.setState({ glassID: v });
            }}
            showHistory={this.state.showHistory}
            showhistory={this.showhistory}
          />
        ) : (
          <div></div>
        )}
        {/* 历史图片 */}
        {this.state.showHistory ? (
          <History closehistory={this.closehistory} glassID={this.state.glassID} />
        ) : (
          <div></div>
        )}
        {/* 建筑信息 */}
        {this.state.showBuildInfo ? (
          <BuildInfo handleHideBuildInfo={this.handleHideBuildInfo} />
        ) : (
          <div></div>
        )}
        {/* 幕墙信息 */}
        {this.state.showGlassInfo ? (
          <GlassInfo handleHideGlassInfo={this.handleHideGlassInfo} />
        ) : (
          <div></div>
        )}
        {/* 构件信息 */}
        {this.state.showMemberInfo ? (
          <MemberInfo handleHideMemberInfo={this.handleHideMemberInfo} />
        ) : (
          <div></div>
        )}
        {/* 幕墙详细信息 */}
        {/* {this.state.showDetailInfo ? (
            <DetailInfo handleHideDetailInfo={this.handleHideDetailInfo} />
          ) : (
            <div></div>
          )} */}
      </div>
      // </div>
    );
  }
}

export default Map;
