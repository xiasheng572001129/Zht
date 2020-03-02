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
        <div class="quote-ele"><i></i>文章管理</div>
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
            <th>标题</th>
            <th>作者</th>
            <th>类型</th>
            <th>发布时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>
              <a href="javascript:;"
                 @click="artInfo(item)">{{item.title}}</a>
            </td>
            <td>{{item.name?item.name:item.nick_name}}</td>
            <td>{{arttype[item.mold]}}</td>
            <td>{{item.create_time|datetime}}</td>
            <td>
              <a href="javascript:;"
                 @click="artpass(item.aid)">通过</a>
              <a href="javascript:;"
                 @click="artpush(item)">通过并推荐</a>
              <a class="bh"
                 href="javascript:;"
                 @click="artback(item.aid)">驳回</a>
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
    <div class="laybox"
         style="display:none">
      <div class="artinfo">
        <div class="arttile">{{obj.title}}</div>
        <div class="artimg">
          <img :src="obj.thumb">
        </div>
        <div class="artcon">{{obj.content}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
export default {
  data () {
    return {
      arttype: ['未知', '乘用车', '商用车'],
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
      this.$axios.post('admin/WorkerArticle/unCheckList', {
        token: this.token,
        page: this.page
      })
        .then(res => {
          //
          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.showpage(res.data.data);
            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
          }
        }).catch(err => { })
    },
    artInfo (obj) {
      this.obj = obj;
      layer.open({
        type: 1,
        area: ['60%', '70%'],
        title: ['文章详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
        shadeClose: true,
        shade: 0.8,
        content: $('.laybox')
      })
    },
    artpush (obj) {
      var that = this;
      layer.prompt({
        title: '请输入奖励金额（整数）',
        formType: 3
      }, function (intext, index) {
        if (intext == '' || intext != parseInt(intext)) {
          layer.msg('请输入整数');
        } else {
          that.$axios.post('admin/WorkerArticle/recommendArticle', {
            token: that.token,
            aid: obj.aid,
            uid: obj.uid,
            mold: obj.mold,
            money: intext
          })
            .then(res => {
              layer.msg(res.data.msg);
              if (res.data.code == 1) {
                layer.close(index);
                that.init();
              }
            }).catch(err => console.log(err))
        }
      });
    },
    artpass (aid) {
      var that = this
      layer.confirm('您将审核通过此文章', function () {
        that.$axios.post('admin/WorkerArticle/passArticle', {
          token: that.token,
          aid: aid
        })
          .then(res => {
            layer.msg(res.data.msg);
            if (res.data.code == 1) {
              that.init();
            }
          }).catch(err => console.log(err))
      });
    },
    artback (aid) {
      var that = this
      layer.confirm('您将驳回此文章', function () {
        that.$axios.post('admin/WorkerArticle/rejectArticle', {
          token: that.token,
          aid: aid
        })
          .then(res => {
            layer.msg(res.data.msg);
            if (res.data.code == 1) {
              that.init();
            }
          }).catch(err => console.log(err))
      });
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
              if (arr[i].name == '文章管理') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '未审核列表' && arr[i].name == '文章管理') {
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
}
</script>
<style scoped>
.artinfo {
  min-width: 400px;
  width: 85%;
  margin: 0 auto;
}

.bh {
  color: #f00;
}

.arttile {
  text-align: center;
  font-size: 24px;
  margin: 30px 0;
}

.artinfo img {
  display: block;
  width: 100%;
}

.artcon {
  font-size: 18px;
  margin: 30px 0;
}
</style>