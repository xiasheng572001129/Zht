<template>
  <div class='Addresslist'>
    <ctbHead>
      <router-link active-class="cur"
                   v-for="(item) in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}

      </router-link>
    </ctbHead>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      authList: '',
      seCurId: '',
      curId: '',
    }
  },
  methods: {

  },
  mounted () {
    var id = this.$route.query.id;
    this.curId = id;
    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data;
          this.authList = arr;
          console.log(this.authList)
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
      .catch(err => {
        alert(err);
      })
  }
}
</script>
<style scoped>
</style>
