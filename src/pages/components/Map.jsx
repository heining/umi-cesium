import React, { Component } from 'react';
import * as Cesium from 'cesium';
import Info from './Info/index';
import GlassInfo from './Info/GlassInfo';
import BuildInfo from './Info/BuildInfo';
import MemberInfo from './Info/MemberInfo';
import TableInsky from './TableInsky/index';
import Draggable from 'react-draggable';
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
      showtable: false,
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
        // console.log(name);
        if (name.includes('—')) {
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
    if (this.model11) {
      this.model11.show = false;
    }
    // 跳转到交银大厦的最佳视图
    this.flyTo(121.494521, 31.242109, 120.0, 100);
  };

  // 立面信息
  flyTo = (lon, lat, hight, heading) => {
    this.viewer.camera.flyTo({
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
  
  handleShowBuildings = () => {
    if (this.model11) {
      this.model11.show = true;
    } else {
      message.info('正在加载楼群，请稍等！')
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
    this.flyTo(121.486521, 31.243209, 120.0, 100);
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

  componentDidMount() {
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
    that.viewer = viewer;
    // 创建场景对象
    const scene = viewer.scene;
    that.scene = scene;
    // 场景的后期处理
    viewer.scene.postProcessStages.fxaa.enabled = true;
    // 添加贴图
    const jyds = new Cesium.Cesium3DTileset({
      url: 'http://cdn.lesuidao.cn/jydsformat/tileset.json',
      maximumScreenSpaceError: 16, //细化程度的最大屏幕空间错误（提高清晰度）
      maximumMemoryUsage: 1024,
    });
    that.jyds = jyds;
    jyds.readyPromise
      .then(jyds => {
        that.modelRotation(jyds, 50, 121.499487, 31.24127, 90.77);
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

    // that.setState({
    //   arrs,
    //   WFarrs,
    // });

    // 跳转
    that.jydsPosition();

    // 定位
    // viewer.zoomTo(jyds);

    // 初始化选中和高光
    let selected = {
      feature: undefined,
      originalColor: new Cesium.Color(),
    };
    that.selected = selected;
    // 判断viewer是否支持高光
    if (Cesium.PostProcessStageLibrary.isSilhouetteSupported(viewer.scene)) {
      let highlighted = {
        feature: undefined,
        originalColor: new Cesium.Color(),
      };
      that.highlighted = highlighted;
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

  selectGFColor = (target, floor) => {
    const that = this;
    let GFglass = [];
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (
            featureId.includes('GF') &&
            Number(
              featureId
                .split('—')[1]
                .split('F')[1]
                .split('001')[0],
            ) == floor
          ) {
            // GFglass.push(featureId);
            // GFglass = Array.from(new Set(GFglass));
            // that.setState({
            //   GFglass,
            // });
            return Cesium.Color.clone(Cesium.Color.YELLOW, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  // 设置选中同一层石材的颜色
  selectWFColor = (target, floor) => {
    const that = this;
    let WFglass = [];
    target.style = new Cesium.Cesium3DTileStyle({
      // show: true,
      color: {
        evaluateColor: function(feature, result) {
          const featureId = feature.getProperty('id');
          if (
            featureId.includes('WF') &&
            Number(
              featureId
                .split('—')[1]
                .split('F')[1]
                .split('001')[0],
            ) == floor
          ) {
            // WFglass.push(featureId);
            // WFglass = Array.from(new Set(WFglass));
            // that.setState({
            //   WFglass,
            // });
            return Cesium.Color.clone(Cesium.Color.BLUE, result);
          } else {
            return Cesium.Color.clone(Cesium.Color.WHITE, result);
          }
        },
      },
    });
  };

  // 表格显隐
  showTable = () => {
    this.setState({
      showtable: true,
    });
  };
  closeTable = () => {
    this.setState({
      showtable: false,
    });
  };

  render() {
    return (
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
          showtable={this.state.showtable}
          showModel11={this.state.showModel11}
          showTable={this.showTable}
          handleHideBuildings={this.handleHideBuildings}
          handleShowBuildings={this.handleShowBuildings}
          handleShowGlassInfo={this.handleShowGlassInfo}
          handleShowBuildInfo={this.handleShowBuildInfo}
          handleShowInfo={this.handleShowInfo}
          flyTo={this.flyTo}
          jydsPosition={this.jydsPosition}
          selectGFColor={e => {
            this.selectGFColor(this.jyds, e);
          }}
          selectWFColor={e => {
            this.selectWFColor(this.jyds, e);
          }}
          back={(data, date) => {
            this.setState({ data: data, date: date });
          }}
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

        {/* 详细表格 */}
        {this.state.showtable ? (
          <Draggable>
            <div className="infobox" style={{ right: 20, width: 600 }}>
              <div
                style={{
                  position: 'absolute',
                  right: 10,
                  marginBottom: 15,
                  top: 5,
                  cursor: 'pointer',
                }}
                onClick={this.closeTable}
              >
                X
              </div>
              <TableInsky data={this.state.data} date={this.state.date} style={{margin: 15}}/>
            </div>
          </Draggable>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Map;
