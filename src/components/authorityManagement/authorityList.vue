<template>
  <div>
    <ctbHead>
      <!--<router-link :to="{name:'manager'}">管理员</router-link>-->
      <!--<router-link :to="{name:'manageGroup'}">管理组</router-link>-->
      <!--<router-link :to="{name:'authorityList'}" class="cur">权限列表</router-link>-->
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
        <div class="quote-ele clear"><i></i>权限列表
          <el-button @click="addAuth"
                     class="f-r"
                     type="primary">添加权限</el-button>
        </div>
        <div style="padding:50px 0 0 100px">
          <el-tree default-expand-all
                   :data="list"
                   :props="defaultProps"
                   @node-contextmenu="handleNodeClick"></el-tree>
        </div>
      </div>
    </div>
    <el-dialog title="选择添加权限的等级"
               :visible.sync="dialogVisible"
               width="40%">
      <el-select @change="selectLev"
                 v-model="label"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confrimLev">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加权限"
               :visible.sync="dialogVisible1"
               width="40%"
               open="selectLoading">
      <div v-if="leValue==3||leValue==2">
        一级权限列表
        <el-select @change="selectLev1"
                   v-model="label1"
                   placeholder="请选择">
          <el-option v-for="item in authList1"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div v-if="leValue==3"
           style="margin-top: 20px;">
        二级权限列表
        <el-select @change="selectLev2"
                   v-model="label2"
                   placeholder="请选择">
          <el-option v-for="item in authList2"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="getAuthName"
                  placeholder="请输入权限名称"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="getAuthPath"
                  @keyup.enter="send"
                  placeholder="请输入权限路径"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-input v-model="getBackstagePath"
                  placeholder="请输入后台权限路径"></el-input>
      </div>
      <div style="margin-top: 20px;">
        <el-radio v-model="radio"
                  label="1">显示</el-radio>
        <el-radio v-model="radio"
                  label="0">不显示</el-radio>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="send">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改权限"
               :visible.sync="dialogVisible2"
               center
               width="40%">
      <div style="line-height: 40px;">权限名称</div>
      <el-input v-model="newAuthName"
                placeholder="请输入新的名称"></el-input>
      <div style="line-height: 40px;">权限路径</div>
      <el-input v-model="newAuthPath"
                @keyup.enter="changeAuth()"
                placeholder="请输入新的路径"></el-input>
      <div style="line-height: 40px;">后台权限路径</div>
      <el-input v-model="afterAuthPath"
                @keyup.enter="changeAuth()"
                placeholder="请输入后台权限路径"></el-input>
      <div style="line-height: 40px;">
        <el-radio v-model="Radio"
                  label="1">显示</el-radio>
        <el-radio v-model="Radio"
                  label="2">不显示</el-radio>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      radio: "1",
      Radio: "1",
      page: 1,
      pageCount: 1,
      list: [],
      defaultProps: {
        children: 'son',
        label: 'name'
      },
      afterAuthPath: "",
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      options: [
        {
          value: '1',
          label: '一级权限'
        },
        {
          value: '2',
          label: '二级权限'
        },
        {
          value: '3',
          label: '三级权限'
        }
      ],
      label: '一级权限',
      leValue: '1',   //用户选择的几级权限
      authList1: [],  //一级权限列表
      authList2: [],   //二级权限列表
      label1: '',   //默认显示的一级权限
      label2: '',   //默认显示的二级权限
      getAuthName: '', //用户输入的权限名称
      getAuthPath: '', //用户输入的权限路径
      getBackstagePath: '',
      newAuthName: '',  //修改权限时候的权限名称
      newAuthPath: '',  //修改权限时候的权限路径
      pid: '0',  //后台那小姑娘要的值 (用户所添加的上级权限的id)
      thisAuthId: 0, //当前操作的权限ID
      authList: [],
      curId: 0,
      seCurId: 0,
    }
  },
  methods: {
    //修改权限
    changeAuth () {
      if (!this.newAuthName) {
        layer.msg('权限名称不能为空', { offset: '200px', anim: 6 });
        return;
      }
      if (!this.newAuthPath) {
        layer.msg('权限路径不能为空', { offset: '200px', anim: 6 });
        return;
      }
      

      this.$axios.post('admin/Auth/authModify', {
        token: sessionStorage.getItem('bbytoken'),
        id: this.thisAuthId,
        name: this.newAuthName,
        action: this.newAuthPath
      })
        .then(res => {

          if (res.data.code == 1) {
            layer.msg(res.data.msg);
            this.dialogVisible2 = false;
            this.getList();
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err);
        })
    },
    //添加权限
    addAuth () {
      this.dialogVisible = true;
      this.label = '一级权限';
    },
    //选择添加几级权限
    selectLev: function (e) {
      this.leValue = e;
    },
    //确定选择几级权限
    confrimLev: function () {
      this.dialogVisible = false;
      this.dialogVisible1 = true;
      this.getAuthName = '';
      this.getAuthPath = '';
      //根据用户选择的权限等级加载不同的内容
      //如果用户选择添加2级权限或者3级权限  请求一级权限列表
      if (this.leValue == 2 || this.leValue == 3) {
        this.$axios.post('admin/Auth/authSel', {
          token: window.sessionStorage.getItem('bbytoken')
        })
          .then(res => {

            if (res.data.code == 1) {
              this.authList1 = res.data.data;
              this.label1 = res.data.data[0].name;
              this.pid = res.data.data[0].id;
              if (this.leValue == 3) {
                this.$axios.post('admin/Auth/authTwo', {
                  token: window.sessionStorage.getItem('bbytoken'),
                  id: res.data.data[0].id
                })
                  .then(res => {

                    if (res.data.code == 1) {
                      this.authList2 = res.data.data;
                      this.label2 = res.data.data[0].name;
                      this.pid = res.data.data[0].id;
                    } else {
                      this.$alert(res.data.msg, '提示', { type: 'error' });
                    }
                  })
                  .catch(err => {
                    alert(err)
                  });
              }
            } else {
              this.$alert(res.data.msg, '提示', { type: 'error' });
            }
          })
          .catch(err => {
            alert(err)
          });
      }
    },
    //选择一级权限
    selectLev1: function (e) {

      this.pid = e;
      //如果用户选择三级权限  请求二级权限列表
      if (this.leValue == 3) {
        this.$axios.post('admin/Auth/authTwo', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: e
        })
          .then(res => {

            if (res.data.code == 1) {
              this.authList2 = res.data.data;
              this.label2 = res.data.data[0].name;
              this.pid = res.data.data[0].id;
            } else {
              this.$alert(res.data.msg, '提示', { type: 'error' });
            }

          })
          .catch(err => {
            alert(err)
          });
      }
    },
    //选择二级权限
    selectLev2: function (e) {

      this.pid = e;
    },
    //终于提交表单了
    send () {
      if (!this.getAuthName) {
        this.$alert('请输入权限名称', '提示', { type: 'warning' });
        return;
      }
      if (!this.getAuthPath) {
        this.$alert('请输入权限路径', '提示', { type: 'warning' });
        return;
      }
      if (!this.getBackstagePath) {
        this.$alert('请输入后台权限路径', '提示', { type: 'warning' });
        return;
      }
      this.$axios.post('admin/Auth/authAdd', {
        token: window.sessionStorage.getItem('bbytoken'),
        pid: this.pid,
        name: this.getAuthName,
        action: this.getAuthPath,
        auth_action: this.getBackstagePath,
        status: this.radio
      })
        .then(res => {

          if (res.data.code == 1) {
            this.$alert(res.data.msg, '提示', { type: 'success' });
            this.dialogVisible1 = false;
            this.getList();
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err)
        });
    },
    //删除权限和修改
    handleNodeClick (e, data) {

      this.thisAuthId = data.id;
      this.$confirm('请选择对"' + data.name + '"的操作。', '提示', {
        confirmButtonText: '修改',
        cancelButtonText: '删除',
        distinguishCancelAndClose: true,
        type: 'info',
      })
        .then((e) => {

          //请求修改权限页面
          this.$axios.post('admin/Auth/saveIndex', {
            token: window.sessionStorage.getItem('bbytoken'),
            id: data.id
          }).then(res => {

            if (res.data.code == 1) {
              //显示修改权限的弹窗
              this.dialogVisible2 = true;
              this.newAuthName = res.data.data.name;
              this.newAuthPath = res.data.data.action;
              this.afterAuthPath = res.data.data.auth_action
              this.Radio = res.data.data.status.toString()

            } else {
              this.$alert(res.data.msg, '提示', { type: 'error' });
            }
          })
            .catch(err => {
              alert(err);
            })
        }).catch((err) => {
          //删除

          if (err == 'cancel') {
            this.$alert('确定要删除"' + data.name + '"吗？', '提示', {
              confirmButtonText: '确定',
              callback: action => {

                if (action == 'confirm') {
                  this.$axios.post('admin/Auth/authDel', {
                    token: window.sessionStorage.getItem('bbytoken'),
                    id: data.id
                  })
                    .then(e => {

                      if (e.data.code == 1) {
                        layer.msg(e.data.msg);
                        this.getList();
                      } else {
                        this.$alert(e.data.msg, '提示', { type: 'warning' });
                      }
                    })
                    .catch(error => {
                      alert(error);
                    })
                }
              }
            })
          }
        })
    },
    //请求权限列表数据
    getList () {
      this.$axios.post('admin/Auth/authList', {
        token: window.sessionStorage.getItem('bbytoken'),
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data;
          }
        })
        .catch(err => {
          alert(err)
        });
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
            if (arr[i].name == '权限列表') {
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
.cr {
  color: #fc0404;
}

.quote-ele .f-r {
  margin-right: 40px;
  margin-top: 20px;
}

.auth-list {
  font-size: 18px;
  padding-left: 100px;
  padding-top: 20px;
}

.auth-list .auth-listi {
  padding-left: 20px;
}

.auth-list .auth-listi .auth-listii {
  padding-left: 20px;
}
</style>
