webpackJsonp([62],{"43ai":function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n.content[data-v-c8ca37cc] {\r\n  max-height: 500px;\r\n  overflow: auto;\n}\r\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/mancarLife/SaveTrouble/unaudited/src/pages/mancarLife/SaveTrouble/unaudited/index.vue"],names:[],mappings:";AA+JA;EACA,kBAAA;EACA,eAAA;CACA",file:"index.vue",sourcesContent:['<template>\r\n  <div>\r\n    <el-table :data="list">\r\n      <el-table-column align="center"\r\n                       label="发布标题"\r\n                       prop="title"></el-table-column>\r\n      <el-table-column align="center"\r\n                       label="发布人"\r\n                       prop="name"></el-table-column>\r\n      <el-table-column align="center"\r\n                       label="封面">\r\n        <template slot-scope="scope">\r\n          <img width="100px"\r\n               height="100px"\r\n               :src="scope.row.cover" />\r\n        </template>\r\n      </el-table-column>\r\n      <el-table-column align="center"\r\n                       label="联系电话"\r\n                       prop="phone"></el-table-column>\r\n      <el-table-column align="center"\r\n                       label="所属类型"\r\n                       prop="type_name"></el-table-column>\r\n      <el-table-column align="center"\r\n                       label="发布人类型"\r\n                       prop="user_type"></el-table-column>\r\n      <el-table-column align="center"\r\n                       label="图文详情">\r\n        <template slot-scope="scope">\r\n          <el-button type="text"\r\n                     @click="contentDetails(scope.row)">详情</el-button>\r\n        </template>\r\n      </el-table-column>\r\n      <el-table-column align="center"\r\n                       label="地区">\r\n        <template slot-scope="scope">\r\n          {{`${scope.row.province}${scope.row.city}`}}\r\n        </template>\r\n      </el-table-column>\r\n      <el-table-column align="center"\r\n                       label="申请时间"\r\n                       prop="create_time"></el-table-column>\r\n      <el-table-column align="center"\r\n                       label="操作">\r\n        <template slot-scope="scope">\r\n          <el-button type="primary"\r\n                     size="small"\r\n                     :loading="throughLoading[scope.$index]"\r\n                     @click="through(scope.row,scope.$index)">通过</el-button>\r\n          <el-button type="danger"\r\n                     size="small"\r\n                     :loading="rejecteLoading[scope.$index]"\r\n                     @click="rejecte(scope.row,scope.$index)">驳回</el-button>\r\n        </template>\r\n      </el-table-column>\r\n    </el-table>\r\n    <el-dialog title="图文详情"\r\n               center\r\n               :visible.sync="imgDetails">\r\n      <div class="content">\r\n        <div v-html="content"></div>\r\n      </div>\r\n    </el-dialog>\r\n    \x3c!-- 分页 --\x3e\r\n    <div class="page_center"\r\n         v-show="list && list.length>0">\r\n      <paging :page-count="pageCount"\r\n              :page="page"\r\n              @index="(e)=>{page=e,init()}"></paging>\r\n\r\n    </div>\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  data () {\r\n    return {\r\n      token: window.sessionStorage.getItem(\'bbytoken\'),\r\n      list: [],\r\n      page: 1,\r\n      pageCount: 1,\r\n      throughLoading: [], //通过loading加载\r\n      rejecteLoading: [], //驳回loading加载\r\n      imgDetails: false, //图文详情弹框显示状态\r\n      content: \'\',//内容\r\n    }\r\n  },\r\n  methods: {\r\n    async init () {\r\n      try {\r\n        const res = await this.$axios.post(\'admin/UserEasy/list\', { token: this.token, page: this.page, status: 0 })\r\n        this.list = res.data.data.list || []\r\n        this.pageCount = res.data.data.rows || 0\r\n      } catch (error) {\r\n        throw (error)\r\n      }\r\n    },\r\n    //图文/内容详情\r\n    contentDetails (item) {\r\n      this.imgDetails = true\r\n      this.$nextTick(() => {\r\n        this.content = item.content\r\n      })\r\n    },\r\n    through (item, index) {  //通过审核\r\n      this.$confirm(\'此操作将要审核, 是否继续?\', \'提示\', {\r\n        confirmButtonText: \'确定\',\r\n        cancelButtonText: \'取消\',\r\n        type: \'warning\',\r\n        center: true\r\n      }).then(async () => {\r\n        try {\r\n          this.throughLoading[index] = true\r\n          const res = await this.$axios.post(\'admin/UserEasy/pubThrough\', { token: this.token, id: item.id, phone: item.phone, name: item.name })    // id 发布id  phone 负责人电话   name 发布人\r\n          this.throughLoading[index] = false\r\n          if (res.data.code == 1) {\r\n            this.$message({ message: res.data.msg, type: "success" })\r\n            this.init()\r\n          } else {\r\n            this.$message.error(res.data.msg)\r\n          }\r\n        } catch (error) {\r\n          this.throughLoading[index] = false\r\n          throw (error)\r\n        }\r\n      })\r\n    },\r\n    //驳回\r\n    rejecte (item, index) {\r\n      this.$prompt(\'请输入驳回理由\', \'提示\', {\r\n        confirmButtonText: \'确定\',\r\n        cancelButtonText: \'取消\',\r\n        inputPattern: /\\S/,\r\n        inputErrorMessage: \'请输入驳回理由\'\r\n      }).then(async ({ value }) => {\r\n        try {\r\n\r\n          this.rejecteLoading[index] = true\r\n          const res = await this.$axios.post(\'admin/UserEasy/pubDismissal\', { token: this.token, id: item.id, reason: value, phone: item.phone, name: item.name })  //id 发布id  phone 负责人电话   name 发布人  reason 驳回理由\r\n          this.rejecteLoading[index] = false\r\n          if (res.data.code == 1) {\r\n            this.$message({ message: res.data.msg, type: "success" })\r\n            this.init()\r\n          } else {\r\n            this.$message.error(res.data.msg)\r\n          }\r\n        } catch (err) {\r\n          this.rejecteLoading[index] = false\r\n          throw (err)\r\n        }\r\n      }).catch(() => { });\r\n    }\r\n  },\r\n  mounted () {\r\n    this.init()\r\n  }\r\n}\r\n<\/script>\r\n<style scoped>\r\n.content {\r\n  max-height: 500px;\r\n  overflow: auto;\r\n}\r\n</style>'],sourceRoot:""}])},NLKY:function(e,n,t){var r=t("43ai");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("3e752bb2",r,!1,{})},PFzY:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t("Xxa5"),a=t.n(r),i=t("exGp"),o=t.n(i),s={data:function(){return{token:window.sessionStorage.getItem("bbytoken"),list:[],page:1,pageCount:1,throughLoading:[],rejecteLoading:[],imgDetails:!1,content:""}},methods:{init:function(){var e=this;return o()(a.a.mark(function n(){var t;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$axios.post("admin/UserEasy/list",{token:e.token,page:e.page,status:0});case 3:t=n.sent,e.list=t.data.data.list||[],e.pageCount=t.data.data.rows||0,n.next=11;break;case 8:throw n.prev=8,n.t0=n.catch(0),n.t0;case 11:case"end":return n.stop()}},n,e,[[0,8]])}))()},contentDetails:function(e){var n=this;this.imgDetails=!0,this.$nextTick(function(){n.content=e.content})},through:function(e,n){var t=this;this.$confirm("此操作将要审核, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(o()(a.a.mark(function r(){var i;return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,t.throughLoading[n]=!0,r.next=4,t.$axios.post("admin/UserEasy/pubThrough",{token:t.token,id:e.id,phone:e.phone,name:e.name});case 4:i=r.sent,t.throughLoading[n]=!1,1==i.data.code?(t.$message({message:i.data.msg,type:"success"}),t.init()):t.$message.error(i.data.msg),r.next=13;break;case 9:throw r.prev=9,r.t0=r.catch(0),t.throughLoading[n]=!1,r.t0;case 13:case"end":return r.stop()}},r,t,[[0,9]])})))},rejecte:function(e,n){var t,r=this;this.$prompt("请输入驳回理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"请输入驳回理由"}).then((t=o()(a.a.mark(function t(i){var o,s=i.value;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r.rejecteLoading[n]=!0,t.next=4,r.$axios.post("admin/UserEasy/pubDismissal",{token:r.token,id:e.id,reason:s,phone:e.phone,name:e.name});case 4:o=t.sent,r.rejecteLoading[n]=!1,1==o.data.code?(r.$message({message:o.data.msg,type:"success"}),r.init()):r.$message.error(o.data.msg),t.next=13;break;case 9:throw t.prev=9,t.t0=t.catch(0),r.rejecteLoading[n]=!1,t.t0;case 13:case"end":return t.stop()}},t,r,[[0,9]])})),function(e){return t.apply(this,arguments)})).catch(function(){})}},mounted:function(){this.init()}},l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("el-table",{attrs:{data:e.list}},[t("el-table-column",{attrs:{align:"center",label:"发布标题",prop:"title"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"发布人",prop:"name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"封面"},scopedSlots:e._u([{key:"default",fn:function(e){return[t("img",{attrs:{width:"100px",height:"100px",src:e.row.cover}})]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"联系电话",prop:"phone"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"所属类型",prop:"type_name"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"发布人类型",prop:"user_type"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"图文详情"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.contentDetails(n.row)}}},[e._v("详情")])]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"地区"},scopedSlots:e._u([{key:"default",fn:function(n){return[e._v("\n        "+e._s(""+n.row.province+n.row.city)+"\n      ")]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"申请时间",prop:"create_time"}}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"small",loading:e.throughLoading[n.$index]},on:{click:function(t){return e.through(n.row,n.$index)}}},[e._v("通过")]),e._v(" "),t("el-button",{attrs:{type:"danger",size:"small",loading:e.rejecteLoading[n.$index]},on:{click:function(t){return e.rejecte(n.row,n.$index)}}},[e._v("驳回")])]}}])})],1),e._v(" "),t("el-dialog",{attrs:{title:"图文详情",center:"",visible:e.imgDetails},on:{"update:visible":function(n){e.imgDetails=n}}},[t("div",{staticClass:"content"},[t("div",{domProps:{innerHTML:e._s(e.content)}})])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.list&&e.list.length>0,expression:"list && list.length>0"}],staticClass:"page_center"},[t("paging",{attrs:{"page-count":e.pageCount,page:e.page},on:{index:function(n){e.page=n,e.init()}}})],1)],1)};l._withStripped=!0;var c={render:l,staticRenderFns:[]},u=c;var p=!1;var d=t("VU/8")(s,u,!1,function(e){p||t("NLKY")},"data-v-c8ca37cc",null);d.options.__file="src/pages/mancarLife/SaveTrouble/unaudited/index.vue";n.default=d.exports}});
//# sourceMappingURL=62.f5d5e04ca561b7de3d49.js.map