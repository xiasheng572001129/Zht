<template>
  <div>
    <el-table :data="list">
      <el-table-column align="center"
                       label="封面">
        <template slot-scope="scope">
          <img width="100px"
               height="100px"
               :src="scope.row.carousel" />
        </template>
      </el-table-column>
      <el-table-column label="轮播图"
                       align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom"
                      width="400"
                      trigger="click">
            <el-button type="text"
                       slot="reference">详情</el-button>
            <div v-if="scope.row.photo && scope.row.photo.length>0"
                 class="slideshow">
              <img v-for="(item,index) in scope.row.photo"
                   :key="index"
                   :src="item"
                   width="50px"
                   height="50px" />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="发布标题"
                       prop="title"></el-table-column>

      <el-table-column align="center"
                       label="发布人"
                       prop="user_name"></el-table-column>
      <el-table-column align="center"
                       label="联系人"
                       prop="linkman"></el-table-column>
      <el-table-column align="center"
                       label="联系电话"
                       prop="phone"></el-table-column>

      <el-table-column align="center"
                       label="原价"
                       prop="original_price">
      </el-table-column>
      <el-table-column align="center"
                       label="会员价"
                       prop="member_price">
      </el-table-column>

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
          <el-popover placement="bottom"
                      width="400"
                      trigger="hover"
                      :content="scope.row.address">
            <el-button type="text"
                       slot="reference"
                       class="ellipsis">{{scope.row.address}}</el-button>

          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="驳回人"
                       prop="audit_person"></el-table-column>
      <el-table-column align="center"
                       label="驳回理由">
        <template slot-scope="scope">
          <el-popover placement="bottom"
                      width="400"
                      trigger="hover"
                      :content="scope.row.reason">
            <el-button type="text"
                       slot="reference"
                       class="ellipsis">{{scope.row.reason}}</el-button>

          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请时间"
                       prop="create_time"></el-table-column>
      <el-table-column align="center"
                       label="驳回时间">
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
        const res = await this.$axios.post('admin/UserLife/lifeList', { token: this.token, page: this.page, audit_status: 2 })
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
<style  scoped>
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
.slideshow {
  min-height: 100px;
}
.slideshow > img {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  margin-right: 10px;
}
.content {
  max-height: 500px;
  overflow: auto;
}
</style>