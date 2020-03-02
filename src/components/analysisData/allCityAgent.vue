<template>
  <div class="allCityAgent">
    <ctbHead></ctbHead>
    <sidebar></sidebar>
    <div class="container">
      <div class="pie">
        <div class="tableHead">
          <div class="ss"
               style="background:#00F040;"></div>
          售卡总数
        </div>
        <div class="pietu"
             id="histogram2">

        </div>
      </div>
      <div class="pie"
           style="border-right: 2px solid black; ">
        <div class="tableHead">
          <div class="ss"></div>
          交易金额
        </div>
        <div class="pietu"
             id="histogram1">

        </div>
      </div>
      <div class="pie">
        <div class="tableHead">
          <div class="ss"
               style="background:#4BBEFF;"></div>
          好评次数
        </div>
        <div class="pietu"
             id="linchart1">

        </div>
      </div>
      <div class="pie"
           style="border-right: 2px solid black;">
        <div class="tableHead">
          <div class="ss"
               style="background:#00DC1E;"></div>
          服务次数
        </div>
        <div class="pietu"
             id="linchart2">

        </div>
      </div>

      <div class="pie">
        <div class="tableHead">
          <div class="ss"
               style="background:#FFC99C;"></div>
          复购次数
        </div>
        <div class="pietu"
             id="linchart3">

        </div>
      </div>
      <div class="pie"
           style="border-right: 2px solid black;">
        <div class="tableHead">
          <div class="ss"
               style="background:#F0A9FF;"></div>
          物料消耗
        </div>
        <div class="pietu"
             id="histogram3">

        </div>
      </div>

      <div class="pie">
        <div class="tableHead">
          <div class="ss"
               style="background:#FF9863;"></div>
          金额平均
        </div>
        <div class="pietu"
             id="histogram5">

        </div>
      </div>
      <div class="pie"
           style="border-right: 2px solid black;">
        <div class="tableHead">
          <div class="ss"
               style="background:#0FD2B4;"></div>
          售卡平均
        </div>
        <div class="pietu"
             id="histogram4">

        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      histogram1: "",
      histogram2: "",
      histogram3: "",
      histogram4: "",
      histogram5: "",
      linchart1: "",
      linchart2: "",
      linchart3: "",
      total: ""
    }
  },
  mounted () {

    this.drawLine();
    window.onresize = () => {
      this.histogram1.resize();
      this.histogram2.resize();
      this.histogram3.resize();
      this.histogram4.resize();
      this.histogram5.resize();
      this.linchart1.resize();
      this.linchart2.resize();
      this.linchart3.resize();
    }



  },
  methods: {

    drawLine () {
      this.histogram1 = this.$echarts.init(document.getElementById('histogram1'));
      this.histogram2 = this.$echarts.init(document.getElementById('histogram2'));
      this.histogram3 = this.$echarts.init(document.getElementById('histogram3'));
      this.histogram4 = this.$echarts.init(document.getElementById('histogram4'));
      this.histogram5 = this.$echarts.init(document.getElementById('histogram5'));
      this.linchart1 = this.$echarts.init(document.getElementById('linchart1'));
      this.linchart2 = this.$echarts.init(document.getElementById('linchart2'));
      this.linchart3 = this.$echarts.init(document.getElementById('linchart3'));


      var province = sessionStorage.getItem("province");
      var provinceId = sessionStorage.getItem("provinceId");

      //获取首页点击的省份数据-----------------------------------------------------------------------

      //交易金额---------------------------------------
      this.$axios.post('analy/total', { token: this.token, province: province }).then(res => {
        this.total = res.data.data;
        var hischart = {
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
            data: this.total,
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
        this.histogram1.setOption(hischart)
      }).catch(err => {
        alert(err)
      })







      //售卡总数-----------------------------------------------------------	
      this.$axios.post('analy/card', { token: this.token, province: province }).then(res => {
        this.card = res.data.data;


        var hischart2 = {
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
              '11月',
              '12月',
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
            data: this.card,
            barWidth: 25,
            //barWidth: 50, //柱子宽度
            //barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00DC1E'
                }, {
                  offset: 1,
                  color: '#00F040'
                }]),
                opacity: 1,
              }
            }
          }]
        }
        this.histogram2.setOption(hischart2);
      }).catch(err => {
        alert(err)
      })


      //物料消耗-------------------------------------------------------------------
      this.$axios.post('analy/material', { token: this.token, id: provinceId }).then(res => {
        var hischart3 = {          grid: {
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
            data: res.data.data,
            barWidth: 25,
            //barWidth: 50, //柱子宽度
            //barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#F9D4FF'
                }, {
                  offset: 1,
                  color: '#F0A9FF'
                }]),
                opacity: 1,
              }
            }
          }]        }
        this.histogram3.setOption(hischart3)
      }).catch(err => {
        alert(err)
      })


      //售卡平均------------------------------------------------------
      this.$axios.post('analy/munCard', { token: this.token, province: province, pro_id: provinceId }).then(res => {
        var hischart4 = {
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
            data: res.data.data,
            barWidth: 25,
            //barWidth: 50, //柱子宽度
            //barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#22EBDB'
                }, {
                  offset: 1,
                  color: '#0FD2B4'
                }]),
                opacity: 1,
              }
            }
          }]
        }
        this.histogram4.setOption(hischart4)
      }).catch(err => {
        alert(err)
      })

      //金额平均---------------------------------------------------------------------------
      this.$axios.post('analy/munPrice', { token: this.token, province: province, pro_id: provinceId }).then(res => {
        var hischart5 = {
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
            data: res.data.data,
            barWidth: 25,
            //barWidth: 50, //柱子宽度
            //barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#FFC99C'
                }, {
                  offset: 1,
                  color: '#FF9863'
                }]),
                opacity: 1,
              }
            }
          }]
        }
        this.histogram5.setOption(hischart5)
      }).catch(err => {
        alert(err)
      })




      //好评次数--------------------------------------------------------
      this.$axios.post('analy/praise', { token: this.token, province: province }).then(res => {
        var line = {
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
          }
        }
        this.linchart1.setOption(line)
      }).catch(err => {
        alert(err)
      })



      //服务次数-----------------------------------------------------
      this.$axios.post('analy/serMonth', { token: this.token, province: province }).then(res => {
        var line2 = {
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
            color: ['#00F040'],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 4,//折线宽度
                  color: "#00F040"//折线颜色
                },

              },

            },


          }
          ],
          lineStyle: {
            color: "#00F040",
            width: 5,
          }

        }
        this.linchart2.setOption(line2)
      }).catch(err => {
        alert(err)
      })


      //复购次数--------------------------------------------------
      this.$axios.post('analy/repeatTime', { token: this.token, province: province }).then(res => {
        var line3 = {
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
            color: ['#FFCD4B'],
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 4,//折线宽度
                  color: "#FFCD4B"//折线颜色
                },

              },

            },


          }
          ],
          lineStyle: {
            color: "#00F040",
            width: 5,
          }
        }
        this.linchart3.setOption(line3)
      }).catch(err => {
        alert(err)
      })

    }
  }
}
</script>
<style scoped>
.allCityAgent {
  height: 2051px;
  width: 100%;
}
.sidebar >>> .agent {
  background: url("../../../static/images/shujvfenxi/icnlue1.png") !important;
}
.container {
  float: left;
  height: 1979px;
  position: absolute;
  z-index: 0;
  background: #303847;
}

.pie {
  width: 45%;
  height: 490px;
  float: right;
  border-bottom: 2px solid black;
  border-right: 1px solid black;
  /*background: red;*/
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
.pietu {
  height: 350px;
  width: 100%;
  /*background: red;*/
}
</style>