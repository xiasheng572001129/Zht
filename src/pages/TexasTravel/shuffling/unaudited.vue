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
        <div class="quote-ele"><i></i>德州旅行-轮播列表-未审核</div>
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
        <!-- <el-table-column type="selection"
                         width="55">
        </el-table-column> -->
        <!-- <el-table-column label="轮播标题"
                         align="center"
                         prop="title">

        </el-table-column> -->
        <el-table-column label="轮播图片"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic"
                 width="100px"
                 height="50px"
                 style=" vertical-align:middle;" />
          </template>

        </el-table-column>
        <el-table-column label="轮播内容"
                         align="center">

          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title=""
                        width="200"
                        trigger="hover"
                        :content="scope.row.content">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{scope.row.content}}</el-button>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column label="轮播状态"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.status==1 ? '显示' : '隐藏'}}
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       :loading="throughLoading[scope.$index]"
                       @click="through(scope.row)">通过</el-button>
            <el-button type="danger"
                       size="mini"
                       :loading="rejecteLoading[scope.$index]"
                       @click="rejecte(scope.row)">驳回</el-button>
          </template>

        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="page_center"
           v-show="list && list.length>0">
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
import { getPro } from '@/utils'
import region from '@/components/common'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      thCurId: '',
      authList: [],
      threeAuthList: [],
      throughLoading: [],
      rejecteLoading: [],

    }
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },

    init () {
      this.$axios.post('admin/DeTravel/bannerList', { token: this.token, page: this.page, audit_status: 0 })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },


    //通过
    through (item, index) {

      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {

          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/DeTravel/bannerExamine', { token: this.token, id: item.id })
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
    rejecte (item, index) {

      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回理由'
      }).then(async ({ value }) => {
        try {

          this.rejecteLoading[index] = true
          const res = await this.$axios.post('admin/DeTravel/bannerReject', { token: this.token, id: item.id, reason: value })
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
    },

    Auth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      })
        .then(res => {

          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].son) {
                if (arr[i].name == '轮播列表') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '轮播列表') {
                    this.thCurId = arr[i].son[j].id;
                  }
                }
              }
            }
            this.authList = arr;
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  },
  mounted () {
    this.Auth()
    this.init()
  },
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
