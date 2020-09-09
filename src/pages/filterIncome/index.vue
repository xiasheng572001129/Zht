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
        <div class="quote-ele">
          <i></i>
          配送中心-滤芯收入
          <div class='export'>
            <el-button type="primary"
                       @click="EXPort()">导出</el-button>
          </div>
        </div>
      </div>
      <!-- 省市搜索 -->
      <div style="margin-left:30px">

        <!-- <el-input v-model="company"
                  placeholder="请输入公司名称"
                  style="width:15%"
                  clearable /> -->
        <el-select placeholder="请选择省"
                   v-model="provinceId"
                   @change="getCity"
                   clearable>
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
        </el-select>
        <el-date-picker type="month"
                        placeholder="选择月份"
                        v-model="month"
                        @change="search"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <!-- 列表 -->
      <el-table :data="list">
        <el-table-column align="center"
                         label="运营中心名称">
          <template slot-scope="scope">
            {{`${scope.row.province}${scope.row.city}`}}<span v-if="scope.row.province">运营中心</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="滤芯补贴收入"
                         prop="total_money">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="incomeDetail(scope.row)">{{scope.row.total_money}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="月份"
                         prop="month">
          <template slot-scope="scope">
            <div v-if="scope.row.month">
              {{scope.row.month}}月
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 地区详情 -->
      <el-dialog title="地区详情"
                 :visible.sync="regionDetailsVisible"
                 center>
        <div v-if="regionList && regionList.length>0"
             class="region">
          <div v-for="(item,index) in regionList"
               class="province"
               :key="index">
            <h3 style="margin:5px 0">{{item.name}}</h3>
            <div v-if="item.son && item.son.length>0">
              <div v-for="(city,cityIndex) in item.son"
                   :key="cityIndex"
                   class="city">
                <h4>{{city.name}}</h4>
                <div v-if="city.son && city.son.length>0">
                  <div v-for="(area,areaIndex) in city.son"
                       :key="areaIndex"
                       class="area">
                    {{area.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 收入明细 -->
      <el-dialog title="收入明细"
                 center
                 :visible.sync="incomeVisible">
        <el-table :data="incomeList">
          <el-table-column align="center"
                           label="维修厂名称"
                           prop="company">

          </el-table-column>
          <el-table-column align="center"
                           label="邦保养卡号"
                           prop="card_number"></el-table-column>
          <el-table-column align="center"
                           label="车牌号"
                           prop="plate"></el-table-column>
          <el-table-column align="center"
                           label="收入金额( 元 )"
                           prop="money"></el-table-column>
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
      seCurId: 0,
      threeAuthList: [],
      authList: [],
      regionDetailsVisible: false, //地区详情弹框状态
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
      regionList: [], //地区列表
      month: "", //月份
    }
  },

  computed: {
    dateTime () {

      const dateTime = new Date(this.month)
      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      return this.month ? `${year}-${month}` : ''
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
      this.$axios.post('admin/AgentIncome/index', { token: this.token, page: this.page, city: this.cityId, month: this.dateTime })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
    },
    search (time) {
      this.page = 1;
      this.init()
    },
    //地区详情
    async regionDetails (item) {
      try {
        this.regionDetailsVisible = true
        const res = await this.$axios.post('admin/AgentList/regionList', { token: this.token, aid: item.aid })
        this.regionList = res.data.data || []

      } catch (error) {
        throw (error)
      }
    },
    // 收入明细
    async incomeDetail (item) {
      try {
        this.incomeVisible = true
        const res = await this.$axios.post('admin/AgentIncome/filterDetail', { token: this.token, page: this.incomePage, month: this.dateTime, city_id: item.city_id })
        console.log(res.data.data.list)
        this.incomeList = res.data.data.list || []
        this.incomeCount = res.data.data.rows || 1
      } catch (error) {
        throw (error)
      }
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
        this.cityId = this.provinceId && data[0].id
        this.init()
      } catch (error) {
        throw (error)
      }
    },
    //导出
    EXPort () {
      window.location.href = `${this.baseURL}admin/Login/agentFilter?city=${this.cityId}&month=${this.dateTime}`
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
                if (arr[i].name == '滤芯收入') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
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
.region {
  max-height: 400px;
  overflow: auto;
}
.province {
  padding: 20px 0;
}
.city {
  padding: 5px 10px;
  border-top: 1px solid #cccccc;
}
.area {
  padding: 1px 15px;
}
.export {
  float: right;

  margin-right: 70px;
}
</style>
