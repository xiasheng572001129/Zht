webpackJsonp([202],{fVCT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),s=a("exGp"),o=a.n(s),r=a("E7z3"),l={data:function(){return{list:[],token:window.sessionStorage.getItem("bbytoken"),page:1,totalpage:1,pageCount:1,index:1,endpage:1,arr:[],n:1,authList:[],curId:0,seCurId:0,detailsDialogVisible:!1,materielData:[]}},methods:{go:r.a.go,first:r.a.first,end:r.a.end,prev:r.a.prev,next:r.a.next,showpage:r.a.showpage,paging:function(t){this.page=t,this.init()},init:function(){var t=this;this.$axios.post("admin/ShopCancel/index",{token:this.token,page:this.page,status:1}).then(function(e){1==e.data.code?(t.list=e.data.data.list,t.showpage(e.data.data),t.pageCount=e.data.data.rows):layer.msg(e.data.msg)}).catch(function(t){return console.log(t)})},showreason:function(t){this.id=t,this.$axios.post("admin/ShopCancel/scReason",{token:this.token,id:t}).then(function(t){""==t.data.data?layer.msg(t.data.msg):layer.open({type:0,area:["40%","30%"],title:["取消合作理由","height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;"],shadeClose:!0,shade:.8,content:t.data.data})}).catch(function(t){return console.log(t)})},details:function(t){var e=this;return o()(i.a.mark(function a(){var n;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.$axios.post("admin/ShopCancel/cancelDetail",{token:e.token,id:t.id});case 3:n=a.sent,e.materielData=n.data.data,a.next=10;break;case 7:throw a.prev=7,a.t0=a.catch(0),a.t0;case 10:case"end":return a.stop()}},a,e,[[0,7]])}))()}},created:function(){this.init()},mounted:function(){var t=this,e=this.$route.query.id;this.curId=e,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:e}).then(function(e){if(1==e.data.code){for(var a=e.data.data,n=0;n<a.length;n++)if(a[n].son){"取消合作"==a[n].name&&(t.seCurId=a[n].id,t.threeAuthList=a[n].son);for(var i=0;i<a[n].son.length;i++)a[n].action!=a[n].son[i].action&&(a[n].action=a[n].son[0].action),"已审核"==a[n].son[i].name&&"取消合作"==a[n].name&&(t.thCurId=a[n].son[i].id)}t.authList=a}else t.$alert(e.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})},watch:{index:function(){this.init()}}},c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ctbHead",t._l(t.authList,function(e){return a("router-link",{key:e.id,class:t.seCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:t.curId}}}},[t._v(t._s(e.name))])}),1),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"quote"},[t._m(0),t._v(" "),a("div",{staticClass:"quote-nav"},t._l(t.threeAuthList,function(e){return a("router-link",{key:e.id,class:t.thCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:t.curId}}}},[t._v(t._s(e.name))])}),1)]),t._v(" "),a("table",{staticClass:"table"},[t._m(1),t._v(" "),a("tbody",t._l(t.list,function(e){return a("tr",[a("td",{staticClass:"t-l"},[t._v(t._s(e.company))]),t._v(" "),a("td",[t._v(t._s(e.phone))]),t._v(" "),a("td",[t._v(t._s(e.leader))]),t._v(" "),a("td",[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.detailsDialogVisible=!0,t.details(e)}}},[t._v("查看")])]),t._v(" "),a("td",[t._v(t._s(t._f("datetime")(e.audit_time)))]),t._v(" "),a("td",[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.showreason(e.id)}}},[t._v("查看")])])])}),0)]),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.detailsDialogVisible,width:"70%",center:""},on:{"update:visible":function(e){t.detailsDialogVisible=e}}},[a("div",{ref:"el_table",staticClass:"el_table"},[a("el-table",{staticStyle:{margin:"20px 0"},attrs:{data:t.materielData,border:""}},[a("el-table-column",{attrs:{label:"名称",prop:"name",align:"center",width:"300"}}),t._v(" "),a("el-table-column",{attrs:{label:"期初配给",prop:"ration",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"剩余库存",prop:"stock",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"需补充数量（库存）",width:"300",prop:"supplement",align:"center"}})],1)],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.pageCount&&t.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[a("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)],1)],1)};c._withStripped=!0;var d={render:c,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"quote-ele"},[e("i"),this._v("取消合作")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("维修厂")]),t._v(" "),a("th",[t._v("联系电话")]),t._v(" "),a("th",[t._v("负责人")]),t._v(" "),a("th",[t._v("物料详情")]),t._v(" "),a("th",[t._v("取消时间")]),t._v(" "),a("th",[t._v("取消理由")])])])}]},u=d;var h=a("VU/8")(l,u,!1,null,null,null);h.options.__file="src/components/shoplist/Audited.vue";e.default=h.exports}});
//# sourceMappingURL=202.1b482ea90054f5e04d7d.js.map