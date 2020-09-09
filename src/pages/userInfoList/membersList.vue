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
        <div class="quote-ele"><i></i>用户信息列表-仲达会员</div>
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
                         label="联系电话"
                         prop="phone"></el-table-column>
        <el-table-column align="center"
                         label="车牌号"
                         prop="plate"></el-table-column>
        <el-table-column align="center"
                         label="剩余卡次数/次"
                         prop="remain_times"></el-table-column>
        <el-table-column align="center"
                         label="类型"
                         prop="rankers"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
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
      page: 1, //显示的页码数
      pageCount: 1,
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/MainList/list', {
        token: this.token,
        page: this.page,
        ranker: 5
      })
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 0;
        }).catch(err => { })
    },

    Auth () {  //权限
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
              if (arr[i].name == '用户信息列表') {
                this.seCurId = arr[i].id;
                if (arr[i].son) {
                  this.threeAuthList = arr[i].son;
                  for (var j = 0; j < arr[i].son.length; j++) {
                    if (arr[i].action != arr[i].son[j].action) {
                      arr[i].action = arr[i].son[0].action;
                    }
                    if (arr[i].son[j].name == '仲达会员' && arr[i].name == '用户信息列表') {
                      this.thCurId = arr[i].son[j].id;
                    }
                  }
                }
              }
            }
            this.authList = arr;
          } else {
            this.$alert(res.data.msg, '提示', {
              type: 'error'
            });
          }
        })
        .catch(err => {
          alert(err);
        })
    },
  },

  mounted () {
    this.Auth()
    this.init()
  },
}
</script>
<style scoped>
.laybox li,
.laybox1 li {
  margin: 20px 30px;
  font-size: 16px;
}
</style>
