webpackJsonp([99],{"+uBH":function(e,t,n){var a=n("sDpS");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("020da686",a,!1,{})},HN5g:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("woOf"),i=n.n(a),r=n("Xxa5"),s=n.n(r),l=n("exGp"),o=n.n(l),d=(n("gPgF"),{data:function(){return{authList:[],list:[],seCurId:"",token:window.sessionStorage.getItem("bbytoken"),page:0,pageCount:0,state:0,earningsTotal:0,earningsPage:0,modifyVisible:!1,imgVisible:!1,listQuery:{},dialogImageUrl:"",rules:{name:{required:!0,message:"请输入奖品名称",trigger:"blur"},need_km:{required:!0,message:"请输入历程",trigger:"blur"},max_charge:{required:!0,message:"请输入工时费",trigger:"blur"},fixed_value:{required:!0,message:"请输入数量值",trigger:"blur"},photo:{required:!0,message:"请上传图片",trigger:"blur"},detail:{required:!0,message:"请输入描述信息",trigger:"blur"},standard:{required:!0,message:"请输入规格",trigger:"blur"}}}},components:{wangEditor:n("/BbD").a},methods:{paging:function(e){this.page=e,this.init()},init:function(){var e=this;return o()(s.a.mark(function t(){var n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.post("admin/SmList/adminFreeList",{token:e.token,page:e.page});case 3:n=t.sent,e.list=n.data.data||[],e.pageCount=n.data.data.rows||0,t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(0),t.t0;case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},handleAvatarSuccess:function(e){this.uploadImgUrl=e,this.listQuery=i()({},this.listQuery,{photo:e})},catchData:function(e){this.listQuery=i()({},this.listQuery,{detail:e})},change:function(e){var t=this;this.modifyVisible=!0,this.$nextTick(function(){t.listQuery=i()({},e)})},resetFields:function(){this.$refs.ruleForm.resetFields()},addGoods:function(){var e,t=this;this.$refs.ruleForm.validate((e=o()(s.a.mark(function e(n){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=11;break}return e.prev=1,e.next=4,t.$axios.post("admin/SmList/upFree",i()({},t.listQuery,{token:t.token}));case 4:1==(a=e.sent).data.code?(t.init(),t.modifyVisible=!1,t.$message({message:a.data.msg,type:"success"})):t.$message.error(a.data.msg),e.next=11;break;case 8:throw e.prev=8,e.t0=e.catch(1),e.t0;case 11:case"end":return e.stop()}},e,t,[[1,8]])})),function(t){return e.apply(this,arguments)}))},modify:function(){var e=this;return o()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.$refs.ruleForm.validate(function(){var t=o()(s.a.mark(function t(n){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=11;break}return t.prev=1,t.next=4,e.$axios.post("admin/SmList/updateFree",i()({},e.listQuery,{token:e.token}));case 4:1==(a=t.sent).data.code?(e.modifyVisible=!1,e.init(),e.$message({message:a.data.msg,type:"success"})):e.$message.error(a.data.msg),t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(1),t.t0;case 11:case"end":return t.stop()}},t,e,[[1,8]])}));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}},t,e)}))()},erAuth:function(){var e=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:window.sessionStorage.getItem("bbytoken"),id:t}).then(function(t){if(1==t.data.code){var n=t.data.data||[];e.authList=n,console.log(e.authList)}else e.$alert(t.data.msg,"提示",{type:"error"})}).catch(function(e){alert(e)})}},created:function(){this.erAuth()},mounted:function(){this.init()}}),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ctbHead",e._l(e.authList,function(t){return n("router-link",{key:t.id,class:e.seCurId==t.id?"cur":"",attrs:{to:{path:t.action,query:{id:e.curId}},"v-key":t.id}},[e._v("\n      "+e._s(t.name)+"\n    ")])}),1),e._v(" "),n("div",{staticClass:"container"},[n("div",{staticClass:"quote"},[e._m(0),e._v(" "),n("el-button",{staticClass:"add_goods",attrs:{type:"primary"},on:{click:function(t){e.state=0,e.modifyVisible=!0}}},[e._v("添加奖品")])],1),e._v(" "),n("el-table",{attrs:{data:e.list}},[n("el-table-column",{attrs:{label:"名称",align:"center",prop:"name"}}),e._v(" "),n("el-table-column",{ref:"column",attrs:{label:"图片",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("div",{ref:"photo"},[n("img",{staticClass:"rewardImg",attrs:{src:e.row.photo}})])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"最高工时费",prop:"max_charge",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"更换里程(km)",prop:"need_km",align:"center"}}),e._v(" "),n("el-table-column",{attrs:{label:"固定数量值",align:"center",prop:"fixed_value"}}),e._v(" "),n("el-table-column",{attrs:{label:"规格",align:"center",prop:"standard"}}),e._v(" "),n("el-table-column",{attrs:{label:"产品描述",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-popover",{attrs:{placement:"top-start",title:"产品描述",width:"200",trigger:"hover"}},[n("el-button",{staticClass:"ellipsis",staticStyle:{width:"100px"},attrs:{slot:"reference",type:"text"},domProps:{innerHTML:e._s(t.row.detail)},slot:"reference"},[e._v(e._s(t.row.detail))]),e._v(" "),n("div",{domProps:{innerHTML:e._s(t.row.detail)}})],1)]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){e.state=1,e.change(t.row)}}},[e._v("修改")])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:0==e.state?"添加":"修改",visible:e.modifyVisible,center:""},on:{"update:visible":function(t){e.modifyVisible=t},close:e.resetFields}},[n("el-form",{ref:"ruleForm",staticStyle:{width:"80%"},attrs:{"label-width":"100px",model:e.listQuery,rules:e.rules}},[n("el-form-item",{attrs:{label:"名称:",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"更换里程:",prop:"need_km"}},[n("el-input",{attrs:{placeholder:"请输入人数"},model:{value:e.listQuery.need_km,callback:function(t){e.$set(e.listQuery,"need_km",t)},expression:"listQuery.need_km"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"最高工时费:",prop:"max_charge"}},[n("el-input",{attrs:{placeholder:"请输入工时费"},model:{value:e.listQuery.max_charge,callback:function(t){e.$set(e.listQuery,"max_charge",t)},expression:"listQuery.max_charge"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"固定数量值:",prop:"fixed_value"}},[n("el-input",{attrs:{placeholder:"请输入固定数量值"},model:{value:e.listQuery.fixed_value,callback:function(t){e.$set(e.listQuery,"fixed_value",t)},expression:"listQuery.fixed_value"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"规格:",prop:"standard"}},[n("el-input",{attrs:{placeholder:"请输入固定数量值"},model:{value:e.listQuery.standard,callback:function(t){e.$set(e.listQuery,"standard",t)},expression:"listQuery.standard"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"图片:",prop:"photo"}},[n("el-upload",{attrs:{action:e.baseURL+"admin/Prize/cbImg",data:{token:e.token},name:"img","list-type":"picture-card","file-list":e.listQuery.photo?[{url:e.listQuery.photo}]:[],limit:1,"on-success":e.handleAvatarSuccess}},[n("i",{staticClass:"el-icon-plus"})]),e._v(" "),n("el-dialog",{attrs:{visible:e.imgVisible,size:"tiny"},on:{"update:visible":function(t){e.imgVisible=t}}},[n("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),n("el-form-item",{attrs:{label:"描述:",prop:"detail"}},[n("wangEditor",{attrs:{content:e.listQuery.detail,catchData:e.catchData}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){0==e.state?e.addGoods():e.modify()}}},[e._v(e._s(0==e.state?"添加":"修改"))]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.resetFields}},[e._v("重置")])],1)],1)],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.earningsTotal&&e.earningsTotal>1,expression:"earningsTotal&&earningsTotal>1"}],staticClass:"page_center"},[n("paging",{attrs:{"page-count":e.earningsTotal,page:e.earningsPage},on:{index:e.paging}})],1)],1)],1)};c._withStripped=!0;var u={render:c,staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"quote-ele",staticStyle:{float:"left"}},[t("i"),this._v("供应商-会员专属")])}]},m=u;var p=!1;var g=n("VU/8")(d,m,!1,function(e){p||n("+uBH")},"data-v-57d26f1f",null);g.options.__file="src/pages/supplier/vipList/index.vue";t.default=g.exports},sDpS:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n.ellipsis[data-v-57d26f1f] {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n.add_goods[data-v-57d26f1f] {\n  float: right;\n  margin-top: 25px;\n  margin-right: 20px;\n}\n.rewardImg[data-v-57d26f1f] {\n  width: 70px;\n  height: 70px;\n}\n[data-v-57d26f1f] .w-e-toolbar {\n  overflow: auto;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/pages/supplier/vipList/src/pages/supplier/vipList/index.vue"],names:[],mappings:";AAoSA;EACA,uBAAA;EACA,+BAAA;EACA,mCAAA;EACA,4BAAA;CACA;AACA;EACA,aAAA;EACA,iBAAA;EACA,mBAAA;CACA;AACA;EACA,YAAA;EACA,aAAA;CACA;AACA;EACA,eAAA;CACA",file:"index.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"\n             style="float:left"><i></i>供应商-会员专属</div>\n        <el-button class="add_goods"\n                   type="primary"\n                   @click="state=0,modifyVisible=true">添加奖品</el-button>\n\n      </div>\n      <el-table :data="list">\n        <el-table-column label="名称"\n                         align="center"\n                         prop="name">\n        </el-table-column>\n        <el-table-column label="图片"\n                         align="center"\n                         ref="column">\n          <template slot-scope="scope">\n            <div ref=\'photo\'>\n              <img :src="scope.row.photo"\n                   class="rewardImg" />\n            </div>\n          </template>\n        </el-table-column>\n        <el-table-column label="最高工时费"\n                         prop="max_charge"\n                         align="center"></el-table-column>\n\n        <el-table-column label="更换里程(km)"\n                         prop="need_km"\n                         align="center">\n\n        </el-table-column>\n        <el-table-column label="固定数量值"\n                         align="center"\n                         prop="fixed_value">\n\n        </el-table-column>\n        <el-table-column label="规格"\n                         align="center"\n                         prop="standard">\n        </el-table-column>\n        <el-table-column label="产品描述"\n                         align="center">\n          <template slot-scope="scope">\n            <el-popover placement="top-start"\n                        title="产品描述"\n                        width="200"\n                        trigger="hover">\n              <el-button slot="reference"\n                         type="text"\n                         class="ellipsis"\n                         style="width:100px"\n                         v-html="scope.row.detail">{{scope.row.detail}}</el-button>\n              <div v-html="scope.row.detail"></div>\n            </el-popover>\n          </template>\n        </el-table-column>\n        <el-table-column label="操作"\n                         align="center">\n          <template slot-scope="scope">\n            <el-button type="primary"\n                       size="small"\n                       @click="state=1,change(scope.row)">修改</el-button>\n          </template>\n        </el-table-column>\n      </el-table>\n\n      <el-dialog :title="state == 0 ? \'添加\' : \'修改\'"\n                 :visible.sync=\'modifyVisible\'\n                 @close=\'resetFields\'\n                 center>\n        <el-form style="width:80%"\n                 label-width="100px"\n                 :model="listQuery"\n                 :rules=\'rules\'\n                 ref="ruleForm">\n          <el-form-item label="名称:"\n                        prop="name">\n            <el-input placeholder="请输入名称"\n                      v-model="listQuery.name" />\n          </el-form-item>\n          <el-form-item label="更换里程:"\n                        prop="need_km">\n            <el-input placeholder="请输入人数"\n                      v-model="listQuery.need_km" />\n          </el-form-item>\n          <el-form-item label="最高工时费:"\n                        prop="max_charge">\n            <el-input placeholder="请输入工时费"\n                      v-model="listQuery.max_charge" />\n          </el-form-item>\n          <el-form-item label="固定数量值:"\n                        prop="fixed_value">\n            <el-input placeholder="请输入固定数量值"\n                      v-model="listQuery.fixed_value" />\n          </el-form-item>\n          <el-form-item label="规格:"\n                        prop="standard">\n            <el-input placeholder="请输入固定数量值"\n                      v-model="listQuery.standard" />\n          </el-form-item>\n          <el-form-item label="图片:"\n                        prop="photo">\n            <el-upload :action=\'baseURL+"admin/Prize/cbImg"\'\n                       :data="{token:token}"\n                       name=\'img\'\n                       list-type="picture-card"\n                       :file-list=\'listQuery.photo ? [{url:listQuery.photo}] : []\'\n                       :limit=\'1\'\n                       :on-success="handleAvatarSuccess">\n              <i class="el-icon-plus"></i>\n            </el-upload>\n            <el-dialog :visible.sync="imgVisible"\n                       size="tiny">\n              <img width="100%"\n                   :src="dialogImageUrl"\n                   alt="">\n            </el-dialog>\n          </el-form-item>\n          <el-form-item label="描述:"\n                        prop="detail">\n            <wangEditor :content=\'listQuery.detail\'\n                        :catchData=\'catchData\' />\n          </el-form-item>\n          <el-form-item>\n            <el-button type="primary"\n                       @click="state ==0 ? addGoods() :modify()">{{state == 0 ? \'添加\' : \'修改\'}}</el-button>\n            <el-button type="primary"\n                       @click="resetFields">重置</el-button>\n          </el-form-item>\n        </el-form>\n\n      </el-dialog>\n      <div class="page_center"\n           v-show="earningsTotal&&earningsTotal>1">\n        <paging :page-count="earningsTotal"\n                :page="earningsPage"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport Viewer from \'@/utils/Viewer\'\nimport wangEditor from \'@/components/common/wangEditor\'\nexport default {\n  data () {\n    return {\n      authList: [],\n      list: [],\n      seCurId: \'\',\n      token: window.sessionStorage.getItem(\'bbytoken\'), //token令牌\n      page: 0,  //供应商列表当前页数\n      pageCount: 0, //供应商列表总页数\n      state: 0,\n      earningsTotal: 0,\n      earningsPage: 0,\n      modifyVisible: false,\n      imgVisible: false,\n      listQuery: {},\n      dialogImageUrl: \'\',\n      rules: {\n        name: { required: true, message: \'请输入奖品名称\', trigger: \'blur\' },\n        need_km: { required: true, message: \'请输入历程\', trigger: \'blur\' },\n        max_charge: { required: true, message: \'请输入工时费\', trigger: \'blur\' },\n        fixed_value: { required: true, message: \'请输入数量值\', trigger: \'blur\' },\n        photo: { required: true, message: \'请上传图片\', trigger: \'blur\' },\n        detail: { required: true, message: \'请输入描述信息\', trigger: \'blur\' },\n        standard: { required: true, message: \'请输入规格\', trigger: \'blur\' },\n      }\n    }\n  },\n  components: { wangEditor },\n  methods: {\n    paging (e) {  //获取供应商列表当前页\n      this.page = e\n      this.init()\n    },\n\n    async init () {\n      try {\n        const res = await this.$axios.post(\'admin/SmList/adminFreeList\', { token: this.token, page: this.page })\n        this.list = res.data.data || []\n        this.pageCount = res.data.data.rows || 0\n      } catch (err) {\n        throw (err)\n      }\n    },\n\n\n    handleAvatarSuccess (res) {  //上传图片\n      this.uploadImgUrl = res\n      this.listQuery = Object.assign({}, this.listQuery, { photo: res })\n    },\n    catchData (value) {\n      this.listQuery = Object.assign({}, this.listQuery, { detail: value })\n    },\n    change (row) {\n      this.modifyVisible = true\n      this.$nextTick(() => {\n        this.listQuery = Object.assign({}, row)\n      })\n    },\n    resetFields () {\n      this.$refs.ruleForm.resetFields()\n    },\n\n    addGoods () {  //添加商品\n      this.$refs.ruleForm.validate(async (valid) => {\n        if (valid) {\n          try {\n            const res = await this.$axios.post(\'admin/SmList/upFree\', Object.assign({}, this.listQuery, { token: this.token, }))\n            if (res.data.code == 1) {\n              this.init()\n              this.modifyVisible = false\n              this.$message({ message: res.data.msg, type: \'success\' })\n            } else {\n              this.$message.error(res.data.msg)\n            }\n          } catch (err) {\n            throw (err)\n          }\n        }\n      });\n\n    },\n    async modify () {  //修改\n      this.$refs.ruleForm.validate(async (valid) => {\n        if (valid) {\n          try {\n            const res = await this.$axios.post(\'admin/SmList/updateFree\', Object.assign({}, this.listQuery, { token: this.token }))\n            if (res.data.code == 1) {\n              this.modifyVisible = false\n              this.init()\n              this.$message({ message: res.data.msg, type: \'success\' })\n            } else {\n              this.$message.error(res.data.msg)\n            }\n          } catch (err) {\n            throw (err)\n          }\n        }\n      })\n    },\n    // 权限列表,当前所在权限页  \n    erAuth () {\n      var id = this.$route.query.id;\n      this.curId = id;\n      this.$axios.post(\'admin/Auth/erAuth\', {\n        token: window.sessionStorage.getItem(\'bbytoken\'),\n        id: id\n      }).then(res => {\n        if (res.data.code == 1) {\n          var arr = res.data.data || [];\n          this.authList = arr;\n          console.log(this.authList)\n        } else {\n          this.$alert(res.data.msg, \'提示\', {\n            type: \'error\'\n          });\n        }\n      })\n        .catch(err => {\n          alert(err);\n        })\n    }\n  },\n  created () {\n    this.erAuth()\n  },\n  mounted () {\n\n    this.init() //初始化数据  \n\n  },\n}\n<\/script>\n<style scoped>\n.ellipsis {\n  width: 80px !important;\n  white-space: nowrap !important;\n  text-overflow: ellipsis !important;\n  overflow: hidden !important;\n}\n.add_goods {\n  float: right;\n  margin-top: 25px;\n  margin-right: 20px;\n}\n.rewardImg {\n  width: 70px;\n  height: 70px;\n}\n>>> .w-e-toolbar {\n  overflow: auto;\n}\n</style>'],sourceRoot:""}])}});
//# sourceMappingURL=99.48ca05a8aec023178d05.js.map