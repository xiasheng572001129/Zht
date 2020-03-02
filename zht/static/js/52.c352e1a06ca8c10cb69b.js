webpackJsonp([52],{"8iku":function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,'\n[data-v-21bc4879] .viewer-canvas {\n  z-index: 9999;\n}\n[data-v-21bc4879] .el-dialog__wrapper {\n  overflow: hidden;\n}\n.table a[data-v-21bc4879] {\n  color: #04bbfc;\n}\n.details[data-v-21bc4879] {\n  font-size: 12px;\n}\n.information td[data-v-21bc4879] {\n  text-align: left;\n}\n.details table td[data-v-21bc4879] {\n  font-size: 12px;\n  border: none;\n}\n.Insurancetype[data-v-21bc4879] {\n  margin-top: 20px;\n}\n.Insurancetype table[data-v-21bc4879] {\n  border: 1px solid #dbdbdb;\n}\n.Insurancetype table th[data-v-21bc4879] {\n  background: none;\n  width: 50%;\n  border: 1px solid #dbdbdb;\n  font-size: 16px;\n}\n.Insurancetype table td[data-v-21bc4879] {\n  border: 1px solid #dbdbdb;\n}\n.Photo[data-v-21bc4879] {\n  text-align: center;\n  margin-top: 20px;\n  overflow-x: auto;\n}\n.Photo > ul[data-v-21bc4879] {\n  margin: 0 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.Photo > ul > li[data-v-21bc4879] {\n}\n.Photo img[data-v-21bc4879] {\n  text-align: center;\n  max-height: 100px;\n  max-height: 100px;\n  width: 100px;\n  height: 100px;\n  padding-left: 10px;\n}\n.content > textarea[data-v-21bc4879] {\n  border: none;\n  width: 100% !important;\n  resize: none;\n  height: 100px;\n  max-height: 300px !important;\n}\n.reasonContent[data-v-21bc4879] {\n  min-height: 300px;\n}\n.total[data-v-21bc4879]:after {\n  display: block;\n  content: "";\n  clear: both;\n}\n.right[data-v-21bc4879] {\n  float: right;\n  margin: 20px 0;\n  font-size: 18px;\n  color: #04bbfc;\n}\n',"",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/CarButler/Policy/Reject/src/pages/CarButler/Policy/Reject/Reject.vue"],names:[],mappings:";AA4MA;EACA,cAAA;CACA;AACA;EACA,iBAAA;CACA;AACA;EACA,eAAA;CACA;AACA;EACA,gBAAA;CACA;AACA;EACA,iBAAA;CACA;AACA;EACA,gBAAA;EACA,aAAA;CACA;AACA;EACA,iBAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,iBAAA;EACA,WAAA;EACA,0BAAA;EACA,gBAAA;CACA;AACA;EACA,0BAAA;CACA;AACA;EACA,mBAAA;EACA,iBAAA;EACA,iBAAA;CACA;AAEA;EACA,eAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;CACA;AACA;CACA;AACA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,aAAA;EACA,cAAA;EACA,mBAAA;CACA;AACA;EACA,aAAA;EACA,uBAAA;EACA,aAAA;EACA,cAAA;EACA,6BAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,eAAA;EACA,YAAA;EACA,YAAA;CACA;AAEA;EACA,aAAA;EACA,eAAA;EACA,gBAAA;EACA,eAAA;CACA",file:"Reject.vue",sourcesContent:["<template>\n  <div class='adopt'\n       ref='adopt'>\n    <table class='table'>\n      <tr>\n        <th>用户名称</th>\n        <th>电话</th>\n        <th>车型</th>\n        <th>车牌</th>\n        <th>设备号</th>\n        <th>保单号</th>\n        <th>驳回理由</th>\n        <th>申请时间</th>\n        <th>驳回时间</th>\n        <th>详情</th>\n      </tr>\n      <tr v-for=\"(item,index) in list\"\n          :key=\"index\">\n        <td>{{item.name}}</td>\n        <td>{{item.phone}}</td>\n        <td>{{item.type}}</td>\n        <td>{{item.plate}}</td>\n        <td>{{item.eq_num}}</td>\n        <td>{{item.policy_num}}</td>\n        <td>\n          <a href=\"javascript:;\"\n             @click='reason=item.reason,reasonVisible=true'>查看</a>\n        </td>\n        <td>{{item.create_time}}</td>\n        <td>{{item.audit_time}}</td>\n        <td>\n          <a href=\"javascript:;\"\n             @click='details(item.pid,item.u_id)'>详情</a>\n        </td>\n      </tr>\n    </table>\n    \x3c!--详情弹框--\x3e\n    <el-dialog title=\"详情\"\n               :visible.sync=\"detailsVisible\"\n               v-drag\n               width=\"800px\"\n               center>\n      <div class='details'>\n        <div class='content'>\n          \x3c!--保单信息--\x3e\n          <dl class='information'>\n            <dt>保单信息:</dt>\n            <dd class='left'>\n              <table class='table'>\n                <tr>\n                  <td>保险公司 : {{information.company}}</td>\n                  <td>保单号 : {{information.policy_num}}</td>\n                  <td>VIN码 : {{information.vin}}</td>\n                </tr>\n                <tr>\n                  <td>开始时间 : {{information.start_time}}</td>\n                  <td>结束时间 : {{information.end_time}}</td>\n                </tr>\n              </table>\n            </dd>\n          </dl>\n          \x3c!--险种详情--\x3e\n          <div class='Insurancetype'>\n            <table>\n              <tr>\n                <th>险种名称</th>\n                <th>金额</th>\n              </tr>\n              <tr v-for=\"(item,index) in information.name_price\"\n                  :key=\"index\">\n                <td>{{item.type}}</td>\n                <td>{{item.value}}</td>\n              </tr>\n            </table>\n          </div>\n          <div class='total'>\n            <span class='right'>保单总金额:{{information.total}}</span>\n          </div>\n          \x3c!--保单照片--\x3e\n          <div class='Photo'>\n            <ul>\n              <li v-for='(item,key) in information.pc_img'\n                  :key=\"key\"><img :src=\"item\"\n                     @click=\"ImgDialogVisible=true,ImgList=item,enlarge()\"></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </el-dialog>\n    <el-dialog title=\"驳回理由\"\n               :visible.sync=\"reasonVisible\"\n               v-drag\n               width=\"800px\"\n               center>\n      <div class='reasonContent'>\n        {{reason}}\n      </div>\n    </el-dialog>\n    \x3c!--分页组件--\x3e\n    <div class=\"page_center\">\n      <paging :page-count=\"pageCount\"\n              :page=\"page\"\n              @index=\"paging\"></paging>\n    </div>\n  </div>\n</template>\n<script>\nimport Viewer from 'viewerjs';\nimport 'viewerjs/dist/viewer.css';\nexport default {\n  data () {\n    return {\n      token: window.sessionStorage.getItem('bbytoken'),\n      list: {},\n      page: 1, //当前页\n      pageCount: 1,//总页数\n      detailsVisible: false, //详情弹框状态\n      ReasonVisible: false, //驳回理由状态\n      ImgDialogVisible: false,\n      reasonVisible: false,\n      information: {}, //保单信息\n      ImgList: '',\n      transform: {\n        transform: ''\n      },\n      rotateData: 0,\n      iconfont: false,\n      reason: ''\n    }\n  },\n  directives: {\n    drag: {\n      // 指令的定义\n      bind: function (el) {\n        //获取当前元素\n        var odiv = el.querySelector('.el-dialog')\n        odiv.onmousedown = (e) => {\n          //算出鼠标相对元素的位置\n          let disX = e.clientX - odiv.offsetLeft;\n          let disY = e.clientY - odiv.offsetTop;\n\n          document.onmousemove = (e) => {\n            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置\n            let left = e.clientX - disX;\n            let top = e.clientY - disY;\n\n            //绑定元素位置到positionX和positionY上面\n            //              this.positionX = top;\n            //              this.positionY = left;\n            //移动当前元素\n            odiv.style.marginLeft = left + \"px\"\n            odiv.style.marginTop = top + 'px';\n          };\n          document.onmouseup = (e) => {\n            document.onmousemove = null;\n            document.onmouseup = null;\n          };\n        };\n      }\n    }\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post('admin/PolicyAudit/rejListBby', { token: this.token, page: this.page }).then(res => {\n        if (res.data.code == 1) {\n        \n          this.list = res.data.data.list\n          this.pageCount = res.data.data.rows;\n        } else {\n          layer.msg(res.data.msg, { time: 1500 })\n        }\n      }).catch(err => console.log(err))\n    },\n    //查看未审核列表详情\n    details (pid, uid) {\n      \n      this.UnauditedID = {\n        token: this.token,\n        pid: pid,\n        uid: uid\n      }\n      this.detailsVisible = true\n      this.$axios.post('admin/PolicyAudit/details', { token: this.token, pid: pid }).then(res => {\n        if (res.data.code == 1) {\n          this.information = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    enlarge () { //图片放大\n      const ViewerDom = this.$refs.adopt\n      const viewer = new Viewer(ViewerDom, {});\n    }\n\n  },\n  mounted () {\n    this.init()\n  }\n}\n<\/script>\n<style scoped>\n>>> .viewer-canvas {\n  z-index: 9999;\n}\n>>> .el-dialog__wrapper {\n  overflow: hidden;\n}\n.table a {\n  color: #04bbfc;\n}\n.details {\n  font-size: 12px;\n}\n.information td {\n  text-align: left;\n}\n.details table td {\n  font-size: 12px;\n  border: none;\n}\n.Insurancetype {\n  margin-top: 20px;\n}\n.Insurancetype table {\n  border: 1px solid #dbdbdb;\n}\n.Insurancetype table th {\n  background: none;\n  width: 50%;\n  border: 1px solid #dbdbdb;\n  font-size: 16px;\n}\n.Insurancetype table td {\n  border: 1px solid #dbdbdb;\n}\n.Photo {\n  text-align: center;\n  margin-top: 20px;\n  overflow-x: auto;\n}\n\n.Photo > ul {\n  margin: 0 auto;\n  display: flex;\n  justify-content: center;\n}\n.Photo > ul > li {\n}\n.Photo img {\n  text-align: center;\n  max-height: 100px;\n  max-height: 100px;\n  width: 100px;\n  height: 100px;\n  padding-left: 10px;\n}\n.content > textarea {\n  border: none;\n  width: 100% !important;\n  resize: none;\n  height: 100px;\n  max-height: 300px !important;\n}\n.reasonContent {\n  min-height: 300px;\n}\n.total:after {\n  display: block;\n  content: \"\";\n  clear: both;\n}\n\n.right {\n  float: right;\n  margin: 20px 0;\n  font-size: 18px;\n  color: #04bbfc;\n}\n</style>\n<style>\n.adopt .el-dialog__header {\n  background: none;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.adopt .el-dialog__footer {\n  border-top: 1px solid #e6e6eb;\n  padding-bottom: 10px;\n}\n.Reason .el-dialog__header {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.Reason .el-dialog__footer {\n  border-top: 1px solid #e6e6eb;\n  padding-bottom: 10px;\n}\n</style>\n"],sourceRoot:""}])},cCX4:function(n,t,e){var i=e("8iku");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("c6bc20e8",i,!1,{})},ka6W:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.adopt .el-dialog__header {\n  background: none;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.adopt .el-dialog__footer {\n  border-top: 1px solid #e6e6eb;\n  padding-bottom: 10px;\n}\n.Reason .el-dialog__header {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.Reason .el-dialog__footer {\n  border-top: 1px solid #e6e6eb;\n  padding-bottom: 10px;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/CarButler/Policy/Reject/src/pages/CarButler/Policy/Reject/Reject.vue"],names:[],mappings:";AA2RA;EACA,iBAAA;EACA,qBAAA;EACA,iCAAA;CACA;AACA;EACA,8BAAA;EACA,qBAAA;CACA;AACA;EACA,qBAAA;EACA,iCAAA;CACA;AACA;EACA,8BAAA;EACA,qBAAA;CACA",file:"Reject.vue",sourcesContent:["<template>\n  <div class='adopt'\n       ref='adopt'>\n    <table class='table'>\n      <tr>\n        <th>用户名称</th>\n        <th>电话</th>\n        <th>车型</th>\n        <th>车牌</th>\n        <th>设备号</th>\n        <th>保单号</th>\n        <th>驳回理由</th>\n        <th>申请时间</th>\n        <th>驳回时间</th>\n        <th>详情</th>\n      </tr>\n      <tr v-for=\"(item,index) in list\"\n          :key=\"index\">\n        <td>{{item.name}}</td>\n        <td>{{item.phone}}</td>\n        <td>{{item.type}}</td>\n        <td>{{item.plate}}</td>\n        <td>{{item.eq_num}}</td>\n        <td>{{item.policy_num}}</td>\n        <td>\n          <a href=\"javascript:;\"\n             @click='reason=item.reason,reasonVisible=true'>查看</a>\n        </td>\n        <td>{{item.create_time}}</td>\n        <td>{{item.audit_time}}</td>\n        <td>\n          <a href=\"javascript:;\"\n             @click='details(item.pid,item.u_id)'>详情</a>\n        </td>\n      </tr>\n    </table>\n    \x3c!--详情弹框--\x3e\n    <el-dialog title=\"详情\"\n               :visible.sync=\"detailsVisible\"\n               v-drag\n               width=\"800px\"\n               center>\n      <div class='details'>\n        <div class='content'>\n          \x3c!--保单信息--\x3e\n          <dl class='information'>\n            <dt>保单信息:</dt>\n            <dd class='left'>\n              <table class='table'>\n                <tr>\n                  <td>保险公司 : {{information.company}}</td>\n                  <td>保单号 : {{information.policy_num}}</td>\n                  <td>VIN码 : {{information.vin}}</td>\n                </tr>\n                <tr>\n                  <td>开始时间 : {{information.start_time}}</td>\n                  <td>结束时间 : {{information.end_time}}</td>\n                </tr>\n              </table>\n            </dd>\n          </dl>\n          \x3c!--险种详情--\x3e\n          <div class='Insurancetype'>\n            <table>\n              <tr>\n                <th>险种名称</th>\n                <th>金额</th>\n              </tr>\n              <tr v-for=\"(item,index) in information.name_price\"\n                  :key=\"index\">\n                <td>{{item.type}}</td>\n                <td>{{item.value}}</td>\n              </tr>\n            </table>\n          </div>\n          <div class='total'>\n            <span class='right'>保单总金额:{{information.total}}</span>\n          </div>\n          \x3c!--保单照片--\x3e\n          <div class='Photo'>\n            <ul>\n              <li v-for='(item,key) in information.pc_img'\n                  :key=\"key\"><img :src=\"item\"\n                     @click=\"ImgDialogVisible=true,ImgList=item,enlarge()\"></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </el-dialog>\n    <el-dialog title=\"驳回理由\"\n               :visible.sync=\"reasonVisible\"\n               v-drag\n               width=\"800px\"\n               center>\n      <div class='reasonContent'>\n        {{reason}}\n      </div>\n    </el-dialog>\n    \x3c!--分页组件--\x3e\n    <div class=\"page_center\">\n      <paging :page-count=\"pageCount\"\n              :page=\"page\"\n              @index=\"paging\"></paging>\n    </div>\n  </div>\n</template>\n<script>\nimport Viewer from 'viewerjs';\nimport 'viewerjs/dist/viewer.css';\nexport default {\n  data () {\n    return {\n      token: window.sessionStorage.getItem('bbytoken'),\n      list: {},\n      page: 1, //当前页\n      pageCount: 1,//总页数\n      detailsVisible: false, //详情弹框状态\n      ReasonVisible: false, //驳回理由状态\n      ImgDialogVisible: false,\n      reasonVisible: false,\n      information: {}, //保单信息\n      ImgList: '',\n      transform: {\n        transform: ''\n      },\n      rotateData: 0,\n      iconfont: false,\n      reason: ''\n    }\n  },\n  directives: {\n    drag: {\n      // 指令的定义\n      bind: function (el) {\n        //获取当前元素\n        var odiv = el.querySelector('.el-dialog')\n        odiv.onmousedown = (e) => {\n          //算出鼠标相对元素的位置\n          let disX = e.clientX - odiv.offsetLeft;\n          let disY = e.clientY - odiv.offsetTop;\n\n          document.onmousemove = (e) => {\n            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置\n            let left = e.clientX - disX;\n            let top = e.clientY - disY;\n\n            //绑定元素位置到positionX和positionY上面\n            //              this.positionX = top;\n            //              this.positionY = left;\n            //移动当前元素\n            odiv.style.marginLeft = left + \"px\"\n            odiv.style.marginTop = top + 'px';\n          };\n          document.onmouseup = (e) => {\n            document.onmousemove = null;\n            document.onmouseup = null;\n          };\n        };\n      }\n    }\n  },\n  methods: {\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n    init () {\n      this.$axios.post('admin/PolicyAudit/rejListBby', { token: this.token, page: this.page }).then(res => {\n        if (res.data.code == 1) {\n        \n          this.list = res.data.data.list\n          this.pageCount = res.data.data.rows;\n        } else {\n          layer.msg(res.data.msg, { time: 1500 })\n        }\n      }).catch(err => console.log(err))\n    },\n    //查看未审核列表详情\n    details (pid, uid) {\n      \n      this.UnauditedID = {\n        token: this.token,\n        pid: pid,\n        uid: uid\n      }\n      this.detailsVisible = true\n      this.$axios.post('admin/PolicyAudit/details', { token: this.token, pid: pid }).then(res => {\n        if (res.data.code == 1) {\n          this.information = res.data.data\n        }\n      }).catch(err => console.log(err))\n    },\n    enlarge () { //图片放大\n      const ViewerDom = this.$refs.adopt\n      const viewer = new Viewer(ViewerDom, {});\n    }\n\n  },\n  mounted () {\n    this.init()\n  }\n}\n<\/script>\n<style scoped>\n>>> .viewer-canvas {\n  z-index: 9999;\n}\n>>> .el-dialog__wrapper {\n  overflow: hidden;\n}\n.table a {\n  color: #04bbfc;\n}\n.details {\n  font-size: 12px;\n}\n.information td {\n  text-align: left;\n}\n.details table td {\n  font-size: 12px;\n  border: none;\n}\n.Insurancetype {\n  margin-top: 20px;\n}\n.Insurancetype table {\n  border: 1px solid #dbdbdb;\n}\n.Insurancetype table th {\n  background: none;\n  width: 50%;\n  border: 1px solid #dbdbdb;\n  font-size: 16px;\n}\n.Insurancetype table td {\n  border: 1px solid #dbdbdb;\n}\n.Photo {\n  text-align: center;\n  margin-top: 20px;\n  overflow-x: auto;\n}\n\n.Photo > ul {\n  margin: 0 auto;\n  display: flex;\n  justify-content: center;\n}\n.Photo > ul > li {\n}\n.Photo img {\n  text-align: center;\n  max-height: 100px;\n  max-height: 100px;\n  width: 100px;\n  height: 100px;\n  padding-left: 10px;\n}\n.content > textarea {\n  border: none;\n  width: 100% !important;\n  resize: none;\n  height: 100px;\n  max-height: 300px !important;\n}\n.reasonContent {\n  min-height: 300px;\n}\n.total:after {\n  display: block;\n  content: \"\";\n  clear: both;\n}\n\n.right {\n  float: right;\n  margin: 20px 0;\n  font-size: 18px;\n  color: #04bbfc;\n}\n</style>\n<style>\n.adopt .el-dialog__header {\n  background: none;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.adopt .el-dialog__footer {\n  border-top: 1px solid #e6e6eb;\n  padding-bottom: 10px;\n}\n.Reason .el-dialog__header {\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e6e6eb;\n}\n.Reason .el-dialog__footer {\n  border-top: 1px solid #e6e6eb;\n  padding-bottom: 10px;\n}\n</style>\n"],sourceRoot:""}])},uPZ7:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("IinW"),o=e.n(i),a=(e("N1kN"),{data:function(){return{token:window.sessionStorage.getItem("bbytoken"),list:{},page:1,pageCount:1,detailsVisible:!1,ReasonVisible:!1,ImgDialogVisible:!1,reasonVisible:!1,information:{},ImgList:"",transform:{transform:""},rotateData:0,iconfont:!1,reason:""}},directives:{drag:{bind:function(n){var t=n.querySelector(".el-dialog");t.onmousedown=function(n){var e=n.clientX-t.offsetLeft,i=n.clientY-t.offsetTop;document.onmousemove=function(n){var o=n.clientX-e,a=n.clientY-i;t.style.marginLeft=o+"px",t.style.marginTop=a+"px"},document.onmouseup=function(n){document.onmousemove=null,document.onmouseup=null}}}}},methods:{paging:function(n){this.page=n,this.init()},init:function(){var n=this;this.$axios.post("admin/PolicyAudit/rejListBby",{token:this.token,page:this.page}).then(function(t){1==t.data.code?(n.list=t.data.data.list,n.pageCount=t.data.data.rows):layer.msg(t.data.msg,{time:1500})}).catch(function(n){return console.log(n)})},details:function(n,t){var e=this;this.UnauditedID={token:this.token,pid:n,uid:t},this.detailsVisible=!0,this.$axios.post("admin/PolicyAudit/details",{token:this.token,pid:n}).then(function(n){1==n.data.code&&(e.information=n.data.data)}).catch(function(n){return console.log(n)})},enlarge:function(){var n=this.$refs.adopt;new o.a(n,{})}},mounted:function(){this.init()}}),s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{ref:"adopt",staticClass:"adopt"},[e("table",{staticClass:"table"},[n._m(0),n._v(" "),n._l(n.list,function(t,i){return e("tr",{key:i},[e("td",[n._v(n._s(t.name))]),n._v(" "),e("td",[n._v(n._s(t.phone))]),n._v(" "),e("td",[n._v(n._s(t.type))]),n._v(" "),e("td",[n._v(n._s(t.plate))]),n._v(" "),e("td",[n._v(n._s(t.eq_num))]),n._v(" "),e("td",[n._v(n._s(t.policy_num))]),n._v(" "),e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){n.reason=t.reason,n.reasonVisible=!0}}},[n._v("查看")])]),n._v(" "),e("td",[n._v(n._s(t.create_time))]),n._v(" "),e("td",[n._v(n._s(t.audit_time))]),n._v(" "),e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return n.details(t.pid,t.u_id)}}},[n._v("详情")])])])})],2),n._v(" "),e("el-dialog",{directives:[{name:"drag",rawName:"v-drag"}],attrs:{title:"详情",visible:n.detailsVisible,width:"800px",center:""},on:{"update:visible":function(t){n.detailsVisible=t}}},[e("div",{staticClass:"details"},[e("div",{staticClass:"content"},[e("dl",{staticClass:"information"},[e("dt",[n._v("保单信息:")]),n._v(" "),e("dd",{staticClass:"left"},[e("table",{staticClass:"table"},[e("tr",[e("td",[n._v("保险公司 : "+n._s(n.information.company))]),n._v(" "),e("td",[n._v("保单号 : "+n._s(n.information.policy_num))]),n._v(" "),e("td",[n._v("VIN码 : "+n._s(n.information.vin))])]),n._v(" "),e("tr",[e("td",[n._v("开始时间 : "+n._s(n.information.start_time))]),n._v(" "),e("td",[n._v("结束时间 : "+n._s(n.information.end_time))])])])])]),n._v(" "),e("div",{staticClass:"Insurancetype"},[e("table",[e("tr",[e("th",[n._v("险种名称")]),n._v(" "),e("th",[n._v("金额")])]),n._v(" "),n._l(n.information.name_price,function(t,i){return e("tr",{key:i},[e("td",[n._v(n._s(t.type))]),n._v(" "),e("td",[n._v(n._s(t.value))])])})],2)]),n._v(" "),e("div",{staticClass:"total"},[e("span",{staticClass:"right"},[n._v("保单总金额:"+n._s(n.information.total))])]),n._v(" "),e("div",{staticClass:"Photo"},[e("ul",n._l(n.information.pc_img,function(t,i){return e("li",{key:i},[e("img",{attrs:{src:t},on:{click:function(e){n.ImgDialogVisible=!0,n.ImgList=t,n.enlarge()}}})])}),0)])])])]),n._v(" "),e("el-dialog",{directives:[{name:"drag",rawName:"v-drag"}],attrs:{title:"驳回理由",visible:n.reasonVisible,width:"800px",center:""},on:{"update:visible":function(t){n.reasonVisible=t}}},[e("div",{staticClass:"reasonContent"},[n._v("\n      "+n._s(n.reason)+"\n    ")])]),n._v(" "),e("div",{staticClass:"page_center"},[e("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1)],1)};s._withStripped=!0;var d={render:s,staticRenderFns:[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("tr",[e("th",[n._v("用户名称")]),n._v(" "),e("th",[n._v("电话")]),n._v(" "),e("th",[n._v("车型")]),n._v(" "),e("th",[n._v("车牌")]),n._v(" "),e("th",[n._v("设备号")]),n._v(" "),e("th",[n._v("保单号")]),n._v(" "),e("th",[n._v("驳回理由")]),n._v(" "),e("th",[n._v("申请时间")]),n._v(" "),e("th",[n._v("驳回时间")]),n._v(" "),e("th",[n._v("详情")])])}]},r=d;var l=!1;var A=e("VU/8")(a,r,!1,function(n){l||(e("cCX4"),e("zROU"))},"data-v-21bc4879",null);A.options.__file="src/pages/CarButler/Policy/Reject/Reject.vue";t.default=A.exports},zROU:function(n,t,e){var i=e("ka6W");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("63582e80",i,!1,{})}});
//# sourceMappingURL=52.c352e1a06ca8c10cb69b.js.map