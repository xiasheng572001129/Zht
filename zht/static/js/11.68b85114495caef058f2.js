webpackJsonp([11],{"1qOy":function(n,t,e){var i=e("4lyW");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("0e7a8b46",i,!1,{})},"46Fb":function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.el-dialog__header {\n  background: rgba(152, 209, 249, 1);\n  padding-bottom: 20px;\n}\n.el-dialog__title {\n  color: white;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/MunicipalAgent/src/components/MunicipalAgent/cityList.vue"],names:[],mappings:";AA0WA;EACA,mCAAA;EACA,qBAAA;CACA;AAEA;EACA,aAAA;CACA",file:"cityList.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link active-class="activeClass"\n                   :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>市级代理列表<input placeholder="搜索"\n                 class="CityInput"></div>\n\n      </div>\n      <table class="table">\n        <thead>\n          <tr>\n            <th>营业执照</th>\n            <th>市级代理</th>\n            <th>联系电话</th>\n            <th>负责人</th>\n            <th>运营商数量</th>\n            <th>区域个数</th>\n            <th>售卡数量</th>\n            <th>保养次数</th>\n            <th>账户余额</th>\n            <th>预约提醒</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="(item,index) in list">\n            <td><img :src="item.license"\n                   class="Img"\n                   @click="tapImg(item.gid)"></td>\n            <td>{{item.company}}</td>\n            <td>{{item.phone}}</td>\n            <td>{{item.leader}}</td>\n            <td>\n              <a href="javascript:;"\n                 @click="openShop(item.gid)">{{item.agent_nums}}</a>\n            </td>\n            <td>\n              <a href="javascript:;"\n                 @click="regionNum(item.gid)">{{item.regions}}</a>\n            </td>\n            <td>\n              <a href="javascript:;"\n                 @click="maintain(item.gid)">{{item.sale_card}}</a>\n            </td>\n            <td>\n              {{item.service_time}}\n            </td>\n            <td>{{item.balance}}</td>\n            <td>{{item.audit_time}}</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <el-dialog title="运营商数量"\n                 @close="close"\n                 :visible.sync="DialogVisible"\n                 width="60%"\n                 center>\n        <table class="table table_bottom">\n          <thead>\n            <tr>\n              <th>运营商名称</th>\n              <th>负责人</th>\n              <th>联系电话</th>\n              <th>运营区域</th>\n              <th>分佣比例</th>\n              <th>合同到期时间</th>\n\n            </tr>\n          </thead>\n          <tbody>\n            <tr v-for="item in Operate">\n              <td>{{item.company}}</td>\n              <td>{{item.leader}}</td>\n              <td>{{item.phone}}</td>\n              <td>{{item.county}}</td>\n              <td>{{item.profit}}</td>\n              <td>{{item.end_time?item.end_time:\'---\'}}</td>\n            </tr>\n          </tbody>\n        </table>\n        <div class="page_center"\n             v-show="pageCounts&&pageCounts>1">\n          <paging :page-count="pageCounts"\n                  :page="OpPage"\n                  @index="OperatorPage"></paging>\n        </div>\n      </el-dialog>\n      <el-dialog title="售卡数量"\n                 ref="my"\n                 :visible.sync="SalecardVisible"\n                 width="60%"\n                 center\n                 @close="close">\n        <table class="table">\n          <thead>\n            <tr>\n              <th>运营商名称</th>\n              <th>负责人</th>\n              <th>电话</th>\n              <th>售卡总数</th>\n              <th>交易金额</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr v-for="item in Maintain">\n              <td>{{item.company}}</td>\n              <td>{{item.leader}}</td>\n              <td>{{item.phone}}</td>\n              <td>{{item.sale_card}}</td>\n              <td>{{item.sum}}</td>\n\n            </tr>\n          </tbody>\n        </table>\n        <div class="page_center"\n             v-show="maintainCount&&maintainCount>1">\n          <paging :page-count="maintainCount"\n                  :page="maintainPage"\n                  @index="mainPage"></paging>\n\n        </div>\n      </el-dialog>\n\n      \x3c!-- 分页 --\x3e\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n      <Region-dialog title="区域个数"\n                     @regionClose="regionClose"\n                     :Province="Province"\n                     :regionVisible="centerDialogVisible"\n                     :countyShow="false"></Region-dialog>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport page from \'../common.js\';\nimport RegionDialog from \'@/components/Dialog/RegionDialog\'\nexport default {\n  data () {\n    return {\n      list: [],\n      Operate: [],\n      Salecard: [],\n      Maintain: [],\n      Province: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      //分页数据\n      page: 1, //显示的页码数\n      OpPage: 1, //运营商数量显示的页码数\n      maintainPage: 1, //保养次数显示的页码数\n      pageCount: 1, //页的总数\n      pageCounts: 1, //运营商数量 页的总数\n      maintainCount: 1,\n      index: 1, //点击的当前页，\n      endpage: 1, //当前一组页码的最大值\n      arr: [], //默认显示 1 2 3 4 5页\n      n: 1, //当前点击的页码的位置\n      authList: [],\n      curId: 0,\n      seCurId: 0,\n      centerDialogVisible: false,\n      DialogVisible: false,\n      SalecardVisible: false,\n      OperatorId: "",\n      maintaId: ""\n    }\n  },\n  components: {\n    RegionDialog\n  },\n  created () {\n    this.init()\n  },\n\n  mounted () {\n    var id = this.$route.query.id\n\n    this.curId = id;\n    this.$axios.post("admin/Auth/erAuth", {\n      token: this.token,\n      id: id\n    }).then(res => {\n      var arr = res.data.data;\n\n      for (var i = 0; i < arr.length; i++) {\n        if (arr[i].name == "市级代理列表") {\n          this.seCurId = arr[i].id\n        }\n      }\n      this.authList = arr;\n    })\n\n  },\n\n  methods: {\n    close () {\n      this.Operate = []\n      this.Maintain = []\n      this.OpPage = 1,\n        this.maintainCount = 1\n      this.pageCounts = 1\n    },\n\n    OperatorPage (e) {\n      this.OpPage = e;\n      this.openShop(this.OperatorId)\n\n    },\n    mainPage (e) {\n\n      this.maintainPage = e;\n      this.maintain(this.maintaId)\n    },\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n\n    regionClose () {\n      this.centerDialogVisible = false\n    },\n    init () {\n      this.$axios.post("supply/index", { //市级代理列表\n        token: this.token,\n        page: this.page\n      }).then(res => {\n        if (res.data.code == 1) {\n\n          if (res.data.code == 1) {\n            this.list = res.data.data.list\n            this.pageCount = res.data.data.rows;\n          } else {\n            layer.msg(res.data.msg, { time: 500 })\n          }\n        }\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    openShop (gid) {\n      this.OperatorId = gid\n\n      this.$axios.post("supply/agent", { //运营商个数详情\n        token: this.token,\n        gid: gid,\n        page: this.OpPage\n      }).then(res => {\n        if (res.data.code == 1) {\n\n          this.DialogVisible = true\n          this.Operate = res.data.data.list\n          this.pageCounts = res.data.data.rows;\n\n        } else {\n          this.DialogVisible = false;\n          layer.msg(res.data.msg, { time: 500 })\n        }\n      }).catch(err => {\n        throw (err)\n      })\n\n    },\n    regionNum (gid) {\n\n      this.$axios.post("supply/region", {\n        token: this.token,\n        gid: gid\n      }).then(res => {\n\n        if (res.data.code == 1) {\n          this.centerDialogVisible = true\n          this.Province = res.data.data ? res.data.data : ["", ""];\n\n        } else {\n          this.centerDialogVisible = false;\n          layer.msg(res.data.msg, { time: 500 })\n        }\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    maintain (gid) {\n      this.maintaId = gid\n\n      this.$axios.post("supply/card", {\n        token: this.token,\n        gid: gid,\n        page: this.maintainPage\n      }).then(res => {\n\n        if (res.data.code == 1) {\n          this.SalecardVisible = true\n          this.Maintain = res.data.data.list\n          this.maintainCount = res.data.data.rows;\n        } else {\n          this.SalecardVisible = false;\n          layer.msg(res.data.msg, { time: 500 })\n        }\n\n        //            if(res.data.data.list){\n        //              this.Maintain = res.data.data.list\n        //              this.maintainCount = res.data.data.rows;\n        //            }else {\n        //              this.SalecardVisible=false;\n        //              this.layer.msg("")\n        //            }\n\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    tapImg (gid) {\n\n    },\n\n  },\n\n}\n<\/script>\n<style scoped>\n.activeClass {\n  color: #04bbfc;\n}\n\n.CityInput {\n  width: 100px;\n  margin-left: 400px;\n  height: 36px;\n  border: 0;\n  outline: none;\n  background-color: #04bbfc;\n  border-radius: 18px;\n  text-align: center;\n}\n\ninput::-webkit-input-placeholder {\n  color: #ffffff;\n}\n\n.Img {\n  vertical-align: middle;\n  width: 100px;\n  height: 120px;\n  padding: 20px 0;\n}\n</style>\n<style>\n.el-dialog__header {\n  background: rgba(152, 209, 249, 1);\n  padding-bottom: 20px;\n}\n\n.el-dialog__title {\n  color: white;\n}\n</style>\n'],sourceRoot:""}])},"4lyW":function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.activeClass[data-v-d35020f6] {\n  color: #04bbfc;\n}\n.CityInput[data-v-d35020f6] {\n  width: 100px;\n  margin-left: 400px;\n  height: 36px;\n  border: 0;\n  outline: none;\n  background-color: #04bbfc;\n  border-radius: 18px;\n  text-align: center;\n}\ninput[data-v-d35020f6]::-webkit-input-placeholder {\n  color: #ffffff;\n}\n.Img[data-v-d35020f6] {\n  vertical-align: middle;\n  width: 100px;\n  height: 120px;\n  padding: 20px 0;\n}\n","",{version:3,sources:["F:/仲达集团/2020-3-18总后台管理系统/src/components/MunicipalAgent/src/components/MunicipalAgent/cityList.vue"],names:[],mappings:";AA+UA;EACA,eAAA;CACA;AAEA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,UAAA;EACA,cAAA;EACA,0BAAA;EACA,oBAAA;EACA,mBAAA;CACA;AAEA;EACA,eAAA;CACA;AAEA;EACA,uBAAA;EACA,aAAA;EACA,cAAA;EACA,gBAAA;CACA",file:"cityList.vue",sourcesContent:['<template>\n  <div>\n    <ctbHead>\n      <router-link active-class="activeClass"\n                   :class="seCurId==item.id? \'cur\':\'\'"\n                   v-for="item in authList"\n                   :key="item.id"\n                   :to="{path:item.action,query:{id:curId}}"\n                   :v-key="item.id">\n        {{item.name}}\n      </router-link>\n    </ctbHead>\n    <div class="container">\n      <div class="quote">\n        <div class="quote-ele"><i></i>市级代理列表<input placeholder="搜索"\n                 class="CityInput"></div>\n\n      </div>\n      <table class="table">\n        <thead>\n          <tr>\n            <th>营业执照</th>\n            <th>市级代理</th>\n            <th>联系电话</th>\n            <th>负责人</th>\n            <th>运营商数量</th>\n            <th>区域个数</th>\n            <th>售卡数量</th>\n            <th>保养次数</th>\n            <th>账户余额</th>\n            <th>预约提醒</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for="(item,index) in list">\n            <td><img :src="item.license"\n                   class="Img"\n                   @click="tapImg(item.gid)"></td>\n            <td>{{item.company}}</td>\n            <td>{{item.phone}}</td>\n            <td>{{item.leader}}</td>\n            <td>\n              <a href="javascript:;"\n                 @click="openShop(item.gid)">{{item.agent_nums}}</a>\n            </td>\n            <td>\n              <a href="javascript:;"\n                 @click="regionNum(item.gid)">{{item.regions}}</a>\n            </td>\n            <td>\n              <a href="javascript:;"\n                 @click="maintain(item.gid)">{{item.sale_card}}</a>\n            </td>\n            <td>\n              {{item.service_time}}\n            </td>\n            <td>{{item.balance}}</td>\n            <td>{{item.audit_time}}</td>\n          </tr>\n        </tbody>\n      </table>\n\n      <el-dialog title="运营商数量"\n                 @close="close"\n                 :visible.sync="DialogVisible"\n                 width="60%"\n                 center>\n        <table class="table table_bottom">\n          <thead>\n            <tr>\n              <th>运营商名称</th>\n              <th>负责人</th>\n              <th>联系电话</th>\n              <th>运营区域</th>\n              <th>分佣比例</th>\n              <th>合同到期时间</th>\n\n            </tr>\n          </thead>\n          <tbody>\n            <tr v-for="item in Operate">\n              <td>{{item.company}}</td>\n              <td>{{item.leader}}</td>\n              <td>{{item.phone}}</td>\n              <td>{{item.county}}</td>\n              <td>{{item.profit}}</td>\n              <td>{{item.end_time?item.end_time:\'---\'}}</td>\n            </tr>\n          </tbody>\n        </table>\n        <div class="page_center"\n             v-show="pageCounts&&pageCounts>1">\n          <paging :page-count="pageCounts"\n                  :page="OpPage"\n                  @index="OperatorPage"></paging>\n        </div>\n      </el-dialog>\n      <el-dialog title="售卡数量"\n                 ref="my"\n                 :visible.sync="SalecardVisible"\n                 width="60%"\n                 center\n                 @close="close">\n        <table class="table">\n          <thead>\n            <tr>\n              <th>运营商名称</th>\n              <th>负责人</th>\n              <th>电话</th>\n              <th>售卡总数</th>\n              <th>交易金额</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr v-for="item in Maintain">\n              <td>{{item.company}}</td>\n              <td>{{item.leader}}</td>\n              <td>{{item.phone}}</td>\n              <td>{{item.sale_card}}</td>\n              <td>{{item.sum}}</td>\n\n            </tr>\n          </tbody>\n        </table>\n        <div class="page_center"\n             v-show="maintainCount&&maintainCount>1">\n          <paging :page-count="maintainCount"\n                  :page="maintainPage"\n                  @index="mainPage"></paging>\n\n        </div>\n      </el-dialog>\n\n      \x3c!-- 分页 --\x3e\n      <div class="page_center"\n           v-show="pageCount&&pageCount>1">\n        <paging :page-count="pageCount"\n                :page="page"\n                @index="paging"></paging>\n        \x3c!--分页的组件--\x3e\n      </div>\n      <Region-dialog title="区域个数"\n                     @regionClose="regionClose"\n                     :Province="Province"\n                     :regionVisible="centerDialogVisible"\n                     :countyShow="false"></Region-dialog>\n    </div>\n  </div>\n</template>\n<script type="text/ecmascript-6">\nimport page from \'../common.js\';\nimport RegionDialog from \'@/components/Dialog/RegionDialog\'\nexport default {\n  data () {\n    return {\n      list: [],\n      Operate: [],\n      Salecard: [],\n      Maintain: [],\n      Province: [],\n      token: window.sessionStorage.getItem(\'bbytoken\'),\n      //分页数据\n      page: 1, //显示的页码数\n      OpPage: 1, //运营商数量显示的页码数\n      maintainPage: 1, //保养次数显示的页码数\n      pageCount: 1, //页的总数\n      pageCounts: 1, //运营商数量 页的总数\n      maintainCount: 1,\n      index: 1, //点击的当前页，\n      endpage: 1, //当前一组页码的最大值\n      arr: [], //默认显示 1 2 3 4 5页\n      n: 1, //当前点击的页码的位置\n      authList: [],\n      curId: 0,\n      seCurId: 0,\n      centerDialogVisible: false,\n      DialogVisible: false,\n      SalecardVisible: false,\n      OperatorId: "",\n      maintaId: ""\n    }\n  },\n  components: {\n    RegionDialog\n  },\n  created () {\n    this.init()\n  },\n\n  mounted () {\n    var id = this.$route.query.id\n\n    this.curId = id;\n    this.$axios.post("admin/Auth/erAuth", {\n      token: this.token,\n      id: id\n    }).then(res => {\n      var arr = res.data.data;\n\n      for (var i = 0; i < arr.length; i++) {\n        if (arr[i].name == "市级代理列表") {\n          this.seCurId = arr[i].id\n        }\n      }\n      this.authList = arr;\n    })\n\n  },\n\n  methods: {\n    close () {\n      this.Operate = []\n      this.Maintain = []\n      this.OpPage = 1,\n        this.maintainCount = 1\n      this.pageCounts = 1\n    },\n\n    OperatorPage (e) {\n      this.OpPage = e;\n      this.openShop(this.OperatorId)\n\n    },\n    mainPage (e) {\n\n      this.maintainPage = e;\n      this.maintain(this.maintaId)\n    },\n    paging (e) {\n      this.page = e;\n      this.init()\n    },\n\n    regionClose () {\n      this.centerDialogVisible = false\n    },\n    init () {\n      this.$axios.post("supply/index", { //市级代理列表\n        token: this.token,\n        page: this.page\n      }).then(res => {\n        if (res.data.code == 1) {\n\n          if (res.data.code == 1) {\n            this.list = res.data.data.list\n            this.pageCount = res.data.data.rows;\n          } else {\n            layer.msg(res.data.msg, { time: 500 })\n          }\n        }\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    openShop (gid) {\n      this.OperatorId = gid\n\n      this.$axios.post("supply/agent", { //运营商个数详情\n        token: this.token,\n        gid: gid,\n        page: this.OpPage\n      }).then(res => {\n        if (res.data.code == 1) {\n\n          this.DialogVisible = true\n          this.Operate = res.data.data.list\n          this.pageCounts = res.data.data.rows;\n\n        } else {\n          this.DialogVisible = false;\n          layer.msg(res.data.msg, { time: 500 })\n        }\n      }).catch(err => {\n        throw (err)\n      })\n\n    },\n    regionNum (gid) {\n\n      this.$axios.post("supply/region", {\n        token: this.token,\n        gid: gid\n      }).then(res => {\n\n        if (res.data.code == 1) {\n          this.centerDialogVisible = true\n          this.Province = res.data.data ? res.data.data : ["", ""];\n\n        } else {\n          this.centerDialogVisible = false;\n          layer.msg(res.data.msg, { time: 500 })\n        }\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    maintain (gid) {\n      this.maintaId = gid\n\n      this.$axios.post("supply/card", {\n        token: this.token,\n        gid: gid,\n        page: this.maintainPage\n      }).then(res => {\n\n        if (res.data.code == 1) {\n          this.SalecardVisible = true\n          this.Maintain = res.data.data.list\n          this.maintainCount = res.data.data.rows;\n        } else {\n          this.SalecardVisible = false;\n          layer.msg(res.data.msg, { time: 500 })\n        }\n\n        //            if(res.data.data.list){\n        //              this.Maintain = res.data.data.list\n        //              this.maintainCount = res.data.data.rows;\n        //            }else {\n        //              this.SalecardVisible=false;\n        //              this.layer.msg("")\n        //            }\n\n      }).catch(err => {\n        throw (err)\n      })\n    },\n    tapImg (gid) {\n\n    },\n\n  },\n\n}\n<\/script>\n<style scoped>\n.activeClass {\n  color: #04bbfc;\n}\n\n.CityInput {\n  width: 100px;\n  margin-left: 400px;\n  height: 36px;\n  border: 0;\n  outline: none;\n  background-color: #04bbfc;\n  border-radius: 18px;\n  text-align: center;\n}\n\ninput::-webkit-input-placeholder {\n  color: #ffffff;\n}\n\n.Img {\n  vertical-align: middle;\n  width: 100px;\n  height: 120px;\n  padding: 20px 0;\n}\n</style>\n<style>\n.el-dialog__header {\n  background: rgba(152, 209, 249, 1);\n  padding-bottom: 20px;\n}\n\n.el-dialog__title {\n  color: white;\n}\n</style>\n'],sourceRoot:""}])},"5tL1":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});e("E7z3");var i={data:function(){return{list:[],Operate:[],Salecard:[],Maintain:[],Province:[],token:window.sessionStorage.getItem("bbytoken"),page:1,OpPage:1,maintainPage:1,pageCount:1,pageCounts:1,maintainCount:1,index:1,endpage:1,arr:[],n:1,authList:[],curId:0,seCurId:0,centerDialogVisible:!1,DialogVisible:!1,SalecardVisible:!1,OperatorId:"",maintaId:""}},components:{RegionDialog:e("Tb/d").a},created:function(){this.init()},mounted:function(){var n=this,t=this.$route.query.id;this.curId=t,this.$axios.post("admin/Auth/erAuth",{token:this.token,id:t}).then(function(t){for(var e=t.data.data,i=0;i<e.length;i++)"市级代理列表"==e[i].name&&(n.seCurId=e[i].id);n.authList=e})},methods:{close:function(){this.Operate=[],this.Maintain=[],this.OpPage=1,this.maintainCount=1,this.pageCounts=1},OperatorPage:function(n){this.OpPage=n,this.openShop(this.OperatorId)},mainPage:function(n){this.maintainPage=n,this.maintain(this.maintaId)},paging:function(n){this.page=n,this.init()},regionClose:function(){this.centerDialogVisible=!1},init:function(){var n=this;this.$axios.post("supply/index",{token:this.token,page:this.page}).then(function(t){1==t.data.code&&(1==t.data.code?(n.list=t.data.data.list,n.pageCount=t.data.data.rows):layer.msg(t.data.msg,{time:500}))}).catch(function(n){throw n})},openShop:function(n){var t=this;this.OperatorId=n,this.$axios.post("supply/agent",{token:this.token,gid:n,page:this.OpPage}).then(function(n){1==n.data.code?(t.DialogVisible=!0,t.Operate=n.data.data.list,t.pageCounts=n.data.data.rows):(t.DialogVisible=!1,layer.msg(n.data.msg,{time:500}))}).catch(function(n){throw n})},regionNum:function(n){var t=this;this.$axios.post("supply/region",{token:this.token,gid:n}).then(function(n){1==n.data.code?(t.centerDialogVisible=!0,t.Province=n.data.data?n.data.data:["",""]):(t.centerDialogVisible=!1,layer.msg(n.data.msg,{time:500}))}).catch(function(n){throw n})},maintain:function(n){var t=this;this.maintaId=n,this.$axios.post("supply/card",{token:this.token,gid:n,page:this.maintainPage}).then(function(n){1==n.data.code?(t.SalecardVisible=!0,t.Maintain=n.data.data.list,t.maintainCount=n.data.data.rows):(t.SalecardVisible=!1,layer.msg(n.data.msg,{time:500}))}).catch(function(n){throw n})},tapImg:function(n){}}},a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("ctbHead",n._l(n.authList,function(t){return e("router-link",{key:t.id,class:n.seCurId==t.id?"cur":"",attrs:{"active-class":"activeClass",to:{path:t.action,query:{id:n.curId}},"v-key":t.id}},[n._v("\n      "+n._s(t.name)+"\n    ")])}),1),n._v(" "),e("div",{staticClass:"container"},[n._m(0),n._v(" "),e("table",{staticClass:"table"},[n._m(1),n._v(" "),e("tbody",n._l(n.list,function(t,i){return e("tr",[e("td",[e("img",{staticClass:"Img",attrs:{src:t.license},on:{click:function(e){return n.tapImg(t.gid)}}})]),n._v(" "),e("td",[n._v(n._s(t.company))]),n._v(" "),e("td",[n._v(n._s(t.phone))]),n._v(" "),e("td",[n._v(n._s(t.leader))]),n._v(" "),e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return n.openShop(t.gid)}}},[n._v(n._s(t.agent_nums))])]),n._v(" "),e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return n.regionNum(t.gid)}}},[n._v(n._s(t.regions))])]),n._v(" "),e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){return n.maintain(t.gid)}}},[n._v(n._s(t.sale_card))])]),n._v(" "),e("td",[n._v("\n            "+n._s(t.service_time)+"\n          ")]),n._v(" "),e("td",[n._v(n._s(t.balance))]),n._v(" "),e("td",[n._v(n._s(t.audit_time))])])}),0)]),n._v(" "),e("el-dialog",{attrs:{title:"运营商数量",visible:n.DialogVisible,width:"60%",center:""},on:{close:n.close,"update:visible":function(t){n.DialogVisible=t}}},[e("table",{staticClass:"table table_bottom"},[e("thead",[e("tr",[e("th",[n._v("运营商名称")]),n._v(" "),e("th",[n._v("负责人")]),n._v(" "),e("th",[n._v("联系电话")]),n._v(" "),e("th",[n._v("运营区域")]),n._v(" "),e("th",[n._v("分佣比例")]),n._v(" "),e("th",[n._v("合同到期时间")])])]),n._v(" "),e("tbody",n._l(n.Operate,function(t){return e("tr",[e("td",[n._v(n._s(t.company))]),n._v(" "),e("td",[n._v(n._s(t.leader))]),n._v(" "),e("td",[n._v(n._s(t.phone))]),n._v(" "),e("td",[n._v(n._s(t.county))]),n._v(" "),e("td",[n._v(n._s(t.profit))]),n._v(" "),e("td",[n._v(n._s(t.end_time?t.end_time:"---"))])])}),0)]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.pageCounts&&n.pageCounts>1,expression:"pageCounts&&pageCounts>1"}],staticClass:"page_center"},[e("paging",{attrs:{"page-count":n.pageCounts,page:n.OpPage},on:{index:n.OperatorPage}})],1)]),n._v(" "),e("el-dialog",{ref:"my",attrs:{title:"售卡数量",visible:n.SalecardVisible,width:"60%",center:""},on:{"update:visible":function(t){n.SalecardVisible=t},close:n.close}},[e("table",{staticClass:"table"},[e("thead",[e("tr",[e("th",[n._v("运营商名称")]),n._v(" "),e("th",[n._v("负责人")]),n._v(" "),e("th",[n._v("电话")]),n._v(" "),e("th",[n._v("售卡总数")]),n._v(" "),e("th",[n._v("交易金额")])])]),n._v(" "),e("tbody",n._l(n.Maintain,function(t){return e("tr",[e("td",[n._v(n._s(t.company))]),n._v(" "),e("td",[n._v(n._s(t.leader))]),n._v(" "),e("td",[n._v(n._s(t.phone))]),n._v(" "),e("td",[n._v(n._s(t.sale_card))]),n._v(" "),e("td",[n._v(n._s(t.sum))])])}),0)]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.maintainCount&&n.maintainCount>1,expression:"maintainCount&&maintainCount>1"}],staticClass:"page_center"},[e("paging",{attrs:{"page-count":n.maintainCount,page:n.maintainPage},on:{index:n.mainPage}})],1)]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.pageCount&&n.pageCount>1,expression:"pageCount&&pageCount>1"}],staticClass:"page_center"},[e("paging",{attrs:{"page-count":n.pageCount,page:n.page},on:{index:n.paging}})],1),n._v(" "),e("Region-dialog",{attrs:{title:"区域个数",Province:n.Province,regionVisible:n.centerDialogVisible,countyShow:!1},on:{regionClose:n.regionClose}})],1)],1)};a._withStripped=!0;var s={render:a,staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"quote"},[t("div",{staticClass:"quote-ele"},[t("i"),this._v("市级代理列表"),t("input",{staticClass:"CityInput",attrs:{placeholder:"搜索"}})])])},function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("thead",[e("tr",[e("th",[n._v("营业执照")]),n._v(" "),e("th",[n._v("市级代理")]),n._v(" "),e("th",[n._v("联系电话")]),n._v(" "),e("th",[n._v("负责人")]),n._v(" "),e("th",[n._v("运营商数量")]),n._v(" "),e("th",[n._v("区域个数")]),n._v(" "),e("th",[n._v("售卡数量")]),n._v(" "),e("th",[n._v("保养次数")]),n._v(" "),e("th",[n._v("账户余额")]),n._v(" "),e("th",[n._v("预约提醒")])])])}]},o=s;var r=!1;var d=e("VU/8")(i,o,!1,function(n){r||(e("1qOy"),e("sEbq"))},"data-v-d35020f6",null);d.options.__file="src/components/MunicipalAgent/cityList.vue";t.default=d.exports},sEbq:function(n,t,e){var i=e("46Fb");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("a12d9554",i,!1,{})}});
//# sourceMappingURL=11.68b85114495caef058f2.js.map