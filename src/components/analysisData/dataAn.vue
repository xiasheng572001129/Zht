<template>
  <div class="dataAnalysis">
    <ctbHead>
      <div class="head_text">数据分析</div>
    </ctbHead>

    <div class="dataAn_container">

      <div class="list one">
        <!--<div class="list_items">-->
          <!--<div class="img">-->
            <!--<img src="static/images/shujvfenxi/canyu.png">-->
          <!--</div>-->
          <!--<div class="text Txt">邦保养参与</div>-->
          <!--<div class="text Num">{{bbycy}}</div>-->
        <!--</div>-->
        <!--<div class="list_items">-->
          <!--<div class="img">-->
            <!--<img src="../../../static/images/shujvfenxi/guanzhu.png">-->
          <!--</div>-->
          <!--<div class="text Txt">邦保养关注</div>-->
          <!--<div class="text Num">{{bbygz}}</div>-->
        <!--</div>-->
        <!--<router-link :to="{name:'alloperator'}">-->
          <!--<div class="list_items">-->
            <!--<div class="img">-->
              <!--<img src="../../../static/images/shujvfenxi/yunyingshang.png">-->
            <!--</div>-->
            <!--<div class="text Txt">运营商</div>-->
            <!--<div class="text Num">{{yys}}</div>-->
          <!--</div>-->
        <!--</router-link>-->
      </div>
      <div id="dataMap"
           class="dataMap">
      </div>

      <div class="list two">
        <div class="list_items">
          <div class="img">
            <img src="../../../static/images/shujvfenxi/chezhu.png">
          </div>
          <div class="text Txt">车主</div>
          <div class="text Num">{{cz}}</div>
        </div>
        <router-link :to="{name:'allRepairShops'}">
          <div class="list_items">
            <div class="img">
              <img src="../../../static/images/shujvfenxi/weixiuchang.png">
            </div>
            <div class="text Txt">维修厂</div>
            <div class="text Num">{{wxc}}</div>
          </div>
        </router-link>
        <router-link :to="{name:'allCityAgent'}">
          <div class="list_items">
            <div class="img">
              <img src="../../../static/images/shujvfenxi/daili.png">
            </div>
            <div class="text Txt">主题活动店</div>
            <!--<div class="text Num">{{sjdl}}</div>-->
            <div class="text Num">1387</div>
          </div>
        </router-link>
        <router-link :to="{name:'alloperator'}">
          <div class="list_items">
            <div class="img">
              <img src="../../../static/images/shujvfenxi/yunyingshang.png">
            </div>
            <div class="text Txt">运营商</div>
            <div class="text Num">{{yys}}</div>
          </div>
        </router-link>
      </div>

      <div class="bottom">
        <!--<div class="list_items_bto">-->
          <!--<div class="img">-->
            <!--<img src="../../../static/images/shujvfenxi/list1.png">-->
          <!--</div>-->
          <!--<div class="text Txt">总服务次数</div>-->
          <!--<div class="text Num">{{zfw}}</div>-->
        <!--</div>-->
        <div class="list_items_bto"  style="margin:0 auto;width:100%;">
          <div class="img">
            <img src="../../../static/images/shujvfenxi/list2.png">
          </div>
          <div class="text Txt">交易总额</div>
          <div class="text Num">{{jyze}}</div>
        </div>
        <!--<div class="list_items_bto">-->
          <!--<div class="img">-->
            <!--<img src="../../../static/images/shujvfenxi/list3.png">-->
          <!--</div>-->
          <!--<div class="text Txt">参与次数平均值</div>-->
          <!--<div class="text Num">{{cypjz}}</div>-->
        <!--</div>-->
        <!--<div class="list_items_bto">-->
          <!--<div class="img">-->
            <!--<img src="../../../static/images/shujvfenxi/list4.png">-->
          <!--</div>-->
          <!--<div class="text Txt">售卡平均值</div>-->
          <!--<div class="text Num">{{skpjz}}</div>-->
        <!--</div>-->
      </div>

    </div>

  </div>
