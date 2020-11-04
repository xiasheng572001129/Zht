<template>
  <div class='Addresslist'>
    <ctbHead>
      <router-link v-for="(item,index) in authList"
                   :key="index"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}

      </router-link>
    </ctbHead>
    <div class="container">
      <div class="container_title">
        数据分析
      </div>
      <div class="container_content">
        <div class="container_content_border">
          <div class="container_content_border-leftTop"> </div>
          <div class="container_content_border-rightTop"></div>
          <div class="container_content_border-leftBottom"></div>
          <div class="container_content_border-rightBottom"></div>
        </div>
        <div class="container_content-list">
          <div class="date">
            <el-date-picker v-model="date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="onReady">
            </el-date-picker>
          </div>
          <div class="pillar">
            <IEcharts :option='option'
                      :resizable="true"
                      @ready="onReady"
                      style="width:50%;height:600px"
                      @click="onClick" />
            <div>
              <el-table class="container_content-table"
                        :data="list"
                        height="565px">
                <el-table-column align="center"
                                 label="车辆品牌"
                                 prop="name"></el-table-column>
                <el-table-column align="center"
                                 label="车辆类型"
                                 prop="type"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import IEcharts from 'vue-echarts-v3/src/lite.js';
import 'echarts/lib/chart/pie'
import { getTime } from '@/utils'
export default {
  components: { IEcharts },
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      list: [],
      authList: '',
      seCurId: '',
      curId: '',
      date: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 59)],  //当前选择的日期
      option: {
        color: '#7FFFD4',
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '',
          type: 'bar',
          data: [],

        }]
      }
    }
  },

  methods: {
    updateChart () {  //更新柱状图
      let myChart = this.$echarts.init(this.$refs.pillar)
      myChart.setOption(this.option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    async onClick (item) {  //获取当前选择的排量详细数据
      console.log(this.date)
      try {
        const res = await this.$axios.post('admin/DataAnalysis/carCate', Object.assign({ token: this.token, series: item.name }, getTime(this.date)))
        this.list = res.data.data || []
      } catch (error) {
        this.$message.error('接口报错请检查')
        throw (error)
      }
    },
    async onReady () {  //获取柱状图数据 并加载
      try {
        const res = await this.$axios.post("admin/DataAnalysis/series", Object.assign({ token: this.token }, getTime(this.date)))
        let data = res.data.data || []
        let xAxisData = []  //排量
        let seriesData = []  //占比
        data.forEach(item => {
          xAxisData.push(item.series)
          seriesData.push(item.percentage)
        });
        this.option = Object.assign(this.option, {
          xAxis: {
            data: xAxisData, axisLine: {
              lineStyle: {  //设置x轴的颜色
                color: '#fff'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 16      //更改坐标轴文字大小
              }
            },
          }, yAxis: {
            axisLine: {
              lineStyle: {   //设置y轴的颜色
                color: '#fff'
              }
            }
          }, series: {
            data: seriesData, name: '占比', type: 'bar'
          }
        })
      } catch (error) {
        this.$message.error('接口报错请检查')
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
  mounted () {
    this.Auth()
  }
}
</script>
<style scoped>
.container {
  background-image: url("../images/background.png");
  top: 60px;
}
.head {
  height: 60px;
  background-color: #3498e9;
  color: rgb(129, 126, 126) !important;
}
>>> .logo {
  height: 60px;
  line-height: 60px;
}
>>> .head .nav {
  top: 20px;
}
.head .nav a {
  color: white;
}
.container_title {
  width: 100%;
  height: 50px;
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 40px;
  font-weight: 600;
  background-image: url("../images/headImg.png");
  background-size: 100% 90%;
  background-repeat: no-repeat;
  margin-top: 50px;
}
.container_content {
  width: 80%;
  height: 700px;
  margin: 40px auto;
  position: relative;
  padding: 40px 40px;
  color: white;
}
.container_content_border-leftTop {
  width: 100%;
  height: 50px;
  background-image: url("../images/leftTop.png");
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: 0;
  background-position: top left;
}
.container_content_border-rightTop {
  width: 100%;
  height: 50px;
  background-image: url("../images/rightTop.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  top: 0;
  background-position: top right;
}
.container_content_border-leftBottom {
  width: 100%;
  height: 50px;
  background-image: url("../images/leftBottom.png");
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  bottom: 0;
  background-position: bottom left;
}
.container_content_border-rightBottom {
  width: 100%;
  height: 50px;
  background-image: url("../images/rightBottom.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  bottom: 0;
  background-position: bottom right;
}
.container_content-list {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 48, 85, 0.3);
}
.pillar > div {
  width: 50%;
  float: left;
}

.container_content-list .date {
  padding: 5px 0;
}

.el-range-editor.el-input__inner {
  background-color: transparent;
  color: white;
  border: none;
}
.container_content-list >>> .el-date-editor .el-range-input {
  background: rgba(0, 48, 85, 0.5);
  color: white;
}
.container_content-list >>> .el-date-editor .el-range-separator {
  color: white !important;
  margin-right: 5px !important;
}
.container_content-list .el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border: none;
}

.container_content-list .el-table::before {
  content: "";
  position: absolute;
  background: none;
  z-index: 1;
}
.container_content-list >>> .el-table th {
  background: none;
  height: 40px;
  line-height: 40px;
  color: #fff;
  border-bottom: 1px solid #014d8b !important;
}

.container_content-list >>> .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.container_content-list >>> .el-table tr {
  background: rgba(0, 48, 85, 0.1) !important;
  border: 1px solid #014d8b !important;
}

.container_content-list >>> .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
  color: #fff !important;
  border-bottom: 1px solid #014d8b !important;
}
.container_content-list >>> .el-table tbody tr:hover > td {
  background-color: #ababab !important;
}
</style>
