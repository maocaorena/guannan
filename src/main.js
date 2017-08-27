import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store'
import './assets/css/common.css'

router.beforeEach((to, from, next) => {
   	next();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
