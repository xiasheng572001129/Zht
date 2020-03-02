<template>
  <div>
    <ctbHead>
      <router-link active-class="activeClass"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>

      <!-- 手动添加内容 -->
      <!--       <router-link :to="{path:'/yRation/pass'}">
          反馈列表
      </router-link> -->
    </ctbHead>

    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>延迟违约</div>

      </div>
      <table class="table">
        <thead style="width: 100%;">
          <tr>
            <th>市级配送中心</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>罚款金额</th>
            <th>罚款次数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l"><a href="javascript:;"
                 @click="companyf(item.aid)">{{item.company}}</a></td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.fines}}</td>
            <td>{{item.fines_num}}</td>
            <td><a href="javascript:;"
                 @click="details(item.aid)">详情</a></td>
            <td v-if="item.regions"><a href="javascript:;"
                 @click="regionsf(item.aid)">{{item.regions}}</a></td>

            <td v-if="item.sale_time">{{item.sale_card}}</td>

            <td>{{item.balance}}</td>
            <td v-if='item.service_time'>{{item.service_time}}</td>

          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="ind"></paging>
        <!--分页的组件-->
      </div>
      <!--<div id="pagination" :class="{res:list.length>=9}">-->

      <!--</div>-->
    </div>
    <div class="laybox"
         style="display:none">
      <img :src="comlist.license"
           alt="">
      <ul>
        <li>公司名称: {{comlist.company}}</li>
        <li>负责人: {{comlist.leader}}</li>
        <li>联系电话: {{comlist.phone}}</li>
        <li>详细地址: {{comlist.province+comlist.city+comlist.county+comlist.address}}</li>
        <li>开户行: {{comlist.branch}}</li>
        <li>提款账号: {{comlist.account}}</li>
        <li>开户名: {{comlist.bank_name}}</li>
      </ul>
    </div>
    <div class="laybox1"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>公司名称</th>
            <th>负责人</th>
            <th>联系电话</th>
            <th>申请时间</th>
            <th>开通时间</th>
            <th>是否新开</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in numlist">
            <td>{{item.company}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.create_time}}</td>
            <td v-if="item.audit_time!=''">{{item.audit_time|datetime}}</td>
            <td v-else>--</td>
            <td>{{item.if_new}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="shuju laybox2"
         style="display:none">
      <ul>
        <li v-if="arealist.status==0">暂未设置供应地区</li>
        <li v-else
            v-for="item in arealist.data">
          {{item.name}}
          <ul v-if="item.son"
              class="son">
            <li v-for="sonitem in item.son">
              {{sonitem.name}}
              <ul v-if="sonitem.son"
                  class="grandson">
                <li v-for="grandson in sonitem.son">{{grandson.name}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <el-dialog id="Dialog"
               title="罚款详情"
               @close="close"
               :visible.sync="dialogVisible"
               width="50%"
               center>
      <div class="dialog_fine">
        <table>
          <thead>
            <tr>
              <th>市级配送中心</th>
              <th>罚款金额</th>
              <th>物料申请时间</th>
              <th>货物送达时间 </th>
              <th>延迟罚款时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Details">
              <td>{{item.shop_name}}</td>
              <td>{{item.fine}}</td>
              <td>{{item.materiel_time}}</td>
              <td>{{item.create_time}}</td>
              <td>{{item.create_time}}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <span slot="footer"
            class="dialog-footer">

        <paging :page-count="pageCounts"
                v-show="Details&&Details.length>0"
                :page="page1"
                @index="paging"></paging>

      </span>
    </el-dialog>

  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';

export default {
  data () {
    return {
      list: [],
      dialogVisible: false,
      token: window.sessionStorage.getItem('bbytoken'),
      comlist: {},
      numlist: [],
      arealist: {},
      Details: [],
      //分页数据
      page: 1, //显示的页码数
      page1: 1,
      authList: [],
      Arr: [1, 2, 3],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      pageCount: 1,
      pageCounts: 1,
      id: 1,
    }
  },
  destroyed () {

  },
  methods: {
    ind (e) { //子组件传过来的事件
      this.page = e;
      this.init()
    },
    paging (e) { //子组件传过来的事件
      this.page1 = e;

      this.details(this.id)
    },
    init () {
      this.$axios.post('admin/DelayedFines/index', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.code == 1) {

            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows
          } else {
            layer.msg(res.data.msg)
          }

        })
        .catch(err => console.log(err))
    },
    close () {
      this.pageCounts = 1
      this.page1 = 1
      this.Details = []
    },
    details (id) {

      this.dialogVisible = true;
      this.id = id;
      this.$axios.post("admin/DelayedFines/finesDetail", { token: this.token, page: this.page1, aid: id }).then(res => {

        if (res.data.code == 1) {

          this.Details = res.data.data.list
          this.pageCounts = res.data.data.rows
        }

      }).catch(err => console.log(err))


    },

    companyf (aid) {
      this.$axios.post('admin/AgentList/company', { token: this.token, aid: aid })
        .then(res => {

          this.comlist = res.data.data;
          if (res.data.data)
            layer.open({
              type: 1,
              area: ['40%', '60%'],
              title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox')
            })
          else layer.msg(res.data.msg)
        }).catch(err => { })
    },
    openshop (aid) {
      this.$axios.post('admin/AgentList/shopNum', { token: this.token, aid: aid, page: this.index2 })
        .then(res => {

          this.numlist = res.data.data.list;
          for (var i = 0; i < res.data.data.rows; i++) {
            this.pagearr1.push(i + 1);
          }
          if (res.data.data.list)
            layer.open({
              type: 1,
              area: ['60%', '50%'],
              title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox1')
            })
          else layer.msg(res.data.msg)
        })
        .catch(err => console.log(err))
    },

    regionsf: function (aid) {
      this.$axios.post('admin/AgentList/regionList', { token: this.token, aid: aid })
        .then(res => {

          this.arealist = res.data;
          if (typeof res.data.data == 'object')
            layer.open({
              type: 1,
              area: ['50%', '60%'],
              title: ['区域', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox2')
            })
          else layer.msg(res.data.data)

        }).catch(err => { })
    }
  },
  created () {
    this.init()

  },
  mounted () {
    var id = this.$route.query.id;

    this.curId = id;

    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {

        if (res.data.code == 1) {
          var arr = res.data.data;


          for (var i = 0; i < arr.length; i++) {

            if (arr[i].name == '管理列表') {
              this.seCurId = arr[i].id;
              if (arr[i].son) {

                this.threeAuthList = arr[i].son;
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '市级配送中心列表' && arr[i].name == '管理列表') {
                    this.thCurId = arr[i].son[j].id;
                  }
                }
              }
            }
          }
          this.authList = arr;

        } else {
          this.$alert(res.data.msg, '提示', { type: 'error' });
        }
      })
      .catch(err => {
        alert(err);
      })
  },
  watch: {
    index () {
      this.init();

    }

  }
  //98D1F9
}
</script>
<style >
#Page {
  margin-left: 10px;
}
/*#pagination{*/
/*position: absolute;*/
/*left: ;*/
/**/
/*}*/
.activeClass {
  color: #04bbfc !important;
}
.el-dialog__header {
  background-color: #98d1f9;
  padding: 20px 20px 20px;
}
.el-dialog__title {
  color: white;
}
.laybox {
  display: flex;
}

.laybox img {
  width: 180px;
  height: 180px;
  margin: 115px 7%;
}

.laybox ul {
  padding-left: 8%;
  margin-top: 17px;
  display: inline-block;
  border-left: 1px dashed #04bbfc;
}

.laybox ul li {
  font-size: 16px;
  margin-bottom: 40px;
}

.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}

.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}

.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.shuju .son li {
  display: block;
}

.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}

.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}
.dialog_fine {
  display: flex;
}
.dialog_fine > div {
  flex: 1;
  text-align: center;
}
.now {
  background: #3498db !important;
  color: white !important;
}
</style>
