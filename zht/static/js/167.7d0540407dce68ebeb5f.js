webpackJsonp([167],{"3tBf":function(n,t,e){var a=e("Hlnb");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("36ab87fe",a,!1,{})},"5HNG":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("Xxa5"),i=e.n(a),A=e("exGp"),o=e.n(A),r=e("YynN"),s=e("Tb/d"),d=(e("gPgF"),{data:function(){return{list:[],token:window.sessionStorage.getItem("bbytoken"),page:1,pageCount:1,curId:0,thCurId:0,threeAuthList:[],authList:[],detailsVisible:!1,arealist:[],throughLoading:!1,rejectLoading:!1}},computed:{isArray:function(){return this.regionList.countyName instanceof Array}},components:{detailsDialog:r.a,RegionDialog:s.a},created:function(){this.init()},watch:{index:function(){this.init()}},methods:{paging:function(n){this.page=n,this.init()},init:function(){var n=this;this.$axios.post("admin/AgentContinue/list",{token:this.token,page:this.page,status:0}).then(function(t){n.list=t.data.data.list,n.pageCount=t.data.data.rows}).catch(function(n){})},areaDetails:function(n){var t=this;return o()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.post("admin/AgentCancel/regionDetail",{area:n.region,token:t.token});case 3:a=e.sent,t.arealist=a.data.data,e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()},Reject:function(n){var t,e=this;this.$prompt("请输入驳回理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"驳回理由不能为空"}).then((t=o()(i.a.mark(function t(a){var A,o=a.value;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.rejectLoading=!0,t.next=4,e.$axios.post("admin/AgentContinue/continueReject",{token:e.token,reason:o,aid:n.aid,id:n.id});case 4:A=t.sent,e.rejectLoading=!1,1==A.data.code?(e.$message({message:A.data.msg,type:"success"}),e.init()):e.$message.error(A.data.msg),t.next=13;break;case 9:throw t.prev=9,t.t0=t.catch(0),e.rejectLoading=!1,t.t0;case 13:case"end":return t.stop()}},t,e,[[0,9]])})),function(n){return t.apply(this,arguments)})).catch(function(){})},adopt:function(n){var t=this;this.$confirm("此操作将通过审核, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(o()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.throughLoading=!0,e.next=4,t.$axios.post("admin/AgentContinue/continueAdopt",{token:t.token,id:n.id,aid:n.aid});case 4:a=e.sent,t.throughLoading=!1,1==a.data.code?(t.$message({message:a.data.msg,type:"success"}),t.init()):t.$message.error(a.data.msg),e.next=13;break;case 9:throw e.prev=9,e.t0=e.catch(0),t.throughLoading=!1,e.t0;case 13:case"end":return e.stop()}},e,t,[[0,9]])}))).catch(function(){})}},mounted:function(){var n=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){for(var e=t.data.data,a=0;a<e.length;a++)if(e[a].son){"继续合作"==e[a].name&&(n.seCurId=e[a].id,n.threeAuthList=e[a].son);for(var i=0;i<e[a].son.length;i++)e[a].action!=e[a].son[i].action&&(e[a].action=e[a].son[0].action),"申请列表"==e[a].son[i].name&&"继续合作"==e[a].name&&(n.thCurId=e[a].son[i].id)}n.authList=e}else n.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(n){alert(n)})}}),l=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("ctbHead",n._l(n.authList,function(t){return e("router-link",{key:t.id,class:n.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:n.curId}},"v-key":t.id}},[n._v("\n      "+n._s(t.name)+"\n    ")])}),1),n._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"quote"},[n._m(0),n._v(" "),e("div",{staticClass:"quote-nav"},n._l(n.threeAuthList,function(t){return e("router-link",{key:t.id,class:n.thCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:n.curId}}}},[n._v("\n          "+n._s(t.name)+"\n        ")])}),1)]),n._v(" "),e("el-table",{attrs:{data:n.list}},[e("el-table-column",{attrs:{prop:"id",label:"id",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"company",label:"配送中心名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"leader",label:"负责人",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"地区个数",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{type:"text"},on:{click:function(e){n.detailsVisible=!0,n.areaDetails(t.row)}}},[n._v("详情")])]}}])}),n._v(" "),e("el-table-column",{attrs:{prop:"create_time",label:"申请时间",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[e("el-button",{attrs:{type:"primary",size:"mini",loading:n.throughLoading},on:{click:function(e){return n.adopt(t.row)}}},[n._v("通过")]),n._v(" "),e("el-button",{attrs:{type:"danger",size:"mini",loading:n.rejectLoading},on:{click:function(e){return n.Reject(t.row)}}},[n._v("驳回")])]}}])})],1),n._v(" "),e("el-dialog",{attrs:{title:"地区详情",visible:n.detailsVisible,center:""},on:{"update:visible":function(t){n.detailsVisible=t}}},[n.arealist?e("div",{staticClass:"details"},[e("div",[n._v("省 : "+n._s(n.arealist.proName))]),n._v(" "),e("div",[n._v("市 : "+n._s(n.arealist.cityName))]),n._v(" "),e("div",[n._v("\n          区/县 :\n          "),n._l(n.arealist.countyName,function(t,a){return e("span",{key:a},[n._v(n._s(t)+"、")])})],2)]):n._e()]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.list&&n.list.length>0,expression:"list && list.length>0"}],class:n.list&&n.list.length<=7?"page-nav":"page_center"},[e("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1)],1)],1)};l._withStripped=!0;var c={render:l,staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"quote-ele"},[t("i"),this._v("配送中心-继续合作-未审核")])}]},p=c;var g=!1;var u=e("VU/8")(d,p,!1,function(n){g||e("3tBf")},"data-v-16da5d9f",null);u.options.__file="src/pages/continueCooperation/apply.vue";t.default=u.exports},Hlnb:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,'\n.active[data-v-16da5d9f] {\n  background-color: #409eff !important;\n  color: #409eff;\n}\n.details > div[data-v-16da5d9f] {\n  margin: 10px 0;\n}\n.progress[data-v-16da5d9f] {\n  /* background-color: #ebeef5; */\n  height: 10px;\n  /* border-radius: 10px; */\n  position: relative;\n\n  margin: 20px 0 10px 0;\n}\n.progress_bg[data-v-16da5d9f]:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n.progress-item[data-v-16da5d9f] {\n  width: 10%;\n  height: 100%;\n  float: left;\n  position: relative;\n  background-color: #ebeef5;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.progress-item > p[data-v-16da5d9f] {\n  position: absolute;\n  top: -35px;\n  text-align: center;\n  width: 100%;\n}\n.ApplyList[data-v-16da5d9f] .el-radio {\n  margin-right: 10px;\n}\n[data-v-16da5d9f] .el-table__body-wrapper table th {\n  padding: 0;\n}\n[data-v-16da5d9f] .el-table__body-wrapper table td {\n  font-size: 12px;\n}\n.center[data-v-16da5d9f] {\n  text-align: center;\n}\n.name[data-v-16da5d9f] {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.shuju[data-v-16da5d9f] {\n  margin-top: 16px;\n  font-size: 16px;\n  text-align: center;\n  color: #999;\n  overflow: hidden;\n}\n.shuju > ul > li[data-v-16da5d9f] {\n  width: 50%;\n  margin-bottom: 50px;\n}\n.shuju .son[data-v-16da5d9f] {\n  margin-left: 20px;\n  display: inline-block;\n  vertical-align: top;\n}\n.shuju .son li[data-v-16da5d9f] {\n  display: block;\n}\n.shuju .grandson[data-v-16da5d9f] {\n  margin-left: 20px;\n  vertical-align: top;\n  display: inline-block;\n}\n.shuju .grandson li[data-v-16da5d9f] {\n  display: block;\n  margin-bottom: 7px;\n}\n.details_content[data-v-16da5d9f]:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n.details[data-v-16da5d9f] .el-dialog__header {\n  text-align: center !important;\n}\n.details[data-v-16da5d9f] .el-dialog__body {\n  overflow: inherit !important;\n}\n.details_content[data-v-16da5d9f] {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n\n  /*border-right: 1px dashed #04BBFC;*/\n}\n.details_content > div[data-v-16da5d9f] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.details_content > div[data-v-16da5d9f]:last-child {\n  border-left: 1px dashed #04bbfc;\n}\n.right[data-v-16da5d9f] {\n  display: inline-block;\n  padding-left: 6%;\n  margin-left: 8px;\n}\n.right li[data-v-16da5d9f] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 16px 80px;\n  margin: 28px 0;\n  white-space: nowrap;\n  min-width: 320px;\n  max-width: 400px;\n  border-radius: 10px;\n  -webkit-box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);\n          box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);\n}\n.right_border-bottom[data-v-16da5d9f] {\n  border-bottom: 1px solid #ccc;\n}\n.right_border-bottom input[data-v-16da5d9f] {\n  border: none;\n  height: 25px;\n}\n.Reject_Reason[data-v-16da5d9f] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 100%;\n  margin-top: 9px;\n}\n.Reject_Reason > div[data-v-16da5d9f]:last-child {\n  border-bottom: 1px solid #ccc;\n  width: 70%;\n  margin-left: 10px;\n}\n.Reject_Reason input[data-v-16da5d9f] {\n  border: none;\n  width: 100%;\n  height: 30px;\n  line-height: 30px;\n}\n.details_box[data-v-16da5d9f] {\n  height: 600px;\n  overflow: auto;\n}\n.details_box a[data-v-16da5d9f] {\n  color: #04bbfc;\n}\n.details_box-btn[data-v-16da5d9f] {\n  width: 100%;\n  text-align: center;\n  margin: 20px 0;\n}\n.details_box-btn > button[data-v-16da5d9f]:first-child {\n  margin-right: 200px;\n}\n.textPrompt[data-v-16da5d9f] {\n  padding-left: 58px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: red;\n  font-size: 15px;\n}\n.Tips[data-v-16da5d9f] {\n  color: red;\n  margin-left: 8%;\n}\n.service[data-v-16da5d9f]:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n.service[data-v-16da5d9f] {\n  height: 350px;\n  overflow: auto;\n}\n.service > div[data-v-16da5d9f] {\n  float: left;\n  width: calc(100% / 3);\n  height: 100%;\n  text-align: center;\n}\n.service > div > p[data-v-16da5d9f] {\n  line-height: 30px;\n}\n.radio[data-v-16da5d9f] {\n  display: block;\n  text-align: left;\n  margin: 10px 0;\n}\n.radio[data-v-16da5d9f] .el-radio__input {\n  margin-left: calc(50% - 40px);\n}\n[data-v-16da5d9f] .el-radio {\n  margin-left: 0 !important;\n}\n.service > div[data-v-16da5d9f] {\n  border-right: 1px solid #ccc;\n}\n.service > div[data-v-16da5d9f]:last-child {\n  border: none;\n}\n.right[data-v-16da5d9f] .el-input__inner,\n.right[data-v-16da5d9f] .el-select .el-input.is-focus .el-input__inner {\n  border: solid 1px white;\n}\n.youpin .el-form-item[data-v-16da5d9f] {\n  margin-bottom: 0;\n}\n',"",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/continueCooperation/src/pages/continueCooperation/apply.vue"],names:[],mappings:";AAkPA;EACA,qCAAA;EACA,eAAA;CACA;AACA;EACA,eAAA;CACA;AACA;EACA,gCAAA;EACA,aAAA;EACA,0BAAA;EACA,mBAAA;;EAEA,sBAAA;CACA;AACA;EACA,eAAA;EACA,YAAA;EACA,YAAA;CACA;AAEA;EACA,WAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EACA,0BAAA;EACA,mBAAA;EACA,gBAAA;CACA;AAEA;EACA,mBAAA;EACA,WAAA;EACA,mBAAA;EACA,YAAA;CACA;AACA;EACA,mBAAA;CACA;AAEA;EACA,WAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,iBAAA;EACA,wBAAA;EACA,oBAAA;CACA;AACA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,iBAAA;CACA;AAEA;EACA,WAAA;EACA,oBAAA;CACA;AAEA;EACA,kBAAA;EACA,sBAAA;EACA,oBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,kBAAA;EACA,oBAAA;EACA,sBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;CACA;AACA;EACA,eAAA;EACA,YAAA;EACA,YAAA;CACA;AACA;EACA,8BAAA;CACA;AACA;EACA,6BAAA;CACA;AACA;EACA,YAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,0BAAA;MAAA,8BAAA;;EAEA,qCAAA;CACA;AACA;EACA,oBAAA;MAAA,YAAA;UAAA,QAAA;CACA;AAEA;EACA,gCAAA;CACA;AAEA;EACA,sBAAA;EACA,iBAAA;EACA,iBAAA;CACA;AACA;EACA,+BAAA;UAAA,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,oBAAA;EACA,iBAAA;EACA,iBAAA;EACA,oBAAA;EACA,wDAAA;UAAA,gDAAA;CACA;AACA;EACA,8BAAA;CACA;AACA;EACA,aAAA;EACA,aAAA;CACA;AACA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,YAAA;EACA,gBAAA;CACA;AAEA;EACA,8BAAA;EACA,WAAA;EACA,kBAAA;CACA;AACA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;CACA;AACA;EACA,cAAA;EACA,eAAA;CACA;AACA;EACA,eAAA;CACA;AACA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;CACA;AAEA;EACA,oBAAA;CACA;AACA;EACA,mBAAA;EACA,+BAAA;UAAA,uBAAA;EACA,WAAA;EACA,gBAAA;CACA;AAEA;EACA,WAAA;EACA,gBAAA;CACA;AACA;EACA,eAAA;EACA,YAAA;EACA,YAAA;CACA;AACA;EACA,cAAA;EACA,eAAA;CACA;AACA;EACA,YAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,eAAA;EACA,iBAAA;EACA,eAAA;CACA;AACA;EACA,8BAAA;CACA;AACA;EACA,0BAAA;CACA;AAEA;EACA,6BAAA;CACA;AACA;EACA,aAAA;CACA;AACA;;EAEA,wBAAA;CACA;AACA;EACA,iBAAA;CACA",file:"apply.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>配送中心-继续合作-未审核</div>\n        <div class="quote-nav">\n          <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link>\n        </div>\n      </div>\n      <el-table :data="list">\n        <el-table-column prop="id"\n                         label="id"\n                         align="center">\n        </el-table-column>\n        <el-table-column prop="company"\n                         label="配送中心名称"\n                         align="center">\n        </el-table-column>\n\n        <el-table-column prop="leader"\n                         label="负责人"\n                         align="center">\n        </el-table-column>\n        <el-table-column label="地区个数"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       @click="detailsVisible=true,areaDetails(scope.row)">详情</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column prop="create_time"\n                         label="申请时间"\n                         align="center">\n        </el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="mini"\n                       @click="adopt(scope.row)"\n                       :loading="throughLoading">通过</el-button>\n            <el-button type="danger"\n                       size="mini"\n                       @click="Reject(scope.row)"\n                       :loading="rejectLoading">驳回</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n      <el-dialog title="地区详情"\n                 :visible.sync="detailsVisible"\n                 center>\n        <div v-if="arealist"\n             class="details">\n          <div>省 : {{arealist.proName}}</div>\n          <div>市 : {{arealist.cityName}}</div>\n          <div>\n            区/县 :\n            <span v-for="(item,index) in arealist.countyName"\n                  :key="index">{{item}}、</span>\n          </div>\n        </div>\n      </el-dialog>\n\n      \x3c!-- 分页 --\x3e\n      <div :class="list && list.length<=7?\'page-nav\':\'page_center\'"\n           v-show="list && list.length>0">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport detailsDialog from "@/components/Dialog/Dialog";\nimport RegionDialog from "@/components/Dialog/RegionDialog"\nimport Viewer from \'@/utils/Viewer\';\nexport default {\n  data () {\n    return {\n      list: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      //分页数据\n      page: 1, //显示的页码数\n      pageCount: 1,\n      curId: 0,\n      thCurId: 0,\n      threeAuthList: [],\n      authList: [],\n      detailsVisible: false,\n      arealist: [],\n      throughLoading: false,\n      rejectLoading: false\n    }\n  },\n  computed: {\n    isArray () {\n      return this.regionList.countyName instanceof Array\n    }\n  },\n  components: {\n    detailsDialog,\n    RegionDialog\n  },\n  created () {\n    this.init();\n  },\n  watch: {\n    index () {\n      this.init();\n    }\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post(\'admin/AgentContinue/list\', { token: this.token, page: this.page, status: 0 })\n        .then(res => {\n          this.list = res.data.data.list;\n          this.pageCount = res.data.data.rows;\n        }).catch(err => { })\n    },\n    //地区详情\n    async areaDetails (row) {\n      try {\n        const res = await this.$axios.post(\'admin/AgentCancel/regionDetail\', { area: row.region, token: this.token })\n        this.arealist = res.data.data\n\n      } catch (error) {\n        throw (error)\n      }\n    },\n\n\n\n\n\n\n    Reject (row) {  //驳回\n      this.$prompt(\'请输入驳回理由\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        inputPattern: /\\S/,\n        inputErrorMessage: \'驳回理由不能为空\'\n      }).then(async ({ value }) => {\n        try {\n          this.rejectLoading = true\n          const res = await this.$axios.post(\'admin/AgentContinue/continueReject\', { token: this.token, reason: value, aid: row.aid, id: row.id })\n          this.rejectLoading = false\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: "success" })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n        } catch (error) {\n          this.rejectLoading = false\n          throw (error)\n        }\n      }).catch(() => { });\n    },\n    adopt (row) {\n\n      this.$confirm(\'此操作将通过审核, 是否继续?\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        type: \'warning\'\n      }).then(async () => {\n        try {\n          this.throughLoading = true\n          const res = await this.$axios.post(\'admin/AgentContinue/continueAdopt\', { token: this.token, id: row.id, aid: row.aid })\n          this.throughLoading = false\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: "success" })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n        } catch (error) {\n          this.throughLoading = false\n          throw (error)\n        }\n      }).catch(() => { });\n    }\n  },\n  mounted () {\n    var id = this.$route.query.id;\n    this.curId = id;\n    this.$axios.post(\'admin/Auth/erAuth\', {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      id: id\n    })\n      .then(res => {\n\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            if (arr[i].son) {\n              if (arr[i].name == \'继续合作\') {\n                this.seCurId = arr[i].id;\n                this.threeAuthList = arr[i].son;\n              }\n              for (var j = 0; j < arr[i].son.length; j++) {\n                if (arr[i].action != arr[i].son[j].action) {\n                  arr[i].action = arr[i].son[0].action;\n                }\n                if (arr[i].son[j].name == \'申请列表\' && arr[i].name == \'继续合作\') {\n                  this.thCurId = arr[i].son[j].id;\n                }\n              }\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$alert(res.data.msg, \'提示\', { type: \'error\' });\n        }\n      })\n      .catch(err => {\n        alert(err);\n      })\n  },\n}\n<\/script>\n<style scoped>\n.active {\n  background-color: #409eff !important;\n  color: #409eff;\n}\n.details > div {\n  margin: 10px 0;\n}\n.progress {\n  /* background-color: #ebeef5; */\n  height: 10px;\n  /* border-radius: 10px; */\n  position: relative;\n\n  margin: 20px 0 10px 0;\n}\n.progress_bg:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n\n.progress-item {\n  width: 10%;\n  height: 100%;\n  float: left;\n  position: relative;\n  background-color: #ebeef5;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.progress-item > p {\n  position: absolute;\n  top: -35px;\n  text-align: center;\n  width: 100%;\n}\n.ApplyList >>> .el-radio {\n  margin-right: 10px;\n}\n\n>>> .el-table__body-wrapper table th {\n  padding: 0;\n}\n>>> .el-table__body-wrapper table td {\n  font-size: 12px;\n}\n.center {\n  text-align: center;\n}\n.name {\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.shuju {\n  margin-top: 16px;\n  font-size: 16px;\n  text-align: center;\n  color: #999;\n  overflow: hidden;\n}\n\n.shuju > ul > li {\n  width: 50%;\n  margin-bottom: 50px;\n}\n\n.shuju .son {\n  margin-left: 20px;\n  display: inline-block;\n  vertical-align: top;\n}\n\n.shuju .son li {\n  display: block;\n}\n\n.shuju .grandson {\n  margin-left: 20px;\n  vertical-align: top;\n  display: inline-block;\n}\n\n.shuju .grandson li {\n  display: block;\n  margin-bottom: 7px;\n}\n.details_content:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n.details >>> .el-dialog__header {\n  text-align: center !important;\n}\n.details >>> .el-dialog__body {\n  overflow: inherit !important;\n}\n.details_content {\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n\n  /*border-right: 1px dashed #04BBFC;*/\n}\n.details_content > div {\n  flex: 1;\n}\n\n.details_content > div:last-child {\n  border-left: 1px dashed #04bbfc;\n}\n\n.right {\n  display: inline-block;\n  padding-left: 6%;\n  margin-left: 8px;\n}\n.right li {\n  box-sizing: border-box;\n  padding: 16px 80px;\n  margin: 28px 0;\n  white-space: nowrap;\n  min-width: 320px;\n  max-width: 400px;\n  border-radius: 10px;\n  box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);\n}\n.right_border-bottom {\n  border-bottom: 1px solid #ccc;\n}\n.right_border-bottom input {\n  border: none;\n  height: 25px;\n}\n.Reject_Reason {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  margin-top: 9px;\n}\n\n.Reject_Reason > div:last-child {\n  border-bottom: 1px solid #ccc;\n  width: 70%;\n  margin-left: 10px;\n}\n.Reject_Reason input {\n  border: none;\n  width: 100%;\n  height: 30px;\n  line-height: 30px;\n}\n.details_box {\n  height: 600px;\n  overflow: auto;\n}\n.details_box a {\n  color: #04bbfc;\n}\n.details_box-btn {\n  width: 100%;\n  text-align: center;\n  margin: 20px 0;\n}\n\n.details_box-btn > button:first-child {\n  margin-right: 200px;\n}\n.textPrompt {\n  padding-left: 58px;\n  box-sizing: border-box;\n  color: red;\n  font-size: 15px;\n}\n\n.Tips {\n  color: red;\n  margin-left: 8%;\n}\n.service:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n.service {\n  height: 350px;\n  overflow: auto;\n}\n.service > div {\n  float: left;\n  width: calc(100% / 3);\n  height: 100%;\n  text-align: center;\n}\n.service > div > p {\n  line-height: 30px;\n}\n.radio {\n  display: block;\n  text-align: left;\n  margin: 10px 0;\n}\n.radio >>> .el-radio__input {\n  margin-left: calc(50% - 40px);\n}\n>>> .el-radio {\n  margin-left: 0 !important;\n}\n\n.service > div {\n  border-right: 1px solid #ccc;\n}\n.service > div:last-child {\n  border: none;\n}\n.right >>> .el-input__inner,\n.right >>> .el-select .el-input.is-focus .el-input__inner {\n  border: solid 1px white;\n}\n.youpin .el-form-item {\n  margin-bottom: 0;\n}\n</style>\n'],sourceRoot:""}])}});
//# sourceMappingURL=167.7d0540407dce68ebeb5f.js.map