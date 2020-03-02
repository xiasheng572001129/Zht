<template>
  <div class='Addresslist'>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="(item,index) in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}">
        {{item.name}}
        <el-badge v-show='index==2 && $store.state.policyNumber>0'
                  :value="$store.state.policyNumber"
                  :max='99'
                  class="item">
        </el-badge>
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>ubi用户邮寄地址</div>
        <div class='export'>
          <el-button type="primary"
                     @click="EXPort()">导出</el-button>
        </div>
        <div class="quote-nav">
          <router-link v-for="(item,index) in threeAuthList"
                       :to="{path:item.action,query:{id:curId}}"
                       active-class="cur"
                       :key="index">
            <span>{{item.name}}</span>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: '',
      seCurId: '',
      curId: '',
      routerIndex: '',
      threeAuthList: [
        { name: '待发货', action: '/Addresslist/notDeliverGoods' },
        { name: '已发货', action: '/Addresslist/DeliverGoods' }
      ],
      ExportDialogVisible: false,
      form: {
        currentProvince: '',
        currentCity: '',
        province: '',
        city: ''
      },
      path: this.$route.path
    }
  },

  methods: {

    ProvinceChange (pid) { //根据省的Id获取市
      this.$axios.post('admin/MemAddList/cityL', { token: this.token, pid: pid }).then(res => {
        if (res.data.code == 1) {
         
          this.form.city = res.data.data
        }
      }).catch(err => console.log(err))
    },
    EXPort () { //导出excel表格
    
      window.location.href = `${this.baseURL}admin/Login/order`
    },
  
  },

  mounted () {


    var id = this.$route.query.id;
    this.curId = id;
    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {
        
        let path = this.$route.path.substr(0, this.$route.path.lastIndexOf('/'))
     
        if (res.data.code == 1) {
          var arr = res.data.data;

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].action == path) {
              this.seCurId = arr[i].id;
            }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
      .catch(err => {
        alert(err);
      })
  },
  watch: {
    index () {
      this.init();
    },
    profit (newVal, oldVal) {
      //输出的时候最大是15
      if (newVal > 15) {
        this.profit = 15
      }
    }
  }
}
</script>
<style scoped>
.Addresslist >>> .el-dialog__header {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(230, 230, 235, 1);
  background: none !important;
}
.export {
  float: right;
  margin-top: -50px;
  margin-right: 70px;
}
.line {
  text-align: center;
}
</style>
