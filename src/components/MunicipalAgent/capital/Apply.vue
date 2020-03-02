<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>提现金额</th>
          <th>申请时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list"
            style="height: 90px;">
          <td>{{item.company}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>{{item.putprice}}</td>
          <td>
            {{item.create_time}}
          </td>
          <td>
            <a href="javascript:;"
               @click="income(item.gid)">收入明细</a>
            <a href="javascript:;"
               @click="PutForward(item.gid)">提现明细</a>
            <a href="javascript:;"
               @click="ToExamine(item.id,item.phone)">审核</a>
          </td>

        </tr>
      </tbody>
    </table>
    <!-- 提现明细的对话框 -->
    <el-dialog title="提现明细"
               :visible.sync="centerDialogVisible"
               width="50%"
               center
               @close="close">
      <table class="table"
             style="width: 100%;">
        <thead>
          <tr>
            <th>提现金额</th>
            <th>账号余额</th>
            <th>提现时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Putforward">
            <td>{{item.putprice}}</td>
            <td>{{item.sur_amount}}</td>
            <td>{{item.Trial_time|datetime}}</td>
          </tr>
        </tbody>
      </table>
      <div class="page_center"
           v-show="PutforwardpageCount&&PutforwardpageCount>1">
        <!--分页的组件-->
        <paging :page-count="PutforwardpageCount"
                v-show="list&&list.length>0"
                :page="PutforwardPage"
                @index="DetailedPaging"></paging>
      </div>
    </el-dialog>
    <!--审核的对话框-->
    <el-dialog title="审核"
               :visible.sync="Toexamine"
               width="50%"
               center>
      <div class="examine">
        <ul>
          <li>上次提现时间：{{Auditdetails.old_time}}</li>
          <li>上次提现金额：{{Auditdetails.old_money}}</li>
          <li>本次提现金额：{{Auditdetails.now_money}}</li>
          <li>本次账户剩余：{{Auditdetails.now_amount}}</li>
        </ul>
        <div class="Reason">
          <span>驳回理由：</span>
          <input placeholder="请输入驳回理由"
                 v-model="reason"
                 style="width: 100%;flex: 1;">
        </div>
        <div class="btn">
          <el-button type="danger"
                     round
                     style="margin-right: 157px;"
                     @click="Reject">驳回</el-button>
          <el-button type="primary"
                     round
                     @click="adopt">通过</el-button>
        </div>
      </div>
    </el-dialog>
    <!--收入明细的对话框-->
    <income-dialog :Visible="Visible"
                   title="收入明细"
                   @close="incomeClose">
      <div class="slot"
           style="margin-bottom: 40px;">
        <div>
          <a href="javascript:;"
             @click="materie($event,1)"
             :class="index==1?'color':''">物料收入</a>
        </div>
        <div>
          <a href="javascript:;"
             @click="materie($event,2)"
             :class="index==2?'color':''">邦保养收入</a>
        </div>
      </div>
      <div :is="incomelList"
           @materielPage="materielPage"
           :gid="gid"
           :materielData="materielData"
           :materielCount="materielCount"
           style="margin-top: 20px;"></div>
    </income-dialog>
    <div class="page_center"
         v-show="pageCount&&pageCount>1">
      <paging :page-count="pageCount"
              v-show="list&&list.length>0"
              :page="page"
              @index="paging"></paging>
      <!--分页的组件-->
    </div>
  </div>
</template>
<script>
import incomeDialog from "@/components/Dialog/Dialog"
import materielList from "@/components/MunicipalAgent/capital/capitalList/materielList"
import MaintenanceList from "@/components/MunicipalAgent/capital/capitalList/MaintenanceList"
export default {
  data () {
    return {
      Visible: false,
      token: window.sessionStorage.getItem("bbytoken"),
      list: [], //申请列表数据
      page: 1, //当前页
      PutforwardPage: 1, //提现明细当前页
      pageCount: 1, //总页数
      PutforwardpageCount: 1, //提现明细总页数
      Putforward: [], //提现明细数据
      centerDialogVisible: false, //点击提现明细显示Dialog对话框
      Toexamine: false, //点击审核显示Dialog对话框
      Auditdetails: [], //审核详情数据
      gid: "", //市级代理id
      reason: "", //驳回理由
      OrderID: "", //订单id
      agentPhone: "", //市级代理手机号
      incomelList: "materielList",
      index: 1,
      materielData: [],
      materielpage: 1,
      materielCount: 1,
      url: 'supply/matPrice'
    }
  },
  components: {
    incomeDialog,
    materielList,
    MaintenanceList
  },
  created () {
    this.init()

  },
  methods: {
    /*当前页发生改变时执行的*/
    paging (e) {
      this.page = e;
      this.init()
    },
    /*关闭对话框清空数据*/
    close () {
      this.Putforward = []
      this.PutforwardPage = 1,
        this.PutforwardpageCount = 1
    },
    DetailedPaging (e) {
      this.PutforwardPage = e;
      this.PutForward(this.gid)
    },
    details () {
      var id = this.$route.query.id;
      this.$router.push({
        path: "/MunicipalAgent/materiel/materiel/DetailsPage",
        query: {
          id: id,
          is: true
        }
      })
    },
    init () {
      this.$axios.post("supply/forApply", {
        token: this.token,
        page: this.page
      }).then(res => { //申请列表

        if (res.data.code == 1) {

          this.list = res.data.data.list
          this.pageCount = res.data.data.rows

        } else {
          layer.msg(res.data.msg, {
            time: 1000
          })
        }
      }).catch(err => {
        throw (err)
      })
    },
    /*鼠标移入*/
    hoverColor (e) {
      e.currentTarget.className = "hoveColor"
    },
    /*鼠标移出*/
    removeColor (e) {
      e.currentTarget.className = "primary"
    },
    See () {
      this.centerDialogVisible = true
    },
    materielPage (e) {
      this.materielpage = e;

      this.income(this.gid)
    },
    /*自定义请求事件,在某个需要请求的地方调用*/
    request (url, id, materielpage) {
      this.$axios.post(url, {
        token: this.token,
        gid: id,
        page: materielpage
      }).then(res => {

        if (res.data.code == 1) {
          this.materielData = res.data.data.list;
          this.materielCount = res.data.data.rows;
        }
      }).catch(err => {
        throw (err)
      })
    },
    /*	点击收入明细后的操作*/
    income (id) {
      this.Visible = true,
        this.gid = id;
      this.request(this.url, this.gid, this.materielpage)
    },
    // 关闭Dialog对话框的操作
    incomeClose () {
      this.Visible = false
      this.materielpage = 1
      this.materielCount = 1
      this.index = 1
      this.incomelList = "materielList"
      this.url = 'supply/matPrice'

    },
    /*点击调用某个组件*/
    materie (e, index) {
      if (index == 1) {
        this.materielpage = 1  //index等于1的时候当前分页等于1
        this.incomelList = "materielList" //index等于1的时候使用materielList的组件
        this.index = 1

        this.url = "supply/matPrice" //等于1的时候,请求的路径supply/matPrice
        this.request(this.url, this.gid, this.materielpage) //index等于1的时候请求接口
      } else {
        this.materielpage = 1 //index等于2的时候(同上)
        this.incomelList = "MaintenanceList" //index等于2的时候(同上)
        this.index = 2

        this.url = "supply/cardProce" //等于1的时候,请求的路径supply/matPrice
        this.request(this.url, this.gid, this.materielpage) //index等于2的时候(同上)
      }
    },
    /*	资金提现明细请求的接口*/
    PutForward (id) {
      this.centerDialogVisible = true
      this.gid = id;
      this.$axios.post("supply/putForward", {
        token: this.token,
        page: this.PutforwardPage,
        gid: id
      }).then(res => { //

        if (res.data.code == 1) {

          this.Putforward = res.data.data.list
          this.PutforwardpageCount = res.data.data.rows;
        }
      }).catch(err => {
        throw (err)
      })
    },
    /*资金提现 -----审核详情的接口*/
    ToExamine (id, phone) {
      this.Toexamine = true
      this.OrderID = id;
      this.agentPhone = phone
      this.$axios.post("supply/auditList", {
        token: this.token,
        phone: phone,
        id: id
      }).then(res => {

        if (res.data.code == 1) {

          this.Auditdetails = res.data.data
        }
      }).catch(err => {
        throw (err)
      })
    },
    /*点击驳回*/
    Reject () {
      if (!this.reason) {
        layer.msg("请输入驳回理由!", {
          time: 1000
        })
        return;
      }
      this.$axios.post("supply/forRej", {
        token: this.token,
        reason: this.reason,
        id: this.OrderID,
        phone: this.agentPhone
      }).then(res => { //资金提现 -----驳回操作
        if (res.data.code == 1) {
          var that = this
          layer.msg(res.data.msg, {
            item: 1000
          }, function () {
            that.$router.push({
              path: "/MunicipalAgent/capital/capital/Reject",
              query: {
                id: that.$route.query.id
              }
            })
          })
        }
      }).catch(err => {
        throw (err)
      })

    },
    /*点击通过*/
    adopt () {
      this.$axios.post("supply/forAdopt", {
        token: this.token,
        id: this.OrderID,
        phone: this.agentPhone
      }).then(res => {

        //						if(res.data.code == 1) {

        var that = this;

        layer.msg('通过成功', { item: 500 }, function () {
          that.$router.push({ path: "/MunicipalAgent/capital/capital/adopt", query: { id: that.$route.query.id } })
        })

        //						}
      }).catch(err => {
        throw (err)
      })
    }

  }
}
</script>
<style scoped>
.hoveColor {
  opacity: 0.5;
}

.primary {
  color: #04bbfc;
}

.Reason {
  display: flex;
  margin-top: 30px;
}

.color {
  color: #333333 !important;
}

textarea {
  resize: none;
  width: 80%;
  height: 150px;
  margin-left: 10px;
}

.examine {
  padding: 0 30px;
}

.examine > ul {
  width: 100%;
  margin-top: 60px;
  border-bottom: 1px dashed #04bbfc;
}

.examine > ul > li {
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
}

.Reason {
  display: flex;
}

.Reason > input {
  border: none;
  border-bottom: 1px solid rgba(216, 216, 216, 1);
  padding-bottom: 5px;
}

.btn {
  text-align: center;
  margin-top: 70px;
}

.slot > div {
  width: 50%;
  float: left;
  text-align: center;
}

.slot a {
  color: #999999;
}
</style>
<style>
</style>
