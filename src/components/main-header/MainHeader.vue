<template>
  <div class="header clearfix">
    <Row>
      <i-col span="20">
        <Menu mode="horizontal" :theme="theme" :active-key="1" transfer="true" @on-select="jump">
          <Menu-item key="1" name="index">
            首页
          </Menu-item>
          <Menu-item key="2" name="code">
            领取本站源码
          </Menu-item>
          <Menu-item key="3" name="declare">
            免责申明
          </Menu-item>
        </Menu>
      </i-col>
      <i-col span="4" style="background: RGB(81,90,110)">
        <div class="user">
          <template v-if="is_login==false">
            <li><a @click="showRegisterDialog">注册</a></li>
            <li><a @click="showLoginDialog">登陆</a></li>
          </template>
          <template v-else>
            <div class="personInfo">
              <li>
                <router-link to="/person">个人中心</router-link>
              </li>
            </div>
            <Dropdown class="dropdown" @on-click="operate">
              <a href="javascript:void(0)">
                {{user.nickName}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list" >
                <DropdownItem name="updatePsw">修改密码</DropdownItem>
                <DropdownItem name="logout">退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </div>
      </i-col>

      <!--登陆对话框-->
      <Modal v-model="loginModal" width="360">
        <p slot="header" style="text-align:center">
          <span>登陆</span>
        </p>
        <div style="text-align:center">
          <Form ref="loginValidate" :model="user" label-position="left" :label-width="80" :rules="ruleLogin">
            <FormItem label="用户名：" prop="account">
              <Input v-model="user.account" placeholder="请输入账号" type="text"/>
            </FormItem>
            <FormItem label="密  码：" prop="password">
              <Input v-model="user.password" placeholder="请输入密码" type="password"/>
            </FormItem>
            <FormItem label="验  证：" prop="checkCode">
              <!--<div data-vid="5b53cdb6fc650e53f84fd4c8" style="width: 200px;height: 36px;">
                <div class="vaptcha-init-main">
                  <div class="vaptcha-init-loading">
                    <a href="/" target="_blank">
                      <img src="https://cdn.vaptcha.com/vaptcha-loading.gif" />
                    </a>
                    <span class="vaptcha-text">Vaptcha启动中...</span>
                  </div>
                </div>
              </div>-->
              <Input v-model="user.checkCode" placeholder="请输入验证码" type="text"/>
            </FormItem>
          </Form>
          <p class="code"
             style="font-family:Arial;font-style:italic;font-weight:bold;border:0;letter-spacing:2px;color:blue;font-size: 20px;">
            {{checkCode}}</p>
        </div>
        <div slot="footer">
          <Button type="success" style="position: relative;left: -150px" @click="handleLogin('loginValidate')">登陆
          </Button>
          <a style="position: relative;left: -100px">忘记密码</a>
        </div>
      </Modal>

      <!--注册对话框-->
      <Modal v-model="registerModal" width="400">
        <p slot="header" style="text-align:center">
          <span>注册</span>
        </p>
        <div style="text-align:center">
          <Form ref="registerValidate" :model="user" label-position="left" :label-width="100" :rules="ruleRegister">
            <FormItem label="登陆账号：" prop="account">
              <Input v-model="user.account" placeholder="请输入账号" type="text"/>
            </FormItem>
            <FormItem label="密  码：" prop="password">
              <Input v-model="user.password" placeholder="请输入密码" type="password"/>
            </FormItem>
            <FormItem label="确认密码：" prop="rePassword">
              <Input v-model="user.rePassword" placeholder="请确认输入密码" type="password"/>
            </FormItem>
            <FormItem label="昵称：" prop="nickName">
              <Input v-model="user.nickName" placeholder="请输入昵称" type="text"/>
            </FormItem>
            <FormItem label="邮箱：" prop="email">
              <Input v-model="user.email" placeholder="请输入邮箱" type="text"/>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="position: relative;left: -150px" @click="handleRegister('registerValidate')">
            注册
          </Button>
          <a style="position: relative;left: -100px">忘记密码</a>
        </div>
      </Modal>

      <!--修改密码对话框-->
      <Modal v-model="updatePswModal" width="400">
        <p slot="header" style="text-align:center">
          <span>修改密码</span>
        </p>
        <div style="text-align:center">
          <Form ref="updatePswValidate" :model="user" label-position="left" :label-width="100" :rules="ruleUpdatePsw">
            <FormItem label="原密码：" prop="originalPassword">
              <Input v-model="user.originalPassword" placeholder="请输入原密码" type="password"/>
            </FormItem>
            <FormItem label="新密码：" prop="password">
              <Input v-model="user.password" placeholder="请输入新密码" type="password"/>
            </FormItem>
            <FormItem label="确认密码：" prop="rePassword">
              <Input v-model="user.rePassword" placeholder="请确认输入密码" type="password"/>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="position: relative;left: -150px" @click="handleUpdatePsw('updatePswValidate')">
            修改
          </Button>
        </div>
      </Modal>
    </Row>
  </div>
</template>

<script>
  import {createCode} from "../../js/common";
  import {mapActions} from 'vuex'

  export default {
    data() {
      const validateRePsw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不得为空'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback()
        }
      }
      return {
        theme: 'dark',
        loginModal: false,
        registerModal: false,
        updatePswModal: false,
        checkCode: '',
        is_login:false,
        ruleRegister: {
          account: [
            {required: true, message: '登陆账号不能为空', trigger: 'blur'},
            {type: 'string', min: 6, message: '登陆账号不得少于6位数', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码不得小于6位数', trigger: 'blur'}
          ],
          rePassword: [
            {validator: validateRePsw, trigger: 'blur'}
          ],
          nickName: [
            {required: true, trigger: 'blur', message: '用户昵称不能为空'}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '非法的邮箱格式', trigger: 'blur'},
          ]
        },
        ruleLogin: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          checkCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        ruleUpdatePsw: {
          originalPassword:[
            {required: true, message: '请输入原密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码不得小于6位数', trigger: 'blur'}
          ],
          password:[
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '新密码不得小于6位数', trigger: 'blur'}
          ],
          rePassword: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: validateRePsw, trigger: 'blur'}
          ]
        },
        user: {
          originalPassword:'',
          account: '',
          password: '',
          checkCode: '',
          rePassword: '',
          nickName: ''
          },
      }
    },
    props: {
      isLogin: {
        type: Boolean
      },
      currentUser: {
        type: [Object, String]
      }
    },
    watch:{
      currentUser(val){
        if (val) {
          this.user = val
          this.user.password = ''
        }
      },
      isLogin(val){
        if (val){
          this.is_login = val
        }
      }
    },
    methods: {
      ...mapActions({
        register: 'register',
        login: 'login',
        updatePsw:'updatePsw'

      }),
      showLoginDialog() {
        this.checkCode = createCode()
        this.loginModal = true;
      },
      showRegisterDialog() {
        this.registerModal = true
      },
      handleRegister(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.register(this.user).then(data => {
              this.$Message.success('注册成功，请登陆！');
              this.registerModal = false
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleLogin(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.user.checkCode.toLowerCase() === this.checkCode.toLowerCase()) {
              this.login(this.user).then(data => {
                if (data.result == 'true') {
                  this.$Message.success("登陆成功！")
                  this.loginModal = false
                  sessionStorage.setItem("currentUser", JSON.stringify(data.currentUser))
                  this.is_login = true
                  this.user = data.currentUser
                  this.user.password = ''
                } else {
                  this.$Message.error(data.errorMsg)
                }

              })
            } else {
              this.$Message.error('您输入的验证码不正确！')
            }
          }
        })
      },
      handleUpdatePsw(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
            this.updatePsw({account:currentUser.account, originalPassword:this.user.originalPassword, newPassword:this.user.password}).then(data => {
              this.$Message.success("修改密码成功！")
              this.updatePswModal = false
              sessionStorage.setItem("currentUser", JSON.stringify(data.currentUser))
            })
          }
          })
      },
      operate(name){
        switch (name) {
          case "updatePsw": {
            this.updatePswModal = true
          }
          break;
          case "logout": {
            sessionStorage.removeItem("currentUser")
            this.is_login = false
          }
          break;
        }
      },
      jump(name){
        this.$router.push({name:name})
      }
    }

  }
</script>

<style scoped type="text/less" lang="less">
  .header {
    width: 100%;
    height: 100%;
    li {
      font-size: 18px;
    }
    .user {
      width: 100%;
      height: 60px;
      li {
        float: right;
        font-size: 15px;
        margin-right: 20px;
        line-height: 60px;
        a {
          color: white;
        }
      }
      .dropdown {
        font-size: 15px;
        float: right;
        margin-right: 30px;
        line-height: 60px;
        a {
          color: white;
        }
        li {
          line-height: 20px;
        }
      }
    }
    .personInfo {
      float: left;
    }
    .code {

    }
  }
</style>
