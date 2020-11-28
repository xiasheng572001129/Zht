<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>维修厂-体验店-地区设置</div>
      </div>

      <el-tree :data="list"
               node-key="id"
               default-expand-all
               :expand-on-click-node="false"
               class="tree">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span v-if="data.level!=1"
                class="treeSwitch">

            <el-switch v-model="data.status"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       :active-value='1'
                       :inactive-value="2"
                       @change="Setup(node.data)">
            </el-switch>
          </span>
        </span>
      </el-tree>

    </div>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      seCurId: '',
      threeAuthList: [],
      status: 1 //开关状态 1 开启 2 关闭
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {   //地区列表
      this.$axios.post('admin/ShopExperCity/ExperList', { token: this.token })
        .then(res => {
          this.list = res.data.data || [];
        }).catch(err => { })
    },
    //   开关设置
    async Setup (item) {
      try {
        const res = await this.$axios.post('admin/ShopExperCity/ExperSet', { token: this.token, cid: item.id, status: item.status })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.$message.error('接口报错请检查')
        throw (error)
      }
    },
    Auth () {  //权限列表
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
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  },

  mounted () {
    this.Auth()
    this.init()
  },
}
</script>
<style scoped>
.tree {
  margin-left: 100px;
}
>>> .el-tree-node {
  margin: 5px 0;
}
.treeSwitch {
  position: absolute;
  left: 30%;
}
</style>
