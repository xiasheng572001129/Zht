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
        <div class="quote-ele"><i></i>UBI-资金提现</div>
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
            <th>订单号</th>
            <th>用户姓名</th>
            <th>用户电话</th>

            <th>提现金额</th>
            <th>申请时间</th>
            <th>驳回理由</th>
            <th>驳回时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>{{item.odd_number}}</td>
            <td class="t-l">{{item.name}}</td>
            <td>{{item.phone}}</td>

            <td>{{item.money}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="reject(item.reason)">查看</a>
            </td>
            <td v-if="item.audit_time!=''">{{item.audit_time}}</td>
            <td v-else>--</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数,
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0
    }
  },
  methods: {

    paging (e) {
      this.page = e;
      this.init()
    },
    init: function () {
      this.$axios.post('admin/UbiForward/reject', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;

            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
          }
        })
        .catch(err => { })
    },
    reject (reason) {

      if (reason == '') layer.msg('暂未驳回理由');
      else
        layer.open({
          type: 0,
          area: ['30%', '30%'],
          title: ['驳回理由', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;'],
          shadeClose: true,
          shade: 0.8,
          closeBtn: 1, //怎么显示 ×
          content: reason
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
              if (arr[i].name == 'UBI提现') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '驳回列表' && arr[i].name == 'UBI提现') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
            }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
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
