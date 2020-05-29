webpackJsonp([159],{iUOL:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n.hoveColor[data-v-04a8ff48] {\n  opacity: 0.5;\n}\n.primary[data-v-04a8ff48] {\n  color: #04bbfc;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/MunicipalAgent/cancel/src/components/MunicipalAgent/cancel/Reject.vue"],names:[],mappings:";AAwIA;EACA,aAAA;CACA;AAEA;EACA,eAAA;CACA",file:"Reject.vue",sourcesContent:['<template>\n  <div>\n    <table class="table">\n      <thead>\n        <tr>\n          <th>市级代理</th>\n          <th>联系电话</th>\n          <th>负责人</th>\n          <th>取消理由</th>\n          <th>驳回理由</th>\n          <th>驳回时间</th>\n\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-for="item in list">\n          <td>\n            <el-popover placement="top-start"\n                        width="200"\n                        trigger="hover">\n              <a href="javascript:;"\n                 id="1"\n                 slot="reference"\n                 @mouseover="hoverColor($event,item.gid)"\n                 @mouseleave="removeColor($event)">{{item.company}}</a>\n              <div>\n                <p>区域运营商个数：{{item.com_detail.count}}</p>\n                <p>剩余金额：{{item.com_detail.balance}}</p>\n              </div>\n            </el-popover>\n          </td>\n          <td>{{item.phone}}</td>\n          <td>{{item.leader}}</td>\n          <td>\n            <el-popover placement="top-start"\n                        width="200"\n                        trigger="hover">\n              <a href="javascript:;"\n                 slot="reference"\n                 @mouseover="hoverColor($event)"\n                 id="2"\n                 @mouseleave="removeColor($event)">查看</a>\n              <div>\n                <p>{{item.reason}}</p>\n              </div>\n            </el-popover>\n          </td>\n          <td>\n            <el-popover placement="top-start"\n                        width="200"\n                        trigger="hover">\n              <a href="javascript:;"\n                 slot="reference"\n                 @mouseover="hoverColor($event)"\n                 id="3"\n                 @mouseleave="removeColor($event)">查看</a>\n              <div>\n                <p>{{item.rej_reason?item.rej_reason:"没有驳回理由"}}</p>\n              </div>\n\n            </el-popover>\n          </td>\n          <td>{{item.audit_time|datetime}}</td>\n        </tr>\n      </tbody>\n    </table>\n    <div class="page_center"\n         v-show="pageCount&&pageCount>1">\n      <paging :page-count="pageCount"\n              :page="page"\n              @index="paging"></paging>\n      \x3c!--分页的组件--\x3e\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      token: window.sessionStorage.getItem("bbytoken"),\n      pageCount: 1,\n      page: 1,\n      list: [],\n      count: "",\n      balance: "",\n      url: "",\n    }\n  },\n  created () {\n    this.init()\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post("supply/canRej", {\n        token: this.token,\n        page: this.page\n      }).then(res => {\n\n        if (res.data.code == 1) {\n          this.list = res.data.data.list\n          this.pageCount = res.data.data.rows;\n        } else {\n          layer.msg(res.data.msg)\n        }\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    //点击查看详情页\n    See () {\n      var id = this.$route.query.id;\n      this.$router.push({\n        path: "/MunicipalAgent/materiel/materiel/Throughdetails",\n        query: {\n          id: id,\n          is: true\n        }\n      })\n    },\n    hoverColor (e, id) {\n      e.currentTarget.className = "hoveColor"\n    },\n    removeColor (e) {\n      e.currentTarget.className = "primary"\n    },\n  },\n  mounted () {\n\n  }\n}\n<\/script>\n<style scoped>\n.hoveColor {\n  opacity: 0.5;\n}\n\n.primary {\n  color: #04bbfc;\n}\n</style>\n'],sourceRoot:""}])},kFMF:function(e,t,n){var r=n("iUOL");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n("rjj0")("182873e2",r,!1,{})},sw6b:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={data:function(){return{token:window.sessionStorage.getItem("bbytoken"),pageCount:1,page:1,list:[],count:"",balance:"",url:""}},created:function(){this.init()},methods:{paging:function(e){this.page=e,this.init()},init:function(){var e=this;this.$axios.post("supply/canRej",{token:this.token,page:this.page}).then(function(t){1==t.data.code?(e.list=t.data.data.list,e.pageCount=t.data.data.rows):layer.msg(t.data.msg)}).catch(function(e){throw e})},See:function(){var e=this.$route.query.id;this.$router.push({path:"/MunicipalAgent/materiel/materiel/Throughdetails",query:{id:e,is:!0}})},hoverColor:function(e,t){e.currentTarget.className="hoveColor"},removeColor:function(e){e.currentTarget.className="primary"}},mounted:function(){}},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("table",{staticClass:"table"},[e._m(0),e._v(" "),n("tbody",e._l(e.list,function(t){return n("tr",[n("td",[n("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover"}},[n("a",{attrs:{slot:"reference",href:"javascript:;",id:"1"},on:{mouseover:function(n){return e.hoverColor(n,t.gid)},mouseleave:function(t){return e.removeColor(t)}},slot:"reference"},[e._v(e._s(t.company))]),e._v(" "),n("div",[n("p",[e._v("区域运营商个数："+e._s(t.com_detail.count))]),e._v(" "),n("p",[e._v("剩余金额："+e._s(t.com_detail.balance))])])])],1),e._v(" "),n("td",[e._v(e._s(t.phone))]),e._v(" "),n("td",[e._v(e._s(t.leader))]),e._v(" "),n("td",[n("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover"}},[n("a",{attrs:{slot:"reference",href:"javascript:;",id:"2"},on:{mouseover:function(t){return e.hoverColor(t)},mouseleave:function(t){return e.removeColor(t)}},slot:"reference"},[e._v("查看")]),e._v(" "),n("div",[n("p",[e._v(e._s(t.reason))])])])],1),e._v(" "),n("td",[n("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover"}},[n("a",{attrs:{slot:"reference",href:"javascript:;",id:"3"},on:{mouseover:function(t){return e.hoverColor(t)},mouseleave:function(t){return e.removeColor(t)}},slot:"reference"},[e._v("查看")]),e._v(" "),n("div",[n("p",[e._v(e._s(t.rej_reason?t.rej_reason:"没有驳回理由"))])])])],1),e._v(" "),n("td",[e._v(e._s(e._f("datetime")(t.audit_time)))])])}),0)]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.pageCount&&e.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[n("paging",{attrs:{"page-count":e.pageCount,page:e.page},on:{index:e.paging}})],1)])};o._withStripped=!0;var a={render:o,staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("th",[e._v("市级代理")]),e._v(" "),n("th",[e._v("联系电话")]),e._v(" "),n("th",[e._v("负责人")]),e._v(" "),n("th",[e._v("取消理由")]),e._v(" "),n("th",[e._v("驳回理由")]),e._v(" "),n("th",[e._v("驳回时间")])])])}]},i=a;var s=!1;var p=n("VU/8")(r,i,!1,function(e){s||n("kFMF")},"data-v-04a8ff48",null);p.options.__file="src/components/MunicipalAgent/cancel/Reject.vue";t.default=p.exports}});
//# sourceMappingURL=159.27486252a1e482d64d69.js.map