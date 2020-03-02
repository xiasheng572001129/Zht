<template>
  <div>
    <ctbHead>
      <router-link v-for="(item,index) in authList"
                   :key="index"
                   :class="cur"
                   active-class="activeClass"
                   :to="{path:item.action,query:{id:curId}}">
        {{item.name}}
        <el-badge v-show='index==0 && $store.state.policyNumber>0'
                  :value="$store.state.policyNumber"
                  :max='99'
                  class="item">
        </el-badge>
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>邦保养会员车管家-设备邮寄</div>
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
<script type="text/ecmascript-6">

import detailsDialog from "@/components/Dialog/Dialog";
import RegionDialog from "@/components/Dialog/RegionDialog"
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: '',
      seCurId: '',
      curId: '',
      threeAuthList: [
        { name: '已发货列表', action: 'delivered' },
        { name: '未发货列表', action: 'unshipped' },
      ],

    }
  },
  components: {
    detailsDialog,
    RegionDialog
  },

  methods: {

  },
  created () {


  },
  mounted () {

    // var id = this.$route.query.id;
    // this.curId = id;
    // this.$axios.post('admin/Auth/erAuth', {
    //   token: window.sessionStorage.getItem('bbytoken'),
    //   id: id
    // })
    //   .then(res => {
    //     if (res.data.code == 1) {
    //       var arr = res.data.data;
    //       for (var i = 0; i < arr.length; i++) {
    //         if (arr[i].name == '设备邮寄列表') {
    //           console.log(arr[i].name)
    //           this.seCurId = arr[i].id;
    //         }
    //       }
    //       this.authList = arr;
    //     } else {
    //       this.$alert(res.data.msg, '提示', {
    //         type: 'error'
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     alert(err);
    //   })
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
.item {
  border: none;
}
.activeClass {
  color: red;
}
>>> .el-badge__content {
  border: none;
}
.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}

.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}

.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.shuju .son li {
  display: block;
}

.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}

.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}
.details_content:after {
  display: block;
  content: "";
  clear: both;
}
.details_content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  /*border-right: 1px dashed #04BBFC;*/
}
.details_content > div {
  flex: 1;
}
.details_content > div:first-child {
  text-align: center;
}
.details_content > div:last-child {
  border-left: 1px dashed #04bbfc;
}

.right {
  display: inline-block;
  padding-left: 6%;
  margin-left: 8px;
}
.right li {
  box-sizing: border-box;
  padding: 16px 80px;
  margin: 28px 0;
  white-space: nowrap;
  min-width: 320px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);
}
.right_border-bottom {
  border-bottom: 1px solid #ccc;
}
.right_border-bottom input {
  border: none;
  height: 25px;
}
.Reject_Reason {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.Reject_Reason > div:last-child {
  border-bottom: 1px solid #ccc;
  width: 70%;
  margin-left: 10px;
}
.Reject_Reason input {
  border: none;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.details_box-btn {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
.details_box-btn > button:first-child {
  margin-right: 200px;
}

.Tips {
  color: red;
  margin-left: 8%;
}
</style>
<style>
.container .el-dialog__header {
  background: rgba(152, 209, 249, 1);
}
</style>
