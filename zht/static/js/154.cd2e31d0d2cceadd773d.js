webpackJsonp([154],{PsRJ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{page:1,totalpage:1,pageCount:1,index:1,endpage:1,arr:[],n:1,list:[],token:window.sessionStorage.getItem("bbytoken"),authList:[],curId:0,threeAuthList:[],seCurId:0,thCurId:0}},methods:{paging:function(t){this.page=t,this.init()},init:function(){var t=this;this.$axios.post("admin/UbiForward/adopt",{token:this.token,page:this.page}).then(function(e){1==e.data.code&&(t.list=e.data.data.list,t.pageCount=e.data.data.rows)}).catch(function(t){})}},mounted:function(){var t=this,e=this.$route.query.id;this.curId=e,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:e}).then(function(e){if(1==e.data.code){for(var a=e.data.data,n=0;n<a.length;n++)if(a[n].son){"UBI提现"==a[n].name&&(t.seCurId=a[n].id,t.threeAuthList=a[n].son);for(var i=0;i<a[n].son.length;i++)a[n].action!=a[n].son[i].action&&(a[n].action=a[n].son[0].action),"通过列表"==a[n].son[i].name&&"UBI提现"==a[n].name&&(t.thCurId=a[n].son[i].id)}t.authList=a}else t.$alert(e.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})},created:function(){this.init()},watch:{index:function(){this.init()}}},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ctbHead",t._l(t.authList,function(e){return a("router-link",{key:e.id,class:t.seCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:t.curId}},"v-key":e.id}},[t._v("\n      "+t._s(e.name)+"\n    ")])}),1),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"quote"},[t._m(0),t._v(" "),a("div",{staticClass:"quote-nav"},t._l(t.threeAuthList,function(e){return a("router-link",{key:e.id,class:t.thCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:t.curId}}}},[t._v("\n          "+t._s(e.name)+"\n        ")])}),1)]),t._v(" "),a("table",{staticClass:"table"},[t._m(1),t._v(" "),a("tbody",t._l(t.list,function(e){return a("tr",[a("td",[t._v(t._s(e.odd_number))]),t._v(" "),a("td",{staticClass:"t-l"},[t._v(t._s(e.name))]),t._v(" "),a("td",[t._v(t._s(e.phone))]),t._v(" "),a("td",[t._v(t._s(e.money))]),t._v(" "),a("td",[t._v(t._s(e.create_time))]),t._v(" "),a("td",[t._v(t._s(e.audit_time))]),t._v(" "),a("td",[t._v(t._s(e.audit_person))])])}),0)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.pageCount&&t.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[a("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)])],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"quote-ele"},[e("i"),this._v("UBI-资金提现")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("订单号")]),t._v(" "),a("th",[t._v("用户姓名")]),t._v(" "),a("th",[t._v("用户电话")]),t._v(" "),a("th",[t._v("提现金额")]),t._v(" "),a("th",[t._v("申请时间")]),t._v(" "),a("th",[t._v("通过时间")]),t._v(" "),a("th",[t._v("审核人")])])])}]},o=s;var r=a("VU/8")(n,o,!1,null,null,null);r.options.__file="src/pages/maintainVip/CashWithdrawal/pass.vue";e.default=r.exports}});
//# sourceMappingURL=154.cd2e31d0d2cceadd773d.js.map