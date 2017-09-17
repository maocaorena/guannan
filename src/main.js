import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store';
import API from './api/API.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './assets/css/common.css'
import './assets/css/list.css'

Vue.use(ElementUI)

const api = new API();
Vue.prototype.api = api;

new Vue({
  el: '#app',
  API,
  router,
  store,
  template: '<App/>',
  components: { App }
})
