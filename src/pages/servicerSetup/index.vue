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
        <div class="quote-ele"
             style="float:left"><i></i>系统设置-服务车系统设置</div>
      </div>
      <el-form label-width="100px"
               :model="formData"
               style="width:25%;margin-left:50px">
        <el-form-item label="车价:">
          <el-input placeholder='请输入车价'
                    v-model="formData.carFee" />
        </el-form-item>
        <el-form-item label="保险:">
          <el-input placeholder='请输出保险'
                    v-model="formData.insurance" />
        </el-form-item>
        <el-form-item label="购置税:">
          <el-input placeholder='请输入购置税'
                    v-model="formData.taxFee" />
        </el-form-item>
        <el-form-item label="服务费:">
          <el-input placeholder='请输入服务费'
                    v-model="formData.serveFee" />
        </el-form-item>

        <el-form-item label="公司支持:">
          <el-input placeholder='请输入公司所支持'
                    v-model="formData.company" />
        </el-form-item>
        <el-form-item label="车补:">
          <el-input placeholder='请输入车补费'
                    v-model="formData.carSubsidy" />
        </el-form-item>
        <el-form-item label="产权归属:">
          <el-input placeholder='请输入产权归属'
                    v-model="formData.equity" />
        </el-form-item>
        <el-form-item label="个人月供:">
          <el-input placeholder='请输入个人月供'
                    v-model="formData.monthly" />
        </el-form-item>
        <el-form-item label="还款周期:">
          <el-input placeholder='请输入还款周期'
                    v-model="formData.cycle" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="Modify">修改</el-button>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import wangEditor from '@/components/common/wangEditor'
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      authList: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      formData: {

      },


    }
  },

  methods: {

    async init () {
      try {
        const res = await this.$axios.post('admin/ShopList/carInfo', { token: this.token })
        this.formData = res.data.data
      } catch (err) {
        throw (err)
      }
    },
    async Modify () {   //修改
      try {
        const res = await this.$axios.post('admin/ShopList/updateCar', Object.assign({}, this.formData, { token: this.token }))
        if (res.data.code == 1) {
          this.init()
          this.$message({ message: res.data.msg, type: 'success' })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    },


    // 权限列表,当前所在权限页  
    erAuthList () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: this.token,
        id: id
      })
        .then(res => {
          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].son) {
                if (arr[i].name == '服务车系统设置') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
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
    }
  },
  updated () {

  },
  mounted () {
    this.init() //初始化数据  
    this.erAuthList()

  },
}
</script>
<style scoped>
>>> .el-dialog__body {
  padding-top: 30px !important;
}
.quote:after {
  display: block;
  clear: both;
  content: "";
}
.rewardImg {
  width: 70px;
  height: 70px;
}

.add_goods {
  float: right;
  margin-top: 25px;
  margin-right: 20px;
}
.ellipsis {
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
>>> .el-dialog__header {
  text-align: center;
}
>>> .w-e-toolbar {
  overflow: auto;
}
</style>