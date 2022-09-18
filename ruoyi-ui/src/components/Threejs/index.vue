<template>
  <div id="container" ref="container"></div>
</template>

<script>
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  export default {
    name: "Index",
    data() {
      return {
        // 版本号
        version: "3.8.3",
      };
    },
    methods: {
      init() {
        this.initScene()// 初始化场景
        this.initCamera()// 初始化相机
        this.initLight()// 初始化光线
        this.Panel() // 地面

        this.initRenender()// 初始化渲染器
        // this.outlineSelect() // 模型选择
        this.ininControl() // 初始化控制
        this.$refs.container.addEventListener('mousemove', this.onWindowResize) //
        this.$refs.container.addEventListener('mousemove', this.launchHover) //
      },
      // 初始化场景
      initScene() {
        this.scene = new THREE.Scene()// 创建场景
        this.scene.background = new THREE.Color('black')
        this.scene.fog = new THREE.Fog(this.scene.background, 1, 5000)
      },
      // 初始化相机
      initCamera() {
        this.camera = new THREE.PerspectiveCamera(50,
          document.getElementById('container').clientWidth / document.getElementById('container').clientHeight, 0.1, 5000)// 创建相机对象
        this.camera.position.set(20, 60, 150)// 设置相机位置
        this.camera.lookAt(new THREE.Vector3(0, 0, 0)) // 设置相机方向(指向的场景对象)
      },

      // 初始化光线
      initLight() {
        // LIGHTS HemisphereLight
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4)
        hemiLight.color.setHSL(0.6, 1, 0.6)
        hemiLight.groundColor.setHSL(0.095, 1, 0.75)
        hemiLight.position.set(0, 50, 0)
        this.scene.add(hemiLight) // 光线加入场景中

        const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10)
        this.scene.add(hemiLightHelper)

        // LIGHTS DirectionalLight

        const dirLight = new THREE.DirectionalLight(0xffffff, 1)
        dirLight.color.setHSL(0.1, 1, 0.95)
        dirLight.position.set(-1, 1.75, 1)
        dirLight.position.multiplyScalar(30)
        this.scene.add(dirLight) // 光线加入场景中

        dirLight.castShadow = true

        dirLight.shadow.mapSize.width = 2048
        dirLight.shadow.mapSize.height = 2048

        const d = 50

        dirLight.shadow.camera.left = -d
        dirLight.shadow.camera.right = d
        dirLight.shadow.camera.top = d
        dirLight.shadow.camera.bottom = -d

        dirLight.shadow.camera.far = 15000
        dirLight.shadow.bias = -0.0001

        const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10)
        this.scene.add(dirLightHelper)
      },
      // 控制
      ininControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)// 创建控件对象
        this.controls.minDistance = 5
        this.controls.maxDistance = 220
        this.controls.maxPolarAngle = Math.PI * 0.4 // 最大角度 地平面与camera
        this.controls.enablePan = true
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
      },

      // 初始化渲染器 ——指定容器
      initRenender() {
        this.renderer = new THREE.WebGLRenderer() // 创建渲染器
        this.renderer.shadowMap.enabled = true // 倒影阴影贴图
        this.renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色
        this.renderer.setPixelRatio(window.devicePixelRatio) // 接口返回当前显示设备 的物理像素分辨率与CSS 像素分辨率 //高清
        this.renderer.setSize(document.getElementById('container').clientWidth, document.getElementById('container').clientHeight)
        this.$refs.container.appendChild(this.renderer.domElement)
      },
      // 定义窗口的设置
      onWindowResize() {
        const container = document.getElementById('container')
        this.camera.aspect = container.clientWidth / container.clientHeight
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.camera.updateProjectionMatrix()
        this.effectFXAA.uniforms[ 'resolution' ].value.set(1 / container.clientWidth, 1 / container.clientHeight)
      },
      // 地面
      Panel() {
        // 在平面上创建栅格覆盖
        var grid = new THREE.GridHelper(175, 20, 0xffffff, 0xffffff)
        grid.material.opacity = 0.5
        grid.material.transparent = true
        grid.position.y = 0.005
        this.scene.add(grid)

        // 创建Threejs平面
        const blockPlane = new THREE.Mesh(
          new THREE.BoxBufferGeometry(),
          new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25
          })
        )
        const pos = { x: 0, y: -0.25, z: 0 }
        const scale = { x: 175, y: 0.5, z: 175 }
        blockPlane.position.set(pos.x, pos.y, pos.z)
        blockPlane.scale.set(scale.x, scale.y, scale.z)
        blockPlane.receiveShadow = true
        blockPlane.name = '地板'
        this.scene.add(blockPlane)
      },
      outlineSelect() {
        this.composer = new EffectComposer(this.renderer)

        const renderPass = new RenderPass(this.scene, this.camera)
        this.composer.addPass(renderPass)
        const container = document.getElementById('container')
        this.outlinePass = new OutlinePass(new THREE.Vector2(container.clientWidth, container.clientHeight), this.scene, this.camera)

        this.outlinePass.edgeStrength = Number(5)// 边缘长度
        this.outlinePass.edgeThickness = Number(3.6)// 边缘厚度 值越小越明显
        this.outlinePass.pulsePeriod = Number(2.9) // 一闪一闪周期
        this.outlinePass.visibleEdgeColor.set('#ffff00')// 没有被遮挡的outline的颜色
        this.outlinePass.hiddenEdgeColor.set(0xff0000)// 被遮挡的outline的颜色
        this.composer.addPass(this.outlinePass)

        this.effectFXAA = new ShaderPass(FXAAShader)
        this.effectFXAA.uniforms['resolution'].value.set(
          1 / window.innerWidth,
          1 / window.innerHeight
        )
        this.composer.addPass(this.effectFXAA)
        this.renderer.domElement.style.touchAction = 'none' // CSSStyleDeclaration
        this.$refs.container.addEventListener('pointermove', this.onPointerMove)
      },
      onPointerMove(event) {
        if (event.isPrimary === false) return

        var mouse = new THREE.Vector2()
        const container = document.getElementById('container')
        const getBoundingClientRect = container.getBoundingClientRect() // 获取元素位置 确定三维坐标
        mouse.x = ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) * 2 - 1
        mouse.y = -((event.clientY - getBoundingClientRect.top) / container.offsetHeight) * 2 + 1

        this.raycaster.setFromCamera(mouse, this.camera)

        const intersects = this.raycaster.intersectObject(this.scene, true)

        if (intersects.length > 0) {
          const selectedObject = intersects[0].object
          this.addSelectedObject(selectedObject)
          this.outlinePass.selectedObjects = this.selectedObjects
        } else {
          this.outlinePass.selectedObjects = []
        }
      },
      addSelectedObject(object) {
        this.selectedObjects = []
        this.selectedObjects.push(object)
      },

      launchHover(event) {
        event.preventDefault()
        var mouse = new THREE.Vector2()
        const container = document.getElementById('container')
        const getBoundingClientRect = container.getBoundingClientRect() // 获取元素位置 确定三维坐标
        mouse.x = ((event.clientX - getBoundingClientRect.left) / container.offsetWidth) * 2 - 1
        mouse.y = -((event.clientY - getBoundingClientRect.top) / container.offsetHeight) * 2 + 1
        var raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, this.camera)
        var intersects = raycaster.intersectObjects([this.scene], true)
        if (intersects.length > 0) {
          document.querySelector('body').style.cursor = 'pointer'
        } else {
          document.querySelector('body').style.cursor = 'default'
        }
      },
      // 动画
      animate() {
        this.controls.update() // Update controls
        this.renderer.render(this.scene, this.camera)// Render 渲染
        this.composer.render()
        requestAnimationFrame(this.animate) // Call tick again on the next frame
      }
    },
    mounted() {
      this.init()
      this.animate()
    }
  };
</script>

