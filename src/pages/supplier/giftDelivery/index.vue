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
             style="float:left"><i></i>供应商-礼品发货信息 </div>
      </div>
      <div class="search">
        <el-select v-model="status"
                   @change="search">
          <el-option value="'0'"
                     label="未发货"></el-option>
          <el-option value="1"
                     label="已发货"></el-option>
          <el-option value="2"
                     label="已收货"></el-option>
          <el-option value="3"
                     label="待确认"></el-option>
        </el-select>

      </div>
      <el-table :data="list">
        <el-table-column label="供应商名称"
                         prop="sm_name"
                         align="center"></el-table-column>
        <el-table-column label="运营商/维修厂名称"
                         prop="company"
                         align="center"></el-table-column>
        <el-table-column label="商品名称"
                         prop="type_name"
                         align="center"></el-table-column>
        <el-table-column label="品牌"
                         prop="gifts_brand"
                         align="center"></el-table-column>
        <el-table-column label="数量"
                         prop="num"
                         align="center"></el-table-column>
        <el-table-column label="订单价格"
                         prop="price"
                         align="center">

        </el-table-column>
        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click='scope.row.status==0 ? remind(scope.row) : confirm(scope.row)'
                       :disabled="!(scope.row.status==0 || scope.row.status==3)">{{scope.row.status==0 ? '提醒发货' :scope.row.status==1 ? '已发货' : scope.row.status == 2 ? '已确认' : '确认' }}</el-button>
            <el-button type="primary"
                       @click="detailVisible=true,details(scope.row)"
                       size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 订单详情  -->
      <el-dialog title='详情'
                 :visible.sync="detailVisible"
                 center
                 width="40%">

        <div class="details">
          <p>
            <span>详细地址: </span>
            <span>{{`${detailList.province}${detailList.city}${detailList.county}${detailList.address}`}}</span>
          </p>
          <p>
            <span>品牌: </span>
            <span>{{detailList.gifts_brand}}</span>
          </p>
          <p>
            <span>礼品类型: </span>
            <span>{{detailList.gifts_standard}}</span>
          </p>
          <p>
            <span>详情: </span>
            <span>{{detailList.detail}}</span>
          </p>

        </div>

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
        const res = await this.$axios.post('admin/SmDeliver/getGiftsDeliverList', { token: this.token, page: this.page, status: this.status })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    async details (row) {  //订单详情
      try {
        const res = await this.$axios.post('admin/SmDeliver/getGiftsDelicerDetail', { token: this.token, id: row.id })
        this.detailList = res.data.data
      } catch (err) {
        throw (err)
      }
    },
    //提醒发货
    async remind (row) {
      try {
        const res = await this.$axios.post('admin/SmDeliver/remindDeliver', { token: this.token, sm_id: row.id })
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
    async confirm (row) {  //确认
      try {
        const res = await this.$axios.post('admin/SmDeliver/adminGifts', { token: this.token, id: row.id, sm_id: row.sm_id })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
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