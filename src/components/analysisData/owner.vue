<template>
  <div class="owner">
    <ctbHead></ctbHead>
    <sidebar></sidebar>
    <div class="container">
      <div class="search">
        <input type="text"
               placeholder="请输入车牌号/电话号码"
               name="search">
        <button class="btn"
                @click="search()">搜索</button>
      </div>
      <div class="carOwners">

        <table>
          <thead>
            <td>车牌</td>
            <td>姓名</td>
            <td>电话</td>
            <td>省市县</td>
            <td>所属维修厂</td>
            <td>参与数</td>
            <td>复购次数</td>
            <td>剩余次数</td>
            <td>介绍奖励</td>
          </thead>
          <tr v-for="item in list">
            <td>{{item.plate}}</td>
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.areas}}</td>
            <td>{{item.usname}}</td>
            <td>{{item.parsum}}</td>
            <td>{{item.plexsum}}</td>
            <td>{{item.moresum}}</td>
            <td>
              <el-button type="text"
                         @click="awardDetail(item.id)">{{item.price}}</el-button>
            </td>
          </tr>

        </table>
        <el-pagination background
                       v-if="listShow"
                       @prev-click="prev"
                       @next-click="next"
                       @current-change="current"
                       layout="prev, pager, next"
                       :page-count="pageCount">
        </el-pagination>
        <el-pagination background
                       v-if="searchShow"
                       @prev-click="prev3"
                       @next-click="next3"
                       @current-change="current3"
                       layout="prev, pager, next"
                       :page-count="pageCount3">
        </el-pagination>
        <el-dialog title="提示"
                   :visible.sync="centerDialogVisible"
                   :modal="false"
                   width="30%"
                   center>
          <table class="xqtable">
            <thead style="background:#CDF1FE;">
              <td>转介绍人</td>
              <td>提现金额</td>
              <td>提现时间</td>
            </thead>
            <tr v-for="item in award">
              <td>{{item.name}}</td>
              <td>{{item.reward}}</td>
              <td>{{item.create_time}}</td>

            </tr>
          </table>
          <el-pagination background
                         @prev-click="prev2"
                         @next-click="next2"
                         @current-change="current2"
                         layout="prev, pager, next"
                         :page-count="pageCount2">
          </el-pagination>
        </el-dialog>
      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      centerDialogVisible: false,
      list: "",
      page: 1,
      pageCount: 1,
      pageCount2: 1,
      pageCount3: 1,
      page2: 1,
      page3: 1,
      award: "",
      ownerId: "",
      listShow: true,
      searchShow: false,
    }
  },
  mounted () {
    var province = sessionStorage.getItem("province");
    var provinceId = sessionStorage.getItem("provinceId");
    //获取所有车主信息-----------------------------------
    this.$axios.post('admin/Carview/ownerList', { token: this.token, area: province, page: 1 }).then(res => {
      this.list = res.data.data.list;
      this.pageCount = res.data.data.rows;

    }).catch(err => { alert(err) })
  },


  methods: {


    prev (e) {
      this.page = e;
      this.getAreaDataDetail();
    },
    next (e) {
      this.page = e;
      this.getAreaDataDetail();
    },
    current (e) {
      this.page = e;
      this.getAreaDataDetail();
    },
    prev2 (e) {
      this.page2 = e;
      this.getAreaDataDetail2();
    },
    next2 (e) {
      this.page2 = e;
      this.getAreaDataDetail2();
    },
    current2 (e) {
      this.page2 = e;
      this.getAreaDataDetail2();
    },
    prev3 (e) {
      this.page3 = e;
      this.getAreaDataDetail3();
    },
    next3 (e) {
      this.page3 = e;
      this.getAreaDataDetail3();
    },
    current3 (e) {
      this.page3 = e;
      this.getAreaDataDetail3();
    },


    getAreaDataDetail3 () {
      var province = sessionStorage.getItem("province");
      var data = this.$el.querySelector('input').value
      this.$axios.post("admin/Carview/ownerList", { token: this.token, search: data, area: province, page: this.page3 }).then(res => {
        this.list = res.data.data.list;
        this.pageCount3 = res.data.data.rows;
      }).catch(err => { alert(err) })
    },



    //搜索车主信息---------------------------------
    search () {
      var province = sessionStorage.getItem("province");
      var data = this.$el.querySelector('input').value
      this.listShow = false,
        this.searchShow = true,
        this.$axios.post("admin/Carview/ownerList", { token: this.token, search: data, area: province }).then(res => {
          this.list = res.data.data.list;
          this.pageCount3 = res.data.data.rows;
        }).catch(err => { alert(err) })



    },








    //---------------------------------------------
    getAreaDataDetail () {
      var province = sessionStorage.getItem("province");
      this.$axios.post('admin/Carview/ownerList', { token: this.token, area: province, page: this.page }).then(res => {
        this.list = res.data.data.list;
        // this.page = res.data.data.rows;
      }).catch(err => { alert(err) })
    },
    getAreaDataDetail2 () {
      this.centerDialogVisible = true;
      this.$axios.post('admin/Carview/price', { id: this.ownerId, token: this.token, page: this.page2 }).then(res => {
        this.award = res.data.data.rows;
        // this.page2 = res.data.data.list;
      }).catch(err => { alert(err) })

    },

    awardDetail (id) {
      this.centerDialogVisible = true;
      this.ownerId = id;//获取分页操作需要的车主id
      this.$axios.post('admin/Carview/price', { id: this.ownerId, token: this.token, page: 1 }).then(res => {
        this.award = res.data.data.rows;
        this.pageCount2 = res.data.data.list;
      }).catch(err => { alert(err) })
    }
  }
}
</script>
<style scoped>
.el-pagination {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.xqtable td {
  color: #666666;
  font-size: 12px;
  border-bottom: 1px solid #e7e6ea;
}
.sidebar {
  height: 950px !important;
  background: #3d4659;
}
.sidebar >>> .four {
  background: url("../../../static/images/shujvfenxi/icblue4.png") !important;
}
.owner {
  height: 950px;
  overflow: hidden;
  background-color: #303847;
}
.search {
  height: 100px;
  width: 93%;
  float: right;
  padding: 30px 100px;
}
.search input {
  width: 400px;
  height: 100%;
  background: #292f42;
  border: 0;
  float: left;
  color: white;
}
.btn {
  background: #04bbfc;
  color: white;
  height: 100%;
  width: 120px;
}
.carOwners {
  width: 93%;
  float: right;
  height: 600px;
  padding: 0px 50px;
  /*background: orange;*/
}
.el-pagination {
  padding: 20px 42%;
}

table thead td {
  color: #04bbfc;
}
table td {
  color: white;
  font-size: 14px;
  opacity: 0.8;
  background: none !important;
  border-bottom: 2px solid #292f42;
}
thead td {
  background: #cdf1fe;
}
</style>
<style type="text/css">
.el-table tr {
  background: none !important;
}

.el-table {
  background: none !important;
}
.el-table th {
  background: none !important;
}
.table th {
  background: none;
}
.has-gutter .cell {
  color: #04bbfc;
  font-size: 16px;
  text-align: center;
}
.el-table td {
  border-bottom: 2px solid #292f42;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #292f42;
}
.el-table::before {
  background: none;
}
.owner .el-dialog__header {
  background: none !important;
}
</style>
