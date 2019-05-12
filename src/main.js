// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter);

import Vuex from 'vuex'
Vue.use(Vuex);

let car = JSON.parse(localStorage.getItem('car') || '[]');

let store = new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    addToCar(state, goodsinfo) {

      let flag = false;

      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });

      if (!flag) {
        state.car.push(goodsinfo);
      }

      localStorage.setItem('car', JSON.stringify(state.car));

    },
    updateGoodsInfo(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });

      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFromCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1);
          return true;
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
          return true;
        }
      });

      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: {
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      let o = {};

      state.car.forEach(item => {
        o[item.id] = item.count
      });

      return o;
    },
    getGoodsSelected(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });

      return o;
    },
    getGoodsCountAndAmount(state) {
      let o = {
        count: 0,
        amount: 0
      };

      state.car.forEach(item => {
        if (item.selected) {
          o.count += parseInt(item.count);
          o.amount += parseInt(item.price) * parseInt(item.count);
        }
      });

      return o;
    }
  }
});

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource);


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

import moment from 'moment'

Vue.http.options.emulateJSON = true;


import VuePreview from 'vue-preview'
Vue.use(VuePreview);

Vue.filter('dateFormat', function (dataStr, pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
});

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, // 1.4 挂载路由对象到 VM 实例上
  store
});