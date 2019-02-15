<template>
  <div>
    <Card class="link-card" style="width: 200px">
      <p slot="title">
        <Icon type="ios-person" />
        个人信息
      </p>
       <div class="row">
          <span class="span1">欢迎用户:</span>
          <span class="span2">{{currentUser.nickName}}</span>
       </div>
      <div class="row">
        <span class="span1">用户登级:</span>
        <span class="span2">{{userRank}}</span>
      </div>
      <div class="row">
        <span class="span1">用户积分:</span>
        <span class="span2">{{currentUser.points}}</span>
      </div>
    </Card>
  </div>
</template>

<script>
    export default {
        data(){
          return {
            currentUser: ''
          }
        },
      computed: {
          userRank(){
            return this.currentUser.isVip == 0 ? '普通会员': 'vip会员'
          }
      },
      mounted(){
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
      }
    }
</script>

<style scoped type="text/less" lang="less">
    .row{
      margin-top: 10px;
      .span1{
        padding-left: 20px;
      }
      .span2{
        padding-left: 10px;
      }
    }
</style>
