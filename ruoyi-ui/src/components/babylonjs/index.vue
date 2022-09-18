<template>
  <div>
    <canvas id="renderCanvas" style="width: 1920px;height: 1080px"></canvas>
  </div>
</template>

<script>
  import * as BABYLON from 'babylonjs'; //全部引入
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
      var canvas = document.getElementById("renderCanvas"); // 得到canvas对象的引用

      var engine = new BABYLON.Engine(canvas, true); // 初始化 BABYLON 3D engine

// This creates a basic Babylon Scene object (non-mesh)

      var createScene = function (){

        var scene = new BABYLON.Scene(engine);

// This creates and positions a free camera (non-mesh)

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

// This targets the camera to scene origin

        camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas

        camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)

        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount

        light.intensity = 0.7;

// Our built-in 'sphere' shape.

        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

// Move the sphere upward 1/2 its height

        sphere.position.y = 1;

// Our built-in 'ground' shape.

        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

        return scene;

      };

      var scene = createScene(); //Call the createScene function

// 最后一步调用engine的runRenderLoop方案，执行scene.render()，让我们的3d场景渲染起来

      engine.runRenderLoop(function () {

        scene.render();

      });
    },
  };
</script>

