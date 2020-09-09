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
        <div class="quote-ele"><i></i>配送中心-提现复核-未审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <!-- 省市搜索 -->
      <div style="margin-left:30px">
        <!-- <el-select placeholder="请选择省"
                   v-model="provinceId"
                   @change="getCity">
          <el-option v-for="(item,index) in provinceList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
        <el-select placeholder="请选择市"
                   v-model="cityId"
                   @change="init()">
          <el-option v-for="(item,index) in cityList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select> -->
        <el-input v-model="company"
                  placeholder="请输入公司名称"
                  style="width:15%" />
      </div>
      <!-- 列表 -->
      <el-table :data="list">
        <el-table-column align="center"
                         label="订单编号"
                         prop="odd_number"
                         min-width="150px"></el-table-column>
        <el-table-column align="center"
                         label="公司名称"
                         prop="company"></el-table-column>
        <el-table-column align="center"
                         label="负责人"
                         prop="leader"></el-table-column>
        <el-table-column align="center"
                         label="联系电话"
                         prop="phone"></el-table-column>
        <el-table-column align="center"
                         label="开户名"
                         prop="bank_name"></el-table-column>
        <el-table-column align="center"
                         label="开户行"
                         prop="bank"></el-table-column>
        <el-table-column align="center"
                         label="开户分行"
                         prop="branch"></el-table-column>
        <el-table-column align="center"
                         label="账号"
                         prop="account"
                         min-width="100px"></el-table-column>
        <el-table-column align="center"
                         label="提现金额"
                         prop="money"></el-table-column>
        <el-table-column align="center"
                         label="收入明细">

          <template slot-scope="scope">
            <el-button type="text"
                       @click="incomeDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="adopt(scope.row,scope.$index)"
                       :loading="throughLoading[scope.$index]">通过</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 复核详情 -->
      <el-dialog title="复核详情"
                 :visible.sync="detailsVisible"
                 center
                 width="70%"
                 @close='()=>{detailsPage=1}'>
        <el-table :data="detailsList">
          <el-table-column align="center"
                           label="订单编号"
                           prop="odd_number"
                           min-width="150px"></el-table-column>
          <el-table-column align="center"
                           label="公司名称"
                           prop="company"></el-table-column>
          <el-table-column align="center"
                           label="负责人"
                           prop="leader"></el-table-column>
          <el-table-column align="center"
                           label="联系电话"
                           prop="phone"></el-table-column>
          <el-table-column align="center"
                           label="开户名"
                           prop="bank_name"></el-table-column>
          <el-table-column align="center"
                           label="开户行"
                           prop="bank"></el-table-column>
          <el-table-column align="center"
                           label="开户分行"
                           prop="branch"></el-table-column>
          <el-table-column align="center"
                           label="账号"
                           prop="account"
                           min-width="100px"></el-table-column>
          <el-table-column align="center"
                           label="提现金额"
                           prop="money"></el-table-column>
          <el-table-column align="center"
                           label="收入明细">

            <template slot-scope="scope">
              <el-button type="text"
                         @click="incomeDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="mini"
                         @click="adopt(scope.row,scope.$index)"
                         :loading="throughLoading[scope.$index]">通过</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 复核分页 -->
        <div class="page_center">
          <paging :page-count="detailsCount"
                  :page="detailsPage"
                  @index="(e)=>{
                    detailsPage=e,
                    details(currentReviewData)
                }"></paging>
        </div>
        <!-- 收入明细 -->
        <el-dialog append-to-body
                   title="收入明细"
                   center
                   :visible.sync="incomeVisible">
          <el-table :data="incomeList">
            <el-table-column align="center"
                             label="收入类型">
              <template>
                配送费
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="收入金额"
                             prop="amount"></el-table-column>
            <el-table-column align="center"
                             label="收入时间"
                             prop="create_time"></el-table-column>
          </el-table>
          <!-- 收入明细分页 -->
          <div class="page_center">
            <paging :page-count="incomeCount"
                    :page="incomePage"
                    @index="(e)=>{
                    incomePage=e,
                    incomeDetail(currentIncomeData)
                }"></paging>
          </div>
        </el-dialog>
      </el-dialog>
      <!-- 收入明细 -->
      <el-dialog title="收入明细"
                 center
                 :visible.sync="incomeVisible">
        <el-table :data="incomeList">
          <el-table-column align="center"
                           label="收入类型">
            <template>
              配送费
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="收入金额"
                           prop="amount"></el-table-column>
          <el-table-column align="center"
                           label="收入时间"
                           prop="create_time"></el-table-column>
        </el-table>
        <!-- 收入明细分页 -->
        <div class="page_center">
          <paging :page-count="incomeCount"
                  :page="incomePage"
                  @index="(e)=>{
                    incomePage=e,
                    incomeDetail(currentIncomeData)
                }"></paging>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div :class="list && list.length<=7?'page-nav':'page_center'"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getPro, GET_City } from '@/utils'   //获取省市
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
      detailsVisible: false, //复核详情弹框状态
      detailsPage: 1,    //复核详情当前页数
      detailsCount: 1,  //复核详情总页数
      detailsList: [],  //复核详情列表
      currentReviewData: {}, //当前复核详情
      phone: '', // 负责人联系电话
      throughLoading: [],
      incomeVisible: false, //提现明细弹框状态
      incomePage: 1, //收入明细当前页
      incomeCount: 1, //收入明细总页数
      incomeList: [], //收入明细列表,
      currentIncomeData: {}, //当前收入明细详情
      provinceList: [],//所有省列表
      provinceId: '',//当前所选中的省id
      cityList: [], //市列表
      cityId: '',//当前选中的市id
      company: "", //公司名称
    }
  },


  watch: {
    company (val) {
      this.page = 1
      this.init()
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentForward/review', { token: this.token, page: this.page, audit_status: 0, cid: this.cityId, company: this.company })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //复核详情
    async details (item) {
      try {
        this.currentReviewData = item
        this.detailsVisible = true
        const res = await this.$axios.post('admin/AgentForward/reviewDetail', { token: this.token, cid: item.cid, page: this.detailsPage, audit_status: 0 })
        this.detailsList = res.data.data.list || []
        this.detailsCount = res.data.data.rows || 1

      } catch (error) {
        throw (error)
      }
    },
    // 收入明细
    async incomeDetail (item) {
      try {
        this.currentIncomeData = item
        this.incomeVisible = true
        const res = await this.$axios.post('admin/AgentForward/incomeLists', { token: this.token, aid: item.aid, page: this.incomePage })
        this.incomeList = res.data.data.list || []
        this.incomeCount = res.data.data.rows || 1
      } catch (error) {
        throw (error)
      }
    },
    //通过审核
    adopt (row, index) {
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.throughLoading[index] = true
          const res = await this.$axios.post('admin/AgentForward/reviewAdopt', { token: this.token, id: row.id, phone: this.currentReviewData.phone })
          this.throughLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.throughLoading[index] = false
          throw (error)
        }
      }).catch(() => { });
    },

    // 获取省
    async getProList () {
      try {
        const data = await getPro()
        this.provinceList = data || []
      } catch (error) {
        throw (error)
      }
    },
    //获取市
    async getCity () {
      try {
        const data = await GET_City(this.provinceId)
        this.cityList = data || []
        this.cityId = data[0].id
        this.init()
      } catch (error) {
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
                if (arr[i].name == '提现复核') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '提现复核') {
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
    this.getProList()
  },
}
</script>
<style scoped>
</style>
