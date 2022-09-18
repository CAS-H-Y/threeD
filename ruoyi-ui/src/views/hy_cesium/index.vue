<template>
  <div>
    <CesiumJS></CesiumJS>
  </div>
</template>

<script>
  import CesiumJS from "@/components/cesiumjs/index";
  export default {
    name: "Index",
    components:{
      CesiumJS
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

