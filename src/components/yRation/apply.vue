<template>
  <div class="ApplyList">
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
        <div class="quote-ele"><i></i>市级配送中心-物料配给</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="(item,index) in threeAuthList"
                       :key="index"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>市级配送中心</th>
            <th>联系电话</th>
            <th>负责人</th>

            <!-- <th>支付凭证</th> -->
            <!-- <th>区域个数</th> -->
            <th>申请时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>

            <!-- <td>
              <img ref="usecost"
                   :src="item.usecost"
                   style="width:60px;height:60px;vertical-align:middle;margin:10px 0">
            </td> -->
            <!-- <td v-if="item.regions">
              <a href="javascript:;"
                 @click="regionsf(item.id)">{{item.regions}}</a>
            </td>
            <td v-else>0</td> -->
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="openAlert(item.id,item.aid)">查看</a>
            </td>
          </tr>
        </tbody>
      </table>
      <!--分页-->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <div class="shuju laybox2"
         style="display:none">
      <ul>
        <li v-if="arealist.status==0">暂未设置供应地区</li>
        <li v-else
            v-for="(item,index) in arealist.data"
            :key='index'>
          {{item.name}}
          <ul v-if="item.son"
              class="son">
            <li v-for="(sonitem,sonindex) in item.son"
                :key='sonindex'>
              {{sonitem.name}}
              <ul v-if="sonitem.son"
                  class="grandson">
                <li v-for="(grandson,sonIndex) in sonitem.son"
                    :key='sonIndex'>{{grandson.name}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div ref="container">
      <!--查看详情对话框-->
      <details-dialog title="物料配给-详情"
                      class='details'
                      :Visible.sync="detailsVisible"
                      @close="detailsClose">
        <div class="details_box">
          <div class="details_content">
            <div class="youpin">
              <div class="details_content-abs">
                <!-- <div class="center">转账凭证</div>
                <div class="center"><img :src="detailsList.voucher"
                       ref='usecost'
                       style="width: 200px;height: 100px;margin:10px 0"></div> -->
                <el-form label-position="left"
                         style="margin-left:58px;padding-right:58px;box-sizing: border-box;">
                  <el-form-item label="是否增加物料">
                    <el-radio v-model="materialState"
                              :label="1">是</el-radio>
                    <el-radio v-model="materialState"
                              :label="0">否</el-radio>
                  </el-form-item>
                  <el-form-item label="物料配给/组"
                                v-if="materialState">

                  </el-form-item>
                  <el-form-item>
                    <div class="progress"
                         v-if="materialState">
                      <div :class="['progress-item',active[index]]"
                           @click="CurrentGroup=item,Selection(item)"
                           v-for="(item,index) in  10"
                           :key="index">
                        <p>{{item}}</p>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-popover placement="right"
                                width="400"
                                trigger="click"
                                @show='details'
                                v-if="materialState">
                      <el-button slot="reference"
                                 type="primary"
                                 size="mini">物料详情</el-button>
                      <div style="text-align:center;padding-bottom:10px">详情</div>
                      <el-table :data="materielDetails"
                                border
                                size='mini'>
                        <el-table-column label="油品名称"
                                         align="center"
                                         prop="materiel"
                                         style="font-size:10px">
                        </el-table-column>
                        <el-table-column label="件"
                                         align="center"
                                         prop="num">

                        </el-table-column>
                      </el-table>
                    </el-popover>
                    <!-- <el-button type="primary"
                               size="mini">增加配给</el-button> -->
                  </el-form-item>
                  <!-- <el-form-item label="查看区域 : ">
                    <el-radio v-model="regionState"
                              @change="active=['active'],detailArea()"
                              :label="1">区/县级</el-radio>
                    <el-radio v-model="regionState"
                              @change="detailArea"
                              :label="2">市级</el-radio>
                  </el-form-item> -->
                  <el-form-item label="省 : ">
                    {{regionList.proName}}
                  </el-form-item>
                  <el-form-item label="市 : ">
                    {{regionList.cityName}}
                  </el-form-item>
                  <el-form-item label="区/县 : ">

                    <div v-if="isArray">
                      <span v-for="(item,index) in regionList.countyName"
                            :key="index">{{item}}、</span>
                    </div>
                    <div v-else> {{ regionList.countyName}}</div>
                  </el-form-item>
                </el-form>
                <div>
                </div>
              </div>
            </div>
            <div>
              <!-- <div v-show="
                         isReadonly"
                   class='Tips'>*此市级配送中心已分配利润比例不需重新分配</div> -->
              <ul class="right">

                <!-- <li>
                  <div>市级配送中心利润(百分比)
                    <span class="color-red"
                          style="margin-left:20px">*最高15%</span>
                  </div>
                  <div class="right_border-bottom">
                    <input :readonly="isReadonly"
                           max="15"
                           type="number"
                           v-model="profit">
                  </div>
                </li> -->
                <!-- <li>
                  <div>
                    <div>推荐人身份: {{detailsList.share_type}}</div>
                    <div class="name">推荐人名称: {{detailsList.share_name}}</div>
                  </div>
                </li> -->
                <li>
                  <div>供应商</div>
                  <div class="right_border-bottom">
                    <el-select v-model="activeProsy"
                               placeholder="请选择"
                               v-if="prosyList.length"
                               @change="blurGetNum">
                      <el-option v-for="(item, index) in prosyList"
                                 :key="index"
                                 :value="item.id"
                                 :label="item.name">
                      </el-option>
                    </el-select>
                    <input v-if="prosyList.length==0"
                           type="text"
                           readonly
                           :value="oneProsy.name">
                  </div>
                </li>
                <li>
                  <div>送货延迟罚款</div>
                  <div class="right_border-bottom">
                    <input type="text"
                           :readonly="isReadonly"
                           v-model="delay_fine"
                           disabled>
                  </div>
                </li>
                <!-- <li>
                  <div>维修厂工时费(百分比)</div>
                  <div class="right_border-bottom">
                    <input type="text"
                           :readonly="isReadonly"
                           v-model="shop_hours">
                  </div>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="Reject_Reason">
            <div>驳回理由:</div>
            <div>
              <input type="text"
                     placeholder='请输入驳回理由'
                     v-model="Reason">
            </div>
          </div>
          <div class="details_box-btn">
            <el-button type="danger"
                       danger
                       round
                       @click="Reject">驳回</el-button>
            <el-button type="primary"
                       :disabled="adoptVisible"
                       round
                       @click="adopt"
                       :loading="adoptLoading">通过</el-button>
          </div>
          <!-- <div class="textPrompt">
            <p>注：1. 市级配送中心首次配给时，输入框的值会均分到运营库以及授信库。</p>
            <p style="text-indent:30px;">2. 市级配送中心后需增加配给时，输入框中的值会全部增加到授信库。</p>
          </div> -->
        </div>

        <Region-dialog :regionVisible="regionVisible"
                       @regionClose="regionClose"
                       :Province="Province"></Region-dialog>

      </details-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
import detailsDialog from "@/components/Dialog/Dialog";
import RegionDialog from "@/components/Dialog/RegionDialog"
import Viewer from '@/utils/Viewer';

export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      arealist: {},
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      detailsVisible: false,   //详情对话框,默认隐藏
      profit: 10,
      delay_fine: 200,
      shop_hours: 6,
      card_profit: '',  //市级代理商利润
      working_hours: '', //维修厂工时费
      City_generation: '',//市级代理
      serProfit: '',     //服务经理利润
      develAward: '1',   //开发奖励
      regionVisible: false,  //选择区域对话框
      detailsList: {}, //详情的数据
      detailsID: "",   //点击查看获取每一个详情的id
      detailaID: "",   //点击查看获取每一个详情的aid
      Province: [],   //区域个数的数据
      isReadonly: false,  //是否只读
      card_Visible: true,
      Reason: "", //驳回理由
      DevelopmentData: '', //开发奖励下拉选择器数据
      selectValue: '',
      mid: '', //服务经理id
      adoptVisible: false,
      adoptContent: "通过",
      serviceList: [],
      businessList: [],
      itemList: '',
      serviceName: '',
      serviceID: '',
      OperateList: {},
      prosyList: [], //市场代理,
      activeProsy: 'a',
      oneProsy: '',
      youpin: [], //油品
      regionState: 1,  //区域选择
      regionID: '',  //区域id
      regionList: {},  //区域列表
      CurrentGroup: 1,  //当前物料配给/组
      active: ['active'],
      materielDetails: [], //物料详情
      materialState: 0, //是否增加物料 0 不增加 1 增加
      adoptLoading: false
    }
  },

  components: {
    detailsDialog,
    RegionDialog
  },
  computed: {
    isArray () {
      return this.regionList.countyName instanceof Array
    }
  },
  methods: {
    enlarge () {
      this.$nextTick(() => {
        const ViewerDom = this.$refs.usecost
        if (ViewerDom) {
          Viewer(ViewerDom);
        }
      })
    },
    Selection (length) {


      let item = []
      for (let i = 0; i < length; i++) {
        item.push('active')
      }
      this.active = item

    },
    close () {
      this.itemList = ''
    },
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentIncRation/waitAudit', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows;
            this.enlarge()
          } else {
            layer.msg(res.data.msg)
            this.list = []
          }
        })
        .catch(err => console.log(err))
    },

    regionsf: function (aid) {
      this.$axios.post('admin/AgentIncRation/detailArea', {
        token: this.token,
        id: aid
      })
        .then(res => {
          this.arealist = res.data;
          if (typeof res.data.data == 'object')
            layer.open({
              type: 1,
              area: ['50%', '60%'],
              title: ['区域', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1, //怎么显示 ×
              content: $('.laybox2')
            })
          else layer.msg(res.data.data)

        }).catch(err => { })
    },
    async detailArea () {  //查看用户区域
      try {
        const res = await this.$axios.post('admin/AgentIncRation/detailArea', { token: this.token, type: this.regionState, id: this.regionID })
        this.regionList = res.data.data || []
      } catch (err) {
        throw (err)
      }
    },
    //点击查看,获取详情数据
    openAlert (id, aid) {
      // this.CityGenerationData()
      this.regionID = id
      this.activeProsy = ''
      this.detailsVisible = true;
      this.detailsID = id;
      this.detailaID = aid

      //   this.$axios.post("admin/AgentIncRation/commonOil", { token: this.token }).then(res => {
      //     this.youpin = res.data.data;
      //   });
      this.$axios.post("admin/AgentIncRation/detail", { token: this.token, aid: aid, id: id }).then(res => {
        if (res.data.code == 1) {
          res.data.data.company ? this.City_generation = res.data.data.company : this.City_generation = "无"
          this.detailsList = res.data.data;
          this.enlarge()
          if (this.detailsList.delay_fine && this.detailsList.profit && this.detailsList.shop_hours) {
            this.profit = this.detailsList.profit
            this.delay_fine = this.detailsList.delay_fine
            this.shop_hours = this.detailsList.shop_hours
            this.isReadonly = true
          } else {
            this.isReadonly = false
          }
        }
      }).catch(err => console.log(err))
      this.prosyList = []
      this.oneProsy = ''
      this.$axios.post("admin/AgentIncRation/selectAgent", {  //市场代理接口
        token: this.token,
        aid: aid,
        id: id
      })
        .then((res) => {
          if (!res.data.data.length) {
            this.oneProsy = res.data.data
            this.activeProsy = res.data.data.id
          } else if (typeof (res.data.data) == 'object') {
            this.prosyList = res.data.data;
            this.prosyList.filter((item, index, array) => {
              if (item.mo) this.activeProsy = item.id;
            })
          }
        })
      this.detailArea()
    },
    async details () {  //获取物料详情
      console.log(this.CurrentGroup)
      try {
        const res = await this.$axios.post('admin/AgentIncRation/commonOil', { token: this.token, number: this.CurrentGroup })
        this.materielDetails = res.data.data || []
      } catch (err) {

      }
    },
    //关闭对话框
    detailsClose () {
      this.detailsVisible = false
      this.materialState = 0
    },
    //获取选择的区域
    showarea () {

      this.$axios.post("admin/AgentIncRation/detailArea", { token: this.token, id: this.detailsID }).then(res => {
        if (res.data.code == 1) {

          this.regionVisible = true
          this.Province = res.data.data
        }
      })
    },
    //关闭区域对话框
    regionClose () {
      this.regionVisible = false
    },
    serviceData () {
      this.$axios.post('admin/AgentIncRation/setListThe', { token: this.token }).then(res => {
        if (res.data.code == 1) {
          this.businessList = res.data.data
        }
      }).catch(err => console.log(err))

    },
    GitiD () {
      this.serviceName = this.itemList.name
      this.serviceID = this.itemList.id
    },
    //驳回操作
    Reject () {
      if (!this.Reason) {
        layer.msg("请输入驳回理由")
        return;
      }
      //后端需要的数据
      var RejectData = {
        token: this.token,
        reason: this.Reason,
        id: this.detailsID,
        aid: this.detailaID
      }
      //调取驳回接口
      this.$axios.post("admin/AgentIncRation/rejec", RejectData).then(res => {
        if (res.data.code == 1) {
          var that = this
          this.detailsVisible = false
          this.init()
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => console.log(err))
    },
    blurGetNum () {

    },
    //通过操作
    adopt () {
      var flag = true

      for (let item of this.youpin) {
        if (item.num == '' || item.num <= 0 || typeof item.num == 'string') {
          if (item.num == '' && typeof item.num != 'number') {
            this.$notify({
              title: '警告',
              message: item.materiel + ' 的值必须为数值且不得为空',
              type: 'warning',
              position: 'bottom-right'
            })
          } else {
            this.$notify({
              title: '警告',
              message: item.materiel + ' 的值不得小于等于零',
              type: 'warning',
              position: 'bottom-right'
            })
          }
          flag = false
          break;
        }
      }
      if (flag) {
        this.adoptContent = 5
        this.adoptVisible = true
        var Interv = setInterval(() => {
          this.adoptContent--
          if (this.adoptContent < 0) {
            this.adoptContent = "通过"
            this.adoptVisible = false
            clearInterval(Interv)
          }
        }, 1000)
        //后端需要的数据
        this.activeProsy = this.activeProsy || ''
        var adoptData = {
          token: this.token,
          aid: this.detailaID,
          id: this.detailsID,
          price: this.detailsList.price,
          regions: this.detailsList.regions,
          profit: this.profit,
          delay_fine: this.delay_fine,
          shop_hours: this.shop_hours,
          card_profit: this.card_profit,
          serProfit: this.serProfit,
          develAward: this.develAward,
          mid: this.serviceID,
          share_promo_code: this.detailsList.share_promo_code,
          gid: this.activeProsy,
          mate: this.youpin,
          level: this.regionState,
          number: this.CurrentGroup
        }
        //调取通过接口
        this.adoptLoading = true
        this.$axios.post("admin/AgentIncRation/adopt", adoptData).then(res => {
          this.adoptLoading = false
          if (res.data.code == 1) {
            var that = this;
            this.detailsVisible = false
            this.init()
            this.$message({ message: res.data.msg, type: 'success' })
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => console.log(err))
      }
    },
    // 请求开发奖励下拉选择器数据

    //下拉选择器发生改变时获取服务经理Id
    selectChange (mid) {
      this.mid = mid
    },
  },
  created () {
    this.init();
  },
  mounted () {
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
                if (arr[i].son[j].name == '申请列表' && arr[i].name == '增加地区') {
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
  },
  watch: {
    index () {
      this.init();
    },
    profit (newVal, oldVal) {
      //输出的时候最大是15
      if (newVal > 15) {
        this.profit = 15
      }
    }
  }
}
</script>
<style scoped>
.active {
  background-color: #409eff !important;
  color: #409eff;
}

.progress {
  /* background-color: #ebeef5; */
  height: 10px;
  /* border-radius: 10px; */
  position: relative;

  margin: 20px 0 10px 0;
}
.progress_bg:after {
  display: block;
  content: "";
  clear: both;
}

.progress-item {
  width: 10%;
  height: 100%;
  float: left;
  position: relative;
  background-color: #ebeef5;
  border-radius: 5px;
  cursor: pointer;
}

.progress-item > p {
  position: absolute;
  top: -35px;
  text-align: center;
  width: 100%;
}
.ApplyList >>> .el-radio {
  margin-right: 10px;
}

>>> .el-table__body-wrapper table th {
  padding: 0;
}
>>> .el-table__body-wrapper table td {
  font-size: 12px;
}
.center {
  text-align: center;
}
.name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}

.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}

.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.shuju .son li {
  display: block;
}

.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}

.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}
.details_content:after {
  display: block;
  content: "";
  clear: both;
}
.details >>> .el-dialog__header {
  text-align: center !important;
}
.details >>> .el-dialog__body {
  overflow: inherit !important;
}
.details_content {
  width: 100%;
  display: flex;
  justify-content: space-around;

  /*border-right: 1px dashed #04BBFC;*/
}
.details_content > div {
  flex: 1;
}

