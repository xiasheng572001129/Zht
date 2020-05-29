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
        <div class="quote-ele"><i></i>供应商-提现-未审核 </div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <el-table :data="list">
        <el-table-column label="供应商名称"
                         prop="sm_name"
                         align="center">

        </el-table-column>
        <el-table-column label="开户行"
                         prop="bank"
                         align="center">

        </el-table-column>
        <el-table-column label="开户分行"
                         prop="bank_branch"
                         align="center">

        </el-table-column>
        <el-table-column label="开户人"
                         prop="bank_name"
                         align="center">
        </el-table-column>
        <el-table-column label="银行卡号"
                         prop="account"
                         align="center">

        </el-table-column>

        <el-table-column label="提现金额"
                         prop="total_money"
                         align="center">

        </el-table-column>

        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center">

        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="through(scope.row)">通过</el-button>
            <el-button type="danger "
                       size="small"
                       @click="reject(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="详情"
                 center
                 :visible.sync="detailVisible">
        <table class="table">
          <tr>
            <th>油品名称</th>
            <th>总后台的油品名称</th>
            <th>油品介绍</th>
            <th>升数</th>
            <th>结算价</th>
            <th>型号</th>
            <th>油品图片</th>
          </tr>
          <tr v-for='(item,index) in detailList'
              :key="index">
            <td>
              {{item.oil_name}}
            </td>
            <td>
              {{item.little_name}}
            </td>
            <td>
              <el-popover placement="top-start"
                          title="油品介绍"
                          width="200"
                          trigger="hover"
                          :content="item.about">
                <el-button slot="reference"
                           type="text"
                           class="ellipsis"
                           style="width:100px">{{item.about}}</el-button>
              </el-popover>
            </td>
            <td>
              {{item.rise}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              {{item.standard}}
            </td>
            <td>
              <img :src="item.cover"
                   ref="images">
            </td>
          </tr>
        </table>
      </el-dialog>
      <div class="page_center"
           v-show="page&&page>1">
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
      authList: [],
      threeAuthList: [],
      thCurId: '',
      curId: '',
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      page: 0,
      pageCount: 0,
      detailList: [],

      detailVisible: false, //详情弹框状态
      throughLoading: false, //通过加载Loading
      rejectLoading: false, //驳回Loading
    }
  },

  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },

    async init () {
      try {
        const res = await this.$axios.post('admin/SmCash/smApplyCashList', { token: this.token, page: this.page, status: 0 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0


      } catch (err) {
        throw (err)
      }
    },
    detail () {  //油品详情
      this.$nextTick(() => {
        const ViewerRef = this.$refs.images
        Viewer(ViewerRef)
      })
    },
    //通过审核
    through (row) {
      this.$prompt('请输入转账电话', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^1[3456789]\d{9}$/,
        inputValue: '13811959239',
        inputErrorMessage: '手机号错误'
      }).then(async (current) => {
        try {

          this.throughLoading = true
          const res = await this.$axios.post('admin/SmCash/cashHandle', { token: this.token, sm_id: row.sm_id, id: row.id, total_money: row.total_money, main_phone: current.value })
          this.throughLoading = false
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
    //驳回
    reject (row) {

      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading = true
          const res = await this.$axios.post('admin/SmCash/cashReject', { token: this.token, sm_id: row.sm_id, reason: value, id: row.id, total_money: row.total_money })
          this.rejectLoading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.errof(res.data.msg)
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
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].son) {
              if (arr[i].name == '提现') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;

              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '申请列表' && arr[i].name == '提现') {
                  this.thCurId = arr[i].son[j].id;
                }
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
  created () {
    this.erAuth()
  },
  mounted () {
    this.init() //初始化数据  
  },
}
</script>
<style scoped>
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