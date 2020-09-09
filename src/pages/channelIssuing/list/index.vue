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
          渠道发卡-发卡列表
          <el-button type="primary"
                     @click="Export()"
                     style="float:right;margin:20px 40px 0 0">导出</el-button>
        </div>
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
      <!-- <div style="margin-left:30px">
        <el-select placeholder="请选择省"
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
        </el-select>
      </div> -->
      <!-- 列表 -->
      <div>
        <el-col :span="5"
                :offset='1'
                style="margin-right:10px">
          <!-- <el-input placeholder="请输入渠道名称"
                    v-model="company" /> -->
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
        </el-col>

        <el-col :span="10">

          <el-date-picker type="month"
                          placeholder="选择月份"
                          v-model="month"
                          @change="search"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
      </div>
      <el-table :data="list">
        <el-table-column prop="company"
                         label="运营中心名称"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.province_name">
              {{`${scope.row.province_name}${scope.row.city_name}运营中心`}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shop_count"
                         label="维修厂数量"
                         align="center">
        </el-table-column>
        <el-table-column prop="card_num"
                         label="卡总数"
                         align="center">
        </el-table-column>
        <el-table-column prop="consume_num"
                         label="消耗数量"
                         align="center">
        </el-table-column>
        <el-table-column prop="supp"
                         label="补卡数量"
                         align="center">
        </el-table-column>
        <el-table-column prop="sur_num"
                         label="剩余数量"
                         align="center">
        </el-table-column>

        <!-- <el-table-column align="center"
                         label="地区">
          <template slot-scope="scope">
            <el-popover placement="bottom"
                        width="400"
                        trigger="click">
              <el-button type="text"
                         slot="reference">详情</el-button>
              <div class="areaDetails">
                <h4 style="text-align:center">地区详情</h4>
                <div v-if="scope.row.province">
                  <span style="float:left;width:80%;">
                    <div v-for="(item,index) in scope.row.province"
                         :key="index"
                         class="area">
                      <p class="province"> {{item.province_name}}</p>
                      <p class="city">{{item.city_name ? item.city_name.join('、') : ''}}</p>
                    </div>
                  </span>
                </div>
                <div v-else
                     style="text-align:center;line-height:100px;font-size:18px">
                  无
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="详细地址"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="`${scope.row.province_name}${scope.row.city}${scope.row.county}${scope.row.address}`">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{`${scope.row.province_name}${scope.row.city}${scope.row.county}${scope.row.address}`}}</el-button>
            </el-popover>

          </template>
        </el-table-column> -->

        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="info"
                       size="mini"
                       @click="details(scope.row)">详情</el-button>

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
                           label="维修厂名称"
                           prop="company"></el-table-column>
          <el-table-column align="center"
                           label="消耗数量"
                           prop="policy_count"></el-table-column>
          <el-table-column align="center"
                           label="新增">
            <template slot-scope="scope">
              {{scope.row.new ? `${dateTime}月份${scope.row.new}` : ''}}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center"
                           label="维修厂电话"
                           min-width="100px"
                           prop="shop_phone"></el-table-column>
          <el-table-column align="center"
                           label="车辆品牌"
                           prop="car_name"></el-table-column>
          <el-table-column align="center"
                           label="车辆类型"
                           prop="type"></el-table-column>
          <el-table-column align="center"
                           label="排量"
                           prop="series"></el-table-column>
          <el-table-column align="center"
                           label="车牌号"
                           prop="plate"
                           min-width="100px"></el-table-column>
          <el-table-column align="center"
                           label="参与时间"
                           prop="sale_time"></el-table-column>
          <el-table-column align="center"
                           label="审核时间"
                           prop="audit_time">
            <template slot-scope="scope">
              {{scope.row.audit_time | datetime}}
            </template>
          </el-table-column> -->

        </el-table>
        <!-- 详情分页 -->
        <div class="page_center">
          <paging :page-count="detailsCount"
                  :page="detailsPage"
                  @index="(e)=>{
                    detailsPage=e,
                    details(currentReviewData)
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
      detailsVisible: false, //详情弹框状态
      currentReviewData: {},
      detailsPage: 1,    //详情当前页数
      detailsCount: 1,  //详情总页数
      detailsList: [],  //详情列表
      phone: '', // 负责人联系电话
      company: '',  //搜索名称
      year: '',
      month: '',
      provinceList: [],
      cityList: [],
      provinceId: "",
      cityId: ''
    }
  },

  watch: {
    company (val) {
      this.init()
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
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {

      this.$axios.post('admin/UserAudit/cityOperateList', { token: this.token, page: this.page, city: this.cityId, month: this.dateTime })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //详情
    async details (item) {
      try {
        this.currentReviewData = item
        this.detailsVisible = true
        const res = await this.$axios.post('admin/UserAudit/cityOperateDetail', { token: this.token, id: item.id, page: this.detailsPage, month: this.dateTime, city: item.city_id })
        this.detailsList = res.data.data.list || []
        this.detailsCount = res.data.data.rows || 1
      } catch (error) {
        throw (error)
      }
    },
    //搜索
    search (time) {
      this.page = 1;
      console.log(time)
      this.init()
    },

    Export () {  //导出
      window.location.href = `${this.baseURL}admin/Login/channelList?city=${this.cityId}&month=${this.dateTime}`
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
                if (arr[i].name == '渠道发卡') {
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
.areaDetails {
  max-height: 300px;
  min-height: 100px;
  overflow: auto;
}
.areaDetails .area {
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}
.areaDetails .province {
  font-size: 15px;
  font-weight: 600;
}
</style>
