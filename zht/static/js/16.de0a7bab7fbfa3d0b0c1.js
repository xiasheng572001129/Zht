webpackJsonp([16],{OZ1a:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("Xxa5"),l=t.n(a),i=t("exGp"),s=t.n(i),o=t("gPgF"),r={components:{pagination:t("+ryu").a},data:function(){return{token:window.sessionStorage.getItem("bbytoken"),page:1,pageCount:1,pageSmCount:1,SmPage:1,tableData:[],addressVisible:!1,address:"",ShopVisible:!1,shop_details:"",ProfitVisible:!1,ProfitList:[],sellVisible:!1,SellOut_Oils:[],ReasonData:"",ReasonVisible:!1,cancelVisible:!1,cancelData:"",reason:"",oil_shop_id:""}},methods:{init:function(){var e=this;return s()(l.a.mark(function n(){var t;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$axios.post("admin/OilList/oilList",{token:e.token,page:e.page});case 3:1==(t=n.sent).data.code?(e.tableData=t.data.data.list,e.pageCount=t.data.data.rows):e.tableData=[],n.next=10;break;case 7:throw n.prev=7,n.t0=n.catch(0),n.t0;case 10:case"end":return n.stop()}},n,e,[[0,7]])}))()},Profit:function(e){var n=this;return s()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.$axios.post("admin/OilExamine/incomeRecord",{token:n.token,oil_shop_id:e.id,page:n.SmPage});case 3:1==(a=t.sent).data.code&&(n.ProfitList=a.data.data.list,n.pageSmCount=a.data.data.rows),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,n,[[0,7]])}))()},Shop:function(){var e=this;this.$nextTick(function(){var n=e.$refs.enlarge;n&&n.length>0&&n.forEach(function(e){Object(o.a)(e)})})},Oils:function(e){var n=this;return s()(l.a.mark(function t(){var a;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n.$axios.post("admin/OilExamine/oilType",{token:n.token,id:e.id});case 3:1==(a=t.sent).data.code&&(n.SellOut_Oils=a.data.data),t.next=10;break;case 7:throw t.prev=7,t.t0=t.catch(0),t.t0;case 10:case"end":return t.stop()}},t,n,[[0,7]])}))()},ShutDown:function(e){this.reason?this.operation("admin/OilList/shutDown",this.ReasonData.id):this.$message.error("关停理由不能为空")},cancel:function(e){this.reason?this.operation("admin/OilList/totalCancel",this.cancelData.id):this.$message.error("取消合作理由不能为空")},operation:function(e,n){var t=this;return s()(l.a.mark(function a(){var i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.$axios.post(e,{token:t.token,reason:t.reason,oil_shop_id:n});case 3:1==(i=a.sent).data.code?(t.$message({message:i.data.msg,type:"success"}),t.cancelVisible=!1,t.ReasonVisible=!1,t.init()):t.$message.error(i.data.msg),a.next=10;break;case 7:throw a.prev=7,a.t0=a.catch(0),a.t0;case 10:case"end":return a.stop()}},a,t,[[0,7]])}))()},close:function(){this.reason="",this.SmPage=1,this.pageSmCount=1},currentPage:function(e){this.page=e,this.init()},currentSmPage:function(e){this.SmPage=e,this.Profit(this.oil_shop_id)}},mounted:function(){this.init()}},c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[t("el-table-column",{attrs:{label:"申请时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.ShopVisible=!0,e.shop_details=n.row,e.Shop()}}},[e._v(e._s(n.row.oil_shop_name))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"oil_leader",label:"分销商姓名",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"leader_phone",label:"电话",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"date",label:"数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.address=n.row,e.addressVisible=!0}}},[e._v("详情 ")])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"地区",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.sellVisible=!0,e.Oils(n.row)}}},[e._v("详情")])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"金额",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.oil_shop_id=n.row,e.ProfitVisible=!0,e.Profit(n.row)}}},[e._v(e._s(n.row.num))])]}}])}),e._v(" "),t("el-table-column",{attrs:{prop:"leader_phone",label:"支付凭证",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{prop:"date",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.cancelData=n.row,e.cancelVisible=!0}}},[e._v("发货")])]}}])})],1)],1),e._v(" "),[t("el-dialog",{attrs:{title:"详情地址",visible:e.addressVisible,width:"30%",center:""},on:{"update:visible":function(n){e.addressVisible=n}}},[t("div",{staticClass:"address"},[e._v("\n        "+e._s(e.address.province+e.address.city+e.address.county+e.address.address)+"\n      ")])]),e._v(" "),t("el-dialog",{attrs:{title:"店铺详情",visible:e.ShopVisible,width:"40%",center:""},on:{"update:visible":function(n){e.ShopVisible=n}}},[t("div",{staticClass:"shop"},[t("div",[t("span",[e._v("店铺座机 : ")]),e._v(" "),t("span",[e._v(e._s(e.shop_details.shop_phone))])]),e._v(" "),t("div",[t("span",[e._v("营业时间 : ")]),e._v(" "),t("span",[e._v(e._s(e.shop_details.start_time+"-"+e.shop_details.end_time))])]),e._v(" "),t("div",{staticClass:"shop_image"},[t("span",[e._v("店铺图片 : ")]),e._v(" "),e._l(e.shop_details.shop_image,function(e,n){return t("span",{key:n},[t("img",{ref:"enlarge",refInFor:!0,attrs:{src:e}})])})],2)])]),e._v(" "),t("el-dialog",{attrs:{title:"收益",visible:e.ProfitVisible,center:""},on:{"update:visible":function(n){e.ProfitVisible=n},close:e.close}},[t("div",{staticClass:"Profit"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.ProfitList}},[t("el-table-column",{attrs:{label:"车主姓名",align:"center",prop:"user_name"}}),e._v(" "),t("el-table-column",{attrs:{label:"车主支付金额",align:"center",prop:"user_price"}}),e._v(" "),t("el-table-column",{attrs:{label:"加油升数",align:"center",prop:"litre"}}),e._v(" "),t("el-table-column",{attrs:{label:"平台补贴",align:"center",prop:"platform_money"}}),e._v(" "),t("el-table-column",{attrs:{label:"油站收入金额",align:"center",prop:"actual_price"}}),e._v(" "),t("el-table-column",{attrs:{width:"200",label:"支付时间",align:"center",prop:"pay_time"}})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("pagination",{staticClass:"page_center",attrs:{pageCount:e.pageSmCount},on:{index:e.currentSmPage}})],1)]),e._v(" "),t("el-dialog",{attrs:{title:"所售油品",visible:e.sellVisible,center:""},on:{"update:visible":function(n){e.sellVisible=n}}},[t("div",{staticClass:"sell"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.SellOut_Oils,border:""}},[t("el-table-column",{attrs:{label:"油品名称",align:"center",prop:"oil_name"}}),e._v(" "),t("el-table-column",{attrs:{label:"油站价",align:"center",prop:"station_price"}}),e._v(" "),t("el-table-column",{attrs:{label:"折扣价",align:"center",prop:"discount_price"}}),e._v(" "),t("el-table-column",{attrs:{label:"会员价",align:"center",prop:"member_price"}})],1)],1)]),e._v(" "),t("el-dialog",{attrs:{title:"取消合作",visible:e.cancelVisible,center:""},on:{"update:visible":function(n){e.cancelVisible=n},close:e.close}},[t("div",{staticClass:"Reason"},[t("el-input",{attrs:{type:"textarea",autosize:{minRows:10,maxRows:10},placeholder:"请输入取消合作理由"},model:{value:e.reason,callback:function(n){e.reason=n},expression:"reason"}})],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:e.cancel}},[e._v("确定")])],1)]),e._v(" "),t("el-dialog",{attrs:{title:"关停理由",visible:e.ReasonVisible,center:""},on:{"update:visible":function(n){e.ReasonVisible=n},close:e.close}},[t("div",{staticClass:"Reason"},[t("el-input",{attrs:{type:"textarea",autosize:{minRows:10,maxRows:10},placeholder:"请输入关停理由"},model:{value:e.reason,callback:function(n){e.reason=n},expression:"reason"}})],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:e.ShutDown}},[e._v("确定")])],1)])],e._v(" "),[t("pagination",{staticClass:"page_center",attrs:{pageCount:e.pageCount},on:{index:e.currentPage}})]],2)};c._withStripped=!0;var p={render:c,staticRenderFns:[]},d=p;var m=!1;var u=t("VU/8")(r,d,!1,function(e){m||(t("zhIS"),t("wpKt"))},"data-v-8d6677b6",null);u.options.__file="src/pages/distributor/takeGoods/GoodsSingle/index.vue";n.default=u.exports},nPmd:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n[data-v-8d6677b6] .el-table th {\n  height: 30px !important;\n  line-height: 30px !important;\n}\n.address[data-v-8d6677b6] {\n  width: 100%;\n  min-height: 150px;\n  margin-top: 20px;\n  overflow: auto;\n}\n.shop[data-v-8d6677b6] {\n  min-height: 200px;\n}\n.shop > div[data-v-8d6677b6] {\n  margin-bottom: 10px;\n}\n.shop_image[data-v-8d6677b6] {\n}\n.shop_image > span[data-v-8d6677b6]:first-child {\n}\n.shop_image img[data-v-8d6677b6] {\n  width: 60px;\n  height: 60px;\n  vertical-align: top;\n  margin-right: 10px;\n  border: 1px solid #eee;\n}\n.sell[data-v-8d6677b6] {\n  min-height: 200px;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/distributor/takeGoods/GoodsSingle/src/pages/distributor/takeGoods/GoodsSingle/index.vue"],names:[],mappings:";AAsVA;EACA,wBAAA;EACA,6BAAA;CACA;AACA;EACA,YAAA;EACA,kBAAA;EACA,iBAAA;EACA,eAAA;CACA;AACA;EACA,kBAAA;CACA;AACA;EACA,oBAAA;CACA;AACA;CACA;AACA;CACA;AACA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,mBAAA;EACA,uBAAA;CACA;AACA;EACA,kBAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <div>\n      <el-table :data="tableData"\n                style="width: 100%">\n        <el-table-column label="申请时间"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="ShopVisible=true,shop_details=scope.row,Shop()">{{scope.row.oil_shop_name}}</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column prop="oil_leader"\n                         label="分销商姓名"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column prop="leader_phone"\n                         label="电话"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column prop="date"\n                         label="数量"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="address=scope.row,addressVisible=true">详情 </el-button>\n          </template>\n        </el-table-column>\n        <el-table-column label="地区"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="sellVisible=true,Oils(scope.row)">详情</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column label="金额"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="oil_shop_id=scope.row,ProfitVisible=true,Profit(scope.row)">{{scope.row.num}}</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column prop="leader_phone"\n                         label="支付凭证"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column prop="date"\n                         label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="cancelData=scope.row,cancelVisible=true">发货</el-button>\n\n          </template>\n        </el-table-column>\n      </el-table>\n    </div>\n    <template>\n      <el-dialog title="详情地址"\n                 :visible.sync="addressVisible"\n                 width="30%"\n                 center>\n        <div class="address">\n          {{address.province+address.city+address.county+address.address}}\n        </div>\n      </el-dialog>\n\n      <el-dialog title="店铺详情"\n                 :visible.sync="ShopVisible"\n                 width="40%"\n                 center>\n        <div class="shop">\n          <div>\n            <span>店铺座机 : </span>\n            <span>{{shop_details.shop_phone}}</span>\n          </div>\n          <div>\n            <span>营业时间 : </span>\n            <span>{{`${shop_details.start_time}-${shop_details.end_time}`}}</span>\n          </div>\n          <div class="shop_image">\n            <span>店铺图片 : </span>\n            <span v-for=\'(item,index) in shop_details.shop_image\'\n                  :key="index">\n              <img :src="item"\n                   ref="enlarge">\n            </span>\n          </div>\n        </div>\n      </el-dialog>\n\n      <el-dialog title="收益"\n                 :visible.sync="ProfitVisible"\n                 @close=\'close\'\n                 center>\n        <div class="Profit">\n          <el-table :data="ProfitList"\n                    style="width: 100%">\n            <el-table-column label="车主姓名"\n                             align="center"\n                             prop="user_name"></el-table-column>\n            <el-table-column label="车主支付金额"\n                             align="center"\n                             prop="user_price"></el-table-column>\n            <el-table-column label="加油升数"\n                             align="center"\n                             prop="litre"></el-table-column>\n            <el-table-column label="平台补贴"\n                             align="center"\n                             prop="platform_money"></el-table-column>\n            <el-table-column label="油站收入金额"\n                             align="center"\n                             prop="actual_price"></el-table-column>\n            <el-table-column width="200"\n                             label="支付时间"\n                             align="center"\n                             prop="pay_time"></el-table-column>\n          </el-table>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <pagination class="page_center"\n                      :pageCount=\'pageSmCount\'\n                      @index=\'currentSmPage\' />\n        </span>\n      </el-dialog>\n      <el-dialog title="所售油品"\n                 :visible.sync="sellVisible"\n                 center>\n        <div class="sell">\n          <el-table :data="SellOut_Oils"\n                    border\n                    style="width: 100%">\n            <el-table-column label="油品名称"\n                             align="center"\n                             prop="oil_name"></el-table-column>\n            <el-table-column label="油站价"\n                             align="center"\n                             prop="station_price"></el-table-column>\n            <el-table-column label="折扣价"\n                             align="center"\n                             prop="discount_price"></el-table-column>\n            <el-table-column label="会员价"\n                             align="center"\n                             prop="member_price"></el-table-column>\n          </el-table>\n        </div>\n      </el-dialog>\n      <el-dialog title="取消合作"\n                 :visible.sync="cancelVisible"\n                 @close=\'close\'\n                 center>\n        <div class="Reason">\n          <el-input type="textarea"\n                    :autosize="{ minRows: 10, maxRows: 10}"\n                    placeholder="请输入取消合作理由"\n                    v-model="reason">\n          </el-input>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <el-button type="primary"\n                     @click="cancel">确定</el-button>\n        </span>\n      </el-dialog>\n      <el-dialog title="关停理由"\n                 :visible.sync="ReasonVisible"\n                 @close=\'close\'\n                 center>\n        <div class="Reason">\n          <el-input type="textarea"\n                    :autosize="{ minRows: 10, maxRows: 10}"\n                    placeholder="请输入关停理由"\n                    v-model="reason">\n          </el-input>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <el-button type="primary"\n                     @click="ShutDown">确定</el-button>\n        </span>\n      </el-dialog>\n    </template>\n    <template>\n      <pagination class="page_center"\n                  :pageCount=\'pageCount\'\n                  @index=\'currentPage\' />\n    </template>\n  </div>\n</template>\n<script>\nimport Viewer from \'@/utils/Viewer\'\nimport pagination from \'@/components/pagination/pagination\'\nexport default {\n  components: { pagination },\n  data () {\n    return {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      page: 1,//当前页\n      pageCount: 1,\n      pageSmCount: 1,\n      SmPage: 1,\n      tableData: [],\n      addressVisible: false, //地址详情弹框状态\n      address: \'\', //详情地址,\n      ShopVisible: false, //店铺\n      shop_details: \'\',\n      ProfitVisible: false, //收益弹框状态\n      ProfitList: [],\n      sellVisible: false, //所售油品 \n      SellOut_Oils: [], //售出的油品详情\n      ReasonData: \'\',\n      ReasonVisible: false, //关停\n      cancelVisible: false, //取消合作\n      cancelData: \'\',\n      reason: \'\', //关停理由\n      oil_shop_id: \'\'\n    }\n  },\n\n  methods: {\n    async init () {\n      try {\n        let res = await this.$axios.post(\'admin/OilList/oilList\', { token: this.token, page: this.page })\n        if (res.data.code == 1) {\n          this.tableData = res.data.data.list\n          this.pageCount = res.data.data.rows;\n        } else {\n          this.tableData = []\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 收益详情数据 */\n    async Profit (row) {\n      try {\n        let res = await this.$axios.post(\'admin/OilExamine/incomeRecord\', {\n          token: this.token,\n          oil_shop_id: row.id,\n          page: this.SmPage\n        })\n        if (res.data.code == 1) {\n          this.ProfitList = res.data.data.list\n          this.pageSmCount = res.data.data.rows\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 图片放大加旋转 */\n    Shop () {\n      this.$nextTick(() => {\n        let ViewerDome = this.$refs.enlarge\n        if (ViewerDome && ViewerDome.length > 0) {\n          ViewerDome.forEach(item => {\n            Viewer(item)\n          })\n        }\n      })\n    },\n    /* 售出的油品详情 */\n    async Oils (row) {\n      try {\n        let res = await this.$axios.post(\'admin/OilExamine/oilType\', {\n          token: this.token,\n          id: row.id\n        })\n        if (res.data.code == 1) {\n          this.SellOut_Oils = res.data.data\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 关停油站 */\n    ShutDown (row) {\n      if (!this.reason) {\n        this.$message.error(\'关停理由不能为空\')\n        return;\n      }\n      this.operation(\'admin/OilList/shutDown\', this.ReasonData.id)\n    },\n    /* 取消合作 */\n    cancel (row) {\n      if (!this.reason) {\n        this.$message.error(\'取消合作理由不能为空\')\n        return;\n      }\n      this.operation(\'admin/OilList/totalCancel\', this.cancelData.id)\n    },\n    /* 取消/关停 */\n    async operation (url, id) {\n      try {\n        let res = await this.$axios.post(url, {\n          token: this.token,\n          reason: this.reason,\n          oil_shop_id: id\n        })\n        if (res.data.code == 1) {\n          this.$message({ message: res.data.msg, type: \'success\' })\n          this.cancelVisible = false\n          this.ReasonVisible = false\n          this.init()\n        } else {\n          this.$message.error(res.data.msg)\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 关闭对话框清空数据 */\n    close () {\n      this.reason = \'\'\n      this.SmPage = 1\n      this.pageSmCount = 1\n    },\n    currentPage (e) {\n      this.page = e;\n      this.init()\n    },\n    currentSmPage (e) {\n      this.SmPage = e;\n      this.Profit(this.oil_shop_id)\n    }\n  },\n  mounted () {\n    this.init()\n\n  }\n}\n<\/script>\n\n<style scoped>\n>>> .el-table th {\n  height: 30px !important;\n  line-height: 30px !important;\n}\n.address {\n  width: 100%;\n  min-height: 150px;\n  margin-top: 20px;\n  overflow: auto;\n}\n.shop {\n  min-height: 200px;\n}\n.shop > div {\n  margin-bottom: 10px;\n}\n.shop_image {\n}\n.shop_image > span:first-child {\n}\n.shop_image img {\n  width: 60px;\n  height: 60px;\n  vertical-align: top;\n  margin-right: 10px;\n  border: 1px solid #eee;\n}\n.sell {\n  min-height: 200px;\n}\n</style>\n<style>\n.viewer-container {\n  z-index: 9999 !important;\n}\n.el-message {\n  z-index: 9999 !important;\n}\n</style>\n\n\n'],sourceRoot:""}])},qpPB:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n.viewer-container {\n  z-index: 9999 !important;\n}\n.el-message {\n  z-index: 9999 !important;\n}\n","",{version:3,sources:["E:/仲达集团/总后台管理系统/Zht-master/src/pages/distributor/takeGoods/GoodsSingle/src/pages/distributor/takeGoods/GoodsSingle/index.vue"],names:[],mappings:";AAsXA;EACA,yBAAA;CACA;AACA;EACA,yBAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <div>\n      <el-table :data="tableData"\n                style="width: 100%">\n        <el-table-column label="申请时间"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="ShopVisible=true,shop_details=scope.row,Shop()">{{scope.row.oil_shop_name}}</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column prop="oil_leader"\n                         label="分销商姓名"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column prop="leader_phone"\n                         label="电话"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column prop="date"\n                         label="数量"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="address=scope.row,addressVisible=true">详情 </el-button>\n          </template>\n        </el-table-column>\n        <el-table-column label="地区"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="sellVisible=true,Oils(scope.row)">详情</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column label="金额"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="text"\n                       size="small"\n                       @click="oil_shop_id=scope.row,ProfitVisible=true,Profit(scope.row)">{{scope.row.num}}</el-button>\n          </template>\n        </el-table-column>\n        <el-table-column prop="leader_phone"\n                         label="支付凭证"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column prop="date"\n                         label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="cancelData=scope.row,cancelVisible=true">发货</el-button>\n\n          </template>\n        </el-table-column>\n      </el-table>\n    </div>\n    <template>\n      <el-dialog title="详情地址"\n                 :visible.sync="addressVisible"\n                 width="30%"\n                 center>\n        <div class="address">\n          {{address.province+address.city+address.county+address.address}}\n        </div>\n      </el-dialog>\n\n      <el-dialog title="店铺详情"\n                 :visible.sync="ShopVisible"\n                 width="40%"\n                 center>\n        <div class="shop">\n          <div>\n            <span>店铺座机 : </span>\n            <span>{{shop_details.shop_phone}}</span>\n          </div>\n          <div>\n            <span>营业时间 : </span>\n            <span>{{`${shop_details.start_time}-${shop_details.end_time}`}}</span>\n          </div>\n          <div class="shop_image">\n            <span>店铺图片 : </span>\n            <span v-for=\'(item,index) in shop_details.shop_image\'\n                  :key="index">\n              <img :src="item"\n                   ref="enlarge">\n            </span>\n          </div>\n        </div>\n      </el-dialog>\n\n      <el-dialog title="收益"\n                 :visible.sync="ProfitVisible"\n                 @close=\'close\'\n                 center>\n        <div class="Profit">\n          <el-table :data="ProfitList"\n                    style="width: 100%">\n            <el-table-column label="车主姓名"\n                             align="center"\n                             prop="user_name"></el-table-column>\n            <el-table-column label="车主支付金额"\n                             align="center"\n                             prop="user_price"></el-table-column>\n            <el-table-column label="加油升数"\n                             align="center"\n                             prop="litre"></el-table-column>\n            <el-table-column label="平台补贴"\n                             align="center"\n                             prop="platform_money"></el-table-column>\n            <el-table-column label="油站收入金额"\n                             align="center"\n                             prop="actual_price"></el-table-column>\n            <el-table-column width="200"\n                             label="支付时间"\n                             align="center"\n                             prop="pay_time"></el-table-column>\n          </el-table>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <pagination class="page_center"\n                      :pageCount=\'pageSmCount\'\n                      @index=\'currentSmPage\' />\n        </span>\n      </el-dialog>\n      <el-dialog title="所售油品"\n                 :visible.sync="sellVisible"\n                 center>\n        <div class="sell">\n          <el-table :data="SellOut_Oils"\n                    border\n                    style="width: 100%">\n            <el-table-column label="油品名称"\n                             align="center"\n                             prop="oil_name"></el-table-column>\n            <el-table-column label="油站价"\n                             align="center"\n                             prop="station_price"></el-table-column>\n            <el-table-column label="折扣价"\n                             align="center"\n                             prop="discount_price"></el-table-column>\n            <el-table-column label="会员价"\n                             align="center"\n                             prop="member_price"></el-table-column>\n          </el-table>\n        </div>\n      </el-dialog>\n      <el-dialog title="取消合作"\n                 :visible.sync="cancelVisible"\n                 @close=\'close\'\n                 center>\n        <div class="Reason">\n          <el-input type="textarea"\n                    :autosize="{ minRows: 10, maxRows: 10}"\n                    placeholder="请输入取消合作理由"\n                    v-model="reason">\n          </el-input>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <el-button type="primary"\n                     @click="cancel">确定</el-button>\n        </span>\n      </el-dialog>\n      <el-dialog title="关停理由"\n                 :visible.sync="ReasonVisible"\n                 @close=\'close\'\n                 center>\n        <div class="Reason">\n          <el-input type="textarea"\n                    :autosize="{ minRows: 10, maxRows: 10}"\n                    placeholder="请输入关停理由"\n                    v-model="reason">\n          </el-input>\n        </div>\n        <span slot="footer"\n              class="dialog-footer">\n          <el-button type="primary"\n                     @click="ShutDown">确定</el-button>\n        </span>\n      </el-dialog>\n    </template>\n    <template>\n      <pagination class="page_center"\n                  :pageCount=\'pageCount\'\n                  @index=\'currentPage\' />\n    </template>\n  </div>\n</template>\n<script>\nimport Viewer from \'@/utils/Viewer\'\nimport pagination from \'@/components/pagination/pagination\'\nexport default {\n  components: { pagination },\n  data () {\n    return {\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      page: 1,//当前页\n      pageCount: 1,\n      pageSmCount: 1,\n      SmPage: 1,\n      tableData: [],\n      addressVisible: false, //地址详情弹框状态\n      address: \'\', //详情地址,\n      ShopVisible: false, //店铺\n      shop_details: \'\',\n      ProfitVisible: false, //收益弹框状态\n      ProfitList: [],\n      sellVisible: false, //所售油品 \n      SellOut_Oils: [], //售出的油品详情\n      ReasonData: \'\',\n      ReasonVisible: false, //关停\n      cancelVisible: false, //取消合作\n      cancelData: \'\',\n      reason: \'\', //关停理由\n      oil_shop_id: \'\'\n    }\n  },\n\n  methods: {\n    async init () {\n      try {\n        let res = await this.$axios.post(\'admin/OilList/oilList\', { token: this.token, page: this.page })\n        if (res.data.code == 1) {\n          this.tableData = res.data.data.list\n          this.pageCount = res.data.data.rows;\n        } else {\n          this.tableData = []\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 收益详情数据 */\n    async Profit (row) {\n      try {\n        let res = await this.$axios.post(\'admin/OilExamine/incomeRecord\', {\n          token: this.token,\n          oil_shop_id: row.id,\n          page: this.SmPage\n        })\n        if (res.data.code == 1) {\n          this.ProfitList = res.data.data.list\n          this.pageSmCount = res.data.data.rows\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 图片放大加旋转 */\n    Shop () {\n      this.$nextTick(() => {\n        let ViewerDome = this.$refs.enlarge\n        if (ViewerDome && ViewerDome.length > 0) {\n          ViewerDome.forEach(item => {\n            Viewer(item)\n          })\n        }\n      })\n    },\n    /* 售出的油品详情 */\n    async Oils (row) {\n      try {\n        let res = await this.$axios.post(\'admin/OilExamine/oilType\', {\n          token: this.token,\n          id: row.id\n        })\n        if (res.data.code == 1) {\n          this.SellOut_Oils = res.data.data\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 关停油站 */\n    ShutDown (row) {\n      if (!this.reason) {\n        this.$message.error(\'关停理由不能为空\')\n        return;\n      }\n      this.operation(\'admin/OilList/shutDown\', this.ReasonData.id)\n    },\n    /* 取消合作 */\n    cancel (row) {\n      if (!this.reason) {\n        this.$message.error(\'取消合作理由不能为空\')\n        return;\n      }\n      this.operation(\'admin/OilList/totalCancel\', this.cancelData.id)\n    },\n    /* 取消/关停 */\n    async operation (url, id) {\n      try {\n        let res = await this.$axios.post(url, {\n          token: this.token,\n          reason: this.reason,\n          oil_shop_id: id\n        })\n        if (res.data.code == 1) {\n          this.$message({ message: res.data.msg, type: \'success\' })\n          this.cancelVisible = false\n          this.ReasonVisible = false\n          this.init()\n        } else {\n          this.$message.error(res.data.msg)\n        }\n      } catch (err) {\n        throw (err)\n      }\n    },\n    /* 关闭对话框清空数据 */\n    close () {\n      this.reason = \'\'\n      this.SmPage = 1\n      this.pageSmCount = 1\n    },\n    currentPage (e) {\n      this.page = e;\n      this.init()\n    },\n    currentSmPage (e) {\n      this.SmPage = e;\n      this.Profit(this.oil_shop_id)\n    }\n  },\n  mounted () {\n    this.init()\n\n  }\n}\n<\/script>\n\n<style scoped>\n>>> .el-table th {\n  height: 30px !important;\n  line-height: 30px !important;\n}\n.address {\n  width: 100%;\n  min-height: 150px;\n  margin-top: 20px;\n  overflow: auto;\n}\n.shop {\n  min-height: 200px;\n}\n.shop > div {\n  margin-bottom: 10px;\n}\n.shop_image {\n}\n.shop_image > span:first-child {\n}\n.shop_image img {\n  width: 60px;\n  height: 60px;\n  vertical-align: top;\n  margin-right: 10px;\n  border: 1px solid #eee;\n}\n.sell {\n  min-height: 200px;\n}\n</style>\n<style>\n.viewer-container {\n  z-index: 9999 !important;\n}\n.el-message {\n  z-index: 9999 !important;\n}\n</style>\n\n\n'],sourceRoot:""}])},wpKt:function(e,n,t){var a=t("qpPB");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("73bba5d3",a,!1,{})},zhIS:function(e,n,t){var a=t("nPmd");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("3afb62d3",a,!1,{})}});
//# sourceMappingURL=16.de0a7bab7fbfa3d0b0c1.js.map