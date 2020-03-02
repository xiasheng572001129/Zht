<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="(item,index) in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
        <el-badge v-show='index==2 && $store.state.policyNumber>0'
                  :value="$store.state.policyNumber"
                  :max='99'
                  class="item">
        </el-badge>
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele">
          <i></i>
          <span>OBD设备</span>
          <el-button class='add'
                     type="primary"
                     @click="modifyDialogVisible=true,addState=1">添加</el-button>
        </div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <div>
        <table class='table serviceTab'>
          <tr>
            <th>设备ID</th>
            <th>设备号</th>
            <th>设备状态</th>
            <th>设备录入时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in list">
            <td>{{item.id}}</td>
            <td>{{item.eq_num}}</td>
            <td :class="[item.status==1 ? 'col-FA644B' : 'col-0ACD00']">{{item.status==1 ? '未绑定' : '已绑定'}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 class='col-FA644B'
                 @click="del(item.id)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <el-dialog title="添加"
                 class='modifyDialog'
                 :visible.sync="modifyDialogVisible"
                 width="30%"
                 center>
        <div>
          <el-form ref="form"
                   :model="form"
                   label-width="100px">
            <el-form-item label="类型 : ">
              <el-select v-model="form.type"
                         placeholder="请选择">
                <el-option label="UBI"
                           :value="1"></el-option>
                <el-option label="分销商"
                           :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备号 : "
                          class='equipment'>
              <el-input v-model="form.eq_num"></el-input> -- <el-input v-model="form.obds"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="addEquipment()"
                     type="primary">添加</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div :class="list.length<=7?'page-nav':'page_center'"
           v-show="list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      modifyDialogVisible: false,  //修改弹框状态
      imgDialogVisible: false, //图片弹框状态
      addState: 1,
      form: {
        token: window.sessionStorage.getItem('bbytoken'),
        eq_num: '',
        obds: '',
        type: 1
      }
    }
  },

  created () {
    this.init();
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/ObdNum/index', { token: this.token, page: this.page, type: 1 })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list
            this.pageCount = res.data.data.rows;
          } else {
            this.list = []
            layer.msg(res.data.msg, { time: 1500 })
          }

        }).catch(err => { })
    },
    addEquipment () { //添加设备号
      this.$axios.post('admin/ObdNum/addEq', this.form).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.modifyDialogVisible = false
            this.init()
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },

    del (id) { //删除设备
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('admin/ObdNum/delEq', { token: this.token, id: id }).then(res => {
          if (res.data.code == 1) {
            layer.msg(res.data.msg, { time: 1000 }, (() => {
              this.modifyDialogVisible = false
              this.init()
            }))
          } else {
            layer.msg(res.data.msg, { time: 1500 })
          }
        }).catch(err => console.log(err))
      })
    },

  },
  mounted () {
    console.log(this.list)

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
            if (arr[i].name == '邦保盒子') {
              this.seCurId = arr[i].id;
              this.threeAuthList = arr[i].son;
              console.log(arr[i])
              for (var j = 0; j < arr[i].son.length; j++) {
                console.log(arr[i].son[j].name)
                if (arr[i].son[j].name == "设备列表") {
                  this.thCurId = arr[i].son[j].id
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
  },
}
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.addbtn {
  float: right;
  margin-right: 100px;
  margin-top: 20px;
}
.serviceTab th {
  width: 20%;
}

.div {
  word-wrap: break-word;
  word-break: normal;
}
.add {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
.equipment >>> .el-input {
  width: 40%;
  display: inline-block;
}
</style>
<style>
.modifyDialog .el-dialog__header {
  border-bottom: 1px solid rgba(230, 230, 235, 1);
  padding-bottom: 20px;
}
.el-table th {
  text-align: center;
}
.el-table__expanded-cell {
  padding: 0 !important;
  border-bottom: none;
}
</style>
