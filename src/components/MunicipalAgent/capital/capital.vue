<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>资金提现<input placeholder="搜索"
                 class="CityInput"
                 v-show="isShow"></div>
      </div>
      <div class="Routers"
           v-show="isShow">
        <router-link :to="{path:'/MunicipalAgent/capital/capital/Apply',query:{id:curId}}"
                     active-class="activeClass">申请</router-link>
        <router-link :to="{path:'/MunicipalAgent/capital/capital/adopt',query:{id:curId}}"
                     active-class="activeClass">通过</router-link>
        <router-link :to="{path:'/MunicipalAgent/capital/capital/Reject',query:{id:curId}}"
                     active-class="activeClass">驳回</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../../common.js';
export default {
  data () {
    return {
      isShow: true,
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      authList: [],
      curId: 0,
      seCurId: 0,
      centerDialogVisible: false
    }
  },
  updated () {
    if (this.$route.query.is) {
      this.isShow = false
    } else {
      this.isShow = true
    }
  },
  mounted () {
    var id = this.$route.query.id
    this.curId = id;
    this.$axios.post("admin/Auth/erAuth", {
      token: this.token,
      id: id
    }).then(res => {
      var arr = res.data.data;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == "资金提现") {
          this.seCurId = arr[i].id
        }
      }
      this.authList = arr;
    })
  },
  methods: {
    paging (e) {
      this.page = e;
    },
    regionNum () {
      this.centerDialogVisible = true
    },
    tapSee (e) {

    }
  }
}
</script>
<style scoped>
.activeClass {
  color: #333333 !important;
}

.CityInput {
  width: 100px;
  margin-left: 400px;
  height: 36px;
  border: 0;
  outline: none;
  background-color: #04bbfc;
  border-radius: 18px;
  text-align: center;
}

input::-webkit-input-placeholder {
  color: #ffffff;
}
.region {
  margin-bottom: 50px;
  width: 100%;
  text-align: center;
}
.region > p {
  display: inline-block;
  margin: 0 50px;
}
.region > p > span {
  display: inline-block;
}
.Routers {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}
.Routers a {
  color: #999999;
  font-size: 22px;
  text-align: center;
}
</style>
<style>
.el-dialog__header {
  background: rgba(152, 209, 249, 1);
  padding-bottom: 20px;
}
.el-dialog__title {
  color: white;
}
</style>
