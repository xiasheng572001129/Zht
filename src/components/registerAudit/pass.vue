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
        <div class="quote-ele"><i></i>市级配送中心-注册审核-已审核</div>
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
                         label="配送中心名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="phone"
                         label="联系电话"
                         align="center">
        </el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center">
        </el-table-column>
        <el-table-column label="地区个数"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="detailsVisible=true,details(scope.row)">{{scope.row.regions}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="申请时间"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.audit_time | datetime}}
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div :class="list.length<=7?'page-nav':'page_center'"
           v-show=" list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>

    <el-dialog title="地区详情"
               :visible.sync="detailsVisible"
               center>
      <div v-if="arealist"
           class="details">
        <div>省 : {{arealist.proName}}</div>
        <div>市 : {{arealist.cityName}}</div>
        <div>
          区/县 :
          <span v-for="(item,index) in arealist.countyName"
                :key="index">{{item}}、</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,

      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      numlist: [],
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      materielData: [],
      region: 0,
      regionInfo: [],
      detailsVisible: false,
      arealist: []
    }

  },
  methods: {

    paging (e) {
      this.page = e;
      this.init();
    },
    init: function () {
      this.$axios.post('admin/AgentAuditList/index', { token: this.token, page: this.page, status: 1 })
        .then(res => {

          if (res.data.data.list)
            this.list = res.data.data.list;



          this.pageCount = res.data.data.rows;
        })
        .catch(err => { })
    },
    async details (row) {
      try {
        const res = await this.$axios.post('admin/AgentAuditList/showArea', { token: this.token, aid: row.aid, id: row.id })
        this.arealist = res.data.data

      } catch (error) {
        throw (error)
      }
    },
  },
  mounted () {
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
                if (arr[i].son[j].name == '已审核' && arr[i].name == '注册审核') {
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
  },
  created () {
    this.init();
  },
  watch: {
    index: function () {
      this.init();
    }
  }
}
</script>
<style scoped>
.regionDetail >>> .el-dialog__title {
  font-size: 22px;
}
.regionDetail >>> .el-dialog__body {
  padding: 0px 25px 30px;
  border-top: solid 2px #eee;
}
</style>
