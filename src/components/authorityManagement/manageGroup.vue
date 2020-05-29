<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList1"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele clear"><i></i>管理组
          <el-button @click="addGroup"
                     class="f-r"
                     type="primary">添加管理组</el-button>
        </div>
      </div>
      <table>
        <tr>
          <th>管理组名称</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in list">
          <td>{{item.rname}}</td>
          <td>
            <el-button @click="changeGroup(item.rid)"
                       type="text">修改</el-button>
            <el-button @click="giveGroup(item.rid)"
                       type="text">分配权限</el-button>
            <el-button @click="dtlGroup(item.rid)"
                       class="cr"
                       type="text">删除</el-button>
          </td>
        </tr>
      </table>

      <el-dialog title="修改管理组权限"
                 :visible.sync="dialogVisible"
                 width="80%">
        <div class="auth">
          <el-tree ref="tree1"
                   show-checkbox
                   check-on-click-node
                   default-expand-all
                   node-key="id"
                   :data="authList"
                   :default-checked-keys="checkedArr"
                   :props="defaultProps"
                   @node-contextmenu="handleNodeClick"></el-tree>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="sendChange">确 定</el-button>
        </span>
      </el-dialog>
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
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      page: 1,
      pageCount: 1,
      list: [],
      dialogVisible: false,
      authList: [],
      checkedArr: [],
      defaultProps: {
        children: 'son',
        label: 'name'
      },
      groupId: 0,  //用户组ID
      authList1: [],
      curId: 0,
      seCurId: 0,
    }
  },
  methods: {
    //分页
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
    handleNodeClick (e) {

    },
    //请求列表数据
    getList () {
      this.$axios.post('admin/ManageGroup/groupList', {
        token: window.sessionStorage.getItem('bbytoken')
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows;
          }
        })
        .catch(err => {
          alert(err)
        });
    },
    //点击分配权限按钮
    giveGroup (id) {
      this.groupId = id;
      this.$axios.post('admin/ManageGroup/authGroup', {
        token: window.sessionStorage.getItem('bbytoken'),
        rid: id
      })
        .then(res => {

          if (res.data.code == 1) {
            this.dialogVisible = true;
            this.authList = res.data.data.data;
            //后台返回的所有默认选中的权限(arr),需要筛选,筛选结果为arr2
            var arr = res.data.data.check, arr1 = res.data.data.data, arr2 = [], arr3 = [], arr4 = [], arr5 = [];
            //              
            for (var i = 0; i < arr1.length; i++) {

              if (arr1[i].son) {  //如果一级权限有二级权限
                for (var j = 0; j < arr1[i].son.length; j++) {
                  if (arr1[i].son[j].son) {//如果二级权限有三级权限 把所有的三级权限放到一个arr中
                    //                      
                    for (var k = 0; k < arr1[i].son[j].son.length; k++) {
                      arr2.push(arr1[i].son[j].son[k]);
                    }
                  }
                  else {  //如果没有三级权限把二级权限放到一个arr中
                    arr4.push(arr1[i].son[j]);
                  }
                }
              } else { //没有二级权限的一级权限 把一级权限放到arr5中
                arr5.push(arr1[i]);
              }
            }
            //              
            arr2 = arr2.concat(arr4);   //arr2为所有没有三级权限的二级权限和所有的三级权限
            arr2 = arr2.concat(arr5);  //arr2为所有 没有三级权限的二级权限、所有没有二级权限的一级权限、所有三级权限

            for (var i = 0; i < arr2.length; i++) {
              for (var j = 0; j < arr.length; j++) {
                if (arr2[i].id == arr[j]) {
                  arr3.push(arr2[i].id);
                }
              }
            }
            //              
            this.checkedArr = arr3;
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err)
        });
    },
    //修改操作
    sendChange () {
      var arr = this.$refs.tree1.getCheckedKeys();
      var arr1 = this.$refs.tree1.getHalfCheckedKeys();
      arr = arr.concat(arr1);
      this.$axios.post('admin/ManageGroup/addAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        role_id: this.groupId,
        rule_id: arr
      })
        .then(res => {
          if (res.data.code == 1) {
            this.dialogVisible = false;
            this.getList()
            layer.msg(res.data.msg);
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err)
        });
    },

    //添加管理组
    addGroup () {
      this.$prompt('请输入名称', '添加用户组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '用户组名称不能为空'
      }).then(({ value }) => {
        this.$axios.post('admin/ManageGroup/addGroup', {
          token: window.sessionStorage.getItem('bbytoken'),
          rname: value
        })
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });
              this.getList();
            } else {
              this.$alert(res.data.msg, '提示', { type: 'error' });
            }
          })
          .catch(err => {
            alert(err)
          });
      }).catch(() => {

      });
    },
    //修改管理组
    changeGroup (id) {
      //获取用户组数据
      this.$axios.post('admin/ManageGroup/modifyIndex', {
        token: window.sessionStorage.getItem('bbytoken'),
        rid: id
      })
        .then(res => {
          if (res.data.code == 1) {
            //code为1的时候拿到数据，调起element API
            this.$prompt('请输入组名', '修改管理组', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\S/,
              inputValue: res.data.data,
              inputErrorMessage: '用户组名称不能为空'
            })
              .then((val) => {

                //如果用户没做修改就点击确定
                if (val.value == res.data.data) {
                  this.$alert('请进行修改...', '提示', { type: 'warning' });
                  return;
                }
                //修改用户组操作
                this.$axios.post('admin/ManageGroup/modifyPost', {
                  token: window.sessionStorage.getItem('bbytoken'),
                  rid: id,
                  rname: val.value
                })
                  .then(e => {

                    //如果code为1 操作成功 否则失败
                    if (e.data.code == 1) {
                      this.$alert(e.data.msg, '提示', {
                        type: 'success',
                        callback: () => {
                          this.getList();
                        }
                      });
                    } else {
                      this.$alert(e.data.msg, '提示', { type: 'error' });
                    }
                  })
                  .catch(error => {
                    alert(error);
                  })
              })
              .catch(() => {

              })
          } else {
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        })
        .catch(err => {
          alert(err);
        })
    },
    //删除管理组
    dtlGroup (id) {
      this.$alert('您要删除此管理组吗？', '提示', {
        type: 'warning',
        callback: (e) => {
          if (e == 'confirm') {
            this.$axios.post('admin/ManageGroup/groupDel', {
              token: window.sessionStorage.getItem('bbytoken'),
              rid: id
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
                alert(err);
              })
          }
        }
      })
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
            if (arr[i].name == '管理组') {
              this.seCurId = arr[i].id;
            }
            if (arr[i].son) {
              //                this.threeAuthList = arr[i].son;
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
              }
            }
          }
          this.authList1 = arr;
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

.auth {
  font-size: 16px;
}

.auth div {
  padding-left: 50px;
}
</style>
