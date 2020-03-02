<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>押金</th>
          <th>区域个数</th>
          <th>操作</th>
          <th>申请时间</th>
          <th>通过时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>
            <i :class="item.price>1?'el-icon-check':'el-icon-close'"></i>
          </td>
          <td>
            <a href="javascript:;"
               @click="regionNum(item.id)">{{item.regions}}</a>
          </td>
          <td>
            <a href="javascript:;"
               @click="See(item.id)">查看</a>
          </td>
          <td>
            {{item.create_time}}
          </td>
          <td>{{item.audit_time|datetime}}</td>
        </tr>
      </tbody>
    </table>
    <Region-dialog title="区域个数"
                   :countyShow="countyShow"
                   @regionClose="regionClose"
                   :Province="Province"
                   :regionVisible="centerDialogVisible"></Region-dialog>
    <Material-dialog :Visible="Visible"
                     @close="close"
                     :tableData="tableData"></Material-dialog>
    <el-dialog title="物品详情"
               :visible.sync="materielDialogVisible"
               width="60%"
               center
               @close="close">
      <el-table :data="materielData"
                style="width: 70%;margin: 50px auto;"
                border>
        <el-table-column prop="materiel"
                         label="物料名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="num"
                         label="数量/件"
                         align="center">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 分页 -->
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
import RegionDialog from "@/components/Dialog/RegionDialog"
import MaterialDialog from "@/components/Dialog/MaterialDialog"
export default {
  data () {
    return {
      centerDialogVisible: false,
      Visible: false,
      materielDialogVisible: false,
      token: window.sessionStorage.getItem("bbytoken"),
      pageCount: 1,
      page: 1,
      list: [],
      Province: [],
      tableData: [],
      materielData: [],
      countyShow: false
    }
  },
  components: {
    RegionDialog,
    MaterialDialog
  },
  created () {
    this.init()
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    regionNum (id) {
      this.centerDialogVisible = true
      this.$axios.post("supply/areaRegion", { token: this.token, id: id }).then(res => {
        if (res.data.code == 1) {

          this.centerDialogVisible = true
          this.Province = res.data.data
        } else {
          this.centerDialogVisible = false;
          layer.msg(res.data.msg, { time: 500 })
        }
      }).catch(err => {
        throw (err)
      })
    },
    regionClose () {
      this.centerDialogVisible = false

    },
    See (id) {

      this.$axios.post("supply/areaMat", { token: this.token, id: id }).then(res => {
        if (res.data.code == 1) {

          this.materielDialogVisible = true
          this.materielData = res.data.data;
        } else {
          this.materielDialogVisible = false;
          layer.msg(res.data.msg, { time: 500 })
        }
      }).catch(err => {
        throw (err)
      })
    },
    close () {
      this.Visible = false
    },
    init () {
      this.$axios.post("supply/areaAd", { token: this.token, page: this.page }).then(res => {

        if (res.data.code == 1) {

          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => {
        throw (err)
      })
    }
  }
}
</script>
