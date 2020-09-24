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
        <div class="quote-ele"><i></i>供应商-活动产品审核-未审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <table class="table">
        <tr>
         
          <th>供应商名称</th>
          <th>联系电话</th>
          <th>供应类型</th>
          <th>产品名称</th>
          <th>品牌</th>
          <th>金额（元）</th>
          <th>类型</th>
          <th>申请时间</th>
           <th>产品图片</th>
          <th>质量保证书</th>
          <th>质量承保书</th>
          <th>质检报告</th>
          <th>操作</th>
        </tr>
        <tr v-for='(item,index) in list'
            :key="index"  ref='images'>
          <td>{{item.s_name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.product_name}}</td>
          <td>{{item.brand}}</td>
          <td>{{item.standard}}</td>
          <td>{{item.price}}</td> 
          <td>{{item.type==1 ? '滤芯' : '活动产品'}}</td>
          <td>{{item.create_time}}</td> 
          <td>
              <img :src="item.pic" />
          </td>
          <td>
            <img :src="item.quality_certificate">
          </td>
          <td>
            <img :src="item.quality_undertaking">
          </td>
          <td>
            <img :src="item.quality_inspection_report" >
          </td>
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
                       @click="reject(item,index)"
                       :loading="rejectLoading[index]">驳回</el-button>
          </td>
        </tr>
      </table>
      <!-- 详情 -->
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

      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="(e)=>{
                    page = e,
                    init()
                }"></paging>
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
      authList: [],
      threeAuthList: [],
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
    async init () {
      try {
        const res = await this.$axios.post('admin/SmAudit/freeList', { token: this.token, page: this.page, status: 0,type:2 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
        this.$nextTick(() => {
          const ViewerRef = this.$refs.images
          res.data.data.list && Viewer(ViewerRef)
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
    reject (item, index) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading[index] = true
          const res = await this.$axios.post('admin/SmAudit/rejectFree', { token: this.token, sm_id: item.sm_id, reason: value,id:item.id })
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
                if (arr[i].name == '活动产品审核') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '活动产品审核') {
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
.table img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
</style>
