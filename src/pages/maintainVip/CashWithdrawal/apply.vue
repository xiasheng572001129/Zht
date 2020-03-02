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
        <div class="quote-ele"><i></i>UBI-资金提现</div>
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
            <th>订单号</th>
            <th>用户姓名</th>
            <th>用户电话</th>
            <th>提现金额</th>
            <th>申请时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td>{{item.odd_number}}</td>
            <td class="t-l">{{item.name}}</td>
            <td>{{item.phone}}</td>

            <td>{{item.money}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="income(item.unionId)">收入明细</a>
              <a href="javascript:;"
                 @click="withdraw(item.unionId)">提现明细</a>
              <a href="javascript:;"
                 @click="check(currentIndex=index,item.unionId,item.money)">审核</a>
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
    <el-dialog title="收入明细"
               :visible.sync="centerDialogVisible"
               center>
      <table class="table">
        <thead>
          <tr>
            <th>收入类型</th>
            <th>收入金额</th>
            <th>收入时间</th>
            <th>提现状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in incomelist">
            <td>{{item.type==1 ? '直推奖励' : item.type==2 ? '间退奖励' : '中心奖励'}}</td>
            <td>{{item.money}}</td>
            <td>{{item.create_time}}</td>
            <td>{{item.cash_status==0 ? '未提现' : item.cash_status==1 ? '已提现' : item.cash_status==2 ? '提现审核中' : '提现驳回'}}</td>
          </tr>
        </tbody>
      </table>
      <span slot="footer"
            class="dialog-footer">
        <paging :page-count="pagearr"
                :page="index1"
                @index="paging1"></paging>
      </span>
    </el-dialog>
    <el-dialog title="提现明细"
               :visible.sync="centerDialogVisible1"
               center>
      <table class="table">
        <thead>
          <tr>
            <th>提现订单号</th>
            <th>提现金额</th>
            <th>提现时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in withlist">
            <td>{{item.odd_number}}</td>
            <td>{{item.money}}</td>
            <td v-if="item.audit_time!=''">{{item.audit_time}}</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
      <span slot="footer"
            class="dialog-footer">
        <paging :page-count="pagearr1"
                :page="index2"
                @index="paging2"></paging>
      </span>
    </el-dialog>

    <div class="laybox2"
         style="display:none">
      <ul>
        <li>上次提现时间：{{obj.audit_time}}</li>
        <li>上次提现金额：{{obj.last_money}}</li>
        <li>本次提现金额：{{obj.money}}</li>
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
import page from '@/components/common.js';
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
      pagearr: 1,
      pagearr1: 1,
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
      currentIndex: '',
      Trial_open: '',
      unionId: '',
      sunionId: '',
      centerDialogVisible: false,
      centerDialogVisible1: false
    }
  },
  methods: {

    paging (e) {
      this.page = e;
      this.init()
    },
    paging1 (e) {
      this.index1 = e;

      this.income(this.sunionId)
    },
    paging2 (e) {
      this.index2 = e;
      this.withdraw(this.unionId)
    },
    init: function () {
      this.$axios.post('admin/UbiForward/apply', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;

            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
            this.list = []
          }
        })
        .catch(err => { })
    },
    income: function (unionId) {
      this.sunionId = unionId

      this.$axios.post('admin/UbiForward/incomeDetails', {
        token: this.token,
        unionId: unionId,
        page: this.index1
      })
        .then(res => {

          if (res.data.code == 1) {
            this.centerDialogVisible = true
            this.incomelist = res.data.data.list;
            this.pagearr = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
          }

        }).catch(err => { })
    },
    withdraw: function (unionId) {
      this.unionId = unionId

      this.$axios.post('admin/UbiForward/presentationDetails', {
        token: this.token,
        unionId: unionId,
        page: this.index2
      })
        .then(res => {
          if (res.data.code == 1) {
            this.centerDialogVisible1 = true
            this.withlist = res.data.data.list;
            this.pagearr1 = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
          }

        }).catch(err => { })
    },
    check: function (index, unionId, money) {
     
      this.$axios.post('admin/UbiForward/adoptDetail', {
        token: this.token,
        unionId: unionId,
        money: money
      })
        .then(res => {

          this.obj = res.data.data;
          this.Trial_open = layer.open({
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
    reject: function () {
      let { unionId, id, phone, name: user, create_time, money } = { ...this.list[this.currentIndex] }
      let data = Object.assign({ token: this.token, reason: this.reason }, { unionId, id, phone, user, create_time, money })
      if (!this.reason) {
        layer.msg('驳回理由不能为空')
        return;
      }
      var index = parent.layer.getFrameIndex(window.name); //获取窗口索引 

      this.$axios.post('admin/UbiForward/dismissalOperation', data)
        .then(res => {
          if (res.data.code == 1) {

            layer.msg(res.data.msg, { time: 1500 }, (() => {
              layer.close(this.Trial_open);
            }));
            this.init()
          } else {
            layer.msg(res.data.msg)
          }

        })
        .catch(err => console.log(err))
    },
    pass: function () {
      let { id, phone, unionId, name } = { ...this.list[this.currentIndex] }
      let data = Object.assign({ token: this.token }, { id, phone, unionId, name })
      this.$axios.post('admin/UbiForward/adoptPost', data)
        .then(res => {

          if (res.data.code == 1) {
            layer.closeAll();
            layer.msg(res.data.msg);
            this.init()
          } else {
            layer.msg(res.data.msg)
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  },
  mounted () {
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
              if (arr[i].name == 'UBI提现') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '申请列表' && arr[i].name == 'UBI提现') {
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
  created () {
    this.init();
  },

}
</script>
<style scoped>
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
</style>