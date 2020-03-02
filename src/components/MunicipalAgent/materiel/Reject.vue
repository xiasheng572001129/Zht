<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>申请时间</th>
          <th>通过时间</th>
          <th>驳回理由</th>
          <th>物料详情</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.company}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.create_time}}</td>
          <td>{{item.to_time|datetime}}</td>
          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.Origin}}</p>
              </div>
            </el-popover>
          </td>
          <td>
            <a href="javascript:;"
               @click="details(item.id)">详情</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="page_center"
         v-show="pageCount&&pageCount>1">
      <paging :page-count="pageCount"
              :page="page"
              @index="paging"></paging>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      list: [],
      page: 1,
      pageCount: 1,
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
    details (gid) {
      var id = this.$route.query.id;

      this.$router.push({
        path: "/MunicipalAgent/materiel/materiel/Rejectdetails",
        query: {
          id: id,
          is: true,
          gid: gid
        }
      })

    },
    init () {
      this.$axios.post("supply/rejectList", {
        token: this.token,
        page: this.page
      }).then(res => {
        if (res.data.code == 1) {
          this.list = res.data.data.list

          this.pageCount = res.data.data.rows
        } else {
          layer.msg(res.data.msg)
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
  },

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