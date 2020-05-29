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
        <div class="quote-ele">
          <i></i>兑换码-已核销

          <el-button type="primary"
                     class="generateCode"
                     @click="Export"
                     :disabled="!(list && list.length>0)">导出</el-button>
        </div>
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
        <el-table-column prop="code"
                         label="兑换码"
                         align="center"></el-table-column>
        <el-table-column prop="company"
                         label="供应商"
                         align="center"></el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center"></el-table-column>
        <el-table-column label="物料"
                         align="center">
          <template slot-scope="scope">

            <el-popover placement="right"
                        width="500"
                        trigger="click">
              <el-button slot="reference"
                         type="text">详情</el-button>
              <div style="width:100%">
                <h3 style="text-align:center">物料详情</h3>
                <el-table :data="scope.row.detail">
                  <el-table-column align="center"
                                   prop="name"
                                   label="物料名称"></el-table-column>
                  <el-table-column align="center"
                                   prop="def_num"
                                   label="升数">
                    <template slot-scope="smScope">
                      {{smScope.row.def_num}}L
                    </template>
                  </el-table-column>
                </el-table>
                <div class="total">
                  <p>总价格：{{scope.row.settlement_price}}元</p>
                  <p>总升数：{{scope.row.oil_LPM}}L</p>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="兑换时间"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.write_off_time | datetime}}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div :class="list && list.length<=7?'page-nav':'page_center'"
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
      loading: false
    }
  },
  created () {
    this.init();
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentString/cancelList', { token: this.token, page: this.page })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },

    //打印未核销兑换码
    Export () {
      window.location.href = `${this.baseURL}admin/Login/agentChange`
    }
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
              if (arr[i].name == '兑换码') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '已核销' && arr[i].name == '兑换码') {
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
}
</script>
<style scoped>
.ellipsis {
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
}
.generateCode {
  float: right;
  margin: 25px 20px 0 0;
}
.total {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
}
.total p {
  margin: 5px 0;
}
</style>
