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
          <i></i>公司暂存库-已转列表
        </div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <el-table :data="list">
        <el-table-column label="原中心库"
                         prop="source_company"
                         align="center">
        </el-table-column>
        <el-table-column label="被转中心库"
                         prop="arrive_company"
                         align="center">
        </el-table-column>
        <el-table-column label="总升数"
                         prop="oil_LPM"
                         align="center">
        </el-table-column>
        <el-table-column label="油品详情"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="right"
                        width="400"
                        trigger="click">
              <el-table :data="scope.row.detail"
                        v-if="scope.row.detail && scope.row.detail.length>0">
                <el-table-column property="name"
                                 label="油品名称"
                                 align="center"></el-table-column>
                <el-table-column property="open_stock"
                                 label="数量（L）"
                                 align="center"></el-table-column>
              </el-table>
              <el-button slot="reference"
                         type="text">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center">
        </el-table-column>
        <el-table-column label="审核人"
                         prop="audit_person"
                         align="center">
        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <div class="page_center">
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
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      thCurId: '',
      seCurId: '',
      authList: [],
      threeAuthList: []
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {  //已转列表
      try {
        const res = await this.$axios.post('admin/MaterielTransfer/turnList', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 1
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
    },

    // async search () {  //搜索
    //   try {
    //     const res = await this.$axios.post('admin/MaterielTransfer/search', { token: this.token, company: '测试' })
    //   } catch (error) {
    //     throw (error)
    //   }
    // },

    Auth () { //权限列表
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
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  },
  mounted () {
    this.init()
    this.Auth()
  },
}
</script>
<style scoped>
.ellipsis {
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
}
</style>
