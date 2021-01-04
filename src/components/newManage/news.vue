<template>
  <div>
    <ctbHead>
      <router-link active-class="activeClass"
                   :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>消息管理</div>
      </div>
      <div class="subnav">
        <button class="left">消息</button>
        <router-link class="create right"
                     :to="{name:'newsManage_create'}">新建</router-link>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>消息标题</th>
            <th>发布时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key='index'>
            <td>{{item.title}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="detailf(item.id)">详情</a>
              <a href="javascript:;"
                 @click="modify(item.id)">修改</a>
              <a href="javascript:;"
                 @click="delf(item.id)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page-nav">
        <paging :page-count="pageCount"
                v-show="list&&list.length>0"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <el-dialog title="详情"
               class="details"
               :visible.sync="detailsDialogVisible"
               width="50%"
               center>
      <div class="box">
        <p>标题：{{obj.title}}</p>
        <p>
          消息内容：
        <div class="content"
             v-html="obj.content"></div>
        </p>
        <p>
          发送对象：
          <span v-for="(item,index) in obj.sendto"
                :key="index">{{item}} </span>
        </p>
        <p>创建者：{{obj.create_person}}</p>
        <p>创建时间：{{obj.create_time}}</p>
      </div>
    </el-dialog>
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
      authList: [],
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1,//当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      seCurId: "",
      curId: "",
      detailsDialogVisible: false //详情弹框
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
      this.$axios.post('admin/messageManage/messageList', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.code == 0)
            layer.msg(res.data.msg)
          else
            this.list = res.data.data.list;
          this.showpage(res.data.data);
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    detailf (id) {
      this.detailsDialogVisible = true
      this.$axios.post('admin/messageManage/msg', { token: this.token, id: id })
        .then(res => {

          if (res.data.code == 1) {
            this.obj = res.data.data;
            // 
            for (var i = 0; i < this.obj.sendto.length; i++) {
              if (this.obj.sendto[i] == 1)
                this.obj.sendto[i] = "乘用车用户";
              if (this.obj.sendto[i] == 2)
                this.obj.sendto[i] = "乘用修理厂";
              if (this.obj.sendto[i] == 3)
                this.obj.sendto[i] = "乘用代理商";
              if (this.obj.sendto[i] == 4)
                this.obj.sendto[i] = "乘用车主";
              if (this.obj.sendto[i] == 5)
                this.obj.sendto[i] = "商用修理厂";
              if (this.obj.sendto[i] == 6)
                this.obj.sendto[i] = "商用代理商";
              if (this.obj.sendto[i] == 7)
                this.obj.sendto[i] = "技师";
              if (this.obj.sendto[i] == 9)
                this.obj.sendto[i] = "约驾出行";
              if (this.obj.sendto[i] == 13)
                this.obj.sendto[i] = "供应商";
              if (this.obj.sendto[i] == 12)
                this.obj.sendto[i] = "运营总监";
            }
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }

        })
        .catch(err => { })

    },
    /** 修改 **/
    modify (id) {
      this.$router.push({ path: '/newsManage/createNews', query: { id: id } })

    },
    delf (id) {
      this.$alert('确定删除吗？', '提示', {
        type: 'warning',
        callback: e => {
          if (e == 'confirm') {
            this.$axios.post('admin/messageManage/delMessage', { token: this.token, id: id })
              .then(res => {

                if (res.data.code == 1) {
                  this.$router.go(0);
                } else {
                  this.$alert(res.data.msg, '提示', { type: 'error' });
                }
              }).catch(err => console.log(err))
          }
        }
      })
    }
  },
  mounted () {
    var id = this.$route.query.id;
    this.curId = id;

    this.$axios.post("admin/Auth/erAuth", { token: window.sessionStorage.getItem('bbytoken'), id: id }).then(res => {
      if (res.data.code == 1) {
        var arr = res.data.data;

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].name == "消息管理") {
            this.seCurId = arr[i].id;
            if (arr[i].son) {
              this.threeAuthList = arr[i].son;

            }
          }
        }
        this.authList = arr

      }
    })
  }
}
</script>
<style scoped='scoped'>
.subnav {
  height: 40px;
  border-bottom: 2px solid #00b4ff;
  padding: 0 120px;
}

.subnav button,
.subnav a {
  height: 40px;
  background-color: #00b4ff;
  color: white;
  width: 70px;
  border-radius: 5px;
}

.subnav a {
  float: right;
  text-align: center;
  line-height: 40px;
}
.activeClass {
  color: red;
}
.details {
  overflow: auto;
}
</style>
<style>
.content {
  margin: 20px 0;
  padding: 20px 0 50px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.content > p > img {
  display: block;
}
.details .el-dialog__header {
  background: rgb(152, 209, 249) !important;
  padding-top: 10px;
}
.details .el-dialog__body {
  max-height: 600px;
  overflow: auto;
}
.details .el-dialog__title {
  color: #fff;
}
.details .el-dialog__headerbtn {
  top: 13px;
}
</style>
