<template>
  <div class="newscreate">
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
        <div class="quote-ele"><i></i>运营商-反馈列表</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>公司名称</th>
            <th>反馈标题</th>
            <th>反馈时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in numlist"
              :key="item.id">
            <td>{{item.company}}</td>
            <td>{{item.title}}</td>
            <td>{{item.create_time}}</td>
            <td v-if="item.print_status==1">已读</td>
            <td v-else
                class="red">未读</td>
            <td class="btn_two">
              <el-button type="text"
                         @click="showdetail(item.id,index)">查看</el-button>
              <el-button type="text"
                         @click="delfeed(item.id,index)">删除</el-button>

            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <div class="page-nav">
      <el-pagination background
                     @prev-click="prev"
                     @next-click="next"
                     @current-change="current"
                     @size-change="size-change"
                     layout="prev, pager, next,jumper,total,->"
                     :page-count="totalPage">
      </el-pagination>
    </div>

    <!-- 查看详情 -->
    <el-dialog title="详情"
               :visible.sync="dialogVisible"
               width="50%">
      <ul class="ul_detail">
        <li>公司名称：{{obj.company}}</li>
        <li>联系方式：{{obj.phone}}</li>
        <li>反馈标题：{{obj.title}} </span></li>
        <li>反馈内容：{{obj.content}}</li>
        <li>地址：{{obj.address}}</li>
        <li>反馈时间：{{obj.create_time}}</li>
      </ul>
      <span slot="footer"
            class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>
<script type="text/ecmascript-6">
import page from '../common.js';
export default {
  data () {
    return {
      curId: 0,
      seCurId: 0,
      authList: [],//运营商中所有列表
      numlist: [],//分页数据
      token: window.sessionStorage.getItem('bbytoken'),
      obj: {},
      isshowdetail: false,
      dialogVisible: false,
      firsturl: "",
      totalPage: 1,
      currentPage: 1
    }
  },

  mounted () {
    var id = this.$route.query.id;
    this.curId = id;
    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: this.curId
    }).then(res => {

      if (res.data.code == 1) {
        var arr = res.data.data;

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].name == '反馈列表') {
            this.seCurId = arr[i].id;
          }
        }
        this.authList = arr;
      } else {
        this.$alert(res.data.msg, '提示', { type: 'error' });
      }
    }).catch(err => {
      alert(err);
    })
  },
  created () {
    this.init();
  },
  methods: {
    // 分页查询
    prev (e) {
      this.currentPage = e;

      this.init();
    },
    next (e) {
      this.currentPage = e;
      this.init();
    },
    current (e) {
      this.currentPage = e;
      this.init();
    },
    init () {
      this.$axios.post("admin/Feedback/agentList", {
        token: this.token,
        page: this.currentPage
      }).then(res => {

        if (res.data.data.rows == undefined) {
          this.totalPage = 1;
        } else {
          this.totalPage = res.data.data.rows;
        }
        this.numlist = res.data.data.list;

      }).catch(err => {
        throw (err)
      })
    },
    delfeed (id, delindex) {

      this.$alert('确定删除吗？', '提示', {
        type: 'warning',
        callback: e => {


          if (e == 'confirm') {
            // 删除的请求
            var resdata = {
              token: this.token,
              id: id
            };

            this.$axios.post('admin/Feedback/delFeedback', resdata).then(res => {

              if (res.data.code == 1) {

                layer.msg("删除成功");
                if (this.totalPage == this.currentPage) {
                  // 将数组中的元素移除
                  this.numlist.splice(delindex, 1);
                  if (this.current != 1 && this.numlist.length == 0) {
                    this.currentPage = this.currentPage--;
                    this.init();
                  }
                } else {
                  this.init();
                }
                // 将数组中的元素移除
                // this.numlist.splice(delindex,1);
              } else {
                // layer.msg("删除失败");
                this.$alert('删除失败', '提示', {
                  type: 'error'
                })
              }
              ;
            }).catch(err => {
              throw (err)
            })
          }
          else if (e == 'cancel') {

          }
        }
      })
    },
    showdetail (id, index) {

      this.$axios.post('admin/Feedback/feedbackDetail', {
        token: this.token,
        id: id
      }).then(res => {
        this.obj = res.data.data;
        this.dialogVisible = true;
        this.numlist[index].print_status = 1;
      }).catch(err => {
        throw (err)
      })
    },
  }
}
</script>
<style scoped>
.red {
  color: red;
}

.btn {
  color: #04bbfc;
  padding-left: 10px;
}

ul.laybox {
}

/*详情的弹框样式*/
ul.laybox li {
  margin: 10px 20px;
}

.el-message {
  top: 300px;
  z-index: 10000000;
}

.ul_detail li {
  margin-top: 10px;
}
</style>
