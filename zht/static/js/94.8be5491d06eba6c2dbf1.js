webpackJsonp([94],{QOQr:function(n,e,t){var a=t("yMvU");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("fd6cf2f2",a,!1,{})},bpsj:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("Xxa5"),i=t.n(a),r=t("exGp"),o=t.n(r),s={data:function(){return{list:[],token:window.sessionStorage.getItem("bbytoken"),page:0,pageCount:0,authList:[],threeAuthList:[]}},created:function(){this.init()},methods:{paging:function(n){this.page=n,this.init()},init:function(){var n=this;this.$axios.post("admin/UserWelfare/welfareApply",{token:this.token,page:this.page,status:0}).then(function(e){n.list=e.data.data.list,n.pageCount=e.data.data.rows}).catch(function(n){})},through:function(n){var e=this;this.$confirm("此操作将通过审核, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(o()(i.a.mark(function t(){var a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("admin/UserWelfare/welfareAdopt",{token:e.token,id:n.id});case 3:1==(a=t.sent).data.code?(e.$message({message:a.data.msg,type:"success"}),e.init()):e.$message.error(a.data.msg),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,e,[[0,7]])}))).catch(function(){})},rejected:function(n){var e,t=this;this.$prompt("请输入驳回理由","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"驳回理由不能为空"}).then((e=o()(i.a.mark(function e(a){var r,o=a.value;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.post("admin/UserWelfare/welfareReject",{token:t.token,id:n.id,reason:o});case 3:1==(r=e.sent).data.code?(t.$message({message:r.data.msg,type:"success"}),t.init()):t.$message.error(r.data.msg),e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(0),e.t0;case 10:case"end":return e.stop()}},e,t,[[0,7]])})),function(n){return e.apply(this,arguments)})).catch(function(){t.$message({type:"info",message:"取消输入"})})}},mounted:function(){var n=this,e=this.$route.query.id;this.curId=e,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:e}).then(function(e){if(1==e.data.code){for(var t=e.data.data,a=0;a<t.length;a++)if(t[a].son){"公益金管理"==t[a].name&&(n.seCurId=t[a].id,n.threeAuthList=t[a].son);for(var i=0;i<t[a].son.length;i++)t[a].action!=t[a].son[i].action&&(t[a].action=t[a].son[0].action),"未审核"==t[a].son[i].name&&"公益金管理"==t[a].name&&(n.thCurId=t[a].son[i].id)}n.authList=t}else n.$alert(e.data.msg,"提示",{type:"error"})}).catch(function(n){alert(n)})}},l=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("ctbHead",n._l(n.authList,function(e){return t("router-link",{key:e.id,class:n.seCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:n.curId}},"v-key":e.id}},[n._v("\n      "+n._s(e.name)+"\n    ")])}),1),n._v(" "),t("div",{staticClass:"container"},[t("div",{staticClass:"quote"},[n._m(0),n._v(" "),t("div",{staticClass:"quote-nav"},n._l(n.threeAuthList,function(e){return t("router-link",{key:e.id,class:n.thCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:n.curId}}}},[n._v("\n          "+n._s(e.name)+"\n        ")])}),1)]),n._v(" "),t("el-table",{attrs:{data:n.list}},[t("el-table-column",{attrs:{prop:"name",label:"姓名",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"age",label:"年龄",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{label:"婚否",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[n._v("\n          "+n._s(0==e.row.marriage?"未婚":"已婚")+"\n        ")]}}])}),n._v(" "),t("el-table-column",{attrs:{prop:"politics",label:"政治面貌",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"career",label:"职业",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"arms",label:"服役单位",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"start_time",label:"入伍时间",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{prop:"end_time",label:"转业时间",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{label:"地址",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-popover",{attrs:{placement:"top-start",title:"地址详情",width:"200",trigger:"hover",content:""+e.row.province+e.row.city+e.row.county+e.row.address}},[t("el-button",{staticClass:"ellipsis",attrs:{slot:"reference",type:"text"},slot:"reference"},[n._v(n._s(""+e.row.province+e.row.city+e.row.county+e.row.address))])],1)]}}])}),n._v(" "),t("el-table-column",{attrs:{prop:"create_time",label:"申请时间",align:"center"}}),n._v(" "),t("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return n.through(e.row)}}},[n._v("通过")]),n._v(" "),t("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return n.rejected(e.row)}}},[n._v("驳回")])]}}])})],1),n._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:n.list&&n.list.length>0,expression:"list && list.length>0"}],class:n.list&&n.list.length<=7?"page-nav":"page_center"},[t("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1)],1)],1)};l._withStripped=!0;var A={render:l,staticRenderFns:[function(){var n=this.$createElement,e=this._self._c||n;return e("div",{staticClass:"quote-ele"},[e("i"),this._v("审核-公益金管理-未审核")])}]},c=A;var p=!1;var d=t("VU/8")(s,c,!1,function(n){p||t("QOQr")},"data-v-598bac5b",null);d.options.__file="src/pages/audit/welfareFund/unaudited.vue";e.default=d.exports},yMvU:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,'\n.ellipsis[data-v-598bac5b] {\n  width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.laybox2 ul[data-v-598bac5b] {\n  margin: 33px auto;\n  border-bottom: 1px dashed #04bbfc;\n}\n.laybox2[data-v-598bac5b] {\n  padding: 60px;\n  font-size: 16px;\n}\n.laybox2 li[data-v-598bac5b] {\n  width: 300px;\n  text-align: left;\n  margin: 33px auto;\n}\n.t-c[data-v-598bac5b]:after {\n  content: "";\n  display: block;\n  height: 0;\n  clear: both;\n}\n.bot > div[data-v-598bac5b] {\n  position: relative;\n}\ndiv.bot[data-v-598bac5b] {\n  margin: 45px auto 35px auto;\n  height: 100px;\n}\ndiv.bot span[data-v-598bac5b] {\n  display: inline-block;\n  width: 20%;\n}\ndiv.bot input[data-v-598bac5b] {\n  display: inline-block;\n  width: 55%;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #aaa;\n}\ndiv.bot button[data-v-598bac5b] {\n  width: 110px;\n  height: 36px;\n  margin-left: -55px;\n  position: absolute;\n  border-radius: 18px;\n  -webkit-box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n          box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n  border: none;\n  color: #fff;\n  left: 50%;\n  top: 60px;\n}\nbutton.reject[data-v-598bac5b] {\n  background: rgba(237, 81, 55, 1);\n  margin-right: 30%;\n}\nbutton.pass[data-v-598bac5b] {\n  background-color: #20a0ff;\n}\n.left[data-v-598bac5b] {\n  float: left;\n  width: 50%;\n}\n.right[data-v-598bac5b] {\n  float: right;\n  width: 50%;\n}\n.nowrap[data-v-598bac5b] {\n  width: 120px !important;\n  text-align: center;\n  white-space: nowrap; /*规定文本不换行**/\n  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/\n  overflow: hidden;\n  margin: 0 auto;\n}\n.regionDetail[data-v-598bac5b] .el-dialog__title {\n  font-size: 22px;\n}\n.regionDetail[data-v-598bac5b] .el-dialog__body {\n  padding: 0px 25px 30px;\n  border-top: solid 2px #eee;\n}\n',"",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/audit/welfareFund/src/pages/audit/welfareFund/unaudited.vue"],names:[],mappings:";AAwNA;EACA,aAAA;EACA,iBAAA;EACA,wBAAA;EACA,qBAAA;EACA,6BAAA;EACA,sBAAA;CACA;AACA;EACA,kBAAA;EACA,kCAAA;CACA;AAEA;EACA,cAAA;EACA,gBAAA;CACA;AAEA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;CACA;AAEA;EACA,YAAA;EACA,eAAA;EACA,UAAA;EACA,YAAA;CACA;AAEA;EACA,mBAAA;CACA;AAEA;EACA,4BAAA;EACA,cAAA;CACA;AAEA;EACA,sBAAA;EACA,WAAA;CACA;AAEA;EACA,sBAAA;EACA,WAAA;EACA,cAAA;EACA,aAAA;EACA,8BAAA;CACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,uDAAA;UAAA,+CAAA;EACA,aAAA;EACA,YAAA;EACA,UAAA;EACA,UAAA;CACA;AAEA;EACA,iCAAA;EACA,kBAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,YAAA;EACA,WAAA;CACA;AAEA;EACA,aAAA;EACA,WAAA;CACA;AACA;EACA,wBAAA;EACA,mBAAA;EACA,oBAAA,CAAA,YAAA;EACA,wBAAA,CAAA,qBAAA;EACA,iBAAA;EACA,eAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,uBAAA;EACA,2BAAA;CACA",file:"unaudited.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>审核-公益金管理-未审核</div>\n        <div class="quote-nav">\n          <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link>\n        </div>\n      </div>\n      <el-table :data="list">\n        <el-table-column prop="name"\n                         label="姓名"\n                         align="center"></el-table-column>\n        <el-table-column prop="age"\n                         label="年龄"\n                         align="center"></el-table-column>\n\n        <el-table-column label="婚否"\n                         align="center">\n          <template slot-scope="scope">\n            {{scope.row.marriage==0 ? \'未婚\' : \'已婚\'}}\n          </template>\n        </el-table-column>\n        <el-table-column prop="politics"\n                         label="政治面貌"\n                         align="center"></el-table-column>\n        <el-table-column prop="career"\n                         label="职业"\n                         align="center"></el-table-column>\n        <el-table-column prop="arms"\n                         label="服役单位"\n                         align="center"></el-table-column>\n        <el-table-column prop="start_time"\n                         label="入伍时间"\n                         align="center"></el-table-column>\n        <el-table-column prop="end_time"\n                         label="转业时间"\n                         align="center"></el-table-column>\n        <el-table-column label="地址"\n                         align="center">\n          <template slot-scope="scope">\n            <el-popover placement="top-start"\n                        title="地址详情"\n                        width="200"\n                        trigger="hover"\n                        :content="`${scope.row.province}${scope.row.city}${scope.row.county}${scope.row.address}`">\n              <el-button type="text"\n                         slot="reference"\n                         class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}${scope.row.address}`}}</el-button>\n            </el-popover>\n          </template>\n        </el-table-column>\n        <el-table-column prop="create_time"\n                         label="申请时间"\n                         align="center"></el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="through(scope.row)">通过</el-button>\n            <el-button type="danger"\n                       size="small"\n                       @click="rejected(scope.row)">驳回</el-button>\n          </template>\n\n        </el-table-column>\n      </el-table>\n      \x3c!-- 分页 --\x3e\n      <div :class="list && list.length<=7?\'page-nav\':\'page_center\'"\n           v-show="list && list.length>0">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n\n  </div>\n</template>\n<script type="text/ecmascript-6">\n\nexport default {\n  data () {\n    return {\n      list: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      page: 0,\n      pageCount: 0,\n      authList: [],\n      threeAuthList: []\n    }\n  },\n  created () {\n    this.init();\n  },\n\n  methods: {\n\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post(\'admin/UserWelfare/welfareApply\', { token: this.token, page: this.page, status: 0 })\n        .then(res => {\n\n          this.list = res.data.data.list;\n\n          this.pageCount = res.data.data.rows;\n        }).catch(err => { })\n    },\n    //通过\n    through (row) {\n      this.$confirm(\'此操作将通过审核, 是否继续?\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        type: \'warning\',\n        center: true\n      }).then(async () => {\n        try {\n          const res = await this.$axios.post(\'admin/UserWelfare/welfareAdopt\', { token: this.token, id: row.id })\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: "success" })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n\n        } catch (err) {\n          throw (err)\n        }\n      }).catch(() => { });\n    },\n    //驳回\n    rejected (row) {\n      this.$prompt(\'请输入驳回理由\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        inputPattern: /\\S/,\n        inputErrorMessage: \'驳回理由不能为空\'\n      }).then(async ({ value }) => {\n        try {\n          const res = await this.$axios.post(\'admin/UserWelfare/welfareReject\', { token: this.token, id: row.id, reason: value })\n          if (res.data.code == 1) {\n            this.$message({ message: res.data.msg, type: \'success\' })\n            this.init()\n          } else {\n            this.$message.error(res.data.msg)\n          }\n        } catch (error) {\n          throw (error)\n        }\n      }).catch(() => {\n        this.$message({\n          type: \'info\',\n          message: \'取消输入\'\n        });\n      });\n    }\n\n\n  },\n  mounted () {\n    var id = this.$route.query.id;\n    this.curId = id;\n    this.$axios.post(\'admin/Auth/erAuth\', {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      id: id\n    })\n      .then(res => {\n\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            if (arr[i].son) {\n              if (arr[i].name == \'公益金管理\') {\n                this.seCurId = arr[i].id;\n                this.threeAuthList = arr[i].son;\n              }\n              for (var j = 0; j < arr[i].son.length; j++) {\n                if (arr[i].action != arr[i].son[j].action) {\n                  arr[i].action = arr[i].son[0].action;\n                }\n                if (arr[i].son[j].name == \'未审核\' && arr[i].name == \'公益金管理\') {\n                  this.thCurId = arr[i].son[j].id;\n                }\n              }\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$alert(res.data.msg, \'提示\', { type: \'error\' });\n        }\n      })\n      .catch(err => {\n        alert(err);\n      })\n  },\n}\n<\/script>\n<style scoped>\n.ellipsis {\n  width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.laybox2 ul {\n  margin: 33px auto;\n  border-bottom: 1px dashed #04bbfc;\n}\n\n.laybox2 {\n  padding: 60px;\n  font-size: 16px;\n}\n\n.laybox2 li {\n  width: 300px;\n  text-align: left;\n  margin: 33px auto;\n}\n\n.t-c:after {\n  content: "";\n  display: block;\n  height: 0;\n  clear: both;\n}\n\n.bot > div {\n  position: relative;\n}\n\ndiv.bot {\n  margin: 45px auto 35px auto;\n  height: 100px;\n}\n\ndiv.bot span {\n  display: inline-block;\n  width: 20%;\n}\n\ndiv.bot input {\n  display: inline-block;\n  width: 55%;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #aaa;\n}\n\ndiv.bot button {\n  width: 110px;\n  height: 36px;\n  margin-left: -55px;\n  position: absolute;\n  border-radius: 18px;\n  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n  border: none;\n  color: #fff;\n  left: 50%;\n  top: 60px;\n}\n\nbutton.reject {\n  background: rgba(237, 81, 55, 1);\n  margin-right: 30%;\n}\n\nbutton.pass {\n  background-color: #20a0ff;\n}\n\n.left {\n  float: left;\n  width: 50%;\n}\n\n.right {\n  float: right;\n  width: 50%;\n}\n.nowrap {\n  width: 120px !important;\n  text-align: center;\n  white-space: nowrap; /*规定文本不换行**/\n  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/\n  overflow: hidden;\n  margin: 0 auto;\n}\n.regionDetail >>> .el-dialog__title {\n  font-size: 22px;\n}\n.regionDetail >>> .el-dialog__body {\n  padding: 0px 25px 30px;\n  border-top: solid 2px #eee;\n}\n</style>\n'],sourceRoot:""}])}});
//# sourceMappingURL=94.8be5491d06eba6c2dbf1.js.map