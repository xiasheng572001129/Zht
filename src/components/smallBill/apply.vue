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
        <div class="quote-ele"><i></i>发票管理</div>
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
            <th>车主姓名</th>
            <th>车主电话</th>
            <th>购卡金额</th>
            <th>票务费</th>
            <th>申请时间</th>
            <th>详情</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>{{item.contacter}}</td>
            <td>{{item.phone}}</td>
            <td>
              <a href="javascript:;"
                 @click="cardFee(item.id)">{{item.total}}</a>
            </td>
            <td>{{item.fee}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="detailf(item.id)">查看</a>
            </td>
            <td>
              <a href="javascript:;"
                 @click="send(item.id)">送出</a>
            </td>
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
    <ul class="laybox"
        style="display:none">
      <li>卡号: {{obj.card_number}}</li>
      <li>维修厂名: {{obj.s_company}}</li>
      <li>运营商名: {{obj.a_company}}</li>
    </ul>
    <ul class="laybox1"
        style="display:none">
      <li>用户名称: {{obj.contacter}}</li>
      <li>用户电话：{{obj.phone}}</li>
      <li>公司名称: {{obj.company}}</li>
      <li>送达地址: {{obj.address}}</li>
      <li>发票税号: {{obj.tax_number}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      obj: {}, //分页数据
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
      seCurId: 0,
      thCurId: 0
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
      this.$axios.post('admin/SmallInvoice/applyList', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.showpage(res.data.data);
            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
          }
        }).catch(err => { })
    },
    cardFee (id) {
      this.$axios.post('admin/SmallInvoice/cardDetails', {
        id: id,
        token: this.token
      })
        .then(res => {

          this.obj = res.data.data;
          layer.open({
            type: 1,
            area: ['30%', '40%'],
            title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            content: $('.laybox')
          })
        }).catch(err => { })
    },
    detailf (id) {
      this.$axios.post('admin/SmallInvoice/applyDetails', {
        id: id,
        token: this.token
      })
        .then(res => {

          this.obj = res.data.data;
          layer.open({
            type: 1,
            area: ['30%', '40%'],
            title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
            shadeClose: true,
            shade: 0.8,
            closeBtn: 1, //怎么显示 ×
            content: $('.laybox1')
          })
        }).catch(err => { })
    },
    send (id) {
      this.$axios.post('admin/SmallInvoice/achieve', {
        token: this.token,
        id: id
      })
        .then(res => {
          if(res.data.code==1){
              this.init()
              this.$message({message:res.data.msg,type:"success"})
          } else{
              this.$message.error(res.data.msg)
          }
         
        }).catch(err => console.log(err))
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
            if (arr[i].name == '发票管理') {
              this.seCurId = arr[i].id;
              if (arr[i].son) {
                this.threeAuthList = arr[i].son;
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '申请列表' && arr[i].name == '发票管理') {
                    this.thCurId = arr[i].son[j].id;
                  }
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
}
</script>
<style scoped>
.laybox li,
.laybox1 li {
  margin: 20px 30px;
  font-size: 16px;
}
</style>
