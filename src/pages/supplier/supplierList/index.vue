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
             style="float:left"><i></i>供应商-供应商列表 </div>
      </div>
      <el-table :data="list">
        <el-table-column label="供应商名称"
                         align="center"
                         prop="name">

        </el-table-column>
        <el-table-column label="联系电话"
                         prop="phone"
                         align="center"></el-table-column>

        <el-table-column label="总收入(元)"
                         prop="name"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="income.incomeVisible=true,income.sm_id=scope.row.sm_id,handleClick()">{{scope.row.total_income}}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="已缴纳质保金"
                         prop="name"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="getQualityMoney(scope.row)">{{scope.row.set_retention_money}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="余额"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="balanceDetails.visible=true,balanceDetails.sm_id=scope.row.sm_id,getBalance()">{{scope.row.no_cash_money}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="油品信息"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="getOil(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="机滤"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="getFilter(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="活动产品"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="getProduct(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="地区"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="region.visible=true,region.sm_id=scope.row.sm_id,getRegion()">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 总收入详情 -->
      <el-dialog title='总收入'
                 center
                 :visible.sync="income.incomeVisible"
                 @close="()=>income.type='3'">
        <el-tabs v-model="income.type"
                 @tab-click="handleClick">
          <el-tab-pane label="油品"
                       name="3">
            <el-table :data="income.incomeList"
                      ref="table">
              <el-table-column align="center"
                               label="升数"
                               prop="oil_LPM"></el-table-column>
              <el-table-column align="center"
                               label="收入金额( 元 )"
                               prop="settlement_price"></el-table-column>
              <el-table-column align="center"
                               label="收入时间">
                <template slot-scope="scope">
                  {{scope.row.over_time | datetime}}
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="发货图片"
                               ref="deliveryImg">
                <template slot-scope="scope">
                  <div ref="img"
                       class="deliveryImg">
                    <img :src="scope.row.freight_pic"
                         width="50px"
                         height="50px"
                         style="vertical-align: middle" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="page_center">
              <paging :page-count="income.pageCount"
                      :page="income.page"
                      @index="(e)=>{
                    income.page = e,
                    handleClick()
                }"></paging>
            </div>
          </el-tab-pane>
          <el-tab-pane label="滤芯"
                       name="1">
            <el-table :data="income.incomeList">
              <el-table-column label="维修厂名称"
                               prop="company"
                               align="center"></el-table-column>
              <el-table-column label="单价（元）"
                               prop="unit_price"
                               align="center"></el-table-column>
              <el-table-column label="总数量"
                               prop="count_num"
                               align="center"></el-table-column>
              <el-table-column label="总收入（元）"
                               prop="settlement_price"
                               align="center"></el-table-column>
              <el-table-column label="收入时间"
                               align="center">
                <template slot-scope="scope">
                  {{scope.row.over_time | datetime}}
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="page_center">
              <paging :page-count="income.pageCount"
                      :page="income.page"
                      @index="(e)=>{
                    income.page = e,
                    handleClick()
                }"></paging>
            </div>
          </el-tab-pane>
          <el-tab-pane label="活动产品"
                       name="2">
            <el-table :data="income.incomeList">
              <el-table-column label="维修厂名称"
                               prop="company"
                               align="center"></el-table-column>
              <el-table-column label="单价（元）"
                               prop="unit_price"
                               align="center"></el-table-column>
              <el-table-column label="总数量"
                               prop="count_num"
                               align="center"></el-table-column>
              <el-table-column label="总收入（元）"
                               prop="settlement_price"
                               align="center"></el-table-column>
              <el-table-column label="收入时间"
                               align="center">
                <template slot-scope="scope">
                  {{scope.row.over_time | datetime}}
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="page_center">
              <paging :page-count="income.pageCount"
                      :page="income.page"
                      @index="(e)=>{
                    income.page = e,
                    handleClick()
                }"></paging>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-dialog>

      <!-- 质保金 -->
      <el-dialog title="质保金"
                 :visible.sync='QualityMoney.visible'
                 center
                 width="30%">
        <div class="QualityMoney">
          <p>油品质保金：{{QualityMoney.list.bc_set_retention_money}}</p>
          <p>滤芯质保金：{{QualityMoney.list.mg_set_retention_money}}</p>
          <p>油品已缴纳质保金：{{QualityMoney.list.bc_my_retention_money}}</p>
          <p>滤芯已缴纳质保金：{{QualityMoney.list.mg_my_retention_money}}</p>
        </div>
      </el-dialog>

      <!-- 余额详情 -->
      <el-dialog title='余额详情'
                 center
                 :visible.sync="balanceDetails.visible"
                 @close="()=>balanceDetails.type='3'">
        <el-tabs v-model="balanceDetails.type"
                 @tab-click="getBalance()">
          <el-tab-pane label="油品"
                       name="3">
            <el-table :data="balanceDetails.list"
                      ref="table">
              <el-table-column align="center"
                               label="升数"
                               prop="oil_LPM"></el-table-column>
              <el-table-column align="center"
                               label="收入金额( 元 )"
                               prop="settlement_price"></el-table-column>
              <el-table-column align="center"
                               label="收入时间">
                <template slot-scope="scope">
                  {{scope.row.over_time | datetime}}
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="发货图片"
                               ref="deliveryImg">
                <template slot-scope="scope">
                  <div ref="img"
                       class="deliveryImg">
                    <img :src="scope.row.freight_pic"
                         width="50px"
                         height="50px"
                         style="vertical-align: middle" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="page_center">
              <paging :page-count="balanceDetails.pageCount"
                      :page="balanceDetails.page"
                      @index="(e)=>{
                    balanceDetails.page = e,
                    getBalance()
                }"></paging>
            </div>
          </el-tab-pane>
          <el-tab-pane label="滤芯"
                       name="1">
            <el-table :data="balanceDetails.list">
              <el-table-column label="订单号"
                               prop="apply_sn"
                               align="center"></el-table-column>
              <el-table-column label="维修厂名称"
                               prop="company"
                               align="center"></el-table-column>
              <el-table-column label="单价（元）"
                               prop="unit_price"
                               align="center"></el-table-column>
              <el-table-column label="总数量"
                               prop="oil_LPM"
                               align="center"></el-table-column>
              <el-table-column label="总收入（元）"
                               prop="settlement_price"
                               align="center"></el-table-column>
              <el-table-column label="收入时间"
                               align="center">
                <template slot-scope="scope">
                  {{scope.row.over_time | datetime}}
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="发货图片"
                               ref="deliveryImg">
                <template slot-scope="scope">
                  <div ref="img"
                       class="deliveryImg">
                    <img :src="scope.row.freight_pic"
                         width="50px"
                         height="50px"
                         style="vertical-align: middle" />
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="page_center">
              <paging :page-count="balanceDetails.pageCount"
                      :page="balanceDetails.page"
                      @index="(e)=>{
                    balanceDetails.page = e,
                    getBalance()
                }"></paging>
            </div>
          </el-tab-pane>
          <el-tab-pane label="活动产品"
                       name="2">
            <el-table :data="balanceDetails.list">
              <el-table-column label="订单号"
                               prop="apply_sn"
                               align="center"></el-table-column>
              <el-table-column label="维修厂名称"
                               prop="company"
                               align="center"></el-table-column>
              <el-table-column label="单价（元）"
                               prop="unit_price"
                               align="center"></el-table-column>
              <el-table-column label="总数量"
                               prop="oil_LPM"
                               align="center"></el-table-column>
              <el-table-column label="总收入（元）"
                               prop="settlement_price"
                               align="center"></el-table-column>
              <el-table-column label="收入时间"
                               align="center">
                <template slot-scope="scope">
                  {{scope.row.over_time | datetime}}
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="发货图片"
                               ref="deliveryImg">
                <template slot-scope="scope">
                  <div ref="img"
                       class="deliveryImg">
                    <img :src="scope.row.freight_pic"
                         width="50px"
                         height="50px"
                         style="vertical-align: middle" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="page_center">
              <paging :page-count="balanceDetails.pageCount"
                      :page="balanceDetails.page"
                      @index="(e)=>{
                    balanceDetails.page = e,
                    getBalance()
                }"></paging>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-dialog>

      <!-- 油品信息 -->
      <el-dialog title="油品信息"
                 center
                 :visible.sync='oilInfo.visible'>
        <el-table :data="oilInfo.list.detail">
          <el-table-column label="油品图片"
                           align="center">
            <template slot-scope="scope">
              <img :src='scope.row.cover'
                   width="50px"
                   height="50px" />
            </template>
          </el-table-column>
          <el-table-column label="油品名称"
                           prop="oil_name"
                           align="center">

          </el-table-column>
          <el-table-column label="总后台油品名称"
                           prop="little_name"
                           align="center"
                           min-width="100px">

          </el-table-column>
          <el-table-column label="型号"
                           prop="standard"
                           align="center">

          </el-table-column>
          <el-table-column label="升"
                           prop="rise"
                           align="center">

          </el-table-column>
          <el-table-column label="单价/升"
                           prop="price"
                           align="center">

          </el-table-column>
          <el-table-column label="简介"
                           align="center">
            <template slot-scope="scope">
              <el-popover placement="top-start"
                          width="200"
                          trigger="hover"
                          :content="scope.row.about">
                <el-button slot="reference"
                           type="text"
                           class="ellipsis">{{scope.row.about}}</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="guarantee"
             ref="guaranteeImg">
          <div>
            <img :src="oilInfo.list.quality_certificate"
                 width="80px"
                 height="80px" />
            <p>质量保证书</p>
          </div>
          <div>
            <img :src="oilInfo.list.quality_undertaking"
                 width="80px"
                 height="80px" />
            <p>质量承保书</p>
          </div>
          <div>
            <img :src="oilInfo.list.quality_inspection_report"
                 width="80px"
                 height="80px" />
            <p>质检报告</p>
          </div>
        </div>
      </el-dialog>

      <!-- 机滤 -->
      <el-dialog title="机滤"
                 center
                 :visible.sync='filter.visible'
                 width="30%">

        <div class="filter-guarantee"
             ref="guaranteeImg">
          <div>
            <img :src="filter.list.quality_certificate"
                 width="80px"
                 height="80px" />
            <p>质量保证书</p>
          </div>
          <div>
            <img :src="filter.list.quality_undertaking"
                 width="80px"
                 height="80px" />
            <p>质量承保书</p>
          </div>
          <div>
            <img :src="filter.list.quality_inspection_report"
                 width="80px"
                 height="80px" />
            <p>质检报告</p>
          </div>

        </div>
        <div class="filter-text">
          <p>品牌：{{filter.list.standard}}</p>
          <p>产品名称：{{filter.list.goods_brand}}</p>

          <p>已缴纳质保金：{{filter.list.my_retention_money}}</p>
          <p>需缴纳质保金：{{filter.list.set_retention_money}}</p>
        </div>
      </el-dialog>

      <!-- 活动产品 -->
      <el-dialog title="机滤"
                 center
                 :visible.sync='product.visible'
                 width="30%">

        <div class="filter-guarantee"
             ref="guaranteeImg">
          <div>
            <img :src="product.list.quality_certificate"
                 width="80px"
                 height="80px" />
            <p>质量保证书</p>
          </div>
          <div>
            <img :src="product.list.quality_undertaking"
                 width="80px"
                 height="80px" />
            <p>质量承保书</p>
          </div>
          <div>
            <img :src="product.list.quality_inspection_report"
                 width="80px"
                 height="80px" />
            <p>质检报告</p>
          </div>

        </div>
        <div class="filter-text">
          <p>品牌：{{product.list.standard}}</p>
          <p>产品名称：{{product.list.goods_brand}}</p>
          <p>已缴纳质保金：{{product.list.my_retention_money}}</p>
          <p>需缴纳质保金：{{product.list.set_retention_money}}</p>
        </div>
      </el-dialog>

      <!-- 地区详情 -->
      <el-dialog title='地区详情'
                 center
                 :visible.sync="region.visible"
                 @close="()=>region.type='3'"
                 width="30%">
        <div>
          <el-tabs v-model="region.type"
                   @tab-click="getRegion">
            <el-tab-pane label="油品"
                         name="3">

              <ul class="region"
                  v-if="region.list && region.list.length>0">
                <li v-for="(item,index) in region.list"
                    :key="index">
                  {{item.name}}
                  <ul v-if="item.son"
                      class="son">
                    <li v-for="(sonitem,i) in item.son"
                        :key="i">
                      {{sonitem.name}}
                      <ul v-if="sonitem.son"
                          class="grandson">
                        <li v-for="(grandson,key) in sonitem.son"
                            :key="key">{{grandson.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <p v-else
                 class="noRegion">暂无地区</p>
            </el-tab-pane>
            <el-tab-pane label="滤芯"
                         name="1">
              <ul class="region"
                  v-if="region.list && region.list.length>0">
                <li v-for="(item,index) in region.list"
                    :key="index">
                  {{item.name}}
                  <ul v-if="item.son"
                      class="son">
                    <li v-for="(sonitem,i) in item.son"
                        :key="i">
                      {{sonitem.name}}
                      <ul v-if="sonitem.son"
                          class="grandson">
                        <li v-for="(grandson,key) in sonitem.son"
                            :key="key">{{grandson.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <p v-else
                 class="noRegion">暂无地区</p>
            </el-tab-pane>
            <el-tab-pane label="活动产品"
                         name="2">
              <ul class="region"
                  v-if="region.list && region.list.length>0">
                <li v-for="(item,index) in region.list"
                    :key="index">
                  {{item.name}}
                  <ul v-if="item.son"
                      class="son">
                    <li v-for="(sonitem,i) in item.son"
                        :key="i">
                      {{sonitem.name}}
                      <ul v-if="sonitem.son"
                          class="grandson">
                        <li v-for="(grandson,key) in sonitem.son"
                            :key="key">{{grandson.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <p v-else
                 class="noRegion">暂无地区</p>
            </el-tab-pane>

          </el-tabs>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="(e)=>{
                    page = e,
                    init()
                }"></paging>
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
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      page: 0,  //供应商列表当前页数
      pageCount: 0, //供应商列表总页数
      income: {  //总收入
        incomeVisible: false, //总收入详情状态
        page: 0, //当前页数
        pageCount: 0, //总页数
        sm_id: 0, //供应商id
        incomeList: [], //收入列表
        type: '3', //当前选择的收入详情
      },
      QualityMoney: {  //质保金详情
        list: {},
        visible: false
      },
      balanceDetails: {  //余额详情
        page: 0, //当前页数
        pageCount: 0, //总页数
        sm_id: 0, //供应商id
        list: [], //列表
        type: '3',
        visible: false
      },
      oilInfo: {  //油品信息
        visible: false,
        list: {}
      },
      filter: {  //机滤
        visible: false,
        list: {}
      },
      product: {  //活动产品
        visible: false,
        list: {}
      },
      region: {  //地区
        visible: false,
        list: [],
        sm_id: 0, //供应商id
        type: '3',
      }
    }
  },
  watch: {
    'income.type': {  //总收入tab切换时初始化当前页
      deep: true,
      handler () {
        this.income.page = 1
        this.income.pageCount = 0
      }
    },
    'balanceDetails.type': {  //总收入tab切换时初始化当前页
      deep: true,
      handler () {
        this.balanceDetails.page = 1
        this.balanceDetails.pageCount = 0
      }
    }
  },
  methods: {
    async init () {
      try {
        const res = await this.$axios.post('admin/SmList/smIndexList', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },


    handleClick () {  //总收入-油品收入、滤芯收入、活动产品收入
      try {
        this.$nextTick(async () => {
          const res = await this.$axios.post('admin/SmList/totalIncomeDetail', { token: this.token, type: this.income.type, sm_id: this.income.sm_id, page: this.income.page })      //type 3油品 1滤芯 2活动产品    sm_id 供应商id
          this.income.incomeList = res.data.data.list || []   //收入列表
          this.income.pageCount = res.data.data.rows || 0  //总页数
          this.$nextTick(() => {
            const arrImg = document.querySelectorAll('.deliveryImg')
            arrImg.forEach(item => {
              new Viewer(item)   //图片发大
            })
          })
        })
      } catch (error) {
        throw (error)
      }
    },
    async getQualityMoney (item) {  //获取质保金和以缴纳质保金
      try {
        this.QualityMoney.visible = true
        const res = await this.$axios.post("admin/SmList/retentionMoney", { token: this.token, sm_id: item.sm_id })  //sm_id 供应商id
        this.QualityMoney.list = res.data.data || {}
      } catch (error) {
        throw (error)
      }
    },
    getBalance () {  //余额-油品收入、滤芯收入、活动产品收入
      try {
        this.$nextTick(async () => {
          const res = await this.$axios.post('admin/SmList/noWithdrawal', { token: this.token, type: this.balanceDetails.type, sm_id: this.balanceDetails.sm_id, page: this.balanceDetails.page })      //type 3油品 1滤芯 2活动产品    sm_id 供应商id
          this.balanceDetails.list = res.data.data.list || []   //收入列表
          this.balanceDetails.pageCount = res.data.data.rows || 0  //总页数
          this.$nextTick(() => {
            const arrImg = document.querySelectorAll('.deliveryImg')
            console.log(arrImg)
            arrImg.forEach(item => {
              new Viewer(item)   //图片发大
            })
          })
        })
      } catch (error) {
        throw (error)
      }
    },
    async getOil (item) {  //获取油品信息
      try {
        this.oilInfo.visible = true
        const res = await this.$axios.post('admin/SmList/getOilIndexList', { token: this.token, sm_id: item.sm_id })
        this.oilInfo.list = res.data.data || {}
        this.magnifyImg(this.$refs.guaranteeImg)
      } catch (error) {
        throw (error)
      }
    },
    async getFilter (item) {  //获取机滤
      try {
        this.filter.visible = true
        const res = await this.$axios.post('admin/SmList/getFreeIndexList', { token: this.token, sm_id: item.sm_id, type: 1 })
        this.filter.list = res.data.data || {}
        this.magnifyImg(this.$refs.guaranteeImg)
      } catch (error) {
        throw (error)
      }
    },
    async getProduct (item) {  //获取活动产品
      try {
        this.product.visible = true
        const res = await this.$axios.post('admin/SmList/getFreeIndexList', { token: this.token, sm_id: item.sm_id, type: 2 })
        this.product.list = res.data.data || {}
        this.magnifyImg(this.$refs.guaranteeImg)
      } catch (error) {
        throw (error)
      }
    },
    async getRegion (item) {  //获取地区详情
      try {
        this.$nextTick(async () => {
          const res = await this.$axios.post('admin/SmList/smAreaDetail', { token: this.token, type: this.region.type, sm_id: this.region.sm_id })      //type 3油品 1滤芯 2活动产品    sm_id 供应商id
          this.region.list = res.data.data || []   //地区列表
        })
      } catch (error) {
        throw (error)
      }
    },
    magnifyImg (img) {  //图片放大功能
      this.$nextTick(() => {
        new Viewer(img)
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
.QualityMoney > p {
  margin: 10px 0;
}
.guarantee {
  width: 310px;
  margin: 0 auto;
}
.guarantee > div {
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  font-weight: bold;
  margin: 20px 10px;
}
.guarantee > div img {
  width: 100%;
}
.filter-guarantee > div {
  display: inline-block;
  width: 80px;
  height: 80px;
  text-align: center;
  font-weight: bold;
  margin-right: 10px;
}
.filter-text > p {
  margin: 10px 0;
}
>>> .el-tabs__content {
  max-height: 400px;
  min-height: 200px;
  overflow: auto;
}
.region > li {
  width: 50%;
  margin-bottom: 30px;
}

.region .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.region .son li {
  display: block;
}

.region .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}
.region .grandson li {
  display: block;
  margin-bottom: 7px;
}
.noRegion {
  text-align: center;
}
</style>