</template>
<script type="text/javascript">
import 'echarts/map/js/china.js';
export default {
  data () {
    return {

      shujv: "",
      token: window.sessionStorage.getItem('bbytoken'),
      bbygz: "",
      bbycy: "",
      sjdl: "",
      yys: "",
      wxc: "",
      cz: "",
      zfw: "",
      jyze: "",
      cypjz: "",
      skpjz: "",
      map: "",
      data: "",
    }
  },
  mounted () {

    this.drawLine();
    //获取邦保养关注度
    this.$axios.post('analy/maint', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.bbygz = res.data.data
      }
      else {
        this.bbygz = '暂无数据'
      }
    }).catch(err => {
      alert(err)
    });
    //获取邦保养参与度
    this.$axios.post('analy/part', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.bbycy = res.data.data
      }
      else {
        this.bbycy = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });
    //市级代理全国总数量
    this.$axios.post('analy/agent', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.sjdl = res.data.data
      }
      else {
        this.sjdl = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });
    //运营商全国总数量
    this.$axios.post('analy/oper', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.yys = res.data.data
      }
      else {
        this.sjdl = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });
    //维修厂全国总数量
    this.$axios.post('analy/shop', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.wxc = res.data.data
      }
      else {
        this.wxc = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });

    //全国车主数量
    this.$axios.post('analy/user', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.cz = res.data.data
      }
      else {
        this.cz = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });

    //总服务次数
    this.$axios.post('analy/service', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.zfw = res.data.data
      }
      else {
        this.zfw = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });

    //交易总额
    this.$axios.post('analy/price', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.jyze = res.data.data
      }
      else {
        this.jyze = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });
    //参与平均值
    this.$axios.post('analy/avera', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.cypjz = res.data.data
      }
      else {
        this.cypjz = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });
    //售卡平均值
    this.$axios.post('analy/pravera', { token: this.token }).then(res => {
      if (res.data.code == 1) {
        this.skpjz = res.data.data
      }
      else {
        this.skpjz = '暂无数据'
      }

    }).catch(err => {
      alert(err)
    });
    //获取全国省份和每个省份的所有数据存入data()中---------------------------------------------
    this.$axios.post('analy/province', { token: this.token }).then(res => {

      this.data = res.data.data

    }).catch(err => {
      alert(err)
    });
  },

  methods: {
    drawLine () {
      var echarts = require('echarts/lib/echarts');//导入中国地图插件
      var myChart = this.$echarts.init(document.getElementById('dataMap'));
      var that = this;


      //点击地图省份跳转该省数据页面--------------  ----------------------------------------------------
      myChart.on('click', function (param) {
        return false
        for (var i = 0; i < that.data.length; i++) {
          if (that.data[i].province.indexOf(param.name) > -1) {
            that.$router.push({ path: "allCityAgent", query: { id: that.data[i].id } });
            sessionStorage.setItem('province', that.data[i].province); //将点击的省份和该省份的ID存入session
            sessionStorage.setItem('provinceId', that.data[i].id);
          }
        }
      })
      //地图的所有参数-----------------------------------------------------------------------
      var option = {
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          backgroundColor: "#FFFFFF",
          padding: [20, 10],
          formatter: function (param) { //鼠标悬浮到省份弹框
            for (var i = 0; i < that.data.length; i++) {//遍历每个省份
              if (that.data[i].province.indexOf(param.name) > -1) {//判断鼠标在哪个省份，并调取这个省份的数据显示到弹框上

                return `运营商：` + that.data[i].agent + `<br/>维修厂：` + that.data[i].shop + `<br/>主题活动店：` +
                  that.data[i].cardAvera + `<br/>车主：` + that.data[i].user + `<br/>交易流水：` + that.data[i].cardPrice
                  // + `<br>售卡平均值：` + that.data[i].cardPrice;
              }
            }

          },
          textStyle: {
            color: "#555555",
            lineHeight: 100,

          }
        },


        series: [{
          type: 'map',
          mapType: 'china',
          data: [{
            name: '北京',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],

          },
          {
            name: '天津',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '上海',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '重庆',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '河北',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '河南',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '云南',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '辽宁',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '黑龙江',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '湖南',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '安徽',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '山东',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '新疆',
            value: Math.round(Math.random() * 1000),
            tipData: ['哈哈哈'],
          },
          {
            name: '江苏',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '浙江',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '江西',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '湖北',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '广西',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '甘肃',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '山西',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '内蒙古',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '陕西',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '吉林',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '福建',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '贵州',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '广东',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '青海',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '西藏',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '四川',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '宁夏',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '海南',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '台湾',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '香港',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '澳门',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          },
          {
            name: '南海诸岛',
            value: Math.round(Math.random() * 1000),
            tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
          }],
          itemStyle: {
            normal: {
              areaColor: '#404a59',
              borderColor: 'rgba(100,149,237,1)',
              borderWidth: 0.5
            },
            emphasis: {
              borderWidth: 1,
              borderColor: '#fff',
              areaColor: '#04BBFC',
              label: {
                shadowColor: '#fff', //默认透明
                shadowBlur: 10,
                show: true
              }
            }

          },

        }]
      }
      //地图参数写完后 绘制地图
      myChart.setOption(option);
      var that = this;


    },

  }
}
</script>
<style scoped>
.head_text {
  height: 30px;
  width: 100px;
  color: #04bbfc;
  line-height: 30px;
}
.dataAnalysis {
  height: 100%;
  width: 100%;
  background-color: #3d4659;
}
.dataAn_container {
  height: 100%;
  width: 70%;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}
.list {
  height: 420px;
  width: 140px;
  margin-top: 200px;
  float: left;
  border: none;
  padding: 0;
}
.two {
  float: right;
}
.list_items {
  height: 140px;
  width: 140px;
  border-bottom: 1px solid black;
  padding: 20px 20px;
}
.img {
  height: 60px;
  width: 100%;
  margin-left: 20px;
}
.text {
  width: 100%;
  text-align: center;
  color: white;
}
.Txt {
  font-size: 12px;
}
.Num {
  font-size: 25px;
  font-weight: bold;
  color: skyblue;
}
.bottom {
  width: 650px;
  height: 120px;
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
.list_items_bto {
  height: 100%;
  width: 150px;
  /*border-bottom: 2px solid black;*/
  text-align: center;
  padding: 20px 0px;
  float: left;
}
.list_items_bto .img {
  margin: auto;
}
.dataMap {
  width: 800px;
  height: 700px;

  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
