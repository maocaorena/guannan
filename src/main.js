import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store';
import API from './api/API.js';
import './assets/css/common.css'
import './assets/css/list.css'

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
