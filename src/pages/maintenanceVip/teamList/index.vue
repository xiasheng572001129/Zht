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
        <div class="quote-ele"><i></i>邦保养VIP-团队列表</div>
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
        <el-table-column label="服务经理名称"
                         align="center"
                         prop="name">

        </el-table-column>
        <el-table-column label="服务经理手机号"
                         prop="phone"
                         align="center">

        </el-table-column>
        <el-table-column label="城市名称"
                         prop="city_name"
                         align="center">

        </el-table-column>
        <el-table-column label="团队人员个数"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="detailsVisible=true,details(scope.row)">{{scope.row.number}}</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog title="详情"
                 center
                 :visible.sync="detailsVisible">
        <div class="details"
             v-if='leaderDetails'>
          <div>
            <span>姓名 : </span>
            <span>{{leaderDetails.name}} </span>
          </div>
          <div>
            <span>手机号 : </span>
            <span>{{leaderDetails.phone}} </span>
          </div>
          <div>
            <span>服务地区 : </span>
            <span>{{leaderDetails.city}} </span>
          </div>
          <div>
            <span>成员 : </span>

          </div>

        </div>
        <el-table :data="detailsList"
                  border
                  class="table">
          <el-table-column align="center"
                           label="姓名"
                           prop="name">

          </el-table-column>
          <el-table-column align="center"
                           label="收益(元)"
                           prop="total">

          </el-table-column>
        </el-table>
      </el-dialog>
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
      detailsVisible: false,
      detailsList: [],
      leaderDetails: {}
    }
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('Admin/VipManager/teamList', { token: this.token, page: this.page })
        this.list = res.data.data.data || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    //团队详情
    async details (row) {
      try {
        const res = await this.$axios.post('admin/VipManager/teamDetail', { token: this.token, id: row.id })
        this.leaderDetails = res.data.data.leader
        this.detailsList = res.data.data.list
      } catch (err) {
        throw (err)
      }
    },
    //通过审核
    async through () {
      try {
        const res = await this.$axios.post('admin/ShopAudit/passShop', { token: this.token, sid: this.sid, aid: this.aid })
        if (res.data.code == 1) {
          this.detailsVisible = false
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)

        }
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
              if (arr[i].name == '团队列表') {
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
.details {
  margin-bottom: 20px;
}
.details > div {
  padding: 5px 0;
}
>>> .el-table th {
  padding: 0px 0 !important;
}
.details > div > span:first-child {
  display: inline-block;
  width: 65px;
  text-align: right;
  margin-right: 10px;
}
</style>