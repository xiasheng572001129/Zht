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
        <div class="quote-ele"
             style="float:left"><i></i>供应商-油品信息 </div>
      </div>
      <div class="search">
        <el-input placeholder="请输入供应商名称"
                  v-model="sm_name" />
        <el-button type="primary"
                   @click="search">搜索</el-button>
      </div>
      <table class="table">
        <tr>
          <th>供应商名称</th>
          <th>质量保证书</th>
          <th>质量承保书</th>
          <th>质检报告</th>
          <th>已缴纳的质保金</th>
          <th>质保金</th>
          <th>操作</th>
        </tr>
        <tr v-for='(item,index) in list'
            :key="index">
          <td>{{item.sm_name}}</td>
          <td>
            <img :src="item.quality_certificate"
                 ref='images'>
          </td>
          <td>
            <img :src="item.quality_undertaking"
                 ref="images">
          </td>
          <td>
            <img :src="item.quality_inspection_report"
                 ref="images">
          </td>
          <td>
            {{item.my_retention_money}}
          </td>
          <td>
            {{item.set_retention_money}}
          </td>
          <td>
            <el-button type="primary"
                       size="small"
                       @click="detailList=item.detail,detailVisible=true,detail()">详情</el-button>

          </td>
        </tr>
      </table>
      <el-dialog title="详情"
                 center
                 :visible.sync="detailVisible">
        <table class="table">
          <tr>
            <th>油品名称</th>
            <th>总后台的油品名称</th>
            <th>油品介绍</th>
            <th>升数</th>
            <th>结算价</th>
            <th>型号</th>
            <th>油品图片</th>
          </tr>
          <tr v-for='(item,index) in detailList'
              :key="index">
            <td>
              {{item.oil_name}}
            </td>
            <td>
              {{item.little_name}}
            </td>
            <td>
              <el-popover placement="top-start"
                          title="油品介绍"
                          width="200"
                          trigger="hover"
                          :content="item.about">
                <el-button slot="reference"
                           type="text"
                           class="ellipsis"
                           style="width:100px">{{item.about}}</el-button>
              </el-popover>
            </td>
            <td>
              {{item.rise}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              {{item.standard}}
            </td>
            <td>
              <img :src="item.cover"
                   ref="images">
            </td>
          </tr>
        </table>
      </el-dialog>
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
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      authList: [],
      page: 0,  //供应商列表当前页数
      pageCount: 0, //供应商列表总页数
      detailVisible: false,
      sm_name: ''
    }
  },

  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },
    search () {  //搜索
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/SmList/getOilIndexList', { token: this.token, page: this.page, sm_name: this.sm_name })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
        if (res.data.code == 1) {
          this.$nextTick(() => {
            const ViewerRef = this.$refs.images
            Viewer(ViewerRef)
          })
        } else {
          this.$message({ message: res.data.msg, type: 'warning ' })
        }

      } catch (err) {
        throw (err)
      }
    },
    detail () {  //油品详情
      this.$nextTick(() => {
        const ViewerRef = this.$refs.images
        Viewer(ViewerRef)
      })
    },

    // 权限列表,当前所在权限页  
    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      }).then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data || [];
          this.authList = arr;
          console.log(this.authList)
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
        .catch(err => {
          alert(err);
        })
    }
  },
  created () {
    this.erAuth()
  },
  mounted () {

    this.init() //初始化数据  

  },
}
</script>
<style scoped>
.search {
  width: 100%;
  overflow: hidden;
}
.search {
  padding: 0px 0px 20px 50px;
}
.search >>> .el-input {
  width: 20%;
}
.search >>> button {
  padding: 11px 15px;
}

.table img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.ellipsis {
  width: 80px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
</style>