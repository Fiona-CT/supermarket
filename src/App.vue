<template>
  <div id="app">
    <keep-active exclude="profile">
      <router-view></router-view>
    </keep-active>
    <MainTabBar></MainTabBar>
  </div>
</template>
<script>
  import MainTabBar from './components/content/mainTabbar/MainTabBar'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style lang="scss">
  @import "./assets/css/base.css";

</style>
