webpackJsonp([15],{"0CC7":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t("E7z3");var i={data:function(){return{isShow:!0,list:[],token:window.sessionStorage.getItem("bbytoken"),page:1,totalpage:1,pageCount:1,index:1,endpage:1,arr:[],n:1,authList:[],curId:0,seCurId:0,centerDialogVisible:!1}},updated:function(){this.$route.query.is?this.isShow=!1:this.isShow=!0},mounted:function(){var n=this,e=this.$route.query.id;this.curId=e,this.$axios.post("admin/Auth/erAuth",{token:this.token,id:e}).then(function(e){for(var t=e.data.data,i=0;i<t.length;i++)"添加区域"==t[i].name&&(n.seCurId=t[i].id);n.authList=t})},methods:{paging:function(n){this.page=n},regionNum:function(){this.centerDialogVisible=!0},tapSee:function(n){}}},a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("ctbHead",n._l(n.authList,function(e){return t("router-link",{key:e.id,class:n.seCurId==e.id?"cur":"",attrs:{to:{path:e.action,query:{id:n.curId}},"v-key":e.id}},[n._v("\n      "+n._s(e.name)+"\n    ")])}),1),n._v(" "),t("div",{staticClass:"container"},[t("div",{staticClass:"quote"},[t("div",{staticClass:"quote-ele"},[t("i"),n._v("增加区域"),t("input",{directives:[{name:"show",rawName:"v-show",value:n.isShow,expression:"isShow"}],staticClass:"CityInput",attrs:{placeholder:"搜索"}})])]),n._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:n.isShow,expression:"isShow"}],staticClass:"Routers"},[t("router-link",{attrs:{to:{path:"/MunicipalAgent/increaseRegion/Apply",query:{id:n.curId}},"active-class":"activeClass"}},[n._v("申请")]),n._v(" "),t("router-link",{attrs:{to:{path:"/MunicipalAgent/increaseRegion/Adopt",query:{id:n.curId}},"active-class":"activeClass"}},[n._v("通过")]),n._v(" "),t("router-link",{attrs:{to:{path:"/MunicipalAgent/increaseRegion/Reject",query:{id:n.curId}},"active-class":"activeClass"}},[n._v("驳回")])],1),n._v(" "),t("div",[t("router-view")],1)])],1)};a._withStripped=!0;var r={render:a,staticRenderFns:[]},o=r;var s=!1;var c=t("VU/8")(i,o,!1,function(n){s||(t("bzTx"),t("8t54"))},"data-v-9e47959c",null);c.options.__file="src/components/MunicipalAgent/increaseRegion.vue";e.default=c.exports},"8t54":function(n,e,t){var i=t("K+qN");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("fd77e14e",i,!1,{})},"K+qN":function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n.el-dialog__header {\n  background: rgba(152, 209, 249, 1);\n  padding-bottom: 20px;\n}\n.el-dialog__title {\n  color: white;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/MunicipalAgent/src/components/MunicipalAgent/increaseRegion.vue"],names:[],mappings:";AA4IA;EACA,mCAAA;EACA,qBAAA;CACA;AACA;EACA,aAAA;CACA",file:"increaseRegion.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>增加区域<input placeholder="搜索"\n                 class="CityInput"\n                 v-show="isShow"></div>\n      </div>\n      <div class="Routers"\n           v-show="isShow">\n        <router-link :to="{path:\'/MunicipalAgent/increaseRegion/Apply\',query:{id:curId}}"\n                     active-class="activeClass">申请</router-link>\n        <router-link :to="{path:\'/MunicipalAgent/increaseRegion/Adopt\',query:{id:curId}}"\n                     active-class="activeClass">通过</router-link>\n        <router-link :to="{path:\'/MunicipalAgent/increaseRegion/Reject\',query:{id:curId}}"\n                     active-class="activeClass">驳回</router-link>\n      </div>\n      <div>\n        <router-view></router-view>\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport page from \'../common.js\';\n\nexport default {\n  data () {\n    return {\n      isShow: true,\n      list: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      //分页数据\n      page: 1, //显示的页码数\n      totalpage: 1, //总页数\n      pageCount: 1,\n      index: 1, //点击的当前页，\n      endpage: 1, //当前一组页码的最大值\n      arr: [], //默认显示 1 2 3 4 5页\n      n: 1, //当前点击的页码的位置\n      authList: [],\n      curId: 0,\n      seCurId: 0,\n      centerDialogVisible: false\n    }\n  },\n\n\n  updated () {\n    if (this.$route.query.is) {\n      this.isShow = false\n    } else {\n      this.isShow = true\n    }\n  },\n  mounted () {\n\n    var id = this.$route.query.id\n    this.curId = id;\n    this.$axios.post("admin/Auth/erAuth", {\n      token: this.token,\n      id: id\n    }).then(res => {\n      var arr = res.data.data;\n\n      for (var i = 0; i < arr.length; i++) {\n        if (arr[i].name == "添加区域") {\n          this.seCurId = arr[i].id\n        }\n      }\n      this.authList = arr;\n    })\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n    },\n    regionNum () {\n      this.centerDialogVisible = true\n    },\n    tapSee (e) {\n\n    }\n\n  }\n}\n<\/script>\n<style scoped>\n.activeClass {\n  color: #333333 !important;\n}\n\n.CityInput {\n  width: 100px;\n  margin-left: 400px;\n  height: 36px;\n  border: 0;\n  outline: none;\n  background-color: #04bbfc;\n  border-radius: 18px;\n  text-align: center;\n}\n\ninput::-webkit-input-placeholder {\n  color: #ffffff;\n}\n.region {\n  margin-bottom: 50px;\n  width: 100%;\n  text-align: center;\n}\n.region > p {\n  display: inline-block;\n  margin: 0 50px;\n}\n.region > p > span {\n  display: inline-block;\n}\n.Routers {\n  margin-top: 40px;\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 40px;\n}\n.Routers a {\n  color: #999999;\n  font-size: 22px;\n  text-align: center;\n}\n</style>\n<style>\n.el-dialog__header {\n  background: rgba(152, 209, 249, 1);\n  padding-bottom: 20px;\n}\n.el-dialog__title {\n  color: white;\n}\n</style>\n'],sourceRoot:""}])},bzTx:function(n,e,t){var i=t("unJZ");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("45eb76a3",i,!1,{})},unJZ:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n.activeClass[data-v-9e47959c] {\n  color: #333333 !important;\n}\n.CityInput[data-v-9e47959c] {\n  width: 100px;\n  margin-left: 400px;\n  height: 36px;\n  border: 0;\n  outline: none;\n  background-color: #04bbfc;\n  border-radius: 18px;\n  text-align: center;\n}\ninput[data-v-9e47959c]::-webkit-input-placeholder {\n  color: #ffffff;\n}\n.region[data-v-9e47959c] {\n  margin-bottom: 50px;\n  width: 100%;\n  text-align: center;\n}\n.region > p[data-v-9e47959c] {\n  display: inline-block;\n  margin: 0 50px;\n}\n.region > p > span[data-v-9e47959c] {\n  display: inline-block;\n}\n.Routers[data-v-9e47959c] {\n  margin-top: 40px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  margin-bottom: 40px;\n}\n.Routers a[data-v-9e47959c] {\n  color: #999999;\n  font-size: 22px;\n  text-align: center;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/MunicipalAgent/src/components/MunicipalAgent/increaseRegion.vue"],names:[],mappings:";AAiGA;EACA,0BAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,UAAA;EACA,cAAA;EACA,0BAAA;EACA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;CACA;AACA;EACA,oBAAA;EACA,YAAA;EACA,mBAAA;CACA;AACA;EACA,sBAAA;EACA,eAAA;CACA;AACA;EACA,sBAAA;CACA;AACA;EACA,iBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,0BAAA;MAAA,8BAAA;EACA,oBAAA;CACA;AACA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;CACA",file:"increaseRegion.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>增加区域<input placeholder="搜索"\n                 class="CityInput"\n                 v-show="isShow"></div>\n      </div>\n      <div class="Routers"\n           v-show="isShow">\n        <router-link :to="{path:\'/MunicipalAgent/increaseRegion/Apply\',query:{id:curId}}"\n                     active-class="activeClass">申请</router-link>\n        <router-link :to="{path:\'/MunicipalAgent/increaseRegion/Adopt\',query:{id:curId}}"\n                     active-class="activeClass">通过</router-link>\n        <router-link :to="{path:\'/MunicipalAgent/increaseRegion/Reject\',query:{id:curId}}"\n                     active-class="activeClass">驳回</router-link>\n      </div>\n      <div>\n        <router-view></router-view>\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport page from \'../common.js\';\n\nexport default {\n  data () {\n    return {\n      isShow: true,\n      list: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      //分页数据\n      page: 1, //显示的页码数\n      totalpage: 1, //总页数\n      pageCount: 1,\n      index: 1, //点击的当前页，\n      endpage: 1, //当前一组页码的最大值\n      arr: [], //默认显示 1 2 3 4 5页\n      n: 1, //当前点击的页码的位置\n      authList: [],\n      curId: 0,\n      seCurId: 0,\n      centerDialogVisible: false\n    }\n  },\n\n\n  updated () {\n    if (this.$route.query.is) {\n      this.isShow = false\n    } else {\n      this.isShow = true\n    }\n  },\n  mounted () {\n\n    var id = this.$route.query.id\n    this.curId = id;\n    this.$axios.post("admin/Auth/erAuth", {\n      token: this.token,\n      id: id\n    }).then(res => {\n      var arr = res.data.data;\n\n      for (var i = 0; i < arr.length; i++) {\n        if (arr[i].name == "添加区域") {\n          this.seCurId = arr[i].id\n        }\n      }\n      this.authList = arr;\n    })\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n    },\n    regionNum () {\n      this.centerDialogVisible = true\n    },\n    tapSee (e) {\n\n    }\n\n  }\n}\n<\/script>\n<style scoped>\n.activeClass {\n  color: #333333 !important;\n}\n\n.CityInput {\n  width: 100px;\n  margin-left: 400px;\n  height: 36px;\n  border: 0;\n  outline: none;\n  background-color: #04bbfc;\n  border-radius: 18px;\n  text-align: center;\n}\n\ninput::-webkit-input-placeholder {\n  color: #ffffff;\n}\n.region {\n  margin-bottom: 50px;\n  width: 100%;\n  text-align: center;\n}\n.region > p {\n  display: inline-block;\n  margin: 0 50px;\n}\n.region > p > span {\n  display: inline-block;\n}\n.Routers {\n  margin-top: 40px;\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 40px;\n}\n.Routers a {\n  color: #999999;\n  font-size: 22px;\n  text-align: center;\n}\n</style>\n<style>\n.el-dialog__header {\n  background: rgba(152, 209, 249, 1);\n  padding-bottom: 20px;\n}\n.el-dialog__title {\n  color: white;\n}\n</style>\n'],sourceRoot:""}])}});
//# sourceMappingURL=15.b5a5b35d4b535ef63d9b.js.map