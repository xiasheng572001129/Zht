<template lang="html">
  <div class="herder">
      <ul>
          <li>
             <a href="javascript:;" @click="Upperlevel">
               <img src='static/images/top_Onelayer.png'>
               <span>返回上一层</span>
             </a>
          </li>
          <li>
            <a href="javascript:;" @click="homePage">首页</a>
          </li>
          <li>
              <a href="javascript:;">{{name}}</a>
          </li>
          <li>
              <a href="javascript:;" @click="SignOut">
                  <img src="static/images/btn_quit.png">
                  <span>退出</span>
              </a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: window.sessionStorage.getItem('loginname')
    }
  },
  methods: {
    //返回上一级
    Upperlevel () {
      this.$router.go(-1)
    },
    //点击返回首页
    homePage () {
      this.$router.push('/entry')
    },
    // 退出系统
    SignOut () {
      this.$confirm('确定退出吗?是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$router.push('/login')
        window.sessionStorage.clear('bbytoken')
      }).catch(() => {

      })
    }
  }

}
</script>

<style lang="css">
.herder {
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: #fff;
  border-bottom: 10px solid #f5f5f5;
}
.herder > ul {
  float: right;
}
.herder > ul > li {
  float: left;
}
.herder > ul > li > a {
  color: #1e2328;

  border-right: 1px solid #e6e6eb;
  padding: 0 30px;
}
.herder > ul > li > a > img {
  vertical-align: middle;
}
</style>
