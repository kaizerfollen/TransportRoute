<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
  @import "./assets/styles/reset.scss";
  @import "~ag-grid-community/styles/ag-grid.css";
  @import "~ag-grid-community/styles/ag-theme-alpine.css";
</style>
