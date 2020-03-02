import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import App from './App'
import axios from 'axios'
import Vuex from 'vuex'
import echarts from 'echarts'
import '../static/css/common.css'
// 富文本编辑器
import '../static/ud/ueditor.config.js'
import '../static/ud/ueditor.all.js'
import '../static/ud/lang/zh-cn/zh-cn.js'
import '../static/ud/ueditor.parse.min.js'
// element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/iconfont.css'

import { ContainerMixin, ElementMixin } from 'vue-slicksort';

// // import Blob from './excel/Blob'
// import Export2Excel from './excel/Export2Excel'

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.layerHeader = 'https://zd.ctbls.com/';
axios.defaults.withCredentials = true;

axios.defaults.baseURL = process.env.BASE_URL;  /*cc 线上 / ceshi 测试*/
Vue.prototype.baseURL = process.env.BASE_URL

// axios.defaults.baseURL = 'http://192.168.1.166/car/public/index.php';  /*cc 线上 / ceshi 测试*/
// Vue.prototype.baseURL = 'http://192.168.1.166/car/public/index.php'
//解决post发数据
import qs from 'qs';
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);

    return config;
}, function (error) {
    return Promise.reject(error);
});
Vue.config.productionTip = false
Vue.use(Router);
var router = new Router({
    linkActiveClass: 'cur',
    routes: routes,
})
Vue.filter('datetime', function (timestamp) {
    if (timestamp == "") return "--"
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
})

import ctbHead from './components/common/ctbHead'
import pagination from "@/components/pagination/pagination"
import RegionDialog from "@/components/Dialog/RegionDialog"
import herderBar from "@/components/herderBar/herderBar"
import sidebar from '@/components/common/sidebar'
import store from "@/Vuex/store/store"
Vue.component(ctbHead.name, ctbHead)
Vue.component("paging", pagination)
Vue.component("RegionDialog", RegionDialog)
Vue.component('herderBar', herderBar)
Vue.component(sidebar.name, sidebar)
// import UE from './components/common/uedit.vue'
// Vue.component(UE.name,UE)

router.beforeEach((to, from, next) => {
    if (to.meta.auth == true) {
        if (!window.sessionStorage.getItem("bbytoken")) {
            alert('请先登录');
            next({
                path: '/login'
            });
        }
    }
    next();
})
var vm = new Vue({
    el: '#app',
    router: router,
    store,
    render: c => c(App)
})
