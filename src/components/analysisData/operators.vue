<template>
  <div class="operators">
    <ctbHead></ctbHead>
    <sidebar></sidebar>
    <div class="container">
      <div class="guanzhu">
        <div class="box">
          <img src="../../../static/images/shujvfenxi/guanzhu.png">
          <div class="txt">邦保养关注：<p class="p1">{{guanzhu}}</p>
          </div>
        </div>
        <div class="box">
          <img src="../../../static/images/shujvfenxi/canyu.png">
          <div class="txt">邦保养参与：<p class="p2">{{canyu}}</p>
          </div>
        </div>
      </div>
      <div class="pie">
        <div class="tableHead">
          <div class="ss"></div>
          资金详情
          <div @click="toogle(1)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png);">
            <img src="">
            <div v-if="change1"
                 class="btnxq"
                 style="bottom:-70px;">
              <el-button type="text"
                         @click="skdetail()">售卡详情</el-button>
              <el-button type="text"
                         @click="txdetail()">提现详情</el-button>
            </div>
          </div>
        </div>
        <div id="pietu">

        </div>
      </div>
      <div class="table">
        <div class="select">
          <div class="ss"></div>
          <span style="float:left;">维修厂数据汇总：</span>
          <div v-for="item in sltArr"
               class="ft-l">
            <img @click="sltShow(item.idx,item.status)"
                 :src="item.status==0? item.src0:item.src1"
                 alt="">
            <span>{{item.name}}</span>
          </div>
          <div @click="toogle(2)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png)">
            <img src="">
            <div v-if="change2"
                 class="btnxq">
              <el-button type="text"
                         @click="shopdetail">详情</el-button>
            </div>
          </div>
        </div>
        <div id="myChart"></div>
      </div>
      <div class="select2">
        <div class="ss"></div>
        <span style="display:block; float:left;height:30px;">业务排名：</span><br /><br />
        <el-select v-model="underling"
                   @change="OperatorSelect"
                   placeholder="请选择">
          <el-option v-for="item in underlingArr"
                     :key="item.id"
                     :label="item.usname"
                     :value="item.id">
          </el-option>
        </el-select>
        <div class="top">
          <div class="box2">
            <div class="num">
              <img src="../../../static/images/shujvfenxi/numb1.png"
                   style="height:100%;width:100%">
            </div>
            <span v-if="top.length>0">{{top[0].usname}}</span>
            <span v-else>暂无</span>
          </div>
          <div class="box2">
            <div class="num">
              <img src="../../../static/images/shujvfenxi/numb2.png"
                   style="height:100%;width:100%">
            </div>
            <span v-if="top.length>1">{{top[1].usname}}</span>
            <span v-else>暂无</span>
          </div>
          <div class="box2">
            <div class="num">
              <img src="../../../static/images/shujvfenxi/numb3.png"
                   style="height:100%;width:100%">
            </div>
            <span v-if="top.length>2">{{top[2].usname}}</span>
            <span v-else>暂无</span>
          </div>
        </div>
        <div @click="toogle(3)"
             class="xiangqing"
             style="background-image:url(static/images/xiangqing.png)">
          <img src="">
          <div v-if="change3"
               class="btnxq">
            <el-button type="text"
                       @click="topdetail">详情</el-button>
          </div>
        </div>
      </div>
      <div id="myChart2"
           ref="myChart">

      </div>
      <div class="table2">
        <div class="tableHead2">
          <div class="ss2"></div>
          物料库>授信库存
          <div @click="toogle(4)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png)">
            <img src="">
            <div v-if="change4"
                 class="btnxq">
              <el-button type="text"
                         @click="Datail()">详情</el-button>
            </div>
          </div>
        </div>
        <table class="tb2">
          <tr>
            <td>物料名称</td>
            <td>期初授信/件</td>
            <td>增加授信/件</td>
          </tr>
          <tr v-for="item in ration">
            <td>{{item.name}}</td>
            <td>{{item.ration}}</td>
            <td>{{item.materiel_stock}}</td>
          </tr>
        </table>
      </div>
      <div class="table3">
        <div class="tableHead3">
          <div class="ss3"></div>
          物料库>运营库存
          <div @click="toogle(5)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png)">
            <img src="">
            <div v-if="change5"
                 class="btnxq">
              <el-button type="text"
                         @click="kucun()">详情</el-button>
            </div>
          </div>
        </div>
        <table class="tb3 ">
          <tr>
            <td>物料名称</td>
            <td>期初配给/件</td>
            <td>配送物料/件</td>
            <td>物料补充/件</td>
            <td>物料库存/件</td>
            <td>增加配给/件</td>
          </tr>
          <tr v-for="item in total_num">
            <td>{{item.name}}</td>
            <td>{{item.rationing}}</td>
            <td>{{item.embody}}</td>
            <td>{{item.buchong}}</td>
            <td>{{item.surplus}}</td>
            <td>{{item.record}}</td>
          </tr>
        </table>
      </div>
    </div>
    <el-dialog title="售卡详情"
               :visible.sync="centerDialogVisible1"
               :modal='false'
               width="45%"
               center>
      <table class="xqtable">
        <thead>
          <td>维修厂名称</td>
          <td>负责人</td>
          <td>电话</td>
          <td>售卡数</td>
          <td>交易总额</td>
        </thead>
        <tr v-for="item in sell_card">
          <td style="width:100px;overflow:hidden;">{{item.company}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.num}}</td>
          <td>{{item.price}}</td>
        </tr>
      </table>
      <el-pagination background
                     @prev-click="prev2"
                     @next-click="next2"
                     @current-change="current2"
                     layout="prev, pager, next"
                     :page-count="pageCount2">
      </el-pagination>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提现详情"
               :visible.sync="centerDialogVisible2"
               :modal='false'
               width="45%"
               center>
      <table class="xqtable">
        <thead>
          <td>提现时间</td>
          <td>提现金额</td>
        </thead>
        <tr v-for="item in withdrawDetail">
          <td>{{item.money}}</td>
          <td>{{item.create_time}}</td>
        </tr>
      </table>
      <el-pagination background
                     @prev-click="prev3"
                     @next-click="next3"
                     @current-change="current3"
                     layout="prev, pager, next"
                     :page-count="pageCount3">
      </el-pagination>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="维修厂数据详情"
               :visible.sync="centerDialogVisible3"
               :modal='false'
               width="45%"
               center>
      <table class="xqtable">
        <thead>
          <td>运营商</td>
          <td>售卡总数</td>
          <td>交易金额</td>
          <td>复购数</td>
          <td>消耗物料</td>
          <td>服务次数</td>
          <td>好评次数</td>
        </thead>
        <tr v-for="item in rankDetail2">
          <td style="width:100px;">{{item.usname}}</td>
          <td>{{item.number}}</td>
          <td>{{item.price}}</td>
          <td>{{item.repetition_num}}</td>
          <td>{{item.litres}}</td>
          <td>{{item.service_num}}</td>
          <td>{{item.comment_num}}</td>
        </tr>
      </table>
      <el-pagination background
                     @prev-click="prev"
                     @next-click="next"
                     @current-change="current"
                     layout="prev, pager, next"
                     :page-count="pageCount">
      </el-pagination>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible3 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible3 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="业务排名详情"
               :visible.sync="centerDialogVisible4"
               :modal='false'
               width="45%"
               center>
      <table class="xqtable">
        <thead>
          <td>排名</td>
          <td>维修厂名称</td>
          <td>售卡总数</td>
          <td>交易金额</td>
          <td>复购数</td>
          <td>消耗物料</td>
          <td>服务次数</td>
          <td>好评次数</td>

        </thead>
        <tr v-for="item in rankDetail">
          <td>{{item.mid}}</td>
          <td style="width:120px;overflow:hidden;">{{item.usname}}</td>
          <td>{{item.number}}</td>
          <td>{{item.price}}</td>
          <td>{{item.repetition_num}}</td>
          <td>{{item.litres}}</td>
          <td>{{item.service_num}}</td>
          <td>{{item.comment_num}}</td>
        </tr>
      </table>
      <el-pagination background
                     @prev-click="prev4"
                     @next-click="next4"
                     @current-change="current4"
                     layout="prev, pager, next"
                     :page-count="pageCount4">
      </el-pagination>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible4 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible4 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="授信库存详情"
               :visible.sync="centerDialogVisible5"
               :modal='false'
               width="45%"
               center>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="期初授信"
                     name="first">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td>期初授信时间</td>
            </thead>
            <tr>
              <td>{{allotment_num[0].ration}}</td>
              <td>{{allotment_num[1].ration}}</td>
              <td>{{allotment_num[2].ration}}</td>
              <td>{{allotment_num[3].ration}}</td>
              <td>{{allotment_num[4].ration}}</td>
              <td>{{allotment_num[5]}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="增加授信"
                     name="second">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td>区域名称</td>
              <td>缴纳押金</td>
              <td style="width:80px;">增加授信时间</td>
            </thead>
            <tr v-for="item in credit_num">
              <td>{{item.bang2}}</td>
              <td>{{item.bang3}}</td>
              <td>{{item.bang4}}</td>
              <td>{{item.bang5}}</td>
              <td>{{item.life}}</td>
              <td>{{item.area}}</td>
              <td>{{item.price}}</td>
              <td>{{item.create_time}}</td>
            </tr>
          </table>
          <el-pagination background
                         @prev-click="prev8"
                         @next-click="next8"
                         @current-change="current8"
                         layout="prev, pager, next"
                         :page-count="pageCount8">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible5 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible5 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="运营库详情"
               :visible.sync="centerDialogVisible6"
               :modal='false'
               width="50%"
               center>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="期初配给"
                     name="first">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td>期初授信时间</td>
            </thead>
            <tr>
              <td v-if="initial[0]">{{initial[0].ration}}</td>
              <td v-if="initial[1]">{{initial[1].ration}}</td>
              <td v-if="initial[2]">{{initial[2].ration}}</td>
              <td v-if="initial[3]">{{initial[3].ration}}</td>
              <td v-if="initial[4]">{{initial[4].ration}}</td>
              <td v-if="initial[5]">{{initial[5]}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="配送物料"
                     name="second">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td>配送时间</td>
            </thead>
            <tr v-for="item in distribution">
              <td>{{item.num1}}</td>
              <td>{{item.num2}}</td>
              <td>{{item.num3}}</td>
              <td>{{item.num4}}</td>
              <td>{{item.num5}}</td>
              <td>{{item.create_time}}</td>
            </tr>
          </table>
          <el-pagination background
                         @prev-click="prev5"
                         @next-click="next5"
                         @current-change="current5"
                         layout="prev, pager, next"
                         :page-count="pageCount5">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="物料补充"
                     name="third">
          <table class="xqtable">
            <thead>
              <td>订单号</td>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td>配送时间</td>
            </thead>
            <tr v-for="item in embody_num">
              <td>{{item.odd_number}}</td>
              <td>{{item.num1}}</td>
              <td>{{item.num2}}</td>
              <td>{{item.num3}}</td>
              <td>{{item.num4}}</td>
              <td>{{item.num5}}</td>
              <td style="width:80px">{{item.create_time}}</td>
            </tr>
          </table>
          <el-pagination background
                         @prev-click="prev6"
                         @next-click="next6"
                         @current-change="current6"
                         layout="prev, pager, next"
                         :page-count="pageCount6">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="物料库存"
                     name="fourth">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
            </thead>
            <tr>
              <td v-if='bang_num[0]'>{{bang_num[0].materiel_stock}}</td>
              <td v-if='bang_num[1]'>{{bang_num[1].materiel_stock}}</td>
              <td v-if='bang_num[2]'>{{bang_num[2].materiel_stock}}</td>
              <td v-if='bang_num[3]'>{{bang_num[3].materiel_stock}}</td>
              <td v-if='bang_num[4]'>{{bang_num[4].materiel_stock}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="增加配给"
                     name="fifth">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td>区域名称</td>
              <td>缴纳押金</td>
              <td>增加配给时间</td>
            </thead>
            <tr v-for="item in allocate">
              <td>{{item.bang2}}</td>
              <td>{{item.bang3}}</td>
              <td>{{item.bang4}}</td>
              <td>{{item.bang5}}</td>
              <td>{{item.life}}</td>
              <td>{{item.area}}</td>
              <td>{{item.price}}</td>
              <td style="width:80px;">{{item.create_time}}</td>
            </tr>
          </table>
          <el-pagination background
                         @prev-click="prev7"
                         @next-click="next7"
                         @current-change="current7"
                         layout="prev, pager, next"
                         :page-count="pageCount7">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible6 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible6 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script type="text/javascript">
export default {
  data () {
    return {
      pietu: "",
      myChart: "",
      underlingArr: [],
      underling: "",
      top: [],
      token: window.sessionStorage.getItem('bbytoken'),
      total_num: "",
      rankDetail: "",
      rankDetail2: "",
      ration: "",
      initial: "",
      distribution: "",
      embody_num: "",
      bang_num: [{ name: '', open_stock: '' }, { name: '', open_stock: '' }, { name: '', open_stock: '' }, { name: '', open_stock: '' }, { name: '', open_stock: '' }],
      allocate: "",
      allotment_num: [{ name: '', ration: '' }, { name: '', ration: '' }, { name: '', ration: '' }, { name: '', ration: '' }, { name: '', ration: '' }],
      credit_num: "",
      guanzhu: "",
      canyu: "",
      sell_card: "",
      withdrawDetail: "",
      page: "",
      pageCount: 1,
      page2: "",
      pageCount2: 1,
      page3: "",
      pageCount3: 1,
      page4: "",
      pageCount4: 1,
      page5: "",
      pageCount5: 1,
      page6: "",
      pageCount6: 1,
      page7: "",
      pageCount7: 1,
      page: "",
      pageCount8: 1,
      aaid: "",
      change1: false,
      change2: false,
      change3: false,
      change4: false,
      change5: false,
      change6: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      centerDialogVisible4: false,
      centerDialogVisible5: false,
      centerDialogVisible6: false,
      activeName: 'first',
      sltArr: [
        {
          src0: 'static/images/shujvfenxi/lbs1.png',
          src1: 'static/images/shujvfenxi/lb1.png',
          name: '交易金额',
          status: 0,
          idx: 0,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs2.png',
          src1: 'static/images/shujvfenxi/lb2.png',
          name: '售卡数量',
          status: 1,
          idx: 1,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs3.png',
          src1: 'static/images/shujvfenxi/lb3.png',
          name: '复购数',
          status: 1,
          idx: 2,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs4.png',
          src1: 'static/images/shujvfenxi/lb4.png',
          name: '消耗物料',
          status: 1,
          idx: 3,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs5.png',
          src1: 'static/images/shujvfenxi/lb5.png',
          name: '服务次数',
          status: 1,
          idx: 4,
          arr: []
        }, {
          src0: 'static/images/shujvfenxi/lbs9.png',
          src1: 'static/images/shujvfenxi/lb9.png',
          name: '好评次数',
          status: 1,
          idx: 5,
          arr: []
        }
      ],
      //区域汇总图表////////////////////////////////////////////////////////////////////////////////////
      option1: {

        tooltip: {},

        xAxis: {
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#292F42",
              width: 1,
              type: "solid"
            }

          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "white",
            }
          },
        },
        yAxis: [{
          splitNumber: 6,
          axisLine: {
            show: false,
            lineStyle: {
              color: "white",
              width: 1,
              type: "solid"
            },
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#292F42",
            }
          }
        }],
        series: [{
          name: '交易金额',
          type: 'bar',
          data: [],
          barWidth: 20,
          itemStyle: {
            color: '#82E0FF'
          }
        }
        ]
      },
      //运营商排名表---------------------------------------------
      option: {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          show: true,
          shadowOffsetY: 20,


        },
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          backgroundColor: "#FFFFFF",
          textStyle: {
            color: "black",
            lineHeight: 100,

          }
        },
        xAxis: [{
          type: 'category',
          data: ['1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月 ',
            '12月 ',
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#292F42",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "white",
            }
          },
        }],
        yAxis: [{
          splitNumber: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: "white",
              width: 1,
              type: "solid"
            },
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: "#292F42",
            }
          }
        }],
        series: [{
          type: 'bar',
          data: [200, 400, 300, 500, 500, 320, 700, 560, 720, 453, 367],
          barWidth: 25,

          //barWidth: 50, //柱子宽度
          //barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#82E0FF'
              }, {
                offset: 1,
                color: '#4BBEFF'
              }]),
              opacity: 1,
            }
          }
        }]
      }
    }
  },
  created () {
    //获取运营库详情弹窗期初配给详情数据------------------------------------------
    this.$axios.post('agent/info/initial', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.initial = res.data.data.list
      }
    }).catch(err => { alert(err) })
  },

  mounted () {

    this.drawLine();
    window.onresize = () => {
      this.pietu.resize();
      this.myChart.resize();
      this.myChart2.resize();
    }
    this.aaid = this.$route.query.id;
    this.getAreaData('card_num', 1);
    this.getAreaData('repetition', 2);
    this.getAreaData('dissipation_num', 3);
    this.getAreaData('technician_num', 4);
    this.getAreaData('good', 5);
    this.myChart = this.$echarts.init(document.getElementById('myChart'));
    this.myChart2 = this.$echarts.init(document.getElementById('myChart2'));
    var option1 = this.option1;
    var arr = this.option1.series;
    //打开运营商默认显示区域汇总的交易金额------------------------------------------
    this.$axios.post('agent/info/money_num', { token: this.token, aaid: this.aaid })
      .then(res => {

        if (res.data.code == 1) {
          this.sltArr[0].arr = res.data.data;

          for (var i = 0; i < arr.length; i++) {
            //默认显示的数据才渲染（status 为0显示，1为不显示）
            if (this.sltArr[i].status == 0) {
              arr[i].data = this.sltArr[i].arr;

            }
          }
          this.myChart.setOption(option1);
        } else {
          this.$message({ message: '[交易金额]数据为空', type: 'warning' });
          this.myChart.setOption(option1);
        }
      }).catch(err => {
        alert(err);
      })
    //业务排名-------------------------------------------------------------
    this.$axios.post("agent/Rank/shopName", { token: this.token, aaid: this.aaid }).then(res => {

      if (res.data.code == 1) {
        this.businessArr = res.data.data;
        this.underlingArr = res.data.data;
        this.underling = this.underlingArr[0].usname;

        this.OperatorData(this.underlingArr[0].id);
      }
    }).catch(err => {

    })
    //获取前三名公司------------------------------------------------------------
    this.$axios.post('agent/Rank/kind', { token: this.token, aaid: this.aaid }).then(res => {
      if (res.data.code == 1) {
        this.top = res.data.data;

      }
    }).catch(err => {
      alert(err)
    })

    //获取运营库存表格数据-----------------------------------------------------
    this.$axios.post('agent/info/total_num', { token: this.token, aaid: this.aaid }).then(res => {
      if (res.data.code == 1) {
        this.total_num = res.data.data
      }
    }).catch(err => { alert(err) })



    //获取授信库存表格数据-----------------------------------------------------
    this.$axios.post('agent/info/ration', { token: this.token, aaid: this.aaid }).then(res => {
      if (res.data.code == 1) {
        this.ration = res.data.data
      }
    }).catch(err => { alert(err) })
    //获取邦保养关注度
    this.$axios.post('agent/Info/maint', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.guanzhu = res.data.data
      }
      else {
        this.guanzhu = '暂无数据'
      }
    }).catch(err => {
      alert(err)
    });
    //获取邦保养参与度
    this.$axios.post('agent/Info/partDegree', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.canyu = res.data.data
      }
      else {
        this.canyu = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });




  },
  methods: {

    //分页器---------------------------------------------------------

    prev (e) {
      this.page = e;
      this.getAreaDataDetail();
    },
    next (e) {
      this.page = e;
      this.getAreaDataDetail();
    },
    current (e) {
      this.page = e;
      this.getAreaDataDetail();
    },
    prev2 (e) {
      this.page2 = e;
      this.getAreaDataDetail2();
    },
    next2 (e) {
      this.page2 = e;
      this.getAreaDataDetail2();
    },
    current2 (e) {
      this.page2 = e;
      this.getAreaDataDetail2();
    },
    prev3 (e) {
      this.page3 = e;
      this.getAreaDataDetail3();
    },
    next3 (e) {
      this.page3 = e;
      this.getAreaDataDetail3();
    },
    current3 (e) {
      this.page3 = e;
      this.getAreaDataDetail3();
    },
    prev4 (e) {
      this.page4 = e;
      this.getAreaDataDetail4();
    },
    next4 (e) {
      this.page4 = e;
      this.getAreaDataDetail4();
    },
    current4 (e) {
      this.page4 = e;
      this.getAreaDataDetail4();
    },
    prev5 (e) {
      this.page5 = e;
      this.getAreaDataDetail5();
    },
    next5 (e) {
      this.page5 = e;
      this.getAreaDataDetail5();
    },
    current5 (e) {
      this.page5 = e;
      this.getAreaDataDetail5();
    },
    prev6 (e) {
      this.page6 = e;
      this.getAreaDataDetail6();
    },
    next6 (e) {
      this.page6 = e;
      this.getAreaDataDetail6();
    },
    current6 (e) {
      this.page6 = e;
      this.getAreaDataDetail6();
    },
    prev7 (e) {
      this.page7 = e;
      this.getAreaDataDetail7();
    },
    next7 (e) {
      this.page7 = e;
      this.getAreaDataDetail7();
    },
    current7 (e) {
      this.page7 = e;
      this.getAreaDataDetail7();
    },
    prev8 (e) {
      this.page8 = e;
      this.getAreaDataDetail8();
    },
    next8 (e) {
      this.page8 = e;
      this.getAreaDataDetail8();
    },
    current8 (e) {
      this.page8 = e;
      this.getAreaDataDetail8();
    },
    getAreaDataDetail () {
      this.$axios.post('agent/Rank/rankDetail', { token: this.token, page: this.page, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.rankDetail2 = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },

    getAreaDataDetail2 () {
      this.$axios.post('agent/info/sell_card', { token: this.token, page: this.page2, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.sell_card = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail3 () {
      this.$axios.post('agent/rank/withdrawDetail', { token: this.token, page: this.page3, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.withdrawDetail = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail4 () {
      this.$axios.post('agent/Rank/rankDetail', { token: this.token, page: this.page4, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.rankDetail = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail5 () {
      this.$axios.post('agent/info/distribution', { token: this.token, page: this.page5, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.distribution = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail6 () {
      this.$axios.post('agent/info/embody_num', { token: this.token, page: this.page6, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.embody_num = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail7 () {
      this.$axios.post('agent/info/allocate', { token: this.token, page: this.page7, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.allocate = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail8 () {
      this.$axios.post('agent/info/credit_num', { token: this.token, page: this.page8, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.credit_num = res.data.data.list;
        }
      }).catch(err => { alert(err) })

    },

    kucun () {
      //获取运营库详情弹窗配送物料详情数据------------------------------------------
      this.$axios.post('agent/info/distribution', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.distribution = res.data.data.list;
          this.pageCount5 = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })
      //获取运营库详情弹窗期物料补充详情数据------------------------------------------
      this.$axios.post('agent/info/embody_num', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.embody_num = res.data.data.list
          this.pageCount6 = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })
      //获取运营库详情弹窗物料库存详情数据------------------------------------------
      this.$axios.post('agent/info/bang_num', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.bang_num = res.data.data.list;
        }
      }).catch(err => { alert(err) })
      //获取运营库详情弹窗增加配给详情数据------------------------------------------
      this.$axios.post('agent/info/allocate', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.allocate = res.data.data.list;
          this.pageCount7 = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })
      this.centerDialogVisible6 = true
    },

    //获取饼图售卡详情---------------------------------------------
    skdetail () {
      this.$axios.post('agent/info/sell_card', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.sell_card = res.data.data.list;
          this.pageCount2 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.centerDialogVisible1 = true
    },
    //获取饼图提现详情-------------------------------------------------
    txdetail () {
      this.$axios.post('agent/rank/withdrawDetail', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.withdrawDetail = res.data.data.list;
          this.pageCount3 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.centerDialogVisible2 = true
    },

    //期初授信和增加授信-------------------------------------------------------------
    Datail () {

      //增加授信
      this.centerDialogVisible5 = true;
      this.$axios.post('agent/Info/credit_num', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.credit_num = res.data.data.list;
          this.pageCount8 = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })


      //期初授信
      this.$axios.post('agent/Info/allotment_num', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.allotment_num = res.data.data.list;
        }
      }).catch(err => { alert(err) })
    },




    //获取业务排名数据详情----------------------------------------------------
    topdetail () {
      this.centerDialogVisible4 = true;
      this.$axios.post('agent/Rank/rankDetail', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.rankDetail = res.data.data.list;
          this.pageCount4 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
    },

    //获取维修厂数据汇总详情------------------------------------------------------
    shopdetail () {
      this.centerDialogVisible3 = true;
      this.$axios.post('agent/Rank/rankDetail', { token: this.token, page: this.page, aaid: this.aaid }).then(res => {
        if (res.data.code == 1) {
          this.rankDetail2 = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
    },

    //获维修厂数据汇总的数据封装
    getAreaData (path, num) {

      this.$axios.post('agent/info/' + path, { token: this.token, aaid: this.aaid })
        .then(res => {

          if (res.data.code == 1) {
            this.sltArr[num].arr = res.data.data;
          }
        }).catch(err => {
          alert('这里报错' + err);
        })
    },


    sltShow (index, id) {
      //单选逻辑用
      if (index == this.curIndex) return;
      this.curIndex = index;
      var areaAll = this.$echarts.init(document.getElementById('myChart'));
      var color = ["#04BBFC", "#00DC1E", "#F0A9FF", "#FF9863", "#FFCD4B", "#0FD2B4"];
      //手动勾选和反选的逻辑
      //        if (id == 0) {
      //          this.sltArr[index].status = 1;
      //          this.option1.series[index].data = [];
      //          areaAll.setOption(this.option1);
      //        } else {
      //          this.sltArr[index].status = 0;
      //          this.option1.series[index].data = this.sltArr[index].arr;
      //          areaAll.setOption(this.option1);
      //        }
      //单选的逻辑
      if (id == 1) {
        for (var i = 0; i < this.sltArr.length; i++) {
          this.option1.series.data = [];   //所有类型的数据全部清空
          this.sltArr[i].status = 1;          //示例图的对勾全部去掉
        }
        this.sltArr[index].status = 0; //当前索引的示例图显示对勾
        this.option1.series[0].itemStyle.color = color[index];    //当前图表颜色
        this.option1.series[0].data = this.sltArr[index].arr; //当前索引类型的数据显示
        areaAll.setOption(this.option1);   //编译图表
        if (this.sltArr[index].arr.length == 0) {
          this.$message.closeAll();
          this.$message({ message: '[' + this.sltArr[index].name + ']数据为空', type: 'warning' });
        }
      }
    },
    handleClick (tab, event) {

    },
    toogle (e) {
      switch (e) {
        case 1:
          this.change1 = !this.change1;
          break;
        case 2:
          this.change2 = !this.change2;
          break;
        case 3:
          this.change3 = !this.change3;
          break;
        case 4:
          this.change4 = !this.change4;
          break;
        case 5:
          this.change5 = !this.change5;
          break;

      }
    },
    //下拉时调用--------------------------------------------------------------
    OperatorSelect (aid) {


      this.OperatorData(aid)
    },
    //下拉选择的公司数据-------------------------------------------------------
    OperatorData (aid) {
      this.$axios.post("agent/Rank/rank", { token: this.token, id: aid }).then(res => {

        if (res.data.code == 1) {
          var data = res.data.data;
          this.option.series[0].data = data;

          this.myChart2.setOption(this.option);


        } else {
          this.option.series[0].data = [];
          this.myChart2.setOption(this.option);
          this.$message({ message: res.data.msg, type: 'warning' });

        }
      }).catch(err => {
        throw (err)
      })
    },
    //-------------------------------------------------------------------------------------
    drawLine () {
      this.pietu = this.$echarts.init(document.getElementById('pietu'));
      this.myChart2 = this.$echarts.init(document.getElementById('myChart2'));
      this.aaid = this.$route.query.id;

      this.$axios.post('agent/Rank/money', { token: this.token, aaid: this.aaid }).then(res => {
        if (res.data.code == 1 && res.data.data != "") {
          var pietu = {
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            calculable: true,
            color: ['#F6430B', '#37B4FA', '#FAC74C', '#35DA31'],
            series: [
              {
                name: '资金',
                type: 'pie',
                radius: [80, 110],
                center: ['50%', 170],
                x: '50%',
                max: 40,
                sort: 'ascending',
                clockWise: false,
                data: [
                  { value: res.data.data.list[2].value, name: '支出' },
                  { value: res.data.data.list[0].value, name: '提现' },
                  { value: res.data.data.list[1].value, name: '余额' },
                  //                {value:30, name:'收入'}
                ],
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      formatter: '{b}:{c}',
                      textStyle: {
                        color: 'white',
                        fontSize: 14,
                        fontWeight: '700'
                      }
                    },
                    //标线长度，宽度
                    labelLine: {
                      show: true,
                      length: 40,
                      lineStyle: {
                        width: 2
                      }
                    }
                  }
                },
              },
              {
                name: '收入',
                type: 'pie',
                radius: 70,
                center: ['50%', 170],
                x: '50%',
                max: 40,
                sort: 'ascending',
                clockWise: false,
                data: [
                  { value: res.data.data.data.income, name: '收入' }
                ],
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'center',
                      formatter: '{b}:\n\n{c}',
                      textStyle: {
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '700'
                      }
                    }
                  }
                },
              }
            ],
          }

          this.pietu.setOption(pietu);//绘制饼图
        }
      }).catch(err => { alert('这里的错' + err) })



    }
  }
}
</script>
<style scoped>
.el-pagination {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
thead td {
  background: #cdf1fe;
}
.lb {
  height: 15px;
  width: 15px;
  display: inline-block;
}
.lb1 {
  background: url(../../../static/images/shujvfenxi/lb1.png);
}
.lb2 {
  background: url(../../../static/images/shujvfenxi/lb2.png);
}
.lb3 {
  background: url(../../../static/images/shujvfenxi/lb3.png);
}
.lb4 {
  background: url(../../../static/images/shujvfenxi/lb4.png);
}
.lb5 {
  background: url(../../../static/images/shujvfenxi/lb5.png);
}
.ft-l {
  float: left;
  width: 85px;
}
.xiangqing {
  width: 20px;
  height: 20px;
  position: relative;
  float: right;
  cursor: pointer;
}
.btnxq {
  position: absolute;
  background: #ccc;
  border-radius: 5px;
  height: none;
  width: 60px;
  bottom: -35px;
  left: -20px;
  text-align: center;
  z-index: 20;
}
.xqtable thead {
  background-color: #cdf1fe;
}
.xqtable td {
  width: 50px;
  font-size: 12px;
}
.el-button--text {
  color: black;
  line-height: 6px;
}
.sidebar {
  height: 1600px !important;
  background: #3d4659;
}
.sidebar >>> .two {
  background-image: url("../../../static/images/shujvfenxi/icblue2.png") !important;
}
.operators {
  height: 1600px;
  width: 100%;
  background-color: #303847;

  overflow: hidden;
}
.el-button + .el-button {
  margin-left: 0px;
}

.guanzhu {
  height: 100px;
  padding: 20px;
  width: 93%;
  float: right;
  border-bottom: 3px solid black;
}
.box {
  height: 100%;
  width: 230px;
  float: left;
  margin-left: 25%;
  font-size: 16px;
  line-height: 61px;
  /*color: white;*/
}
.box img {
  height: 100%;
  width: 65px;
}
.txt {
  line-height: 61px;
  float: right;
  color: white;
}
.txt .p1 {
  color: #04bbfc;
  font-weight: bold;
  float: right;
  font-size: 20px;
}
.txt .p2 {
  color: #ebd753;
  font-weight: bold;
  float: right;
  font-size: 20px;
}
.table {
  width: 45%;
  height: 450px;
  float: right;
  border-right: 3px solid black;
}
.pie {
  width: 45%;
  height: 300px;

  float: right;
}
.tableHead {
  width: 100%;
  height: 80px;
  padding: 20px 30px;
  color: white;
  margin-top: 20px;
}
.ss {
  width: 10px;
  height: 20px;
  background: #04bbfc;
  float: left;
  margin-right: 20px;
}
.tb {
  font-size: 18px;
}
.table td {
  height: 40px;
  line-height: 40px;
  background: none;
  border-bottom: 2px solid #292f42;
}
.table2 {
  width: 40%;
  height: 450px;
  float: right;
  border-left: 3px solid black;
}
.pie2 {
  width: 45%;
  height: 300px;
  float: right;
}
.tableHead2 {
  width: 100%;
  height: 80px;
  padding: 20px 30px;
  color: white;
}
.ss2 {
  width: 10px;
  height: 20px;
  background: #04bbfc;
  float: left;
  margin-right: 20px;
}
.tb2 {
  font-size: 18px;
}
.table2 td {
  height: 40px;
  line-height: 40px;
  background: none;
  border-bottom: 2px solid #292f42;
  color: #fff;
  opacity: 0.8;
}
#pietu {
  height: 350px;
  width: 100%;
  /*background: red;*/
}
.select {
  margin-top: 40px;
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  color: white;
}
.radio {
  border-radius: 0px;
  margin-left: 20px;
  background: red;
}
#myChart {
  width: 100%;
  height: 350px;
  float: right;
}
#myChart2 {
  width: 93%;
  height: 380px;
  float: right;
  border-bottom: 3px solid black;
}
.select2 {
  border-top: 3px solid black;
  width: 100%;
  height: 120px;
  padding: 20px 200px;
  float: right;
  color: white;
  position: relative;
}
.top {
  height: 100%;
  width: 300px;
  right: 15%;
  top: 0px;
  position: absolute;
}
.box2 {
  width: 100px;
  height: 100%;
  float: left;
  text-align: center;
}
.num {
  width: 100%;
  height: 80px;
  padding: 10px 20px;
}
.table3 {
  width: 50%;
  height: 450px;
  float: right;
}
.pie3 {
  width: 45%;
  height: 300px;
  float: right;
}
.tableHead3 {
  width: 100%;
  height: 80px;
  padding: 20px 30px;
  color: white;
}
.ss3 {
  width: 10px;
  height: 20px;
  background: #04bbfc;
  float: left;
  margin-right: 20px;
}
.tb3 {
  font-size: 18px;
}
.table3 td {
  height: 40px;
  line-height: 40px;
  background: none;
  border-bottom: 2px solid #292f42;
  color: #fff;
  opacity: 0.8;
}
</style>
<style>
.operators .el-dialog__header {
  background: none !important;
}
.operators .el-select > .el-input {
  width: 100% !important;
}
</style>
