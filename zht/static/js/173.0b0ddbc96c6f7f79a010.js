webpackJsonp([173],{"2tK5":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),i=n.n(a),s=n("exGp"),r=n.n(s),l=(n("gPgF"),{data:function(){return{token:window.sessionStorage.getItem("bbytoken"),curId:0,threeAuthList:[],seCurId:0,thCurId:0,authList:[],page:1,pageCount:0,list:[],detailsVisible:!1,detailsList:{},loading:[]}},methods:{paging:function(e){this.page=e,this.init()},init:function(){var e=this;return r()(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("admin/ShopAudit/shopOil",{token:e.token,page:e.page});case 3:n=t.sent,e.list=n.data.data.list||[],e.pageCount=n.data.data.rows||0,t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(0),t.t0;case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},details:function(e){var t=this;return r()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$axios.post("admin/ShopAudit/orderDetail",{token:t.token,id:e.id});case 3:a=n.sent,t.detailsList=a.data.data,n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,t,[[0,7]])}))()},adopt:function(e,t){var n=this;return r()(i.a.mark(function a(){var s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,n.loading[t]=!0,a.next=4,n.$axios.post("admin/ShopAudit/resOil",{token:n.token,sid:e.sid,smid:e.smid});case 4:s=a.sent,n.loading[t]=!1,1==s.data.code?(n.$message({message:s.data.msg,type:"success"}),n.init()):n.$message.error(s.data.msg),a.next=12;break;case 9:throw a.prev=9,a.t0=a.catch(0),a.t0;case 12:case"end":return a.stop()}},a,n,[[0,9]])}))()},erAuth:function(){var e=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){for(var n=t.data.data,a=0;a<n.length;a++)console.log(n),n[a].son&&"维修厂审核"==n[a].name&&(e.seCurId=n[a].id,e.threeAuthList=n[a].son);e.authList=n}else e.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(e){alert(e)})}},mounted:function(){this.init(),this.erAuth()}}),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ctbHead",e._l(e.authList,function(t){return n("router-link",{key:t.id,class:e.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:e.curId}},"v-key":t.id}},[e._v("\n      "+e._s(t.name)+"\n    ")])}),1),e._v(" "),n("div",{staticClass:"container"},[e._m(0),e._v(" "),n("el-table",{attrs:{data:e.list}},[n("el-table-column",{attrs:{label:"维修厂名称",align:"center",prop:"company"}}),e._v(" "),n("el-table-column",{attrs:{label:"供应商名称",prop:"name",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"负责人",prop:"leader",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"维修厂电话",prop:"phone",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"供应商电话",prop:"smphone",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"通过时间",prop:"audit_time",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"small",loading:e.loading[t.$index]},on:{click:function(n){return e.adopt(t.row,t.$index)}}},[e._v("允许发货")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:"详情",center:"",visible:e.detailsVisible},on:{"update:visible":function(t){e.detailsVisible=t}}},[e.detailsList?n("div",{staticClass:"details"},[n("div",[n("span",[e._v("创建时间 : ")]),e._v(" "),n("span",[e._v(e._s(e.detailsList.create_time))])]),e._v(" "),n("el-table",{staticStyle:{margin:"10px 0"},attrs:{data:e.detailsList.detail,border:""}},[n("el-table-column",{attrs:{label:"名称",prop:"materiel",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"数量",prop:"num",align:"center"}})],1)],1):e._e()]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.pageCount&&e.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[n("paging",{attrs:{"page-count":e.pageCount,page:e.page},on:{index:e.paging}})],1)],1)],1)};o._withStripped=!0;var d={render:o,staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"quote"},[t("div",{staticClass:"quote-ele"},[t("i"),this._v("审核-维修厂首次物料发货")]),this._v(" "),t("div",{staticClass:"quote-nav"})])}]},c=d;var p=!1;var u=n("VU/8")(l,c,!1,function(e){p||n("FVlV")},"data-v-1005c79e",null);u.options.__file="src/pages/audit/materiel/index.vue";t.default=u.exports},FVlV:function(e,t,n){var a=n("rqU8");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("229e8da4",a,!1,{})},rqU8:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n.details > div[data-v-1005c79e] {\n  padding: 5px 0;\n}\n.details > div > span[data-v-1005c79e]:first-child {\n  display: inline-block;\n  width: 95px;\n  text-align: right;\n  margin-right: 10px;\n}\n.details > div > span > img[data-v-1005c79e] {\n  width: 50px;\n  height: 50px;\n  margin-right: 10px;\n  vertical-align: middle;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/audit/materiel/src/pages/audit/materiel/index.vue"],names:[],mappings:";AAoMA;EACA,eAAA;CACA;AACA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>审核-维修厂首次物料发货</div>\n        <div class="quote-nav">\n          \x3c!-- <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link> --\x3e\n        </div>\n      </div>\n      <el-table :data="list">\n        <el-table-column label="维修厂名称"\n                         align="center"\n                         prop="company">\n\n        </el-table-column>\n        <el-table-column label="供应商名称"\n                         prop="name"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="负责人"\n                         prop="leader"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="维修厂电话"\n                         prop="phone"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="供应商电话"\n                         prop="smphone"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="通过时间"\n                         prop="audit_time"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n\n            <el-button type="primary"\n                       size="small"\n                       @click="adopt(scope.row,scope.$index)"\n                       :loading="loading[scope.$index]">允许发货</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n      <el-dialog title="详情"\n                 center\n                 :visible.sync="detailsVisible">\n        <div v-if=\'detailsList\'\n             class="details">\n          <div>\n            <span>创建时间 : </span>\n            <span>{{detailsList.create_time}}</span>\n          </div>\n          <el-table :data="detailsList.detail"\n                    style="margin:10px 0"\n                    border>\n            <el-table-column label="名称"\n                             prop="materiel"\n                             align="center"></el-table-column>\n            <el-table-column label="数量"\n                             prop="num"\n                             align="center"></el-table-column>\n          </el-table>\n        </div>\n      </el-dialog>\n      \x3c!-- 分页 --\x3e\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport Viewer from \'@/utils/Viewer\'\nexport default {\n  data () {\n    return {\n      //分页数据\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      curId: 0,\n      threeAuthList: [],\n      seCurId: 0,\n      thCurId: 0,\n      authList: [],\n      page: 1,\n      pageCount: 0,\n      list: [],\n      detailsVisible: false,\n      detailsList: {},\n      loading: []\n    }\n  },\n  methods: {\n    paging (e) {\n      this.page = e\n      this.init()\n    },\n    async init () {\n      try {\n        const res = await this.$axios.post(\'admin/ShopAudit/shopOil\', { token: this.token, page: this.page })\n        this.list = res.data.data.list || []\n        this.pageCount = res.data.data.rows || 0\n      } catch (err) {\n        throw (err)\n      }\n    },\n    //维修厂详情\n    async details (row) {\n      try {\n        const res = await this.$axios.post(\'admin/ShopAudit/orderDetail\', { token: this.token, id: row.id })\n        this.detailsList = res.data.data\n      } catch (err) {\n        throw (err)\n      }\n    },\n    //通过审核\n    async adopt (row, index) {\n      try {\n        this.loading[index] = true\n        const res = await this.$axios.post(\'admin/ShopAudit/resOil\', { token: this.token, sid: row.sid, smid: row.smid })\n        this.loading[index] = false\n        if (res.data.code == 1) {\n          this.$message({ message: res.data.msg, type: "success" })\n          this.init()\n        } else {\n          this.$message.error(res.data.msg)\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    erAuth () {\n      var id = this.$route.query.id;\n      this.curId = id;\n      this.$axios.post(\'admin/Auth/erAuth\', {\n        token: window.sessionStorage.getItem(\'bbytoken\'),\n        id: id\n      }).then(res => {\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            console.log(arr)\n            if (arr[i].son) {\n              if (arr[i].name == \'维修厂审核\') {\n                this.seCurId = arr[i].id;\n                this.threeAuthList = arr[i].son;\n              }\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n        .catch(err => {\n          alert(err);\n        })\n    }\n\n  },\n  mounted () {\n    this.init()\n    this.erAuth()\n  },\n\n\n}\n<\/script>\n<style scoped>\n.details > div {\n  padding: 5px 0;\n}\n.details > div > span:first-child {\n  display: inline-block;\n  width: 95px;\n  text-align: right;\n  margin-right: 10px;\n}\n.details > div > span > img {\n  width: 50px;\n  height: 50px;\n  margin-right: 10px;\n  vertical-align: middle;\n}\n</style>'],sourceRoot:""}])}});
//# sourceMappingURL=173.0b0ddbc96c6f7f79a010.js.map