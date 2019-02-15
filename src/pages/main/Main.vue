<template>
  <div class="main">
    <keep-alive>
      <main-header :isLogin="isLogin" :currentUser="currentUser"></main-header>
    </keep-alive>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import MainHeader from '@/components/main-header/MainHeader.vue'

  export default {
    components: {MainHeader},
    data() {
      return {
        isLogin: false,
        currentUser:''
      }
    },
    mounted(){
      let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      this.isLogin = currentUser ? true:false
      this.currentUser = currentUser
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .main {
    width: 1200px;
    margin: 0 auto;

  }
</style>
