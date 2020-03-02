webpackJsonp([68],{"4Cr5":function(e,t,n){var a=n("aHqq");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("695de4be",a,!1,{})},aHqq:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n.search[data-v-a2c84872] {\n  width: 100%;\n  overflow: hidden;\n}\n.search[data-v-a2c84872] {\n  padding: 0px 0px 20px 50px;\n}\n.table img[data-v-a2c84872] {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 10px 0;\n}\n.ellipsis[data-v-a2c84872] {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/supplier/productDelivery/src/pages/supplier/productDelivery/index.vue"],names:[],mappings:";AA8JA;EACA,YAAA;EACA,iBAAA;CACA;AACA;EACA,2BAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,eAAA;CACA;AACA;EACA,uBAAA;EACA,+BAAA;EACA,mCAAA;EACA,4BAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"\n             style="float:left"><i></i>供应商-养护品发货信息 </div>\n      </div>\n      <div class="search">\n        <el-select v-model="status"\n                   @change="search">\n          <el-option value="\'0\'"\n                     label="未发货"></el-option>\n          <el-option value="1"\n                     label="已发货"></el-option>\n          <el-option value="2"\n                     label="已收货"></el-option>\n\n        </el-select>\n\n      </div>\n      <el-table :data="list">\n        <el-table-column label="供应商名称"\n                         prop="sm_name"\n                         align="center"></el-table-column>\n        <el-table-column label="运营商/维修厂名称"\n                         prop="company"\n                         align="center"></el-table-column>\n        <el-table-column label="产品名称"\n                         prop="type_name"\n                         align="center"></el-table-column>\n        <el-table-column label="产品品牌"\n                         prop="goods_brand"\n                         align="center"></el-table-column>\n        <el-table-column label="产品数量"\n                         prop="number"\n                         align="center"></el-table-column>\n\n        <el-table-column label="申请时间"\n                         prop="create_time"\n                         align="center"></el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n\n            <el-button type="primary"\n                       size="small"\n                       @click=\'remind(scope.row)\'\n                       :disabled="scope.row.status!=0">{{scope.row.status==0 ? \'提醒发货\' :scope.row.audit_status==1 ? \'已发货\' : \'已收货\' }}</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport Viewer from \'@/utils/Viewer\'\nexport default {\n  data () {\n    return {\n      list: [],\n      seCurId: \'\',\n      token: window.sessionStorage.getItem(\'bbytoken\'), //token令牌\n      authList: [],\n      page: 0,  //供应商列表当前页数\n      pageCount: 0, //供应商列表总页数\n      detailVisible: false,\n      status: \'\',\n      detailList: []\n    }\n  },\n\n  methods: {\n    paging (e) {  //获取供应商列表当前页\n      this.page = e\n      this.init()\n    },\n    search () {  //搜索\n      this.init()\n    },\n    async init () {\n      try {\n        const res = await this.$axios.post(\'admin/SmDeliver/getFreeDeliverList\', { token: this.token, page: this.page, status: this.status })\n        this.list = res.data.data.list || []\n        this.pageCount = res.data.data.rows || 0\n\n\n      } catch (err) {\n        throw (err)\n      }\n    },\n\n    //提醒发货\n    async remind (row) {\n      try {\n        const res = await this.$axios.post(\'admin/SmDeliver/remindDeliver\', { token: this.token, sm_id: row.id })\n        if (res.data.code == 1) {\n          this.$message({ message: res.data.msg, type: \'success\' })\n          this.init()\n        } else {\n          this.$message.error(res.data.msg)\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n\n    // 权限列表,当前所在权限页  \n    erAuth () {\n      var id = this.$route.query.id;\n      this.curId = id;\n      this.$axios.post(\'admin/Auth/erAuth\', {\n        token: window.sessionStorage.getItem(\'bbytoken\'),\n        id: id\n      }).then(res => {\n        if (res.data.code == 1) {\n          var arr = res.data.data || [];\n          this.authList = arr;\n          console.log(this.authList)\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n        .catch(err => {\n          alert(err);\n        })\n    }\n  },\n  created () {\n    this.erAuth()\n  },\n  mounted () {\n\n    this.init() //初始化数据  \n\n  },\n}\n<\/script>\n<style scoped>\n.search {\n  width: 100%;\n  overflow: hidden;\n}\n.search {\n  padding: 0px 0px 20px 50px;\n}\n\n.table img {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 10px 0;\n}\n.ellipsis {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n</style>'],sourceRoot:""}])},jFgr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),i=n.n(a),s=n("exGp"),r=n.n(s),l=(n("gPgF"),{data:function(){return{list:[],seCurId:"",token:window.sessionStorage.getItem("bbytoken"),authList:[],page:0,pageCount:0,detailVisible:!1,status:"",detailList:[]}},methods:{paging:function(e){this.page=e,this.init()},search:function(){this.init()},init:function(){var e=this;return r()(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("admin/SmDeliver/getFreeDeliverList",{token:e.token,page:e.page,status:e.status});case 3:n=t.sent,e.list=n.data.data.list||[],e.pageCount=n.data.data.rows||0,t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(0),t.t0;case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},remind:function(e){var t=this;return r()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$axios.post("admin/SmDeliver/remindDeliver",{token:t.token,sm_id:e.id});case 3:1==(a=n.sent).data.code?(t.$message({message:a.data.msg,type:"success"}),t.init()):t.$message.error(a.data.msg),n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,t,[[0,7]])}))()},erAuth:function(){var e=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){var n=t.data.data||[];e.authList=n,console.log(e.authList)}else e.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(e){alert(e)})}},created:function(){this.erAuth()},mounted:function(){this.init()}}),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ctbHead",e._l(e.authList,function(t){return n("router-link",{key:t.id,class:e.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:e.curId}},"v-key":t.id}},[e._v("\n      "+e._s(t.name)+"\n    ")])}),1),e._v(" "),n("div",{staticClass:"container"},[e._m(0),e._v(" "),n("div",{staticClass:"search"},[n("el-select",{on:{change:e.search},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[n("el-option",{attrs:{value:"'0'",label:"未发货"}}),e._v(" "),n("el-option",{attrs:{value:"1",label:"已发货"}}),e._v(" "),n("el-option",{attrs:{value:"2",label:"已收货"}})],1)],1),e._v(" "),n("el-table",{attrs:{data:e.list}},[n("el-table-column",{attrs:{label:"供应商名称",prop:"sm_name",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"运营商/维修厂名称",prop:"company",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"产品名称",prop:"type_name",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"产品品牌",prop:"goods_brand",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"产品数量",prop:"number",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"申请时间",prop:"create_time",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"small",disabled:0!=t.row.status},on:{click:function(n){return e.remind(t.row)}}},[e._v(e._s(0==t.row.status?"提醒发货":1==t.row.audit_status?"已发货":"已收货"))])]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.pageCount&&e.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[n("paging",{attrs:{"page-count":e.pageCount,page:e.page},on:{index:e.paging}})],1)],1)],1)};o._withStripped=!0;var c={render:o,staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"quote"},[t("div",{staticClass:"quote-ele",staticStyle:{float:"left"}},[t("i"),this._v("供应商-养护品发货信息 ")])])}]},p=c;var u=!1;var d=n("VU/8")(l,p,!1,function(e){u||n("4Cr5")},"data-v-a2c84872",null);d.options.__file="src/pages/supplier/productDelivery/index.vue";t.default=d.exports}});
//# sourceMappingURL=68.98dfabc3de93a17eb95b.js.map