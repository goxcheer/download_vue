<template>
  <div class="right">
    <Card class="sign-card">
      <p slot="title">
        <Icon type="logo-freebsd-devil"/>
        每日签到，领取5积分
      </p>
      <div class="sign">
        <h1><a href="#" title="签到处"></a></h1>
        <li>今日已有100位大佬签到了</li>
      </div>
    </Card>

    <Card class="hot-card">
      <p slot="title">
        <Icon type="ios-flame" />
        热门资源
      </p>
      <li><a>某马社交十次方</a></li>
      <li><a>某马社交十次方</a></li>
      <li><a>某马社交十次方</a></li>
      <li><a>某马社交十次方</a></li>
    </Card>
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped type="text/less" lang="less">
  .right {
    float: left;
    width: 300px;
    margin-left: 20px;
    .sign-card {
      margin-top: 10px;
      overflow: hidden;
      .sign {
        width: 100%;
        float: left;
        a {
          margin-left: 40px;
          display: block;
          width: 160px;
          height: 143px;
          background: url("../../assets/sign.png") no-repeat;
        }
        li{
          text-align: center;
        }
      }
    }
    .hot-card{
      margin-top: 10px;
      li{
        a{
          color: darkslategrey;
        }
      }
    }
  }
</style>
