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
        <div class="quote-ele"><i></i>轮播管理
          <router-link :to="{name:'lunbo_create'}">添加轮播</router-link>
        </div>
        <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>展示</th>
              <th>修改</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list">
              <td class="sno">
                <!-- <input type="text" v-model="item.title"> -->{{item.title}}</td>
              <td class="pic">
                <img :src="item.pic"
                     alt="">
              </td>
              <td class="edit">
                <router-link :to="{name:'lunbo_create',query:{id:item.id}}">修改</router-link>
              </td>
              <td class='del'>
                <a href="javascript:;"
                   @click="del(item.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page_center"
             v-show="pageCount&&pageCount>1">
          <paging :page-count="pageCount"
                  :page="page"
                  @index="paging"></paging>
          <!--分页的组件-->
        </div>
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
      seCurId: 0
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
      this.$axios.post('admin/SmallSlideshow/picList', {
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
    del (id) {
      this.$axios.post('admin/SmallSlideshow/picDelete', {
        token: this.token,
        id: id
      })
        .then(res => {

          layer.msg(res.data.msg);
          if (res.data.code == 1)
            this.init();
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
            if (arr[i].name == '轮播管理') {
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
table tr td {
  padding: 0;
}

table th {
  background-color: #fff;
}

td {
  height: 140px;
}

.pic {
  width: 45%;
}

.edit a {
  color: #00b4ff;
}

.del a {
  color: #ff0000;
}

img {
  width: 220px;
  height: 70px;
  vertical-align: middle;
}

.quote-ele a {
  width: 116px;
  height: 36px;
  border-radius: 18px;
  color: white;
  background-color: #00b4ff;
  font-size: 16px;
  float: right;
  margin-right: 130px;
  line-height: 35px;
  text-align: center;
  margin-top: 20px;
}

a {
  cursor: pointer;
}
</style>
