import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const axiosInstance = axios.create({
  baseURL: 'https://api.airtable.com/v0/appgykZBGTF92MnHu/',
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer keydvCyWaXNxw56QE';
  return config;
});

Vue.prototype.$axios = axiosInstance;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
