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
        <div class="quote-ele"><i></i>配送中心-配送费提现-未审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <!-- 公司名称查询 -->
      <el-row>
        <el-col :span="4"
                :offset="1">
          <el-input placeholder="请输入公司名称"
                    v-model="company" />
        </el-col>
      </el-row>
      <!-- table列表 -->
      <el-table :data="list">
        <el-table-column prop="company"
                         label="公司名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="phone"
                         label="联系电话"
                         align="center">
        </el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center">
        </el-table-column>
        <el-table-column label="提现金额"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="incomeDetails.currentData=scope.row,incomeDetails.visible = true,getIncome(scope.row)">{{scope.row.money || 0}}元</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.audit_status ==1 ? '通过' : '驳回'}}
          </template>
        </el-table-column>
        <el-table-column prop="audit_time"
                         label="审核时间"
                         align="center">
        </el-table-column>
       

       
      </el-table>

      <!-- 收入详情 -->
      <el-dialog title="收入详情"
                 :visible.sync='incomeDetails.visible'
                 center
                 @close='()=>{
                     incomeDetails = $options.data().incomeDetails
                 }'>
        <el-table :data="incomeDetails.list"
                  max-height="500px">
          <el-table-column label="维修厂名称"
                           prop="company"
                           align="center"></el-table-column>
          <el-table-column :label="incomeDetails.agent_type==3 ?  '油升数/L' : incomeDetails.agent_type==1 || incomeDetails.agent_type==2 ? '个数' : '油升数/L'"
                           prop="oil_LPM"
                           align="center"></el-table-column>
          <el-table-column label="收入金额"
                           prop="amount"
                           align="center"></el-table-column>
          <el-table-column label="收入时间"
                           prop="over_time"
                           align="center"></el-table-column>
          <el-table-column label="物料详情"
                           align="center">
            <template slot-scope="scope">
              <el-popover placement="top"
                          v-if="scope.row.detail && scope.row.detail.length>0"
                          width="400"
                          trigger="click">
                <el-table :data="scope.row.detail">
                  <el-table-column property="materiel"
                                   label="物料名称"
                                   align="center"></el-table-column>
                  <el-table-column property="num"
                                   label="物料数量/L"
                                   align="center"></el-table-column>
                </el-table>
                <el-button slot="reference"
                           type="text">详情</el-button>
              </el-popover>
              <div v-else>
                无
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page_center">
          <paging :page-count="incomeDetails.pageCount"
                  :page="incomeDetails.page"
                  @index="(e)=>{
                      incomeDetails.page = e,
                      getIncome(incomeDetails.currentData)
                  }"></paging>
          <!--分页的组件-->
        </div>
      </el-dialog>

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
import Viewer from '@/utils/Viewer';
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
      company: '', //公司名称
      incomeDetails: {  //收入详情
        visible: false,  //收入详情弹框显示状态
        page: 1, //当前页
        pageCount: 1, //总页数 
        agent_type: '', //1 机滤 2 活动产品 3 油品
        list: [], //收入详情列表
        currentData: {}  //当前点击的提现金额数据
      },
    }
  },
  watch: {
    company (newVal) {
      this.init()
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/AgentWithdrawal/reviewedIndex', { token: this.token, page: this.page, audit_status: '', company: this.company })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 1
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
    },
    async getIncome (item) {  //获取收入详情
      try {
        const res = await this.$axios.post('admin/AgentWithdrawal/incomeList', { token: this.token, page: this.incomeDetails.page, aid: item.aid, id: item.id })  //aid 中心库id  id 提现id 
        this.incomeDetails.list = res.data.data.list || []
        this.incomeDetails.pageCount = res.data.data.rows || 1
        this.incomeDetails.agent_type = res.data.data.agent_type || ''
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
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
                if (arr[i].name == '配送费提现') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '已审核' && arr[i].name == '配送费提现') {
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
</style>
