<template>
  <div class='notDeliverGoods'>
    <table class='table'>
      <tr>
        <th>收货人姓名</th>
        <th>收货人电话</th>
        <th>收货地址</th>
        <th>申请时间</th>
      </tr>
      <tr v-for="(item,index) in list"
          :key="index">
        <td style='width: 10%'>{{item.man}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.address+item.details}}</td>
        <td>{{item.time}}</td>
      </tr>
    </table>
    <!-- 分页 -->
    <div :class="list.length<=7?'page-nav':'page_center'"
         v-show="list.length>0">
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
      token: window.sessionStorage.getItem('bbytoken'),
      list: {},
      page: 1, //当前页
      pageCount: 1,//总页数
      detailsVisible: false, //详情弹框状态
      ReasonVisible: false, //驳回理由状态
      information: {}, //保单信息
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/MemAddList/waitList', { token: this.token, page: this.page }).then(res => {
        if (res.data.code == 1) {
         
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },

  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.notDeliverGoods .table td {
  width: calc(100% / 3);
}
</style>
