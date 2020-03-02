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
        <div class="quote-ele"><i></i>市级配送中心-取消合作</div>
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
            <th>市级配送中心</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>申请时间</th>
            <th>取消合作理由</th>
            <th>驳回理由</th>
            <th>驳回时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.create_time}}</td>
            <!--<td><a href="javascript:;" @click="reasonf(item.id)">查看</a></td>
                    <td><a href="javascript:;" @click="rationf(item.aid)">查看</a></td>-->
            <td>{{item.reason}}</td>
            <td>{{item.rej_reason}}</td>
            <td>{{item.audit_time|datetime}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div :class="list.length<=7?'page-nav':'page_center'"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                v-show="list.length>0"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <div class="laybox1"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>物料名称</th>
            <th>市级配送中心库存</th>
            <th>市级配送中心授信库</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in numlist">
            <td>{{item.name}}</td>
            <td>{{item.materiel_stock}}</td>
            <td>{{item.open_stock}}</td>
          </tr>
        </tbody>
      </table>
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
      pageCount: 1,
      index: 1, //点击的当前页，
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
      thCurId: 0
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
      this.init()
    },
    init: function () {
      this.$axios.post('admin/agentCancel/rejectList', { token: this.token, page: this.page })
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
      this.$axios.post('admin/AgentCancel/rejectList', { token: this.token, id: id })
        .then(res => {

          layer.open({
            type: 0,
            area: ['30%', '30%'],
            title: ['市级配送中心取消合作理由', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            content: res.data.data
          })
        })
    },
    reject (id) {
      this.$axios.post('admin/AgentCancel/canReason', { token: this.token, id: id })
        .then(res => {

          layer.open({
            type: 0,
            area: ['40%', '30%'],
            title: ['驳回理由', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            closeBtn: 1,  //怎么显示 ×
            content: res.data.data
          })
        }).catch(err => { })
    },
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
                if (arr[i].son[j].name == '驳回列表' && arr[i].name == '取消合作') {
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
