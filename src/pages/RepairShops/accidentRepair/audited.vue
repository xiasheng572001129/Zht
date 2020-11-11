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
        <div class="quote-ele"><i></i>维修厂-事故维修-已审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6"
                  :offset="1">
            <el-input placeholder="请输入维修厂名称"
                      clearable
                      v-model="company"
                      class="input-with-select">
              <el-select v-model="if_handle"
                         slot="prepend"
                         placeholder="请选择"
                         clearable>

                <el-option label="通过"
                           value="1">通过</el-option>
                <el-option label="驳回"
                           value="2">驳回</el-option>
              </el-select>
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="init()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
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
        <el-table-column prop="audit_person"
                         label="审核人"
                         align="center">

        </el-table-column>
        <el-table-column label="状态"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.if_handle==1 ? '通过' : '驳回'}}
          </template>
        </el-table-column>
        <el-table-column label="驳回理由"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="scope.row.reason"
                        v-if="scope.row.if_handle==2">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{scope.row.reason}}</el-button>
            </el-popover>
            <div v-else>
              无
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="audit_time"
                         label="审核时间"
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
import { datetime } from '@/utils'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      authList: [],
      threeAuthList: [],
      company: '', //维修厂名称
      if_handle: '', //审核状态
      date: '', //日期
    }
  },
  watch: {
    if_handle () {  //审核状态 搜索
      this.init()
    }
  },
  computed: {
    Date () {  //转换成正常的时间格式
      return {
        start_time: this.date ? datetime(this.date[0]) : '',   //开始时间
        end_time: this.date ? datetime(this.date[1]) : ''    //结束时间
      }
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/ShopRepair/reviewedIndex', Object.assign(this.Date, { token: this.token, page: this.page, company: this.company, if_handle: this.if_handle }))
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
                if (arr[i].name == '事故维修') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '已审核' && arr[i].name == '事故维修') {
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
>>> .el-select .el-input {
  width: 100px;
}
>>> .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
