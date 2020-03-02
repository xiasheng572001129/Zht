<template>
  <div class='DeliverGoods'>
    <table class='table'>
      <tr>
        <th>收货人姓名</th>
        <th>收货人电话</th>
        <th>收货地址</th>
        <th>发货时间</th>
      </tr>
      <tr v-for="(item,index) in list"
          :key="index">
        <td style='width: 10%'>{{item.man}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.address+item.details}}</td>
        <td>{{item.hair_time}}</td>
      </tr>
    </table>
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
      information: {}, //保单信息
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/MemAddList/already', { token: this.token, page: this.page }).then(res => {
        if (res.data.code == 1) {
        
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },
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
.DeliverGoods .table td {
  width: calc(100% / 3);
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
