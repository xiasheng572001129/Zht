<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
}
.viewer-container {
  z-index: 9999 !important;
}
.el-message {
  z-index: 9999 !important;
}   
</style>
