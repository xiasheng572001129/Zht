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
          <el-popover placement="bottom"
                      width="200"
                      trigger="click">
            <el-button type="text"
                       slot="reference">详情</el-button>
            <div v-if="scope.row.content">
              <div v-html="scope.row.content"></div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="地区">
        <template slot-scope="scope">
          {{`${scope.row.province}${scope.row.city}`}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请时间"
                       prop="create_time"></el-table-column>
      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="small"
                     :loading="throughLoading[scope.$index]"
                     @click="through(scope.row,scope.$index)">通过</el-button>
          <el-button type="danger"
                     size="small"
                     :loading="rejecteLoading[scope.$index]"
                     @click="rejecte(scope.row,scope.$index)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      throughLoading: [], //通过loading加载
      rejecteLoading: [], //驳回loading加载
    }
  },
  methods: {
    async init () {
      try {
        const res = await this.$axios.post('admin/UserEasy/list', { token: this.token, page: this.page, status: 0 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (error) {
        throw (error)
      }
    },
    through (item, index) {  //通过审核
      this.$confirm('此操作将要审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/UserEasy/pubThrough', { token: this.token, id: item.id, phone: item.phone, name: item.name })    // id 发布id  phone 负责人电话   name 发布人
          this.throughLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.throughLoading[index] = false
          throw (error)
        }
      })
    },
    //驳回
    rejecte (item, index) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回理由'
      }).then(async ({ value }) => {
        try {

          this.rejecteLoading[index] = true
          const res = await this.$axios.post('admin/UserEasy/pubDismissal', { token: this.token, id: item.id, reason: value, phone: item.phone, name: item.name })  //id 发布id  phone 负责人电话   name 发布人  reason 驳回理由
          this.rejecteLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          this.rejecteLoading[index] = false
          throw (err)
        }
      }).catch(() => { });
    }
  },
  mounted () {
    this.init()
  }
}
</script>