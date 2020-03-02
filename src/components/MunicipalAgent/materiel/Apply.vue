<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>申请时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list"
            style="height: 90px;">

          <td>{{item.company}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.phone}}</td>
          <td>
            {{item.create_time}}
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
      pageCount: 1

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
      this.$router.push({ path: "/MunicipalAgent/materiel/materiel/DetailsPage", query: { id: id, gid: gid, is: true } })
    },
    init () {
      this.$axios.post("supply/apply", { token: this.token, page: this.page }).then(res => {

        if (res.data.code == 1) {

          this.list = res.data.data.list
          this.pageCount = res.data.data.rows

        }
      }).catch(err => {

      })
    }
  }
}
</script>