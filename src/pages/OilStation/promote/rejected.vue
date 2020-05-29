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
      <el-table-column prop="title"
                       label="推广标题"
                       align="center">
      </el-table-column>
      <el-table-column label="推广图片"
                       align="center">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="ImgDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="mem_price"
                       label="会员价"
                       align="center">
      </el-table-column>
      <el-table-column prop="ori_price"
                       label="原价"
                       align="center">
      </el-table-column>
      <el-table-column prop="person"
                       label="联系人"
                       align="center">
      </el-table-column>
      <el-table-column prop="phone"
                       label="联系电话"
                       align="center">
      </el-table-column>
      <el-table-column prop="phone"
                       label="联系电话"
                       align="center">
      </el-table-column>
      <el-table-column label="详情"
                       align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start"
                      width="300"
                      trigger="click">
            <el-button slot="reference"
                       type="text"
                       class="ellipsis">详情</el-button>
            <div class="details"
                 v-html="scope.row.details">

            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="audit_person"
                       label="驳回人"
                       align="center">
      </el-table-column>
      <el-table-column label="驳回理由"
                       align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start"
                      width="300"
                      trigger="hover"
                      :content="scope.row.reason">
            <el-button slot="reference"
                       type="text"
                       class="ellipsis">{{scope.row.reason}}</el-button>

          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="申请时间"
                       prop="create_time"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="驳回时间"
                       prop="create_time"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.audit_time | datetime}}
        </template>
      </el-table-column>
    </el-table>

    <!-- 推广图片详情 -->
    <el-dialog title="推广图片"
               center
               width="30%"
               :visible.sync="ImgVisible">
      <div style="text-align:center">
        <img v-for="(item,index) in ImgList"
             :key="index"
             :src="item"
             width="100px"
             height="100px"
             style="margin-right:10px"
             ref="Img" />
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
      ImgVisible: false,
      ImgList: [],
      throughLoading: [],
      rejectedLoading: [],


    }
  },
  methods: {

    async init () {
      try {
        let res = await this.$axios.post('admin/OilExamine/oilExtension', { token: this.token, page: this.page, status: 2 })
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
    //图片详情
    ImgDetails (item) {
      this.ImgVisible = true
      this.ImgList = item.image
      this.$nextTick(() => {
        const img = this.$refs.Img;
        Viewer(img)
      })
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
.details >>> img {
  width: 100% !important;
  height: 100px !important;
}
</style>
