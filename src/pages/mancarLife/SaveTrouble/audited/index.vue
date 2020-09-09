<template>
  <div>
    <el-table :data="list">
      <el-table-column align="center"
                       label="发布标题"
                       prop="title"></el-table-column>
      <el-table-column align="center"
                       label="发布人"
                       prop="name"></el-table-column>
      <el-table-column align="center"
                       label="封面">
        <template slot-scope="scope">
          <img width="100px"
               height="100px"
               :src="scope.row.cover" />
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="联系电话"
                       prop="phone"></el-table-column>
      <el-table-column align="center"
                       label="所属类型"
                       prop="type_name"></el-table-column>
      <el-table-column align="center"
                       label="发布人类型"
                       prop="user_type"></el-table-column>
      <el-table-column align="center"
                       label="图文详情">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="contentDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="地区">
        <template slot-scope="scope">
          {{`${scope.row.province}${scope.row.city}`}}
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="审核人"
                       prop="audit_person"></el-table-column>
      <el-table-column align="center"
                       label="申请时间"
                       prop="create_time"
                       min-width="100px"></el-table-column>
      <el-table-column align="center"
                       label="审核时间"
                       prop="audit_person"
                       min-width="100px">
        <template slot-scope="scope">
          {{scope.row.audit_time | datetime}}
        </template>
      </el-table-column>

    </el-table>
    <el-dialog title="图文详情"
               center
               :visible.sync="imgDetails">
      <div class="content">
        <div v-html="content"></div>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="page_center"
         v-show="list && list.length>0">
      <paging :page-count="pageCount"
              :page="page"
              @index="(e)=>{page=e,init()}"></paging>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      list: [],
      page: 1,
      pageCount: 1,
      imgDetails: false, //图文详情弹框显示状态
      content: '',//内容
    }
  },
  methods: {
    async init () {
      try {
        const res = await this.$axios.post('admin/UserEasy/list', { token: this.token, page: this.page, status: 1 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (error) {
        throw (error)
      }
    },
    //图文/内容详情
    contentDetails (item) {
      this.imgDetails = true
      this.$nextTick(() => {
        this.content = item.content
      })
    },
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.content {
  max-height: 500px;
  overflow: auto;
}
</style>