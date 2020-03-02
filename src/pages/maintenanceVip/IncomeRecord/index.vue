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
        <div class="quote-ele"><i></i>邦保养VIP-收入记录</div>
        <div class="quote-nav">
          <!-- <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link> -->
        </div>
      </div>
      <el-table :data="list">
        <el-table-column label="开发者"
                         align="center"
                         prop="name">

        </el-table-column>
        <el-table-column label="金额"
                         prop="money"
                         align="center">

        </el-table-column>
        <el-table-column label="开发类型"
                         prop="type"
                         align="center">

        </el-table-column>
        <el-table-column label="被开发用户"
                         prop="u_name"
                         align="center">

        </el-table-column>
        <el-table-column label="创建时间"
                         prop="create_time"
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

    }
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/VipManager/incomeList', { token: this.token, page: this.page })
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
            if (arr[i].son) {
              if (arr[i].name == '收入记录') {
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
.details > div {
  padding: 5px 0;
}
.details > div > span:first-child {
  display: inline-block;
  width: 95px;
  text-align: right;
  margin-right: 10px;
}
.details > div > span > img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>