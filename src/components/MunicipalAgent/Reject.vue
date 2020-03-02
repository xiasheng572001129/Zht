<template>
  <div>
    <table class="table">
      <thead>
        <tr>

          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>转账资金</th>
          <th>区域个数</th>
          <th>驳回理由</th>
          <th>申请时间</th>
          <th>驳回时间</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>
            {{item.price}}
          </td>
          <td>
            <a href="javascript:;"
               @click="regionNum(item.id)">{{item.regions}}</a>
          </td>

          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.reason?item.reason:'没有驳回理由 亲!'}}</p>
              </div>
            </el-popover>
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
export default {
  data () {
    return {
      token: window.sessionStorage.getItem("bbytoken"),
      centerDialogVisible: false,
      pageCount: 1,
      page: 1,
      list: [],
      Province: [],
      countyShow: false
    }
  },
  components: {
    RegionDialog
  },
  created () {
    this.init()
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    regionClose () {
      this.centerDialogVisible = false
    },
    init () {
      this.$axios.post("supply/areaRej", { token: this.token, page: this.page }).then(res => {

        if (res.data.code == 1) {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => {

      })
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

      })
    },
    hoverColor (e) {
      e.currentTarget.className = "hoveColor"
    },
    removeColor (e) {
      e.currentTarget.className = "primary"
    },
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
