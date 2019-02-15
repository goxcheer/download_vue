import Ajax from '@/js/ajax.js'
const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

  /**
   * 用户注册
   * @param commit
   * @param paramData
   * @returns {Promise<any>}
   */
  register({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'user/register',
        data:paramData,
        success(data){
        if(data.result=='true'){
          resolve(data)
        }
      }
      })
    })
  },
  /**
   * 用户登陆
   * @param commit
   * @param paramData
   */
  login({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'user/login',
        data:paramData,
        success(data) {
          if (data.result == 'true') {
            resolve(data)
          }
        }
      })
    })
  },
  /**
   * 修改密码
   * @param commit
   * @param paramData
   * @returns {Promise<any>}
   */
  updatePsw({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'user/updatePsw',
        data: paramData,
        success(data) {
          if (data.result == 'true') {
            resolve(data)
          }
        }
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
