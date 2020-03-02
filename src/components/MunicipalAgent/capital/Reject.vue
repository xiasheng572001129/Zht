<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>提现金额</th>
          <th>驳回理由</th>
          <th>申请时间</th>
          <th>通过时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.putprice}}</td>
          <td>

            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.reject?item.reject:'没有驳回理由亲!'}}</p>
              </div>

            </el-popover>
          </td>
          <td>
            {{item.create_time}}
          </td>
          <td>
            {{item.Trial_time|datetime}}
          </td>

        </tr>
      </tbody>
    </table>
    <el-dialog title="驳回理由"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <div class="Reason">
        <span>驳回理由: </span>
        <textarea placeholder="请输入驳回理由"></textarea>
      </div>
      <span slot="footer"
            class="dialog-footer">

        <el-button type="primary"
                   round
                   style="margin-bottom: 50px;">保存</el-button>
      </span>
    </el-dialog>
    <div class="page_center"
         v-show="pageCount&&pageCount>1">
      <paging :page-count="pageCount"
              v-show="list&&list.length>0"
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
      page: 1,
      pageCount: 1,
      list: [],
      centerDialogVisible: false
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
    details () {
      var id = this.$route.query.id;
      this.$router.push({
        path: "/MunicipalAgent/materiel/materiel/DetailsPage",
        query: {
          id: id,
          is: true
        }
      })
    },
    init () {
      this.$axios.post("supply/forRejectList", { token: this.token, page: this.page }).then(res => {
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
    hoverColor (e) {
      e.currentTarget.className = "hoveColor"
    },
    removeColor (e) {
      e.currentTarget.className = "primary"
    },
    See () {
      this.centerDialogVisible = true
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
.Reason {
  display: flex;
  margin-top: 30px;
}
textarea {
  resize: none;
  width: 80%;
  height: 150px;
  margin-left: 10px;
}
</style>
