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
        <div class="quote-ele"><i></i>车主推荐奖励</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>车主姓名</th>
            <th>车主电话</th>
            <th>购卡人</th>
            <th>购卡金额</th>
            <th>获取奖励</th>
            <th>购卡时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td>{{item.introducer}}</td>
            <td>{{item.introducer_phone}}</td>
            <td>{{item.buyer || '--'}}</td>
            <td>{{item.money || '无'}}</td>
            <td>{{item.reward}}</td>
            <td>{{item.create_time}}</td>
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
import page from '../common.js';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1,//当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      seCurId: 0,
    }
  },
  created () {
    this.init();
  },
  watch: {
    index () {
      this.init();
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
    init () {
      this.$axios.post('admin/FundExpend/userShareList', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.code == 0)
            layer.msg(res.data.msg)
          else
            this.list = res.data.data.list;
          this.showpage(res.data.data);
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
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
            if (arr[i].name == '车主推荐奖励') {
              this.seCurId = arr[i].id;
            }
           
            if (arr[i].son) {
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
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
  }
}
</script>
