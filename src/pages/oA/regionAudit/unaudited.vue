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
        <div class="quote-ele"><i></i>增加地区-未审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <!-- 列表 -->
      <el-table :data="list">
        <el-table-column align="center"
                         label="支付凭证"
                         ref="voucher">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.voucher"
                   class="photo voucher"
                   ref="voucher" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="个人近照">
          <template slot-scope="scope">
            <img :src="scope.row.personal_photo"
                 class="photo" />
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="登录名称"
                         prop="login_name"></el-table-column>
        <el-table-column align="center"
                         label="注册城市"
                         prop="area_name"></el-table-column>
        <el-table-column align="center"
                         label="联系电话"
                         prop="phone"></el-table-column>

        <el-table-column align="center"
                         label="创建时间"
                         prop="create_time"></el-table-column>

        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="adopt(scope.row,scope.$index)"
                       :loading="throughLoading[scope.$index]">通过</el-button>
            <el-button type="danger"
                       size="mini"
                       @click="reject(scope.row,scope.$index)"
                       :loading="rejectLoading[scope.$index]">驳回</el-button>
          </template>
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
import Viewer from 'viewerjs';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      curId: 0,
      thCurId: 0,
      threeAuthList: [],
      authList: [],
      throughLoading: [], //通过loading
      rejectLoading: [], //驳回loading

    }
  },


  watch: {
    company (val) {
      this.page = 1
      this.init()
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/OaAudit/un_area', { token: this.token, page: this.page })
        .then(res => {
          this.list = res.data.data.data || [];
          this.pageCount = res.data.data.rows || 1;
          this.$nextTick(() => {  //图片放大
            document.querySelectorAll('.voucher').forEach(item => {
              new Viewer(item)
            })

          })
        }).catch(err => { })
    },


    //通过审核
    adopt (row, index) {
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/OaAudit/pass_area', { token: this.token, id: row.id, area: row.area, team_id: row.team_id })
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
      }).catch(() => { });
    },

    //驳回
    reject (row, index) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {

        try {
          this.rejectLoading[index] = true
          const res = await this.$axios.post('admin/OaAudit/refuse_area', { token: this.token, id: row.id, reason: value })
          this.rejectLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
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



    Auth () {  //权限列表
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
                if (arr[i].name == '增加地区') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '增加地区') {
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
.photo {
  width: 80px;
  height: 80px;
}
</style>
