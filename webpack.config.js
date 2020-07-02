/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
  externals: {
    cesium: 'Cesium',
  },
  scripts: [
    'https://cesium.com/downloads/cesiumjs/releases/1.70.1/Build/Cesium/Cesium.js',
  ]
};
