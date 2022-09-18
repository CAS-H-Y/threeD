<template>
  <div  style="width: 1920px;height: 1080px">
    <BabylonJS style="width: 1920px;height: 1080px"></BabylonJS>
  </div>
</template>

<script>
  import BabylonJS from "@/components/babylonjs/index";
  export default {
    name: "Index",
    components:{
      BabylonJS
    },
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

</style>

