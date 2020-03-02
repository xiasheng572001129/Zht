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
             style="float:left"><i></i>供应商-油品审核 </div>
      </div>
      <table class="table">
        <tr>
          <th>供应商名称</th>
          <th>质量保证书</th>
          <th>质量承保书</th>
          <th>质检报告</th>
          <th>注册类型</th>
          <th>地区</th>
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
          <td>{{item.identity}}</td>
          <td>{{item.area}}</td>
          <td>
            <el-button type="primary"
                       size="small"
                       @click="detailList=item.detail,detailVisible=true,detail()">详情</el-button>
            <el-button type="success"
                       size="small"
                       @click="through(item)"
                       :loading='throughLoading[index]'>通过</el-button>
            <el-button type="danger"
                       size="small"
                       @click="reject(item.sm_id,index)"
                       :loading="rejectLoading[index]">驳回</el-button>
                        
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
           v-show="page&&page>1">
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
      page: 0,
      pageCount: 0,
      detailList: [],
      detailVisible: false, //详情弹框状态
      throughLoading: [], //通过加载Loading
      rejectLoading: [], //驳回Loading
    }
  },

  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },

    async init () {
      try {
        const res = await this.$axios.post('admin/SmAudit/smOilUnAuditList', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
        this.$nextTick(() => {
          const ViewerRef = this.$refs.images
          Viewer(ViewerRef)
        })
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
    //通过审核
    through (item, index) {

      const h = this.$createElement
      const newDatas = [item.agent_id > 0 && h('p', null, `原运营商余额: ${item.balance}元`), h('p', null, '请输入质保金')]
      this.$prompt('提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        message: h('div', null, newDatas),
        inputPattern: /\S/,
        inputErrorMessage: '请输入质保金'
      }).then(async ({ value }) => {
        try {
          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/SmAudit/passOil', { token: this.token, sm_id: item.sm_id, money: value, balance: item.balance })
          this.throughLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
    },
    //驳回
    reject (sm_id, index) {

      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {

        try {
          this.rejectLoading[index] = true

          const res = await this.$axios.post('admin/SmAudit/rejectOil', { token: this.token, sm_id: sm_id, reason: value })
          this.rejectLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
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