webpackJsonp([64],{Ioxi:function(t,e,n){(t.exports=n("FZ+f")(!0)).push([t.i,"\n.search[data-v-bb4459d6] {\n  width: 100%;\n  overflow: hidden;\n}\n.search[data-v-bb4459d6] {\n  padding: 0px 0px 20px 50px;\n}\n.table img[data-v-bb4459d6] {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 10px 0;\n}\n.ellipsis[data-v-bb4459d6] {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/oilDelivery/src/pages/oilDelivery/index.vue"],names:[],mappings:";AAyOA;EACA,YAAA;EACA,iBAAA;CACA;AACA;EACA,2BAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,eAAA;CACA;AACA;EACA,uBAAA;EACA,+BAAA;EACA,mCAAA;EACA,4BAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"\n             style="float:left"><i></i>供应商-油品发货信息 </div>\n      </div>\n      <div class="search">\n        <el-select v-model="status"\n                   @change="search">\n          <el-option value="\'0\'"\n                     label="申请中"></el-option>\n          <el-option value="1"\n                     label="发货中"></el-option>\n          <el-option value="2"\n                     label="已收货"></el-option>\n          <el-option value="3"\n                     label="驳回"></el-option>\n        </el-select>\n\n      </div>\n      <el-table :data="list">\n        <el-table-column label="供应商名称"\n                         prop="sm_name"\n                         align="center"></el-table-column>\n        <el-table-column label="运营商/维修厂名称"\n                         prop="company"\n                         align="center"></el-table-column>\n        <el-table-column label="金额(元)"\n                         prop="settlement_price"\n                         align="center"></el-table-column>\n        <el-table-column label="发货状态"\n                         prop="sm_name"\n                         align="center">\n          <template slot-scope="scope">\n            {{scope.row.audit_status==0 ? \'申请中\' :scope.row.audit_status==1 ? \'发货中\' :scope.row.audit_status==2 ? \'已收货\' : \'驳回\'}}\n          </template>\n        </el-table-column>\n        <el-table-column label="申请时间"\n                         prop="create_time"\n                         align="center"></el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="detailVisible=true,detail(scope.row)">详情</el-button>\n            <el-button type="primary"\n                       size="small"\n                       @click=\'remind(scope.row)\'\n                       :disabled="!scope.row.audit_status==0">{{scope.row.audit_status==0 ? \'提醒发货\' :scope.row.audit_status==1 ? \'发货中\' :scope.row.audit_status==2 ? \'已收货\' : \'驳回\'}}</el-button>\n            <el-button type="primary"\n                       size="small"\n                       @click="allowGoods(scope.row)"\n                       :disabled="scope.row.order_status==1">允许收货</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n      <el-dialog title="详情"\n                 center\n                 :visible.sync="detailVisible">\n        <table class="table">\n          <tr>\n            <th>油品名称</th>\n\n            <th>数量</th>\n            <th>价格(元)</th>\n            <th>备注</th>\n\n            <th>油品图片</th>\n          </tr>\n          <tr v-for=\'(item,index) in detailList\'\n              :key="index">\n            <td>\n              {{item.materiel}}\n            </td>\n            <td>\n              {{item.num}}\n            </td>\n            <td>\n              {{item.settlement_price}}\n            </td>\n            <td>\n              {{item.remarks}}\n            </td>\n            <td>\n\n              <img :src="item.pic"\n                   ref="images">\n            </td>\n          </tr>\n        </table>\n      </el-dialog>\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport Viewer from \'@/utils/Viewer\'\nexport default {\n  data () {\n    return {\n      list: [],\n      seCurId: \'\',\n      token: window.sessionStorage.getItem(\'bbytoken\'), //token令牌\n      authList: [],\n      page: 0,  //供应商列表当前页数\n      pageCount: 0, //供应商列表总页数\n      detailVisible: false,\n      status: \'\',\n      detailList: []\n    }\n  },\n\n  methods: {\n    paging (e) {  //获取供应商列表当前页\n      this.page = e\n      this.init()\n    },\n    search () {  //搜索\n      this.init()\n    },\n    async init () {\n      try {\n        const res = await this.$axios.post(\'admin/SmDeliver/getOilDeliverList\', { token: this.token, page: this.page, status: this.status })\n        this.list = res.data.data.list || []\n        this.pageCount = res.data.data.rows || 0\n\n\n      } catch (err) {\n        throw (err)\n      }\n    },\n    async detail (row) {  //油品详情\n      try {\n        const res = await this.$axios.post(\'admin/SmDeliver/getOilDetail\', { token: this.token, type: row.type, id: row.id, sm_id: row.sm_id })\n        if (res.data.code == 1) {\n          this.detailList = res.data.data\n          this.$nextTick(() => {\n            const ViewerRef = this.$refs.images\n            Viewer(ViewerRef)\n          })\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    //提醒发货\n    async remind (row) {\n      try {\n        const res = await this.$axios.post(\'admin/SmDeliver/remindDeliver\', { token: this.token, sm_id: row.sm_id })\n        if (res.data.code == 1) {\n          this.$message({ message: res.data.msg, type: \'success\' })\n          this.init()\n        } else {\n          this.$message.error(res.data.msg)\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    allowGoods (row) {  //允许收货\n      this.$confirm(\'此操作将允许收货, 是否继续?\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        type: \'warning\',\n        center: true\n      }).then(async () => {\n        try {\n          const res = await this.$axios.post(\'admin/ShopAudit/affirmOrder\', { token: this.token, id: row.id })\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: "success" })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n\n        } catch (err) {\n          throw (err)\n        }\n      }).catch(() => { });\n    },\n\n    // 权限列表,当前所在权限页  \n    erAuth () {\n      var id = this.$route.query.id;\n      this.curId = id;\n      this.$axios.post(\'admin/Auth/erAuth\', {\n        token: window.sessionStorage.getItem(\'bbytoken\'),\n        id: id\n      }).then(res => {\n        if (res.data.code == 1) {\n          var arr = res.data.data || [];\n          this.authList = arr;\n          console.log(this.authList)\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n        .catch(err => {\n          alert(err);\n        })\n    }\n  },\n  created () {\n    this.erAuth()\n  },\n  mounted () {\n\n    this.init() //初始化数据  \n\n  },\n}\n<\/script>\n<style scoped>\n.search {\n  width: 100%;\n  overflow: hidden;\n}\n.search {\n  padding: 0px 0px 20px 50px;\n}\n\n.table img {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 10px 0;\n}\n.ellipsis {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n</style>'],sourceRoot:""}])},PqhD:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Xxa5"),i=n.n(a),s=n("exGp"),r=n.n(s),o=n("gPgF"),l={data:function(){return{list:[],seCurId:"",token:window.sessionStorage.getItem("bbytoken"),authList:[],page:0,pageCount:0,detailVisible:!1,status:"",detailList:[]}},methods:{paging:function(t){this.page=t,this.init()},search:function(){this.init()},init:function(){var t=this;return r()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.post("admin/SmDeliver/getOilDeliverList",{token:t.token,page:t.page,status:t.status});case 3:n=e.sent,t.list=n.data.data.list||[],t.pageCount=n.data.data.rows||0,e.next=11;break;case 8:throw e.prev=8,e.t0=e.catch(0),e.t0;case 11:case"end":return e.stop()}},e,t,[[0,8]])}))()},detail:function(t){var e=this;return r()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$axios.post("admin/SmDeliver/getOilDetail",{token:e.token,type:t.type,id:t.id,sm_id:t.sm_id});case 3:1==(a=n.sent).data.code&&(e.detailList=a.data.data,e.$nextTick(function(){var t=e.$refs.images;Object(o.a)(t)})),n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,e,[[0,7]])}))()},remind:function(t){var e=this;return r()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$axios.post("admin/SmDeliver/remindDeliver",{token:e.token,sm_id:t.sm_id});case 3:1==(a=n.sent).data.code?(e.$message({message:a.data.msg,type:"success"}),e.init()):e.$message.error(a.data.msg),n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,e,[[0,7]])}))()},allowGoods:function(t){var e=this;this.$confirm("此操作将允许收货, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(r()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$axios.post("admin/ShopAudit/affirmOrder",{token:e.token,id:t.id});case 3:1==(a=n.sent).data.code?(e.$message({message:a.data.msg,type:"success"}),e.init()):e.$message.error(a.data.msg),n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,e,[[0,7]])}))).catch(function(){})},erAuth:function(){var t=this,e=this.$route.query.id;this.curId=e,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:e}).then(function(e){if(1==e.data.code){var n=e.data.data||[];t.authList=n,console.log(t.authList)}else t.$alert(e.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}},created:function(){this.erAuth()},mounted:function(){this.init()}},c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ctbHead",t._l(t.authList,function(e){return n("router-link",{key:e.id,class:t.seCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:t.curId}},"v-key":e.id}},[t._v("\n      "+t._s(e.name)+"\n    ")])}),1),t._v(" "),n("div",{staticClass:"container"},[t._m(0),t._v(" "),n("div",{staticClass:"search"},[n("el-select",{on:{change:t.search},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[n("el-option",{attrs:{value:"'0'",label:"申请中"}}),t._v(" "),n("el-option",{attrs:{value:"1",label:"发货中"}}),t._v(" "),n("el-option",{attrs:{value:"2",label:"已收货"}}),t._v(" "),n("el-option",{attrs:{value:"3",label:"驳回"}})],1)],1),t._v(" "),n("el-table",{attrs:{data:t.list}},[n("el-table-column",{attrs:{label:"供应商名称",prop:"sm_name",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"运营商/维修厂名称",prop:"company",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"金额(元)",prop:"settlement_price",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"发货状态",prop:"sm_name",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(0==e.row.audit_status?"申请中":1==e.row.audit_status?"发货中":2==e.row.audit_status?"已收货":"驳回")+"\n        ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"申请时间",prop:"create_time",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){t.detailVisible=!0,t.detail(e.row)}}},[t._v("详情")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"small",disabled:0==!e.row.audit_status},on:{click:function(n){return t.remind(e.row)}}},[t._v(t._s(0==e.row.audit_status?"提醒发货":1==e.row.audit_status?"发货中":2==e.row.audit_status?"已收货":"驳回"))]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"small",disabled:1==e.row.order_status},on:{click:function(n){return t.allowGoods(e.row)}}},[t._v("允许收货")])]}}])})],1),t._v(" "),n("el-dialog",{attrs:{title:"详情",center:"",visible:t.detailVisible},on:{"update:visible":function(e){t.detailVisible=e}}},[n("table",{staticClass:"table"},[n("tr",[n("th",[t._v("油品名称")]),t._v(" "),n("th",[t._v("数量")]),t._v(" "),n("th",[t._v("价格(元)")]),t._v(" "),n("th",[t._v("备注")]),t._v(" "),n("th",[t._v("油品图片")])]),t._v(" "),t._l(t.detailList,function(e,a){return n("tr",{key:a},[n("td",[t._v("\n            "+t._s(e.materiel)+"\n          ")]),t._v(" "),n("td",[t._v("\n            "+t._s(e.num)+"\n          ")]),t._v(" "),n("td",[t._v("\n            "+t._s(e.settlement_price)+"\n          ")]),t._v(" "),n("td",[t._v("\n            "+t._s(e.remarks)+"\n          ")]),t._v(" "),n("td",[n("img",{ref:"images",refInFor:!0,attrs:{src:e.pic}})])])})],2)]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.pageCount&&t.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[n("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)],1)],1)};c._withStripped=!0;var d={render:c,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"quote"},[e("div",{staticClass:"quote-ele",staticStyle:{float:"left"}},[e("i"),this._v("供应商-油品发货信息 ")])])}]},u=d;var p=!1;var m=n("VU/8")(l,u,!1,function(t){p||n("kpjC")},"data-v-bb4459d6",null);m.options.__file="src/pages/oilDelivery/index.vue";e.default=m.exports},kpjC:function(t,e,n){var a=n("Ioxi");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("4aaa06d3",a,!1,{})}});
//# sourceMappingURL=64.1e31a949a6dfdfee01df.js.map