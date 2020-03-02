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
             style="float:left"><i></i>供应商-供应商列表 </div>
      </div>
      <el-table :data="list">
        <el-table-column label="供应商名称"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="personalDetailsVisible=true,information(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="电话"
                         prop="phone"
                         align="center"></el-table-column>

        <el-table-column label="总收入(元)"
                         prop="name"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="earningsVisible=true,earningDetails(scope.row.id)">{{scope.row.total_income}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="提现(金额)"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text">{{scope.row.cash_money}}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 供应商信息详情 -->
      <el-dialog title='供应商信息详情'
                 center
                 :visible.sync="personalDetailsVisible"
                 width="30%">
        <div>
          <div class="head_pic">
            <!-- <p>头像</p> -->
            <img :src="detailsList.head_pic">
          </div>
          <div class="details">
            <p>
              <span>供应商名称: </span>
              <span>{{detailsList.name}}</span>
            </p>
            <p>
              <span>银行名称: </span>
              <span>{{detailsList.bank}}</span>
            </p>
            <p>
              <span>分行: </span>
              <span>{{detailsList.bank_branch}}</span>
            </p>
            <p>
              <span>开户名: </span>
              <span>{{detailsList.bank_name}}</span>
            </p>
            <p>
              <span>账号: </span>
              <span>{{detailsList.account}}</span>
            </p>
          </div>
        </div>
      </el-dialog>

      <!-- 收益详情 -->

      <el-dialog title='收益详情'
                 center
                 :visible.sync="earningsVisible">
        <el-table :data="earningsList">
          <el-table-column label="审核人"
                           prop="audit_person"
                           align="center">

          </el-table-column>
          <el-table-column label="结算金额"
                           prop="total_money"
                           align="center">

          </el-table-column>
          <el-table-column label="结算时间"
                           prop="audit_time"
                           align="center">

          </el-table-column>
          <el-table-column label="申请时间"
                           prop="create_time"
                           align="center">

          </el-table-column>

        </el-table>
        <div class="page_center"
             v-show="pageCount&&pageCount>1">
          <paging :page-count="pageCount"
                  :page="page"
                  @index="earningsPaging"></paging>
          <!--分页的组件-->
        </div>
      </el-dialog>
      <div class="page_center"
           v-show="earningsTotal&&earningsTotal>1">
        <paging :page-count="earningsTotal"
                :page="earningsPage"
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
      personalDetailsVisible: false, //供应商信息详情状态
      detailsList: {}, //供应商信息详情列表
      AreaVisible: false, //地区详情状态
      AreaList: [], //地区详情列表
      earningsVisible: false, //收益详情状态
      earningsList: [], //收益详情列表
      cancelAreaVisible: false, //取消区域详情状态
      cancelAreaList: [], //取消区域列表
      page: 0,  //供应商列表当前页数
      pageCount: 0, //供应商列表总页数
      earningsPage: 0,  //收益列表当前页数
      earningsTotal: 0, // 收益列表总页数
      sm_id: 0
    }
  },

  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },
    earningsPaging (e) {  //获取总收入当前页
      this.earningsPage = e;
      this.earningDetails(this.sm_id)
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/SmList/smIndexList', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    //获取个人信息详情
    async information (row) {
      try {
        const res = await this.$axios.post('admin/SmList/getSmUserDetail', { token: this.token, sm_id: row.id })
        this.detailsList = res.data.data || {}
      } catch (err) {
        throw (err)
      }
    },
    //地区详情列表
    async AreaDetails (row) {
      try {
        const res = await this.$axios.post('admin/SmList/gerSmAreaInfo', { token: this.token, sm_id: row.id })
      } catch (err) {
        throw (err)
      }
    },
    //收益详情列表
    async earningDetails (sm_id) {
      this.sm_id = sm_id
      //   console.log(sm_id)
      try {
        const res = await this.$axios.post('admin/SmList/getSmApplyCash', { token: this.token, sm_id: sm_id })
        this.earningsList = res.data.data.list || []
        this.earningsTotal = res.data.data.rows || 0;
      } catch (err) {
        throw (err)
      }
    },
    //取消合作
    async cancel (row) {
      try {
        const res = await this.$axios.post('admin/SmList/gerSmAreaInfo', { token: this.token, sm_id: row.id })
        this.cancelAreaList = res.data.data
      } catch (err) {
        throw (err)
      }
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
.head_pic {
  text-align: center;
}
.head_pic > p {
  padding: 5px 0;
}
.head_pic > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.details span {
  display: inline-block;
  width: 48%;
  padding: 10px 0;
}
.details p > span:last-child {
  text-align: right;
}
</style>