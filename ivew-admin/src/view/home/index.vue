<template>
  <div>
    <ThreeJS></ThreeJS>
  </div>
</template>

<script>
  import ThreeJS from "@/components/threejs/index";
  export default {
    name: "Index",
    components:{
      ThreeJS
    },
    data() {
      return {
        composer:'',
        // 版本号
        version: "3.8.3",
      };
    },
    methods: {},
    }
</script>

<style>
</style>
