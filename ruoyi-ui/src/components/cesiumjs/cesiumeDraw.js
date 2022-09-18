// /**绘制几何图形的工具类 */
// import * as Cesium from 'cesium/Cesium'
// import 'cesium/Widgets/widgets.css'
// export default class DrawGraphicUtils {
//   /**
//    　　　* 构造函数-经纬度坐标传值
//    　　　* @param {三维视图实例} _viewer
//    　　 　*/
//   constructor(_viewer) {
//     //三维视图实例
//     this.viewer = _viewer
//     //以经纬度对象形式记录当前几何对象的顶点坐标
//     this.lonlatCollection = []
//     //以entity实体形式记录点线面要素
//     this.vertexCollection = [] //顶点集合
//     this.lineCollection = [] //线集合
//     this.graphicsCollection = [] //多边形集合
//     this.entityCollection = [] //所有实体集合
//     //viewer事件处理句柄
//     //获取viewer事件处理句柄
//     this.handlerDrawRectangle = new Cesium.ScreenSpaceEventHandler(
//       this.viewer.scene.canvas //画布实例
//     )
//     //注册鼠标左键点击事件
//     this.handlerDrawPolygon = new Cesium.ScreenSpaceEventHandler(
//       this.viewer.scene.canvas
//     )
//     // 测量实体
//     this.distanceEntities = [] //测量实体集合
//     this.pointNum = 0
//     this.floatingPoint = undefined
//     this.activeShape = undefined
//     var activeShapePoints = [];
//     var activeShape;
//     var floatingPoint;
//   }
//
//   // -----------start draw-------------  //
//   //第一种
//   //画点
//   drawPoint(callback) {
//     var _this = this
//     //坐标存储
//     var positions = []
//
//     var handler = new Cesium.ScreenSpaceEventHandler(
//       _this.viewer.scene.canvas
//     )
//
//     //单击鼠标左键画点
//     handler.setInputAction(function (movement) {
//       var cartesian = _this.viewer.scene.camera.pickEllipsoid(
//         movement.position,
//         _this.viewer.scene.globe.ellipsoid
//       )
//       positions.push(cartesian)
//       _this.viewer.entities.add({
//         id: 'Point',
//         position: cartesian,
//         point: {
//           color: Cesium.Color.SKYBLUE,
//           pixelSize: 10,
//           outlineColor: Cesium.Color.YELLOW,
//           outlineWidth: 3,
//           disableDepthTestDistance: Number.POSITIVE_INFINITY,
//           heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//         },
//       })
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//
//     //单击鼠标右键结束画点
//     handler.setInputAction(function (movement) {
//       handler.destroy()
//       callback(positions)
//     }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
//   }
//
//   //画线
//   drawLineString(callback) {
//     var _this = this
//     var PolyLinePrimitive = (function () {
//       function _(positions) {
//         this.options = {
//           polyline: {
//             show: true,
//             positions: [],
//             material: Cesium.Color.RED,
//             width: 3,
//           },
//         }
//         this.positions = positions
//         this._init()
//       }
//
//       _.prototype._init = function () {
//         var _self = this
//         var _update = function () {
//           return _self.positions
//         }
//         //实时更新polyline.positions
//         this.options.polyline.positions = new Cesium.CallbackProperty(
//           _update,
//           false
//         )
//         _this.viewer.entities.add(this.options)
//       }
//       return _
//     })()
//
//     var handler = new Cesium.ScreenSpaceEventHandler(
//       _this.viewer.scene.canvas
//     )
//     var positions = []
//     var poly = undefined
//     //鼠标左键单击画点
//     handler.setInputAction(function (movement) {
//       var cartesian = _this.viewer.scene.camera.pickEllipsoid(
//         movement.position,
//         _this.viewer.scene.globe.ellipsoid
//       )
//       if (positions.length == 0) {
//         positions.push(cartesian.clone())
//       }
//       positions.push(cartesian)
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//     //鼠标移动
//     handler.setInputAction(function (movement) {
//       var cartesian = _this.viewer.scene.camera.pickEllipsoid(
//         movement.endPosition,
//         _this.viewer.scene.globe.ellipsoid
//       )
//       if (positions.length >= 2) {
//         if (!Cesium.defined(poly)) {
//           poly = new PolyLinePrimitive(positions)
//         } else {
//           if (cartesian != undefined) {
//             positions.pop()
//             cartesian.y += 1 + Math.random()
//             positions.push(cartesian)
//           }
//         }
//       }
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//     //单击鼠标右键结束画线
//     handler.setInputAction(function (movement) {
//       handler.destroy()
//       callback(positions)
//     }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
//   }
//
//   //画面
//   drawPolygons(callback) {
//     var _this = this
//     var PolygonPrimitive = (function () {
//       function _(positions) {
//         this.options = {
//           name: '多边形',
//           polygon: {
//             hierarchy: [],
//             perPositionHeight: true,
//             material: Cesium.Color.RED.withAlpha(0.4),
//           },
//         }
//         this.hierarchy = new Cesium.PolygonHierarchy(positions)
//         this._init()
//       }
//
//       _.prototype._init = function () {
//         var _self = this
//         var _update = function () {
//           return _self.hierarchy
//         }
//         //实时更新polygon.hierarchy
//         this.options.polygon.hierarchy = new Cesium.CallbackProperty(
//           _update,
//           false
//         )
//         _this.viewer.entities.add(this.options)
//       }
//       return _
//     })()
//     var handler = new Cesium.ScreenSpaceEventHandler(
//       _this.viewer.scene.canvas
//     )
//     var positions = []
//     var poly = undefined
//
//     //鼠标单击画点
//     handler.setInputAction(function (movement) {
//       var cartesian = _this.viewer.scene.camera.pickEllipsoid(
//         movement.position,
//         _this.viewer.scene.globe.ellipsoid
//       )
//       _this.viewer.entities.add({
//         name: 'point',
//         position: cartesian,
//         point: {
//           color: Cesium.Color.WHEAT,
//           pixelSize: 5,
//           outlineWidth: 3,
//           disableDepthTestDistance: Number.POSITIVE_INFINITY,
//           heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
//         },
//       })
//       if (positions.length == 0) {
//         positions.push(cartesian.clone())
//       }
//       positions.push(cartesian)
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//     //鼠标移动
//     handler.setInputAction(function (movement) {
//       var cartesian = _this.viewer.scene.camera.pickEllipsoid(
//         movement.endPosition,
//         _this.viewer.scene.globe.ellipsoid
//       )
//       if (positions.length >= 2) {
//         if (!Cesium.defined(poly)) {
//           poly = new PolygonPrimitive(positions)
//         } else {
//           if (cartesian != undefined) {
//             positions.pop()
//             cartesian.y += 1 + Math.random()
//             positions.push(cartesian)
//
//           }
//         }
//       }
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//     //鼠标右键单击结束绘制
//     handler.setInputAction(function (movement) {
//       handler.destroy()
//       callback(positions)
//     }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
//   }
//
//   //画圆
//   drawCircle(_callBack) {
//     let _self = this
//     _self.viewer.scene.globe.depthTestAgainstTerrain = true
//     _self.circle = {
//       points: [],
//       rect: null,
//       entity: null,
//       r: 1,
//     }
//     var tempPosition
//     let cartographic1
//     let p
//     let tempLon
//     let tempLat
//     var ShapeEventHandler = new Cesium.ScreenSpaceEventHandler(
//       _self.viewer.scene.canvas
//     )
//     ShapeEventHandler.setInputAction(function (click) {
//       tempPosition = _self.getPointFromWindowPoint(click.position)
//       //选择的点在球面上
//       if (tempPosition) {
//         function callBackPos() {
//           if (_self.circle.points.length == 0) {
//             return
//           }
//           const minlon = Cesium.Math.toDegrees(
//             _self.circle.points[0].longitude
//           )
//           const minlat = Cesium.Math.toDegrees(
//             _self.circle.points[0].latitude
//           )
//           const maxlon = Cesium.Math.toDegrees(
//             _self.circle.points[1].longitude
//           )
//           const maxlat = Cesium.Math.toDegrees(
//             _self.circle.points[1].latitude
//           )
//           const r = _self.getFlatternDistance(minlat, minlon, maxlat, maxlon)
//           if (r) {
//             return r
//           }
//           return 1
//         }
//
//         if (_self.circle.points.length == 0) {
//           p = click.position
//           cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(tempPosition)
//           _self.circle.points.push(
//             _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
//               tempPosition
//             )
//           )
//           _self.circle.points.push(
//             _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
//               tempPosition
//             )
//           )
//           tempLon = Cesium.Math.toDegrees(cartographic1.longitude)
//           tempLat = Cesium.Math.toDegrees(cartographic1.latitude)
//           //移除所有实体Entity
//           // _self.viewer.entities.removeAll()
//           _self.circle.entity = _self.viewer.entities.add({
//             position: Cesium.Cartesian3.fromDegrees(tempLon, tempLat),
//             ellipse: {
//               semiMinorAxis: new Cesium.CallbackProperty(callBackPos, false),
//               semiMajorAxis: new Cesium.CallbackProperty(callBackPos, false),
//               //条形材质
//               material: Cesium.Color.RED.withAlpha(0.3),
//             },
//           })
//         } else {
//           ShapeEventHandler.removeInputAction(
//             Cesium.ScreenSpaceEventType.MOUSE_MOVE
//           )
//           ShapeEventHandler.removeInputAction(
//             Cesium.ScreenSpaceEventType.LEFT_CLICK
//           )
//           var tempCircle = new Cesium.CircleOutlineGeometry({
//             center: Cesium.Cartesian3.fromDegrees(tempLon, tempLat),
//             radius: callBackPos(),
//             granularity: Math.PI / 2,
//           })
//           var geometry = Cesium.CircleOutlineGeometry.createGeometry(tempCircle)
//           var float64ArrayPositionsIn = geometry.attributes.position.values
//           var positionsIn = [].slice.call(float64ArrayPositionsIn)
//           _callBack(positionsIn)
//         }
//       }
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//     ShapeEventHandler.setInputAction(function (movement) {
//       if (_self.circle.points.length == 0) {
//         return
//       }
//       var moveEndPosition = _self.getPointFromWindowPoint(
//         movement.endPosition
//       )
//       console.log('moveEndPosition:', _self.circle.points)
//       //选择的点在球面上
//       if (moveEndPosition) {
//         _self.circle.points.pop()
//         _self.circle.points.push(
//           _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
//             moveEndPosition
//           )
//         )
//       }
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//   }
//
//   //画矩形
//   drawRect(callback) {
//     let _self = this
//     let pointsArr = []
//     _self.shape = {
//       points: [],
//       rect: null,
//       entity: null,
//     }
//     var tempPosition
//     var handle = new Cesium.ScreenSpaceEventHandler(_self.viewer.scene.canvas)
//     //鼠标左键单击画点
//     handle.setInputAction(function (click) {
//
//       tempPosition = _self.getPointFromWindowPoint(click.position)
//
//       //选择的点在球面上
//       if (tempPosition) {
//         var cartesian = _self.viewer.scene.camera.pickEllipsoid(
//           click.position,
//           _self.viewer.scene.globe.ellipsoid
//         )
//         _self.viewer.entities.add({
//           name: 'Point',
//           position: cartesian,
//           point: {
//             color: Cesium.Color.WHEAT,
//             pixelSize: 5,
//             outlineWidth: 3,
//             disableDepthTestDistance: Number.POSITIVE_INFINITY,
//             heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
//           },
//         })
//         pointsArr.push(tempPosition)
//         if (_self.shape.points.length == 0) {
//           _self.shape.points.push(
//             _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
//               tempPosition
//             )
//           )
//           _self.shape.rect = Cesium.Rectangle.fromCartographicArray(
//             _self.shape.points
//           )
//           _self.shape.rect.east += 0.000001
//           _self.shape.rect.north += 0.000001
//           _self.shape.entity = _self.viewer.entities.add({
//             name: '矩形',
//             rectangle: {
//               coordinates: _self.shape.rect,
//               material: Cesium.Color.RED.withAlpha(0.4),
//               outline: true,
//               outlineWidth: 2,
//               outlineColor: Cesium.Color.RED,
//               height: 999,
//             },
//           })
//           _self.bufferEntity = _self.shape.entity
//         } else {
//           handle.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//           handle.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
//           callback(pointsArr)
//         }
//       }
//     }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//     //鼠标移动
//     handle.setInputAction(function (movement) {
//       if (_self.shape.points.length == 0) {
//         return
//       }
//       var moveEndPosition = _self.getPointFromWindowPoint(
//         movement.endPosition
//       )
//       //选择的点在球面上
//       if (moveEndPosition) {
//         pointsArr[1] = moveEndPosition
//         _self.shape.points[1] = _self.viewer.scene.globe.ellipsoid.cartesianToCartographic(
//           moveEndPosition
//         )
//         _self.shape.rect = Cesium.Rectangle.fromCartographicArray(
//           _self.shape.points
//         )
//         if (_self.shape.rect.west == _self.shape.rect.east)
//           _self.shape.rect.east += 0.000001
//         if (_self.shape.rect.south == _self.shape.rect.north)
//           _self.shape.rect.north += 0.000001
//         _self.shape.entity.rectangle.coordinates = _self.shape.rect
//       }
//     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//   }
//
//   getPointFromWindowPoint(point) {
//     if (
//       this.viewer.scene.terrainProvider.constructor.name ==
//       'EllipsoidTerrainProvider'
//     ) {
//       return this.viewer.camera.pickEllipsoid(
//         point,
//         this.viewer.scene.globe.ellipsoid
//       )
//     } else {
//       var ray = this.viewer.scene.camera.getPickRay(point)
//       return this.viewer.scene.globe.pick(ray, this.viewer.scene)
//     }
//   }
//
//   //笛卡尔坐标系转WGS84坐标系
//   Cartesian3_to_WGS84(point) {
//     var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z)
//     var cartographic = Cesium.Cartographic.fromCartesian(cartesian33)
//     var lat = Cesium.Math.toDegrees(cartographic.latitude)
//     var lng = Cesium.Math.toDegrees(cartographic.longitude)
//     var alt = cartographic.height
//     // return {
//     // lat: lat,
//     // lng: lng,
//     // alt: alt
//     // }
//     return [lng, lat]
//   }
//
//   //WGS84坐标系转笛卡尔坐标系
//   WGS84_to_Cartesian3(point) {
//     var car33 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt)
//     var x = car33.x
//     var y = car33.y
//     var z = car33.z
//     return {
//       x: x,
//       y: y,
//       z: z
//     }
//   }
//
//   //计算两点间距离
//   getFlatternDistance(lat1, lng1, lat2, lng2) {
//     var EARTH_RADIUS = 6378137.0 //单位M
//     var PI = Math.PI
//
//     function getRad(d) {
//       return (d * PI) / 180.0
//     }
//
//     var f = getRad((lat1 + lat2) / 2)
//     var g = getRad((lat1 - lat2) / 2)
//     var l = getRad((lng1 - lng2) / 2)
//
//     var sg = Math.sin(g)
//     var sl = Math.sin(l)
//     var sf = Math.sin(f)
//
//     var s, c, w, r, d, h1, h2
//     var a = EARTH_RADIUS
//     var fl = 1 / 298.257
//
//     sg = sg * sg
//     sl = sl * sl
//     sf = sf * sf
//
//     s = sg * (1 - sl) + (1 - sf) * sl
//     c = (1 - sg) * (1 - sl) + sf * sl
//
//     w = Math.atan(Math.sqrt(s / c))
//     r = Math.sqrt(s * c) / w
//     d = 2 * w * a
//     h1 = (3 * r - 1) / 2 / c
//     h2 = (3 * r + 1) / 2 / s
//
//     return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
//   }
//
//   /**
//    　　　　* 中心点半径画圆
//    　　　　*/
//   centerCricleEntitie(centeX, centeY, radius) {
//     let minlat = centeY
//     let minlon = centeX
//     let maxlat = centeY - radius / 2
//     let maxlon = centeX - radius / 2
//     let promise = this.viewer.entities.add({
//       name: '圆形区域',
//       position: Cesium.Cartesian3.fromDegrees(centeX, centeY, 0),
//       id: 'cricle',
//       ellipse: {
//         semiMajorAxis: this.getFlatternDistance(
//           minlat,
//           minlon,
//           maxlat,
//           maxlon
//         ),
//         semiMinorAxis: this.getFlatternDistance(
//           minlat,
//           minlon,
//           maxlat,
//           maxlon
//         ),
//         material: Cesium.Color.RED.withAlpha(0.3),
//       },
//     })
//     return promise
//   }
//
//   //第二种
//   /**
//    　　　　* 根据类型绘制对象
//    　　　　* @param type point、polyline、polygon、rectangle
//    　　　　*/
//   draw(type, callback) {
//     //绘制点
//     let that = this
//     let viewer = this.viewer
//     let tempEntities = []
//     let position = []
//     let tempPoints = []
//     let floatingPoint = this.floatingPoint
//     let activeShape = this.activeShape
//     let activeShapePoints = []
//     var we = []
//     var ns = []
//     // 开启深度检测
//     viewer.scene.globe.depthTestAgainstTerrain = true
//     let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
//     switch (type) {
//       case 'point':
//         // 监听鼠标左键
//         handler.setInputAction(function (movement) {
//           // 从相机位置通过windowPosition 世界坐标中的像素创建一条射线。返回Cartesian3射线的位置和方向。
//           let ray = viewer.camera.getPickRay(movement.position)
//           // 查找射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3对象
//           position = viewer.scene.globe.pick(ray, viewer.scene)
//           let point = that.drawPoint2(position)
//           tempEntities.push(point)
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         // 左键双击停止绘制
//         handler.setInputAction(function () {
//           handler.destroy() //关闭事件句柄
//           handler = null
//         }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
//         // 右击单击停止绘制
//         handler.setInputAction(function () {
//           handler.destroy() //关闭事件句柄
//           handler = null
//         }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
//         break
//       case 'polyline':
//         //鼠标移动事件
//         handler.setInputAction(function (movement) {
//             if (Cesium.defined(floatingPoint)) {
//               var newPosition = viewer.scene.pickPosition(movement.endPosition)
//               if (Cesium.defined(newPosition)) {
//                 floatingPoint.position.setValue(newPosition)
//                 activeShapePoints.pop()
//                 activeShapePoints.push(newPosition)
//               }
//             }
//           },
//           Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//         //左键点击操作
//         handler.setInputAction(function (click) {
//           let earthPosition = viewer.scene.pickPosition(click.position)
//           // if (Cesium.defined(earthPosition)) {
//           // if (activeShapePoints.length === 0) {
//           // floatingPoint = that.drawPoint2(earthPosition)
//           // activeShapePoints.push(earthPosition)
//           // var dynamicPositions = new Cesium.CallbackProperty(function () {
//           // return activeShapePoints
//           // }, false)
//           // activeShape = that.drawPolyline(dynamicPositions)
//           // }
//           // activeShapePoints.push(earthPosition)
//           // }
//           if (Cesium.defined(earthPosition)) {
//             floatingPoint = that.drawPoint2(earthPosition)
//             activeShapePoints.push(earthPosition)
//             var dynamicPositions = new Cesium.CallbackProperty(function () {
//               return activeShapePoints
//             }, false)
//             activeShape = that.drawPolyline(dynamicPositions) //绘制动态图
//           }
//           // 获取位置信息
//           // 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标,返回Cartesian3坐标
//           let ray = viewer.camera.getPickRay(click.position)
//           // 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3坐标
//           position = viewer.scene.globe.pick(ray, viewer.scene)
//           tempPoints.push(position) // 记录点位
//           that.pointNum += 1
//           let tempLength = tempPoints.length // 记录点数
//           // //调用绘制点的接口
//           let point = that.drawPoint2(tempPoints[tempPoints.length - 1])
//           tempEntities.push(point)
//           // 存在超过一个点时
//           if (tempLength > 1) {
//             let pointline = that.drawPolyline([
//               tempPoints[tempPoints.length - 2],
//               tempPoints[tempPoints.length - 1],
//             ])
//             tempEntities.push(pointline) // 保存记录
//           }
//           // //调用获取位置信息的接口
//           // let ray = viewer.camera.getPickRay(click.position)
//           // position = viewer.scene.globe.pick(ray, viewer.scene)
//           // tempPoints.push(position)
//           // let tempLength = tempPoints.length
//           // //调用绘制点的接口
//           // let point = that.drawPoint2(tempPoints[tempPoints.length - 1])
//           // tempEntities.push(point)
//           // if (tempLength > 1) {
//           // let pointline = that.drawPolyline([
//           // tempPoints[tempPoints.length - 2],
//           // tempPoints[tempPoints.length - 1],
//           // ])
//           // tempEntities.push(pointline)
//           // } else {
//           // // tooltip.innerHTML = "请绘制下一个点，右键结束";
//           // }
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         //右键点击操作
//         handler.setInputAction(function (click) {
//           tempPoints = []
//           handler.destroy() //关闭事件句柄
//           handler = null
//         }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
//         break
//       case 'polygon':
//         console.log('polygon')
//         //鼠标移动事件
//         handler.setInputAction(function (movement) {
//             if (Cesium.defined(floatingPoint)) {
//               var newPosition = viewer.scene.pickPosition(movement.endPosition)
//               if (Cesium.defined(newPosition)) {
//                 floatingPoint.position.setValue(newPosition)
//                 activeShapePoints.pop()
//                 activeShapePoints.push(newPosition)
//               }
//             }
//           },
//           Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//         //左键点击操作
//         handler.setInputAction(function (click) {
//           let earthPosition = viewer.scene.pickPosition(click.position)
//           if (Cesium.defined(earthPosition)) {
//             if (activeShapePoints.length === 0) {
//               floatingPoint = that.drawPoint2(earthPosition)
//               activeShapePoints.push(earthPosition)
//               const dynamicPositions = new Cesium.CallbackProperty(
//                 function () {
//                   return new Cesium.PolygonHierarchy(activeShapePoints)
//                 },
//                 false
//               )
//               // floatingPoint.label = {
//               // text: '点击添加下一个点\n右键结束绘制',
//               // show: true,
//               // showBackground: true,
//               // font: '14px monospace',
//               // backgroundPadding: new Cesium.Cartesian3(10, 10),
//               // pixelOffset: new Cesium.Cartesian3(20, 20),
//               // backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.9),
//               // horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
//               // verticalOrigin: Cesium.VerticalOrigin.LEFT,
//               // }
//               activeShape = that.drawPolygon2(dynamicPositions)
//
//             }
//             activeShapePoints.push(earthPosition)
//           }
//           //调用获取位置信息的接口
//           let ray = viewer.camera.getPickRay(click.position)
//           position = viewer.scene.globe.pick(ray, viewer.scene)
//           tempPoints.push(position)
//           let tempLength = tempPoints.length
//           //调用绘制点的接口
//           let point = that.drawPoint2(position)
//           tempEntities.push(point)
//           if (tempLength > 1) {
//             let pointline = that.drawPolyline([
//               tempPoints[tempPoints.length - 2],
//               tempPoints[tempPoints.length - 1],
//             ])
//             tempEntities.push(pointline)
//           } else {
//             // tooltip.innerHTML = "请绘制下一个点，右键结束";
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         //右键点击操作
//         handler.setInputAction(function (click) {
//           let cartesian = viewer.camera.pickEllipsoid(
//             click.position,
//             viewer.scene.globe.ellipsoid
//           )
//
//           if (cartesian) {
//             let tempLength = tempPoints.length
//             if (tempLength < 3) {
//               alert('请选择3个以上的点再执行闭合操作命令')
//             } else {
//               //闭合最后一条线
//               let pointline = that.drawPolyline([
//                 tempPoints[tempPoints.length - 1],
//                 tempPoints[0],
//               ])
//               tempEntities.push(pointline)
//               that.drawPolygon2(tempPoints)
//
//               tempEntities.push(tempPoints)
//
//               handler.destroy() //关闭事件句柄
//               handler = null
//
//               activeShapePoints.pop() //去除最后一个动态点
//               tempPoints.pop() //去除最后一个
//               viewer.entities.remove(floatingPoint) //去除动态点图形（当前鼠标点）
//               floatingPoint = undefined
//               activeShape = undefined
//               activeShapePoints = []
//               callback(tempPoints)
//             }
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
//         break
//       case 'rectangle':
//         //双击鼠标左键清除默认事件
//         viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
//           Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
//         )
//         //鼠标左键
//         handler.setInputAction(function (event) {
//           // 我们在这里使用“viewer.scene.pickPosition”而不是“viewer.camera.pick椭球体”
//           // 我们在地形上移动时得到了正确的点。
//           var earthPosition = viewer.scene.pickPosition(event.position)
//           // `如果我们的鼠标不在地球上，地球位置将是不确定的
//           if (Cesium.defined(earthPosition)) {
//             if (activeShapePoints.length === 0) {
//               floatingPoint = that.drawPoint2(earthPosition)
//               activeShapePoints.push(earthPosition)
//               var dynamicPositions = new Cesium.CallbackProperty(function () {
//                 return activeShapePoints
//               }, false)
//               // floatingPoint.label = {
//               // text: '双击左键结束绘制',
//               // show: true,
//               // showBackground: true,
//               // font: '14px monospace',
//               // backgroundPadding: new Cesium.Cartesian3(10, 10),
//               // pixelOffset: new Cesium.Cartesian3(20, 20),
//               // backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.9),
//               // horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
//               // verticalOrigin: Cesium.VerticalOrigin.LEFT,
//               // }
//               activeShape = that.drawRectangle2(dynamicPositions) //绘制动态图
//             }
//             activeShapePoints.push(earthPosition)
//             that.drawPoint2(earthPosition)
//             /* console.log(earthPosition, '笛卡尔')
//             　　　　　　　　　　　　　　//将笛卡尔坐标转换为地理坐标
//             　　　　　　　　　　　　　　var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(earthPosition)
//             　　　　　　　　　　　　　　//将弧度转为度的十进制度表示
//             　　　　　　　　　　　　　　var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
//             　　　　　　　　　　　　　　var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
//             　　　　　　　　　　　　　　we.push(longitudeString)
//             　　　　　　　　　　　　　　ns.push(latitudeString)
//             　　　　　　　　　　　　　　//获取相机高度
//             　　　　　　　　　　　　　　var height = Math.ceil(viewer.camera.positionCartographic.height)
//             　　　　　　　　　　　　　　console.log('(' +longitudeString +', ' +latitudeString +',' +height +')弧度')
//             　　　　　　　　　　　　　　ns.sort(function (a, b) {return a - b})
//             　　　　　　　　　　　　　　we.sort(function (a, b) {return a - b})
//             　　　　　　　　　　　　　　var east = we[0]
//             　　　　　　　　　　　　　　var west = we[we.length - 1]
//             　　　　　　　　　　　　　　var south = ns[0]
//             　　　　　　　　　　　　　　var north = ns[ns.length - 1]
//             　　　　　　　　　　　　　　console.log(we, east, west)
//             　　　　　　　　　　　　　　console.log(ns, south, north) */
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         //鼠标移动
//         handler.setInputAction(function (event) {
//           if (Cesium.defined(floatingPoint)) {
//             var newPosition = viewer.scene.pickPosition(event.endPosition)
//             if (Cesium.defined(newPosition)) {
//               floatingPoint.position.setValue(newPosition)
//               activeShapePoints.pop()
//               activeShapePoints.push(newPosition)
//             }
//           }
//         }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//         //鼠标左键双击
//         handler.setInputAction(function (event) {
//           // 重新绘制形状，使其不是动态的，然后删除动态形状
//           // 选择一个椭球或地图
//           let cartesian = viewer.camera.pickEllipsoid(
//             event.position,
//             viewer.scene.globe.ellipsoid
//           )
//           if (cartesian) {
//             if (activeShapePoints.length) {
//               viewer.entities.remove(activeShape) //去除动态图形
//               // viewer.entities.remove(floatingPoint)
//               that.drawRectangle2(activeShapePoints) //绘制最终图
//               handler.destroy()
//               handler = null
//               callback(activeShapePoints)
//             }
//           } else {
//             activeShapePoints.pop() //去除最后一个动态点
//             // viewer.entities.remove(floatingPoint) //去除动态点图形（当前鼠标点）
//             floatingPoint = undefined
//             activeShape = undefined
//             activeShapePoints = []
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
//         break
//     }
//   }
//
//   // 绘制点
//   drawPoint2(position, config) {
//     let viewer = this.viewer
//     let config_ = config ? config : {}
//     return viewer.entities.add({
//       name: '点几何对象',
//       position: position,
//       point: {
//         color: Cesium.Color.SKYBLUE,
//         pixelSize: 10,
//         outlineColor: Cesium.Color.YELLOW,
//         outlineWidth: 3,
//         disableDepthTestDistance: Number.POSITIVE_INFINITY,
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//       },
//     })
//   }
//
//   //绘制线
//   drawPolyline(positions, config_) {
//     let viewer = this.viewer
//     if (positions.length < 1) return
//     let config = config_ ? config_ : {}
//     return viewer.entities.add({
//       name: '线几何对象',
//       polyline: {
//         positions: positions,
//         width: config.width ? config.width : 5.0,
//         material: new Cesium.PolylineGlowMaterialProperty({
//           color: config.color ?
//             new Cesium.Color.fromCssColorString(config.color) : Cesium.Color.GOLD,
//         }),
//         depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
//           color: config.color ?
//             new Cesium.Color.fromCssColorString(config.color) : Cesium.Color.GOLD,
//         }),
//         clampToGround: true,
//       },
//     })
//   }
//
//   //面
//   drawPolygon2(positions, config_) {
//     console.log("面数据：", positions)
//     let viewer = this.viewer
//     if (positions.length < 2) return
//     let config = config_ ? config_ : {}
//     return viewer.entities.add({
//       name: '面几何对象',
//       polygon: {
//         hierarchy: positions,
//         material: config.color ?
//           new Cesium.Color.fromCssColorString(config.color).withAlpha(0.2) : new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.2),
//       },
//     })
//   }
//
//   //矩形
//   drawRectangle2(positions, config_) {
//     let viewer = this.viewer
//     //当positions为数组时绘制最终图，如果为function则绘制动态图
//     var arr = typeof positions.getValue === 'function' ? positions.getValue(0) : positions
//     if (positions.length < 2) return
//     let config = config_ ? config_ : {}
//     return viewer.entities.add({
//       name: '矩形几何对象',
//       rectangle: {
//         coordinates: new Cesium.CallbackProperty(function () {
//           var obj = Cesium.Rectangle.fromCartesianArray(arr)
//           //if(obj.west==obj.east){ obj.east+=0.000001};
//           //if(obj.south==obj.north){obj.north+=0.000001};
//           return obj
//         }, false),
//         // material: Cesium.Color.RED.withAlpha(0.5),
//         material: config.color ? new Cesium.Color.fromCssColorString(config.color).withAlpha(0.2) : new Cesium.Color.fromCssColorString('#FFD700').withAlpha(0.2),
//       },
//     })
//   }
//
//   /**
//    　　　　* 清除实体
//    　　　　*/
//   clearDrawEntities() {
//     let viewer = this.viewer
//     this.tempEntities = []
//     // 清除之前的实体
//     const entitys = viewer.entities._entities._array
//     let length = entitys.length
//     // 倒叙遍历防止实体减少之后entitys[f]不存在
//     for (let f = length - 1; f >= 0; f--) {
//       if (
//         entitys[f]._name &&
//         (entitys[f]._name === '点几何对象' ||
//           entitys[f]._name === '线几何对象' ||
//           entitys[f]._name === '面几何对象' ||
//           entitys[f]._name === '矩形几何对象')
//       ) {
//         viewer.entities.remove(entitys[f])
//       }
//     }
//   }
//
//   // -----------end draw------------- //
//
//   // -----------start 测量------------- //
//   /* 根据类型绘制对象
//   　　　　* @param type point polyline polygon */
//   distancehandler(type) {
//     let that = this
//     let viewer = this.viewer
//     // let pointNum = this.pointNum
//     // console.log(pointNum)
//     let distanceEntities = this.distanceEntities
//     let floatingPoint = this.floatingPoint
//     let activeShape = this.activeShape
//     let position = []
//     let tempPoints = []
//     let activeShapePoints = []
//     var we = []
//     var ns = []
//     // 开启深度检测
//     viewer.scene.globe.depthTestAgainstTerrain = true
//     // 创建场景的HTML canvas元素
//     let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
//     switch (type) {
//       // 绘制线
//       case 'Polyline':
//         // 取消鼠标双击事件
//         viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
//           Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
//         )
//         // 监听鼠标移动
//         handler.setInputAction(function (movement) {
//           if (Cesium.defined(floatingPoint)) {
//             let newPosition = viewer.scene.pickPosition(movement.endPosition)
//             if (Cesium.defined(newPosition)) {
//               floatingPoint.position.setValue(newPosition)
//               activeShapePoints.pop()
//               activeShapePoints.push(newPosition)
//             }
//           }
//         }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//         // 左键单击开始画线
//         handler.setInputAction(function (click) {
//           let earthPosition = viewer.scene.pickPosition(click.position)
//           if (Cesium.defined(earthPosition)) {
//             if (activeShapePoints.length === 0) {
//               floatingPoint = that.distancePoint(earthPosition)
//               activeShapePoints.push(earthPosition);
//               // const dynamicPositions = new Cesium.CallbackProperty(function () {
//               // return activeShapePoints;
//               // }, false);
//               // activeShape = viewer.entities.add({
//               // polyline: {
//               // positions: dynamicPositions,
//               // clampToGround: true,
//               // width: 3,
//               // },
//               // });
//             }
//             activeShapePoints.push(earthPosition);
//             that.distancePoint(earthPosition);
//           }
//           // 获取位置信息
//           // 从相机位置创建一条射线，这条射线通过世界中movement.position像素所在的坐标,返回Cartesian3坐标
//           let ray = viewer.camera.getPickRay(click.position)
//           // 找到射线与渲染的地球表面之间的交点。射线必须以世界坐标给出。返回Cartesian3坐标
//           position = viewer.scene.globe.pick(ray, viewer.scene)
//           tempPoints.push(position) // 记录点位
//           that.pointNum += 1
//           let tempLength = tempPoints.length // 记录点数
//           // 调用绘制点的接口
//           let point = that.drawPointLabel(
//             tempPoints[tempPoints.length - 1],
//             JSON.stringify(that.pointNum)
//           )
//           distanceEntities.push(point)
//           // 存在超过一个点时
//           if (tempLength > 1) {
//             // 绘制线
//             let pointLength = that.getLength(
//               tempPoints[tempPoints.length - 2],
//               tempPoints[tempPoints.length - 1]
//             )
//             let midPosition = that.getMidpoint(
//               tempPoints[tempPoints.length - 2],
//               tempPoints[tempPoints.length - 1]
//             )
//             let pointline = that.distancePolyline([
//               tempPoints[tempPoints.length - 2],
//               tempPoints[tempPoints.length - 1],
//             ])
//             let pointLabel = that.addLabel(midPosition, pointLength)
//             distanceEntities.push(pointline) // 保存记录
//             distanceEntities.push(pointLabel)
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         // 左键双击结束画线
//         handler.setInputAction(function (click) {
//           console.log(that.pointNum)
//           activeShapePoints.pop()
//           viewer.entities.remove(activeShapePoints)
//           viewer.entities.remove(floatingPoint)
//           tempPoints = [] // 清空点位记录
//           handler.destroy()
//           handler = null
//           floatingPoint = undefined
//           activeShape = undefined
//           activeShapePoints = []
//           console.log(that.pointNum)
//         }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
//         break
//       // 绘制面
//       case 'Polygon':
//         // 取消鼠标双击事件
//         viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
//           Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
//         )
//         // 监听鼠标移动
//         handler.setInputAction(function (movement) {
//           if (Cesium.defined(floatingPoint)) {
//             let newPosition = viewer.scene.pickPosition(movement.endPosition)
//             if (Cesium.defined(newPosition)) {
//               floatingPoint.position.setValue(newPosition)
//               activeShapePoints.pop()
//               activeShapePoints.push(newPosition)
//             }
//           }
//         }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//         // 左键单击开始画线
//         handler.setInputAction(function (click) {
//           let earthPosition = viewer.scene.pickPosition(click.position)
//           if (Cesium.defined(earthPosition)) {
//             if (activeShapePoints.length === 0) {
//               floatingPoint = that.distancePoint(earthPosition)
//               activeShapePoints.push(earthPosition)
//               const dynamicPositions = new Cesium.CallbackProperty(
//                 function () {
//                   return new Cesium.PolygonHierarchy(activeShapePoints)
//                 },
//                 false
//               )
//               activeShape = that.distancePolygon(dynamicPositions)
//             }
//             activeShapePoints.push(earthPosition)
//           }
//           // 获取位置信息
//           let ray = viewer.camera.getPickRay(click.position)
//           position = viewer.scene.globe.pick(ray, viewer.scene)
//           tempPoints.push(position) // 记录点位
//           let tempLength = tempPoints.length // 记录点数
//           that.pointNum += 1
//           // 调用绘制点的接口
//           let point = that.drawPointLabel(
//             tempPoints[tempPoints.length - 1],
//             JSON.stringify(that.pointNum)
//           )
//           distanceEntities.push(point)
//           // 存在超过一个点时
//           if (tempLength > 1) {
//             // 绘制线
//             let pointline = that.distancePolyline([
//               tempPoints[tempPoints.length - 2],
//               tempPoints[tempPoints.length - 1],
//             ])
//             distanceEntities.push(pointline) // 保存记录
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         // 右键单击结束画面
//         handler.setInputAction(function (click) {
//           // 选择一个椭球或地图
//           let cartesian = viewer.camera.pickEllipsoid(
//             click.position,
//             viewer.scene.globe.ellipsoid
//           )
//           if (cartesian) {
//             let tempLength = tempPoints.length
//             if (tempLength < 3) {
//               alert('闭合操作需要至少3个点嗷')
//               viewer.entities.remove(this.distanceEntitie)
//             } else {
//               // 闭合最后一条线
//               let pointline = that.distancePolyline([
//                 tempPoints[0],
//                 tempPoints[tempPoints.length - 1],
//               ])
//               distanceEntities.push(pointline)
//               let distancePolygon = that.distancePolygon(tempPoints)
//               let pointArea = that.getArea(tempPoints)
//               var polyPositions = distancePolygon.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
//               var pCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //中心点
//               let tempArea = that.addArea(JSON.stringify(pointArea), pCenter)
//               distanceEntities.push(distancePolygon)
//               distanceEntities.push(tempArea)
//               distanceEntities.push(tempPoints)
//               handler.destroy()
//               handler = null
//             }
//           }
//           activeShapePoints.pop()
//           viewer.entities.remove(activeShapePoints)
//           viewer.entities.remove(floatingPoint)
//           floatingPoint = undefined
//           activeShapePoints = []
//         }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
//         break
//       case 'rectangle':
//         //双击鼠标左键清除默认事件
//         viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
//           Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
//         )
//         //鼠标左键
//         handler.setInputAction(function (event) {
//           // 我们在这里使用“viewer.scene.pickPosition”而不是“viewer.camera.pick椭球体”
//           // 我们在地形上移动时得到了正确的点。
//           var earthPosition = viewer.scene.pickPosition(event.position)
//           // `如果我们的鼠标不在地球上，地球位置将是不确定的
//           if (Cesium.defined(earthPosition)) {
//             if (activeShapePoints.length === 0) {
//               floatingPoint = that.distancePoint(earthPosition)
//               activeShapePoints.push(earthPosition)
//               var dynamicPositions = new Cesium.CallbackProperty(function () {
//                 return activeShapePoints
//               }, false)
//               activeShape = that.distanceRectangle(dynamicPositions) //绘制动态图
//             }
//             activeShapePoints.push(earthPosition)
//             that.distancePoint(earthPosition)
//             console.log(earthPosition, '笛卡尔')
//             //将笛卡尔坐标转换为地理坐标
//             var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(earthPosition)
//             //将弧度转为度的十进制度表示
//             var longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
//             var latitudeString = Cesium.Math.toDegrees(cartographic.latitude)
//             we.push(longitudeString)
//             ns.push(latitudeString)
//             //获取相机高度
//             var height = Math.ceil(viewer.camera.positionCartographic.height)
//             console.log('(' + longitudeString + ', ' + latitudeString + ',' + height + ')弧度')
//             ns.sort(function (a, b) {
//               return a - b
//             })
//             we.sort(function (a, b) {
//               return a - b
//             })
//             var east = we[0]
//             var west = we[we.length - 1]
//             var south = ns[0]
//             var north = ns[ns.length - 1]
//             console.log(we, east, west)
//             console.log(ns, south, north)
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
//         //鼠标移动
//         handler.setInputAction(function (event) {
//           if (Cesium.defined(floatingPoint)) {
//             var newPosition = viewer.scene.pickPosition(event.endPosition)
//             if (Cesium.defined(newPosition)) {
//               floatingPoint.position.setValue(newPosition)
//               activeShapePoints.pop()
//               activeShapePoints.push(newPosition)
//             }
//           }
//         }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
//         //鼠标右键
//         handler.setInputAction(function (event) {
//           // 重新绘制形状，使其不是动态的，然后删除动态形状
//           // 选择一个椭球或地图
//           let cartesian = viewer.camera.pickEllipsoid(
//             event.position,
//             viewer.scene.globe.ellipsoid
//           )
//           if (cartesian) {
//             if (activeShapePoints.length) {
//               viewer.entities.remove(activeShape) //去除动态图形
//               that.distanceRectangle(activeShapePoints) //绘制最终图
//               handler.destroy()
//               handler = null
//             }
//           } else {
//             activeShapePoints.pop() //去除最后一个动态点
//             // viewer.entities.remove(floatingPoint) //去除动态点图形（当前鼠标点）
//             floatingPoint = undefined
//             activeShape = undefined
//             activeShapePoints = []
//           }
//         }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
//         break
//     }
//   }
//
//   /* 测量点绘制 */
//   distancePoint(position) {
//     let viewer = this.viewer
//     // 本质上就是添加一个点的实体
//     return viewer.entities.add({
//       position: position,
//       point: {
//         color: Cesium.Color.RED,
//         pixelSize: 5,
//         outlineWidth: 3,
//         disableDepthTestDistance: Number.POSITIVE_INFINITY,
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
//       },
//     })
//   }
//
//   /* 测量线绘制 */
//   distancePolyline(positions) {
//     let viewer = this.viewer
//     if (positions.length < 1) return
//     return viewer.entities.add({
//       name: '线几何对象',
//       polyline: {
//         positions: positions,
//         width: 5.0,
//         material: new Cesium.PolylineGlowMaterialProperty({
//           // eslint-disable-next-line new-cap
//           color: Cesium.Color.RED,
//         }),
//         depthFailMaterial: new Cesium.PolylineGlowMaterialProperty({
//           // eslint-disable-next-line new-cap
//           color: Cesium.Color.RED,
//         }),
//         clampToGround: true,
//       },
//     })
//   }
//
//   /* 测量面绘制 */
//   distancePolygon(positions) {
//     let viewer = this.viewer
//     if (positions.length < 2) return
//     return viewer.entities.add({
//       name: '面几何对象',
//       polygon: {
//         hierarchy: positions,
//         // eslint-disable-next-line new-cap
//         material: new Cesium.ColorMaterialProperty(
//           Cesium.Color.WHEAT.withAlpha(0.4)
//         ),
//       },
//     })
//   }
//
//   /* 测量矩形绘制 */
//   distanceRectangle(positions) {
//     let viewer = this.viewer
//     var shape
//     //当positions为数组时绘制最终图，如果为function则绘制动态图
//     var arr = typeof positions.getValue === 'function' ? positions.getValue(0) : positions
//     shape = viewer.entities.add({
//       name: 'Blue translucent, rotated, and extruded ellipse with outline',
//       rectangle: {
//         coordinates: new Cesium.CallbackProperty(function () {
//           var obj = Cesium.Rectangle.fromCartesianArray(arr)
//           //if(obj.west==obj.east){ obj.east+=0.000001};
//           //if(obj.south==obj.north){obj.north+=0.000001};
//           return obj
//         }, false),
//         material: Cesium.Color.RED.withAlpha(0.5),
//       },
//     })
//     return shape
//   }
//
//   /* 空间两点距离计算函数 */
//   getLength(start, end) {
//     // 将起点与终点位置信息从笛卡尔坐标形式转换为Cartographic形式
//     let startCartographic = Cesium.Cartographic.fromCartesian(start)
//     let endCartographic = Cesium.Cartographic.fromCartesian(end)
//     // 初始化测地线
//     let geodesic = new Cesium.EllipsoidGeodesic()
//     // 设置测地线起点和终点，EllipsoidGeodesic中setEndPoints常与surfaceDistance搭配使用
//     geodesic.setEndPoints(startCartographic, endCartographic)
//     // 获取起点和终点之间的表面距离，单位为km，规定四舍五入保留两位小数
//     // surfaceDistance返回number 单位为m，带小数
//     // console.log((geodesic.surfaceDistance / 1000).toFixed(2))
//     return (geodesic.surfaceDistance / 1000).toFixed(2)
//   }
//
//   /* 空间两点计算中点函数 */
//   getMidpoint(start, end) {
//     let startPoint = Cesium.Cartographic.fromCartesian(start)
//     let endPoint = Cesium.Cartographic.fromCartesian(end)
//     let geodesic = new Cesium.EllipsoidGeodesic()
//     geodesic.setEndPoints(startPoint, endPoint)
//     let geoPoint = geodesic.interpolateUsingFraction(0.5)
//     console.log(Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint))
//     return Cesium.Ellipsoid.WGS84.cartographicToCartesian(geoPoint)
//   }
//
//   // 添加标签
//   addLabel(midPoint, labelLength) {
//     let viewer = this.viewer
//     return viewer.entities.add({
//       name: '中点',
//       position: midPoint,
//       label: {
//         text: labelLength + 'km',
//         font: '16px sans-serif',
//         fillColor: Cesium.Color.WHITE,
//         outlineWidth: 2,
//         backgroundColor: Cesium.Color.BLACK,
//         showBackground: true,
//         style: Cesium.LabelStyle.FILL,
//         verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//         disableDepthTestDistance: Number.POSITIVE_INFINITY,
//       },
//     })
//   }
//
//   /* 测量空间面积 */
//
//   // 方向
//   Bearing(from, to) {
//     let fromCartographic = Cesium.Cartographic.fromCartesian(from)
//     let toCartographic = Cesium.Cartographic.fromCartesian(to)
//     let lat1 = fromCartographic.latitude
//     let lon1 = fromCartographic.longitude
//     let lat2 = toCartographic.latitude
//     let lon2 = toCartographic.longitude
//     let angle = -Math.atan2(
//       Math.sin(lon1 - lon2) * Math.cos(lat2),
//       Math.cos(lat1) * Math.sin(lat2) -
//       Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
//     )
//     if (angle < 0) {
//       angle += Math.PI * 2.0
//     }
//     return angle
//   }
//
//   // 角度
//   pointAngle(point1, point2, point3) {
//     let bearing21 = this.Bearing(point2, point1)
//     let bearing23 = this.Bearing(point2, point3)
//     let angle = bearing21 - bearing23
//     if (angle < 0) {
//       angle += Math.PI * 2.0
//     }
//     return angle
//   }
//
//   getArea(positions) {
//     let res = 0
//     for (let i = 0; i < positions.length - 2; i++) {
//       let j = (i + 1) % positions.length
//       let k = (i + 2) % positions.length
//       let totalAngle = this.pointAngle(
//         positions[i],
//         positions[j],
//         positions[k]
//       )
//       let tempLength1 = this.getLength(positions[j], positions[0])
//       let tempLength2 = this.getLength(positions[k], positions[0])
//       res += (tempLength1 * tempLength2 * Math.sin(totalAngle)) / 2
//     }
//     res = res.toFixed(2)
//     // console.log(res)
//     res = parseFloat(res)
//     // console.log(Math.abs(res))
//     return Math.abs(res)
//   }
//
//   addArea(area, positions) {
//     let viewer = this.viewer
//     return viewer.entities.add({
//       name: '多边形面积',
//       position: positions,
//       label: {
//         text: area + '平方公里',
//         font: '16px sans-serif',
//         fillColor: Cesium.Color.WHITE,
//         outlineWidth: 2,
//         backgroundColor: Cesium.Color.BLACK,
//         showBackground: true,
//         style: Cesium.LabelStyle.FILL,
//         pixelOffset: new Cesium.Cartesian2(0, 0),
//         verticalOrigin: Cesium.VerticalOrigin.CENTER,
//         horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
//         disableDepthTestDistance: Number.POSITIVE_INFINITY,
//       },
//     })
//   }
//
//   /* 绘制函数 */
//   drawPointLabel(position, pointNum) {
//     let viewer = this.viewer
//     // 本质上就是添加一个点的实体
//     return viewer.entities.add({
//       name: '点几何对象',
//       position: position,
//       point: {
//         color: Cesium.Color.WHEAT,
//         pixelSize: 5,
//         outlineWidth: 3,
//         disableDepthTestDistance: Number.POSITIVE_INFINITY,
//         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // 规定贴地
//       },
//       // 是否显示点label
//       // label: {
//       // text: pointNum,
//       // font: '30px sans-serif',
//       // fillColor: Cesium.Color.WHITE,
//       // outlineWidth: 2,
//       // backgroundColor: Cesium.Color.BLACK,
//       // showBackground: true,
//       // style: Cesium.LabelStyle.FILL,
//       // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//       // horizontalOrigin: Cesium.HorizontalOrigin.CENTER
//       // }
//     })
//   }
//
//   /**
//    　　　　　　* 清除测量实体
//    　　　　　　*/
//   clearAllDistance() {
//     //清除顶点
//     let len = this.distanceEntities.length - 1
//     console.log(len)
//     while (len >= 0) {
//       console.log(this.distanceEntities[len])
//       this.viewer.entities.remove(this.distanceEntities[len--])
//     }
//     this.pointNum = 0
//     this.distanceEntities = [].concat()
//   }
//
//   //根据实体名称循环删除
//   deleteNameEntities(name) {
//     var entitys = this.viewer.entities._entities._array
//     console.log('====删除实体')
//     console.log(entitys.length)
//     console.log(entitys)
//     for (var i = 0; i < entitys.length; i++) {
//       if (entitys[i]._name === 'lablebill') {
//         console.log('i=' + i)
//         console.log(entitys[i]._name)
//         console.log(entitys[i]._id)
//         this.viewer.entities.remove(entitys[i])
//         i--
//       }
//     }
//   }
//
//   // -----------end 测量------------- //
//
//   // -----------start 地图操作------------- //
//   //放大
//   zoomIn() {
//     // 获取当前镜头位置的笛卡尔坐标
//     let cameraPos = this.viewer.camera.position
//     // 获取当前坐标系标准
//     let ellipsoid = this.viewer.scene.globe.ellipsoid
//     // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
//     let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
//     // 获取镜头的高度
//     let height = cartographic.height
//     let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude))
//     let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude))
//     // this.viewer.camera.flyTo({
//     // destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height / 1.2),
//     // duration: 1.0
//     // });
//     this.viewer.camera.zoomIn(height / 3)
//   }
//
//   //缩小
//   zoomOut() {
//     let cameraPos = this.viewer.camera.position
//     let ellipsoid = this.viewer.scene.globe.ellipsoid
//     let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
//     let height = cartographic.height
//     let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude))
//     let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude))
//     // this.viewer.camera.flyTo({
//     // destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, height * 1.2),
//     // duration: 1.0
//     // });
//     this.viewer.camera.zoomOut(height / 3)
//   }
//
//   // 根据两个对角点得到geojson
//   fourToCoordinatesGeo(x1, y1, x2, y2) {
//     var location = {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [parseFloat(x1), parseFloat(y1)],
//           [parseFloat(x2), parseFloat(y1)],
//           [parseFloat(x2), parseFloat(y2)],
//           [parseFloat(x1), parseFloat(y2)],
//           [parseFloat(x1), parseFloat(y1)],
//         ],
//       ],
//     }
//     return location
//   }
//
//   // 根据中心点和长宽得到geojson数据
//   centerToCoordinatesGeo(centeX, centeY, quadrilateralW, quadrilateralH) {
//     let x1 = parseFloat(centeX) - quadrilateralW / 2
//     let y1 = parseFloat(centeY) - quadrilateralH / 2
//     let x2 = parseFloat(centeX) + quadrilateralW / 2
//     let y2 = parseFloat(centeY) + quadrilateralH / 2
//     var location = {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [x1, y1],
//           [x2, y1],
//           [x2, y2],
//           [x1, y2],
//           [x1, y1],
//         ],
//       ],
//     }
//     return location
//   }
//
//   //初始化将三维球定位到中国
//   flyToInit() {
//     var fly = this.viewer.scene.camera.flyTo({
//       destination: new Cesium.Cartesian3.fromDegrees(
//         106.26667,
//         38.46667,
//         6000000.0
//       ),
//       orientation: {
//         heading: Cesium.Math.toRadians(0),
//         pitch: Cesium.Math.toRadians(-90), // 视角
//         roll: Cesium.Math.toRadians(0),
//       },
//       duration: 3.0,
//     })
//     return fly
//   }
//
//   //根据目标定位
//   flyToPromise(promise) {
//     this.viewer.flyTo(promise, {
//       offset: {
//         heading: Cesium.Math.toRadians(0.0),
//         pitch: Cesium.Math.toRadians(-90),
//         range: 0,
//       },
//     })
//   }
//
//   /**
//    　　　　　　* 删除指定ID的图层
//    　　　　　　*/
//   deleteServerTypeMap(id) {
//     var that = this
//     var len = that.viewer.dataSources ? that.viewer.dataSources.length : 0
//     if (len > 0) {
//       for (var j = 0; j < len; j++) {
//         var dataSource = that.viewer.dataSources.get(j)
//         if (
//           dataSource &&
//           dataSource._name &&
//           dataSource._name == id + '-source'
//         ) {
//           that.viewer.dataSources.remove(dataSource)
//         }
//       }
//     }
//   }
//
//   /**
//    　　　　　　* 添加数据源
//    　　　　　　*/
//   addSource(layerId, data, layerConfig) {
//     let geojsonDS = new Cesium.GeoJsonDataSource(`${layerId}-source`)
//     if (!data) {
//       return this.$message({
//         message: '数据源不能为空!',
//         type: 'warning'
//       })
//     }
//     let promise = geojsonDS.load(data)
//     promise.then((dataSource) => {
//       this.viewer.dataSources.add(dataSource)
//       let entities = dataSource.entities.values
//
//       switch (layerConfig.layerType) {
//         //点
//         case 'circle':
//           for (let i = 0; i < entities.length; i++) {
//             let entity = entities[i]
//             entity._billboard.image = '/src/assets/image/header/logo.png'
//             entity._billboard.scale = 0.5
//             entity._billboard.color = Cesium.Color.fromAlpha(
//               Cesium.Color.fromCssColorString(
//                 layerConfig.paint['circle-color']
//               ),
//               layerConfig.paint['circle-opacity']
//             )
//           }
//           break
//         //线
//         case 'line':
//           for (let i = 0; i < entities.length; i++) {
//             let entity = entities[i]
//             entity._polygon.fill = false
//             entity._polygon.outlineColor = Cesium.Color.fromAlpha(
//               Cesium.Color.fromCssColorString(
//                 layerConfig.paint['line-color']
//               ),
//               layerConfig.paint['line-opacity']
//             )
//           }
//           break
//         //面
//         case 'fill':
//           for (let i = 0; i < entities.length; i++) {
//             let entity = entities[i]
//             entity.polygon.material = Cesium.Color.fromAlpha(
//               Cesium.Color.fromCssColorString(
//                 layerConfig.paint['fill-color']
//               ),
//               layerConfig.paint['fill-opacity']
//             )
//             if (layerConfig.paint['fill-outline-color']) {
//               entity.polygon.outlineColor = Cesium.Color.fromAlpha(
//                 Cesium.Color.fromCssColorString(
//                   layerConfig.paint['fill-outline-color']
//                 ),
//                 layerConfig.paint['fill-outline-opacity']
//               )
//               entity.polygon.outlineWidth = layerConfig.paint['outline-Width'] ? layerConfig.paint['outline-Width'] : 2
//               entity.polygon.outline = false // 边界显隐
//               entity.polygon.fill = true
//               entity.polyline = {
//                 positions: entity.polygon.hierarchy._value.positions,
//                 width: entity.polygon.outlineWidth,
//                 material: Cesium.Color.fromAlpha(
//                   Cesium.Color.fromCssColorString(
//                     layerConfig.paint['fill-outline-color']
//                   ),
//                   layerConfig.paint['fill-outline-opacity']
//                 ),
//               }
//             } else {
//               entity.polygon.outlineColor = new Cesium.Color(1, 1, 1, 0)
//               entity.polygon.outline = false // 边界显隐
//             }
//           }
//           break
//         default:
//           break
//       }
//     })
//     // .otherwise((error) => {
//     // console.log('add source error:', error)
//     // })
//     return promise
//   }
//
// // -----------end 地图操作------------- //
// }
