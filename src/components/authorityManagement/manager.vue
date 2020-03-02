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
        <div class="quote-ele clear"><i></i>管理员
          <el-button @click="addManager"
                     class="f-r"
                     type="primary">添加管理员</el-button>
        </div>
      </div>
      <table>
        <tr>
          <th>用户名</th>
          <th>所属分组</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in list">
          <td>{{item.uname}}</td>
          <td>{{item.role}}</td>
          <td>
            <el-button @click="change(item.uid)"
                       type="text">修改</el-button>
            <el-button @click="dlt(item.uid,item.uname)"
                       class="cr"
                       type="text">删除</el-button>
          </td>
        </tr>
      </table>
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <el-pagination background
                       @prev-click="prev"
                       @next-click="next"
                       @current-change="current"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="管理员设置"
               :visible.sync="dialogVisible"
               width="60%">
      <div>
        用户名
        <el-input v-model="uName"></el-input>
      </div>
      <div>
        手机号
        <el-input type="number"
                  v-model="uPhone"></el-input>
      </div>
      <div>
        选择管理组
        <br><br>
        <el-checkbox-group @change="selectGroup"
                           v-model="checked">
          <el-checkbox v-for="item in groupList"
                       :key="item.rid"
                       :label="item.rid">{{item.rname}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeManage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加管理员"
               :visible.sync="dialogVisible2"
               width="60%">
      <div>
        用户名
        <el-input v-model="uName1"></el-input>
      </div>
      <div>
        手机号
        <el-input type="number"
                  v-model="uPhone1"></el-input>
      </div>
      <div>
        选择管理组
        <br><br>
        <el-checkbox-group @change="selectGroup"
                           v-model="checked">
          <el-checkbox v-for="item in groupList"
                       :key="item.rid"
                       :label="item.rid">{{item.rname}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="sendAddManager">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      page: 1,
      pageCount: 1,
      dialogVisible: false,
      dialogVisible2: false,
      uName: '',
      uName1: '',
      uPhone: '',
      uPhone1: '',
      groupList: [],
      checked: [],
      uid: 0,
      authList: [],
      curId: 0,
      seCurId: 0,
    }
  },
  methods: {
    //分页事件
    prev (e) {
      this.page = e;
      this.getList();
    },
    next (e) {
      this.page = e;
      this.getList();
    },
    current (e) {
      this.page = e;
      this.getList();
    },
    //请求列表数据
    getList () {
      this.$axios.post('admin/Manage/adminList', {
        token: window.sessionStorage.getItem('bbytoken'),
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows;
          }
        })
        .catch(err => {
          alert(err);
        })
    },
    //删除管理员
    dlt: function (id, name) {
      this.$confirm('要删除' + name + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('admin/Manage/delAdmin', {
          token: window.sessionStorage.getItem('bbytoken'),
          uid: id
        })
          .then(res => {

            if (res.data.code == 1) {
              this.$alert(res.data.msg, '提示', { type: 'success' });
              this.getList();
            } else {
              this.$alert(res.data.msg, '提示', { type: 'error' });
            }
          })
          .catch(err => {
            alert(err)
          })
      }).catch(() => {

      });
    },
    //修改管理员
    //点击修改管理员
    change (id) {
      this.dialogVisible = true;
      this.uid = id;

      //获取默认数据
      this.$axios.post('admin/Manage/modifyIndex', {
        token: window.sessionStorage.getItem('bbytoken'),
        uid: id
      })
        .then(res => {

          if (res.data.code == 1) {
            this.uName = res.data.data.uname;
            this.uPhone = res.data.data.phone;
            this.checked = res.data.data.role_id;
            //              this.uid=res.data.data.uid;
          }
        })
        .catch(err => {
          alert(err)
        });
      //获取管理组列表
      this.$axios.post('admin/Manage/addIndex', {
        token: window.sessionStorage.getItem('bbytoken')
      })
        .then(res => {

          if (res.data.code == 1) {
            this.groupList = res.data.data;
          } else {
            this.$alert(e.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err);
        })
    },
    //点击确定保存修改的内容
    changeManage () {
      if (!this.uName) {
        this.$alert('管理员用户名不能为空！', '提示', { type: 'warning' });
      }
      if (!this.uPhone || !(/^1[345789]\d{9}$/.test(this.uPhone))) {
        this.$alert('管理员电话不能为空或格式错误！', '提示', { type: 'warning' });
      }
      if (this.checked.length == 0) {
        this.$alert('至少选择一个管理组！', '提示', { type: 'warning' });
      }
      var ck = this.checked, GL = this.groupList;

      var arr = [];

      for (var i = 0; i < ck.length; i++) {
        for (var k = 0; k < GL.length; k++) {
          if (ck[i] == GL[k].rid) {
            arr.push(GL[k].rname);
          }
        }
      }
      var str = arr.join(',');

      this.$axios.post('admin/Manage/adminModify', {
        token: window.sessionStorage.getItem('bbytoken'),
        uid: this.uid,
        uname: this.uName,
        phone: this.uPhone,
        role_id: this.checked,
        role: str
      })
        .then(res => {

          if (res.data.code == 1) {
            this.dialogVisible = false;
            this.$alert(res.data.msg, '提示', {
              type: 'success',
              callback: () => {
                this.$router.go(0);
              }
            });
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err)
        });
    },
    //点击添加管理员
    addManager () {
      this.dialogVisible2 = true;
      this.uName1 = '';
      this.uPhone1 = '';
      this.checked = [];
      this.$axios.post('admin/Manage/addIndex', {
        token: window.sessionStorage.getItem('bbytoken')
      })
        .then(res => {

          if (res.data.code == 1) {
            this.groupList = res.data.data;
          } else {
            this.$alert(e.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err)
        });
    },
    //添加管理员操作
    sendAddManager () {
      if (!this.uName1) {
        this.$alert('请输入管理员用户名', '提示', { type: 'warning' });
        return;
      }
      if (!this.uPhone1) {
        this.$alert('请输入管理员电话', '提示', { type: 'warning' });
        return;
      }
      if (this.checked.length == 0) {
        this.$alert('至少选择一个管理组', '提示', { type: 'warning' });
        return;
      }
      var ck = this.checked, GL = this.groupList;

      var arr = [];

      for (var i = 0; i < ck.length; i++) {
        for (var k = 0; k < GL.length; k++) {
          if (ck[i] == GL[k].rid) {
            arr.push(GL[k].rname);
          }
        }
      }
      var str = arr.join(',');
      this.$axios.post('admin/Manage/adminAdd', {
        token: window.sessionStorage.getItem('bbytoken'),
        uname: this.uName1,
        phone: this.uPhone1,
        role_id: ck,
        role: str
      })
        .then(res => {

          if (res.data.code == 1) {
            this.dialogVisible2 = false;
            this.getList();
            this.$alert(res.data.msg, '提示', { type: 'success' });
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err)
        });

    },
    selectGroup (e) {
      //        
      //        
    }

  },
  mounted () {
    this.getList();
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
            if (arr[i].name == '管理员') {
              this.seCurId = arr[i].id;
            }
            if (arr[i].son) {
              this.threeAuthList = arr[i].son;
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
<style scoped>
table tr th,
table tr td {
  width: 10%;
}

.cr {
  color: #fc0404;
}

.el-dialog .el-dialog__body > div {
  padding-left: 60px;
  margin-bottom: 20px;
}

.el-dialog .el-input {
  max-width: 300px;
}

.quote-ele .f-r {
  margin-right: 40px;
  margin-top: 20px;
}
</style>
