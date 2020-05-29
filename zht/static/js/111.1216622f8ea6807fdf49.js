webpackJsonp([111],{Vbmk:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.details > div[data-v-4b17d10b] {\n  padding: 5px 0;\n}\n.details > div > span[data-v-4b17d10b]:first-child {\n  display: inline-block;\n  width: 95px;\n  text-align: right;\n  margin-right: 10px;\n}\n.details > div > span > img[data-v-4b17d10b] {\n  width: 50px;\n  height: 50px;\n  margin-right: 10px;\n  vertical-align: middle;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/audit/RepairShops/src/pages/audit/RepairShops/index.vue"],names:[],mappings:";AAwQA;EACA,eAAA;CACA;AACA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>审核-维修厂审核</div>\n        <div class="quote-nav">\n          \x3c!-- <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link> --\x3e\n        </div>\n      </div>\n      <el-table :data="list">\n        <el-table-column label="维修厂名称"\n                         align="center"\n                         prop="company">\n\n        </el-table-column>\n        <el-table-column label="负责人"\n                         prop="leader"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="联系电话"\n                         prop="phone"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="店铺类型"\n                         prop="shop_type"\n                         align="center">\n        </el-table-column>\n        <el-table-column label="申请时间"\n                         prop="create_time"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="detailsVisible=true,details(scope.row)">详情</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n      <el-dialog title="详情"\n                 center\n                 :visible.sync="detailsVisible" @close=\'()=>{\n                   smid = ""\n                 }\'>\n        <div v-if=\'detailsList\'\n             class="details">\n          <div>\n            <span>主修 : </span>\n            <span>{{detailsList.major}}</span>\n          </div>\n          <div>\n            <span>详细地址 : </span>\n            <span>{{`${detailsList.province}${detailsList.city}${detailsList.county}${detailsList.address}`}}</span>\n          </div>\n          <div>\n            <span>关于 : </span>\n            <span>{{detailsList.about}}</span>\n          </div>\n\n          <div>\n            <span>营业执照 : </span>\n            <span>\n              <img :src="detailsList.license"\n                   ref="img">\n            </span>\n          </div>\n          <div>\n            <span>店铺照片 : </span>\n            <span>\n              <img v-for="(item,index) in detailsList.photo"\n                   :key="index"\n                   :src="item"\n                   ref="imgage">\n            </span>\n          </div>\n          \x3c!-- <div>\n            <span>请选择运营商 : </span>\n            <span>\n              <el-select v-model="aid"\n                         :disabled="supplyID!=\'\'">\n                <el-option :value="\'\'"\n                           label="请选择运营商"></el-option>\n                <el-option v-for=\'(item,index) in agentList\'\n                           :key="index"\n                           :label="`${item.leader} ( ${item.open_stock} )`"\n                           :value="item.aid"></el-option>\n              </el-select>\n            </span>\n          </div> --\x3e\n          <div v-show=\'detailsList.aid>1\'>\n            <span>市级配送中心 : </span>\n            <span>\n              {{detailsList.acompany}}\n            </span>\n          </div>\n          <div>\n            <span>请选择供应商 : </span>\n            <span>\n              <el-select v-model="smid"\n                         :disabled="detailsList.aid>1">\n               \n                <el-option v-for=\'(item,index) in supplyList\'\n                           :key="index"\n                           :label="item.name"\n                           :value="item.id"></el-option>\n              </el-select>\n            </span>\n          </div>\n          <div>\n            <span></span>\n            <span>\n              <el-button type="primary"\n                         @click="through">通过</el-button>\n            </span>\n          </div>\n        </div>\n      </el-dialog>\n      \x3c!-- 分页 --\x3e\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport Viewer from \'@/utils/Viewer\'\nexport default {\n  data () {\n    return {\n      //分页数据\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      curId: 0,\n      threeAuthList: [],\n      seCurId: 0,\n      thCurId: 0,\n      authList: [],\n      page: 1,\n      pageCount: 0,\n      list: [],\n      detailsVisible: false,\n      detailsList: {},\n      agentList: [],\n      supplyList: [],\n      aid: \'\',\n      sid: \'\',\n      smid: \'\', //供应商id\n    }\n  },\n  methods: {\n    paging (e) {\n      this.page = e\n      this.init()\n    },\n    async init () {\n      try {\n        const res = await this.$axios.post(\'/admin/ShopAudit/shopAuditList\', { token: this.token, page: this.page })\n        this.list = res.data.data.list || []\n        this.pageCount = res.data.data.rows || 0\n      } catch (err) {\n        throw (err)\n      }\n    },\n    //维修厂详情\n    async details (row) {\n      try {\n        this.sid = row.id\n        const detailsList = this.$axios.post(\'admin/ShopAudit/getShopDetail\', { token: this.token, sid: row.id })\n        const agentList = this.$axios.post(\'admin/ShopAudit/agentList\', { token: this.token })\n        const supplyList = this.$axios.post(\'admin/ShopAudit/smList\', { token: this.token, id: row.id })\n        const [ResdetailsList, ResagentList, resSupplyList] = await Promise.all([detailsList, agentList, supplyList])\n        this.detailsList = ResdetailsList.data.data || {}\n       \n        this.agentList = ResagentList.data.data || []\n        this.supplyList = resSupplyList.data.data || []\n        this.smid = resSupplyList.data.data && resSupplyList.data.data[0].id\n        this.$nextTick(() => {\n          const ViewerDom = [...this.$refs.imgage, this.$refs.img]\n          Viewer(ViewerDom)\n        })\n      } catch (err) {\n        throw (err)\n      }\n    },\n    //通过审核\n    async through () {\n      try {\n\n\n        const res = await this.$axios.post(\'admin/ShopAudit/passShop\', { token: this.token, sid: this.sid, smid: this.smid })\n        if (res.data.code == 1) {\n          this.detailsVisible = false\n          this.$message({ message: res.data.msg, type: \'success\' })\n          this.init()\n        } else {\n          this.$message.error(res.data.msg)\n        }\n\n\n      } catch (err) {\n        throw (err)\n      }\n    },\n    erAuth () {\n      var id = this.$route.query.id;\n      this.curId = id;\n      this.$axios.post(\'admin/Auth/erAuth\', {\n        token: window.sessionStorage.getItem(\'bbytoken\'),\n        id: id\n      }).then(res => {\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            console.log(arr)\n            if (arr[i].son) {\n              if (arr[i].name == \'维修厂审核\') {\n                this.seCurId = arr[i].id;\n                this.threeAuthList = arr[i].son;\n              }\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n        .catch(err => {\n          alert(err);\n        })\n    }\n\n  },\n  mounted () {\n    this.init()\n    this.erAuth()\n  },\n\n\n}\n<\/script>\n<style scoped>\n.details > div {\n  padding: 5px 0;\n}\n.details > div > span:first-child {\n  display: inline-block;\n  width: 95px;\n  text-align: right;\n  margin-right: 10px;\n}\n.details > div > span > img {\n  width: 50px;\n  height: 50px;\n  margin-right: 10px;\n  vertical-align: middle;\n}\n</style>'],sourceRoot:""}])},fJQU:function(t,n,e){var i=e("Vbmk");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("8494541c",i,!1,{})},iTFx:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("Gu7T"),a=e.n(i),s=e("//Fk"),r=e.n(s),d=e("d7EF"),l=e.n(d),o=e("Xxa5"),p=e.n(o),c=e("exGp"),u=e.n(c),h=e("gPgF"),v={data:function(){return{token:window.sessionStorage.getItem("bbytoken"),curId:0,threeAuthList:[],seCurId:0,thCurId:0,authList:[],page:1,pageCount:0,list:[],detailsVisible:!1,detailsList:{},agentList:[],supplyList:[],aid:"",sid:"",smid:""}},methods:{paging:function(t){this.page=t,this.init()},init:function(){var t=this;return u()(p.a.mark(function n(){var e;return p.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$axios.post("/admin/ShopAudit/shopAuditList",{token:t.token,page:t.page});case 3:e=n.sent,t.list=e.data.data.list||[],t.pageCount=e.data.data.rows||0,n.next=11;break;case 8:throw n.prev=8,n.t0=n.catch(0),n.t0;case 11:case"end":return n.stop()}},n,t,[[0,8]])}))()},details:function(t){var n=this;return u()(p.a.mark(function e(){var i,s,d,o,c,u,v,m;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.sid=t.id,i=n.$axios.post("admin/ShopAudit/getShopDetail",{token:n.token,sid:t.id}),s=n.$axios.post("admin/ShopAudit/agentList",{token:n.token}),d=n.$axios.post("admin/ShopAudit/smList",{token:n.token,id:t.id}),e.next=7,r.a.all([i,s,d]);case 7:o=e.sent,c=l()(o,3),u=c[0],v=c[1],m=c[2],n.detailsList=u.data.data||{},n.agentList=v.data.data||[],n.supplyList=m.data.data||[],n.smid=m.data.data&&m.data.data[0].id,n.$nextTick(function(){var t=[].concat(a()(n.$refs.imgage),[n.$refs.img]);Object(h.a)(t)}),e.next=22;break;case 19:throw e.prev=19,e.t0=e.catch(0),e.t0;case 22:case"end":return e.stop()}},e,n,[[0,19]])}))()},through:function(){var t=this;return u()(p.a.mark(function n(){var e;return p.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$axios.post("admin/ShopAudit/passShop",{token:t.token,sid:t.sid,smid:t.smid});case 3:1==(e=n.sent).data.code?(t.detailsVisible=!1,t.$message({message:e.data.msg,type:"success"}),t.init()):t.$message.error(e.data.msg),n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,t,[[0,7]])}))()},erAuth:function(){var t=this,n=this.$route.query.id;this.curId=n,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:n}).then(function(n){if(1==n.data.code){for(var e=n.data.data,i=0;i<e.length;i++)console.log(e),e[i].son&&"维修厂审核"==e[i].name&&(t.seCurId=e[i].id,t.threeAuthList=e[i].son);t.authList=e}else t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}},mounted:function(){this.init(),this.erAuth()}},m=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("ctbHead",t._l(t.authList,function(n){return e("router-link",{key:n.id,class:t.seCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}},"v-key":n.id}},[t._v("\n      "+t._s(n.name)+"\n    ")])}),1),t._v(" "),e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("el-table",{attrs:{data:t.list}},[e("el-table-column",{attrs:{label:"维修厂名称",align:"center",prop:"company"}}),t._v(" "),e("el-table-column",{attrs:{label:"负责人",prop:"leader",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"联系电话",prop:"phone",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"店铺类型",prop:"shop_type",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"申请时间",prop:"create_time",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.detailsVisible=!0,t.details(n.row)}}},[t._v("详情")])]}}])})],1),t._v(" "),e("el-dialog",{attrs:{title:"详情",center:"",visible:t.detailsVisible},on:{"update:visible":function(n){t.detailsVisible=n},close:function(){t.smid=""}}},[t.detailsList?e("div",{staticClass:"details"},[e("div",[e("span",[t._v("主修 : ")]),t._v(" "),e("span",[t._v(t._s(t.detailsList.major))])]),t._v(" "),e("div",[e("span",[t._v("详细地址 : ")]),t._v(" "),e("span",[t._v(t._s(""+t.detailsList.province+t.detailsList.city+t.detailsList.county+t.detailsList.address))])]),t._v(" "),e("div",[e("span",[t._v("关于 : ")]),t._v(" "),e("span",[t._v(t._s(t.detailsList.about))])]),t._v(" "),e("div",[e("span",[t._v("营业执照 : ")]),t._v(" "),e("span",[e("img",{ref:"img",attrs:{src:t.detailsList.license}})])]),t._v(" "),e("div",[e("span",[t._v("店铺照片 : ")]),t._v(" "),e("span",t._l(t.detailsList.photo,function(t,n){return e("img",{key:n,ref:"imgage",refInFor:!0,attrs:{src:t}})}),0)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.detailsList.aid>1,expression:"detailsList.aid>1"}]},[e("span",[t._v("市级配送中心 : ")]),t._v(" "),e("span",[t._v("\n            "+t._s(t.detailsList.acompany)+"\n          ")])]),t._v(" "),e("div",[e("span",[t._v("请选择供应商 : ")]),t._v(" "),e("span",[e("el-select",{attrs:{disabled:t.detailsList.aid>1},model:{value:t.smid,callback:function(n){t.smid=n},expression:"smid"}},t._l(t.supplyList,function(t,n){return e("el-option",{key:n,attrs:{label:t.name,value:t.id}})}),1)],1)]),t._v(" "),e("div",[e("span"),t._v(" "),e("span",[e("el-button",{attrs:{type:"primary"},on:{click:t.through}},[t._v("通过")])],1)])]):t._e()]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageCount&&t.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[e("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)],1)],1)};m._withStripped=!0;var g={render:m,staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"quote"},[n("div",{staticClass:"quote-ele"},[n("i"),this._v("审核-维修厂审核")]),this._v(" "),n("div",{staticClass:"quote-nav"})])}]},b=g;var A=!1;var f=e("VU/8")(v,b,!1,function(t){A||e("fJQU")},"data-v-4b17d10b",null);f.options.__file="src/pages/audit/RepairShops/index.vue";n.default=f.exports}});
//# sourceMappingURL=111.1216622f8ea6807fdf49.js.map