<template>
  <div>
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
        <div class="quote-ele"><i></i>配送中心-车补提现</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>配送中心</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>提现金额</th>
            <th>账户信息</th>
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
            <td>{{item.money}}</td>
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
                    <span>{{item.bank_name}}</span>
                  </div>
                  <div>
                    <span>开户行: </span>
                    <span>{{item.bank}}</span>
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
            <td>{{item.create_time}}</td>
            <td>
              <!-- <a href="javascript:;"
                 @click="income(item.aid)">收入明细</a>
              <a href="javascript:;"
                 @click="withdraw(item.aid)">提现明细</a> -->
              <a href="javascript:;"
                 @click="check(item.aid,item.phone,item.id,item.types)">审核</a>
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
        <!--分页的组件-->
      </div>
    </div>
    <div class="laybox"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>收入类型</th>
            <th>收入金额</th>
            <th>收入时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in incomelist"
              :key="index">
            <td>配送费</td>
            <td>{{item.amount}}</td>
            <td>{{item.create_time}}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="laybox1"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>提现金额</th>
            <th>账户剩余</th>
            <th>提现时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in withlist"
              :key="index">
            <td>{{item.money}}</td>
            <td>{{item.sur_amount}}</td>
            <td v-if="item.audit_time!=''">{{item.audit_time|datetime}}</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->

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
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      list: [],
      pagearr: [1],
      pagearr1: [1],
      index1: 1,
      index2: 1,
      incomelist: [],
      withlist: [],
      obj: {},
      reason: '',
      id: '',
      aid: '',
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      transferPhone: '13811959239', //转账电话
    }
  },
  methods: {
    go: page.go,
    first: page.first,
    end: page.end,
    prev: page.prev,
    next: page.next,
    showpage: page.showpage,
    goto1: function (i) {
      this.index1 = i;
    },
    goto2: function (i) {
      this.index2 = i;
    },
    paging (e) {
      this.page = e;
      this.init()
    },
    init: function () {
      this.$axios.post('admin/AgentForward/waitList', {
        token: this.token,
        page: this.page
      })
        .then(res => {
          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows;
          } else {
            this.list = res.data.data.list
            layer.msg(res.data.msg)
          }
        })
        .catch(err => { })
    },
    income: function (aid) {
      this.pagearr = [];
      this.$axios.post('admin/AgentForward/incomeList', {
        token: this.token,
        aid: aid,
        page: this.index1
      })
        .then(res => {

          this.incomelist = res.data.data.list;
          for (var i = 0; i < res.data.data.rows; i++) {
            this.pagearr.push(i + 1);
          }
          if (res.data.data.list)
            layer.open({
              type: 1,
              area: ['50%', '60%'],
              title: ['收入明细', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1, //怎么显示 ×
              content: $('.laybox')
            })
          else layer.msg(res.data.msg)
        }).catch(err => { })
    },
    withdraw: function (aid) {
      this.pagearr1 = [];
      this.$axios.post('admin/AgentForward/forwardList', {
        token: this.token,
        aid: aid,
        page: this.index2
      })
        .then(res => {
          this.withlist = res.data.data.list;
          for (var i = 0; i < res.data.data.rows; i++) {
            this.pagearr1.push(i + 1);
          }
          if (res.data.data.list)
            layer.open({
              type: 1,
              area: ['50%', '60%'],
              title: ['提现明细', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1, //怎么显示 ×
              content: $('.laybox1')
            })
          else layer.msg(res.data.msg);
        }).catch(err => { })
    },
    check: function (aid, phone, id, types) {
      this.id = id;
      this.$axios.post('admin/AgentForward/audit', {
        token: this.token,
        phone: phone,
        aid: aid,
        types: types
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
    reject: function () {  //驳回
      var obj1 = this.obj;
      obj1 = {
        id: this.id,
        aid: this.obj.aid,
        money: this.obj.now_money,
        reason: this.reason,
        token: this.token,
        create_time: this.obj.create_time,
        phone: this.obj.phone
      }
      this.$axios.post('admin/AgentForward/reject', obj1)
        .then(res => {
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            layer.closeAll()
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => console.log(err))
    },
    pass: function () {  //通过
      this.$axios.post('admin/AgentForward/adopt', {
        token: this.token,
        id: this.id,
        phone: this.obj.phone,
        main_phone: this.transferPhone
      })
        .then(res => {
          if (res.data.code == 1) {
            layer.closeAll();
            layer.msg(res.data.msg);
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          alert(err);
        })
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
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].son) {
                if (arr[i].name == '车补提现') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '申请列表' && arr[i].name == '车补提现') {
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
    }
  },
  mounted () {
    this.Auth()
  },
  created () {
    this.init();
  },
  watch: {
    index: function () {
      this.init();
    },
    index1: function () {
      this.income(aid);
    },
    index2: function () {
      this.withdraw(aid);
    }
  }
}
</script>
<style scoped>
.laybox2 ul {
  margin: 33px auto 33px auto;
  border-bottom: 1px dashed #04bbfc;
}
.laybox {
  overflow: auto;
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
.transferPhone {
  width: 70%;
  border-bottom: 1px solid #e6e6e6;
}
.transferPhone >>> .el-input__inner {
  border: none !important;
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
</style>