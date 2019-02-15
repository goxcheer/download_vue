<template>
  <div class="person">
    <person-left-menu :routeName="$route.name"></person-left-menu>
    <div class="person-content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    </div>
  </div>
</template>

<script>
  import PersonLeftMenu from '@/components/menu/PersonLeftMenu.vue'

  export default {
    components: {
      PersonLeftMenu
    },
    data(){
      return {
        currentUser: ''
      }
    },
    watch:{
      '$route' (newRoute) {
      }
    },
    mounted(name){

    }
  }
</script>

<style scoped type="text/less" lang="less">
  .person{
    width: 100%;
    height: 100%;
    .person-content{
      float: left;
      margin-top: 20px;
      margin-left: 20px;
    }
  }
</style>
