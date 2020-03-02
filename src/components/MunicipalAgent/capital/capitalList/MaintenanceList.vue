<template>
  <div>
    <table class="table">
      <tr>
        <th>运营商名称</th>
        <th>负责人</th>
        <th>电话</th>
        <th>售卡数</th>
        <th>交易金额</th>
      </tr>
      <tr v-for="item in materielData">
        <td>{{item.company}}</td>
        <td>{{item.leader}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.sale_card}}</td>
        <td>{{item.sum}}</td>
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
