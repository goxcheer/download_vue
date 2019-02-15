<template>
  <Card class="layout">
    <p slot="title">
      <Icon type="ios-link"/>
      发布资源（发布资源，管理员审核通过后，您将获得20积分）
    </p>
    <div class="publish">
      <Form ref="publishValidate" :model="article" label-position="left" :label-width="100" :rules="ruleArticle">
        <FormItem label="资源名称：" prop="name">
          <Input v-model="article.name" placeholder="请输入资源名称" type="text"/>
        </FormItem>
        <FormItem label="资源类别：" prop="articleType">
          <Select v-model="article.articleType">
            <template v-for="v in articleTypeList">
              <Option :value="v.id" :key="v.id">{{v.name}}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="资源描述：" prop="content">
          <i-editor v-model="article.content"></i-editor>
        </FormItem>
        <FormItem label="百度云地址：" prop="downloadUrl">
          <Input v-model="article.downloadUrl" placeholder="请输入资源名称" type="text"/>
        </FormItem>
        <FormItem label="下载密码：" prop="downloadCode">
          <Input v-model="article.downloadCode" placeholder="请输入下载密码" type="text"/>
        </FormItem>
        <FormItem label="积分设置：" prop="points">
          <Select v-model="article.points">
              <Option :value="1" >1</Option>
            <Option :value="2" >2</Option>
            <Option :value="3" >3</Option>
            <Option :value="4" >4</Option>
            <Option :value="5" >5</Option>
            <Option :value="6" >6</Option>
            <Option :value="7" >7</Option>
            <Option :value="8" >8</Option>
            <Option :value="9" >9</Option>
            <Option :value="10" >10</Option>
          </Select>
        </FormItem>
        <Button type="success" size="large" style="margin-left: 100px" @click="handlePublish('publishValidate')">
          提交
        </Button>
      </Form>
    </div>
  </Card>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  export default {
    data() {
      return {
        articleTypeList: '',
        article: {
          name: '',
          articleType: '',
          content: '',
          downloadUrl: '',
          downloadCode: '',
          points: ''
        },
        ruleArticle: {
          name: [
            {required: true, message: '请输入资源名称', trigger: 'blur'}
          ],
          articleType: [
            {required: true, message: '请选择资源所属类别', trigger: 'blur',type:'number'}
          ],
          downloadUrl: [
            {required: true, message: '请输入百度云链接地址', trigger: 'blur'}
          ],
          downloadCode: [
            {required: true, message: '请输入下载密码', trigger: 'blur'}
          ],
          points: [
            {required: true, message: '请选择下载积分', trigger: 'blur',type:'number'}
          ]
        }
      }
    },
    computed: {
    },
    methods: {
      ...mapActions({
        publishArticle: 'publishArticle'
      }),
      getUrl() {
        return './content-img'
      },
      handlePublish(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
            let params = {article: this.article, userId: currentUser.id}
            this.publishArticle(params).then((data) => {
                  if (data.result == 'true') {
                    this.$Message.success("发布成功！")
                    this.$refs[name].resetFields()
                  }
            })
          }
        })
      }
    },
    mounted(){
      this.articleTypeList = JSON.parse(sessionStorage.getItem("articleTypeList"))
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .layout {
    width: 950px;
    margin-left: 10px;
    .publish {
      padding-left: 20px;
      margin-top: 20px;
    }
  }
</style>
