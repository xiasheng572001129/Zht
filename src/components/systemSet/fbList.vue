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
        <div class="quote-ele"><i></i>油品管理
          <a href="javascript:;"
             @click="addoil">设置油品信息</a>
        </div>
        <table>
          <thead>
            <tr>
              <th>油品名称</th>
              <th>图片</th>
              <th>详情</th>
              <th>修改</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td class="sno">{{item.name}}</td>
              <td class="pic">
                <img :src="item.cover"
                     class="poimg">
              </td>
              <td>
                <a href="javascript:;"
                   @click="detail(item.id)">查看</a>
              </td>
              <td class="edit">
                <a href="javascript:;"
                   @click="reset(item.id)">修改</a>
              </td>
              <td class='del'>
                <a href="javascript:;"
                   @click="del(item.id)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-nav">
          <paging :page-count="pageCount"
                  v-show="list&&list.length>0"
                  :page="page"
                  @index="paging"></paging>
          <!--分页的组件-->
        </div>
      </div>
    </div>
    <div class="laybox"
         ref="laybox"
         style="display:none">
      <ul>
        <li>油品名称：{{obj.name}}</li>
        <li>油品图片：<img :src="obj.cover"
               class="poimg"></li>
        <li>油品价格：{{obj.price}}</li>
        <li>油品简介：<br>{{obj.about}}</li>
      </ul>
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
      obj: {},
      reason: '',
      reg_reason: '',
      aid: '',
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

    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/SystemSetup/oillist', {
        token: this.token,
        page: this.page
      })
        .then(res => {
          this.list = res.data.data.list;

          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    del: function (id) {
      this.$axios.post('admin/SystemSetup/delOil', {
        token: this.token,
        id: id
      })
        .then(res => {

          layer.msg(res.data.msg);
          if (res.data.code == 1)
            this.init();
        }).catch(err => console.log(err))
    },
    detail: function (id) {
      var that = this
      this.$axios.post('admin/SystemSetup/detail', {
        token: this.token,
        id: id
      })
        .then(res => {

          this.obj = res.data.data;
          if (this.obj.about)
            this.obj.about = this.obj.about.replace(/<[^>]+>/g, "");
          layer.open({
            type: 1,
            area: ['50%', '60%'],
            title: ['油品信息详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
            shadeClose: true,
            shade: 0.8,
            content: $('.laybox')
          })
        }).catch(err => console.log(err))
    },
    reset: function (id) {
      var that = this;
      layer.open({
        type: 2,
        area: ['80%', '80%'],
        title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
        shadeClose: true,
        shade: 0.8,
        content: cartopiaURL + '/#/systemSet/saveoil?id=' + id,
        end: function () {
          that.$axios.post('admin/SystemSetup/oillist', {
            token: that.token,
            page: that.index
          })
            .then(res => {
              that.list = res.data.data.list;
              that.showpage(res.data.data);
            })
            .catch(err => console.log(err))
        }
      })
    },
    addoil: function () {
      var that = this;
     
      layer.open({
        type: 2,
        area: ['80%', '80%'],
        title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
        shadeClose: true,
        shade: 0.8,
        content: 'http://localhost:8082' + '/#/systemSet/inclist',

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
            if (arr[i].name == 'FB军团大队名称') {
              this.seCurId = arr[i].id;
            }
            //              if (arr[i].son) {
            //                this.threeAuthList = arr[i].son;
            //                for (var j = 0; j < arr[i].son.length; j++) {
            //                  if (arr[i].action != arr[i].son[j].action) {
            //                    arr[i].action = arr[i].son[0].action;
            //                  }
            //                }
            //              }
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
<style scoped>
.head {
  z-index: 80;
}

table tr td {
  padding: 0;
  width: 20%;
}

table th {
  background-color: #fff;
}

td {
  height: 50px;
}
.poimg {
  max-width: 150px;
  max-height: 150px;
}
.edit a {
  color: #00b4ff;
}

.del a {
  color: #ff0000;
}

img {
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

.laybox {
  padding: 40px 20px;
  font-size: 16px;
}

.laybox li {
  margin: 16px 0;
}
</style>
