import styles from './index.css';
import 'cesium/Source/Widgets/widgets.css';
import Map from './components/Map';
// 指向cesium的地址
import buildModuleUrl from 'cesium/Source/Core/buildModuleUrl';
buildModuleUrl.setBaseUrl('../cesium');

export default function() {
  return ( 
    <Map />
  );
}
