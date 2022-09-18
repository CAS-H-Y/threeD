<template>
  <div >
    <ThreeJS style="width: 1000px;height: 1000px"></ThreeJS>
  </div>
</template>

<script>
  import ThreeJS from "@/components/Threejs/index";
  export default {
    name: "Index",
    components:{
      ThreeJS
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

