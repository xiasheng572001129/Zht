<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>维修厂提现</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>维修厂</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>提现金额</th>
            <th>账户信息</th>
            <th>申请时间</th>
            <th>通过时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.money}}</td>
            <td>
              <el-popover placement="bottom"
                          title="账户信息详情"
                          width="300"
                          trigger="click">
                <el-button slot="reference"
                           type="text">详情</el-button>
                <div>
                  <div>
                    <span>开户名: </span>
                    <span>{{item.account_name}}</span>
                  </div>
                  <div>
                    <span>开户行: </span>
                    <span>{{item.bank_name}}</span>
                  </div>
                  <div>
                    <span>开户分行: </span>
                    <span>{{item.branch}}</span>
                  </div>
                  <div>
                    <span>银行卡号: </span>
                    <span>{{item.account}}</span>
                  </div>
                </div>
              </el-popover>
            </td>
            <td>{{item.create_time}}</td>
            <td>{{item.audit_time}}</td>
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
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0, //二级权限的ID
      thCurId: 0 //三级权限的ID
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
      this.$axios.post('admin/ShopForward/adoptList', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            var arr = res.data.data.list;
            this.pageCount = res.data.data.rows;
            for (var i = 0; i < arr.length; i++) {
              arr[i].audit_time = page.formatTime(arr[i].audit_time);
            }
            this.list = arr;
            this.showpage(res.data.data);
          } else {
            layer.msg(res.data.msg)
          }
        })
        .catch(err => console.log(err))
    }
  },
  created () {
    this.init();
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
              if (arr[i].name == '维修厂提现') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '通过列表' && arr[i].name == '维修厂提现') {
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
  watch: {
    index () {
      this.init();
    }
  }
}
</script>