<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>取消理由</th>
          <th>驳回理由</th>
          <th>驳回时间</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 id="1"
                 slot="reference"
                 @mouseover="hoverColor($event,item.gid)"
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
                 id="2"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.reason}}</p>
              </div>
            </el-popover>
          </td>
          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 id="3"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.rej_reason?item.rej_reason:"没有驳回理由"}}</p>
              </div>

            </el-popover>
          </td>
          <td>{{item.audit_time|datetime}}</td>
        </tr>
      </tbody>
    </table>
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
      pageCount: 1,
      page: 1,
      list: [],
      count: "",
      balance: "",
      url: "",
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
      this.$axios.post("supply/canRej", {
        token: this.token,
        page: this.page
      }).then(res => {

        if (res.data.code == 1) {
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg)
        }
      }).catch(err => {
        throw (err)
      })
    },
    //点击查看详情页
    See () {
      var id = this.$route.query.id;
      this.$router.push({
        path: "/MunicipalAgent/materiel/materiel/Throughdetails",
        query: {
          id: id,
          is: true
        }
      })
    },
    hoverColor (e, id) {
      e.currentTarget.className = "hoveColor"
    },
    removeColor (e) {
      e.currentTarget.className = "primary"
    },
  },
  mounted () {

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
