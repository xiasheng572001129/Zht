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
        <div class="quote-ele"><i></i>小程序-服务工号列表</div>

      </div>
      <el-table :data="list">
        <el-table-column align="center"
                         label="用户名称"
                         prop="name"></el-table-column>
        <el-table-column align="center"
                         label="联系电话"
                         prop="phone"></el-table-column>

        <el-table-column align="center"
                         label="服务工号"
                         prop="number">

        </el-table-column>
        <el-table-column align="center"
                         label="服务工号类型"
                         prop="user_status">

        </el-table-column>
        <el-table-column align="center"
                         label="地区"
                         prop="number">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="`${scope.row.province}${scope.row.city}${scope.row.county}`">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="创建时间"
                         prop="create_time">

        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.job_status"
                       active-color="#13ce66"
                       :active-value='1'
                       :inactive-value='2'
                       inactive-color="#ff4949"
                       @change="(value)=>changeOpen(value,scope.row)">
            </el-switch>
            <!-- <el-button type="primary"
                       size="small"
                       style="margin-left:10px"
                       @click="serviceForever(scope.row,scope.$index)"
                       :loading='Loading[scope.$index]'
                       :disabled='scope.row.forever_status==1'>长期有效</el-button> -->

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
      Loading: [],
      open: [], //开关
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/UserServiceCode/index', { token: this.token, page: this.page })
        this.list = res.data.data.list || []

        this.pageCount = res.data.data.rows || 0;
      } catch (err) {
        throw (err)
      }
    },
    changeOpen (val, item) { //开关
      let reasonText = val == 1 ? '开启理由' : '关闭理由'
      this.$prompt(`请输入${reasonText}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: `${reasonText}不能为空`
      }).then(async ({ value }) => {
        try {
          const res = await this.$axios.post('admin/UserServiceCode/serviceAudit', { token: this.token, uid: item.uid, id: item.id, job_status: val, reason: value })
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          throw (error)
        }
      }).catch(() => {
        item.job_status = item.job_status == 1 ? 2 : 1
      });
    },
    // serviceForever (item, index) {   //服务工号长期有效
    //   this.$confirm('此操将开启长期有效, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(async () => {
    //     try {
    //       this.Loading[index] = true
    //       const res = await this.$axios.post('admin/UserServiceCode/serviceForever', { token: this.token, uid: item.uid, id: item.id, forever_status: 1 })
    //       this.Loading[index] = false
    //       if (res.data.code == 1) {
    //         this.$message({ message: res.data.msg, type: "success" })
    //         this.init()
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     } catch (error) {
    //       this.Loading[index] = false
    //       throw (error)
    //     }
    //   }).catch(() => { });
    // },
    erAuth () {
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
