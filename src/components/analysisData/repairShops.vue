<template>
  <div class="repairShops">
    <ctbHead></ctbHead>
    <sidebar></sidebar>
    <div class="container">
      <div class="guanzhu">
        <div class="box">
          <img src="../../../static/images/shujvfenxi/guanzhu.png">
          <div class="txt">邦保养关注：<p class="p1">{{deliver_num}}</p>
          </div>
        </div>
        <div class="box">
          <img src="../../../static/images/shujvfenxi/canyu.png">
          <div class="txt">邦保养参与：<p class="p2">{{buy_num}}</p>
          </div>
        </div>
      </div>
      <div class="pie">
        <div class="tableHead"
             style="height:40px;">
          <div class="ss"></div>
          资金详情
        </div>
        <br>
        <div id="pietu">

        </div>
      </div>
      <div class="tablebox">
        <table>
          <tr>
            <td>购卡资金</td>
            <td>服务费</td>
            <td>滤芯补助</td>
            <td>好评奖励</td>
            <td>售卡利润</td>
          </tr>
          <tr class="boxtr">
            <td>+{{data.buycard}}</td>
            <td>+{{data.service}}</td>
            <td>+{{data.subsidy}}</td>
            <td>+{{data.premium}}</td>
            <td>+{{data.margin}}</td>
          </tr>
        </table>
      </div>
      <div class="table"
           style="border-left:2px solid black">
        <div class="tableHead">
          <div class="ss"></div>
          授信物料
          <div @click="toogle(1)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png)">
            <img src="">
            <div v-if="change1"
                 class="btnxq">
              <el-button type="text"
                         @click="detail1()">详情</el-button>
            </div>
          </div>
        </div>
        <table class="tb">
          <tr>
            <td>物料名称</td>
            <td>期初配给</td>
            <td>配送物料</td>
            <td>物料补充</td>
            <td>物料库存</td>
            <td>增加配给</td>
          </tr>
          <tr v-for="item in Credit">
            <td>{{item.product}}</td>
            <td>{{item.rationing}}</td>
            <td>{{item.dissipation}}</td>
            <td>{{item.buchong}}</td>
            <td>{{item.surplus}}</td>
            <td>{{item.record}}</td>
          </tr>

        </table>
      </div>
      <div class="pie2">
        <div class="tableHead">
          <div class="ss"></div>
          技师
          <br><br>
          <div v-for="item in sltArr"
               class="ft-l">
            <img @click="sltShow(item.idx,item.status)"
                 :src="item.status==0? item.src0:item.src1"
                 alt="">
            <span>{{item.name}}</span>
          </div>

        </div>
        <div id="linchart1">

        </div>
      </div>
      <div class="pie2"
           style="border-top:2px solid black;">
        <div class="tableHead">
          <div class="ss"></div>
          会员详情>复购 <br>
          <br>
          <div @click="toogle(2)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png)">
            <img src="">
            <div v-if="change2"
                 class="btnxq">
              <el-button type="text"
                         @click="detail3()">详情</el-button>
            </div>
          </div>

        </div>
        <div id="linchart2">

        </div>
      </div>
      <div class="pie2"
           style="border-top:2px solid black;border-right:2px solid black;">
        <div class="tableHead">
          <div class="ss"></div>
          会员详情>参与车辆 <br>
          <br>
          <div v-for="item in sltArr2"
               class="ft-l">
            <img @click="sltShow2(item.idx,item.status)"
                 :src="item.status==0? item.src0:item.src1"
                 alt="">
            <span>{{item.name}}</span>
          </div>
          <div @click="toogle(3)"
               class="xiangqing"
               style="background-image:url(static/images/xiangqing.png)">
            <img src="">
            <div v-if="change3"
                 class="btnxq">
              <el-button type="text"
                         @click="detail2()">详情</el-button>
            </div>
          </div>

        </div>
        <div id="linchart3">

        </div>
      </div>
      <el-dialog title="授信物料"
                 :visible.sync="centerDialogVisible1"
                 :modal='false'
                 width="800px"
                 center>
        <el-tabs v-model="active"
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
                <td>{{sou[0].ration}}</td>
                <td>{{sou[1].ration}}</td>
                <td>{{sou[2].ration}}</td>
                <td>{{sou[3].ration}}</td>
                <td>{{sou[4].ration}}</td>
                <td>{{sou[4].audit_time}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="物料消耗"
                       name="second">
            <table class="xqtable">
              <thead>
                <td>SM半合成</td>
                <td>SN合成</td>
                <td>SN全合成</td>
                <td>SN脂类全合成</td>
                <td>豪华礼包</td>
                <td>初期授信时间</td>
              </thead>
              <tr v-for="item in consume">
                <td>{{item.num1}}</td>
                <td>{{item.num2}}</td>
                <td>{{item.num3}}</td>
                <td>{{item.num4}}</td>
                <td>{{item.num5}}</td>
                <td>{{item.month}}</td>
              </tr>
            </table>
            <el-pagination background
                           @prev-click="prev"
                           @next-click="next"
                           @current-change="current"
                           layout="prev, pager, next"
                           :page-count="pageCount">
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
                <td>时间</td>
              </thead>
              <tr v-for="item in lement">
                <td>{{item.apply_sn}}</td>
                <td>{{item.num1}}</td>
                <td>{{item.num2}}</td>
                <td>{{item.num3}}</td>
                <td>{{item.num4}}</td>
                <td>{{item.num5}}</td>
                <td style="width:100px;">{{item.create_time}}</td>
              </tr>
            </table>
            <el-pagination background
                           @prev-click="prev2"
                           @next-click="next2"
                           @current-change="current2"
                           layout="prev, pager, next"
                           :page-count="pageCount2">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="物料剩余"
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
                <td>{{surplus[0].stock}}</td>
                <td>{{surplus[1].stock}}</td>
                <td>{{surplus[2].stock}}</td>
                <td>{{surplus[3].stock}}</td>
                <td>{{surplus[4].stock}}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="增加授信"
                       name="fifth">
            <table class="xqtable">
              <thead>
                <td>SM半合成</td>
                <td>SN合成</td>
                <td>SN全合成</td>
                <td>SN脂类全合成</td>
                <td>豪华礼包</td>
                <td>增加授信时间</td>
              </thead>
              <tr v-for="item in CreditAdd">
                <td>{{item.bang2}}</td>
                <td>{{item.bang3}}</td>
                <td>{{item.bang4}}</td>
                <td>{{item.bang5}}</td>
                <td>{{item.life}}</td>
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
          </el-tab-pane>
        </el-tabs>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="centerDialogVisible1 = false">取 消</el-button>
          <el-button type="primary"
                     @click="centerDialogVisible1 = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="复购详情"
                 :visible.sync="centerDialogVisible2"
                 :modal='false'
                 width="800px"
                 center>
        <table class="xqtable">
          <thead>
            <td>车主名称</td>
            <td>车主电话</td>
            <td>首次购卡时间</td>
            <td>近期购卡时间</td>
            <td>邦保养单次</td>
            <td>邦保养套餐</td>
            <td>参与次数</td>
            <td>剩余服务次数</td>
          </thead>
          <tr v-for="item in ReSumDetails">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td style="width:100px;">{{item.first_time}}</td>
            <td style="width:100px;">{{item.recent_time}}</td>
            <td>{{item.one_card}}</td>
            <td>{{item.four_card}}</td>
            <td>{{item.remain_num}}</td>
            <td>{{item.surplus_num}}</td>
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
          <el-button @click="centerDialogVisible2 = false">取 消</el-button>
          <el-button type="primary"
                     @click="centerDialogVisible2 = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="车主详情"
                 :visible.sync="centerDialogVisible3"
                 :modal='false'
                 width="800px"
                 center>
        <table class="xqtable">
          <thead>
            <td>车主名称</td>
            <td>车主电话</td>
            <td>品牌</td>
            <td>车系</td>
            <td>用油型号</td>
            <td>用油升数</td>
            <td>保养周期</td>
          </thead>
          <tr v-for="item in UserInfo">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.brand}}</td>
            <td style="width:80px;">{{item.type}}</td>
            <td style="width:100px;">{{item.oil_name}}</td>
            <td>{{item.litre}}</td>
            <td>{{item.month}}</td>
          </tr>
        </table>
        <el-pagination background
                       @prev-click="prev5"
                       @next-click="next5"
                       @current-change="current5"
                       layout="prev, pager, next"
                       :page-count="pageCount5">
        </el-pagination>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="centerDialogVisible3 = false">取 消</el-button>
          <el-button type="primary"
                     @click="centerDialogVisible3 = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      pietu: "",
      linchart1: "",
      linchart2: "",
      linchart3: "",
      guanzhu: "",
      canyu: "",
      buy_num: "",
      deliver_num: "",
      data: "",
      UserInfo: "",
      active: "first",
      Credit: "",
      lement: "",
      CreditAdd: "",
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
      surplus: [{ name: '', stock: '' }, { name: '', stock: '' }, { name: '', stock: '' }, { name: '', stock: '' }, { name: '', stock: '' }, { name: '', stock: '' }],
      sou: [{ name: '', ration: '' }, { name: '', ration: '' }, { name: '', ration: '' }, { name: '', ration: '' }, { name: '', ration: '' }],
      consume: "",
      ReSumDetails: "",
      change1: false,
      change2: false,
      change3: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      ReSum: "",
      sid: 0,
      //示例图组1
      sltArr: [
        {
          src0: 'static/images/shujvfenxi/lbs1.png',
          src1: 'static/images/shujvfenxi/lb1.png',
          name: '服务次数',
          status: 0,
          idx: 0,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs2.png',
          src1: 'static/images/shujvfenxi/lb2.png',
          name: '礼品兑换',
          status: 1,
          idx: 1,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs3.png',
          src1: 'static/images/shujvfenxi/lb3.png',
          name: '服务奖励',
          status: 1,
          idx: 2,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs4.png',
          src1: 'static/images/shujvfenxi/lb4.png',
          name: '文章推荐奖励',
          status: 1,
          idx: 3,
          arr: []
        }
      ],
      //会员详情示例图组
      sltArr2: [

        {
          src0: 'static/images/shujvfenxi/lbs2.png',
          src1: 'static/images/shujvfenxi/lb2.png',
          name: '购卡',
          status: 0,
          idx: 0,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs3.png',
          src1: 'static/images/shujvfenxi/lb3.png',
          name: '服务次数',
          status: 1,
          idx: 1,
          arr: []
        },
        {
          src0: 'static/images/shujvfenxi/lbs4.png',
          src1: 'static/images/shujvfenxi/lb4.png',
          name: '剩余次数',
          status: 1,
          idx: 2,
          arr: []
        }
      ],
      //技师图表
      option2: {        calculable: true,
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          backgroundColor: "#FFFFFF",
          textStyle: {
            color: "black",
            lineHeight: 100,

          }
        },

        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: 'black',
              width: 1,//这里是为了突出显示加上的
            }
          }
        },
        axisLabel: {
          color: "white" //刻度线标签颜色
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ['black']
            },
          },
          axisLine: {
            lineStyle: {
              color: 'black',
              width: 1,//这里是为了突出显示加上的
            }
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320, 800, 850, 930, 1100, 500],
          type: 'line',
          areaStyle: {
            opacity: 0.2,
          },
          symbolSize: 10,
          color: ['#04BBFC'],
          itemStyle: {
            normal: {
              lineStyle: {
                width: 4,//折线宽度
                color: "#04BBFC"//折线颜色
              },

            },

          },


        }
        ],
        lineStyle: {
          color: "#00F040",
          width: 5,
        },      },
      //会员详情图表
      option3: {        calculable: true,
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          backgroundColor: "#FFFFFF",
          textStyle: {
            color: "black",
            lineHeight: 100,

          }
        },

        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: 'black',
              width: 1,//这里是为了突出显示加上的
            }
          }
        },
        axisLabel: {
          color: "white" //刻度线标签颜色
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: ['black']
            },
          },
          axisLine: {
            lineStyle: {
              color: 'black',
              width: 1,//这里是为了突出显示加上的
            }
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320, 800, 850, 930, 1100, 500],
          type: 'line',
          areaStyle: {
            opacity: 0.2,
          },
          symbolSize: 10,
          color: ['#00DC1E'],
          itemStyle: {
            normal: {
              lineStyle: {
                width: 4,//折线宽度
                color: "#00DC1E"//折线颜色
              },

            },

          },


        }
        ],
        lineStyle: {
          color: "#00F040",
          width: 5,
        },      }
    }
  },
  mounted () {
    this.sid = this.$route.query.id;
    this.drawLine();
    window.onresize = () => {
      this.pietu.resize();
      this.linchart1.resize();
      this.linchart2.resize();
      this.linchart3.resize();
      // this.myChart2.resize();
    },
      //获取邦保养关注度和参与度-----------------------------------------------------------
      this.$axios.post('Operate/single/Followview', { token: this.token, sid: this.sid }).then(res => {
        this.deliver_num = res.data.data.deliver_num;
        this.buy_num = res.data.data.buy_num
      }).catch(err => { alert(err) });






    this.linchart1 = this.$echarts.init(document.getElementById('linchart1'));
    var option2 = this.option2;
    var arr = this.option2.series;
    this.linchart3 = this.$echarts.init(document.getElementById('linchart3'));
    var option3 = this.option3;
    var arr2 = this.option3.series;
    //打开维修厂页面，默认显示服务次数图表-------------------------------------------------
    this.$axios.post('Operate/single/service', { token: this.token, sid: this.sid })
      .then(res => {

        if (res.data.code == 1) {
          this.sltArr[0].arr = res.data.data;

          for (var i = 0; i < arr.length; i++) {
            //默认显示的数据才渲染（status 为0显示，1为不显示）
            if (this.sltArr[i].status == 0) {
              arr[i].data = this.sltArr[i].arr;
            }
          }
          this.linchart1.setOption(option2);
        } else {
          this.$message({ message: '[交易金额]数据为空', type: 'warning' });
          this.linchart1.setOption(option2);
        }
      }).catch(err => {
        alert(err);
      })
    //打开维修厂页面，默认显示会员详情购卡的图表-------------------------------------------------
    this.$axios.post('Operate/single/ShopFour', { token: this.token, sid: this.sid })
      .then(res => {

        if (res.data.code == 1) {
          this.sltArr2[0].arr = res.data.data;


          for (var i = 0; i < arr.length; i++) {
            //默认显示的数据才渲染（status 为0显示，1为不显示）
            if (this.sltArr[i].status == 0) {
              arr2[i].data = this.sltArr2[i].arr;
            }
          }
          this.linchart3.setOption(option3);
        } else {
          this.$message({ message: '[交易金额]数据为空', type: 'warning' });
          this.linchart3.setOption(option3);
        }
      }).catch(err => {
        alert(err);
      })
    //获取授信物料表格数据------------------------------------------------------
    this.$axios.post('Operate/single/Credit', { token: this.token, sid: this.sid }).then(res => {
      this.Credit = res.data.data;
    }).catch(err => { alert(err) })


    //除默认显示外技师所有单选框的数据-------------------------------------
    this.jishiData('Gift', 1);//礼品兑换
    this.jishiData('TechPrice', 2);//服务奖励
    this.jishiData('push', 3);//推荐奖励

    //除默认显示外会员详情所有单选框的数据-------------------------------------
    this.vipdetail('PartSum', 1);//参与次数
    this.vipdetail('OverSum', 2);//剩余次数
  },
  methods: {

    //分页器---------------------------------------------------------------
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
    getAreaDataDetail () {
      this.$axios.post('Operate/single/consume', { token: this.token, sid: this.sid, page: this.page }).then(res => {
        this.consume = res.data.data.list;
      }).catch(err => { alert(err) })
    },

    getAreaDataDetail2 () {
      this.$axios.post('Operate/single/lement', { token: this.token, sid: this.sid, page: this.page2 }).then(res => {
        this.lement = res.data.data.list;
      }).catch(err => { alert(err) })
    },


    getAreaDataDetail3 () {
      this.$axios.post('Operate/single/Cadd', { token: this.token, sid: this.sid, page: this.page3 }).then(res => {
        this.CreditAdd = res.data.data.list;
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail4 () {
      this.$axios.post('Operate/single/DetRes', { token: this.token, sid: this.sid, page: this.page4 }).then(res => {
        this.ReSumDetails = res.data.data.list;
      }).catch(err => { alert(err) })

    },
    getAreaDataDetail5 () {
      this.$axios.post('Operate/single/UserInfo', { token: this.token, sid: this.sid, page: this.page5 }).then(res => {
        this.UserInfo = res.data.data.list;
      })
    },




















    detail1 () {
      this.centerDialogVisible1 = true;
      //获取授信物料弹窗详情数据------------------------------------------
      this.$axios.post('Operate/single/sou', { token: this.token, sid: this.sid }).then(res => {
        if (res.data.code == 1) {
          this.sou = res.data.data.list;
        }
      }).catch(err => { alert(err) })

      this.$axios.post('Operate/single/consume', { token: this.token, sid: this.sid }).then(res => {
        if (res.data.code == 1) {
          this.consume = res.data.data.list;
          this.pageCount = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })

      this.$axios.post('Operate/single/lement', { token: this.token, sid: this.sid }).then(res => {
        if (res.data.code == 1) {
          this.lement = res.data.data.list;
          this.pageCount2 = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })

      this.$axios.post('Operate/single/surplus', { token: this.token, sid: this.sid }).then(res => {
        if (res.data.code == 1) {
          this.surplus = res.data.data.list;
        }
      }).catch(err => { alert(err) })
      this.$axios.post('Operate/single/Cadd', { token: this.token, sid: this.sid }).then(res => {
        if (res.data.code == 1) {
          this.CreditAdd = res.data.data.list;
          this.pageCount3 = res.data.data.totalpages;
        }
      }).catch(err => { alert(err) })
    },


    //参与车辆，车主详情数据-------------------------------------------------
    detail2 () {
      this.centerDialogVisible3 = true;
      this.$axios.post('Operate/single/UserInfo', { token: this.token, sid: this.sid }).then(res => {
        this.UserInfo = res.data.data.list;
        this.pageCount5 = res.data.data.rows;
      })
    },

    //会员详情，复购数据-----------------------------------------------
    detail3 () {
      this.centerDialogVisible2 = true;
      this.$axios.post('Operate/single/DetRes', { token: this.token, sid: this.sid }).then(res => {
        this.ReSumDetails = res.data.data.list;
        this.pageCount4 = res.data.data.rows;
      }).catch(err => { alert(err) })
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

      }
    },

    //获取技师的数据封装------------------------------------------------
    jishiData (path, num) {

      this.$axios.post('Operate/single/' + path, { token: this.token, sid: this.sid })
        .then(res => {

          if (res.data.code == 1) {
            this.sltArr[num].arr = res.data.data;
          }
        }).catch(err => {
          alert('这里报错' + err);
        })
    },





    //获取会员详情的数据封装------------------------------------------------
    vipdetail (path, num) {

      this.$axios.post('Operate/single/' + path, { token: this.token, sid: this.sid })
        .then(res => {

          if (res.data.code == 1) {
            this.sltArr2[num].arr = res.data.data;
          }
        }).catch(err => {
          alert('这里报错' + err);
        })
    },





    //技师的单选逻辑
    sltShow (index, id) {
      //单选逻辑用
      if (index == this.curIndex) return;
      this.curIndex = index;
      var areaAll = this.$echarts.init(document.getElementById('linchart1'));
      var color = ["#04BBFC", "#00DC1E", "#E678FF", "#FF9863"];
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
          this.option2.series.data = [];   //所有类型的数据全部清空
          this.sltArr[i].status = 1;          //示例图的对勾全部去掉
        }
        this.sltArr[index].status = 0; //当前索引的示例图显示对勾
        this.option2.series[0].itemStyle.normal.lineStyle.color = color[index];    //当前图表颜色
        this.option2.series[0].color = color[index];
        this.option2.series[0].data = this.sltArr[index].arr; //当前索引类型的数据显示
        areaAll.setOption(this.option2);   //编译图表
        if (this.sltArr[index].arr.length == 0) {
          this.$message.closeAll();
          this.$message({ message: '[' + this.sltArr[index].name + ']数据为空', type: 'warning' });
        }
      }
    },




    //会员详情的单选逻辑
    sltShow2 (index, id) {

      //单选逻辑用
      if (index == this.curIndex) return;
      this.curIndex = index;
      var areaAll2 = this.$echarts.init(document.getElementById('linchart3'));
      var color = ["#00DC1E", "#E678FF", "#FF9863"];
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
        for (var i = 0; i < this.sltArr2.length; i++) {
          this.option3.series.data = [];   //所有类型的数据全部清空
          this.sltArr2[i].status = 1;          //示例图的对勾全部去掉
        }
        this.sltArr2[index].status = 0; //当前索引的示例图显示对勾
        this.option3.series[0].itemStyle.normal.lineStyle.color = color[index];    //当前图表颜色
        this.option3.series[0].color = color[index];
        this.option3.series[0].data = this.sltArr2[index].arr; //当前索引类型的数据显示
        areaAll2.setOption(this.option3);   //编译图表
        if (this.sltArr2[index].arr.length == 0) {
          this.$message.closeAll();
          this.$message({ message: '[' + this.sltArr2[index].name + ']数据为空', type: 'warning' });
        }
      }
    },



    drawLine () {
      this.pietu = this.$echarts.init(document.getElementById('pietu'));
      this.linchart1 = this.$echarts.init(document.getElementById('linchart1'));
      this.linchart2 = this.$echarts.init(document.getElementById('linchart2'));
      this.linchart3 = this.$echarts.init(document.getElementById('linchart3'));

      this.$axios.post('Operate/single/Price', { token: this.token, sid: this.sid }).then(res => {
        this.data = res.data.data.data;
        var option = {
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
                { value: res.data.data.list[1].value, name: '提现' },
                { value: res.data.data.list[0].value, name: '余额' },
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
                { value: res.data.data.revenue[0].value, name: '收入' }
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
          ],        }
        this.pietu.setOption(option);
      }).catch(err => { })

      //获取复购数-------------------------------------------------------
      this.$axios.post('Operate/single/ReSum', { token: this.token, sid: this.sid }).then(res => {
        var option4 = {
          calculable: true,
          tooltip: {
            show: true,
            triggerOn: "mousemove",
            backgroundColor: "#FFFFFF",
            textStyle: {
              color: "black",
              lineHeight: 100,

            }
          },

          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
              lineStyle: {
                color: 'black',
                width: 1,//这里是为了突出显示加上的
              }
            }
          },
          axisLabel: {
            color: "white" //刻度线标签颜色
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['black']
              },
            },
            axisLine: {
              lineStyle: {
                color: 'black',
                width: 1,//这里是为了突出显示加上的
              }
            }
          },
          series: [{
            data: res.data.data,
            type: 'line',
            areaStyle: {
              opacity: 0.2,
            },
            symbolSize: 10,
            color: ['#04BBFC'],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 4,//折线宽度
                  color: "#04BBFC"//折线颜色
                },

              },

            },


          }
          ],
          lineStyle: {
            color: "#00F040",
            width: 5,
          },
        }

        this.linchart2.setOption(option4);





      }).catch(err => { alert(err) })



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
.ft-l {
  float: left;
  width: 110px;
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
  height: 30px;
  width: 60px;
  bottom: -35px;
  left: -20px;
  z-index: 20;
  text-align: center;
}
.xqtable thead td {
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
.sidebar >>> .three {
  background: url("../../../static/images/shujvfenxi/icblue3.png") !important;
}
.repairShops {
  height: 1600px;
  background-color: #303847;
  overflow: hidden;
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

.pie {
  width: 93%;
  float: right;
  height: 360px;
}
.tableHead {
  width: 100%;
  height: 80px;
  padding: 20px 0px 0px 0px;
  color: white;
}
.ss {
  width: 10px;
  height: 20px;
  background: #04bbfc;
  float: left;
  margin-right: 20px;
}
#pietu {
  height: 280px;
  width: 100%;
  float: right;
}

.tablebox {
  height: 150px;
  width: 93%;
  float: right;
  border-bottom: 2px solid black;
}
.tablebox table {
  text-align: center;
  width: 800px;
  margin: auto;
  border: 2px solid #292f42;
}
.tablebox td {
  background: none;
  border: 2px solid #292f42;
  color: #fff;
  opacity: 0.8;
}
.boxtr td {
  color: #00dc1e;
}
.table {
  width: 45%;
  height: 450px;
  float: right;
  border-right: 3px solid black;
}
.pie2 {
  width: 45%;
  height: 450px;
  float: right;
}
.tableHead {
  width: 100%;
  height: 80px;
  padding: 20px 30px;
  color: white;
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
  color: #fff;
  opacity: 0.8;
}
#pietu2 {
  height: 300px;
  width: 100%;
  /*background: red;*/
}
.radio {
  border-radius: 0px;
  margin-left: 20px;
  background: red;
}
#linchart1 {
  width: 100%;
  height: 300px;
}
#linchart2 {
  width: 100%;
  height: 300px;
}
#linchart3 {
  width: 100%;
  height: 300px;
}
</style>
<style>
.repairShops .el-dialog__header {
  background: none !important;
}
</style>
