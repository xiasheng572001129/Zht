<template>
  <div class="head"
       @mouseleave="hiddenTopLink">
    <div class="logo"
         @click="back"
         @mouseenter="showTopLink">
      <img src="../../../static/images/logo.png"
           alt="">
      <span>邦保养后台管理系统</span>
    </div>
    <div class="nav">
      <el-scrollbar style="width:80%">
        <slot>
        </slot>
      </el-scrollbar>

    </div>
    <div class="logout"
         @click="logout"><img src="../../../static/images/out.png"
           alt="">退出</div>
    <div :class="{ show: showtl }"
         class="topLink">
      <ul class="tlul">
        <li v-for="item in list"
            :key="item.id">
          <router-link :to="{path:item.action,query:{id:item.id}}">
            <div><img :src="item.icon"
                   alt=""
                   class='img'></div>
            <p>{{item.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'ctbHead',
  data: function () {
    return {
      showtl: false,
      thispath: this.$route.path,
      list: [],
      policyNumber: '1'
    }
  },
  methods: {
    showTopLink: function () {
      if (this.thispath != '/entry') {
        this.showtl = true
      }
    },
    hiddenTopLink: function () {
      this.showtl = false
    },
    back: function () {
      this.$router.push({
        name: 'entry'
      })
    },
    logout () {
      var that = this;
      layer.confirm('确认退出系统?', {
        btn: ['确认', '取消']
      }, function (index) {
        layer.close(index);
        that.$router.push({
          name: 'login'
        })
        window.sessionStorage.removeItem('bbytoken');
      })
    },
    /** 显示条数 **/
    auditCount () {
      this.$axios.post('admin/PolicyAudit/auditCount', { token: window.sessionStorage.getItem('bbytoken') }).then(res => {

        if (res.data.code == 1) {

          this.policyNumber = res.data.data
          this.$store.commit('setpolicyNumber', res.data.data)
        }
      }).catch(err => {
        throw (err)
      })
    },
  },
  mounted () {
    this.auditCount()
    this.$axios.post('admin/Auth/ifUser', {
      token: window.sessionStorage.getItem('bbytoken')
    })
      .then(res => {

        if (res.data.code == 1) {
          var list = res.data.data;
          for (var i = 0; i < list.length; i++) {
            if (list[i].son) {//如果有二级权限
              for (var j = 0; j < list[i].son.length; j++) {
                if (list[i].action != list[i].son[j].action) {//如果一级权限的路径与所属的二级权限的路径不匹配
                  list[i].action = list[i].son[0].action;   //一级权限的路径为所属的二级权限的第一个路径
                }
                if (list[i].son[j].son) { //如果此二级权限有三级
                  for (var k = 0; k < list[i].son[j].son.length; k++) {
                    if (list[i].son[j].action != list[i].son[j].son[k].action) {//如果二级权限的路径不与son的任意一个路径匹配

                      list[i].son[j].action = list[i].son[j].son[0].action;  //更改二级权限的路径为son的第一个路径
                      if (i == 0 && j == 0) {   //如果是第一个一级权限的第一个二级权限
                        list[i].action = list[i].son[j].action;  //更改一级权限的路径为son的第一个路径
                      }

                    }
                  }
                }
              }
            }
          }
          this.list = list;

        } else {
          this.$alert(res.data.msg, '提示', { type: 'error' });
        }
      })
      .catch(err => {
        alert(err);
      })

  }

}
</script>
<style scoped>
.tlul > li > a > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tlul > li:nth-child(11) img {
  width: 35px;
  height: 35px;
}
.tlul > li:last-child img {
  width: 35px;
  height: 35px;
}
</style>
