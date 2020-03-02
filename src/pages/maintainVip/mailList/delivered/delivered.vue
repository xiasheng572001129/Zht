<template>
  <div class='DeliverGoods'>

    <table class='table'>
      <tr>
        <th>维修厂名称</th>
        <th>维修厂电话</th>
        <th>负责人</th>
        <th>地址</th>
        <th>已发货数量</th>
      </tr>
      <tr v-for="item in list">
        <td>{{item.company}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.leader}}</td>
        <td>{{item.province + item.city + item.address}}</td>
        <td>
          <el-button type="text"
                     @click="examineDetails(item.num)">{{item.number}}</el-button>
        </td>
      </tr>
    </table>
    <!-- 模态框 -->
    <el-dialog title="详情"
               :visible.sync="dialogTableVisible"
               :center=true>
      <el-table :data="listChil">
        <el-table-column property="man"
                         label="姓名"
                         align="center"></el-table-column>
        <el-table-column property="phone"
                         label="电话"
                         align="center"></el-table-column>
        <el-table-column label="地址"
                         align="center">
          <template slot-scope="scope">
                       <span>{{scope.row.address}}{{scope.row.details}}</span>
                      </template>
        </el-table-column>
        <el-table-column property="hair_time"
                         label="收货时间"
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
      list: [],
      page: 1, //当前页
      pageCount: 1,//总页数
      detailsVisible: false, //详情弹框状态
      ReasonVisible: false, //驳回理由状态
      information: {}, //保单信息
      dialogTableVisible: false,//默认模态框状态,
      listChil: [] //模态框数据
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/PolicyAudit/yearsOrders', { token: this.token, page: this.page }).then(res => {
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
   
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.table a {
  color: #04bbfc;
}
.details {
  font-size: 12px;
}
.information > dt {
}
.details table td {
  font-size: 12px;
  border: none;
}
.Insurancetype {
  margin-top: 20px;
}
.Insurancetype table {
  border: 1px solid #dbdbdb;
}
.Insurancetype table th {
  background: none;
  width: 50%;
  border: 1px solid #dbdbdb;
  font-size: 16px;
}
.Insurancetype table td {
  border: 1px solid #dbdbdb;
}
.Photo {
  text-align: center;
  margin-top: 20px;
  overflow-x: auto;
}

.Photo > ul {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.Photo > ul > li {
}
.Photo img {
  text-align: center;
  max-height: 100px;
  max-height: 100px;
  padding-left: 10px;
}
.content > textarea {
  border: none;
  width: 100% !important;
  resize: none;
  height: 100px;
  max-height: 300px !important;
}
</style>
<style>
.adopt .el-dialog__header {
  background: none;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6eb;
}
.adopt .el-dialog__footer {
  border-top: 1px solid #e6e6eb;
  padding-bottom: 10px;
}
.Reason .el-dialog__header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6eb;
}
.Reason .el-dialog__footer {
  border-top: 1px solid #e6e6eb;
  padding-bottom: 10px;
}
</style>
