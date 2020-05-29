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
             style="float:left"><i></i>供应商-养护品信息 </div>
      </div>
      <div class="search">
        <el-input placeholder="请输入供应商名称"
                  v-model="sm_name" />
        <el-button type="primary"
                   @click="search">搜索</el-button>
      </div>
      <el-table :data='list'>
        <el-table-column label="供应商名称"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="DetailsVisible=true,details(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="城市"
                         align="center"
                         prop="city"></el-table-column>
        <el-table-column label="产品名称"
                         align="center"
                         prop="goods_name"></el-table-column>
        <el-table-column label="产品品牌"
                         align="center"
                         prop="goods_brand"></el-table-column>
      </el-table>
      <!-- 供应商信息详情 -->
      <el-dialog title='供应商信息详情'
                 center
                 :visible.sync="DetailsVisible"
                 width="30%">
        <div v-if='detailsList'>
          <div class="head_pic">
            <!-- <p>头像</p> -->
            <img :src="detailsList.head_pic">
          </div>
          <div class="details">
            <p>
              <span>供应商名称: </span>
              <span>{{detailsList.name}}</span>
            </p>
            <p>
              <span>电话: </span>
              <span>{{detailsList.phone}}</span>
            </p>

          </div>
        </div>
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
      DetailsVisible: false,
      sm_name: '',
      detailsList: {}
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
        const res = await this.$axios.post('admin/SmList/getFreeIndexList', { token: this.token, page: this.page, sm_name: this.sm_name })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    //供应商信息详情
    async details (row) {
      try {
        const res = await this.$axios.post('admin/SmList/getSmUserInfo', { token: this.token, sm_id: row.id })
        this.detailsList = res.data.data
      } catch (err) {
        throw (err)
      }
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

.head_pic {
  text-align: center;
}
.head_pic > p {
  padding: 5px 0;
}
.head_pic > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.details span {
  display: inline-block;
  width: 48%;
  padding: 10px 0;
}
.details p > span:last-child {
  text-align: right;
}
</style>