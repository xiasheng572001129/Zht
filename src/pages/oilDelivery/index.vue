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
             style="float:left"><i></i>供应商-油品发货信息 </div>
      </div>
      <div class="search">
        <el-select v-model="status"
                   @change="search">
          <el-option value="'0'"
                     label="申请中"></el-option>
          <el-option value="1"
                     label="发货中"></el-option>
          <el-option value="2"
                     label="已收货"></el-option>
          <el-option value="3"
                     label="驳回"></el-option>
        </el-select>

      </div>
      <el-table :data="list">
        <el-table-column label="供应商名称"
                         prop="sm_name"
                         align="center"></el-table-column>
        <el-table-column label="运营商/维修厂名称"
                         prop="company"
                         align="center"></el-table-column>
        <el-table-column label="金额(元)"
                         prop="settlement_price"
                         align="center"></el-table-column>
        <el-table-column label="发货状态"
                         prop="sm_name"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.audit_status==0 ? '申请中' :scope.row.audit_status==1 ? '发货中' :scope.row.audit_status==2 ? '已收货' : '驳回'}}
          </template>
        </el-table-column>
        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="detailVisible=true,detail(scope.row)">详情</el-button>
            <el-button type="primary"
                       size="small"
                       @click='remind(scope.row)'
                       :disabled="!scope.row.audit_status==0">{{scope.row.audit_status==0 ? '提醒发货' :scope.row.audit_status==1 ? '发货中' :scope.row.audit_status==2 ? '已收货' : '驳回'}}</el-button>
            <el-button type="primary"
                       size="small"
                       @click="allowGoods(scope.row)"
                       :disabled="scope.row.order_status==1">允许收货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情"
                 center
                 :visible.sync="detailVisible">
        <table class="table">
          <tr>
            <th>油品名称</th>

            <th>数量</th>
            <th>价格(元)</th>
            <th>备注</th>

            <th>油品图片</th>
          </tr>
          <tr v-for='(item,index) in detailList'
              :key="index">
            <td>
              {{item.materiel}}
            </td>
            <td>
              {{item.num}}
            </td>
            <td>
              {{item.settlement_price}}
            </td>
            <td>
              {{item.remarks}}
            </td>
            <td>

              <img :src="item.pic"
                   ref="images">
            </td>
          </tr>
        </table>
      </el-dialog>
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
      detailList: []
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
        const res = await this.$axios.post('admin/SmDeliver/getOilDeliverList', { token: this.token, page: this.page, status: this.status })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0


      } catch (err) {
        throw (err)
      }
    },
    async detail (row) {  //油品详情
      try {
        const res = await this.$axios.post('admin/SmDeliver/getOilDetail', { token: this.token, type: row.type, id: row.id, sm_id: row.sm_id })
        if (res.data.code == 1) {
          this.detailList = res.data.data
          this.$nextTick(() => {
            const ViewerRef = this.$refs.images
            Viewer(ViewerRef)
          })
        }
      } catch (err) {
        throw (err)
      }
    },
    //提醒发货
    async remind (row) {
      try {
        const res = await this.$axios.post('admin/SmDeliver/remindDeliver', { token: this.token, sm_id: row.sm_id })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    },
    allowGoods (row) {  //允许收货
      this.$confirm('此操作将允许收货, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          const res = await this.$axios.post('admin/ShopAudit/affirmOrder', { token: this.token, id: row.id })
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
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