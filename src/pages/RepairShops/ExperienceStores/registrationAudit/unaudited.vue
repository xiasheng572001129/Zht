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
        <div class="quote-ele"><i></i>维修厂-体验店-注册审核-未审核</div>
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
        <el-table-column label="地区"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="`${scope.row.province}${scope.row.city}${scope.row.county}`">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
            </el-popover>
          </template>
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
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {   //未审核列表
      this.$axios.post('admin/ShopExper/shopAuditList', { token: this.token, page: this.page })
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
          const res = await this.$axios.post('admin/ShopExper/experAdopt', { token: this.token, sid: row.id, county_id: row.county_id })   //sid 维修厂id  county_id  县id
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
                if (arr[i].name == '体验店/注册审核') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '体验店/注册审核') {
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
</style>
