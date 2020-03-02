<template>
  <div class="newscreate">
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id"
                   :to="{path:item.action,query:{id:curId}}" :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>操作日志</div>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>操作名称</th>
          <th>操作时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <td>{{item.message}}</td>
          <td>{{item.credit_time}}</td>
          <td>
            <a href="javscript:;" @click="del(item.id)">删除</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="page-nav">
      <el-pagination
        background
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        @size-change="size-change"
        layout="prev, pager, next,jumper,total,->" :page-count="totalPage">
      </el-pagination>
    </div>
    <el-dialog
      title="详情信息"
      :visible.sync="dialogVisible"
      width="40%">
      <span>这是一段信息</span>
		  <span slot="footer" class="dialog-footer">
		    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        curId: 0,
        setCurId: [],
        authList: [],
        dialogVisible: false,
        totalPage: 1,
        currentPage: 1,
        numlist: [],//分页数据
        messagelist: [],
        token: window.sessionStorage.getItem('bbytoken'),
        seCurId: "",
        list: []
      }
    },
    mounted(){
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: this.curId
      }).then(res => {
//         
        if (res.data.code == 1
        ) {
          var arr = res.data.data;
          

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == '操作日志') {
              this.seCurId = arr[i].id;
            }
          }
          this.authList = arr;
        }
        else {
          this.$alert(res.data.msg, '提示', {type: 'error'});
        }
      }).catch(err => {
        alert(err);
      })
    },
    created(){
      this.init();
    },
    methods: {
      // 分页查询
      prev(e){
        this.currentPage = e;
        
        this.init();
      },
      next(e){
        this.currentPage = e;
        this.init();
      },
      current(e){
        this.currentPage = e;
        this.init();
      },
      showdetail(){
        // 
        this.dialogVisible = true;
        this.$axios.post('admin/Feedback/agentList', {
          token: this.token,
          page: this.currentPage
        }).then(res => {
          
        }).catch(err => {
          
        })
      },
      init(){
        this.$axios.post("Admin/Logs/LogList", {
          token: this.token,
          page: this.currentPage
        }).then(res => {
          
          this.list = res.data.data.list
          if (res.data.data.rows == 'unidefined') {
            this.totalPage = 1;
          } else {
            this.totalPage = res.data.data.rows;
          }
          this.numlist = res.data.data.list;
          
        }).catch(err => {
          
        })
      },
      del(id){
        var that = this
        this.$alert('确定删除吗？', '提示', {
          type: 'warning',
          callback: e => {
            if (e == 'confirm') {
              this.$axios.post('Admin/Logs/LogDet', {token: this.token, id: id})
                .then(res => {
                  
                  var that = this;
                  if (res.data.code == 1) {
                    layer.msg(res.data.msg, {time: 1000}, function () {
                      that.init()
                    });
                  } else {
                    this.$alert(res.data.msg, '提示', {type: 'error'});
                  }
                }).catch(err => console.log(err)
              )
            }
          }
        })

      }
    }
  }
</script>
<style>

</style>
