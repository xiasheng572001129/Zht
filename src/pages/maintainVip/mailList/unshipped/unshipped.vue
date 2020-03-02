<template>
  <div class='notDeliverGoods'>
    <p class="Export">
      <el-button type="primary"
                 @click="EXport()">导出</el-button>
    </p>
    <table class='table'>
      <thead>
        <tr>
          <th>维修厂名称</th>
          <th>维修厂电话</th>
          <th>负责人</th>
          <th>地址</th>
          <th>待发货数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.province + item.city + item.address}}</td>
          <td>
            <el-button type="text"
                       @click="examineDetails(item.num)">{{item.number}}</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 模态框 -->
    <el-dialog title="详情"
               :visible.sync="dialogTableVisible"
               :center=true>
      <el-table :data="listChil">
        <el-table-column property="man"
                         label="收货人姓名"
                         align="center"></el-table-column>
        <el-table-column property="phone"
                         label="收货人电话"
                         align="center"></el-table-column>
        <el-table-column property="address"
                         label="收货人地址"
                         align="center"></el-table-column>
        <el-table-column property="time"
                         label="申请时间"
                         align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 分页 -->
    <div :class="list.length<=7?'page-nav':'page_center'"
         v-show="list.length>0">
      <paging :page-count="pageCount"
              :page="page"
              @index="paging"></paging>
      <!--分页的组件-->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      list: {},
      page: 1, //当前页
      pageCount: 1,//总页数
      detailsVisible: false, //详情弹框状态
      ReasonVisible: false, //驳回理由状态
      information: {}, //保单信息，
      dialogTableVisible: false,//默认模态框状态，
      listChil: [] //模态框数据
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/PolicyAudit/notOrders', { token: this.token, page: this.page }).then(res => {
        if (res.data.code == 1) {
       
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },
    examineDetails (value) {
      this.dialogTableVisible = true
      this.listChil = value
     
    },
    EXport () {
      window.location.href = `${this.baseURL}admin/Login/order?type=1`
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.Export {
  text-align: right !important;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
