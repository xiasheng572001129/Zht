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
        <div class="quote-ele"><i></i>服务工号-未审核</div>
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
        <el-table-column align="center"
                         label="用户姓名"
                         prop="name"></el-table-column>
        <el-table-column align="center"
                         label="用户电话"
                         prop="phone"></el-table-column>
        <el-table-column align="center"
                         label="地区">
                           <template slot-scope="scope">
                               <el-popover
                                  placement="bottom"
                                  width="200"
                                  trigger="hover"
                                  :content="`${scope.row.province}${scope.row.city}${scope.row.county}`">
                                  <el-button slot="reference" type="text" class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
                              </el-popover> 
                           </template>
                         </el-table-column>
        <el-table-column align="center"
                         label="类型"
                         prop="user_status"></el-table-column>
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
                       :loading="rejectLoading[scope.$index]"
                       @click="reject(scope.row,scope.$index)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
//  import page from '../common.js';
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      authList: [],
      threeAuthList: [],
      token: window.sessionStorage.getItem('bbytoken'),
      seCurId: 0,
      page: 0,
      pageCount: 0,
      list: [],
      detailsVisible: false,
      detailsList: {},
      throughLoading: [], //通过loading
      rejectLoading: [],//驳回loading
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/UserAudit/serviceCode', { token: this.token, page: this.page, status: 0 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0;
      } catch (err) {
        throw (err)
      }
    },
    through (item, index) {  //通过
      this.$confirm('此操作通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/UserAudit/serviceAudit', { token: this.token, uid: item.uid,id:item.id }) //uid 用户id
          this.throughLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.throughLoading[index] = false
          throw (error)
        }
      }).catch(() => { });
    },
    reject (item, index) {  //驳回
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading[index] = true
          const res = await this.$axios.post('admin/UserAudit/serviceReject', { token: this.token, uid: item.uid, reason: value,id:item.id })  //uid 用户id  reason-驳回理由
          this.rejectLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.rejectLoading[index] = false
          throw (error)
        }
      }).catch(() => { });
    },
    erAuth () { //权限列表
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: this.token,
        id: id
      })
        .then(res => {

          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {

              if (arr[i].name == '服务工号') {
                this.seCurId = arr[i].id;

                if (arr[i].son) {

                  this.threeAuthList = arr[i].son;
                  for (var j = 0; j < arr[i].son.length; j++) {
                    if (arr[i].action != arr[i].son[j].action) {
                      arr[i].action = arr[i].son[0].action;
                    }
                    if (arr[i].son[j].name == '未审核' && arr[i].name == '服务工号') {
                      this.thCurId = arr[i].son[j].id;
                    }

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
    this.init()
    this.erAuth()
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
.car_img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.details > div {
  margin: 10px 0;
}
.details span:first-child {
  width: 100px;
  text-align: right;
  display: inline-block;
}
.img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
</style>
