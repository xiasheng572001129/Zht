<template>
  <div>
    <ctbHead>
      <router-link :to="{name:'shoplist_list',query:{id:2}}"
                   class="cur">维修厂列表</router-link>
      <router-link :to="{name:'shopcash_apply',query:{id:2}}">维修厂提现</router-link>
      <router-link :to="{name:'shoplist_close',query:{id:2}}">关停列表</router-link>
      <router-link :to="{name:'shoplist_cancel',query:{id:2}}">取消合作</router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>汽修厂列表-详情</div>
        <div class="lay-d-l">
          <h2>营业执照</h2>
          <div class="lay-d-img">
            <img :src="list.license"
                 alt="">
          </div>
        </div>
        <div class="lay-d-r">
          <div class="detail">
            <p>公司名称：{{list.company}}</p>
            <p>开通时间：{{list.audit_time}}</p>
            <p>连续 {{list.not_task}} 次未完成任务</p>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>物料</th>
                <th>数量(L)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in arr">
                <td>{{item.name}}</td>
                <td>{{item.stock}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      id: this.$route.query.id,
      list: {},
      arr: []
    }
  },
  created () {
    this.$axios.post('admin/ShopList/detail', { token: this.token, id: this.id })
      .then(res => {

        this.list = res.data.data;
      })
      .catch(err => { })
    this.$axios.post('admin/ShopList/ration', { token: this.token, id: this.id })
      .then(res => {

        this.arr = res.data.data;
      })
      .catch(err => { })
  }
}
</script>
<style scoped>
.lay-d-l {
  width: 40%;
  text-align: center;
  margin-top: 150px;
}
.lay-d-img {
  width: 300px;
  margin: 10px auto;
}
.lay-d-r {
  font-size: 18px;
  line-height: 40px;
  padding-left: 40px;
  width: 55%;
}
.detail {
  margin-bottom: 30px;
}
</style>
