webpackJsonp([114],{SeB8:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,'\n.ellipsis[data-v-34d4a9dc] {\n  width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.laybox2 ul[data-v-34d4a9dc] {\n  margin: 33px auto;\n  border-bottom: 1px dashed #04bbfc;\n}\n.laybox2[data-v-34d4a9dc] {\n  padding: 60px;\n  font-size: 16px;\n}\n.laybox2 li[data-v-34d4a9dc] {\n  width: 300px;\n  text-align: left;\n  margin: 33px auto;\n}\n.t-c[data-v-34d4a9dc]:after {\n  content: "";\n  display: block;\n  height: 0;\n  clear: both;\n}\n.bot > div[data-v-34d4a9dc] {\n  position: relative;\n}\ndiv.bot[data-v-34d4a9dc] {\n  margin: 45px auto 35px auto;\n  height: 100px;\n}\ndiv.bot span[data-v-34d4a9dc] {\n  display: inline-block;\n  width: 20%;\n}\ndiv.bot input[data-v-34d4a9dc] {\n  display: inline-block;\n  width: 55%;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #aaa;\n}\ndiv.bot button[data-v-34d4a9dc] {\n  width: 110px;\n  height: 36px;\n  margin-left: -55px;\n  position: absolute;\n  border-radius: 18px;\n  -webkit-box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n          box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n  border: none;\n  color: #fff;\n  left: 50%;\n  top: 60px;\n}\nbutton.reject[data-v-34d4a9dc] {\n  background: rgba(237, 81, 55, 1);\n  margin-right: 30%;\n}\nbutton.pass[data-v-34d4a9dc] {\n  background-color: #20a0ff;\n}\n.left[data-v-34d4a9dc] {\n  float: left;\n  width: 50%;\n}\n.right[data-v-34d4a9dc] {\n  float: right;\n  width: 50%;\n}\n.nowrap[data-v-34d4a9dc] {\n  width: 120px !important;\n  text-align: center;\n  white-space: nowrap; /*规定文本不换行**/\n  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/\n  overflow: hidden;\n  margin: 0 auto;\n}\n.regionDetail[data-v-34d4a9dc] .el-dialog__title {\n  font-size: 22px;\n}\n.regionDetail[data-v-34d4a9dc] .el-dialog__body {\n  padding: 0px 25px 30px;\n  border-top: solid 2px #eee;\n}\n',"",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/audit/reward/src/pages/audit/reward/audited.vue"],names:[],mappings:";AA4IA;EACA,aAAA;EACA,iBAAA;EACA,wBAAA;EACA,qBAAA;EACA,6BAAA;EACA,sBAAA;CACA;AACA;EACA,kBAAA;EACA,kCAAA;CACA;AAEA;EACA,cAAA;EACA,gBAAA;CACA;AAEA;EACA,aAAA;EACA,iBAAA;EACA,kBAAA;CACA;AAEA;EACA,YAAA;EACA,eAAA;EACA,UAAA;EACA,YAAA;CACA;AAEA;EACA,mBAAA;CACA;AAEA;EACA,4BAAA;EACA,cAAA;CACA;AAEA;EACA,sBAAA;EACA,WAAA;CACA;AAEA;EACA,sBAAA;EACA,WAAA;EACA,cAAA;EACA,aAAA;EACA,8BAAA;CACA;AAEA;EACA,aAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,uDAAA;UAAA,+CAAA;EACA,aAAA;EACA,YAAA;EACA,UAAA;EACA,UAAA;CACA;AAEA;EACA,iCAAA;EACA,kBAAA;CACA;AAEA;EACA,0BAAA;CACA;AAEA;EACA,YAAA;EACA,WAAA;CACA;AAEA;EACA,aAAA;EACA,WAAA;CACA;AACA;EACA,wBAAA;EACA,mBAAA;EACA,oBAAA,CAAA,YAAA;EACA,wBAAA,CAAA,qBAAA;EACA,iBAAA;EACA,eAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,uBAAA;EACA,2BAAA;CACA",file:"audited.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>审核-开发奖励发放-已发放</div>\n        <div class="quote-nav">\n          <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link>\n        </div>\n      </div>\n      <el-table :data="list">\n        <el-table-column prop="company"\n                         label="维修厂名称"\n                         align="center"></el-table-column>\n        <el-table-column prop="name"\n                         label="开发者姓名"\n                         align="center"></el-table-column>\n        <el-table-column prop="money"\n                         label="奖励金额"\n                         align="center"></el-table-column>\n        <el-table-column label="到账状态"\n                         align="center">\n          <template slot-scope="scope">\n            {{scope.row.wx_type===1 ? \'成功\' : \'失败\'}}\n          </template>\n        </el-table-column>\n        <el-table-column label="到账原因"\n                         align="center"\n                         prop="reason">\n\n        </el-table-column>\n        <el-table-column label="推荐码"\n                         align="center"\n                         prop="share_promo_code">\n\n        </el-table-column>\n        <el-table-column prop="create_time"\n                         label="时间"\n                         align="center"></el-table-column>\n\n      </el-table>\n      \x3c!-- 分页 --\x3e\n      <div :class="list && list.length<=7?\'page-nav\':\'page_center\'"\n           v-show="list && list.length>0">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n\n  </div>\n</template>\n<script type="text/ecmascript-6">\n\nexport default {\n  data () {\n    return {\n      list: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      page: 0,\n      pageCount: 0,\n      authList: [],\n      threeAuthList: []\n    }\n  },\n  created () {\n    this.init();\n  },\n\n  methods: {\n\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post(\'admin/ShopAudit/unRewardShop\', { token: this.token, page: this.page })\n        .then(res => {\n\n          this.list = res.data.data.data;\n\n          this.pageCount = res.data.data.rows;\n        }).catch(err => { })\n    },\n\n\n  },\n  mounted () {\n    var id = this.$route.query.id;\n    this.curId = id;\n    this.$axios.post(\'admin/Auth/erAuth\', {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      id: id\n    })\n      .then(res => {\n\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            if (arr[i].son) {\n              if (arr[i].name == \'开发奖励发放\') {\n                this.seCurId = arr[i].id;\n                this.threeAuthList = arr[i].son;\n              }\n              for (var j = 0; j < arr[i].son.length; j++) {\n                if (arr[i].action != arr[i].son[j].action) {\n                  arr[i].action = arr[i].son[0].action;\n                }\n                if (arr[i].son[j].name == \'已发放\' && arr[i].name == \'开发奖励发放\') {\n                  this.thCurId = arr[i].son[j].id;\n                }\n              }\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$alert(res.data.msg, \'提示\', { type: \'error\' });\n        }\n      })\n      .catch(err => {\n        alert(err);\n      })\n  },\n}\n<\/script>\n<style scoped>\n.ellipsis {\n  width: 150px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.laybox2 ul {\n  margin: 33px auto;\n  border-bottom: 1px dashed #04bbfc;\n}\n\n.laybox2 {\n  padding: 60px;\n  font-size: 16px;\n}\n\n.laybox2 li {\n  width: 300px;\n  text-align: left;\n  margin: 33px auto;\n}\n\n.t-c:after {\n  content: "";\n  display: block;\n  height: 0;\n  clear: both;\n}\n\n.bot > div {\n  position: relative;\n}\n\ndiv.bot {\n  margin: 45px auto 35px auto;\n  height: 100px;\n}\n\ndiv.bot span {\n  display: inline-block;\n  width: 20%;\n}\n\ndiv.bot input {\n  display: inline-block;\n  width: 55%;\n  outline: none;\n  border: none;\n  border-bottom: 1px solid #aaa;\n}\n\ndiv.bot button {\n  width: 110px;\n  height: 36px;\n  margin-left: -55px;\n  position: absolute;\n  border-radius: 18px;\n  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);\n  border: none;\n  color: #fff;\n  left: 50%;\n  top: 60px;\n}\n\nbutton.reject {\n  background: rgba(237, 81, 55, 1);\n  margin-right: 30%;\n}\n\nbutton.pass {\n  background-color: #20a0ff;\n}\n\n.left {\n  float: left;\n  width: 50%;\n}\n\n.right {\n  float: right;\n  width: 50%;\n}\n.nowrap {\n  width: 120px !important;\n  text-align: center;\n  white-space: nowrap; /*规定文本不换行**/\n  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/\n  overflow: hidden;\n  margin: 0 auto;\n}\n.regionDetail >>> .el-dialog__title {\n  font-size: 22px;\n}\n.regionDetail >>> .el-dialog__body {\n  padding: 0px 25px 30px;\n  border-top: solid 2px #eee;\n}\n</style>\n'],sourceRoot:""}])},"aGd/":function(n,t,e){var a=e("SeB8");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("7068b87e",a,!1,{})},wLcF:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{list:[],token:window.sessionStorage.getItem("bbytoken"),page:0,pageCount:0,authList:[],threeAuthList:[]}},created:function(){this.init()},methods:{paging:function(n){this.page=n,this.init()},init:function(){var n=this;this.$axios.post("admin/ShopAudit/unRewardShop",{token:this.token,page:this.page}).then(function(t){n.list=t.data.data.data,n.pageCount=t.data.data.rows}).catch(function(n){})}},mounted:function(){var n=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){for(var e=t.data.data,a=0;a<e.length;a++)if(e[a].son){"开发奖励发放"==e[a].name&&(n.seCurId=e[a].id,n.threeAuthList=e[a].son);for(var i=0;i<e[a].son.length;i++)e[a].action!=e[a].son[i].action&&(e[a].action=e[a].son[0].action),"已发放"==e[a].son[i].name&&"开发奖励发放"==e[a].name&&(n.thCurId=e[a].son[i].id)}n.authList=e}else n.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(n){alert(n)})}},i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("ctbHead",n._l(n.authList,function(t){return e("router-link",{key:t.id,class:n.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:n.curId}},"v-key":t.id}},[n._v("\n      "+n._s(t.name)+"\n    ")])}),1),n._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"quote"},[n._m(0),n._v(" "),e("div",{staticClass:"quote-nav"},n._l(n.threeAuthList,function(t){return e("router-link",{key:t.id,class:n.thCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:n.curId}}}},[n._v("\n          "+n._s(t.name)+"\n        ")])}),1)]),n._v(" "),e("el-table",{attrs:{data:n.list}},[e("el-table-column",{attrs:{prop:"company",label:"维修厂名称",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"name",label:"开发者姓名",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{prop:"money",label:"奖励金额",align:"center"}}),n._v(" "),e("el-table-column",{attrs:{label:"到账状态",align:"center"},scopedSlots:n._u([{key:"default",fn:function(t){return[n._v("\n          "+n._s(1===t.row.wx_type?"成功":"失败")+"\n        ")]}}])}),n._v(" "),e("el-table-column",{attrs:{label:"到账原因",align:"center",prop:"reason"}}),n._v(" "),e("el-table-column",{attrs:{label:"推荐码",align:"center",prop:"share_promo_code"}}),n._v(" "),e("el-table-column",{attrs:{prop:"create_time",label:"时间",align:"center"}})],1),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.list&&n.list.length>0,expression:"list && list.length>0"}],class:n.list&&n.list.length<=7?"page-nav":"page_center"},[e("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1)],1)],1)};i._withStripped=!0;var A={render:i,staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"quote-ele"},[t("i"),this._v("审核-开发奖励发放-已发放")])}]},o=A;var r=!1;var l=e("VU/8")(a,o,!1,function(n){r||e("aGd/")},"data-v-34d4a9dc",null);l.options.__file="src/pages/audit/reward/audited.vue";t.default=l.exports}});
//# sourceMappingURL=114.80ee1327e3ae4aad81f3.js.map