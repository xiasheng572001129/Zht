<template>
  <div>
    <ctbHead>
      <router-link active-class="activeClass"
                   :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>市级代理列表<input placeholder="搜索"
                 class="CityInput"></div>

      </div>
      <table class="table">
        <thead>
          <tr>
            <th>营业执照</th>
            <th>市级代理</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>运营商数量</th>
            <th>区域个数</th>
            <th>售卡数量</th>
            <th>保养次数</th>
            <th>账户余额</th>
            <th>预约提醒</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list">
            <td><img :src="item.license"
                   class="Img"
                   @click="tapImg(item.gid)"></td>
            <td>{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>
              <a href="javascript:;"
                 @click="openShop(item.gid)">{{item.agent_nums}}</a>
            </td>
            <td>
              <a href="javascript:;"
                 @click="regionNum(item.gid)">{{item.regions}}</a>
            </td>
            <td>
              <a href="javascript:;"
                 @click="maintain(item.gid)">{{item.sale_card}}</a>
            </td>
            <td>
              {{item.service_time}}
            </td>
            <td>{{item.balance}}</td>
            <td>{{item.audit_time}}</td>
          </tr>
        </tbody>
      </table>

      <el-dialog title="运营商数量"
                 @close="close"
                 :visible.sync="DialogVisible"
                 width="60%"
                 center>
        <table class="table table_bottom">
          <thead>
            <tr>
              <th>运营商名称</th>
              <th>负责人</th>
              <th>联系电话</th>
              <th>运营区域</th>
              <th>分佣比例</th>
              <th>合同到期时间</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Operate">
              <td>{{item.company}}</td>
              <td>{{item.leader}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.county}}</td>
              <td>{{item.profit}}</td>
              <td>{{item.end_time?item.end_time:'---'}}</td>
            </tr>
          </tbody>
        </table>
        <div class="page_center"
             v-show="pageCounts&&pageCounts>1">
          <paging :page-count="pageCounts"
                  :page="OpPage"
                  @index="OperatorPage"></paging>
        </div>
      </el-dialog>
      <el-dialog title="售卡数量"
                 ref="my"
                 :visible.sync="SalecardVisible"
                 width="60%"
                 center
                 @close="close">
        <table class="table">
          <thead>
            <tr>
              <th>运营商名称</th>
              <th>负责人</th>
              <th>电话</th>
              <th>售卡总数</th>
              <th>交易金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Maintain">
              <td>{{item.company}}</td>
              <td>{{item.leader}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.sale_card}}</td>
              <td>{{item.sum}}</td>

            </tr>
          </tbody>
        </table>
        <div class="page_center"
             v-show="maintainCount&&maintainCount>1">
          <paging :page-count="maintainCount"
                  :page="maintainPage"
                  @index="mainPage"></paging>

        </div>
      </el-dialog>

      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
      <Region-dialog title="区域个数"
                     @regionClose="regionClose"
                     :Province="Province"
                     :regionVisible="centerDialogVisible"
                     :countyShow="false"></Region-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
import RegionDialog from '@/components/Dialog/RegionDialog'
export default {
  data () {
    return {
      list: [],
      Operate: [],
      Salecard: [],
      Maintain: [],
      Province: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      OpPage: 1, //运营商数量显示的页码数
      maintainPage: 1, //保养次数显示的页码数
      pageCount: 1, //页的总数
      pageCounts: 1, //运营商数量 页的总数
      maintainCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      seCurId: 0,
      centerDialogVisible: false,
      DialogVisible: false,
      SalecardVisible: false,
      OperatorId: "",
      maintaId: ""
    }
  },
  components: {
    RegionDialog
  },
  created () {
    this.init()
  },

  mounted () {
    var id = this.$route.query.id

    this.curId = id;
    this.$axios.post("admin/Auth/erAuth", {
      token: this.token,
      id: id
    }).then(res => {
      var arr = res.data.data;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == "市级代理列表") {
          this.seCurId = arr[i].id
        }
      }
      this.authList = arr;
    })

  },

  methods: {
    close () {
      this.Operate = []
      this.Maintain = []
      this.OpPage = 1,
        this.maintainCount = 1
      this.pageCounts = 1
    },

    OperatorPage (e) {
      this.OpPage = e;
      this.openShop(this.OperatorId)

    },
    mainPage (e) {

      this.maintainPage = e;
      this.maintain(this.maintaId)
    },
    paging (e) {
      this.page = e;
      this.init()
    },

    regionClose () {
      this.centerDialogVisible = false
    },
    init () {
      this.$axios.post("supply/index", { //市级代理列表
        token: this.token,
        page: this.page
      }).then(res => {
        if (res.data.code == 1) {

          if (res.data.code == 1) {
            this.list = res.data.data.list
            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg, { time: 500 })
          }
        }
      }).catch(err => {
        throw (err)
      })
    },
    openShop (gid) {
      this.OperatorId = gid

      this.$axios.post("supply/agent", { //运营商个数详情
        token: this.token,
        gid: gid,
        page: this.OpPage
      }).then(res => {
        if (res.data.code == 1) {

          this.DialogVisible = true
          this.Operate = res.data.data.list
          this.pageCounts = res.data.data.rows;

        } else {
          this.DialogVisible = false;
          layer.msg(res.data.msg, { time: 500 })
        }
      }).catch(err => {
        throw (err)
      })

    },
    regionNum (gid) {

      this.$axios.post("supply/region", {
        token: this.token,
        gid: gid
      }).then(res => {

        if (res.data.code == 1) {
          this.centerDialogVisible = true
          this.Province = res.data.data ? res.data.data : ["", ""];

        } else {
          this.centerDialogVisible = false;
          layer.msg(res.data.msg, { time: 500 })
        }
      }).catch(err => {
        throw (err)
      })
    },
    maintain (gid) {
      this.maintaId = gid

      this.$axios.post("supply/card", {
        token: this.token,
        gid: gid,
        page: this.maintainPage
      }).then(res => {

        if (res.data.code == 1) {
          this.SalecardVisible = true
          this.Maintain = res.data.data.list
          this.maintainCount = res.data.data.rows;
        } else {
          this.SalecardVisible = false;
          layer.msg(res.data.msg, { time: 500 })
        }

        //            if(res.data.data.list){
        //              this.Maintain = res.data.data.list
        //              this.maintainCount = res.data.data.rows;
        //            }else {
        //              this.SalecardVisible=false;
        //              this.layer.msg("")
        //            }

      }).catch(err => {
        throw (err)
      })
    },
    tapImg (gid) {

    },

  },

}
</script>
<style scoped>
.activeClass {
  color: #04bbfc;
}

.CityInput {
  width: 100px;
  margin-left: 400px;
  height: 36px;
  border: 0;
  outline: none;
  background-color: #04bbfc;
  border-radius: 18px;
  text-align: center;
}

input::-webkit-input-placeholder {
  color: #ffffff;
}

.Img {
  vertical-align: middle;
  width: 100px;
  height: 120px;
  padding: 20px 0;
}
</style>
<style>
.el-dialog__header {
  background: rgba(152, 209, 249, 1);
  padding-bottom: 20px;
}

.el-dialog__title {
  color: white;
}
</style>
