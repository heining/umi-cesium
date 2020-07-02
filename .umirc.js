const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const path = require('path');

// ref: https://umijs.org/config/
export default {
  // copy: [
  //   { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
  //   { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
  //   { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
  // ],
  // define: {
  //   CESIUM_BASE_URL: JSON.stringify('')
  // },
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'umi-secium',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  externals: {
    cesium: 'Cesium',
  },
  // scripts: ['https://cesium.com/downloads/cesiumjs/releases/1.70.1/Build/Cesium/Cesium.js'],
  // 解决跨域问题的代理
  proxy: {
    '/api': {
      target: 'http://113.31.105.181:8180/',
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
  // 识别css文件
  cssLoaderOptions: {
    localIdentName: '[local]',
  },
};
