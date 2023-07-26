import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {store} from './store/store';
import {routes} from './routes/routes.js';
import axios from 'axios'
// https://soporte-6eul.onrender.com http://localhost:4000
axios.defaults.baseURL = 'https://soporte-6eul.onrender.com/api';

Vue.use(VueRouter)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
