<template>
  <div style="width: 100%;height: 100%;background: #4AB7BD;padding: 150px">
    <div style="font-size: 40px;text-align: center;">
      welcome to my web
    </div>
    <div id="app" class="container">
      <card  data-image="../../assets/images/1.jpg" @click.native="goTarget('/index')">
        <h1 slot="header">全景</h1>
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </card>
      <card @click.native="goTarget('/babylonjs')" data-image="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
        <h1 slot="header">BABYLONJS</h1>
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </card>
      <card @click.native="goTarget('/threejs')" data-image="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
        <h1 slot="header">THREEJS</h1>
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </card>
      <card @click.native="goTarget('/cesium')" data-image="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=">
        <h1 slot="header">CESIUM</h1>
        <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </card>
    </div>
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
    },
  };
</script>

<style scoped lang="scss">
  @import  './index.scss';
</style>

