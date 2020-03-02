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
        <div class="quote-ele"><i></i>审核-维修厂首次物料发货</div>
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
        <el-table-column label="维修厂名称"
                         align="center"
                         prop="company">

        </el-table-column>
        <el-table-column label="供应商名称"
                         prop="name"
                         align="center">

        </el-table-column>
        <el-table-column label="负责人"
                         prop="leader"
                         align="center">

        </el-table-column>
        <el-table-column label="维修厂电话"
                         prop="phone"
                         align="center">

        </el-table-column>
        <el-table-column label="供应商电话"
                         prop="smphone"
                         align="center">

        </el-table-column>
        <el-table-column label="通过时间"
                         prop="audit_time"
                         align="center">

        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">

            <el-button type="primary"
                       size="small"
                       @click="adopt(scope.row,scope.$index)"
                       :loading="loading[scope.$index]">允许发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情"
                 center
                 :visible.sync="detailsVisible">
        <div v-if='detailsList'
             class="details">
          <div>
            <span>创建时间 : </span>
            <span>{{detailsList.create_time}}</span>
          </div>
          <el-table :data="detailsList.detail"
                    style="margin:10px 0"
                    border>
            <el-table-column label="名称"
                             prop="materiel"
                             align="center"></el-table-column>
            <el-table-column label="数量"
                             prop="num"
                             align="center"></el-table-column>
          </el-table>
        </div>
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
      detailsList: {},
      loading: []
    }
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/ShopAudit/shopOil', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    //维修厂详情
    async details (row) {
      try {
        const res = await this.$axios.post('admin/ShopAudit/orderDetail', { token: this.token, id: row.id })
        this.detailsList = res.data.data
      } catch (err) {
        throw (err)
      }
    },
    //通过审核
    async adopt (row, index) {
      try {
        this.loading[index] = true
        const res = await this.$axios.post('admin/ShopAudit/resOil', { token: this.token, sid: row.sid, smid: row.smid })
        this.loading[index] = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
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