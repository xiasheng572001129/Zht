<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="oil_shop_name"
                       label="油站名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="oil_leader"
                       label="负责人"
                       align="center">
      </el-table-column>
      <el-table-column prop="leader_phone"
                       label="负责人电话"
                       align="center">
      </el-table-column>

      <el-table-column label="油站图片"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="oliImgDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="详细地址"
                       align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start"
                      width="200"
                      trigger="hover"
                      :content="`${scope.row.province}${scope.row.city}${scope.row.county}${scope.row.address}`">
            <el-button slot="reference"
                       type="text"
                       class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}${scope.row.address}`}}</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="申请时间"
                       prop="create_time"
                       align="center"></el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="small"
                     :loading="throughLoading[scope.$index]"
                     @click="through(scope.row,scope.$index)">通过</el-button>
          <el-button type="danger"
                     size="small"
                     :loading="rejectedLoading[scope.$index]"
                     @click="rejected(scope.row,scope.$index)">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 油站图片详情 -->
    <el-dialog title="油站图片"
               center
               width="30%"
               :visible.sync="oliImgVisible">
      <div style="text-align:center">
        <img v-for="(item,index) in oliImgList"
             :key="index"
             :src="item"
             width="100px"
             height="100px"
             style="margin-right:10px"
             ref="oliImg" />
      </div>
    </el-dialog>

    <!-- 分页 -->
    <div class="page_center">
      <paging :page-count="pageCount"
              :page="page"
              @index="(e)=>{
                    page =e,
                    init()
                }"></paging>
      <!--分页的组件-->
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import Viewer from '@/utils/Viewer'
export default {
  components: { pagination },
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,//当前页
      pageCount: 1,
      tableData: [],
      oliImgVisible: false,
      oliImgList: [],
      throughLoading: [],
      rejectedLoading: []

    }
  },
  methods: {

    async init () {
      try {
        let res = await this.$axios.post('admin/OilExamine/regAudit', { token: this.token, page: this.page, audit_status: 0 })
        if (res.data.code == 1) {
          this.tableData = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          this.tableData = []
        }
      } catch (err) {
        throw (err)
      }
    },
    //油站图片详情
    oliImgDetails (item) {
      this.oliImgVisible = true
      this.oliImgList = item.shop_image
      this.$nextTick(() => {
        const img = this.$refs.oliImg;
        Viewer(img)
      })
    },
    //通过审核
    through (item, index) {
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {

          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/DeTravelExamine/regThrough', { token: this.token, id: item.id, tour_name: item.oil_shop_name, phone: item.leader_phone })
          this.throughLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          this.throughLoading[index] = false
          throw (err)
        }
      }).catch(() => { });
    },
    //驳回
    rejected (item, index) {

      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回理由'
      }).then(async ({ value }) => {
        try {

          this.rejectedLoading[index] = true
          const res = await this.$axios.post('admin/DeTravelExamine/regDismissal', { token: this.token, id: item.id, reason: value, phone: item.leader_phone, tour_name: item.oil_shop_name })
          this.rejectedLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          this.rejectedLoading[index] = false
          throw (err)
        }
      }).catch(() => { });
    },
  },
  mounted () {
    this.init()
  }
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
</style>
