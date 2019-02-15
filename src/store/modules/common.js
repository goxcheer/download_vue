import Ajax from '@/js/ajax.js'
const state = {
  articleTypeList:[],
  articleList: [],
  total:0,
  hotArticleList:[]
}

const getters = {
  articleTypeList: (state)=>{
    return state.articleTypeList
  },
  total: (state)=>{
    return state.total
  }
}

const mutations = {
  setArticleTypeList(state, data) {
    state.articleTypeList = data
  },
  setArticleList(state, data) {
    state.articleList = data
  },
  setTotalArticle(state, data) {
    state.total = data
  },
  setHotArticleList(state, data) {
    state.hotArticleList = data
  }
}

const actions = {
  /**
   *获取资源分类
   * @param commit
   * @param paramData
   * @returns {Promise<any>}
   */
  listArticleType({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'listArticleType',
        data:paramData,
        success(data){
          if(data.result=='true'){
            if (data.articleTypeList && data.articleTypeList.length) {
              commit('setArticleTypeList',data.articleTypeList)
            }
            resolve(data)
          }
        }
      })
    })
  },
  /**
   * 获取资源总数
   * @param commit
   * @param paramData
   */
  countArticle({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'countArticle',
        data:paramData,
        success(data){
          if(data.result=='true'){
            commit('setTotalArticle',data.total)
            resolve(data)
          }
        }
      })
    })
  },
  /**
   * 带分页条件查询资源集合
   * @param commit
   * @param paramData
   * @returns {Promise<any>}
   */
  listArticle({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'listArticle',
        data:paramData,
        success(data){
          if(data.result=='true'){
            if (data.articleList && data.articleList.length) {
              data.articleList.forEach(item => {
                item.nickName = item.user.nickName
              })
              commit('setArticleList',data.articleList)
            }
            resolve(data)
          }
        }
      })
    })
  },
  /**
   * 查询热门资源总和
   * @param commit
   * @param paramData
   * @returns {Promise<any>}
   */
  listHotArticle({commit}, paramData) {
    return new Promise((resolve, reject) => {
      Ajax.$ajax({
        url:'listArticle',
        data:paramData,
        success(data){
          if(data.result=='true'){
            if (data.articleList && data.articleList.length) {
              data.articleList.forEach(item => {
                item.nickName = item.user.nickName
              })
              commit('setHotArticleList',data.articleList)
            }
            resolve(data)
          }
        }
      })
    })
  },
  /**
   * 发布资源
   * @param commit
   * @param paramData
   * @returns {Promise<any>}
   */
  publishArticle({commit}, paramData) {
    return new Promise((resolve,reject) => {
      Ajax.$ajax({
        url: 'publishArticle',
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
