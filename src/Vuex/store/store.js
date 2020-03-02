import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex, axios)
export default new Vuex.Store({
    state: {
        newsTips: {},  //消息提示的总数据
        policyNumber: ''
    },
    mutations: {
        increment () {
            axios.post('Smoc/msgALl', { token: window.sessionStorage.getItem("bbytoken") }).then(res => {

                if (res.data.code == 1) {
                    this.state.newsTips = res.data.data
                }
            }).catch(err => console.log(err))
        },
        setpolicyNumber (state, num) {

            state.policyNumber = num
        },
        policyNumberReduce (state) {
            state.policyNumber -= 1
        }
    },
})
