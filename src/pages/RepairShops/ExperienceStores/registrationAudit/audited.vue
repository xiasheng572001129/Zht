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
        <div class="quote-ele"><i></i>维修厂-体验店-注册审核-已审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="4"
                  :offset="1">
            <el-input placeholder="请输入维修厂名称"
                      v-model="company"
                      @change="init" />
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            @change="init">
            </el-date-picker>
          </el-col>
        </el-row>
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
        <el-table-column prop="audit_time"
                         label="通过时间"
                         align="center"></el-table-column>

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
      date: '', //日期
      company: '', //维修厂名称
    }
  },
  computed: {
    closingDate () {  //搜索 截止日期
      return {
        start_time: this.date && this.date[0],
        end_time: this.date && this.date[1]
      }
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {   //已审核列表
      this.$axios.post('admin/ShopExper/reviewedIndex', Object.assign(this.closingDate, { token: this.token, page: this.page, company: this.company }))
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
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
                  if (arr[i].son[j].name == '已审核' && arr[i].name == '体验店/注册审核') {
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
.search {
  width: 100%;
  overflow: hidden;
}
</style>
