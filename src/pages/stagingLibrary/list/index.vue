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
          <i></i>公司暂存库-暂存库列表

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
        <el-table-column label="公司名称"
                         prop="company"
                         align="center">
        </el-table-column>
        <el-table-column label="负责人"
                         prop="leader"
                         align="center">
        </el-table-column>
        <el-table-column label="联系电话"
                         prop="phone"
                         align="center">
        </el-table-column>
        <el-table-column label="库存（L）"
                         prop="stock"
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
      threeAuthList: [],
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {  //暂存库列表
      try {
        const res = await this.$axios.post('admin/MaterielTransfer/list', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 1
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
    },

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
