webpackJsonp([128],{"5rOs":function(t,n,r){var e=r("RskE");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);r("rjj0")("29cda9fa",e,!1,{})},RskE:function(t,n,r){(t.exports=r("FZ+f")(!0)).push([t.i,"\n.ellipsis[data-v-4c4d3526] {\r\n  width: 70px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 2;\r\n  margin: 0 auto;\n}\n.generateCode[data-v-4c4d3526] {\r\n  float: right;\r\n  margin: 25px 20px 0 0;\n}\r\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/Conversioncode/src/pages/Conversioncode/notVerification.vue"],names:[],mappings:";AAkJA;EACA,YAAA;EACA,iBAAA;EACA,wBAAA;EACA,qBAAA;EACA,6BAAA;EACA,sBAAA;EACA,eAAA;CACA;AACA;EACA,aAAA;EACA,sBAAA;CACA",file:"notVerification.vue",sourcesContent:['<template>\r\n  <div>\r\n    <ctbHead>\r\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\r\n                   v-for="item in authList"\r\n                   :key="item.id"\r\n                   :to="{path:item.action,query:{id:curId}}"\r\n                   :v-key="item.id">\r\n        {{item.name}}\r\n      </router-link>\r\n    </ctbHead>\r\n    <div class="container">\r\n      <div class="quote">\r\n        <div class="quote-ele">\r\n          <i></i>兑换码-未核销\r\n          <el-button type="primary"\r\n                     class="generateCode"\r\n                     @click="generateCode"\r\n                     :loading="loading">生成兑换码</el-button>\r\n          <el-button type="primary"\r\n                     class="generateCode"\r\n                     @click="Export"\r\n                     :disabled="!(list && list.length>0)">导出</el-button>\r\n        </div> \r\n        <div class="quote-nav">\r\n          <router-link :class="thCurId==item.id? \'cur\':\'\'"\r\n                       v-for="item in threeAuthList"\r\n                       :key="item.id"\r\n                       :to="{path:item.action,query:{id:curId}}">\r\n            {{item.name}}\r\n          </router-link>\r\n        </div>\r\n      </div>\r\n      <el-table :data="list">\r\n        <el-table-column prop="code"\r\n                         label="兑换码"\r\n                         align="center"></el-table-column>\r\n\r\n        <el-table-column prop="create_time"\r\n                         label="创建时间"\r\n                         align="center"></el-table-column>\r\n      </el-table>\r\n\r\n      \x3c!-- 分页 --\x3e\r\n      <div :class="list && list.length<=7?\'page-nav\':\'page_center\'"\r\n           v-show="list && list.length>0">\r\n        <paging :page-count="pageCount"\r\n                :page="page"\r\n                @index="paging"></paging>\r\n        \x3c!--分页的组件--\x3e\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</template>\r\n<script type="text/ecmascript-6">\r\nimport Viewer from \'@/utils/Viewer\'\r\nexport default {\r\n  data () {\r\n    return {\r\n      list: [],\r\n      token: window.sessionStorage.getItem(\'bbytoken\'),\r\n      page: 1,\r\n      pageCount: 1,\r\n      thCurId: \'\',\r\n      authList: [],\r\n      threeAuthList: [],\r\n      loading: false\r\n    }\r\n  },\r\n  created () {\r\n    this.init();\r\n  },\r\n  methods: {\r\n    paging (e) {\r\n      this.page = e;\r\n      this.init()\r\n    },\r\n    init () {\r\n      this.$axios.post(\'admin/AgentString/notList\', { token: this.token, page: this.page })\r\n        .then(res => {\r\n          this.list = res.data.data.list;\r\n          this.pageCount = res.data.data.rows;\r\n        }).catch(err => { })\r\n    },\r\n    //生成兑换码\r\n    async generateCode () {\r\n      try {\r\n        this.loading = true\r\n        const res = await this.$axios.post(\'admin/AgentString/createCode\', { token: this.token })\r\n        this.loading = false\r\n        if (res.data.code == 1) {\r\n          this.$message({ message: res.data.msg, type: "success" })\r\n          this.init()\r\n        } else {\r\n          this.$message.error(res.data.msg)\r\n        }\r\n      } catch (error) {\r\n        this.loading = false\r\n        throw (error)\r\n      }\r\n    },\r\n    //打印未核销兑换码\r\n    Export () {\r\n      window.location.href = `${this.baseURL}admin/Login/agentChangeNot`\r\n    }\r\n  },\r\n  mounted () {\r\n    var id = this.$route.query.id;\r\n    this.curId = id;\r\n    this.$axios.post(\'admin/Auth/erAuth\', {\r\n      token: window.sessionStorage.getItem(\'bbytoken\'),\r\n      id: id\r\n    })\r\n      .then(res => {\r\n\r\n        if (res.data.code == 1) {\r\n          var arr = res.data.data;\r\n          for (var i = 0; i < arr.length; i++) {\r\n            if (arr[i].son) {\r\n              if (arr[i].name == \'兑换码\') {\r\n                this.seCurId = arr[i].id;\r\n                this.threeAuthList = arr[i].son;\r\n              }\r\n              for (var j = 0; j < arr[i].son.length; j++) {\r\n                if (arr[i].action != arr[i].son[j].action) {\r\n                  arr[i].action = arr[i].son[0].action;\r\n                }\r\n                if (arr[i].son[j].name == \'未核销\' && arr[i].name == \'兑换码\') {\r\n                  this.thCurId = arr[i].son[j].id;\r\n                }\r\n              }\r\n            }\r\n          }\r\n          this.authList = arr;\r\n        } else {\r\n          this.$alert(res.data.msg, \'提示\', { type: \'error\' });\r\n        }\r\n      })\r\n      .catch(err => {\r\n        alert(err);\r\n      })\r\n  },\r\n}\r\n<\/script>\r\n<style scoped>\r\n.ellipsis {\r\n  width: 70px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 2;\r\n  margin: 0 auto;\r\n}\r\n.generateCode {\r\n  float: right;\r\n  margin: 25px 20px 0 0;\r\n}\r\n</style>\r\n'],sourceRoot:""}])},lG1L:function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=r("Xxa5"),i=r.n(e),a=r("exGp"),s=r.n(a),o=(r("gPgF"),{data:function(){return{list:[],token:window.sessionStorage.getItem("bbytoken"),page:1,pageCount:1,thCurId:"",authList:[],threeAuthList:[],loading:!1}},created:function(){this.init()},methods:{paging:function(t){this.page=t,this.init()},init:function(){var t=this;this.$axios.post("admin/AgentString/notList",{token:this.token,page:this.page}).then(function(n){t.list=n.data.data.list,t.pageCount=n.data.data.rows}).catch(function(t){})},generateCode:function(){var t=this;return s()(i.a.mark(function n(){var r;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t.loading=!0,n.next=4,t.$axios.post("admin/AgentString/createCode",{token:t.token});case 4:r=n.sent,t.loading=!1,1==r.data.code?(t.$message({message:r.data.msg,type:"success"}),t.init()):t.$message.error(r.data.msg),n.next=13;break;case 9:throw n.prev=9,n.t0=n.catch(0),t.loading=!1,n.t0;case 13:case"end":return n.stop()}},n,t,[[0,9]])}))()},Export:function(){window.location.href=this.baseURL+"admin/Login/agentChangeNot"}},mounted:function(){var t=this,n=this.$route.query.id;this.curId=n,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:n}).then(function(n){if(1==n.data.code){for(var r=n.data.data,e=0;e<r.length;e++)if(r[e].son){"兑换码"==r[e].name&&(t.seCurId=r[e].id,t.threeAuthList=r[e].son);for(var i=0;i<r[e].son.length;i++)r[e].action!=r[e].son[i].action&&(r[e].action=r[e].son[0].action),"未核销"==r[e].son[i].name&&"兑换码"==r[e].name&&(t.thCurId=r[e].son[i].id)}t.authList=r}else t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}}),l=function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",[r("ctbHead",t._l(t.authList,function(n){return r("router-link",{key:n.id,class:t.seCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}},"v-key":n.id}},[t._v("\n      "+t._s(n.name)+"\n    ")])}),1),t._v(" "),r("div",{staticClass:"container"},[r("div",{staticClass:"quote"},[r("div",{staticClass:"quote-ele"},[r("i"),t._v("兑换码-未核销\n        "),r("el-button",{staticClass:"generateCode",attrs:{type:"primary",loading:t.loading},on:{click:t.generateCode}},[t._v("生成兑换码")]),t._v(" "),r("el-button",{staticClass:"generateCode",attrs:{type:"primary",disabled:!(t.list&&t.list.length>0)},on:{click:t.Export}},[t._v("导出")])],1),t._v(" "),r("div",{staticClass:"quote-nav"},t._l(t.threeAuthList,function(n){return r("router-link",{key:n.id,class:t.thCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}}}},[t._v("\n          "+t._s(n.name)+"\n        ")])}),1)]),t._v(" "),r("el-table",{attrs:{data:t.list}},[r("el-table-column",{attrs:{prop:"code",label:"兑换码",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"创建时间",align:"center"}})],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.list&&t.list.length>0,expression:"list && list.length>0"}],class:t.list&&t.list.length<=7?"page-nav":"page_center"},[r("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)],1)],1)};l._withStripped=!0;var d={render:l,staticRenderFns:[]},c=d;var u=!1;var g=r("VU/8")(o,c,!1,function(t){u||r("5rOs")},"data-v-4c4d3526",null);g.options.__file="src/pages/Conversioncode/notVerification.vue";n.default=g.exports}});
//# sourceMappingURL=128.3d0e823607e59db1a0f8.js.map