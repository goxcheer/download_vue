<template>
  <div class="left">
    <Card class="search-card">
      <p slot="title">
        <Icon type="md-search"/>
        资源检索
      </p>
      <ul >
        <li style="float:left"><a @click="searchByType(0)" :style="articleTypeId==0?{color:'#D15FEE'}:{}">全部资源</a></li>
        <li style="float:left" v-for="v in articleTypeList" :key="v.id"><a @click="searchByType(v.id)" :style="articleTypeId==v.id?{color:'#D15FEE'}:{}">{{v.name}}</a></li>
      </ul>
      <div class="search-input">
        <Input search enter-button="Search" placeholder="Enter resource..."/>
      </div>
    </Card>
    <Card class="table-card">
      <p slot="title">
        <Icon type="ios-list-box"/>
        资源列表
      </p>
      <Table highlight-row :columns="columnTitle" :data="articles" class="article-table" style="margin-bottom: 20px"></Table>
      <template>
        <Page :total="total" prev-text="上一页" next-text="下一页" @on-change="changePage" style="padding-left: 280px" show-total/>
      </template>
    </Card>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
    export default {
        data(){
          return {
            currentPage: 1,
            articleTypeId:0,
            luceneParam: '',
            totalCount: this.total,
            columnTitle: [
              {
                title: '资源名称',
                key: 'name',
                width: 350
              },
              {
                title: '查看次数',
                key: 'views'
              },
              {
                title: '上传用户',
                key: 'nickName'
              },
              {
                title: '上传日期',
                key: 'publishDateStr',
                width: 150
              },
              {
                title: '积分',
                key: 'points'
              }
            ],
            articles: this.articleList
          }
        },
      props:{
        articleTypeList: {
          type: [Array]
        },
        articleList: {
          type: [Array]
        }
      },
      watch:{
        articleList(val){
          this.articles = val
        }
      },
      computed:{
        ...mapGetters({
          total: 'total'
        }),
      },
      methods:{
        ...mapActions({
          listArticle: 'listArticle',
          countArticle: 'countArticle'

        }),
        changePage(curPage){
          this.currentPage = curPage
          let params = {start:(curPage-1)*10, pageSize: 10}
          if (this.articleTypeId !== 0) {
            params.articleTypeId = this.articleTypeId
          }
          if (this.luceneParam && luceneParam != ''){
            params.luceneParam = this.luceneParam
          }
          this.listArticle(params).then(data => {
            this.articles = data.articleList
          })
        },
        searchByType(id){
          this.countArticle({articleTypeId: id}).then(data => {
          })
          this.listArticle({start:0, pageSize:10, articleTypeId: id}).then(data =>{
            this.articles = data.articleList
          })
          this.articleTypeId = id
        }
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .left {
    float: left;
    width: 880px;
    height: 100%;
    .search-card {
      margin-top: 10px;
      ul {
        overflow: hidden;
        li {
          font-size: 16px;
          float: left;
          margin-left: 14px;
          a:hover{
            color:deeppink;
          }
          a:active{
          }
        }
      }
      .search-input {
        margin-top: 30px;
      }
    }
    .table-card {
      margin-top: 20px;
      .article-table {
        font-size: 20px;
      }
    }
  }
</style>
