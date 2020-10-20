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
        <div class="quote-ele"><i></i>供应商-提现-已审核 </div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <el-table :data="list">
        <el-table-column label="供应商名称"
                         prop="sm_name"
                         align="center">

        </el-table-column>

        <el-table-column label="提现金额（元）"
                         prop="total_money"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="moneyDetails.currentList = scope.row,getMoneyDetails(scope.row)">{{scope.row.total_money}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="提现类型"
                         prop="types"
                         align="center">
        </el-table-column>
        <el-table-column label="地区"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="region.visible=true,region.sm_id=scope.row.sm_id,getRegion()">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核人"
                         prop="audit_person"
                         align="center">
        </el-table-column>
        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center">
        </el-table-column>
        <el-table-column label="审核时间"
                         prop="audit_time"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.audit_time | datetime}}
          </template>
        </el-table-column>

      </el-table>
      <!-- 金额详情 -->
      <el-dialog title="金额详情"
                 center
                 :visible.sync="moneyDetails.visible"
                 @close='()=>{
                    moneyDetails.page = 1,  //关闭弹框清空当前页
                    moneyDetails.pageCount=1  //清空总页数
                   
                 }'>
        <el-table :data="moneyDetails.list"
                  ref="table">
          <el-table-column label="维修厂名称"
                           prop="company"
                           align="center"
                           min-width="100px"></el-table-column>
          <el-table-column label="地区"
                           align="center">
            <template slot-scope="scope">
              <el-popover placement="top-start"
                          title="标题"
                          width="200"
                          trigger="hover"
                          :content="`${scope.row.province}${scope.row.city}${scope.row.county}`">
                <el-button slot="reference"
                           type="text"
                           class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="产品名称"
                           align="center">
            <template slot-scope="scope">
              {{scope.row.name || '无'}}
            </template>
          </el-table-column>
          <el-table-column label="订单号"
                           prop="odd_number"
                           align="center"></el-table-column>
          <el-table-column label="单价（元）"
                           prop="unit_price"
                           min-width="100px"
                           align="center">
            <template slot-scope="scope">
              {{scope.row.unit_price || '无'}}
            </template>
          </el-table-column>
          <el-table-column label="总收入（元）"
                           min-width="110px"
                           prop="settlement_price"
                           align="center"></el-table-column>
          <el-table-column :label="moneyDetails.currentList.type==1 ? '总升数' : '个数'"
                           prop="oil_LPM"
                           align="center"></el-table-column>
          <el-table-column label="发货图片"
                           align="center">
            <template slot-scope="scope">
              <img :src="scope.row.freight_pic"
                   class="deliveryImg" />
            </template>
          </el-table-column>
          <el-table-column label="物料详情"
                           align="center"
                           v-if="moneyDetails.currentList.type==1">
            <template slot-scope="scope">
              <el-popover placement="bottom"
                          width="700"
                          trigger="click">
                <el-button slot="reference"
                           type="text">详情</el-button>
                <div class="popoverTable">
                  <el-table :data="scope.row.detail">
                    <el-table-column label="物料名称"
                                     prop="materiel"
                                     align="center"></el-table-column>
                    <el-table-column label="数量（升）"
                                     prop="num"
                                     align="center"></el-table-column>
                    <el-table-column label="备注"
                                     prop="remarks"
                                     align="center"></el-table-column>
                    <el-table-column label="单价（元）"
                                     prop="price"
                                     align="center"></el-table-column>
                    <el-table-column label="总价格（元）"
                                     prop="settlement_price"
                                     align="center"></el-table-column>
                  </el-table>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="page_center">
          <paging :page-count="moneyDetails.pageCount"
                  :page="moneyDetails.page"
                  @index="e=>{
                            moneyDetails.page=e,
                            getMoneyDetails()
                          }"></paging>
          <!--分页的组件-->
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

      <div class="page_center"
           v-show="page&&page>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="e=>{
                  page=e,
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
      thCurId: '',
      curId: '',
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      page: 0,
      pageCount: 0,
      moneyDetails: {  //金额详情
        visible: false, //弹框显示状态
        page: 1,  //当前页数
        pageCount: 1, //总页数
        list: [],  //列表
        currentList: {}, //当前所打开的金额详情
      },
      region: {  //地区
        visible: false,
        list: [],
        sm_id: 0, //供应商id
        type: '3',
      },
    }
  },

  methods: {
    async init () {
      try {
        const res = await this.$axios.post('admin/SmCash/smApplyCashList', { token: this.token, page: this.page, status: 1 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    //获取金额详情
    async getMoneyDetails (item) {
      try {
        this.moneyDetails.visible = true;  //打开金额详情弹框
        const res = await this.$axios.post('admin/SmCash/cashDetail', {
          token: this.token,
          page: this.moneyDetails.page,  //当前页数
          id: this.moneyDetails.currentList.id,  //提现id
          type: this.moneyDetails.currentList.type
        })
        this.moneyDetails.list = res.data.data.list || [];  //列表
        this.moneyDetails.pageCount = res.data.data.rows || 1;  //总页数
        this.magnifyImg(this.$refs.table.$el)
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
    magnifyImg (el) {  //图片放大功能
      this.$nextTick(() => {
        Viewer(el)
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
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].son) {
              if (arr[i].name == '提现') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;

              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '已审核' && arr[i].name == '提现') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
            }
          }
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
.table img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
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
.deliveryImg {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.popoverTable {
  max-height: 400px;
  overflow: auto;
}
</style>