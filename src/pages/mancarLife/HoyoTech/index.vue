<template>
  <div>
    <div class="quote">
      <div class="quote-ele"><i></i>人车生活-惠生活-邦友特惠</div>
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
        if (res.data.code == 1) {
          if (res.data.data && res.data.data[0]) {
            let son = res.data.data
            son.forEach(item => {
              if (item.name == '惠生活( 邦友特惠 )') {
                this.threeAuthList = item.son
              }
            });
          }
        }
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