.details_content > div:last-child {
  border-left: 1px dashed #04bbfc;
}

.right {
  display: inline-block;
  padding-left: 6%;
  margin-left: 8px;
}
.right li {
  box-sizing: border-box;
  padding: 16px 80px;
  margin: 28px 0;
  white-space: nowrap;
  min-width: 320px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);
}
.right_border-bottom {
  border-bottom: 1px solid #ccc;
}
.right_border-bottom input {
  border: none;
  height: 25px;
}
.Reject_Reason {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 9px;
}

.Reject_Reason > div:last-child {
  border-bottom: 1px solid #ccc;
  width: 70%;
  margin-left: 10px;
}
.Reject_Reason input {
  border: none;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.details_box {
  height: 600px;
  overflow: auto;
}
.details_box a {
  color: #04bbfc;
}
.details_box-btn {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.details_box-btn > button:first-child {
  margin-right: 200px;
}
.textPrompt {
  padding-left: 58px;
  box-sizing: border-box;
  color: red;
  font-size: 15px;
}

.Tips {
  color: red;
  margin-left: 8%;
}
.service:after {
  display: block;
  content: "";
  clear: both;
}
.service {
  height: 350px;
  overflow: auto;
}
.service > div {
  float: left;
  width: calc(100% / 3);
  height: 100%;
  text-align: center;
}
.service > div > p {
  line-height: 30px;
}
.radio {
  display: block;
  text-align: left;
  margin: 10px 0;
}
.radio >>> .el-radio__input {
  margin-left: calc(50% - 40px);
}
>>> .el-radio {
  margin-left: 0 !important;
}

.service > div {
  border-right: 1px solid #ccc;
}
.service > div:last-child {
  border: none;
}
.right >>> .el-input__inner,
.right >>> .el-select .el-input.is-focus .el-input__inner {
  border: solid 1px white;
}
.youpin .el-form-item {
  margin-bottom: 0;
}
</style>
<style>
.container .el-dialog__header {
  background: rgba(152, 209, 249, 1);
}
</style>
