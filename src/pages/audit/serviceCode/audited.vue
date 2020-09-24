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
        <div class="quote-ele"><i></i>服务工号-已审核</div>
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
                         label="审核人"
                         prop="audit_person"></el-table-column>
        <el-table-column align="center"
                         label="审核时间"
                         >
          <template slot-scope="scope">
            {{scope.row.payment_time}}
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
      Loading: []
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/UserAudit/serviceCode', { token: this.token, page: this.page, status: 1 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0;
      } catch (err) {
        throw (err)
      }
    },
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

                if (arr[i].son) {

                  this.threeAuthList = arr[i].son;
                  for (var j = 0; j < arr[i].son.length; j++) {
                    if (arr[i].action != arr[i].son[j].action) {
                      arr[i].action = arr[i].son[0].action;
                    }
                    if (arr[i].son[j].name == '已审核' && arr[i].name == '服务工号') {
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
