webpackJsonp([106],{HSIB:function(t,n,e){var a=e("RRXB");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("10e32cdd",a,!1,{})},QF57:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={data:function(){return{list:[],token:window.sessionStorage.getItem("bbytoken"),page:1,pageCount:1,authList:[],curId:0,threeAuthList:[],seCurId:0,thCurId:0,company:"",companyDialogVisible:!1,DialogState:1,currentID:0}},created:function(){this.init()},methods:{paging:function(t){this.page=t,this.init()},init:function(){var t=this;this.$axios.post("admin/SystemSetup/policyList",{token:this.token,page:this.page}).then(function(n){t.list=n.data.data.list,t.pageCount=n.data.data.rows}).catch(function(t){})},addCompany:function(){this.companyDialogVisible=!0,this.DialogState=1},SureAdd:function(){var t=this;if(this.company){var n={token:this.token,company:this.company};2==this.DialogState&&(n.id=this.currentID),this.$axios.post("admin/SystemSetup/policyCompany",n).then(function(n){1==n.data.code?layer.msg(n.data.msg,{time:1500},function(){t.companyDialogVisible=!1,t.init()}):layer.msg(n.data.msg,{time:1500})})}else layer.msg("请输入公司名称",{time:1500})},close:function(){this.company=""},modify:function(t,n){this.DialogState=2,this.companyDialogVisible=!0,this.company=n,this.currentID=t},del:function(t,n){var e=this;this.$confirm("您确定要永久删除此数据吗,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$axios.post("admin/SystemSetup/comdel",{token:e.token,id:t,company:n}).then(function(t){1==t.data.code?layer.msg(t.data.msg,{time:1e3},function(){e.init()}):layer.msg(t.data.msg,{time:1e3})}).catch(function(t){return console.log(t)})}).catch(function(){})}},mounted:function(){var t=this,n=this.$route.query.id;this.curId=n,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:n}).then(function(n){if(1==n.data.code){for(var e=n.data.data,a=0;a<e.length;a++)"保险公司列表"==e[a].name&&(t.seCurId=e[a].id,t.threeAuthList=e[a].son);t.authList=e}else t.$message.error(n.data.msg)}).catch(function(t){throw t})}},i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"Insurance"},[e("ctbHead",t._l(t.authList,function(n,a){return e("router-link",{key:n.id,class:t.seCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}},"v-key":n.id}},[t._v("\n      "+t._s(n.name)+"\n      "),e("el-badge",{directives:[{name:"show",rawName:"v-show",value:2==a&&t.$store.state.policyNumber>0,expression:"index==2 && $store.state.policyNumber>0"}],staticClass:"item",attrs:{value:t.$store.state.policyNumber,max:99}})],1)}),1),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"quote"},[e("div",{staticClass:"quote-ele"},[e("i"),t._v(" "),e("span",[t._v("保险公司列表")]),t._v(" "),e("el-button",{staticClass:"addbtn",attrs:{type:"primary"},on:{click:t.addCompany}},[t._v("添加")])],1),t._v(" "),e("div",{staticClass:"quote-nav"},t._l(t.threeAuthList,function(n){return e("router-link",{key:n.id,class:t.thCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}}}},[t._v("\n          "+t._s(n.name)+"\n        ")])}),1)]),t._v(" "),e("table",{staticClass:"table InsuranceTab"},[t._m(0),t._v(" "),e("tbody",t._l(t.list,function(n){return e("tr",[e("td",{staticClass:"t-l"},[t._v(t._s(n.id))]),t._v(" "),e("td",[t._v(t._s(n.company))]),t._v(" "),e("td",[t._v(t._s(n.create_time))]),t._v(" "),e("td",[e("a",{staticClass:"col-0ACD00",attrs:{href:"javascript:;"},on:{click:function(e){return t.modify(n.id,n.company)}}},[t._v("修改")]),t._v(" "),e("a",{staticClass:"col-FA644B",attrs:{href:"javascript:;"},on:{click:function(e){return t.del(n.id,n.company)}}},[t._v("删除")])])])}),0)]),t._v(" "),e("el-dialog",{attrs:{title:1==t.DialogState?"添加保险公司":"修改保险公司",visible:t.companyDialogVisible,width:"30%",center:""},on:{"update:visible":function(n){t.companyDialogVisible=n},close:t.close}},[e("div",{staticClass:"company"},[e("span",[t._v("请输入公司:")]),t._v(" "),e("span",[e("el-input",{attrs:{placeholder:"请输入保险公司名称"},model:{value:t.company,callback:function(n){t.company=n},expression:"company"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.SureAdd}},[t._v(t._s(1==t.DialogState?"确定":"修改"))])],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.list.length>0,expression:"list.length>0"}],class:t.list.length<=7?"page-nav":"page_center"},[e("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)],1)],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("thead",[n("tr",[n("th",[this._v("id")]),this._v(" "),n("th",[this._v("公司名称")]),this._v(" "),n("th",[this._v("录入时间")]),this._v(" "),n("th",[this._v("操作")])])])}]},o=s;var r=!1;var c=e("VU/8")(a,o,!1,function(t){r||e("HSIB")},"data-v-4f00d545",null);c.options.__file="src/components/Insurance/Insurance.vue";n.default=c.exports},RRXB:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.addbtn[data-v-4f00d545] {\n  float: right;\n  margin-right: 100px;\n  margin-top: 20px;\n}\n.InsuranceTab th[data-v-4f00d545] {\n  width: 25% !important;\n}\n.InsuranceTab tbody tr td a[data-v-4f00d545] {\n  margin-right: 0;\n}\n.company > span[data-v-4f00d545] {\n  display: inline-block;\n  height: 50px;\n  line-height: 50px;\n}\n.company > span[data-v-4f00d545]:last-child {\n  width: 80%;\n}\n.Insurance table a[data-v-4f00d545] {\n  margin-left: 10px;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/Insurance/src/components/Insurance/Insurance.vue"],names:[],mappings:";AA+MA;EACA,aAAA;EACA,oBAAA;EACA,iBAAA;CACA;AACA;EACA,sBAAA;CACA;AACA;EACA,gBAAA;CACA;AAEA;EACA,sBAAA;EACA,aAAA;EACA,kBAAA;CAEA;AACA;EACA,WAAA;CACA;AACA;EACA,kBAAA;CACA",file:"Insurance.vue",sourcesContent:['<template>\n  <div class=\'Insurance\'>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="(item,index) in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n        <el-badge v-show=\'index==2 && $store.state.policyNumber>0\'\n                  :value="$store.state.policyNumber"\n                  :max=\'99\'\n                  class="item">\n        </el-badge>\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele">\n          <i></i>\n          <span>保险公司列表</span>\n          <el-button type="primary"\n                     class="addbtn"\n                     @click="addCompany">添加</el-button>\n        </div>\n        <div class="quote-nav">\n          <router-link :class="thCurId==item.id? \'cur\':\'\'"\n                       v-for="item in threeAuthList"\n                       :key="item.id"\n                       :to="{path:item.action,query:{id:curId}}">\n            {{item.name}}\n          </router-link>\n        </div>\n      </div>\n      <table class="table InsuranceTab">\n        <thead>\n          <tr>\n            <th>id</th>\n            <th>公司名称</th>\n            <th>录入时间</th>\n            <th>操作</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="item in list">\n            <td class="t-l">{{item.id}}</td>\n            <td>{{item.company}}</td>\n            <td>{{item.create_time}}</td>\n            <td>\n              <a href="javascript:;"\n                 class=\'col-0ACD00\'\n                 @click="modify(item.id,item.company)">修改</a>\n              <a href="javascript:;"\n                 class=\'col-FA644B\'\n                 @click="del(item.id,item.company)">删除</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <el-dialog :title="DialogState==1?\'添加保险公司\':\'修改保险公司\'"\n                 :visible.sync="companyDialogVisible"\n                 width="30%"\n                 center\n                 @close="close">\n        <div class="company">\n          <span>请输入公司:</span>\n          <span>\n            <el-input v-model="company"\n                      placeholder="请输入保险公司名称"></el-input>\n          </span>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <el-button type="primary"\n                     @click="SureAdd">{{DialogState==1?\'确定\':\'修改\'}}</el-button>\n        </span>\n      </el-dialog>\n      \x3c!-- 分页 --\x3e\n      <div :class="list.length<=7?\'page-nav\':\'page_center\'"\n           v-show="list.length>0">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nexport default {\n  data () {\n    return {\n      list: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      //分页数据\n      page: 1, //显示的页码数\n      pageCount: 1,\n      authList: [],\n      curId: 0,\n      threeAuthList: [],\n      seCurId: 0,\n      thCurId: 0,\n      company: \'\', //输入的公司名称\n      companyDialogVisible: false,\n      DialogState: 1, //控制弹框的状态\n      currentID: 0,//当前列表id\n    }\n  },\n  created () {\n    this.init();\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post(\'admin/SystemSetup/policyList\', { token: this.token, page: this.page })\n        .then(res => {\n\n          this.list = res.data.data.list;\n          this.pageCount = res.data.data.rows;\n        }).catch(err => { })\n    },\n    //点击添加\n    addCompany () {\n      this.companyDialogVisible = true\n      this.DialogState = 1\n    },\n    //点击确定进行添加\n    SureAdd () {\n      if (!this.company) {\n        layer.msg(\'请输入公司名称\', { time: 1500 })\n        return;\n      }\n      let obj = { token: this.token, company: this.company };\n      if (this.DialogState == 2) obj.id = this.currentID;\n      this.$axios.post(\'admin/SystemSetup/policyCompany\', obj).then(res => {\n        if (res.data.code == 1) {\n          layer.msg(res.data.msg, { time: 1500 }, (() => {\n            this.companyDialogVisible = false\n            this.init()\n          }))\n        } else {\n          layer.msg(res.data.msg, { time: 1500 })\n        }\n      })\n    },\n    close () {\n      this.company = \'\'\n    },\n    //修改\n    modify (id, company) {\n      this.DialogState = 2\n      this.companyDialogVisible = true\n      this.company = company\n      this.currentID = id\n    },\n    del (id, company) { //删除\n      this.$confirm(\'您确定要永久删除此数据吗,是否继续?\', \'提示\', {\n        confirmButtonText: \'确定\',\n        cancelButtonText: \'取消\',\n        type: \'warning\'\n      }).then(() => {\n        this.$axios.post(\'admin/SystemSetup/comdel\', { token: this.token, id: id, company: company }).then(res => {\n          if (res.data.code == 1) {\n            layer.msg(res.data.msg, { time: 1000 }, (() => {\n              this.init()\n            }))\n          } else {\n            layer.msg(res.data.msg, { time: 1000 })\n          }\n        }).catch(err => console.log(err))\n      }).catch(() => { })\n    }\n\n  },\n  mounted () {\n    var id = this.$route.query.id;\n    this.curId = id;\n    this.$axios.post(\'admin/Auth/erAuth\', {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      id: id\n    })\n      .then(res => {\n\n        if (res.data.code == 1) {\n          var arr = res.data.data;\n          for (var i = 0; i < arr.length; i++) {\n            if (arr[i].name == \'保险公司列表\') {\n              this.seCurId = arr[i].id;\n              this.threeAuthList = arr[i].son;\n            }\n          }\n          this.authList = arr;\n        } else {\n          this.$message.error(res.data.msg)\n\n        }\n      })\n      .catch(err => {\n        throw (err)\n      })\n  },\n}\n<\/script>\n<style scoped>\n.addbtn {\n  float: right;\n  margin-right: 100px;\n  margin-top: 20px;\n}\n.InsuranceTab th {\n  width: 25% !important;\n}\n.InsuranceTab tbody tr td a {\n  margin-right: 0;\n}\n\n.company > span {\n  display: inline-block;\n  height: 50px;\n  line-height: 50px;\n  \n}\n.company > span:last-child {\n  width: 80%;\n}\n.Insurance table a {\n  margin-left: 10px;\n}\n</style>\n'],sourceRoot:""}])}});
//# sourceMappingURL=106.5f850d2b28f828c725a9.js.map