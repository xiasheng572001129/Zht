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
        <div class="quote-ele"><i></i>邦保养车管家-用户管理</div>

      </div>
      <div class="search">
        <el-input placeholder="请输入用户姓名/手机号/邀请码"
                  v-model="key"
                  class="input-with-select">

          <el-button slot="append"
                     @click="init">搜索</el-button>
        </el-input>
      </div>
      <el-table :data="list">
        <el-table-column label="头像"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.head_pic"
                 class="head_pic">
          </template>
        </el-table-column>
        <el-table-column label="姓名"
                         align="center"
                         prop="name">

        </el-table-column>

        <el-table-column label="手机号"
                         prop="phone"
                         align="center">

        </el-table-column>
        <el-table-column label="邀请码"
                         prop="promo_code"
                         align="center">

        </el-table-column>
        <el-table-column label="车牌号"
                         prop="u_plate"
                         align="center">

        </el-table-column>
        <el-table-column label="用户身份"
                         prop="rank"
                         align="center">

        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      //分页数据
      token: window.sessionStorage.getItem('bbytoken'),
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      authList: [],
      page: 1,
      pageCount: 0,
      list: [],
      key: ''
    }
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/ShopAudit/userList', { token: this.token, page: this.page, key: this.key })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },

    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id  
      }).then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            console.log(arr)
            if (arr[i].son) {
              if (arr[i].name == '维修厂审核') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
            }
          }
          this.authList = arr;
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

  },
  mounted () {
    this.init()
    this.erAuth()
  },


}
</script>
<style scoped>
.search {
  width: 20%;
  margin: 0 0 10px 20px;
}
.head_pic {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
  border-radius: 50%;
}
</style>