<template>
  <div>
    <main-neck></main-neck>
    <div class="content">
      <left-card :articleTypeList="articleTypeList" :articleList="articleList"></left-card>
      <right-card></right-card>
      <link-card></link-card>
    </div>
  </div>
</template>

<script>
  import MainNeck from '@/components/main-neck/MainNeck.vue'
  import LeftCard from '@/components/card/LeftCard.vue'
  import RightCard from '@/components/card/RightCard.vue'
  import LinkCard from '@/components/card/LinkCard.vue'
  import {mapActions} from 'vuex'

  export default {
    components:{
      MainNeck,
      LeftCard,
      RightCard,
      LinkCard
    },
    data() {
      return {
        articleTypeList: [],
        articleList: [],
        total:0
      }
    },
    methods:{
      ...mapActions({
        listArticleType: 'listArticleType',
        countArticle: 'countArticle',
        listArticle: 'listArticle',
        listHotArticle: 'listHotArticle'
      }),
    },
    mounted(){
      this.listArticleType().then(data => {
        if (data.articleTypeList) {
          this.articleTypeList = data.articleTypeList
          sessionStorage.setItem("articleTypeList",JSON.stringify(this.articleTypeList))
        }
      })
      this.countArticle({require:'false'}).then(data => {
        /*this.total  = data.total*/
      })
      this.listArticle({start:0, pageSize: 10}).then(data => {
        if (data.articleList) {
          this.articleList = data.articleList
        }
      })
      this.listHotArticle({is_hot:1}).then(data => {

      })
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .content {
    width: 100%;
    overflow: hidden;
    position: absolute;
  }
</style>
