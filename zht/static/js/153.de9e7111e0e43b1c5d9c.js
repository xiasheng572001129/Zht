webpackJsonp([153],{"8nCy":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});e("E7z3");var i={data:function(){return{AZ:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],letter:"",brand:[],carList:[],bid:0,bName:"",page:1,totalPage:1,dialogVisible:!1,dialogVisible1:!1,input1:"",input2:"",input3:"",input4:"",input5:"",input6:"",input7:"",input8:"",carTypeId:0,authList:[],curId:0,seCurId:0,threeAuthList:""}},methods:{prev:function(t){this.page=t,this.getBrandList()},next:function(t){this.page=t,this.getBrandList()},current:function(t){this.page=t,this.getBrandList()},delCarType:function(t){var n=this;this.$alert("您要删除此车型吗？","提示",{type:"warning",callback:function(e){"confirm"==e&&n.$axios.post("Admin/Bangcar/de",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){1==t.data.code?(layer.msg(t.data.msg),n.getBrandList()):tihs.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}})},subCarType:function(){var t=this,n=this.input1,e=this.input2,i=this.input3,a=this.input4,r=this.input5,s=this.input6,o=this.input7,d=this.input8;n&&e&&i&&a&&r&&s&&o&&d?this.$axios.post("Admin/Bangcar/csave",{token:window.sessionStorage.getItem("bbytoken"),id:this.carTypeId,type:n,series:e,oil:i,litre:a,month:r,km:s,price:o,filter:d}).then(function(n){1==n.data.code?(layer.msg(n.data.msg),t.dialogVisible1=!1,t.getBrandList()):t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)}):this.$alert("必要的参数不能为空","提示",{type:"warning"})},changeCarType:function(t){var n=this;this.carTypeId=t,this.$axios.post("Admin/Bangcar/csave_v",{token:window.sessionStorage.getItem("bbytoken"),id:this.carTypeId}).then(function(t){if(1==t.data.code){var e=t.data.data;n.input1=e.type,n.input2=e.series,n.input3=e.oil,n.input4=e.litre,n.input5=e.month,n.input6=e.km,n.input7=e.price,n.input8=e.filter,n.dialogVisible1=!0}else n.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})},delBrand:function(t,n){var e=this;this.$alert("你要删除"+n+"吗？","提示",{type:"warning",callback:function(n){"confirm"==n&&e.$axios.post("Admin/Bangcar/brand_delete",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){1==t.data.code?(layer.msg(t.data.msg),e.getLetter(e.letter)):e.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}})},getLetter:function(t,n){var e=this;this.letter=n,this.carList=[],this.bid=0,this.$axios.post("Admin/Bangcar/CarBrand",{token:window.sessionStorage.getItem("bbytoken"),kt:this.letter}).then(function(t){1==t.data.code&&(e.brand=t.data.data),""==t.data.data&&(e.brand=[],e.$alert(t.data.msg,"提示",{type:"warning"}))}).catch(function(t){alert(t)})},getBid:function(t){this.bid=t,this.page=1,this.getBrandList()},getBrandList:function(){var t=this;this.$axios.post("Admin/Bangcar/CarPages",{token:window.sessionStorage.getItem("bbytoken"),id:this.bid,page:this.page}).then(function(n){1==n.data.code?(0==n.data.data.list.length&&layer.msg("暂无数据"),t.carList=n.data.data.list,t.totalPage=n.data.data.rows):t.$alert(n.data.msg,"提示",{type:"warning"})}).catch(function(t){alert(t)})},addBrand:function(){var t=this;this.$prompt("请输入品牌名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"品牌名称不能为空！"}).then(function(n){var e=n.value;t.$axios.post("Admin/Bangcar/CarBrandAdd",{token:window.sessionStorage.getItem("bbytoken"),name:e}).then(function(n){1==n.data.code?(layer.msg(n.data.msg),t.getLetter(t.letter)):t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}).catch(function(){})},changeBrand:function(){var t=this;this.$axios.post("Admin/Bangcar/ddd",{token:window.sessionStorage.getItem("bbytoken"),id:this.bid}).then(function(n){1==n.data.code?(t.bName=n.data.data.name,t.$prompt("请输入品牌名称","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/\S/,inputErrorMessage:"品牌名称不能为空！",inputValue:t.bName}).then(function(n){var e=n.value;t.$axios.post("Admin/Bangcar/CarBrandSave",{token:window.sessionStorage.getItem("bbytoken"),id:t.bid,name:e}).then(function(n){1==n.data.code?(layer.msg(n.data.msg),t.getLetter(t.letter)):t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}).catch(function(){})):t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})},addCarType:function(){var t=this;this.$axios.post("Admin/Bangcar/ddd",{token:window.sessionStorage.getItem("bbytoken"),id:this.bid}).then(function(n){1==n.data.code?(t.dialogVisible=!0,t.bName=n.data.data.name,t.input1="",t.input2="",t.input3="",t.input4="",t.input5="",t.input6="",t.input7="",t.input8=""):t.$alert(n.data.msg,"提示",{type:"error"})})},confirmAddType:function(){var t=this,n=this.input1,e=this.input2,i=this.input3,a=this.input4,r=this.input5,s=this.input6,o=this.input7,d=this.input8;n&&e&&i&&a&&r&&s&&o&&d?this.$axios.post("Admin/Bangcar/CarModel",{token:window.sessionStorage.getItem("bbytoken"),brand:this.bid,type:n,series:e,oil:i,litre:a,month:r,km:s,price:o,filter:d}).then(function(n){1==n.data.code?(layer.msg(n.data.msg),t.dialogVisible=!1,t.page=1,t.getBrandList()):t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)}):this.$alert("必要的参数不能为空","提示",{type:"warning"})}},mounted:function(){var t=this,n=this.$route.query.id;this.curId=n,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:n}).then(function(n){if(1==n.data.code){for(var e=n.data.data,i=0;i<e.length;i++)if("邦保养"==e[i].name&&(t.seCurId=e[i].id),e[i].son){t.threeAuthList=e[i].son;for(var a=0;a<e[i].son.length;a++)e[i].action!=e[i].son[a].action&&(e[i].action=e[i].son[0].action),"邦保养数据更改"==e[i].son[a].name&&"邦保养"==e[i].name&&(t.thCurId=e[i].son[a].id)}t.authList=e}else t.$alert(n.data.msg,"提示",{type:"error"})}).catch(function(t){alert(t)})}},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("ctbHead",t._l(t.authList,function(n){return e("router-link",{key:n.id,class:t.seCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}},"v-key":n.id}},[t._v("\n\t\t\t\t"+t._s(n.name)+"\n\n\t\t\t")])}),1),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"quote"},[t._m(0),t._v(" "),e("div",{staticClass:"quote-nav"},t._l(t.threeAuthList,function(n){return e("router-link",{key:n.id,class:t.thCurId==n.id?"cur":"",attrs:{to:{path:n.action,query:{id:t.curId}}}},[t._v("\n\t\t\t\t\t\t"+t._s(n.name)+"\n\t\t\t\t\t")])}),1)]),t._v(" "),e("div",{staticClass:"center"},[e("div",{staticClass:"clear"},t._l(t.AZ,function(n){return e("div",{staticClass:"az f-l",class:t.letter==n?"color-409EFF":"",on:{click:function(e){return t.getLetter(e,n)}}},[t._v(t._s(n))])}),0),t._v(" "),t.brand.length>0?e("hr"):t._e(),t._v(" "),t.brand.length>0?e("div",{staticStyle:{margin:"10px 0"}},t._l(t.brand,function(n){return e("el-button",{key:n.id,attrs:{size:"mini"},on:{click:function(e){return t.getBid(n.id)}},nativeOn:{contextmenu:function(e){return e.preventDefault(),t.delBrand(n.id,n.name)}}},[t._v(t._s(n.name)+"\n\t\t\t\t\t")])}),1):t._e(),t._v(" "),t.letter||t.bid?e("hr"):t._e(),t._v(" "),e("div",{staticStyle:{padding:"10px 0"}},[t.letter?e("el-button",{attrs:{type:"primary"},on:{click:t.addBrand}},[t._v("车辆品牌添加")]):t._e(),t._v(" "),t.bid?e("el-button",{attrs:{type:"primary"},on:{click:t.addCarType}},[t._v("车辆型号添加")]):t._e(),t._v(" "),t.bid?e("el-button",{attrs:{type:"primary"},on:{click:t.changeBrand}},[t._v("品牌修改")]):t._e()],1),t._v(" "),t.carList.length>0?e("hr"):t._e(),t._v(" "),t.carList.length>0?e("table",[t._m(1),t._v(" "),t._l(t.carList,function(n){return e("tr",{key:n.id},[e("td",[t._v(t._s(n.type))]),t._v(" "),e("td",[t._v(t._s(n.series))]),t._v(" "),e("td",[t._v(t._s(n.oil))]),t._v(" "),e("td",[t._v(t._s(n.litre))]),t._v(" "),e("td",[t._v(t._s(n.month))]),t._v(" "),e("td",[t._v(t._s(n.km))]),t._v(" "),e("td",[t._v(t._s(n.price))]),t._v(" "),e("td",[t._v(t._s(n.filter))]),t._v(" "),e("td",[e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.changeCarType(n.id)}}},[t._v("修改")]),t._v(" "),e("el-button",{staticStyle:{color:"#EC5F63"},attrs:{type:"text"},on:{click:function(e){return t.delCarType(n.id)}}},[t._v("删除")])],1)])})],2):t._e(),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.totalPage&&t.totalPage>1&&t.carList&&t.carList.length>1,expression:"totalPage&&totalPage>1&&carList&&carList.length>1"}],staticClass:"page_center"},[e("el-pagination",{attrs:{background:"",layout:"prev, pager, next,jumper,total,->","page-count":t.totalPage,"current-page":t.page},on:{"prev-click":t.prev,"next-click":t.next,"current-change":t.current}})],1)]),t._v(" "),e("el-dialog",{attrs:{title:"车辆型号添加",visible:t.dialogVisible,width:"60%"},on:{"update:visible":function(n){t.dialogVisible=n}}},[e("div",{staticClass:"add-car-type"},[e("div",[t._v("车辆品牌："+t._s(t.bName))]),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t车型：\n\t\t\t\t\t\t"),e("el-input",{attrs:{placeholder:"请输入车型"},model:{value:t.input1,callback:function(n){t.input1=n},expression:"input1"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t排量：\n\t\t\t\t\t\t"),e("el-input",{attrs:{placeholder:"请输入排量"},model:{value:t.input2,callback:function(n){t.input2=n},expression:"input2"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t用油：\n\t\t\t\t\t\t"),e("el-input",{attrs:{placeholder:"请输入用油"},model:{value:t.input3,callback:function(n){t.input3=n},expression:"input3"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t升数(L)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入升数"},model:{value:t.input4,callback:function(n){t.input4=n},expression:"input4"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t保养周期(月)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入保养周期"},model:{value:t.input5,callback:function(n){t.input5=n},expression:"input5"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t保养公里数(KM)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入保养公里数"},model:{value:t.input6,callback:function(n){t.input6=n},expression:"input6"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t价格(元)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入价格"},model:{value:t.input7,callback:function(n){t.input7=n},expression:"input7"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t滤芯补助(元)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入滤芯补助"},model:{value:t.input8,callback:function(n){t.input8=n},expression:"input8"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(n){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.confirmAddType}},[t._v("确 定")])],1)]),t._v(" "),e("el-dialog",{attrs:{title:"车辆型号修改",visible:t.dialogVisible1,width:"60%"},on:{"update:visible":function(n){t.dialogVisible1=n}}},[e("div",{staticClass:"add-car-type"},[e("div",[t._v("\n\t\t\t\t\t\t车型：\n\t\t\t\t\t\t"),e("el-input",{attrs:{placeholder:"请输入车型"},model:{value:t.input1,callback:function(n){t.input1=n},expression:"input1"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t排量：\n\t\t\t\t\t\t"),e("el-input",{attrs:{placeholder:"请输入排量"},model:{value:t.input2,callback:function(n){t.input2=n},expression:"input2"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t用油：\n\t\t\t\t\t\t"),e("el-input",{attrs:{placeholder:"请输入用油"},model:{value:t.input3,callback:function(n){t.input3=n},expression:"input3"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t升数(L)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入升数"},model:{value:t.input4,callback:function(n){t.input4=n},expression:"input4"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t保养周期(月)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入保养周期"},model:{value:t.input5,callback:function(n){t.input5=n},expression:"input5"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t保养公里数(KM)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入保养公里数"},model:{value:t.input6,callback:function(n){t.input6=n},expression:"input6"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t价格(元)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入价格"},model:{value:t.input7,callback:function(n){t.input7=n},expression:"input7"}})],1),t._v(" "),e("div",[t._v("\n\t\t\t\t\t\t滤芯补助(元)：\n\t\t\t\t\t\t"),e("el-input",{attrs:{type:"number",placeholder:"请输入滤芯补助"},model:{value:t.input8,callback:function(n){t.input8=n},expression:"input8"}})],1)]),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(n){t.dialogVisible1=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.subCarType}},[t._v("确 定")])],1)])],1)],1)};a._withStripped=!0;var r={render:a,staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"quote-ele"},[n("i"),this._v("邦保养")])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("tr",[e("th",[t._v("车型")]),t._v(" "),e("th",[t._v("排量")]),t._v(" "),e("th",[t._v("用油")]),t._v(" "),e("th",[t._v("升数(L)")]),t._v(" "),e("th",[t._v("保养周期(月)")]),t._v(" "),e("th",[t._v("保养公里数(KM)")]),t._v(" "),e("th",[t._v("价格(元)")]),t._v(" "),e("th",[t._v("滤芯补助(元)")]),t._v(" "),e("th",[t._v("操作")])])}]},s=r;var o=!1;var d=e("VU/8")(i,s,!1,function(t){o||e("ALCA")},"data-v-2cdc747c",null);d.options.__file="src/components/systemSet/maintain/Datachange.vue";n.default=d.exports},ALCA:function(t,n,e){var i=e("pMFj");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("10357c73",i,!1,{})},pMFj:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.container[data-v-2cdc747c] {\n\t\tpadding: 40px 10px 0;\n}\nhr[data-v-2cdc747c] {\n\t\theight: 1px;\n\t\tborder: none;\n\t\tbackground-color: #ccc;\n}\n.color-409EFF[data-v-2cdc747c]{\n    color: #fff !important;\n    background-color:#409EFF !important;\n}\n.az[data-v-2cdc747c] {\n\t\tpadding: 0 18px;\n\t\theight: 30px;\n\t\tline-height: 30px;\n\t\ttext-align: center;\n\t\tbackground-color: #ddd;\n\t\tcolor: #666;\n\t\tmargin-right: 5px;\n\t\tmargin-bottom: 5px;\n\t\tcursor: pointer;\n}\ntable th[data-v-2cdc747c] {\n\t\theight: 50px;\n\t\tline-height: 50px;\n}\ntable td[data-v-2cdc747c] {\n\t\theight: 40px;\n\t\tline-height: 40px;\n}\n.add-car-type> div[data-v-2cdc747c] {\n\t\tline-height: 30px;\n}\n.center[data-v-2cdc747c]{\n\n\t\twidth: 100%;\n\t\tmargin-top: 50px;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/systemSet/maintain/src/components/systemSet/maintain/Datachange.vue"],names:[],mappings:";AAilBA;EACA,qBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;CACA;AACA;IACA,uBAAA;IACA,oCAAA;CACA;AACA;EACA,gBAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,gBAAA;CACA;AAEA;EACA,aAAA;EACA,kBAAA;CACA;AAEA;EACA,aAAA;EACA,kBAAA;CACA;AAEA;EACA,kBAAA;CACA;AACA;;EAEA,YAAA;EACA,iBAAA;CACA",file:"Datachange.vue",sourcesContent:["<template>\n\t<div>\n\t\t<ctbHead>\n\t\t\t<router-link :class=\"seCurId==item.id? 'cur':''\" v-for=\"item in authList\" :key=\"item.id\" :to=\"{path:item.action,query:{id:curId}}\" :v-key=\"item.id\">\n\t\t\t\t{{item.name}}\n\n\t\t\t</router-link>\n\t\t</ctbHead>\n\t\t<div class=\"container\">\n\t\t\t<div class=\"quote\">\n\t\t\t\t<div class=\"quote-ele\"><i></i>邦保养</div>\n\t\t\t\t<div class=\"quote-nav\">\n\t\t\t\t\t<router-link :class=\"thCurId==item.id? 'cur':''\" v-for=\"item in threeAuthList\" :key=\"item.id\" :to=\"{path:item.action,query:{id:curId}}\">\n\t\t\t\t\t\t{{item.name}}\n\t\t\t\t\t</router-link>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"center\">\n\t\t\t\t<div class=\"clear\">\n\t\t\t\t\t<div class=\"az f-l\" :class=\"letter==item?'color-409EFF':''\" @click=\"getLetter($event,item)\" v-for=\"item in AZ\">{{item}}</div>\n\t\t\t\t</div>\n\t\t\t\t<hr v-if=\"brand.length>0\">\n\t\t\t\t<div v-if=\"brand.length>0\" style=\"margin: 10px 0;\">\n\t\t\t\t\t<el-button size=\"mini\" @contextmenu.native.prevent=\"delBrand(item.id,item.name)\" @click=\"getBid(item.id)\" v-for=\"item in brand\" :key=\"item.id\">{{item.name}}\n\t\t\t\t\t</el-button>\n\t\t\t\t</div>\n\t\t\t\t<hr v-if=\"letter||bid\">\n\t\t\t\t<div style=\"padding: 10px 0;\">\n\t\t\t\t\t<el-button @click=\"addBrand\" v-if=\"letter\" type=\"primary\">车辆品牌添加</el-button>\n\t\t\t\t\t<el-button @click=\"addCarType\" v-if=\"bid\" type=\"primary\">车辆型号添加</el-button>\n\t\t\t\t\t<el-button @click=\"changeBrand\" v-if=\"bid\" type=\"primary\">品牌修改</el-button>\n\t\t\t\t</div>\n\t\t\t\t<hr v-if=\"carList.length>0\">\n\t\t\t\t<table v-if=\"carList.length>0\">\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>车型</th>\n\t\t\t\t\t\t<th>排量</th>\n\t\t\t\t\t\t<th>用油</th>\n\t\t\t\t\t\t<th>升数(L)</th>\n\t\t\t\t\t\t<th>保养周期(月)</th>\n\t\t\t\t\t\t<th>保养公里数(KM)</th>\n\t\t\t\t\t\t<th>价格(元)</th>\n\t\t\t\t\t\t<th>滤芯补助(元)</th>\n\t\t\t\t\t\t<th>操作</th>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr v-for=\"item in carList\" :key=\"item.id\">\n\t\t\t\t\t\t<td>{{item.type}}</td>\n\t\t\t\t\t\t<td>{{item.series}}</td>\n\t\t\t\t\t\t<td>{{item.oil}}</td>\n\t\t\t\t\t\t<td>{{item.litre}}</td>\n\t\t\t\t\t\t<td>{{item.month}}</td>\n\t\t\t\t\t\t<td>{{item.km}}</td>\n\t\t\t\t\t\t<td>{{item.price}}</td>\n\t\t\t\t\t\t<td>{{item.filter}}</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<el-button type=\"text\" @click=\"changeCarType(item.id)\">修改</el-button>\n\t\t\t\t\t\t\t<el-button style=\"color:#EC5F63\" @click=\"delCarType(item.id)\" type=\"text\">删除</el-button>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t\t<div class=\"page_center\" v-show=\"totalPage&&totalPage>1&&carList&&carList.length>1\">\n\t\t\t\t\t<el-pagination background @prev-click=\"prev\" @next-click=\"next\" @current-change=\"current\" layout=\"prev, pager, next,jumper,total,->\" :page-count=\"totalPage\" :current-page=\"page\">\n\t\t\t\t\t</el-pagination>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<el-dialog title=\"车辆型号添加\" :visible.sync=\"dialogVisible\" width=\"60%\">\n\t\t\t\t<div class=\"add-car-type\">\n\t\t\t\t\t<div>车辆品牌：{{bName}}</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t车型：\n\t\t\t\t\t\t<el-input v-model=\"input1\" placeholder=\"请输入车型\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t排量：\n\t\t\t\t\t\t<el-input v-model=\"input2\" placeholder=\"请输入排量\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t用油：\n\t\t\t\t\t\t<el-input v-model=\"input3\" placeholder=\"请输入用油\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t升数(L)：\n\t\t\t\t\t\t<el-input v-model=\"input4\" type=\"number\" placeholder=\"请输入升数\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t保养周期(月)：\n\t\t\t\t\t\t<el-input v-model=\"input5\" type=\"number\" placeholder=\"请输入保养周期\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t保养公里数(KM)：\n\t\t\t\t\t\t<el-input v-model=\"input6\" type=\"number\" placeholder=\"请输入保养公里数\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t价格(元)：\n\t\t\t\t\t\t<el-input v-model=\"input7\" type=\"number\" placeholder=\"请输入价格\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t滤芯补助(元)：\n\t\t\t\t\t\t<el-input v-model=\"input8\" type=\"number\" placeholder=\"请输入滤芯补助\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<span slot=\"footer\" class=\"dialog-footer\">\n       <el-button @click=\"dialogVisible = false\">取 消</el-button>\n       <el-button type=\"primary\" @click=\"confirmAddType\">确 定</el-button>\n      </span>\n\t\t\t</el-dialog>\n\t\t\t<el-dialog title=\"车辆型号修改\" :visible.sync=\"dialogVisible1\" width=\"60%\">\n\t\t\t\t<div class=\"add-car-type\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t车型：\n\t\t\t\t\t\t<el-input v-model=\"input1\" placeholder=\"请输入车型\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t排量：\n\t\t\t\t\t\t<el-input v-model=\"input2\" placeholder=\"请输入排量\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t用油：\n\t\t\t\t\t\t<el-input v-model=\"input3\" placeholder=\"请输入用油\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t升数(L)：\n\t\t\t\t\t\t<el-input v-model=\"input4\" type=\"number\" placeholder=\"请输入升数\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t保养周期(月)：\n\t\t\t\t\t\t<el-input v-model=\"input5\" type=\"number\" placeholder=\"请输入保养周期\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t保养公里数(KM)：\n\t\t\t\t\t\t<el-input v-model=\"input6\" type=\"number\" placeholder=\"请输入保养公里数\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t价格(元)：\n\t\t\t\t\t\t<el-input v-model=\"input7\" type=\"number\" placeholder=\"请输入价格\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t滤芯补助(元)：\n\t\t\t\t\t\t<el-input v-model=\"input8\" type=\"number\" placeholder=\"请输入滤芯补助\"></el-input>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<span slot=\"footer\" class=\"dialog-footer\">\n       <el-button @click=\"dialogVisible1 = false\">取 消</el-button>\n       <el-button type=\"primary\" @click=\"subCarType\">确 定</el-button>\n      </span>\n\t\t\t</el-dialog>\n\n\t\t</div>\n\t</div>\n\n\t</div>\n</template>\n<script type=\"text/ecmascript-6\">\n\timport page from '../../common.js';\n\texport default {\n\t\tdata() {\n\t\t\t\treturn {\n\t\t\t\t\tAZ: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],\n\t\t\t\t\tletter: '',\n\t\t\t\t\tbrand: [], //车品牌数组\n\t\t\t\t\tcarList: [], //详细的车信息数组\n\t\t\t\t\tbid: 0, //车品牌ID\n\t\t\t\t\tbName: '', //修改车品牌的时候默认的品牌名称\n\t\t\t\t\tpage: 1,\n\t\t\t\t\ttotalPage: 1,\n\t\t\t\t\tdialogVisible: false, //控制车辆型号添加模态窗 显示/隐藏\n\t\t\t\t\tdialogVisible1: false, //控制车辆型号修改模态窗 显示/隐藏\n\t\t\t\t\tinput1: '', //用户输入(默认)的车型\n\t\t\t\t\tinput2: '', //用户输入(默认)的排量\n\t\t\t\t\tinput3: '', //用户输入(默认)的用油\n\t\t\t\t\tinput4: '', //用户输入(默认)的升数\n\t\t\t\t\tinput5: '', //用户输入(默认)的保养周期\n\t\t\t\t\tinput6: '', //用户输入(默认)的保养公里数\n\t\t\t\t\tinput7: '', //用户输入(默认)的价格\n\t\t\t\t\tinput8: '', //用户输入(默认)的滤芯补助\n\t\t\t\t\tcarTypeId: 0, //车型ID\n\t\t\t\t\tauthList: [],\n\t\t\t\t\tcurId: 0,\n\t\t\t\t\tseCurId: 0,\n\t\t\t\t\tthreeAuthList: \"\"\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tmethods: {\n\t\t\t\t//分页\n\t\t\t\tprev(e) {\n\t\t\t\t\tthis.page = e;\n\t\t\t\t\tthis.getBrandList();\n\t\t\t\t},\n\t\t\t\tnext(e) {\n\t\t\t\t\tthis.page = e;\n\t\t\t\t\tthis.getBrandList();\n\t\t\t\t},\n\t\t\t\tcurrent(e) {\n\t\t\t\t\tthis.page = e;\n\t\t\t\t\tthis.getBrandList();\n\t\t\t\t},\n\t\t\t\t//删除车型\n\t\t\t\tdelCarType(id) {\n\t\t\t\t\tthis.$alert('您要删除此车型吗？', '提示', {\n\t\t\t\t\t\ttype: 'warning',\n\t\t\t\t\t\tcallback: action => {\n\t\t\t\t\t\t\tif(action == 'confirm') {\n\t\t\t\t\t\t\t\tthis.$axios.post('Admin/Bangcar/de', {\n\t\t\t\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\t\t\t\tid: id\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\t\t\t\tlayer.msg(res.data.msg);\n\t\t\t\t\t\t\t\t\t\t\tthis.getBrandList();\n\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\ttihs.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//修改车型参数提交\n\t\t\t\tsubCarType() {\n\t\t\t\t\t//1车型 2排量 3用油 4升数 5保养周期 6保养公里数 7价格 8滤芯补助\n\t\t\t\t\tvar ipt1 = this.input1,\n\t\t\t\t\t\tipt2 = this.input2,\n\t\t\t\t\t\tipt3 = this.input3,\n\t\t\t\t\t\tipt4 = this.input4,\n\t\t\t\t\t\tipt5 = this.input5,\n\t\t\t\t\t\tipt6 = this.input6,\n\t\t\t\t\t\tipt7 = this.input7,\n\t\t\t\t\t\tipt8 = this.input8;\n\t\t\t\t\tif(!ipt1 || !ipt2 || !ipt3 || !ipt4 || !ipt5 || !ipt6 || !ipt7 || !ipt8) {\n\t\t\t\t\t\tthis.$alert('必要的参数不能为空', '提示', {\n\t\t\t\t\t\t\ttype: 'warning'\n\t\t\t\t\t\t});\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/csave', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tid: this.carTypeId,\n\t\t\t\t\t\t\ttype: ipt1,\n\t\t\t\t\t\t\tseries: ipt2,\n\t\t\t\t\t\t\toil: ipt3,\n\t\t\t\t\t\t\tlitre: ipt4,\n\t\t\t\t\t\t\tmonth: ipt5,\n\t\t\t\t\t\t\tkm: ipt6,\n\t\t\t\t\t\t\tprice: ipt7,\n\t\t\t\t\t\t\tfilter: ipt8\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tlayer.msg(res.data.msg);\n\t\t\t\t\t\t\t\tthis.dialogVisible1 = false;\n\t\t\t\t\t\t\t\tthis.getBrandList();\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//修改车型参数\n\t\t\t\tchangeCarType(id) {\n\t\t\t\t\tthis.carTypeId = id;\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/csave_v', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tid: this.carTypeId\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tvar obj = res.data.data;\n\t\t\t\t\t\t\t\tthis.input1 = obj.type;\n\t\t\t\t\t\t\t\tthis.input2 = obj.series;\n\t\t\t\t\t\t\t\tthis.input3 = obj.oil;\n\t\t\t\t\t\t\t\tthis.input4 = obj.litre;\n\t\t\t\t\t\t\t\tthis.input5 = obj.month;\n\t\t\t\t\t\t\t\tthis.input6 = obj.km;\n\t\t\t\t\t\t\t\tthis.input7 = obj.price;\n\t\t\t\t\t\t\t\tthis.input8 = obj.filter;\n\t\t\t\t\t\t\t\tthis.dialogVisible1 = true;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//删除车品牌\n\t\t\t\tdelBrand(id, name) {\n\t\t\t\t\tthis.$alert('你要删除' + name + '吗？', '提示', {\n\t\t\t\t\t\ttype: 'warning',\n\t\t\t\t\t\tcallback: (action) => {\n\t\t\t\t\t\t\tif(action == 'confirm') {\n\t\t\t\t\t\t\t\tthis.$axios.post('Admin/Bangcar/brand_delete', {\n\t\t\t\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\t\t\t\tid: id\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\t\t\t\tlayer.msg(res.data.msg);\n\t\t\t\t\t\t\t\t\t\t\tthis.getLetter(this.letter);\n\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//获取车品牌列表\n\t\t\t\tgetLetter(event,e) {\n\t\t\t\t\tthis.letter = e;\n          \n\n\t\t\t\t\tthis.carList = [];\n\t\t\t\t\tthis.bid = 0;\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/CarBrand', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tkt: this.letter\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tthis.brand = res.data.data;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif(res.data.data == '') {\n\t\t\t\t\t\t\t\tthis.brand = [];\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'warning'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//获取车牌ID，并获取详细信息的列表数据\n\t\t\t\tgetBid(id) {\n\t\t\t\t\tthis.bid = id;\n\t\t\t\t\tthis.page = 1;\n\t\t\t\t\tthis.getBrandList();\n\t\t\t\t},\n\t\t\t\t//请求车型列表\n\t\t\t\tgetBrandList() {\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/CarPages', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tid: this.bid,\n\t\t\t\t\t\t\tpage: this.page\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t//            \n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tif(res.data.data.list.length == 0) {\n\t\t\t\t\t\t\t\t\tlayer.msg('暂无数据');\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tthis.carList = res.data.data.list;\n\t\t\t\t\t\t\t\tthis.totalPage = res.data.data.rows;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'warning'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}).catch(err => {\n\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//添加车品牌\n\t\t\t\taddBrand() {\n\t\t\t\t\tthis.$prompt('请输入品牌名称', '提示', {\n\t\t\t\t\t\t\tconfirmButtonText: '确定',\n\t\t\t\t\t\t\tcancelButtonText: '取消',\n\t\t\t\t\t\t\tinputPattern: /\\S/,\n\t\t\t\t\t\t\tinputErrorMessage: '品牌名称不能为空！'\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(({\n\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t}) => {\n\t\t\t\t\t\t\t//请求添加车品牌\n\t\t\t\t\t\t\tthis.$axios.post('Admin/Bangcar/CarBrandAdd', {\n\t\t\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\t\t\tname: value\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\t\t\tlayer.msg(res.data.msg);\n\t\t\t\t\t\t\t\t\t\t//请求成功后从新获取车型列表\n\t\t\t\t\t\t\t\t\t\tthis.getLetter(this.letter);\n\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(() => {})\n\t\t\t\t},\n\t\t\t\t//车品牌修改\n\t\t\t\tchangeBrand() {\n\t\t\t\t\t//获取需要更改的车品牌的信息\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/ddd', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tid: this.bid\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tthis.bName = res.data.data.name;\n\t\t\t\t\t\t\t\tthis.$prompt('请输入品牌名称', '提示', {\n\t\t\t\t\t\t\t\t\t\tconfirmButtonText: '确定',\n\t\t\t\t\t\t\t\t\t\tcancelButtonText: '取消',\n\t\t\t\t\t\t\t\t\t\tinputPattern: /\\S/,\n\t\t\t\t\t\t\t\t\t\tinputErrorMessage: '品牌名称不能为空！',\n\t\t\t\t\t\t\t\t\t\tinputValue: this.bName\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t.then(({\n\t\t\t\t\t\t\t\t\t\tvalue\n\t\t\t\t\t\t\t\t\t}) => {\n\t\t\t\t\t\t\t\t\t\t//车品牌修改操作\n\t\t\t\t\t\t\t\t\t\tthis.$axios.post('Admin/Bangcar/CarBrandSave', {\n\t\t\t\t\t\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\t\t\t\t\t\tid: this.bid,\n\t\t\t\t\t\t\t\t\t\t\t\tname: value\n\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\t\t\t\t\t\tlayer.msg(res.data.msg);\n\t\t\t\t\t\t\t\t\t\t\t\t\tthis.getLetter(this.letter);\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t.catch(() => {})\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//车型添加\n\t\t\t\taddCarType() {\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/ddd', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tid: this.bid\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tthis.dialogVisible = true;\n\t\t\t\t\t\t\t\tthis.bName = res.data.data.name;\n\t\t\t\t\t\t\t\t//清空数据\n\t\t\t\t\t\t\t\tthis.input1 = '';\n\t\t\t\t\t\t\t\tthis.input2 = '';\n\t\t\t\t\t\t\t\tthis.input3 = '';\n\t\t\t\t\t\t\t\tthis.input4 = '';\n\t\t\t\t\t\t\t\tthis.input5 = '';\n\t\t\t\t\t\t\t\tthis.input6 = '';\n\t\t\t\t\t\t\t\tthis.input7 = '';\n\t\t\t\t\t\t\t\tthis.input8 = '';\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t},\n\t\t\t\t//提交添加车型的数据\n\t\t\t\tconfirmAddType() {\n\t\t\t\t\t//1车型 2排量 3用油 4升数 5保养周期 6保养公里数 7价格 8滤芯补助\n\t\t\t\t\tvar ipt1 = this.input1,\n\t\t\t\t\t\tipt2 = this.input2,\n\t\t\t\t\t\tipt3 = this.input3,\n\t\t\t\t\t\tipt4 = this.input4,\n\t\t\t\t\t\tipt5 = this.input5,\n\t\t\t\t\t\tipt6 = this.input6,\n\t\t\t\t\t\tipt7 = this.input7,\n\t\t\t\t\t\tipt8 = this.input8;\n\t\t\t\t\tif(!ipt1 || !ipt2 || !ipt3 || !ipt4 || !ipt5 || !ipt6 || !ipt7 || !ipt8) {\n\t\t\t\t\t\tthis.$alert('必要的参数不能为空', '提示', {\n\t\t\t\t\t\t\ttype: 'warning'\n\t\t\t\t\t\t});\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\tthis.$axios.post('Admin/Bangcar/CarModel', {\n\t\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\t\tbrand: this.bid,\n\t\t\t\t\t\t\ttype: ipt1,\n\t\t\t\t\t\t\tseries: ipt2,\n\t\t\t\t\t\t\toil: ipt3,\n\t\t\t\t\t\t\tlitre: ipt4,\n\t\t\t\t\t\t\tmonth: ipt5,\n\t\t\t\t\t\t\tkm: ipt6,\n\t\t\t\t\t\t\tprice: ipt7,\n\t\t\t\t\t\t\tfilter: ipt8\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\t\tlayer.msg(res.data.msg);\n\t\t\t\t\t\t\t\tthis.dialogVisible = false;\n\t\t\t\t\t\t\t\tthis.page = 1;\n\n\t\t\t\t\t\t\t\tthis.getBrandList();\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\t\talert(err);\n\t\t\t\t\t\t})\n\t\t\t\t}\n\t\t\t},\n\t\t\tmounted() {\n\t\t\t\tvar id = this.$route.query.id;\n\t\t\t\tthis.curId = id;\n\t\t\t\t\n\t\t\t\tthis.$axios.post('admin/Auth/erAuth', {\n\t\t\t\t\t\ttoken: window.sessionStorage.getItem('bbytoken'),\n\t\t\t\t\t\tid: id\n\t\t\t\t\t})\n\t\t\t\t\t.then(res => {\n\t\t\t\t\t\t\n\t\t\t\t\t\tif(res.data.code == 1) {\n\t\t\t\t\t\t\tvar arr = res.data.data;\n\t\t\t\t\t\t\tfor(var i = 0; i < arr.length; i++) {\n\t\t\t\t\t\t\t\tif(arr[i].name == '邦保养') {\n\t\t\t\t\t\t\t\t\tthis.seCurId = arr[i].id;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tif(arr[i].son) {\n\t\t\t\t\t\t\t\t\tthis.threeAuthList = arr[i].son\n\t\t\t\t\t\t\t\t\tfor(var j = 0; j < arr[i].son.length; j++) {\n\t\t\t\t\t\t\t\t\t\tif(arr[i].action != arr[i].son[j].action) {\n\t\t\t\t\t\t\t\t\t\t\tarr[i].action = arr[i].son[0].action;\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\tif(arr[i].son[j].name == '邦保养数据更改' && arr[i].name == '邦保养') {\n\t\t\t\t\t\t\t\t\t\t\tthis.thCurId = arr[i].son[j].id;\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tthis.authList = arr;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tthis.$alert(res.data.msg, '提示', {\n\t\t\t\t\t\t\t\ttype: 'error'\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t\t.catch(err => {\n\t\t\t\t\t\talert(err);\n\t\t\t\t\t})\n\t\t\t}\n\t}\n<\/script>\n<style scoped>\n\t.container {\n\t\tpadding: 40px 10px 0;\n\t}\n\n\thr {\n\t\theight: 1px;\n\t\tborder: none;\n\t\tbackground-color: #ccc;\n\t}\n\t.color-409EFF{\n    color: #fff !important;\n    background-color:#409EFF !important;\n  }\n\t.az {\n\t\tpadding: 0 18px;\n\t\theight: 30px;\n\t\tline-height: 30px;\n\t\ttext-align: center;\n\t\tbackground-color: #ddd;\n\t\tcolor: #666;\n\t\tmargin-right: 5px;\n\t\tmargin-bottom: 5px;\n\t\tcursor: pointer;\n\t}\n\n\ttable th {\n\t\theight: 50px;\n\t\tline-height: 50px;\n\t}\n\n\ttable td {\n\t\theight: 40px;\n\t\tline-height: 40px;\n\t}\n\n\t.add-car-type> div {\n\t\tline-height: 30px;\n\t}\n\t.center{\n\n\t\twidth: 100%;\n\t\tmargin-top: 50px;\n\t}\n</style>\n"],sourceRoot:""}])}});
//# sourceMappingURL=153.de9e7111e0e43b1c5d9c.js.map