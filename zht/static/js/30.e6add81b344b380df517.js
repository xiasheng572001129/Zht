webpackJsonp([30],{"24tg":function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.table>tr>th[data-v-59133c58]{\n  height: 50px !important;\n  line-height: 50px\n}\n.table>tr>td[data-v-59133c58]{\n  font-size: 14px;\n}\n.adopt[data-v-59133c58]{\n  margin-right: 29px\n}\n/*头像*/\n.head_pic[data-v-59133c58]{\n  width: 50px;\n  height:50px;\n  border-radius: 50%;\n  vertical-align: middle;\n  margin: 17px 0;\n}\n/*详情弹框头像*/\n.Head_portrait[data-v-59133c58]{\n  text-align: center;\n}\n.Head_portrait>img[data-v-59133c58]{\n  width: 80px;\n  height:80px;\n  border-radius: 50%;\n  text-align: center;\n}\n/*详情弹框内容*/\n.content[data-v-59133c58]{\n  margin-top: 40px;\n  margin-bottom: 50px;\n}\n.content>div[data-v-59133c58]{\n  padding: 12px 0;\n  border-bottom: 1px solid #E6E6EB;\n}\n.content>div>span[data-v-59133c58]{\n  display: inline-block;\n  width: 49%;\n}\n.content>div>span[data-v-59133c58]:last-child{\n  text-align: right;\n}\n.adopt[data-v-59133c58]{\n  margin-right: 29px\n}\n/*通过弹框*/\n.adoptContent[data-v-59133c58]{\n  margin-bottom: 38px;\n  text-align: center;\n}\n.adoptContent>div[data-v-59133c58]{\n  margin-top: 20px;\n  padding-left: 20px;\n}\n.money[data-v-59133c58]{\n  font-size: 25px;\n  color: #1E2328;\n}\n.adoptContent>div[data-v-59133c58]:last-child{\n  color: #FA644B;\n  font-size: 18px;\n}\n.adoptContent>div>span[data-v-59133c58]:first-child{\n  display: inline-block;\n  width: 100px;\n}\n.input[data-v-59133c58]{\n  width: 120px;\n  height:40px;\n  background:rgba(245,245,250,1);\n  border:1px solid rgba(230,230,235,1);\n  margin-right: 10px;\n  text-align: center;\n}\n.select[data-v-59133c58]{\n  width:120px;\n  height:40px;\n  background:rgba(245,245,250,1);\n  border:1px solid rgba(230,230,235,1);\n  text-align: center;\n  -moz-text-align-last: center;\n       text-align-last: center;\n}\n/*驳回弹出框*/\n.textarea[data-v-59133c58]{\n  width: 100%;\n}\n.textarea>textarea[data-v-59133c58]{\n  border: none;\n  width: 100% !important;\n  resize:none;\n  height: 100px;\n}\n/*往期提现弹框*/\n.PutforwardTab>tr>th[data-v-59133c58]{\n   background:none !important;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/serviceManager/materielApply/Putforward/src/pages/serviceManager/materielApply/Putforward/Putforward.vue"],names:[],mappings:";AA2MA;EACA,wBAAA;EACA,iBAAA;CACA;AACA;EACA,gBAAA;CAEA;AACA;EACA,kBAAA;CACA;AACA,MAAA;AACA;EACA,YAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;CACA;AACA,UAAA;AACA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,YAAA;EACA,mBAAA;EACA,mBAAA;CACA;AACA,UAAA;AACA;EACA,iBAAA;EACA,oBAAA;CACA;AACA;EACA,gBAAA;EACA,iCAAA;CACA;AACA;EACA,sBAAA;EACA,WAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,kBAAA;CACA;AACA,QAAA;AACA;EACA,oBAAA;EACA,mBAAA;CACA;AACA;EACA,iBAAA;EACA,mBAAA;CACA;AACA;EACA,gBAAA;EACA,eAAA;CACA;AACA;EACA,eAAA;EACA,gBAAA;CACA;AAEA;EACA,sBAAA;EACA,aAAA;CAEA;AACA;EACA,aAAA;EACA,YAAA;EACA,+BAAA;EACA,qCAAA;EACA,mBAAA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,YAAA;EACA,+BAAA;EACA,qCAAA;EACA,mBAAA;EACA,6BAAA;OAAA,wBAAA;CACA;AACA,SAAA;AACA;EACA,YAAA;CACA;AACA;EACA,aAAA;EACA,uBAAA;EACA,YAAA;EACA,cAAA;CACA;AACA,UAAA;AACA;GACA,2BAAA;CACA",file:"Putforward.vue",sourcesContent:['<template lang="html">\n  <div class="register">\n    <table class="table">\n      <tr>\n        <th>姓名</th>\n        <th>电话</th>\n        <th>开户名</th>\n        <th>开户行</th>\n        <th>分行</th>\n        <th>卡号</th>\n        <th>提现次数</th>\n        <th>本次提现金额(元)</th>\n        <th>时间</th>\n        <th>操作</th>\n      </tr>\n      <tr v-for="item in dataList">\n        <td>{{item.name}}</td>\n        <td>{{item.phone}}</td>\n        <td>{{item.bank_name}}</td>\n        <td>{{item.bank_branch}}</td>\n        <td>{{item.back}}</td>\n        <td>{{item.account}}</td>\n        <td>\n          <a href="javascript:;" class="col-1EA" @click=\'Putforward(item.sm_id)\'>{{item.putsize}}</a>\n        </td>\n        <td>{{item.money}}</td>\n        <td>{{item.create_time}}</td>\n        <td>\n          <a href="javascript:;" class="col-0ACD00 adopt" @click="adopt(item.id,item.money)">通过</a>\n          <a href="javascript:;" class="col-FA644B" @click="Reject(item.id)">驳回</a>\n        </td>\n      </tr>\n    </table>\n    \x3c!--详情弹框  --\x3e\n    <el-dialog title="往期提现" :visible.sync="PutforwardVisible" width="540px" center>\n       <table class="table PutforwardTab">\n           <tr>\n             <th>提现金额</th>\n             <th>申请时间</th>\n             <th>通过时间</th>\n           </tr>\n           <tr v-for="item in PutforwardData">\n                <td>{{item.money}}</td>\n                <td>{{item.create_time}}</td>\n                <td>{{item.audit_time | datetime}}</td> \n           </tr>\n       </table>\n      <span slot="footer" class="dialog-footer">\n           <paging :page-count="PutforwardCount"   :page="PutforwardPage" @index="PutforwardNext"></paging>\n      </span>\n    </el-dialog>\n    \x3c!--通过申请弹框--\x3e\n    <el-dialog title="通过申请" :visible.sync="adoptDialogVisible" width="400px" center>\n      <div class="adoptContent">\n          <div>提现金额</div>\n          <div class="money">{{money}}</div>\n          <div>确定要通过提现申请吗</div>\n      </div>\n      <div slot="footer" class="dialog-footer">\n        <el-button type="primary" @click="DetermineAdopt">确定</el-button>\n      </div>\n    </el-dialog>\n    \x3c!--驳回弹框--\x3e\n    <el-dialog title="驳回理由" :visible.sync="RejectDialogVisible" width="400px" center @close="RejectClose">\n      <div class=\'textarea\'>\n         <textarea v-model="reason">\n\n         </textarea>\n      </div>\n      <div slot="footer" class="dialog-footer">\n        <el-button type="primary" @click="DetermineReject">提交</el-button>\n      </div>\n    </el-dialog>\n    \x3c!--分页组件--\x3e\n    <div class="page_center">\n      <paging :page-count="pageCount"   :page="page" @index="paging"></paging>\n    </div>\n  </div>\n</template>\n\n<script>\n  export default {\n    data(){\n      return{\n        token:window.sessionStorage.getItem("bbytoken"),\n        pageCount:1,  //总页数,默认1\n        page:1,       //当前页\n        PutforwardCount:1,//往期提现总页数\n        PutforwardPage:1,//往期提现当前页\n        PutforwardId:1,//每个往期提现的id\n        dataList:[],\n        PutforwardVisible:false,  //往期提现弹框弹框,默认不显示\n        PutforwardData:{},  //详情弹框数据\n        adoptDialogVisible:false,    //通过申请弹框,默认不显示\n        adoptData:{},//通过弹框数据\n        selectData:\'\', //下拉数据\n        adoptID:\'\', //通过id,\n        money:"",\n        RejectID:\'\',//驳回id\n        RejectDialogVisible:false,   //驳回弹框,默认不显示\n        reason:\'\' //驳回理由\n      }\n    },\n    methods:{\n      //初始化数据\n      init(){\n       \n        this.$axios.post(\'Smoc/putList\',{token:this.token,page:this.page}).then(res=>{\n          if(res.data.code==1){\n         \n          this.dataList=res.data.data.list; //拿返回来的数据\n          this.pageCount=res.data.data.rows  //拿取总页数\n        }else{\n          this.dataList={}\n          layer.msg(res.data.msg,{time:1000}) //如果code不等于一代表,没有数据，提示暂无数据\n        }\n      }).catch(err=>console.log(err))\n      },\n      //操作分页组件\n      paging(e){\n        //把当前页赋值给page\n        this.page=e;\n        // 当前页发生改变时调取注册审核列表接口,重新渲染\n        this.init()\n      },\n      //往期提现分页操作\n      PutforwardNext(e){\n              this.PutforwardPage=e;\n              this.Putforward(this.PutforwardId)\n      },\n      //点击查看提现\n      Putforward(sm_id){\n        this.PutforwardId=sm_id\n         this.$axios.post(\'Smoc/dePut\',{token:this.token,sm_id:sm_id,page:this.PutforwardPage}).then(res=>{\n            if(res.data.code==1){\n              this.PutforwardVisible=true\n            \n              this.PutforwardData=res.data.data.list\n              this.PutforwardCount=res.data.data.rows\n            }else{\n              layer.msg(res.data.msg,{time:1000})\n            }\n         }).catch(err=>console.log(err))\n      },\n      //点击通过\n      adopt(id,money){\n        this.adoptDialogVisible=true;\n        this.money=money\n        this.adoptID=id;\n      },\n      // 点击确定通过\n      DetermineAdopt(){\n        this.$axios.post(\'Smoc/passPut\',{token:this.token,id:this.adoptID}).then(res=>{\n         \n          if(res.data.code==1){\n         \n          layer.msg(res.data.msg,{time:1500},(()=>{\n            this.adoptDialogVisible=false\n            this.$store.commit(\'increment\')\n            this.init()\n        }))\n        }else{\n          layer.msg(res.data.msg,{time:1500})\n        }\n      }).catch(err=>console.log(err))\n      },\n      //点击驳回\n      Reject(id){\n        this.RejectDialogVisible=true\n        this.RejectID=id;\n      },\n      //点击关闭弹框情况文本域中的内容\n      RejectClose(){\n        this.reason=\'\'\n      },\n      //点击确认驳回\n      DetermineReject(){\n        if(!this.reason){  //如果没有输入驳回理由,直接return,不让执行下面的操作\n          this.$message({message:\'请输入驳回理由!\',type:\'error\'})\n          return;\n        }\n        this.$axios.post(\'Smoc/turnPut\',{token:this.token,id:this.RejectID,reason:this.reason}).then(res=>{\n          if(res.data.code==1){\n          layer.msg(res.data.msg,{time:1500},(()=>{\n            this.$store.commit(\'increment\')\n            this.RejectDialogVisible=false\n            this.init()\n        }))\n        }else{\n          layer.msg(res.data.msg,{time:1500})\n        }\n      }).catch(err=>console.log(err))\n      }\n    },\n    mounted(){\n      this.init()\n      this.$store.commit(\'increment\')\n    }\n  }\n<\/script>\n\n<style lang="css" scoped="scoped">\n\n  .table>tr>th{\n    height: 50px !important;\n    line-height: 50px\n  }\n  .table>tr>td{\n    font-size: 14px;\n\n  }\n  .adopt{\n    margin-right: 29px\n  }\n  /*头像*/\n  .head_pic{\n    width: 50px;\n    height:50px;\n    border-radius: 50%;\n    vertical-align: middle;\n    margin: 17px 0;\n  }\n  /*详情弹框头像*/\n  .Head_portrait{\n    text-align: center;\n  }\n  .Head_portrait>img{\n    width: 80px;\n    height:80px;\n    border-radius: 50%;\n    text-align: center;\n  }\n  /*详情弹框内容*/\n  .content{\n    margin-top: 40px;\n    margin-bottom: 50px;\n  }\n  .content>div{\n    padding: 12px 0;\n    border-bottom: 1px solid #E6E6EB;\n  }\n  .content>div>span{\n    display: inline-block;\n    width: 49%;\n  }\n  .content>div>span:last-child{\n    text-align: right;\n  }\n  .adopt{\n    margin-right: 29px\n  }\n  /*通过弹框*/\n  .adoptContent{\n    margin-bottom: 38px;\n    text-align: center;\n  }\n  .adoptContent>div{\n    margin-top: 20px;\n    padding-left: 20px;\n  }\n  .money{\n    font-size: 25px;\n    color: #1E2328;\n  }\n  .adoptContent>div:last-child{\n    color: #FA644B;\n    font-size: 18px;\n  }\n\n  .adoptContent>div>span:first-child{\n    display: inline-block;\n    width: 100px;\n\n  }\n  .input{\n    width: 120px;\n    height:40px;\n    background:rgba(245,245,250,1);\n    border:1px solid rgba(230,230,235,1);\n    margin-right: 10px;\n    text-align: center;\n  }\n  .select{\n    width:120px;\n    height:40px;\n    background:rgba(245,245,250,1);\n    border:1px solid rgba(230,230,235,1);\n    text-align: center;\n    text-align-last: center;\n  }\n  /*驳回弹出框*/\n  .textarea{\n    width: 100%;\n  }\n  .textarea>textarea{\n    border: none;\n    width: 100% !important;\n    resize:none;\n    height: 100px;\n  }\n  /*往期提现弹框*/\n  .PutforwardTab>tr>th{\n     background:none !important;\n  }\n</style>\n<style>\n  .el-dialog__header{\n    border-bottom: 1px solid #E6E6EB !important;\n    padding: 13px 0;\n  }\n  .el-dialog__headerbtn{\n    top: 15px;\n  }\n  .el-dialog__footer{\n    border-top: 1px solid #E6E6EB;\n    padding-bottom: 10px;\n  }\n  .PutforwardTab .el-dialog__body{\n    padding-top: 0 !important;\n  }\n</style>\n'],sourceRoot:""}])},Q0q5:function(t,n,e){var a=e("vpQD");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("5c35d69b",a,!1,{})},"cm+i":function(t,n,e){var a=e("24tg");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("7475e0ad",a,!1,{})},lJ29:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={data:function(){return{token:window.sessionStorage.getItem("bbytoken"),pageCount:1,page:1,PutforwardCount:1,PutforwardPage:1,PutforwardId:1,dataList:[],PutforwardVisible:!1,PutforwardData:{},adoptDialogVisible:!1,adoptData:{},selectData:"",adoptID:"",money:"",RejectID:"",RejectDialogVisible:!1,reason:""}},methods:{init:function(){var t=this;this.$axios.post("Smoc/putList",{token:this.token,page:this.page}).then(function(n){1==n.data.code?(t.dataList=n.data.data.list,t.pageCount=n.data.data.rows):(t.dataList={},layer.msg(n.data.msg,{time:1e3}))}).catch(function(t){return console.log(t)})},paging:function(t){this.page=t,this.init()},PutforwardNext:function(t){this.PutforwardPage=t,this.Putforward(this.PutforwardId)},Putforward:function(t){var n=this;this.PutforwardId=t,this.$axios.post("Smoc/dePut",{token:this.token,sm_id:t,page:this.PutforwardPage}).then(function(t){1==t.data.code?(n.PutforwardVisible=!0,n.PutforwardData=t.data.data.list,n.PutforwardCount=t.data.data.rows):layer.msg(t.data.msg,{time:1e3})}).catch(function(t){return console.log(t)})},adopt:function(t,n){this.adoptDialogVisible=!0,this.money=n,this.adoptID=t},DetermineAdopt:function(){var t=this;this.$axios.post("Smoc/passPut",{token:this.token,id:this.adoptID}).then(function(n){1==n.data.code?layer.msg(n.data.msg,{time:1500},function(){t.adoptDialogVisible=!1,t.$store.commit("increment"),t.init()}):layer.msg(n.data.msg,{time:1500})}).catch(function(t){return console.log(t)})},Reject:function(t){this.RejectDialogVisible=!0,this.RejectID=t},RejectClose:function(){this.reason=""},DetermineReject:function(){var t=this;this.reason?this.$axios.post("Smoc/turnPut",{token:this.token,id:this.RejectID,reason:this.reason}).then(function(n){1==n.data.code?layer.msg(n.data.msg,{time:1500},function(){t.$store.commit("increment"),t.RejectDialogVisible=!1,t.init()}):layer.msg(n.data.msg,{time:1500})}).catch(function(t){return console.log(t)}):this.$message({message:"请输入驳回理由!",type:"error"})}},mounted:function(){this.init(),this.$store.commit("increment")}},i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"register"},[e("table",{staticClass:"table"},[t._m(0),t._v(" "),t._l(t.dataList,function(n){return e("tr",[e("td",[t._v(t._s(n.name))]),t._v(" "),e("td",[t._v(t._s(n.phone))]),t._v(" "),e("td",[t._v(t._s(n.bank_name))]),t._v(" "),e("td",[t._v(t._s(n.bank_branch))]),t._v(" "),e("td",[t._v(t._s(n.back))]),t._v(" "),e("td",[t._v(t._s(n.account))]),t._v(" "),e("td",[e("a",{staticClass:"col-1EA",attrs:{href:"javascript:;"},on:{click:function(e){return t.Putforward(n.sm_id)}}},[t._v(t._s(n.putsize))])]),t._v(" "),e("td",[t._v(t._s(n.money))]),t._v(" "),e("td",[t._v(t._s(n.create_time))]),t._v(" "),e("td",[e("a",{staticClass:"col-0ACD00 adopt",attrs:{href:"javascript:;"},on:{click:function(e){return t.adopt(n.id,n.money)}}},[t._v("通过")]),t._v(" "),e("a",{staticClass:"col-FA644B",attrs:{href:"javascript:;"},on:{click:function(e){return t.Reject(n.id)}}},[t._v("驳回")])])])})],2),t._v(" "),e("el-dialog",{attrs:{title:"往期提现",visible:t.PutforwardVisible,width:"540px",center:""},on:{"update:visible":function(n){t.PutforwardVisible=n}}},[e("table",{staticClass:"table PutforwardTab"},[e("tr",[e("th",[t._v("提现金额")]),t._v(" "),e("th",[t._v("申请时间")]),t._v(" "),e("th",[t._v("通过时间")])]),t._v(" "),t._l(t.PutforwardData,function(n){return e("tr",[e("td",[t._v(t._s(n.money))]),t._v(" "),e("td",[t._v(t._s(n.create_time))]),t._v(" "),e("td",[t._v(t._s(t._f("datetime")(n.audit_time)))])])})],2),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("paging",{attrs:{"page-count":t.PutforwardCount,page:t.PutforwardPage},on:{index:t.PutforwardNext}})],1)]),t._v(" "),e("el-dialog",{attrs:{title:"通过申请",visible:t.adoptDialogVisible,width:"400px",center:""},on:{"update:visible":function(n){t.adoptDialogVisible=n}}},[e("div",{staticClass:"adoptContent"},[e("div",[t._v("提现金额")]),t._v(" "),e("div",{staticClass:"money"},[t._v(t._s(t.money))]),t._v(" "),e("div",[t._v("确定要通过提现申请吗")])]),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.DetermineAdopt}},[t._v("确定")])],1)]),t._v(" "),e("el-dialog",{attrs:{title:"驳回理由",visible:t.RejectDialogVisible,width:"400px",center:""},on:{"update:visible":function(n){t.RejectDialogVisible=n},close:t.RejectClose}},[e("div",{staticClass:"textarea"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.reason,expression:"reason"}],domProps:{value:t.reason},on:{input:function(n){n.target.composing||(t.reason=n.target.value)}}})]),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.DetermineReject}},[t._v("提交")])],1)]),t._v(" "),e("div",{staticClass:"page_center"},[e("paging",{attrs:{"page-count":t.pageCount,page:t.page},on:{index:t.paging}})],1)],1)};i._withStripped=!0;var o={render:i,staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("tr",[e("th",[t._v("姓名")]),t._v(" "),e("th",[t._v("电话")]),t._v(" "),e("th",[t._v("开户名")]),t._v(" "),e("th",[t._v("开户行")]),t._v(" "),e("th",[t._v("分行")]),t._v(" "),e("th",[t._v("卡号")]),t._v(" "),e("th",[t._v("提现次数")]),t._v(" "),e("th",[t._v("本次提现金额(元)")]),t._v(" "),e("th",[t._v("时间")]),t._v(" "),e("th",[t._v("操作")])])}]},r=o;var s=!1;var d=e("VU/8")(a,r,!1,function(t){s||(e("cm+i"),e("Q0q5"))},"data-v-59133c58",null);d.options.__file="src/pages/serviceManager/materielApply/Putforward/Putforward.vue";n.default=d.exports},vpQD:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.el-dialog__header{\n  border-bottom: 1px solid #E6E6EB !important;\n  padding: 13px 0;\n}\n.el-dialog__headerbtn{\n  top: 15px;\n}\n.el-dialog__footer{\n  border-top: 1px solid #E6E6EB;\n  padding-bottom: 10px;\n}\n.PutforwardTab .el-dialog__body{\n  padding-top: 0 !important;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/serviceManager/materielApply/Putforward/src/pages/serviceManager/materielApply/Putforward/Putforward.vue"],names:[],mappings:";AAkTA;EACA,4CAAA;EACA,gBAAA;CACA;AACA;EACA,UAAA;CACA;AACA;EACA,8BAAA;EACA,qBAAA;CACA;AACA;EACA,0BAAA;CACA",file:"Putforward.vue",sourcesContent:['<template lang="html">\n  <div class="register">\n    <table class="table">\n      <tr>\n        <th>姓名</th>\n        <th>电话</th>\n        <th>开户名</th>\n        <th>开户行</th>\n        <th>分行</th>\n        <th>卡号</th>\n        <th>提现次数</th>\n        <th>本次提现金额(元)</th>\n        <th>时间</th>\n        <th>操作</th>\n      </tr>\n      <tr v-for="item in dataList">\n        <td>{{item.name}}</td>\n        <td>{{item.phone}}</td>\n        <td>{{item.bank_name}}</td>\n        <td>{{item.bank_branch}}</td>\n        <td>{{item.back}}</td>\n        <td>{{item.account}}</td>\n        <td>\n          <a href="javascript:;" class="col-1EA" @click=\'Putforward(item.sm_id)\'>{{item.putsize}}</a>\n        </td>\n        <td>{{item.money}}</td>\n        <td>{{item.create_time}}</td>\n        <td>\n          <a href="javascript:;" class="col-0ACD00 adopt" @click="adopt(item.id,item.money)">通过</a>\n          <a href="javascript:;" class="col-FA644B" @click="Reject(item.id)">驳回</a>\n        </td>\n      </tr>\n    </table>\n    \x3c!--详情弹框  --\x3e\n    <el-dialog title="往期提现" :visible.sync="PutforwardVisible" width="540px" center>\n       <table class="table PutforwardTab">\n           <tr>\n             <th>提现金额</th>\n             <th>申请时间</th>\n             <th>通过时间</th>\n           </tr>\n           <tr v-for="item in PutforwardData">\n                <td>{{item.money}}</td>\n                <td>{{item.create_time}}</td>\n                <td>{{item.audit_time | datetime}}</td> \n           </tr>\n       </table>\n      <span slot="footer" class="dialog-footer">\n           <paging :page-count="PutforwardCount"   :page="PutforwardPage" @index="PutforwardNext"></paging>\n      </span>\n    </el-dialog>\n    \x3c!--通过申请弹框--\x3e\n    <el-dialog title="通过申请" :visible.sync="adoptDialogVisible" width="400px" center>\n      <div class="adoptContent">\n          <div>提现金额</div>\n          <div class="money">{{money}}</div>\n          <div>确定要通过提现申请吗</div>\n      </div>\n      <div slot="footer" class="dialog-footer">\n        <el-button type="primary" @click="DetermineAdopt">确定</el-button>\n      </div>\n    </el-dialog>\n    \x3c!--驳回弹框--\x3e\n    <el-dialog title="驳回理由" :visible.sync="RejectDialogVisible" width="400px" center @close="RejectClose">\n      <div class=\'textarea\'>\n         <textarea v-model="reason">\n\n         </textarea>\n      </div>\n      <div slot="footer" class="dialog-footer">\n        <el-button type="primary" @click="DetermineReject">提交</el-button>\n      </div>\n    </el-dialog>\n    \x3c!--分页组件--\x3e\n    <div class="page_center">\n      <paging :page-count="pageCount"   :page="page" @index="paging"></paging>\n    </div>\n  </div>\n</template>\n\n<script>\n  export default {\n    data(){\n      return{\n        token:window.sessionStorage.getItem("bbytoken"),\n        pageCount:1,  //总页数,默认1\n        page:1,       //当前页\n        PutforwardCount:1,//往期提现总页数\n        PutforwardPage:1,//往期提现当前页\n        PutforwardId:1,//每个往期提现的id\n        dataList:[],\n        PutforwardVisible:false,  //往期提现弹框弹框,默认不显示\n        PutforwardData:{},  //详情弹框数据\n        adoptDialogVisible:false,    //通过申请弹框,默认不显示\n        adoptData:{},//通过弹框数据\n        selectData:\'\', //下拉数据\n        adoptID:\'\', //通过id,\n        money:"",\n        RejectID:\'\',//驳回id\n        RejectDialogVisible:false,   //驳回弹框,默认不显示\n        reason:\'\' //驳回理由\n      }\n    },\n    methods:{\n      //初始化数据\n      init(){\n       \n        this.$axios.post(\'Smoc/putList\',{token:this.token,page:this.page}).then(res=>{\n          if(res.data.code==1){\n         \n          this.dataList=res.data.data.list; //拿返回来的数据\n          this.pageCount=res.data.data.rows  //拿取总页数\n        }else{\n          this.dataList={}\n          layer.msg(res.data.msg,{time:1000}) //如果code不等于一代表,没有数据，提示暂无数据\n        }\n      }).catch(err=>console.log(err))\n      },\n      //操作分页组件\n      paging(e){\n        //把当前页赋值给page\n        this.page=e;\n        // 当前页发生改变时调取注册审核列表接口,重新渲染\n        this.init()\n      },\n      //往期提现分页操作\n      PutforwardNext(e){\n              this.PutforwardPage=e;\n              this.Putforward(this.PutforwardId)\n      },\n      //点击查看提现\n      Putforward(sm_id){\n        this.PutforwardId=sm_id\n         this.$axios.post(\'Smoc/dePut\',{token:this.token,sm_id:sm_id,page:this.PutforwardPage}).then(res=>{\n            if(res.data.code==1){\n              this.PutforwardVisible=true\n            \n              this.PutforwardData=res.data.data.list\n              this.PutforwardCount=res.data.data.rows\n            }else{\n              layer.msg(res.data.msg,{time:1000})\n            }\n         }).catch(err=>console.log(err))\n      },\n      //点击通过\n      adopt(id,money){\n        this.adoptDialogVisible=true;\n        this.money=money\n        this.adoptID=id;\n      },\n      // 点击确定通过\n      DetermineAdopt(){\n        this.$axios.post(\'Smoc/passPut\',{token:this.token,id:this.adoptID}).then(res=>{\n         \n          if(res.data.code==1){\n         \n          layer.msg(res.data.msg,{time:1500},(()=>{\n            this.adoptDialogVisible=false\n            this.$store.commit(\'increment\')\n            this.init()\n        }))\n        }else{\n          layer.msg(res.data.msg,{time:1500})\n        }\n      }).catch(err=>console.log(err))\n      },\n      //点击驳回\n      Reject(id){\n        this.RejectDialogVisible=true\n        this.RejectID=id;\n      },\n      //点击关闭弹框情况文本域中的内容\n      RejectClose(){\n        this.reason=\'\'\n      },\n      //点击确认驳回\n      DetermineReject(){\n        if(!this.reason){  //如果没有输入驳回理由,直接return,不让执行下面的操作\n          this.$message({message:\'请输入驳回理由!\',type:\'error\'})\n          return;\n        }\n        this.$axios.post(\'Smoc/turnPut\',{token:this.token,id:this.RejectID,reason:this.reason}).then(res=>{\n          if(res.data.code==1){\n          layer.msg(res.data.msg,{time:1500},(()=>{\n            this.$store.commit(\'increment\')\n            this.RejectDialogVisible=false\n            this.init()\n        }))\n        }else{\n          layer.msg(res.data.msg,{time:1500})\n        }\n      }).catch(err=>console.log(err))\n      }\n    },\n    mounted(){\n      this.init()\n      this.$store.commit(\'increment\')\n    }\n  }\n<\/script>\n\n<style lang="css" scoped="scoped">\n\n  .table>tr>th{\n    height: 50px !important;\n    line-height: 50px\n  }\n  .table>tr>td{\n    font-size: 14px;\n\n  }\n  .adopt{\n    margin-right: 29px\n  }\n  /*头像*/\n  .head_pic{\n    width: 50px;\n    height:50px;\n    border-radius: 50%;\n    vertical-align: middle;\n    margin: 17px 0;\n  }\n  /*详情弹框头像*/\n  .Head_portrait{\n    text-align: center;\n  }\n  .Head_portrait>img{\n    width: 80px;\n    height:80px;\n    border-radius: 50%;\n    text-align: center;\n  }\n  /*详情弹框内容*/\n  .content{\n    margin-top: 40px;\n    margin-bottom: 50px;\n  }\n  .content>div{\n    padding: 12px 0;\n    border-bottom: 1px solid #E6E6EB;\n  }\n  .content>div>span{\n    display: inline-block;\n    width: 49%;\n  }\n  .content>div>span:last-child{\n    text-align: right;\n  }\n  .adopt{\n    margin-right: 29px\n  }\n  /*通过弹框*/\n  .adoptContent{\n    margin-bottom: 38px;\n    text-align: center;\n  }\n  .adoptContent>div{\n    margin-top: 20px;\n    padding-left: 20px;\n  }\n  .money{\n    font-size: 25px;\n    color: #1E2328;\n  }\n  .adoptContent>div:last-child{\n    color: #FA644B;\n    font-size: 18px;\n  }\n\n  .adoptContent>div>span:first-child{\n    display: inline-block;\n    width: 100px;\n\n  }\n  .input{\n    width: 120px;\n    height:40px;\n    background:rgba(245,245,250,1);\n    border:1px solid rgba(230,230,235,1);\n    margin-right: 10px;\n    text-align: center;\n  }\n  .select{\n    width:120px;\n    height:40px;\n    background:rgba(245,245,250,1);\n    border:1px solid rgba(230,230,235,1);\n    text-align: center;\n    text-align-last: center;\n  }\n  /*驳回弹出框*/\n  .textarea{\n    width: 100%;\n  }\n  .textarea>textarea{\n    border: none;\n    width: 100% !important;\n    resize:none;\n    height: 100px;\n  }\n  /*往期提现弹框*/\n  .PutforwardTab>tr>th{\n     background:none !important;\n  }\n</style>\n<style>\n  .el-dialog__header{\n    border-bottom: 1px solid #E6E6EB !important;\n    padding: 13px 0;\n  }\n  .el-dialog__headerbtn{\n    top: 15px;\n  }\n  .el-dialog__footer{\n    border-top: 1px solid #E6E6EB;\n    padding-bottom: 10px;\n  }\n  .PutforwardTab .el-dialog__body{\n    padding-top: 0 !important;\n  }\n</style>\n'],sourceRoot:""}])}});
//# sourceMappingURL=30.e6add81b344b380df517.js.map