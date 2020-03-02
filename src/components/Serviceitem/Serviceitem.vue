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
        <div class="quote-ele">
          <i></i>
          <span>会员特权服务项</span>
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
            <th>ID</th>
            <th>服务项名称</th>
            <th>产品个数</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in list">
            <td>{{item.id}}</td>
            <td>{{item.ser_name}}</td>
            <td>{{item.pro_num}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click='addState=2,modifyDialogVisible=true,modify(item.id,item.ser_name)'
                 class='col-0ACD00'>修改</a>
              <a href="javascript:;"
                 @click="del(item.id,item.pro_num,item.ser_name)"
                 class='col-FA644B'>删除</a>
            </td>
          </tr>
        </table>
      </div>
      <el-dialog :title="addState==1?'添加':'修改'"
                 class='modifyDialog'
                 :visible.sync="modifyDialogVisible"
                 width="30%"
                 center>
        <div>
          <el-form ref="form"
                   :model="form"
                   label-width="100px">
            <el-form-item label="服务项名称 : ">
              <el-input v-model="form.ser_name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="addService"
                     type="primary">{{addState==1?'添加':'修改'}}</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
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
      obj: {},
      reason: '',
      reg_reason: '',
      aid: '',
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1,//当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      company: '', //输入的公司名称
      modifyDialogVisible: false,  //修改弹框状态
      DialogState: 1, //控制弹框的状态
      currentID: 0,//当前列表id
      addState: 1,
      form: {
        token: window.sessionStorage.getItem('bbytoken'),
        ser_name: ''
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
      this.$axios.post('admin/SystemSetup/serItem', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list
            this.pageCount = res.data.data.rows;
          } else {
            this.list = []
          }

        }).catch(err => { })
    },
    addService () { //添加修改服务项
      this.$axios.post('admin/SystemSetup/addSer', this.form).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.modifyDialogVisible = false
            this.init()
            this.form.ser_name = ''
            this.form.id = ''
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },
    //修改服务项
    modify (id, ser_name) {

      this.form = {
        id: id,
        ser_name: ser_name,
        token: this.token
      }
    },
    del (id, pro_num, ser_name) { //删除服务项
      this.$confirm(`此服务项下产品有${pro_num}个,您确定删除吗?`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$axios.post('admin/SystemSetup/serdel ', { token: this.token, id: id, ser_name: ser_name }).then(res => {
          if (res.data.code == 1) {
            layer.msg(res.data.msg, { time: 1000 }, (() => {
              this.init()
            }))
          } else {
            layer.msg(res.data.msg, { time: 1000 })
          }
        }).catch(err => console.log(err))
      }).catch(() => {

      })
    },

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
            if (arr[i].name == '半价服务') {
              this.seCurId = arr[i].id;
              this.threeAuthList = arr[i].son;

              for (var j = 0; j < arr[i].son.length; j++) {

                if (arr[i].son[j].name == "服务项列表") {
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
.serviceTab a {
  margin-left: 10px;
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
