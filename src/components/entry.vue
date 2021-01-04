<template>
  <div class='entry'>
    <ctbHead></ctbHead>
    <div class='con'>
      <ul>
        <li v-for="(item,index) in list"
            :style="note"
            :key="index">
          <router-link :to="{path:item.action,query:{id:item.id}}">
            <div><img :src="item.icon"
                   alt=""></div>
            <p>{{item.name}}</p>
          </router-link>
        </li>
        <!--<li :style="note">-->
        <!--<router-link to="/shoplist/list">-->
        <!--<div><img src="../../static/images/qxc.png" alt=""></div>-->
        <!--<p>汽修厂</p>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li :style="note">-->
        <!--<router-link to="/bill/apply">-->
        <!--<div><img src="../../static/images/xcx.png" alt=""></div>-->
        <!--<p>小程序</p>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li :style="note">-->
        <!--<router-link to="/change/gift">-->
        <!--<div><img src="../../static/images/gift.png" alt=""></div>-->
        <!--<p>礼品兑换</p>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li :style="note">-->
        <!--<router-link to="/fundIncome/card">-->
        <!--<div><img src="../../static/images/fund.png" alt=""></div>-->
        <!--<p>资金管理</p>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li :style="note">-->
        <!--<router-link to="/newsManage/news">-->
        <!--<div><img src="../../static/images/msg.png" alt=""></div>-->
        <!--<p>消息管理</p>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li :style="note">-->
        <!--<router-link to="/systemSet/oilList">-->
        <!--<div><img src="../../static/images/system.png" alt=""></div>-->
        <!--<p>系统设置</p>-->
        <!--</router-link>-->
        <!--</li>-->
        <!--<li :style="note">-->
        <!--<router-link to="/manager">-->
        <!--<div><img src="../../static/images/_40.png" alt=""></div>-->
        <!--<p>权限管理</p>-->
        <!--</router-link>-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      note: {
        backgroundImage: "url(" + require("../../static/images/entry.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1380px 760px",
      },
      list: []
    }
  },
  methods: {

    prompt () {   //免费保险的保险公司卡数为0提示
      let str = this.$route.params && this.$route.params.str
      if (str) {
        this.$confirm(`保险公司[${str}]卡数已为0`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/ststemSet/freeMaintenance', query: { id: 7 } })
        }).catch(() => { });
      }
    },
    Auth () {  //权限
      this.$axios.post('admin/Auth/ifUser', {
        token: window.sessionStorage.getItem('bbytoken')
      })
        .then(res => {
          if (res.data.code == 1) {
            var list = res.data.data;
            this.list = list;
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          throw (err)
        })
    }
  },
  mounted () {
    this.Auth()
    this.prompt()
  }
}
</script>
<style scoped>
.entry {
  width: 100%;
  height: 100%;
  background-color: #292f42;
  margin: 80px 0 0 0;
}
.con {
  width: 100%;
  height: calc(100% - 80px);
  position: relative;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
}
.con ul {
  width: 90%;
  margin: 0 auto;
}
/* .con ul > li:nth-child(10) div {
  position: relative;
}
.con ul > li:nth-child(10) img {
  width: 45px;
  height: 45px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -22.5px;
}
.con ul > li:nth-child(12) div {
  position: relative;
} */
/* .con ul > li:nth-child(12) img {
  width: 45px;
  height: 45px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -22.5px;
} */
.entry ul li {
  display: inline-block;
  text-align: center;
  width: calc(100% / 5 - 60px);
  height: 220px;
  margin: 0 30px;
  margin-bottom: 3%;
  border-radius: 10px;
  background-image: url("../../static/images/entry.jpg");
  background-position: -200px -150px;
  overflow: hidden;
}

/* .entry ul li:first-child {
  background-position: -284px -143px;
}

.entry ul li:nth-child(2) {
  background-position: -350px -100px;
}

.entry ul li:nth-child(3) {
  background-position: -570px -100px;
}

.entry ul li:nth-child(4) {
  background-position: -650px -200px;
}

.entry ul li:nth-child(5) {
  background-position: -850px -300px;
}

.entry ul li:nth-child(6) {
  background-position: -850px -400px;
}

.entry ul li:nth-child(7) {
  background-position: -850px -500px;
} */

.entry li div {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.6)
  );
  margin: 60px auto 20px auto;
}

.entry div img {
  width: 90px;
  height: 90px;
}

.entry li p {
  color: white;
  font-size: 20px;
}
</style>
