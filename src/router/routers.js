/*
 *vue-router数组
 * meta: {
 *  title:显示在侧边栏、面包屑和标签栏的文字
 *  hideInBread: 是否隐藏在面包屑中
 *  hideInMenu: 是否在左侧菜单显示
 *  NoEditable: 在面包屑中可不可以编辑
 *  access: 可访问该页面的权限数组
 *  icon: 显示的图标
 *  befoCloseName:设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export default [
  {
    path: '/',
    redirect: 'index',
    component: () => import('@/pages/main/Main.vue'),
    name: '_name',
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
          hideInMenu: true,
          icon: 'md-home'
        },
        component: () => import('@/pages/main/index/Index.vue')
      },
      {
        path: 'person',
        redirect: 'person/info',
        name: 'person',
        component: () => import('@/pages/main/person/Person.vue'),
        children: [
          {
            path: 'info',
            name: 'personInfo',
            component: ()=> import('@/pages/main/person/children/PersonInfo.vue')
          },
          {
            path: 'publish',
            name: 'publishArticle',
            component: ()=> import('@/pages/main/person/children/PublishArticle.vue')
          }
        ]
      }
    ]
  }
]
