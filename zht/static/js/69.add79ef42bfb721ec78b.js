webpackJsonp([69],{VAFk:function(n,t,e){var a=e("kha1");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("337be260",a,!1,{})},XtJY:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("woOf"),i=e.n(a),s=e("Dd8w"),o=e.n(s),r=(e("E7z3"),{data:function(){return{page:1,totalpage:1,pageCount:1,index:1,endpage:1,arr:[],n:1,list:[],pagearr:1,pagearr1:1,index1:1,index2:1,incomelist:[],withlist:[],obj:{},reason:"",id:"",aid:"",token:window.sessionStorage.getItem("bbytoken"),authList:[],curId:0,threeAuthList:[],seCurId:0,thCurId:0,currentIndex:"",Trial_open:"",unionId:"",sunionId:"",centerDialogVisible:!1,centerDialogVisible1:!1}},methods:{paging:function(n){this.page=n,this.init()},paging1:function(n){this.index1=n,this.income(this.sunionId)},paging2:function(n){this.index2=n,this.withdraw(this.unionId)},init:function(){var n=this;this.$axios.post("admin/BalanceForward/list",{token:this.token,page:this.page}).then(function(t){1==t.data.code?(n.list=t.data.data.list,n.pageCount=t.data.data.rows):(layer.msg(t.data.msg),n.list=[])}).catch(function(n){})},income:function(n){var t=this;this.sunionId=n,this.$axios.post("admin/BalanceForward/incomeDetails",{token:this.token,unionId:n,page:this.index1}).then(function(n){1==n.data.code?(t.centerDialogVisible=!0,t.incomelist=n.data.data.list,t.pagearr=n.data.data.rows):layer.msg(n.data.msg)}).catch(function(n){})},withdraw:function(n){var t=this;this.unionId=n,this.$axios.post("admin/BalanceForward/presentationDetails",{token:this.token,unionId:n,page:this.index2}).then(function(n){1==n.data.code?(t.centerDialogVisible1=!0,t.withlist=n.data.data.list,t.pagearr1=n.data.data.rows):layer.msg(n.data.msg)}).catch(function(n){})},check:function(n,t,e){var a=this;this.$axios.post("admin/BalanceForward/adoptDetail",{token:this.token,unionId:t,money:e}).then(function(n){a.obj=n.data.data,a.Trial_open=layer.open({type:1,area:["50%","60%"],title:["审核","height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;"],shadeClose:!0,shade:.8,closeBtn:1,content:$(".laybox2")})})},reject:function(){var n=this,t=o()({},this.list[this.currentIndex]),e=t.unionId,a=t.id,s=t.phone,r=t.name,d=t.create_time,l=t.money,c=i()({token:this.token,reason:this.reason},{unionId:e,id:a,phone:s,user:r,create_time:d,money:l});if(this.reason){parent.layer.getFrameIndex(window.name);this.$axios.post("admin/BalanceForward/reject",c).then(function(t){1==t.data.code?(layer.msg(t.data.msg,{time:1500},function(){layer.close(n.Trial_open)}),n.init()):layer.msg(t.data.msg)}).catch(function(n){return console.log(n)})}else layer.msg("驳回理由不能为空")},pass:function(){var n=this,t=o()({},this.list[this.currentIndex]),e=t.id,a=t.phone,s=t.unionId,r=t.name,d=i()({token:this.token},{id:e,phone:a,unionId:s,name:r});this.$axios.post("admin/BalanceForward/adoptPost",d).then(function(t){1==t.data.code?(layer.closeAll(),layer.msg(t.data.msg),n.init()):layer.msg(t.data.msg)}).catch(function(n){alert(n)})}},mounted:function(){var n=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){for(var e=t.data.data,a=0;a<e.length;a++)e[a].son&&"余额提现"==e[a].name&&(n.seCurId=e[a].id,n.threeAuthList=e[a].son);n.authList=e}else n.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(n){alert(n)})},created:function(){this.init()}}),d=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("ctbHead",n._l(n.authList,function(t){return e("router-link",{key:t.id,class:n.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:n.curId}},"v-key":t.id}},[n._v("\n      "+n._s(t.name)+"\n    ")])}),1),n._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"quote"},[n._m(0),n._v(" "),e("div",{staticClass:"quote-nav"},n._l(n.threeAuthList,function(t){return e("router-link",{key:t.id,class:n.thCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:n.curId}}}},[n._v("\n          "+n._s(t.name)+"\n        ")])}),1)]),n._v(" "),e("table",{staticClass:"table"},[n._m(1),n._v(" "),e("tbody",n._l(n.list,function(t,a){return e("tr",{key:a},[e("td",[n._v(n._s(t.odd_number))]),n._v(" "),e("td",{staticClass:"t-l"},[n._v(n._s(t.name))]),n._v(" "),e("td",[n._v(n._s(t.phone))]),n._v(" "),e("td",[n._v(n._s(t.money))]),n._v(" "),e("td",[n._v(n._s(t.create_time))]),n._v(" "),e("td",{style:[{color:0==t.audit_status?"#04BBFC":1==t.audit_status?"#0ACD00":"#FA644B"}]},[n._v(n._s(0==t.audit_status?"未审核":1==t.audit_status?"已通过":"已驳回"))]),n._v(" "),e("td",[n._v(n._s(t.reason))]),n._v(" "),e("td",[n._v(n._s(t.audit_time))]),n._v(" "),e("td",[n._v(n._s(t.audit_person))]),n._v(" "),e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return n.income(t.unionId)}}},[n._v("收入明细")]),n._v(" "),e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return n.withdraw(t.unionId)}}},[n._v("提现明细")]),n._v(" "),e("a",{directives:[{name:"show",rawName:"v-show",value:0==t.audit_status,expression:"item.audit_status==0"}],attrs:{href:"javascript:;"},on:{click:function(e){return n.check(n.currentIndex=a,t.unionId,t.money)}}},[n._v("审核")])])])}),0)]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.pageCount&&n.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[e("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1)]),n._v(" "),e("el-dialog",{attrs:{title:"收入明细",visible:n.centerDialogVisible,center:""},on:{"update:visible":function(t){n.centerDialogVisible=t}}},[e("table",{staticClass:"table"},[e("thead",[e("tr",[e("th",[n._v("收入类型")]),n._v(" "),e("th",[n._v("收入金额")]),n._v(" "),e("th",[n._v("收入时间")]),n._v(" "),e("th",[n._v("提现状态")])])]),n._v(" "),e("tbody",n._l(n.incomelist,function(t){return e("tr",[e("td",[n._v(n._s(1==t.type?"直推奖励":2==t.type?"间退奖励":"中心奖励"))]),n._v(" "),e("td",[n._v(n._s(t.money))]),n._v(" "),e("td",[n._v(n._s(t.create_time))]),n._v(" "),e("td",[n._v(n._s(0==t.cash_status?"未提现":1==t.cash_status?"已提现":2==t.cash_status?"提现审核中":"提现驳回"))])])}),0)]),n._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("paging",{attrs:{"page-count":n.pagearr,page:n.index1},on:{index:n.paging1}})],1)]),n._v(" "),e("el-dialog",{attrs:{title:"提现明细",visible:n.centerDialogVisible1,center:""},on:{"update:visible":function(t){n.centerDialogVisible1=t}}},[e("table",{staticClass:"table"},[e("thead",[e("tr",[e("th",[n._v("提现订单号")]),n._v(" "),e("th",[n._v("提现金额")]),n._v(" "),e("th",[n._v("提现时间")])])]),n._v(" "),e("tbody",n._l(n.withlist,function(t){return e("tr",[e("td",[n._v(n._s(t.odd_number))]),n._v(" "),e("td",[n._v(n._s(t.money))]),n._v(" "),""!=t.audit_time?e("td",[n._v(n._s(t.audit_time))]):e("td",[n._v("--")])])}),0)]),n._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("paging",{attrs:{"page-count":n.pagearr1,page:n.index2},on:{index:n.paging2}})],1)]),n._v(" "),e("div",{staticClass:"laybox2",staticStyle:{display:"none"}},[e("ul",[e("li",[n._v("上次提现时间："+n._s(n.obj.audit_time))]),n._v(" "),e("li",[n._v("上次提现金额："+n._s(n.obj.last_money))]),n._v(" "),e("li",[n._v("本次提现金额："+n._s(n.obj.money))])]),n._v(" "),e("div",{staticClass:"bot t-c"},[n._v("\n      驳回理由:"),e("input",{directives:[{name:"model",rawName:"v-model",value:n.reason,expression:"reason"}],attrs:{type:"text",placeholder:"请输入驳回理由",name:"reason"},domProps:{value:n.reason},on:{input:function(t){t.target.composing||(n.reason=t.target.value)}}}),n._v(" "),e("button",{staticClass:"reject",on:{click:n.reject}},[n._v("驳回")]),n._v(" "),e("button",{staticClass:"pass",on:{click:n.pass}},[n._v("通过")])])])],1)};d._withStripped=!0;var l={render:d,staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"quote-ele"},[t("i"),this._v("邦保养-余额提现")])},function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("thead",[e("tr",[e("th",[n._v("提现编号")]),n._v(" "),e("th",[n._v("用户姓名")]),n._v(" "),e("th",[n._v("用户电话")]),n._v(" "),e("th",[n._v("提现金额")]),n._v(" "),e("th",[n._v("提现时间")]),n._v(" "),e("th",[n._v("提现状态")]),n._v(" "),e("th",[n._v("驳回理由")]),n._v(" "),e("th",[n._v("通过时间")]),n._v(" "),e("th",[n._v("审核人")]),n._v(" "),e("th",[n._v("操作")])])])}]},c=l;var h=!1;var u=e("VU/8")(r,c,!1,function(n){h||e("VAFk")},"data-v-9fbd545c",null);u.options.__file="src/pages/maintainVip/balance/list.vue";t.default=u.exports},kha1:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.laybox2 ul[data-v-9fbd545c] {\n  margin: 33px auto 33px auto;\n  border-bottom: 1px dashed #04bbfc;\n}\n.laybox2[data-v-9fbd545c] {\n  padding: 0 35px;\n  font-size: 16px;\n}\n.laybox2 li[data-v-9fbd545c] {\n  width: 300px;\n  text-align: left;\n  margin: 33px auto;\n}\ndiv.bot[data-v-9fbd545c] {\n  margin: 45px auto 35px auto;\n}\ndiv.bot input[data-v-9fbd545c] {\n  display: inline-block;\n  width: 85%;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #aaa;\n  margin-left: 11px;\n}\ndiv.bot button[data-v-9fbd545c] {\n  margin-top: 38px;\n  width: 110px;\n  height: 36px;\n  border-radius: 18px;\n  -webkit-box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n          box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n  border: none;\n  color: white;\n}\nbutton.reject[data-v-9fbd545c] {\n  background: rgba(237, 81, 55, 1);\n  margin-right: 30%;\n}\nbutton.pass[data-v-9fbd545c] {\n  background-color: #20a0ff;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/maintainVip/balance/src/pages/maintainVip/balance/list.vue"],names:[],mappings:";AAwWA;EACA,4BAAA;EACA,kCAAA;CACA;AAEA;EACA,gBAAA;EACA,gBAAA;CACA;AAEA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;CACA;AAEA;EACA,4BAAA;CACA;AAEA;EACA,sBAAA;EACA,WAAA;EACA,cAAA;EACA,aAAA;EACA,8BAAA;EACA,kBAAA;CACA;AAEA;EACA,iBAAA;EACA,aAAA;EACA,aAAA;EACA,oBAAA;EACA,uDAAA;UAAA,+CAAA;EACA,aAAA;EACA,aAAA;CACA;AAEA;EACA,iCAAA;EACA,kBAAA;CACA;AAEA;EACA,0BAAA;CACA",file:"list.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>邦保养-余额提现</div>\n        <div class="quote-nav">\n          <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link>\n        </div>\n      </div>\n      <table class="table">\n        <thead>\n          <tr>\n            <th>提现编号</th>\n            <th>用户姓名</th>\n            <th>用户电话</th>\n            <th>提现金额</th>\n            <th>提现时间</th>\n            <th>提现状态</th>\n            <th>驳回理由</th>\n            <th>通过时间</th>\n            <th>审核人</th>\n            <th>操作</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="(item,index) in list"\n              :key="index">\n\n            <td>{{item.odd_number}}</td>\n            <td class="t-l">{{item.name}}</td>\n            <td>{{item.phone}}</td>\n\n            <td>{{item.money}}</td>\n            <td>{{item.create_time}}</td>\n            <td :style="[{color:item.audit_status==0 ? \'#04BBFC\' : item.audit_status==1 ? \'#0ACD00\' : \'#FA644B\'}]">{{item.audit_status==0 ? \'未审核\' : item.audit_status==1 ? \'已通过\' : \'已驳回\'}}</td>\n            <td>{{item.reason}}</td>\n            <td>{{item.audit_time}}</td>\n            <td>{{item.audit_person}}</td>\n            <td>\n              <a href="javascript:;"\n                 @click="income(item.unionId)">收入明细</a>\n              <a href="javascript:;"\n                 @click="withdraw(item.unionId)">提现明细</a>\n              <a href="javascript:;"\n                 @click="check(currentIndex=index,item.unionId,item.money)"\n                 v-show=\'item.audit_status==0\'>审核</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      \x3c!-- 分页 --\x3e\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n    <el-dialog title="收入明细"\n               :visible.sync="centerDialogVisible"\n               center>\n      <table class="table">\n        <thead>\n          <tr>\n            <th>收入类型</th>\n            <th>收入金额</th>\n            <th>收入时间</th>\n            <th>提现状态</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="item in incomelist">\n            <td>{{item.type==1 ? \'直推奖励\' : item.type==2 ? \'间退奖励\' : \'中心奖励\'}}</td>\n            <td>{{item.money}}</td>\n            <td>{{item.create_time}}</td>\n            <td>{{item.cash_status==0 ? \'未提现\' : item.cash_status==1 ? \'已提现\' : item.cash_status==2 ? \'提现审核中\' : \'提现驳回\'}}</td>\n          </tr>\n        </tbody>\n      </table>\n      <span slot="footer"\n            class="dialog-footer">\n        <paging :page-count="pagearr"\n                :page="index1"\n                @index="paging1"></paging>\n      </span>\n    </el-dialog>\n    <el-dialog title="提现明细"\n               :visible.sync="centerDialogVisible1"\n               center>\n      <table class="table">\n        <thead>\n          <tr>\n            <th>提现订单号</th>\n            <th>提现金额</th>\n            <th>提现时间</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="item in withlist">\n            <td>{{item.odd_number}}</td>\n            <td>{{item.money}}</td>\n            <td v-if="item.audit_time!=\'\'">{{item.audit_time}}</td>\n            <td v-else>--</td>\n          </tr>\n        </tbody>\n      </table>\n      <span slot="footer"\n            class="dialog-footer">\n        <paging :page-count="pagearr1"\n                :page="index2"\n                @index="paging2"></paging>\n      </span>\n    </el-dialog>\n\n    <div class="laybox2"\n         style="display:none">\n      <ul>\n        <li>上次提现时间：{{obj.audit_time}}</li>\n        <li>上次提现金额：{{obj.last_money}}</li>\n        <li>本次提现金额：{{obj.money}}</li>\n      </ul>\n      <div class=\'bot t-c\'>\n        驳回理由:<input type="text"\n               placeholder="请输入驳回理由"\n               name="reason"\n               v-model="reason">\n        <button class="reject"\n                @click="reject">驳回</button>\n        <button class=\'pass\'\n                @click="pass">通过</button>\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport page from \'@/components/common.js\';\nexport default {\n  data () {\n    return {\n      //分页数据\n      page: 1, //显示的页码数\n      totalpage: 1, //总页数\n      pageCount: 1,\n      index: 1, //点击的当前页，\n      endpage: 1, //当前一组页码的最大值\n      arr: [], //默认显示 1 2 3 4 5页\n      n: 1, //当前点击的页码的位置\n      list: [],\n      pagearr: 1,\n      pagearr1: 1,\n      index1: 1,\n      index2: 1,\n      incomelist: [],\n      withlist: [],\n      obj: {},\n      reason: \'\',\n      id: \'\',\n      aid: \'\',\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      authList: [],\n      curId: 0,\n      threeAuthList: [],\n      seCurId: 0,\n      thCurId: 0,\n      currentIndex: \'\',\n      Trial_open: \'\',\n      unionId: \'\',\n      sunionId: \'\',\n      centerDialogVisible: false,\n      centerDialogVisible1: false\n    }\n  },\n  methods: {\n\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    paging1 (e) {\n      this.index1 = e;\n\n      this.income(this.sunionId)\n    },\n    paging2 (e) {\n      this.index2 = e;\n      this.withdraw(this.unionId)\n    },\n    init: function () {\n      this.$axios.post(\'admin/BalanceForward/list\', {\n        token: this.token,\n        page: this.page\n      })\n        .then(res => {\n\n          if (res.data.code == 1) {\n            this.list = res.data.data.list;\n\n            this.pageCount = res.data.data.rows;\n          } else {\n            layer.msg(res.data.msg)\n            this.list = []\n          }\n        })\n        .catch(err => { })\n    },\n    income: function (unionId) {\n      this.sunionId = unionId\n\n      this.$axios.post(\'admin/BalanceForward/incomeDetails\', {\n        token: this.token,\n        unionId: unionId,\n        page: this.index1\n      })\n        .then(res => {\n\n          if (res.data.code == 1) {\n            this.centerDialogVisible = true\n            this.incomelist = res.data.data.list;\n            this.pagearr = res.data.data.rows;\n          } else {\n            layer.msg(res.data.msg)\n          }\n\n        }).catch(err => { })\n    },\n    withdraw: function (unionId) {\n      this.unionId = unionId\n      this.$axios.post(\'admin/BalanceForward/presentationDetails\', {\n        token: this.token,\n        unionId: unionId,\n        page: this.index2\n      })\n        .then(res => {\n          if (res.data.code == 1) {\n            this.centerDialogVisible1 = true\n            this.withlist = res.data.data.list;\n            this.pagearr1 = res.data.data.rows;\n          } else {\n            layer.msg(res.data.msg)\n          }\n        }).catch(err => { })\n    },\n    check: function (index, unionId, money) {\n      \n      this.$axios.post(\'admin/BalanceForward/adoptDetail\', {\n        token: this.token,\n        unionId: unionId,\n        money: money\n      })\n        .then(res => {\n\n          this.obj = res.data.data;\n          this.Trial_open = layer.open({\n            type: 1,\n            area: [\'50%\', \'60%\'],\n            title: [\'审核\', \'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;\'],\n            shadeClose: true,\n            shade: 0.8,\n            closeBtn: 1, //怎么显示 ×\n            content: $(\'.laybox2\')\n          })\n        })\n    },\n    reject: function () {\n      let { unionId, id, phone, name: user, create_time, money } = { ...this.list[this.currentIndex] }\n      let data = Object.assign({ token: this.token, reason: this.reason }, { unionId, id, phone, user, create_time, money })\n      if (!this.reason) {\n        layer.msg(\'驳回理由不能为空\')\n        return;\n      }\n      var index = parent.layer.getFrameIndex(window.name); //获取窗口索引 \n\n      this.$axios.post(\'admin/BalanceForward/reject\', data)\n        .then(res => {\n          if (res.data.code == 1) {\n\n            layer.msg(res.data.msg, { time: 1500 }, (() => {\n              layer.close(this.Trial_open);\n            }));\n            this.init()\n          } else {\n            layer.msg(res.data.msg)\n          }\n\n        })\n        .catch(err => console.log(err))\n    },\n    pass: function () {\n      let { id, phone, unionId, name } = { ...this.list[this.currentIndex] }\n      let data = Object.assign({ token: this.token }, { id, phone, unionId, name })\n      this.$axios.post(\'admin/BalanceForward/adoptPost\', data)\n        .then(res => {\n\n          if (res.data.code == 1) {\n            layer.closeAll();\n            layer.msg(res.data.msg);\n            this.init()\n          } else {\n            layer.msg(res.data.msg)\n          }\n        })\n        .catch(err => {\n          alert(err);\n        })\n    }\n  },\n  mounted () {\n    var id = this.$route.query.id;\n    this.curId = id;\n    this.$axios.post(\'admin/Auth/erAuth\', {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      id: id\n    })\n      .then(res => {\n\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            if (arr[i].son) {\n              if (arr[i].name == \'余额提现\') {\n                this.seCurId = arr[i].id;\n                this.threeAuthList = arr[i].son;\n\n              }\n\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n      .catch(err => {\n        alert(err);\n      })\n  },\n  created () {\n    this.init();\n  },\n\n}\n<\/script>\n<style scoped>\n.laybox2 ul {\n  margin: 33px auto 33px auto;\n  border-bottom: 1px dashed #04bbfc;\n}\n\n.laybox2 {\n  padding: 0 35px;\n  font-size: 16px;\n}\n\n.laybox2 li {\n  width: 300px;\n  text-align: left;\n  margin: 33px auto;\n}\n\ndiv.bot {\n  margin: 45px auto 35px auto;\n}\n\ndiv.bot input {\n  display: inline-block;\n  width: 85%;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #aaa;\n  margin-left: 11px;\n}\n\ndiv.bot button {\n  margin-top: 38px;\n  width: 110px;\n  height: 36px;\n  border-radius: 18px;\n  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n  border: none;\n  color: white;\n}\n\nbutton.reject {\n  background: rgba(237, 81, 55, 1);\n  margin-right: 30%;\n}\n\nbutton.pass {\n  background-color: #20a0ff;\n}\n</style>'],sourceRoot:""}])}});
//# sourceMappingURL=69.add79ef42bfb721ec78b.js.map