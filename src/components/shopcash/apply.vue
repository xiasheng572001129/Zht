<template>
  <div>
    <ctbHead>
      <!--<router-link :to="{name:'shoplist_list'}">汽修厂列表</router-link>-->
      <!--<router-link :to="{name:'shopcash_apply'}" class="cur">汽修厂提现</router-link>-->
      <!--<router-link :to="{name:'shoplist_close'}">关停列表</router-link>-->
      <!--<router-link :to="{name:'shoplist_cancel'}">取消合作</router-link>-->
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>维修厂提现</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
        </div>
      </div>
      <table class="table"
             style="width: 100%">
        <thead>
          <tr>
            <th>维修厂</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>提现金额</th>
            <th>申请时间</th>
            <th>账户信息</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.money}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <el-popover placement="bottom"
                          title="账户信息详情"
                          width="300"
                          trigger="click">
                <el-button slot="reference"
                           type="text">详情</el-button>
                <div>
                  <div>
                    <span>开户名: </span>
                    <span>{{item.account_name}}</span>
                  </div>
                  <div>
                    <span>开户行: </span>
                    <span>{{item.bank_name}}</span>
                  </div>
                  <div>
                    <span>开户分行: </span>
                    <span>{{item.branch}}</span>
                  </div>
                  <div>
                    <span>银行卡号: </span>
                    <span>{{item.account}}</span>
                  </div>
                </div>
              </el-popover>
            </td>
            <td>
              <a href="javascript:;"
                 @click="income(item.sid)">收入明细</a>
              <a href="javascript:;"
                 @click="withdraw(item.sid)">提现明细</a>
              <a href="javascript:;"
                 @click="check(item.sid,item.phone)">审核</a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">

        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>
    <div class="laybox"
         style="display:none;height: 100%;">
      <!--<div class="quote-nav">-->
      <!--<a href="javascript:;" :class="{'cur':y==1}" @click="bang">邦保养收入</a>-->
      <!--<a href="javascript:;" :class="{'cur':y==2}" @click="exchange">兑换收入</a>-->
      <!--</div>-->

      <el-tabs style="padding:0 20px;height: 100%;width: 100%;"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="邦保养收入"
                     name="first"
                     style="width:100%;height: 100%;position: relative;">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 50%;">收入金额</th>
                <th>收入时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in incomelist">
                <td>{{item.total}}</td>
                <td>{{item.create_time}}</td>
              </tr>
            </tbody>
          </table>
          <div class="ele-page">
            <el-pagination background
                           @prev-click="prev"
                           @next-click="next"
                           @current-change="current"
                           layout="prev, pager, next,jumper,total,->"
                           :page-count="totalpage">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="好评奖励"
                     name="second">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 50%;">奖励金额</th>
                <th>奖励时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in changeList">
                <td>{{item.money}}</td>
                <td>{{item.create_time}}</td>
              </tr>
            </tbody>
          </table>
          <div class="ele-page">
            <el-pagination background
                           @prev-click="prev"
                           @next-click="next"
                           @current-change="current"
                           layout="prev, pager, next,jumper,total,->"
                           :page-count="totalpage">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成长基金"
                     name="third">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 50%;">成长基金</th>
                <th>获取时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in moneyList">
                <td>{{item.grow_up}}</td>
                <td>{{item.create_time}}</td>
              </tr>
            </tbody>
          </table>
          <div class="ele-page">
            <el-pagination background
                           @prev-click="prev"
                           @next-click="next"
                           @current-change="current"
                           layout="prev, pager, next,jumper,total,->"
                           :page-count="totalpage">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="laybox1"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>提现时间</th>
            <th>提现金额</th>
            <th>账户剩余</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in withlist">
            <td>{{item.audit_time | datetime }}</td>
            <td>{{item.money}}</td>
            <td v-if="item.sur_money!=''">{{item.audit_time}}</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
      <div class="page_center">

        <paging :page-count="tpageCount"
                :page="tPage"
                @index="Tpaging"></paging>
      </div>
      <!-- 分页 -->
      <!--<div class="page-nav">-->
      <!--<a href="javascript:;" v-for="i in pagearr1"-->
      <!--:class="{cur:index2==i}" @click='goto2(i)'>{{i}}</a>-->
      <!--</div>-->
    </div>
    <div class="laybox2"
         style="display:none">
      <ul>
        <li>上次提现时间：{{obj.old_time}}</li>
        <li>上次提现金额：{{obj.old_money}}</li>
        <li>本次提现金额：{{obj.now_money}}</li>
        <li>本次账户剩余：{{obj.now_amount}}</li>
        <li>申请时间：{{obj.create_time}}</li>
        <li>
          转账电话:
          <el-input class="transferPhone"
                    v-model="transferPhone" />
        </li>
      </ul>
      <div class='bot t-c'>
        驳回理由:<input type="text"
               placeholder="请输入驳回理由"
               name="reason"
               v-model="reason">
        <button class="reject"
                @click="reject">驳回</button>
        <button class='pass'
                @click="pass">通过</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      zpage: 1,
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      tPage: 1,
      tpageCount: 1,
      incomelist: [],
      withlist: [],
      changeList: [],
      moneyList: [],
      obj: {},
      reason: '',
      id: '',
      activeName: 'first',
      page1: 1,
      totalpage1: 1,
      page2: 1,
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      pageCount: 1,
      transferPhone: '13811959239', //转账电话
    }
  },
  methods: {
    //邦保养收入
    prev1: function (e) {
      this.page1 = e;
    },
    next1: function (e) {
      this.page1 = e;
    },
    current1: function (e) {
      this.page1 = e;
    },
    prev: function (e) {
      this.page = e;
      if (this.activeName == 'first') {
        this.bang();
      }
      if (this.activeName == 'second') {
        this.exchange();
      }
      if (this.activeName == 'third') {
        this.money();
      }

    },
    next: function (e) {
      this.page = e;
      if (this.activeName == 'first') {
        this.bang();
      }
      if (this.activeName == 'second') {
        this.exchange();
      }
      if (this.activeName == 'third') {
        this.money();
      }
    },
    current: function (e) {
      this.page = e;
      if (this.activeName == 'first') {
        this.bang();
      }
      if (this.activeName == 'second') {
        this.exchange();
      }
      if (this.activeName == 'third') {
        this.money();
      }
    },
    paging (e) {
      this.zpage = e;
      this.init()
    },
    Tpaging (e) {
      this.tPage = e;
      this.withdraw()
    },
    //邦保养收入
    income: function (sid) {
      this.sid = sid;
      this.$axios.post('admin/ShopForward/bangList', {
        token: this.token,
        sid: sid,
        page: this.page
      })
        .then(res => {
          this.incomelist = res.data.data.list;
          this.totalpage = res.data.data.rows;
          layer.open({
            type: 1,
            area: ['80%', '80%'],
            title: ['收入明细', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
            shadeClose: true,
            shade: 0.8,
            closeBtn: 1, //怎么显示 ×
            content: $('.laybox')
          })
        }).catch(err => { })
    },
    //获取申请列表数据
    init () {
      this.$axios.post('admin/ShopForward/waitList', {
        token: this.token,
        page: this.zpage
      })
        .then(res => {
          this.list = res.data.data.list || []
          this.pageCount = res.data.data.rows || 0;
        })
        .catch(err => console.log(err))
    },
    handleClick (tab, event) {

      if (event.target.innerHTML == '邦保养收入') {
        this.activeName = 'first';
        this.page = 1;
        this.bang();
      }
      if (event.target.innerHTML == '好评奖励') {
        this.activeName = 'second';
        this.page = 1;
        this.exchange();
      }
      if (event.target.innerHTML == '成长基金') {
        this.activeName = 'third';
        this.page = 1;
        this.money();
      }
    },
    bang: function () {

      this.$axios.post('admin/ShopForward/bangList', {
        token: this.token,
        sid: this.sid,
        page: this.page
      })
        .then(res => {


          this.incomelist = res.data.data.list;
          this.totalpage = res.data.data.rows;
        }).catch(err => { })
    },
    //好评奖励
    exchange: function () {

      this.$axios.post('admin/ShopForward/praise', {
        token: this.token,
        sid: this.sid,
        page: this.page
      })
        .then(res => {

          this.changeList = res.data.data.list;
          this.totalpage = res.data.data.rows;
        }).catch(err => { })
    },
    //成长基金
    money: function () {

      this.$axios.post('/admin/ShopForward/rewardFund', {
        token: this.token,
        sid: this.sid,
        page: this.page
      })
        .then(res => {

          this.moneyList = res.data.data.list;
          this.totalpage = res.data.data.rows;
        }).catch(err => { })
    },
    //提现明细
    withdraw: function (sid) {

      this.$axios.post('admin/ShopForward/forwardList', {
        token: this.token,
        sid: sid,
        page: this.page
      })
        .then(res => {

          this.withlist = res.data.data.list;
          this.tpageCount = res.data.data.rows;
          layer.open({
            type: 1,
            area: ['50%', '60%'],
            title: ['提现明细', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            closeBtn: 1, //怎么显示 ×
            content: $('.laybox1')
          })
        }).catch(err => { })
    },
    //审核
    check: function (sid, phone) {
      this.reason = '';
      this.$axios.post('admin/ShopForward/auditList', {
        token: this.token,
        phone: phone,
        sid: sid

      })
        .then(res => {

          this.obj = res.data.data;
          layer.open({
            type: 1,
            area: ['50%', '60%'],
            title: ['审核', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            closeBtn: 1, //怎么显示 ×
            content: $('.laybox2')
          })
        })
    },
    //驳回
    reject: function () {

      if (this.reason.length == 0) {
        layer.alert('请输入驳回理由！');
        return;
      }
      var obj1 = {
        create_time: this.obj.create_time,
        token: this.token,
        phone: this.obj.phone,
        id: this.obj.id,
        reason: this.reason,
        sid: this.obj.sid,
        money: this.obj.now_money
      }
      this.$axios.post('admin/ShopForward/reject', obj1)
        .then(res => {

          layer.closeAll();
          layer.msg(res.data.msg);
        })
        .catch(err => console.log(err))
    },
    //通过
    pass: function () {
      if (this.reason.length != 0) {
        layer.msg('操作不合法，请删除驳回理由！');
        return;
      }
      this.$axios.post('admin/ShopForward/adopt', {
        token: this.token,
        phone: this.obj.phone,
        id: this.obj.id,
        main_phone: this.transferPhone
      })
        .then(res => {
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
            layer.closeAll();
          } else {
            layer.alert(res.data.msg);
          }

        })
        .catch(err => {
          alert(err);
        })
    }
  },

  mounted () {
    this.init();
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
              if (arr[i].name == '维修厂提现') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;

              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '申请列表' && arr[i].name == '维修厂提现') {
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
    }
  }
}
</script>
<style scoped>
.transferPhone {
  width: 70%;
  border-bottom: 1px solid #e6e6e6;
}
.transferPhone >>> .el-input__inner {
  border: none !important;
}
.laybox2 ul {
  margin: 33px auto 33px auto;
  border-bottom: 1px dashed #04bbfc;
}

.laybox2 {
  padding: 0 35px;
  font-size: 16px;
}

.laybox2 li {
  width: 300px;
  text-align: left;
  margin: 33px auto;
}

div.bot {
  margin: 45px auto 35px auto;
}

div.bot input {
  display: inline-block;
  width: 85%;
  outline: none;
  border: none;
  border-bottom: 1px solid #aaa;
  margin-left: 11px;
}

div.bot button {
  margin-top: 38px;
  width: 110px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
  border: none;
  color: white;
}

button.reject {
  background: rgba(237, 81, 55, 1);
  margin-right: 30%;
}

button.pass {
  background-color: #20a0ff;
}

.ele-page {
  position: absolute;
  bottom: -100px;
  width: 100%;
  text-align: center;
}
</style>
<style>
.el-tabs__content {
  overflow: visible !important;
}

.laybox ul {
  padding-left: 0 !important;
  margin-top: 0 !important;
  display: inline-block;
  border: none !important;
}
</style>