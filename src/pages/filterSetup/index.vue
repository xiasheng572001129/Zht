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
        <div class="quote-ele">
          <i></i>
          滤芯设置
        </div>
      </div>
      <el-tree :data="treeData"
               node-key="id"
               default-expand-all
               :expand-on-click-node="false"
               class="tree">
        <span class="custom-tree-node"
              slot-scope="{ node ,data}">
          {{data.name}}
          <span v-if="data.level!=1"
                class="treeRadio">
            <el-radio-group v-model="data.status"
                            @change="(value)=>radioChange(data,value)">
              <el-radio :label="2">维修厂</el-radio>
              <el-radio :label="1">供应商</el-radio>
            </el-radio-group>
            <span style="margin-left:20px"
                  v-if="data.status==1">
              滤芯补贴 : {{data.money}}元
            </span>
          </span>
        </span>
      </el-tree>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
import { getPro, GET_City } from '@/utils'   //获取省市
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      curId: 0,
      thCurId: 0,
      seCurId: 0,
      threeAuthList: [],
      authList: [],
      treeData: [], //滤芯设置列表

    }
  },


  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post("admin/SystemSetup/filterList", { token: this.token })
        let treeData = res.data.data
        treeData.forEach(element => {
          element.children.forEach(item => {
            if (!item.status) {
              item = Object.assign(item, { status: 2 })
            }
          })
        });
        this.treeData = treeData
      } catch (error) {
        throw (error)
      }
    },
    radioChange (item, status) {
      if (status == 1) {
        this.$prompt('请输入滤芯补贴', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入滤芯补贴',
          closeOnClickModal: false,
          beforeClose: (action, instance, done) => {
            if (action == 'confirm') {
              let value = instance.inputValue;
              this.filterSet(item.id, status, value, done())
            } else {
              item.status = 2
              done()
            }
          }
        }).then(() => { }).catch(() => { })
      } else {
        this.filterSet(item.id, status)
      }
    },

    async filterSet (cid, status, money, callback) {  //设置滤芯
      try {
        const res = await this.$axios.post("admin/SystemSetup/filterSet", { token: this.token, cid: cid, status: status, money: money })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.init()
          callback && callback()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
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
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].son) {
                if (arr[i].name == '滤芯设置') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }

              }
            }
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
.ellipsis {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  text-align: center;
}
.tree {
  margin-left: 5%;
}
.treeRadio {
  position: absolute;
  left: 20%;
}
</style>
