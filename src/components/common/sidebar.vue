<template>
  <div class="sidebar">
    <router-link :to="{name:'allCityAgent'}">
      <div class="sidebar_item first">
        <div class="img agent"
             @mouseenter="enter1()"
             style="background-image:url(static/images/shujvfenxi/ic1.png)">
        </div>
        <div class="text">市级代理</div>
      </div>
    </router-link>
    <router-link :to="{name:'alloperator'}">
      <div class="sidebar_item">
        <div class="img two"
             @mouseenter="enter2()"
             style="background-image:url(static/images/shujvfenxi/ic2.png)">
        </div>
        <div class="text">运营商</div>
      </div>
    </router-link>
    <router-link :to="{name:'allRepairShops'}">
      <div class="sidebar_item ">
        <div class="img three"
             @mouseenter="enter3()"
             style="background-image:url(static/images/shujvfenxi/ic3.png)">
        </div>
        <div class="text">维修厂</div>
      </div>
    </router-link>
    <router-link :to="{name:'owner'}">
      <div class="sidebar_item last  ">
        <div class="img four"
             style="background-image:url(static/images/shujvfenxi/ic4.png)">
        </div>
        <div class="text">车主</div>
      </div>
    </router-link>
    <div class="tipes"
         v-if="show"
         @mouseenter="enter()"
         @mouseleave="leave()">
      <div class="box">
        <input v-if="company"
               type="text"
               placeholder="公司名称"
               ref="input1"
               name=""
               v-on:input="search1()">
        <input v-if="operators"
               type="text"
               placeholder="运营商名称"
               ref="input2"
               name=""
               v-on:input="search2()">
        <input v-if="repairShops"
               type="text"
               placeholder="维修厂名称"
               ref="input3"
               name=""
               v-on:input="search3()">
        <!-- 	<router-link :to="{name:'allCityAgent'}">
			<div class="box_list all">
				全部公司<span>></span>
				<span class="line"></span>
			</div>
		</router-link> -->
        <router-link v-for="item in list"
                     :key="item.id"
                     :to="{path:item.path,query:{id:item.aid}}">
          <div class="box_list">
            <span class='content'>{{item.company}}</span>
            <span>></span>
            <span class="line"></span>
          </div>
        </router-link>

      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
