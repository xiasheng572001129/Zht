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
        <div class="quote-ele"><i></i>德州旅行-注册审核-已驳回</div>
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
        <el-table-column label="单位名称"
                         align="center"
                         prop="tour_name">

        </el-table-column>
        <el-table-column label="负责人"
                         align="center"
                         prop="leader">

        </el-table-column>
        <el-table-column label="负责人电话"
                         align="center"
                         prop="phone">
        </el-table-column>
        <el-table-column label="注册地区"
                         align="center"
                         prop="area">

        </el-table-column>
        <el-table-column label="注册地区"
                         align="center"
                         prop="area">

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
        <el-table-column label="驳回理由"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="scope.row.reason">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{scope.row.reason}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="申请时间"
                         align="center"
                         prop="create_time">

        </el-table-column>
        <el-table-column label="驳回人"
                         align="center"
                         prop="audit_person">

        </el-table-column>
        <el-table-column label="驳回时间"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.audit_time | datetime}}
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
    }
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },

    init () {
      this.$axios.post('admin/DeTravelExamine/regAudit', { token: this.token, page: this.page, audit_status: 2 })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
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
                if (arr[i].name == '注册审核') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '已驳回' && arr[i].name == '注册审核') {
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
