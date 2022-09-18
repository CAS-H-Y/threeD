<template>
  <div id="cesiumContainer">
    <div id="cesiumxin" style="position:fixed;left:0;z-index:99"><a href="http://cesium.xin" style="color:aliceblue;text-decoration:none">http://cesium.xin <label for="">cesium中文网 http://cesium.xin </label></a></div>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        // 版本号
        version: "3.8.3",
      };
    },
    methods: {
      goTarget(href) {
        window.open(href, "_blank");
      },
    },
    mounted() {
      var that = this
      //天地图影像
      // var TDL_YX = new Cesium.WebMapTileServiceImageryProvider({
      // url: 'https://t0.tianditu.gov.cn/cia_w/wmts
      //?service=WMTS&version=1.0.0&request=GetTile&tilematrix=6&layer=cia&style=default&tilerow=23
      //&tilecol=53&tilematrixset=w&format=tiles&tk=' + that.token,
      // url:'http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' +that.token,
      // layer: 'img',
      // style: 'default',
      // format: 'tiles',
      // tileMatrixSetID: 'w',
      // subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      // credit: new Cesium.Credit('天地图影像'),
      // maximumLevel: 18,
      // })
      //Google地形
      let GG_DX = new Cesium.UrlTemplateImageryProvider({
        url: 'https://webst02.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
        layer: 'tdtVecBasicLayer',
        style: 'default',
        format: 'image/png',
        tileMatrixSetID: 'GoogleMapsCompatible2',
        show: true,
      })
      //基本配置
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        baselLayerPicker: false,
        homeButton: false, //home键
        timeline: false, //时间轴
        animation: false, //动画
        // scene3DOnly: true,
        navigationHelpButton: false, //帮助信息
        fullscreenButton: false, //全屏显示
        geocoder: false, //地址编码
        baseLayerPicker: false, //图层选择控件
        // imageryProviderViewModels: this.getImageryProviderArr(), //获取或设置可用于图像选择的ProviderViewModel实例数组。
        // terrainProviderViewModels: this.getTerrainProviderViewModelsArr(), //获取或设置可用于地形选择的ProviderViewModel实例数组。
        infoBox: false, //点击要素之后浮窗
        sceneMode: Cesium.SceneMode.SCENE3D, // 初始化场景为3D、2.5D、2D
        sceneModePicker: false, //投影方式  三维/二维
        imageryProvider: GG_DX,
      })
      // 去除版权信息
      this.viewer._cesiumWidget._creditContainer.style.display = 'none'
      this.drawGraphicUtils = new this.DrawGraphicUtils(this.viewer)
      //将三维球定位到中国
      this.drawGraphicUtils.flyToInit();
    },
  };
</script>

