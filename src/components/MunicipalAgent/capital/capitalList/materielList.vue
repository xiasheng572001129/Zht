<template>
  <div>
    <table class="table">
      <tr>
        <th>收入金额</th>
        <th>收入时间</th>
      </tr>
      <tr v-for="item in materielData">
        <td>{{item.price}}</td>
        <td>{{item.audit_time}}</td>
      </tr>
    </table>
    <div class="page_center"
         v-show="materielCount&&materielCount>1">
      <paging :page-count="materielCount"
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

      token: sessionStorage.getItem("bbytoken"),
      pageCount: 1,
      page: 1
    }
  },
  props: ["gid", 'materielData', "materielCount"],
  methods: {
    paging (e) {
      this.page = e;

      this.$emit("materielPage", e)
    }
  }


}
</script>
<style scoped>
.table {
  margin-top: 20px;
}
.table th {
  height: 50px;
  line-height: 50px;
}
</style>
