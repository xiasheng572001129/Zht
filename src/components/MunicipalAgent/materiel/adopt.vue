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
          <th>打印次数</th>
          <th>物料详情</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.create_time}}</td>
          <td>{{item.to_time|datetime}}</td>
          <td>{{item.print}}</td>
          <td><a href="javascript:;"
               @click="See(item.id)">查看</a></td>
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
    See (gid) {
      var id = this.$route.query.id;
      var gid = gid;
      this.$router.push({ path: "/MunicipalAgent/materiel/materiel/Throughdetails", query: { id: id, is: true, gid: gid } })

    },
    init () {
      this.$axios.post("supply/adoptList", { token: this.token, page: this.page }).then(res => {

        if (res.data.code == 1) {
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows
        } else {
          layer.msg(res.data.msg)
        }
      }).catch(err => {

      })
    }
  }
}
</script>