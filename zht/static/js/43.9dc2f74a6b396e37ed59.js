webpackJsonp([43],{"6S1n":function(n,t,e){var a=e("aqdM");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("7c1d2a6e",a,!1,{})},FUza:function(n,t,e){var a=e("souD");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("8c547f7a",a,!1,{})},GPSD:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{token:window.sessionStorage.getItem("bbytoken"),pageCount:1,page:1,name:"",selectData:"0",dataList:[],ComplaintVisible:!1,addressVisible:!1,Complaintlist:{},Complaintdata:"",regionDialogVisible:!1,reasonData:[],address:""}},watch:{name:function(n){n||this.init()},selectData:function(n){var t={status:n};this.init(t)}},computed:{},filters:{DeliverGoodsText:function(n){return this.loading}},methods:{init:function(n){var t=this,e={token:this.token,page:this.page,search:n?n.name:"",ms_type:n?n.ms_type:"",status:n?n.status:""};this.$axios.post("admin/SmocRation/supplementList",e).then(function(n){1==n.data.code?(t.dataList=n.data.data.list,t.pageCount=n.data.data.rows):(t.dataList={},layer.msg(n.data.msg,{time:1e3}))}).catch(function(n){return console.log(n)})},Address:function(n){var t=this;this.$axios.post("admin/SmocRation/goodsArea",{token:this.token,sm_id:n}).then(function(n){1==n.data.code?t.address=n.data.data:t.address=""}).catch(function(n){return console.log(n)})},region:function(n){var t=this;this.$axios.post("admin/Smoc/areaNum",{token:this.token,id:n,type:1}).then(function(n){1==n.data.code&&(t.reasonData=n.data.data)}).catch(function(n){return console.log(n)})},DeliverGoods:function(n){var t=this;0==n.status&&this.$confirm("你确定要发货吗, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(e){t.$axios.post("admin/SmocRation/deliverGoods",{token:t.token,sm_id:n.sm_id,ration:n.number,id:n.id,sm_area_id:n.sm_area_id}).then(function(n){1==n.data.code&&(t.$store.commit("increment"),t.$message({message:n.data.msg,type:"success"}),t.init())}).catch(function(n){t.$message.error(e.data.msg)})}).catch(function(n){})},search:function(){var n={name:this.name,ms_type:2,status:this.selectData};this.init(n)},ComplaintDialog:function(n){var t=this;this.ComplaintVisible=!0,this.$axios.post("Smoc/tsDetail",{token:this.token,id:n}).then(function(n){1==n.data.code&&(t.Complaintlist=n.data.data)}).catch(function(n){return console.log(n)})},ComplaintContent:function(n){var t=this;this.ComplaintContentVisible=!0,this.$axios.post("Smoc/xcl",{token:this.token,id:n}).then(function(n){1==n.data.code&&(t.Complaintdata=n.data.data)}).catch(function(n){return console.log(n)})},paging:function(n){this.page=n,this.init()}},mounted:function(){this.init(),this.$store.commit("increment")}},i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{},[e("herderBar"),n._v(" "),e("div",{staticClass:"search"},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:n.selectData,callback:function(t){n.selectData=t},expression:"selectData"}},[e("el-option",{attrs:{label:"全部",value:"0"}})],1),n._v(" "),e("el-input",{staticClass:"input",attrs:{placeholder:"请输入搜索的名称"},model:{value:n.name,callback:function(t){n.name=t},expression:"name"}}),n._v(" "),e("el-button",{staticClass:"search_btn",attrs:{type:"primary"},on:{click:n.search}},[n._v("搜索")])],1),n._v(" "),e("div",{},[e("table",{staticClass:"table"},[n._m(0),n._v(" "),n._l(n.dataList,function(t){return e("tr",[e("td",{staticClass:"name"},[n._v(n._s(t.name))]),n._v(" "),e("td",[n._v(n._s(t.phone))]),n._v(" "),e("td",[e("a",{staticClass:"col-1EA",attrs:{href:"javascript:;"},on:{click:function(e){n.regionDialogVisible=!0,n.region(t.sm_area_id)}}},[n._v("查看")])]),n._v(" "),e("td",[e("a",{staticClass:"col-1EA",attrs:{href:"javascript:;"},on:{click:function(e){n.addressVisible=!0,n.Address(t.sm_id)}}},[n._v("查看")])]),n._v(" "),e("td",[t.sm_area_id<1||t.status?e("span",[n._v("\n             "+n._s(t.number)+"\n           ")]):e("el-input",{staticStyle:{width:"100px"},attrs:{type:"number"},model:{value:t.number,callback:function(e){n.$set(t,"number",e)},expression:"item.number"}})],1),n._v(" "),e("td",[n._v("\n           "+n._s(t.create_time)+"\n        ")]),n._v(" "),e("td",[e("a",{staticClass:"adopt",class:[0==t.status?"col-1EA":"col-0ACD00"],attrs:{href:"javascript:;"}},[n._v(n._s(0==t.status?"未发货":"已发货"))])]),n._v(" "),e("td",[e("el-button",{directives:[{name:"show",rawName:"v-show",value:1!=t.status,expression:"item.status!=1"}],attrs:{type:1==t.status?"success":"primary",size:"small"},on:{click:function(e){return n.DeliverGoods(t)}}},[n._v("确定发货")])],1)])})],2),n._v(" "),e("el-dialog",{staticClass:"teamDialog",attrs:{title:"投诉人",width:"500px",visible:n.ComplaintVisible,center:""},on:{"update:visible":function(t){n.ComplaintVisible=t}}},[e("div",[e("table",{staticClass:"table ComplaintTable"},[e("tr",[e("td",[n._v("名称:")]),n._v(" "),e("td",[n._v(n._s(n.Complaintlist.name))])]),n._v(" "),e("tr",[e("td",[n._v("类型:")]),n._v(" "),e("td",[e("div",{directives:[{name:"show",rawName:"v-show",value:1==n.Complaintlist.type,expression:"Complaintlist.type==1"}]},[n._v("运营商")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:2==n.Complaintlist.type,expression:"Complaintlist.type==2"}]},[n._v("市级代理")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:3==n.Complaintlist.type,expression:"Complaintlist.type==3"}]},[n._v("维修厂")])])]),n._v(" "),e("tr",[e("td",[n._v("负责人:")]),n._v(" "),e("td")]),n._v(" "),e("tr",[e("td",[n._v("电话:")]),n._v(" "),e("td",[n._v(n._s(n.Complaintlist.phone))])]),n._v(" "),e("tr",[e("td",[n._v("地址:")]),n._v(" "),e("td",[n._v(n._s(n.Complaintlist.address))])])])])]),n._v(" "),e("el-dialog",{attrs:{title:"地区",visible:n.regionDialogVisible,width:"400px",center:""},on:{"update:visible":function(t){n.regionDialogVisible=t}}},[e("div",[e("div",[e("strong",{staticStyle:{"font-size":"16px"}},[n._v("省: ")]),n._v(" "),n._l(n.reasonData,function(t){return e("span",[n._v("\n                      "+n._s(t.name)+"\n                      "),e("div",[e("strong",{staticStyle:{"font-size":"16px"}},[n._v("市: ")]),n._v(" "),n._l(t.son,function(t){return e("span",[n._v("\n                              "+n._s(t.name)+"\n                              "),e("div",[e("strong",{staticStyle:{"font-size":"16px"}},[n._v("区/县: ")]),n._v(" "),n._l(t.son,function(t){return e("span",[n._v(n._s(t.name)+"、")])})],2)])})],2)])})],2)])]),n._v(" "),e("el-dialog",{staticClass:"teamDialog",attrs:{title:"详细地址",width:"500px",visible:n.addressVisible,center:""},on:{"update:visible":function(t){n.addressVisible=t}}},[e("div",{staticClass:"addressVisible"},[n._v("\n           "+n._s(n.address)+"\n      ")])]),n._v(" "),e("div",{staticClass:"page_center"},[e("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1)],1)],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("tr",[e("th",[n._v("姓名")]),n._v(" "),e("th",[n._v("电话")]),n._v(" "),e("th",[n._v("服务区域")]),n._v(" "),e("th",[n._v("收货地址")]),n._v(" "),e("th",[n._v("需补充数量")]),n._v(" "),e("th",[n._v("预警时间")]),n._v(" "),e("th",[n._v("状态")]),n._v(" "),e("th",[n._v("操作")])])}]},o=s;var d=!1;var l=e("VU/8")(a,o,!1,function(n){d||(e("6S1n"),e("FUza"))},"data-v-36c4f552",null);l.options.__file="src/pages/serviceManager/Physics/index.vue";t.default=l.exports},aqdM:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.addressVisible[data-v-36c4f552] {\n  min-height: 200px;\n  padding-top: 20px;\n}\n.Head_portrait[data-v-36c4f552] {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 5px 0;\n  border-radius: 50%;\n}\n.search[data-v-36c4f552] {\n  margin: 15px 0 15px 40px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.search .input[data-v-36c4f552] {\n  width: 25.9%;\n}\n.Conduct > a[data-v-36c4f552] {\n  margin-left: 20px;\n}\n.name[data-v-36c4f552] {\n  width: 10%;\n}\n.table th[data-v-36c4f552] {\n  height: 50px !important;\n  line-height: 50px !important;\n}\n.content[data-v-36c4f552] {\n  width: 150px;\n  margin: 0 auto;\n}\n.Reason[data-v-36c4f552] {\n  width: 50px;\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n  float: left;\n  margin-left: 40px;\n}\n.rel[data-v-36c4f552] {\n  position: relative;\n}\n.See[data-v-36c4f552] {\n  float: left;\n}\n/*投诉人弹框*/\n.ComplaintTable[data-v-36c4f552] {\n  margin-bottom: 20px;\n}\n.ComplaintTable > tr > td[data-v-36c4f552] {\n  width: 50% !important;\n  text-align: left;\n  padding: 0 10px;\n}\n.ComplaintTable > tr > td[data-v-36c4f552]:last-child {\n  text-align: right;\n}\n/*投诉内容弹框*/\n.ComplaintContent[data-v-36c4f552] {\n  margin-top: 20px;\n  padding-bottom: 40px;\n}\n.reason[data-v-36c4f552] {\n  min-height: 100px;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/serviceManager/Physics/src/pages/serviceManager/Physics/index.vue"],names:[],mappings:";AAkRA;EACA,kBAAA;EACA,kBAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,cAAA;EACA,mBAAA;CACA;AACA;EACA,yBAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;CACA;AACA;EACA,aAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,WAAA;CACA;AACA;EACA,wBAAA;EACA,6BAAA;CACA;AACA;EACA,aAAA;EACA,eAAA;CACA;AACA;EACA,YAAA;EACA,sBAAA;EACA,oBAAA;EACA,iBAAA;EACA,wBAAA;EACA,iBAAA;EACA,YAAA;EACA,kBAAA;CACA;AACA;EACA,mBAAA;CACA;AACA;EACA,YAAA;CACA;AACA,SAAA;AACA;EACA,oBAAA;CACA;AACA;EACA,sBAAA;EACA,iBAAA;EACA,gBAAA;CACA;AACA;EACA,kBAAA;CACA;AACA,UAAA;AACA;EACA,iBAAA;EACA,qBAAA;CACA;AACA;EACA,kBAAA;CACA",file:"index.vue",sourcesContent:['<template lang="html">\n  <div class="">\n    <herderBar></herderBar>\n    <div class="search">\n      <el-select placeholder="请选择" v-model="selectData">\n        <el-option label=\'全部\' value="0"></el-option>\n      </el-select>\n      <el-input placeholder="请输入搜索的名称" class="input" v-model="name"></el-input>\n      <el-button  type="primary" class="search_btn" @click="search">搜索</el-button>\n    </div>\n    <div class="">\n      <table class="table">\n        <tr>\n          <th>姓名</th>\n          <th>电话</th>\n          <th>服务区域</th>\n          <th>收货地址</th>\n          <th>需补充数量</th>\n          <th>预警时间</th>\n          <th>状态</th>\n          <th>操作</th>    \n        </tr>\n        <tr v-for="item in dataList">\n          <td class="name">{{item.name}}</td>\n          <td>{{item.phone}}</td>\n          <td>\n                <a href="javascript:;" class="col-1EA" @click="regionDialogVisible=true,region(item.sm_area_id)">查看</a>\n          </td>\n          <td>\n              <a href="javascript:;" class="col-1EA" @click="addressVisible=true,Address(item.sm_id)">查看</a>\n          </td>\n          <td>\n             <span v-if=\'item.sm_area_id<1 || item.status\'>\n               {{item.number}}\n             </span>\n             <el-input style=\'width:100px\' type=\'number\' v-else v-model=\'item.number\'></el-input>\n          </td>\n          <td>\n             {{item.create_time}}\n          </td>\n          <td>\n              <a href="javascript:;" :class="[item.status==0?\'col-1EA\': \'col-0ACD00\']" class=\'adopt\' >{{item.status==0?\'未发货\':\'已发货\'}}</a>\n          </td>\n          <td>\n             <el-button v-show=\'item.status!=1\' :type="item.status==1? \'success\' :\'primary\'" size=\'small\' @click=\'DeliverGoods(item)\' >确定发货</el-button>\n          </td>\n        </tr>\n      </table>\n      \x3c!--投诉人弹框--\x3e\n      <el-dialog title="投诉人" class="teamDialog" width="500px" :visible.sync="ComplaintVisible" center>\n        <div>\n          <table class="table ComplaintTable">\n            <tr>\n              <td>名称:</td>\n              <td>{{Complaintlist.name}}</td>\n            </tr>\n            <tr>\n              <td>类型:</td>\n              <td >\n                <div v-show="Complaintlist.type==1">运营商</div>\n                <div v-show="Complaintlist.type==2">市级代理</div>\n                <div v-show="Complaintlist.type==3">维修厂</div>\n              </td>\n            </tr>\n            <tr>\n              <td>负责人:</td>\n              <td></td>\n            </tr>\n            <tr>\n              <td>电话:</td>\n              <td>{{Complaintlist.phone}}</td>\n            </tr>\n            <tr>\n              <td>地址:</td>\n              <td>{{Complaintlist.address}}</td>\n            </tr>\n          </table>\n        </div>\n      </el-dialog>\n\n       <el-dialog title="地区" :visible.sync="regionDialogVisible" width="400px" center >\n            <div >\n                <div>\n                    <strong style=\'font-size:16px\'>省: </strong>\n                    <span v-for=\'item in reasonData\'>\n                        {{item.name}}\n                        <div>\n                            <strong style=\'font-size:16px\'>市: </strong>\n                            <span v-for=\'it in item.son\'>\n                                {{it.name}}\n                                <div>\n                                    <strong style=\'font-size:16px\'>区/县: </strong>\n                                    <span v-for=\'i in it.son\'>{{i.name}}、</span>\n                                </div>\n                            </span>\n                        </div>\n                      \n                    </span> \n                </div>\n                \n            </div>\n           \n        </el-dialog>\n\n      \x3c!--投诉内容弹框--\x3e\n      <el-dialog title="详细地址" class="teamDialog" width="500px" :visible.sync="addressVisible" center>\n        <div class="addressVisible">\n             {{address}}\n        </div>\n      </el-dialog>\n      \x3c!--分页组件--\x3e\n      <div class="page_center">\n        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      token: window.sessionStorage.getItem("bbytoken"),\n      pageCount: 1,  //总页数,默认1\n      page: 1,       //当前页\n      name: \'\',//当前搜索名字\n      selectData: "0",\n      dataList: [],\n      ComplaintVisible: false,//投诉弹框\n      addressVisible: false, //投诉内容弹框\n      Complaintlist: {},//投诉人数据\n      Complaintdata: \'\', //投诉内容\n      regionDialogVisible: false,\n      reasonData: [],\n      address: \'\',\n\n\n    }\n  },\n  watch: {\n    name (newVal) {\n      if (!newVal) {\n        this.init()\n      }\n    },\n    selectData (newVal) { //监听select发生改变时,获取当前值,通过当前值,进去查询\n      var data = {\n        status: newVal\n      }\n      this.init(data)\n    },\n  },\n  computed: {\n\n  },\n  filters: {\n    DeliverGoodsText (status) {\n      return this.loading\n    }\n  },\n  methods: {\n    //初始化数据\n    init (data) {\n      var Data = {\n        token: this.token,\n        page: this.page,\n        search: data ? data.name : \'\',\n        ms_type: data ? data.ms_type : \'\',\n        status: data ? data.status : \'\'\n      }\n      this.$axios.post(\'admin/SmocRation/supplementList\', Data).then(res => {\n        if (res.data.code == 1) {\n          this.dataList = res.data.data.list; //拿返回来的数据\n\n          this.pageCount = res.data.data.rows  //拿取总页数\n        } else {\n          this.dataList = {}\n          layer.msg(res.data.msg, { time: 1000 }) //如果code不等于一代表,没有数据，提示暂无数据\n        }\n      }).catch(err => console.log(err))\n    },\n    Address (sm_id) {\n      this.$axios.post(\'admin/SmocRation/goodsArea\', {\n        token: this.token,\n        sm_id: sm_id\n      }).then(res => {\n        if (res.data.code == 1) {\n          this.address = res.data.data\n        } else {\n          this.address = \'\'\n        }\n      }).catch(err => console.log(err))\n    },\n    region (id) {\n      this.$axios.post(\'admin/Smoc/areaNum\', {\n        token: this.token,\n        id: id,\n        type: 1\n      }).then(res => {\n        if (res.data.code == 1) {\n          this.reasonData = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    /**发货 */\n    DeliverGoods (data) {\n      if (data.status == 0) {\n        this.$confirm(\'你确定要发货吗, 是否继续?\', \'提示\', {\n          confirmButtonText: \'确定\',\n          cancelButtonText: \'取消\',\n          type: \'warning\'\n        }).then(res => {\n          this.$axios.post(\'admin/SmocRation/deliverGoods\', {\n            token: this.token,\n            sm_id: data.sm_id,\n            ration: data.number,\n            id: data.id,\n            sm_area_id: data.sm_area_id\n          }).then(res => {\n            if (res.data.code == 1) {\n\n              this.$store.commit(\'increment\')\n              this.$message({ message: res.data.msg, type: \'success\' })\n              this.init()\n            }\n          }).catch(err => {\n            this.$message.error(res.data.msg)\n          })\n        }).catch(err => { })\n      }\n    },\n    //搜索\n    search () {\n      var data = {\n        name: this.name,\n        ms_type: 2,\n        status: this.selectData\n      }\n      this.init(data)\n    },\n    //点击查看投诉人详情\n    ComplaintDialog (id) {\n      this.ComplaintVisible = true\n      this.$axios.post(\'Smoc/tsDetail\', { token: this.token, id: id }).then(res => {\n        if (res.data.code == 1) {\n          this.Complaintlist = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    //投诉内容弹框\n    ComplaintContent (id) {\n      this.ComplaintContentVisible = true\n      this.$axios.post(\'Smoc/xcl\', { token: this.token, id: id }).then(res => {\n        if (res.data.code == 1) {\n          this.Complaintdata = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    //操作分页组件\n    paging (e) {\n      //把当前页赋值给page\n      this.page = e;\n      // 当前页发生改变时调取注册审核列表接口,重新渲染\n      this.init()\n    }\n  },\n  mounted () {\n    this.init()\n    this.$store.commit(\'increment\')\n  }\n}\n<\/script>\n\n<style lang="css" scoped="scoped">\n.addressVisible {\n  min-height: 200px;\n  padding-top: 20px;\n}\n.Head_portrait {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 5px 0;\n  border-radius: 50%;\n}\n.search {\n  margin: 15px 0 15px 40px;\n  display: flex;\n  align-items: center;\n}\n.search .input {\n  width: 25.9%;\n}\n.Conduct > a {\n  margin-left: 20px;\n}\n.name {\n  width: 10%;\n}\n.table th {\n  height: 50px !important;\n  line-height: 50px !important;\n}\n.content {\n  width: 150px;\n  margin: 0 auto;\n}\n.Reason {\n  width: 50px;\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n  float: left;\n  margin-left: 40px;\n}\n.rel {\n  position: relative;\n}\n.See {\n  float: left;\n}\n/*投诉人弹框*/\n.ComplaintTable {\n  margin-bottom: 20px;\n}\n.ComplaintTable > tr > td {\n  width: 50% !important;\n  text-align: left;\n  padding: 0 10px;\n}\n.ComplaintTable > tr > td:last-child {\n  text-align: right;\n}\n/*投诉内容弹框*/\n.ComplaintContent {\n  margin-top: 20px;\n  padding-bottom: 40px;\n}\n.reason {\n  min-height: 100px;\n}\n</style>\n<style >\n.el-select .el-input {\n  width: 130px;\n  margin-right: 20px;\n}\n\n.search_btn {\n  border-radius: 0;\n  height: 38px;\n  width: 120px;\n}\n.input-with-select .el-input-group__prepend {\n  background-color: #fff;\n}\n.el-dialog__header {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.el-dialog__body {\n  padding-top: 0 !important;\n}\n</style>\n'],sourceRoot:""}])},souD:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.el-select .el-input {\n  width: 130px;\n  margin-right: 20px;\n}\n.search_btn {\n  border-radius: 0;\n  height: 38px;\n  width: 120px;\n}\n.input-with-select .el-input-group__prepend {\n  background-color: #fff;\n}\n.el-dialog__header {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.el-dialog__body {\n  padding-top: 0 !important;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/serviceManager/Physics/src/pages/serviceManager/Physics/index.vue"],names:[],mappings:";AAyVA;EACA,aAAA;EACA,mBAAA;CACA;AAEA;EACA,iBAAA;EACA,aAAA;EACA,aAAA;CACA;AACA;EACA,uBAAA;CACA;AACA;EACA,qBAAA;EACA,iCAAA;CACA;AACA;EACA,0BAAA;CACA",file:"index.vue",sourcesContent:['<template lang="html">\n  <div class="">\n    <herderBar></herderBar>\n    <div class="search">\n      <el-select placeholder="请选择" v-model="selectData">\n        <el-option label=\'全部\' value="0"></el-option>\n      </el-select>\n      <el-input placeholder="请输入搜索的名称" class="input" v-model="name"></el-input>\n      <el-button  type="primary" class="search_btn" @click="search">搜索</el-button>\n    </div>\n    <div class="">\n      <table class="table">\n        <tr>\n          <th>姓名</th>\n          <th>电话</th>\n          <th>服务区域</th>\n          <th>收货地址</th>\n          <th>需补充数量</th>\n          <th>预警时间</th>\n          <th>状态</th>\n          <th>操作</th>    \n        </tr>\n        <tr v-for="item in dataList">\n          <td class="name">{{item.name}}</td>\n          <td>{{item.phone}}</td>\n          <td>\n                <a href="javascript:;" class="col-1EA" @click="regionDialogVisible=true,region(item.sm_area_id)">查看</a>\n          </td>\n          <td>\n              <a href="javascript:;" class="col-1EA" @click="addressVisible=true,Address(item.sm_id)">查看</a>\n          </td>\n          <td>\n             <span v-if=\'item.sm_area_id<1 || item.status\'>\n               {{item.number}}\n             </span>\n             <el-input style=\'width:100px\' type=\'number\' v-else v-model=\'item.number\'></el-input>\n          </td>\n          <td>\n             {{item.create_time}}\n          </td>\n          <td>\n              <a href="javascript:;" :class="[item.status==0?\'col-1EA\': \'col-0ACD00\']" class=\'adopt\' >{{item.status==0?\'未发货\':\'已发货\'}}</a>\n          </td>\n          <td>\n             <el-button v-show=\'item.status!=1\' :type="item.status==1? \'success\' :\'primary\'" size=\'small\' @click=\'DeliverGoods(item)\' >确定发货</el-button>\n          </td>\n        </tr>\n      </table>\n      \x3c!--投诉人弹框--\x3e\n      <el-dialog title="投诉人" class="teamDialog" width="500px" :visible.sync="ComplaintVisible" center>\n        <div>\n          <table class="table ComplaintTable">\n            <tr>\n              <td>名称:</td>\n              <td>{{Complaintlist.name}}</td>\n            </tr>\n            <tr>\n              <td>类型:</td>\n              <td >\n                <div v-show="Complaintlist.type==1">运营商</div>\n                <div v-show="Complaintlist.type==2">市级代理</div>\n                <div v-show="Complaintlist.type==3">维修厂</div>\n              </td>\n            </tr>\n            <tr>\n              <td>负责人:</td>\n              <td></td>\n            </tr>\n            <tr>\n              <td>电话:</td>\n              <td>{{Complaintlist.phone}}</td>\n            </tr>\n            <tr>\n              <td>地址:</td>\n              <td>{{Complaintlist.address}}</td>\n            </tr>\n          </table>\n        </div>\n      </el-dialog>\n\n       <el-dialog title="地区" :visible.sync="regionDialogVisible" width="400px" center >\n            <div >\n                <div>\n                    <strong style=\'font-size:16px\'>省: </strong>\n                    <span v-for=\'item in reasonData\'>\n                        {{item.name}}\n                        <div>\n                            <strong style=\'font-size:16px\'>市: </strong>\n                            <span v-for=\'it in item.son\'>\n                                {{it.name}}\n                                <div>\n                                    <strong style=\'font-size:16px\'>区/县: </strong>\n                                    <span v-for=\'i in it.son\'>{{i.name}}、</span>\n                                </div>\n                            </span>\n                        </div>\n                      \n                    </span> \n                </div>\n                \n            </div>\n           \n        </el-dialog>\n\n      \x3c!--投诉内容弹框--\x3e\n      <el-dialog title="详细地址" class="teamDialog" width="500px" :visible.sync="addressVisible" center>\n        <div class="addressVisible">\n             {{address}}\n        </div>\n      </el-dialog>\n      \x3c!--分页组件--\x3e\n      <div class="page_center">\n        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      token: window.sessionStorage.getItem("bbytoken"),\n      pageCount: 1,  //总页数,默认1\n      page: 1,       //当前页\n      name: \'\',//当前搜索名字\n      selectData: "0",\n      dataList: [],\n      ComplaintVisible: false,//投诉弹框\n      addressVisible: false, //投诉内容弹框\n      Complaintlist: {},//投诉人数据\n      Complaintdata: \'\', //投诉内容\n      regionDialogVisible: false,\n      reasonData: [],\n      address: \'\',\n\n\n    }\n  },\n  watch: {\n    name (newVal) {\n      if (!newVal) {\n        this.init()\n      }\n    },\n    selectData (newVal) { //监听select发生改变时,获取当前值,通过当前值,进去查询\n      var data = {\n        status: newVal\n      }\n      this.init(data)\n    },\n  },\n  computed: {\n\n  },\n  filters: {\n    DeliverGoodsText (status) {\n      return this.loading\n    }\n  },\n  methods: {\n    //初始化数据\n    init (data) {\n      var Data = {\n        token: this.token,\n        page: this.page,\n        search: data ? data.name : \'\',\n        ms_type: data ? data.ms_type : \'\',\n        status: data ? data.status : \'\'\n      }\n      this.$axios.post(\'admin/SmocRation/supplementList\', Data).then(res => {\n        if (res.data.code == 1) {\n          this.dataList = res.data.data.list; //拿返回来的数据\n\n          this.pageCount = res.data.data.rows  //拿取总页数\n        } else {\n          this.dataList = {}\n          layer.msg(res.data.msg, { time: 1000 }) //如果code不等于一代表,没有数据，提示暂无数据\n        }\n      }).catch(err => console.log(err))\n    },\n    Address (sm_id) {\n      this.$axios.post(\'admin/SmocRation/goodsArea\', {\n        token: this.token,\n        sm_id: sm_id\n      }).then(res => {\n        if (res.data.code == 1) {\n          this.address = res.data.data\n        } else {\n          this.address = \'\'\n        }\n      }).catch(err => console.log(err))\n    },\n    region (id) {\n      this.$axios.post(\'admin/Smoc/areaNum\', {\n        token: this.token,\n        id: id,\n        type: 1\n      }).then(res => {\n        if (res.data.code == 1) {\n          this.reasonData = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    /**发货 */\n    DeliverGoods (data) {\n      if (data.status == 0) {\n        this.$confirm(\'你确定要发货吗, 是否继续?\', \'提示\', {\n          confirmButtonText: \'确定\',\n          cancelButtonText: \'取消\',\n          type: \'warning\'\n        }).then(res => {\n          this.$axios.post(\'admin/SmocRation/deliverGoods\', {\n            token: this.token,\n            sm_id: data.sm_id,\n            ration: data.number,\n            id: data.id,\n            sm_area_id: data.sm_area_id\n          }).then(res => {\n            if (res.data.code == 1) {\n\n              this.$store.commit(\'increment\')\n              this.$message({ message: res.data.msg, type: \'success\' })\n              this.init()\n            }\n          }).catch(err => {\n            this.$message.error(res.data.msg)\n          })\n        }).catch(err => { })\n      }\n    },\n    //搜索\n    search () {\n      var data = {\n        name: this.name,\n        ms_type: 2,\n        status: this.selectData\n      }\n      this.init(data)\n    },\n    //点击查看投诉人详情\n    ComplaintDialog (id) {\n      this.ComplaintVisible = true\n      this.$axios.post(\'Smoc/tsDetail\', { token: this.token, id: id }).then(res => {\n        if (res.data.code == 1) {\n          this.Complaintlist = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    //投诉内容弹框\n    ComplaintContent (id) {\n      this.ComplaintContentVisible = true\n      this.$axios.post(\'Smoc/xcl\', { token: this.token, id: id }).then(res => {\n        if (res.data.code == 1) {\n          this.Complaintdata = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    //操作分页组件\n    paging (e) {\n      //把当前页赋值给page\n      this.page = e;\n      // 当前页发生改变时调取注册审核列表接口,重新渲染\n      this.init()\n    }\n  },\n  mounted () {\n    this.init()\n    this.$store.commit(\'increment\')\n  }\n}\n<\/script>\n\n<style lang="css" scoped="scoped">\n.addressVisible {\n  min-height: 200px;\n  padding-top: 20px;\n}\n.Head_portrait {\n  width: 50px;\n  height: 50px;\n  vertical-align: middle;\n  margin: 5px 0;\n  border-radius: 50%;\n}\n.search {\n  margin: 15px 0 15px 40px;\n  display: flex;\n  align-items: center;\n}\n.search .input {\n  width: 25.9%;\n}\n.Conduct > a {\n  margin-left: 20px;\n}\n.name {\n  width: 10%;\n}\n.table th {\n  height: 50px !important;\n  line-height: 50px !important;\n}\n.content {\n  width: 150px;\n  margin: 0 auto;\n}\n.Reason {\n  width: 50px;\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n  float: left;\n  margin-left: 40px;\n}\n.rel {\n  position: relative;\n}\n.See {\n  float: left;\n}\n/*投诉人弹框*/\n.ComplaintTable {\n  margin-bottom: 20px;\n}\n.ComplaintTable > tr > td {\n  width: 50% !important;\n  text-align: left;\n  padding: 0 10px;\n}\n.ComplaintTable > tr > td:last-child {\n  text-align: right;\n}\n/*投诉内容弹框*/\n.ComplaintContent {\n  margin-top: 20px;\n  padding-bottom: 40px;\n}\n.reason {\n  min-height: 100px;\n}\n</style>\n<style >\n.el-select .el-input {\n  width: 130px;\n  margin-right: 20px;\n}\n\n.search_btn {\n  border-radius: 0;\n  height: 38px;\n  width: 120px;\n}\n.input-with-select .el-input-group__prepend {\n  background-color: #fff;\n}\n.el-dialog__header {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.el-dialog__body {\n  padding-top: 0 !important;\n}\n</style>\n'],sourceRoot:""}])}});
//# sourceMappingURL=43.9dc2f74a6b396e37ed59.js.map