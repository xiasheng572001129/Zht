<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>取消理由</th>
          <th>物品交接</th>
          <th>申请时间</th>
          <th>通过时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">{{item.company}}</a>
              <div>
                <p>区域运营商个数：{{item.com_detail.count}}</p>
                <p>剩余金额：{{item.com_detail.balance}}</p>
              </div>

            </el-popover>
          </td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.rej_reason}}</p>
              </div>

            </el-popover>
          </td>
          <td><a href="javascript:;"
               @click="Handover(item.id)">查看</a></td>
          <td>{{item.create_time}}</td>
          <td>{{item.audit_time|datetime}}</td>

        </tr>
      </tbody>
    </table>
    <el-dialog title="物品交接"
               :visible.sync="centerDialogVisible"
               width="60%"
               center
               @close="close">
      <el-table :data="tableData"
                style="width: 70%;margin: 50px auto;"
                border>
        <el-table-column prop="name"
                         label="物料名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="num"
                         label="数量/件"
                         align="center">
        </el-table-column>

      </el-table>
    </el-dialog>
    <div class="page_center"
         v-show="pageCount&&pageCount>1">
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
      token: window.sessionStorage.getItem("bbytoken"),
      centerDialogVisible: false,
      pageCount: 1,
      page: 1,
      list: [],
      tableData: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post("supply/canAdopt", { token: this.token, page: this.page }).then(res => {
        if (res.data.code == 1) {

          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 500 })
        }
      }).catch(err => {
        throw (err)

      })
    },
    hoverColor (e) {
      e.currentTarget.className = "hoveColor"
    },
    removeColor (e) {
      e.currentTarget.className = "primary"
    },
    Handover (id) {

      this.$axios.post("supply/handGood", { token: this.token, id: id }).then(res => {

        if (res.data.code == 1 && res.data.data) {
          this.centerDialogVisible = true
          this.tableData = res.data.data
        } else {
          this.centerDialogVisible = false;
          layer.msg("暂无数据", { time: 500 })
        }
      }).catch(err => {
        throw (err)
      })
    },
    close () {
      this.tableData = []
    }
  }
}
</script>
<style scoped>
.hoveColor {
  opacity: 0.5;
}
.primary {
  color: #04bbfc;
}
</style>
