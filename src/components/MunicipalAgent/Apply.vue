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
          <th>申请时间</th>
          <th>操作</th>

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
            {{item.create_time}}
          </td>
          <td>
            <a href="javascript:;"
               @click="See(item.id)">查看</a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页 -->
    <div class="page_center"
         v-show="pageCount&&pageCount>1">
      <paging :page-count="pageCount"
              v-show="list&&list.length>0"
              :page="page"
              @index="paging"></paging>
      <!--分页的组件-->
    </div>
    <Region-dialog title="区域个数"
                   :countyShow="countyShow"
                   @regionClose="regionClose"
                   :Province="Province"
                   :regionVisible="centerDialogVisible"></Region-dialog>
  </div>
</template>
<script>
import RegionDialog from '@/components/Dialog/RegionDialog'
export default {
  data () {
    return {
      centerDialogVisible: false,
      Province: [],
      pageCount: 1,
      page: 1,
      isShow: true,
      token: window.sessionStorage.getItem("bbytoken"),
      list: [],
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
    init () {
      this.$axios.post("supply/areaApp", { token: this.token, page: this.page }).then(res => {

        if (res.data.code == 1) {

          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => {
        throw (err)
      })
    },
    regionNum (id) {

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
    See (gid) {
      var id = this.$route.query.id;
      this.$router.push({
        path: "/MunicipalAgent/increaseRegion/detailsPage",
        query: {
          id: id,
          is: true,
          gid: gid
        }
      })


    },
    regionClose (e) {
      this.centerDialogVisible = false;
      this.Province = []
    }

  }
}
</script>
