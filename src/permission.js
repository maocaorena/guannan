import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import { Message } from 'element-ui'
import { getToken } from './lib/auth' // 验权


// permissiom judge

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  // console.log(getToken())
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/monitoringRun' })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      next()
      // if (store.getters.roles == '') { // 判断当前用户是否已拉取完user_info信息
      //   // debugger;
      //   store.dispatch('GetInfo').then(response => { // 拉取user_info
      //     const data = response.returnValue
      //     // debugger;
      //     store.dispatch('GenerateRoutes', data.accountType).then(() => { // 生成可访问的路由表
      //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,replace: true so the navigation will not leave a history record
      //     })
          
      //   }).catch(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error('验证失败,请重新登录')
      //       next({ path: '/login' })
      //     })
      //   })
      // } else {
      //   next()

      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})
