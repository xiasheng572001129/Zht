<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>配送中心-取消合作</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>配送中心</th>
            <th>地区</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>申请时间</th>
            <th>取消理由</th>
            <th>物料交接</th>
            <th>通过时间</th>
            <th>倒计时</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list"
              :key="item.id">
            <td class="t-l">{{item.company}}</td>
            <td><a href="javascript:;"
                 @click="handleRegion(item.region)">{{item.regions}}</a></td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.create_time}}</td>
            <td><a href="javascript:;"
                 @click="reasonf(item.id)">查看</a></td>
            <td><a href="javascript:;"
                 @click="rationf(item,item.aid)">查看</a></td>
            <td>{{item.audit_time|datetime}}</td>
            <td>{{item.time >=0 ? item.time : 0 }}天</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div :class="list.length<=7?'page-nav':'page_center'"
           v-show=" list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <div class="laybox1"
         style="display:none">
      <el-table :data="materielData"
                border
                style="margin:20px 0"
                size='mini'>
        <el-table-column label="名称"
                         prop="name"
                         align="center"
                         width="300"></el-table-column>
        <el-table-column label="原有期初配给(L)"
                         prop="ration"
                         align="center"></el-table-column>
        <el-table-column label="原有剩余库存(L)"
                         prop="materiel_stock"
                         align="center"></el-table-column>
        <el-table-column :label="region>0?'取消合作减少物料(L)':'需补充数量'"
                         width="200"
                         prop="supplement"
                         align="center"></el-table-column>
        <el-table-column v-if="region>0"
                         label="现剩余配给(L)"
                         prop="supplement"
                         align="center"></el-table-column>
        <el-table-column v-if="region>0"
                         label="现剩余库存(L)"
                         prop="suppStock"
                         align="center"></el-table-column>
      </el-table>
    </div>
    <div class="regionDetail">
      <el-dialog title="详情"
                 :visible.sync="regionInfoShow"
                 width="30%"
                 center>
        <div v-if="arealist"
             class="details"
             style="margin:20px">
          <div>省 : {{arealist.proName}}</div>
          <div>市 : {{arealist.cityName}}</div>
          <div>
            区/县 :
            <span v-for="(item,index) in arealist.countyName"
                  :key="index">{{item}}、</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
export default {
  data () {
    return {
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      index: 1, //点击的当前页，
      pageCount: 1,
      endpage: 1,//当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      numlist: [],
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      materielData: [],
      region: 0,
      arealist: [],
      regionInfoShow: false
    }

  },
  methods: {
    go: page.go,
    first: page.first,
    end: page.end,
    prev: page.prev,
    next: page.next,
    showpage: page.showpage,
    paging (e) {
      this.page = e;
      this.init();
    },
    init: function () {
      this.$axios.post('admin/agentCancel/adoptList', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.data.list)
            this.list = res.data.data.list;

          else layer.msg(res.data.msg);
          this.showpage(res.data.data);
          this.pageCount = res.data.data.rows;
        })
        .catch(err => { })
    },
    reasonf (id) {
      this.$axios.post('admin/AgentCancel/canReason', { token: this.token, id: id })
        .then(res => {

          layer.open({
            type: 0,
            area: ['30%', '30%'],
            title: ['取消合作理由', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            content: res.data.data
          })
        })
    },
    rationf (row, aid) {
      this.$axios.post('admin/AgentCancel/handOver', { token: this.token, id: row.id, aid: aid })
        .then(res => {

          this.materielData = res.data.data.list;
          this.region = res.data.data.region

          if (res.data.data)
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
    handleRegion (item) {
      this.regionInfoShow = true
      this.$axios.post('admin/AgentCancel/regionDetail', { area: item, token: this.token })
        .then((res) => {
          this.arealist = res.data.data

        })
    }
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
            if (arr[i].son) {
              if (arr[i].name == '取消合作') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '通过列表' && arr[i].name == '取消合作') {
                  this.thCurId = arr[i].son[j].id;
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
  created () {
    this.init();
  },
  watch: {
    index: function () {
      this.init();
    }
  }
}
</script>
<style scoped>
.regionDetail >>> .el-dialog__title {
  font-size: 22px;
}
.regionDetail >>> .el-dialog__body {
  padding: 0px 25px 30px;
  border-top: solid 2px #eee;
}
</style>
