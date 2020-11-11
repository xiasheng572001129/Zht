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
        <div class="quote-ele"><i></i>维修厂-事故维修-未审核</div>
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
        <el-table-column prop="company"
                         label="维修厂名称"
                         align="center"></el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center"></el-table-column>

        <el-table-column label="联系电话"
                         align="center"
                         prop="phone">

        </el-table-column>
        <el-table-column prop="create_time"
                         label="申请时间"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="through(scope.row,scope.$index)"
                       :loading='throughLoading[scope.$index]'>通过</el-button>
            <el-button type="danger"
                       size="small"
                       @click="rejected(scope.row,scope.$index)"
                       :loading='rejectedLoading[scope.$index]'>驳回</el-button>
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

export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      authList: [],
      threeAuthList: [],
      throughLoading: [],//通过loading
      rejectedLoading: [], //驳回loading
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {   //事故维修列表
      this.$axios.post('admin/ShopRepair/index', { token: this.token, page: this.page })
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
    },

    through (row, index) {  //通过审核
      this.$confirm('是否通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/ShopRepair/adopt', { token: this.token, id: row.id, phone: row.phone })   //id 修复id  phone 联系电话
          this.throughLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }

        } catch (err) {
          this.throughLoading[index] = false
          this.$message.error('接口报错,请检查')
          throw (err)
        }
      }).catch(() => { });
    },
    rejected (item, index) {  //驳回
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回理由'
      }).then(async ({ value }) => {
        try {
          this.rejectedLoading[index] = true
          const res = await this.$axios.post('admin/ShopRepair/reject', { token: this.token, id: item.id, reason: value, reason: value })  //id 修复id  phone 联系电话 reason 驳回理由
          this.rejectedLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.rejectedLoading[index] = false
          this.$message.error('接口报错,请检查')
          throw (err)
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
                if (arr[i].name == '事故维修') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '事故维修') {
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
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
