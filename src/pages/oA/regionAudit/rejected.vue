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
        <div class="quote-ele"><i></i>增加地区-已驳回</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <!-- 列表 -->
      <el-table :data="list">
        <el-table-column align="center"
                         label="支付凭证"
                         ref="voucher">
          <template slot-scope="scope">
            <div>
              <img :src="scope.row.voucher"
                   class="photo voucher"
                   ref="voucher" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="个人近照">
          <template slot-scope="scope">
            <img :src="scope.row.personal_photo"
                 class="photo" />
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="登录名称"
                         prop="login_name"></el-table-column>
        <el-table-column align="center"
                         label="注册城市"
                         prop="area_name"></el-table-column>
        <el-table-column align="center"
                         label="联系电话"
                         prop="phone"></el-table-column>
        <el-table-column align="center"
                         label="驳回人"
                         prop="audit_person"></el-table-column>
        <el-table-column align="center"
                         label="驳回理由">
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
        <el-table-column align="center"
                         label="创建时间"
                         prop="create_time"></el-table-column>
        <el-table-column align="center"
                         label="驳回时间"
                         prop="audit_time"></el-table-column>
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
import Viewer from 'viewerjs';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      curId: 0,
      thCurId: 0,
      threeAuthList: [],
      authList: [],


    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/OaAudit/turn_area', { token: this.token, page: this.page })
        .then(res => {
          this.list = res.data.data.data || [];
          this.pageCount = res.data.data.rows || 1;
          this.$nextTick(() => {  //图片放大
            document.querySelectorAll('.voucher').forEach(item => {
              new Viewer(item)
            })

          })
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
                if (arr[i].name == '增加地区') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '已驳回' && arr[i].name == '增加地区') {
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
.photo {
  width: 80px;
  height: 80px;
}
</style>
