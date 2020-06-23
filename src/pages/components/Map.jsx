import React, { Component } from 'react';
import * as Cesium from 'cesium';
import Select from './FloorSelect/index';
import Card from './Card/index';
import 'cesium/Source/Widgets/widgets.css';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      showDetail: false,
      id: 0,
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
        if (pick !== selected.feature) {
          highlighted.feature = pick;
          Cesium.Color.clone(pick.color, highlighted.originalColor);
          if (name.includes('-')) {
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
      // 判断pick是否为空
      if (Cesium.defined(pick)) {
        // 根据每块玻璃的ID区分
        const name = pick.getProperty('id');
        if (name.includes('-')) {
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
          });
        }
      }
    }
  };

  closeInfo = () => {
    this.setState({
      showDetail: false
    })
  }

  componentDidMount() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMzYxYTk3My01YjI2LTRiZjktOGU5ZC00MDQxZTJjZTRkYmUiLCJpZCI6Mjg0NjQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTEyNjM0NTh9.zXiMNn0iN0bPaIqze4z4OC50aiID0B8-2d59_LkV0QU';
    const viewer = new Cesium.Viewer('cesiumContainer', {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
    });
    // 隐藏页面控件
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    this.viewer = viewer;
    // 创建场景对象
    const scene = viewer.scene;
    this.scene = scene;
    // 添加贴图
    const prds = new Cesium.Cesium3DTileset({
      url: 'http://cdn.lesuidao.cn/prds3/tileset.json',
      maximumScreenSpaceError: 2, //细化程度的最大屏幕空间错误（提高清晰度）
    });
    this.prds = prds;
    prds.readyPromise
      .then(prds => {
        // 模型贴地
        // const translation = Cesium.Cartesian3.fromArray([0, 0, -25]);
        // const m = Cesium.Matrix4.fromTranslation(translation);
        // prds._modelMatrix = m;
        this.modelRotation(prds, 60, 121.532038, 31.210968, 18.5);
        viewer.scene.primitives.add(prds);
      })
      .otherwise(function(error) {
        console.log(error);
      });
    // 定位
    // viewer.zoomTo(prds);

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
        <Select
          style={{ position: 'absolute' }}
          viewer={this.viewer}
          prds={this.prds}
          scene={this.scene}
        />
        {this.state.showDetail ? (
          <Card style={{ position: 'absolute' }} id={this.state.id} closeInfo={this.closeInfo}/>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Map;
