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
             style="float:left"><i></i>供应商-取消合作 </div>
      </div>
      <div class="search">
        <el-select v-model="status"
                   @change="search">
          <el-option value="'0'"
                     label="申请中"></el-option>
          <el-option value="1"
                     label="已通过"></el-option>
          <el-option value="2"
                     label="已驳回"></el-option>
        </el-select>
      </div>
      <el-table :data="list">
        <el-table-column label="供应商名称"
                         prop="name"
                         align="center"></el-table-column>
        <el-table-column label="银行卡号"
                         prop="account"
                         align="center"></el-table-column>
        <el-table-column label="开户名称"
                         prop="bank_name"
                         align="center"></el-table-column>
        <el-table-column label="质保金"
                         prop="set_retention_money"
                         align="center"></el-table-column>
        <el-table-column label="已缴纳质保金"
                         prop="my_retention_money"
                         align="center"></el-table-column>
        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center"></el-table-column>
        <el-table-column label="处理时间"
                         prop="cancel_time"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="adopt(scope.row,scope.$index)"
                       :loading="adoptLoading[scope.$index]"
                       v-if='scope.row.status==0'>通过</el-button>
            <el-button type="primary"
                       size="small"
                       @click='Reject(scope.row,scope.$index)'
                       :loading="RejectLoading[scope.$index]"
                       v-if='scope.row.status==0'>驳回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      authList: [],
      page: 0,  //供应商列表当前页数
      pageCount: 0, //供应商列表总页数
      detailVisible: false,
      status: '',
      detailList: [],
      adoptLoading: [],
      RejectLoading: []
    }
  },

  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },
    search () {  //搜索
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/SmList/cancelList', { token: this.token, page: this.page, status: this.status })
        this.list = res.data.data || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    async adopt (row, index) {  //取消合作 通过
      this.$prompt('请输入退还的质保金', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '质保金不能为空'
      }).then(async ({ value }) => {
        try {
          console.log(index)
          this.adoptLoading[index] = true
          const res = await this.$axios.post('admin/SmList/passCancel', { token: this.token, sm_id: row.sm_id, money: value, id: row.id })
          this.adoptLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
    },
    async Reject (row, index) {  //驳回
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回不能为空'
      }).then(async ({ value }) => {
        try {
          this.RejectLoading[index] = true
          const res = await this.$axios.post('admin/SmList/rejectCancel', { token: this.token, sm_id: row.sm_id, reason: value, id: row.id })
          this.RejectLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
    },


    // 权限列表,当前所在权限页  
    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      }).then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data || [];
          this.authList = arr;
          console.log(this.authList)
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
  created () {
    this.erAuth()
  },
  mounted () {

    this.init() //初始化数据  

  },
}
</script>
<style scoped>
.search {
  width: 100%;
  overflow: hidden;
}
.search {
  padding: 0px 0px 20px 50px;
}

.table img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.ellipsis {
  width: 80px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
</style>