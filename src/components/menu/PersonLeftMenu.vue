<template>
  <Menu :active-name="activeName" theme="dark" width="15%"  class="person-menu" @on-select="jump">
    <MenuItem name="personInfo">个人中心</MenuItem>
      <MenuItem name="publishArticle">发布资源</MenuItem>
      <MenuItem name="3">资源管理</MenuItem>
      <MenuItem name="4">失效资源管理</MenuItem>
    <MenuItem name="5">评论管理</MenuItem>
    <MenuItem name="6">已下载资源</MenuItem>
    <MenuItem name="7">系统消息</MenuItem>
  </Menu>
</template>

<script>
    export default {
      data(){
        return {
          activeName: this.routeName
        }
      },
      props:{
        routeName:{
          type: String
        }
      },
      computed:{

      },
      methods:{
        jump(name){
          this.activeName = name
          this.$router.push({name:name})
        }
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .person-menu{
    margin-top: 20px;
    float: left;
  }
</style>
