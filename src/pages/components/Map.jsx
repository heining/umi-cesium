import React, { Component } from 'react';
import * as Cesium from 'cesium';
import FloorSelect from './FloorSelect/index';
import Card from './Card/index';
import History from './Card/History';
import 'cesium/Source/Widgets/widgets.css';

const arrs = [];

class Map extends Component {
  constructor() {
    super();
    this.state = {
      showDetail: false,
      showHistory: false,
      id: 0,
      arrs: [],
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
        const name = pick.getProperty('id');
        // console.log(name)
        if (pick !== selected.feature) {
          highlighted.feature = pick;
          Cesium.Color.clone(pick.color, highlighted.originalColor);
          if (name.includes('GF')) {
            pick.color = Cesium.Color.YELLOW;
          }
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
      console.log(pick)
      // 判断pick是否为空
      if (Cesium.defined(pick)) {
        // 根据每块玻璃的ID区分
        const name = pick.getProperty('id');
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
        }
      }
    }
  };

  closeInfo = () => {
    this.setState({
      showDetail: false,
    });
  };

  showhistory = () => {
    this.setState({
      showHistory: true,
    });
  };

  closehistory = () => {
    this.setState({
      showHistory: false
    })
  }

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
      fullscreenButton: false,
      vrButton: false,
      infoBox: false,
    });
    // 隐藏页面控件
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    this.viewer = viewer;
    // 创建场景对象
    const scene = viewer.scene;
    this.scene = scene;
    // 场景的后期处理
    const postProcessStageCollection = new Cesium.PostProcessStageCollection({
      fxaa: true
    })
    scene.postProcessStages.add(postProcessStageCollection)
    // 添加贴图
    const jyds = new Cesium.Cesium3DTileset({
      url: 'http://cdn.lesuidao.cn/jyds8/tileset.json',
      maximumScreenSpaceError: 4, //细化程度的最大屏幕空间错误（提高清晰度）
      maximumMemoryUsage: 1024,
      dynamicScreenSpaceError: true
    });
    const model11 = new Cesium.Cesium3DTileset({
      url: 'http://cdn.lesuidao.cn/11/tileset.json',
      maximumScreenSpaceError: 160, //细化程度的最大屏幕空间错误（提高清晰度）
      maximumMemoryUsage: 1024,
      dynamicScreenSpaceError: true,
      dynamicScreenSpaceErrorDensity: 3
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
                that.setState({
                  arrs,
                });
              }
              return Cesium.Color.clone(Cesium.Color.WHITE, result);
            },
          },
        });
        scene.primitives.add(jyds);
        scene.primitives.add(model11);
      })
      .otherwise(function(error) {
        console.log(error);
      });
      model11.readyPromise
      .then(model11 => {
        this.modelRotation(model11, 5, 121.498920, 31.239405, -141.6177112372341);
        scene.primitives.add(model11);
      })
      .otherwise(function(error) {
        console.log(error);
      });
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
    return (
      <div id="cesiumContainer" style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <div
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
        </div>
        <FloorSelect
          style={{ position: 'absolute' }}
          viewer={this.viewer}
          jyds={this.jyds}
          scene={this.scene}
          arrs={this.state.arrs}
        />
        {/* 详细信息 */}
        {this.state.showDetail ? (
          <Card style={{ position: 'absolute' }} id={this.state.id} closeInfo={this.closeInfo} showHistory={this.state.showHistory} showhistory={this.showhistory}/>
        ) : (
          <div></div>
        )}
        {/* 历史图片 */}
        {this.state.showHistory ? <History closehistory={this.closehistory} /> : <div></div>}
      </div>
    );
  }
}

export default Map;
