<template>
  <div>
    <div class="quote">
      <div class="quote-ele"><i></i>油站-推广</div>
      <div class="quote-nav">
        <router-link active-class="cur"
                     v-for='item in threeAuthList'
                     :key="item.id"
                     :to='{path:item.action,query:{id:id}}'>
          {{item.name}}
        </router-link>
      </div>
    </div>
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      id: this.$route.query.id,
      threeAuthList: []
    }
  },
  methods: {
    /* 获取能用的权限列表 */
    async authority () {

      try {
        let res = await this.$axios.post('admin/Auth/erAuth', {
          token: this.token,
          id: this.id
        })
        let threeAuthList = res.data.data || [];
        let newThreeAuthList = []
        threeAuthList.forEach(item => {
          if (item.name == '推广') {
            newThreeAuthList = item.son
          }
        });
        this.threeAuthList = newThreeAuthList
      } catch (err) {
        throw (err)
      }

    }
  },
  mounted () {
    this.authority()
  }
}
</script>

<style>
</style>