export default {
  name: 'sidebar',
  company: true,
  operators: false,
  repairShops: false,
  provinceId: "",
  token: window.sessionStorage.getItem('bbytoken'),
  data () {
    return {
      show: false,
      list: "",
      token: window.sessionStorage.getItem('bbytoken')

    }
  },
  watch: {
    '$route' (to, from) {
      location.reload()
    }
  },
  mounted () {
    var province = sessionStorage.getItem("province");
    this.provinceId = sessionStorage.getItem("provinceId");

  },
  methods: {
    search1 () {
      var name = this.$refs.input1.value;

      this.$axios.post('ForAnalysis/sera', { area: this.provinceId, search: name, token: this.token }).then(res => {
        // this.$set(res.data.data[0],'path',"allCityAgent")
        if (res.data.code == 1) {
          for (var i = 1; i < res.data.data.length; i++) {
            this.$set(res.data.data[i], 'path', "company")
          }
          this.list = res.data.data
        }
      }).catch(err => { alert(err) })

    },
    search2 () {
      var name = this.$refs.input2.value;

      this.$axios.post('agent/Info/agentList', { id: this.provinceId, search: name, token: this.token }).then(res => {
        // this.$set(res.data.data[0],'path',"allCityAgent")
        if (res.data.code == 1) {
          for (var i = 1; i < res.data.data.length; i++) {
            this.$set(res.data.data[i], 'path', "operators")
          }
          this.list = res.data.data
        }
      }).catch(err => { alert(err) })
    },
    search3 () {
      var name = this.$refs.input3.value;

      this.$axios.post('Operate/eara', { id: this.provinceId, search: name, token: this.token }).then(res => {
        // this.$set(res.data.data[0],'path',"allCityAgent")
        if (res.data.code == 1) {
          for (var i = 1; i < res.data.data.length; i++) {
            this.$set(res.data.data[i], 'path', "repairShops")
          }
          this.list = res.data.data
        }
      }).catch(err => { alert(err) })
    },
    F5 () {
      this.$router.go(0);
    },

    enter1: function () {
      this.show = true;
      this.company = true;
      this.operators = false;
      this.repairShops = false;
      var province = sessionStorage.getItem("province");
      this.$axios.post('ForAnalysis/area', { area: 32, token: this.token }).then(res => {
        if (res.data.code == 1) {
          this.$set(res.data.data[0], 'path', "allCityAgent")
          for (var i = 1; i < res.data.data.length; i++) {
            this.$set(res.data.data[i], 'path', "company")
          }
          this.list = res.data.data
        }
      }).catch(err => { alert(err) })

    },
    enter2: function () {
      this.show = true;
      this.operators = true;
      this.company = false;
      this.repairShops = false;
      var provinceId = sessionStorage.getItem("provinceId");
      this.$axios.post('agent/Info/agentList', { id: provinceId, token: this.token }).then(res => {
        if (res.data.code == 1) {
          this.$set(res.data.data[0], 'path', "alloperator")
          for (var i = 1; i < res.data.data.length; i++) {
            this.$set(res.data.data[i], 'path', "operators")
          }
          this.list = res.data.data
        }
      }).catch(err => { alert(err) })
    },
    enter3: function () {
      this.show = true;
      this.operators = false;
      this.company = false;
      this.repairShops = true;
      var provinceId = sessionStorage.getItem("provinceId");
      this.$axios.post('Operate/area', { area: provinceId, token: this.token }).then(res => {
        if (res.data.code == 1) {
          this.$set(res.data.data[0], 'path', "allRepairShops")
          for (var i = 1; i < res.data.data.length; i++) {
            this.$set(res.data.data[i], 'path', "repairShops")
          }
          this.list = res.data.data
        }
      }).catch(err => { alert('暂无权限') })
    },

    enter: (function () {
      return this.show = true;
    }),
    leave: (function () {
      return this.show = false;
    }),
  }
}
</script>
<style scoped>
.sidebar {
  height: 100%;
  width: 140px;
  background: #3d4659;
  float: left;
  position: relative;
  z-index: 10;
}
.first {
  margin-top: 80px;
  border-top: 0px;
}
.last {
  border-bottom: 1px solid black;
}
.sidebar_item {
  height: 140px;
  width: 140px;
  border-top: 1px solid black;
}
.sidebar_item .img {
  width: 50px;
  height: 50px;
  margin: 30px auto 0px;
}
.text {
  width: 140px;
  text-align: center;
  color: white;
}
.tipes {
  height: 100%;
  width: 200px;
  border-left: 1px solid black;
  background: #3d4659;
  float: left;
  position: absolute;
  top: 0;
  left: 140px;
  z-index: 10;
  overflow: hidden;
  /*display: none;*/
}
.box {
  height: 700px;
  width: 100%;
  background: #3d4659;
  margin-top: 80px;
  padding: 10px 0px;
}
.box input {
  width: 180px;
  background: #292f42;
  border-radius: 0px;
  /*border:1px solid black;*/
  height: 32px;
  margin: auto;
  color: #ccc;
}
.box_list {
  height: 60px;
  /*background: #04BBFC;*/
  line-height: 60px;
  color: white;
  text-align: center;
  float: left;
  text-overflow: ellipsis;
}
.all {
  margin-top: 10px;
}
.box_list span:last-child {
  float: right;
  margin-right: 20px;
}
.content {
  width: 100px;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  float: left;
  text-align: center;
  margin-left: 50px;
}
.line {
  width: 160px;
  border: 1px solid #292f42;
  margin: auto;
  float: left;
}
.box_list:hover {
  background: #04bbfc !important;
}

.all {
  background: #04bbfc !important;
}
.agent:hover {
  background-image: url("../../../static/images/shujvfenxi/icnlue1.png") !important;
}
.two:hover {
  background-image: url("../../../static/images/shujvfenxi/icblue2.png") !important;
}
.three:hover {
  background-image: url("../../../static/images/shujvfenxi/icblue3.png") !important;
}
.four:hover {
  background-image: url("../../../static/images/shujvfenxi/icblue4.png") !important;
}
.dataContent {
  margin-left: 140px;
  width: auto;
  height: 100%;
  background: #303847;
  /*overflow: hidden;*/
}
</style>
