webpackJsonp([163],{GWRA:function(e,t,n){var a=n("cPQT");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("6fb2e84f",a,!1,{})},"OH+K":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),i=n.n(a),s=n("exGp"),r=n.n(s),o=(n("gPgF"),{data:function(){return{list:[],seCurId:"",token:window.sessionStorage.getItem("bbytoken"),authList:[],page:0,pageCount:0,detailVisible:!1,status:"",detailList:[],adoptLoading:[],RejectLoading:[]}},methods:{paging:function(e){this.page=e,this.init()},search:function(){this.init()},init:function(){var e=this;return r()(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("admin/SmList/cancelList",{token:e.token,page:e.page,status:e.status});case 3:n=t.sent,e.list=n.data.data||[],e.pageCount=n.data.data.rows||0,t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(0),t.t0;case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},adopt:function(e,t){var n=this;return r()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:n.$prompt("请输入退还的质保金","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"质保金不能为空"}).then(function(){var a=r()(i.a.mark(function a(s){var r,o=s.value;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,console.log(t),n.adoptLoading[t]=!0,a.next=5,n.$axios.post("admin/SmList/passCancel",{token:n.token,sm_id:e.sm_id,money:o,id:e.id});case 5:r=a.sent,n.adoptLoading[t]=!1,1==r.data.code?(n.$message({message:r.data.msg,type:"success"}),n.init()):n.$message.error(r.data.msg),a.next=13;break;case 10:throw a.prev=10,a.t0=a.catch(0),a.t0;case 13:case"end":return a.stop()}},a,n,[[0,10]])}));return function(e){return a.apply(this,arguments)}}()).catch(function(){});case 1:case"end":return a.stop()}},a,n)}))()},Reject:function(e,t){var n=this;return r()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:n.$prompt("请输入驳回理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"驳回不能为空"}).then(function(){var a=r()(i.a.mark(function a(s){var r,o=s.value;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n.RejectLoading[t]=!0,a.next=4,n.$axios.post("admin/SmList/rejectCancel",{token:n.token,sm_id:e.sm_id,reason:o,id:e.id});case 4:r=a.sent,n.RejectLoading[t]=!1,1==r.data.code?(n.$message({message:r.data.msg,type:"success"}),n.init()):n.$message.error(r.data.msg),a.next=12;break;case 9:throw a.prev=9,a.t0=a.catch(0),a.t0;case 12:case"end":return a.stop()}},a,n,[[0,9]])}));return function(e){return a.apply(this,arguments)}}()).catch(function(){});case 1:case"end":return a.stop()}},a,n)}))()},erAuth:function(){var e=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){var n=t.data.data||[];e.authList=n,console.log(e.authList)}else e.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(e){alert(e)})}},created:function(){this.erAuth()},mounted:function(){this.init()}}),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ctbHead",e._l(e.authList,function(t){return n("router-link",{key:t.id,class:e.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:e.curId}},"v-key":t.id}},[e._v("\n      "+e._s(t.name)+"\n    ")])}),1),e._v(" "),n("div",{staticClass:"container"},[e._m(0),e._v(" "),n("div",{staticClass:"search"},[n("el-select",{on:{change:e.search},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[n("el-option",{attrs:{value:"'0'",label:"申请中"}}),e._v(" "),n("el-option",{attrs:{value:"1",label:"已通过"}}),e._v(" "),n("el-option",{attrs:{value:"2",label:"已驳回"}})],1)],1),e._v(" "),n("el-table",{attrs:{data:e.list}},[n("el-table-column",{attrs:{label:"供应商名称",prop:"name",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"银行卡号",prop:"account",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"开户名称",prop:"bank_name",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"质保金",prop:"set_retention_money",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"已缴纳质保金",prop:"my_retention_money",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"申请时间",prop:"create_time",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"处理时间",prop:"cancel_time",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?n("el-button",{attrs:{type:"primary",size:"small",loading:e.adoptLoading[t.$index]},on:{click:function(n){return e.adopt(t.row,t.$index)}}},[e._v("通过")]):e._e(),e._v(" "),0==t.row.status?n("el-button",{attrs:{type:"primary",size:"small",loading:e.RejectLoading[t.$index]},on:{click:function(n){return e.Reject(t.row,t.$index)}}},[e._v("驳回")]):e._e()]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.pageCount&&e.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[n("paging",{attrs:{"page-count":e.pageCount,page:e.page},on:{index:e.paging}})],1)],1)],1)};l._withStripped=!0;var c={render:l,staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"quote"},[t("div",{staticClass:"quote-ele",staticStyle:{float:"left"}},[t("i"),this._v("供应商-取消合作 ")])])}]},p=c;var u=!1;var d=n("VU/8")(o,p,!1,function(e){u||n("GWRA")},"data-v-1b8e66e8",null);d.options.__file="src/pages/supplier/cancel/index.vue";t.default=d.exports},cPQT:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n.search[data-v-1b8e66e8] {\n  width: 100%;\n  overflow: hidden;\n}\n.search[data-v-1b8e66e8] {\n  padding: 0px 0px 20px 50px;\n}\n.table img[data-v-1b8e66e8] {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 10px 0;\n}\n.ellipsis[data-v-1b8e66e8] {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/supplier/cancel/src/pages/supplier/cancel/index.vue"],names:[],mappings:";AAkMA;EACA,YAAA;EACA,iBAAA;CACA;AACA;EACA,2BAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,eAAA;CACA;AACA;EACA,uBAAA;EACA,+BAAA;EACA,mCAAA;EACA,4BAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"\n             style="float:left"><i></i>供应商-取消合作 </div>\n      </div>\n      <div class="search">\n        <el-select v-model="status"\n                   @change="search">\n          <el-option value="\'0\'"\n                     label="申请中"></el-option>\n          <el-option value="1"\n                     label="已通过"></el-option>\n          <el-option value="2"\n                     label="已驳回"></el-option>\n        </el-select>\n      </div>\n      <el-table :data="list">\n        <el-table-column label="供应商名称"\n                         prop="name"\n                         align="center"></el-table-column>\n        <el-table-column label="银行卡号"\n                         prop="account"\n                         align="center"></el-table-column>\n        <el-table-column label="开户名称"\n                         prop="bank_name"\n                         align="center"></el-table-column>\n        <el-table-column label="质保金"\n                         prop="set_retention_money"\n                         align="center"></el-table-column>\n        <el-table-column label="已缴纳质保金"\n                         prop="my_retention_money"\n                         align="center"></el-table-column>\n        <el-table-column label="申请时间"\n                         prop="create_time"\n                         align="center"></el-table-column>\n        <el-table-column label="处理时间"\n                         prop="cancel_time"\n                         align="center"></el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="adopt(scope.row,scope.$index)"\n                       :loading="adoptLoading[scope.$index]"\n                       v-if=\'scope.row.status==0\'>通过</el-button>\n            <el-button type="primary"\n                       size="small"\n                       @click=\'Reject(scope.row,scope.$index)\'\n                       :loading="RejectLoading[scope.$index]"\n                       v-if=\'scope.row.status==0\'>驳回</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport Viewer from \'@/utils/Viewer\'\nexport default {\n  data () {\n    return {\n      list: [],\n      seCurId: \'\',\n      token: window.sessionStorage.getItem(\'bbytoken\'), //token令牌\n      authList: [],\n      page: 0,  //供应商列表当前页数\n      pageCount: 0, //供应商列表总页数\n      detailVisible: false,\n      status: \'\',\n      detailList: [],\n      adoptLoading: [],\n      RejectLoading: []\n    }\n  },\n\n  methods: {\n    paging (e) {  //获取供应商列表当前页\n      this.page = e\n      this.init()\n    },\n    search () {  //搜索\n      this.init()\n    },\n    async init () {\n      try {\n        const res = await this.$axios.post(\'admin/SmList/cancelList\', { token: this.token, page: this.page, status: this.status })\n        this.list = res.data.data || []\n        this.pageCount = res.data.data.rows || 0\n      } catch (err) {\n        throw (err)\n      }\n    },\n    async adopt (row, index) {  //取消合作 通过\n      this.$prompt(\'请输入退还的质保金\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        inputPattern: /\\S/,\n        inputErrorMessage: \'质保金不能为空\'\n      }).then(async ({ value }) => {\n        try {\n          console.log(index)\n          this.adoptLoading[index] = true\n          const res = await this.$axios.post(\'admin/SmList/passCancel\', { token: this.token, sm_id: row.sm_id, money: value, id: row.id })\n          this.adoptLoading[index] = false\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: \'success\' })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n        } catch (err) {\n          throw (err)\n        }\n      }).catch(() => { });\n    },\n    async Reject (row, index) {  //驳回\n      this.$prompt(\'请输入驳回理由\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        inputPattern: /\\S/,\n        inputErrorMessage: \'驳回不能为空\'\n      }).then(async ({ value }) => {\n        try {\n          this.RejectLoading[index] = true\n          const res = await this.$axios.post(\'admin/SmList/rejectCancel\', { token: this.token, sm_id: row.sm_id, reason: value, id: row.id })\n          this.RejectLoading[index] = false\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: \'success\' })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n        } catch (err) {\n          throw (err)\n        }\n      }).catch(() => { });\n    },\n\n\n    // 权限列表,当前所在权限页  \n    erAuth () {\n      var id = this.$route.query.id;\n      this.curId = id;\n      this.$axios.post(\'admin/Auth/erAuth\', {\n        token: window.sessionStorage.getItem(\'bbytoken\'),\n        id: id\n      }).then(res => {\n        if (res.data.code == 1) {\n          var arr = res.data.data || [];\n          this.authList = arr;\n          console.log(this.authList)\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n        .catch(err => {\n          alert(err);\n        })\n    }\n  },\n  created () {\n    this.erAuth()\n  },\n  mounted () {\n\n    this.init() //初始化数据  \n\n  },\n}\n<\/script>\n<style scoped>\n.search {\n  width: 100%;\n  overflow: hidden;\n}\n.search {\n  padding: 0px 0px 20px 50px;\n}\n\n.table img {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 10px 0;\n}\n.ellipsis {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n</style>'],sourceRoot:""}])}});
//# sourceMappingURL=163.5d62defec42c20b503a1.js.map