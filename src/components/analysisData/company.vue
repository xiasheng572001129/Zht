<template>
  <div class="company">
    <ctbHead></ctbHead>
    <sidebar></sidebar>
    <div class="container">
      <div class="select">
        <div class="ss"></div>
        <span class="title">区域汇总：</span>

        <div v-for="item in sltArr"
             class="ft-l">
          <img @click="sltShow(item.idx,item.status)"
               :src="item.status==0? item.src0:item.src1"
               alt="">
          <span>{{item.name}}</span>
        </div>

        <div @click="toogle(1)"
             class="xiangqing"
             style="background-image:url(../../../static/images/xiangqing.png)">
          <img src="">
          <div v-if="change1"
               class="btnxq">
            <el-button type="text"
                       @click="getAreaDataDetail()">详情</el-button>
          </div>
        </div>
      </div>
      <div id="myChart"
           ref="myChart">

      </div>
      <div class="pie">
        <div class="tableHead">
          <div class="ss"></div>
          资金详情
          <div @click="toogle(2)"
               class="xiangqing"
               style="background-image:url(../../../static/images/xiangqing.png)">
            <img src="">
            <div v-if="change2"
                 class="btnxq">
              <el-button type="text"
                         @click="getcardDetail()">售卡详情</el-button>
            </div>
          </div>
        </div>
        <div id="pietu">

        </div>
      </div>
      <div class="table">
        <div class="tableHead">
          <div class="ss"></div>
          物料库
          <div @click="toogle(3)"
               class="xiangqing"
               style="background-image:url(../../../static/images/xiangqing.png)">
            <img src="">
            <div v-if="change3"
                 class="btnxq">
              <el-button type="text"
                         @click="getmaterailDetail()">详情</el-button>
            </div>
          </div>
        </div>
        <table class="tb">
          <tr>
            <td>物料名称</td>
            <td>期初配给/件</td>
            <td>配送物料/件</td>
            <td>物料补充/件</td>
            <td>物料库存/件</td>
            <td>增加配给/件</td>
          </tr>
          <tr v-for="item in material">
            <td>{{item.name}}</td>
            <td>{{item.ration}}</td>
            <td>{{item.psize}}</td>
            <td>{{item.bsize}}</td>
            <td>{{item.materiel_stock}}</td>
            <td>{{item.jsize}}</td>
          </tr>
        </table>
      </div>
      <div class="select2">
        <div class="ss"></div>
        <span style="display:block; float:left;height:30px;">业务排名：</span><br /><br />
        <el-select v-model="underling"
                   @change="OperatorSelect"
                   placeholder="请选择">
          <el-option v-for="item in underlingArr"
                     :key="item.aid"
                     :label="item.company"
                     :value="item.aid">
          </el-option>
        </el-select>
        <div @click="toogle(4)"
             class="xiangqing"
             style="background-image:url(../../../static/images/xiangqing.png)">
          <div v-if="change4"
               class="btnxq">
            <el-button type="text"
                       @click="centerDialogVisible4 = true">详情</el-button>
          </div>
        </div>
        <div class="top">
          <div class="box">
            <div class="num">
              <img src="../../../static/images/shujvfenxi/numb1.png"
                   style="height:100%;width:100%">
            </div>
            <span v-if="thirdArr.length>0">{{thirdArr[0].company}}</span>
            <span v-else>暂无</span>
          </div>
          <div class="box">
            <div class="num">
              <img src="../../../static/images/shujvfenxi/numb2.png"
                   style="height:100%;width:100%">
            </div>
            <span v-if="thirdArr.length>1">{{thirdArr[1].company}}</span>
            <span v-else>暂无</span>
          </div>
          <div class="box">
            <div class="num">
              <img src="../../../static/images/shujvfenxi/numb3.png"
                   style="height:100%;width:100%">
            </div>
            <span v-if="thirdArr.length>2">{{thirdArr[2].company}}</span>
            <span v-else>暂无</span>
          </div>
        </div>
      </div>
      <div id="myChart2"
           ref="myChart">

      </div>
    </div>
    <el-dialog title="区域汇总详情"
               :modal='false'
               :visible.sync="centerDialogVisible1"
               width="800px"
               center>
      <table class="xqtable">
        <thead>
          <td>维修厂名称</td>
          <td>交易金额</td>
          <td>售卡总数</td>
          <td>物料消耗</td>
          <td>服务次数</td>
          <td>复购数</td>
          <td>好评次数</td>
        </thead>
        <tr v-for="item in getAreaDetail">
          <td style="width:100px;overflow:hidden">{{item.company}}</td>
          <td>{{item.price}}</td>
          <td>{{item.sale_card}}</td>
          <td>{{item.size}}</td>
          <td>{{item.service_time}}</td>
          <td>{{item.rows}}</td>
          <td>{{item.goods}}</td>
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
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="售卡详情"
               :modal='false'
               :visible.sync="centerDialogVisible2"
               width="800px"
               center>
      <table class="xqtable">
        <thead>
          <td>运营商名称</td>
          <td>负责人</td>
          <td>电话</td>
          <td>售卡数</td>
          <td>交易总额</td>
        </thead>
        <tr v-for="item in card">
          <td style="width:100px;">{{item.company}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.size}}</td>
          <td>{{item.price}}</td>
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
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物料库"
               :modal='false'
               :visible.sync="centerDialogVisible3"
               width="800px"
               center>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="期初配给/件"
                     name="first">
          <table class="xqtable">
            <thead>
              <td>SM半合成</td>
              <td>SN合成</td>
              <td>SN全合成</td>
              <td>SN脂类全合成</td>
              <td>豪华礼包</td>
              <td style="width:80px;">供应地区</td>
              <td>初期配给时间</td>
            </thead>
            <tr v-for="item in stageStock">
              <td>{{item.smhalf}}</td>
              <td>{{item.smclose}}</td>
              <td>{{item.smwhole}}</td>
              <td>{{item.snfat}}</td>
              <td>{{item.gift}}</td>
              <td style="width:100px;overflow:hidden;">{{item.area}}</td>
              <td style="width:80px;">{{item.time}}</td>
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
        <el-tab-pane label="配送物料/件"
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
            <tr v-for="item in supp">
              <td>{{item.smhalf}}</td>
              <td>{{item.smclose}}</td>
              <td>{{item.smwhole}}</td>
              <td>{{item.snfat}}</td>
              <td>{{item.gift}}</td>
              <td>{{item.audit_time}}</td>
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
        <el-tab-pane label="物料补充/件"
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
              <td>{{item.number}}</td>
              <td>{{item.smhalf}}</td>
              <td>{{item.smclose}}</td>
              <td>{{item.smwhole}}</td>
              <td>{{item.snfat}}</td>
              <td>{{item.gift}}</td>
              <td>{{item.to_time}}</td>
            </tr>
          </table>
          <el-pagination background
                         @prev-click="prev4"
                         @next-click="next4"
                         @current-change="current4"
                         layout="prev, pager, next"
                         :page-count="pageCount4">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="物料库存/件"
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
              <td>{{wstock.smhalf}}</td>
              <td>{{wstock.smclose}}</td>
              <td>{{wstock.smwhole}}</td>
              <td>{{wstock.snfat}}</td>
              <td>{{wstock.gift}}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
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
               width="800px"
               center>
      <table class="xqtable">
        <thead>
          <td>排名</td>
          <td>运营商名称</td>
          <td>售卡总数</td>
          <td>交易金额</td>
          <td>复购数</td>
          <td>消耗物料</td>
          <td>服务次数</td>
          <td>好评次数</td>
        </thead>
        <tr v-for="item in businessArr">
          <td>{{item.index}}</td>
          <td style="width:110px;overflow:hidden;">{{item.company}}</td>
          <td>{{item.sale_card}}</td>
          <td>{{item.price}}</td>
          <td>{{item.rows}}</td>
          <td>{{item.size}}</td>
          <td>{{item.service_time}}</td>
          <td>{{item.goods}}</td>
        </tr>
      </table>
      <el-pagination background
                     @prev-click="prev6"
                     @next-click="next6"
                     @current-change="current6"
                     layout="prev, pager, next"
                     :page-count="pageCount6">
      </el-pagination>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible4 = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible4 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      myChart: "",
      myChart2: "",
      change1: false,
      change2: false,
      change3: false,
      change4: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      centerDialogVisible3: false,
      centerDialogVisible4: false,
      material: "",
      underlingArr: [],
      activeName: 'first',
      stageStock: "",
      supp: "",
      lement: "",
      wstock: "",
      card: "",
      underling: '',
      underlingArr: [],
      thirdArr: [],
      businessArr: "",
      page: "",
      pageCount: 1,
      getAreaDetail: "",
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
      ggid: 0,
      token: window.sessionStorage.getItem('bbytoken'),
      //示例图当前的索引
      curIndex: 0,
      sltArr: [
        {
          src0: '../../../static/images/shujvfenxi/lbs1.png',
          src1: '../../../static/images/shujvfenxi/lb1.png',
          name: '交易金额',
          status: 0,
          idx: 0,
          arr: []
        },
        {
          src0: '../../../static/images/shujvfenxi/lbs2.png',
          src1: '../../../static/images/shujvfenxi/lb2.png',
          name: '售卡数量',
          status: 1,
          idx: 1,
          arr: []
        },
        {
          src0: '../../../static/images/shujvfenxi/lbs3.png',
          src1: '../../../static/images/shujvfenxi/lb3.png',
          name: '维修厂数量',
          status: 1,
          idx: 2,
          arr: []
        },
        {
          src0: '../../../static/images/shujvfenxi/lbs4.png',
          src1: '../../../static/images/shujvfenxi/lb4.png',
          name: '复购数',
          status: 1,
          idx: 3,
          arr: []
        },
        {
          src0: '../../../static/images/shujvfenxi/lbs5.png',
          src1: '../../../static/images/shujvfenxi/lb5.png',
          name: '消耗物料',
          status: 1,
          idx: 4,
          arr: []
        },
        {
          src0: '../../../static/images/shujvfenxi/lbs6.png',
          src1: '../../../static/images/shujvfenxi/lb6.png',
          name: '服务次数',
          status: 1,
          idx: 5,
          arr: []
        }, {
          src0: '../../../static/images/shujvfenxi/lbs7.png',
          src1: '../../../static/images/shujvfenxi/lb7.png',
          name: '好评次数',
          status: 1,
          idx: 6,
          arr: []
        }
      ],
      option1: {

        tooltip: {},
        legend: {
          show: false,
        },
        xAxis: {

          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          axisLabel: {
            color: "white" //刻度线标签颜色
          },

        },
        yAxis: {
          axisLine: {
            show: true,
          },
          axisLabel: {
            color: "white" //刻度线标签颜色
          },
          splitLine: {
            lineStyle: {
              color: "#292F42",
            }
          }
        },
        grid: {
          y: 100,
          //            x2:80,
          //            x:80
        },
        series: [{
          name: '交易金额',
          type: 'line',
          data: [],
          // symbol: 'image://../../../static/images/_slices/transaction@3x.png',
          symbolSize: 10,
          color: "#37B4FA",
          lineStyle: {
            color: '#37B4FA',
            width: 3
          },
          areaStyle: {
            color: '#37B4FA'
          }
        }, {
          name: '售卡数量',
          type: 'line',
          data: [],
          color: "#00DC1E",
          // symbol: 'image://../../../static/images/_slices/card@3x.png',
          symbolSize: 10,
          lineStyle: {
            color: '#00DC1E',
            width: 3
          },
          areaStyle: {
            color: '#00DC1E'
          }
        }, {
          name: '维修厂数量',
          type: 'line',
          data: [],
          // symbol: 'image://../../../static/images/_slices/maintenance@3x.png',
          color: "#F2B2FF",
          symbolSize: 10,
          lineStyle: {
            color: '#F2B2FF',
            width: 3
          },
          areaStyle: {
            color: '#F2B2FF'
          }
        }, {
          name: '复购数',
          type: 'line',
          color: "#FFA977",
          data: [],
          // symbol: 'image://../../../static/images/_slices/Restructure@3x.png',
          symbolSize: 10,
          lineStyle: {
            color: '#FFA977',
            width: 3
          },
          areaStyle: {
            color: '#FFA977'
          }
        }, {
          name: '消耗物料',
          type: 'line',
          data: [],
          color: "#FFD964",
          // symbol: 'image://../../../static/images/_slices/materiel@3x.png',
          symbolSize: 10,
          lineStyle: {
            color: '#FFD964',
            width: 3
          },
          areaStyle: {
            color: '#FFD964'
          }
        }, {
          name: '服务次数',
          type: 'line',
          data: [],
          color: "#658C9F",
          // symbol: 'image://../../../static/images/_slices/service@3x.png',
          symbolSize: 10,
          lineStyle: {
            color: '#658C9F',
            width: 3
          },
          areaStyle: {
            color: '#658C9F'
          }
        }, {
          name: '好评次数',
          type: 'line',
          color: "#A440D2",
          data: [],
          // symbol: 'image://../../../static/images/_slices/Praise@3x.png',
          symbolSize: 10,
          lineStyle: {
            color: '#A440D2',
            width: 3
          },
          areaStyle: {
            color: '#A440D2'
          }
        }]
      },
      option: {        grid: {
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
          min: 0,
          max: 800,
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
        }]      },
    }
  },
  watch: {
    $route (to, from) {

    }
  },
  mounted () {
    this.ggid = this.$route.query.id;
    this.drawLine();
    this.myChart = this.$echarts.init(document.getElementById('myChart'));
    this.myChart2 = this.$echarts.init(document.getElementById('myChart2'));
    this.myChart2.setOption(this.option);
    var option1 = this.option1;
    var arr = this.option1.series;
    var ggid = this.$route.query.id;

    window.onresize = () => {
      this.myChart.resize();
      this.myChart2.resize();
    }
    //打开页面区域汇总，默认显示交易金额图表-------------------------------------------------
    this.$axios.post('ForAnalysis/reg/price', { token: this.token, ggid: this.ggid })
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
    this.$axios.post("ForAnalysis/posit/buslist", { token: this.token, ggid: this.ggid }).then(res => {

      if (res.data.code == 1) {
        this.businessArr = res.data.data.list;
        this.underlingArr = res.data.data.list;
        this.pageCount6 = res.data.data.rows;
        this.underling = this.underlingArr[0].company;
        this.OperatorData(this.underlingArr[0].aid);
      }
    }).catch(err => {

    })
    //获取前三名的数据--------------------------------------
    this.$axios.post('ForAnalysis/posit/busorder', { token: this.token, ggid: this.ggid })
      .then(res => {

        if (res.data.code == 1) {
          this.thirdArr = res.data.data.list;
        }
      })
      .catch(err => { alert(err); })
    this.getAreaData('card', 1);
    //区域汇总的维修厂数量
    this.getAreaData('scale', 2);
    //区域汇总的复购数
    this.getAreaData('repeat', 3);
    //区域汇总的消耗物料
    this.getAreaData('consume', 4);
    //区域汇总的服务次数
    this.getAreaData('service', 5);
    //区域汇总的好评次数
    this.getAreaData('good', 6);

  },
  watch: {
    '$route' (to, from) {
      //刷新参数放到这里里面去触发就可以刷新相同界面了
      this.getStatus(this.$route.path)
    }
  },
  methods: {
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    },
    //分页器----------------------------------------------------
    //区域汇总详情
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
      this.page = e;
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
      this.getAreaDataDetail3();
    },
    next4 (e) {
      this.page4 = e;
      this.getAreaDataDetail3();
    },
    current4 (e) {
      this.page4 = e;
      this.getAreaDataDetail3();
    },
    prev5 (e) {
      this.page5 = e;
      this.getAreaDataDetail3();
    },
    next5 (e) {
      this.page5 = e;
      this.getAreaDataDetail3();
    },
    current5 (e) {
      this.page5 = e;
      this.getAreaDataDetail3();
    },
    prev6 (e) {
      this.page6 = e;
      this.getAreaDataDetail3();
    },
    next6 (e) {
      this.page6 = e;
      this.getAreaDataDetail3();
    },
    current6 (e) {
      this.page6 = e;
      this.getAreaDataDetail3();
    },

    getAreaDataDetail () {
      this.$axios.post('ForAnalysis/reg/operator', { token: this.token, ggid: this.ggid, page: this.page }).then(res => {
        if (res.data.code == 1) {
          this.getAreaDetail = res.data.data.list;
        }
      }).catch(err => { alert(err) })
    },
    getAreaDataDetail2 () {
      this.$axios.post('ForAnalysis/posit/stageStock', { token: this.token, ggid: this.ggid, page: this.page2 }).then(res => {
        if (res.data.code == 1) {
          this.stageStock = res.data.data.list;
        }
      }).catch(err => { alert(err) })
    },
    getAreaDataDetail3 () {
      this.$axios.post('ForAnalysis/posit/supp', { token: this.token, ggid: this.ggid, page: this.page3 }).then(res => {
        if (res.data.code == 1) {
          this.supp = res.data.data.list;
        }
      }).catch(err => { alert(err) })
    },
    getAreaDataDetail4 () {
      this.$axios.post('ForAnalysis/posit/lement', { token: this.token, ggid: this.ggid, page: this.page4 }).then(res => {
        if (res.data.code == 1) {
          this.lement = res.data.data.list;
        }
      }).catch(err => { alert(err) })
    },
    getAreaDataDetail5 () {
      this.$axios.post('ForAnalysis/posit/card', { token: this.token, ggid: this.ggid, page: this.page5 }).then(res => {
        if (res.data.code == 1) {
          this.card = res.data.data.list;
        }
      }).catch(err => { alert(err) })
    },
    getAreaDataDetail6 () {
      this.$axios.post("ForAnalysis/posit/buslist", { token: this.token, ggid: this.ggid, page: this.page6 }).then(res => {
        if (res.data.code == 1) {
          this.businessArr = res.data.data.list;
        }
      }).catch(err => {

      })
    },






    //获取区域汇总的数据封装
    getAreaData (path, num) {
      this.$axios.post('ForAnalysis/reg/' + path, { token: this.token, ggid: this.ggid })
        .then(res => {

          if (res.data.code == 1) {
            this.sltArr[num].arr = res.data.data;
          }
        }).catch(err => {
          alert(err);
        })
    },
    sltShow (index, id) {
      //单选逻辑用
      if (index == this.curIndex) return;
      this.curIndex = index;
      var myChart = this.$echarts.init(document.getElementById('myChart'));
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
          this.option1.series[i].data = [];   //所有类型的数据全部清空
          this.sltArr[i].status = 1;          //示例图的对勾全部去掉
        }
        this.sltArr[index].status = 0;     //当前索引的示例图显示对勾
        this.option1.series[index].data = this.sltArr[index].arr; //当前索引类型的数据显示
        myChart.setOption(this.option1);   //编译图表
        if (this.sltArr[index].arr.length == 0) {
          this.$message.closeAll();
          this.$message({ message: '[' + this.sltArr[index].name + ']数据为空', type: 'warning' });
        }
      }
    },
    //获取区域汇总详情数据-------------------------------------------------------------------------------
    getAreaDataDetail () {
      this.$axios.post('ForAnalysis/reg/operator', { token: this.token, ggid: this.ggid }).then(res => {
        if (res.data.code == 1) {
          this.getAreaDetail = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.centerDialogVisible1 = true
    },
    //---------------------------------------------------------------------------------------      



    //获取物料库详情数据------------------------------------------------------------------
    getmaterailDetail () {
      this.$axios.post('ForAnalysis/posit/stageStock', { token: this.token, ggid: this.ggid, page: this.page2 }).then(res => {//期初配给详情
        if (res.data.code == 1) {
          this.stageStock = res.data.data.list;
          this.pageCount2 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.$axios.post('ForAnalysis/posit/supp', { token: this.token, ggid: this.ggid }).then(res => {//物料配送详情
        if (res.data.code == 1) {
          this.supp = res.data.data.list;
          this.pageCount3 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.$axios.post('ForAnalysis/posit/lement', { token: this.token, ggid: this.ggid }).then(res => {//物料补充详情
        if (res.data.code == 1) {
          this.lement = res.data.data.list;
          this.pageCount4 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.$axios.post('ForAnalysis/posit/wstock', { token: this.token, ggid: this.ggid }).then(res => {//物料库存详情
        if (res.data.code == 1) {
          this.wstock = res.data.data.list;
        }
      }).catch(err => { alert(err) })


      this.centerDialogVisible3 = true
    },

    //获取资金的售卡详情数据----------------------------------------------------------------
    getcardDetail () {
      this.$axios.post('ForAnalysis/price/card', { token: this.token, ggid: this.ggid }).then(res => {
        if (res.data.code == 1) {
          this.card = res.data.data.list;
          this.pageCount5 = res.data.data.rows;
        }
      }).catch(err => { alert(err) })
      this.centerDialogVisible2 = true
    },
    //下拉时调用--------------------------------------------------------------
    OperatorSelect (aid) {
      this.OperatorData(aid)
    },
    //下拉选择的公司数据-------------------------------------------------------
    OperatorData (aid) {
      this.$axios.post("ForAnalysis/posit/busser", { token: this.token, aid: aid }).then(res => {

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

      })
    },
    //-------------------------------------------------------------------------------------
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
      }
    },
    drawLine () {
      this.myChart = this.$echarts.init(document.getElementById('myChart'));
      this.pietu = this.$echarts.init(document.getElementById('pietu'));
      //获取饼图参数---------------------------------------------------------------------------------------------------
      this.$axios.post('ForAnalysis/price/prices', { token: this.token, ggid: this.ggid }).then(res => {
        if (res.data.code == 1) {
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
                  { value: res.data.data.data[2].exp, name: '支出' },
                  { value: res.data.data.data[0].Put, name: '提现' },
                  { value: res.data.data.data[1].balance, name: '余额' },
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
                  { value: res.data.data.list.dis, name: '收入' }
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
      }).catch(err => {
        this.$alert('您没有权限！')
      })
      //获取物料库数据--------------------------------------------------------------------

      this.$axios.post('ForAnalysis/posit/gstock', { token: this.token, ggid: this.ggid }).then(res => {
        if (res.data.code == 1) {
          this.material = res.data.data
        }
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
thead td {
  background: #cdf1fe;
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
.company {
  height: 1600px;
  width: 100%;
  background-color: #303847;

  overflow: hidden;
}
#myChart {
  width: 90%;
  height: 380px;
  border-bottom: 3px solid black;
  float: right;
}
.select {
  width: 100%;
  height: 120px;
  padding: 40px 200px;
  color: white;
}
.radio {
  border-radius: 0px;
  margin-left: 20px;
  /*background: red;*/
  display: none;
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
  width: 100px;
  float: left;
}
.title {
  float: left;
}
.sidebar {
  height: 1600px !important;
  background: #3d4659 !important;

  /*overflow: hidden;  */
}
.sidebar >>> .agent {
  background: url("../../../static/images/shujvfenxi/icnlue1.png") !important;
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
#pietu {
  height: 350px;
  width: 100%;
  /*background: red;*/
}
#myChart2 {
  width: 90%;
  height: 380px;
  float: right;
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
.box {
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
.ft-l {
  height: 18px;
}
.ft-l span {
  display: inline;
  font-size: 14px;
  line-height: 18px;
}
.ft-l img {
  height: 100%;
  width: 18px;
}
</style>