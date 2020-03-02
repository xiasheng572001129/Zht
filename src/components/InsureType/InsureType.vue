<template>
  <div class='InsureType'>
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
          <span>投保类型</span>
          <el-button class='add'
                     type="primary"
                     @click="typeDialogVisible=true,addState=1">添加</el-button>
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
      <table class="table InsuranceTab">
        <thead>
          <tr>
            <th>id</th>
            <th>险种名称</th>
            <th>录入时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.id}}</td>
            <td>{{item.type}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a class='col-0ACD00'
                 href="javascript:;"
                 @click="typeDialogVisible=true,ddState=2,modify(item.id,item.type)">修改</a>
              <a class='col-FA644B'
                 href="javascript:;"
                 @click="del(item.id)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>

      <el-dialog :title="addState==1?'添加保险类型':'修改保险类型'"
                 :visible.sync="typeDialogVisible"
                 width="30%"
                 center
                 @close="close">
        <el-form ref="form"
                 :model="form"
                 label-width="100px">
          <el-form-item label="保险类型">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="add('form')"
                     type="primary">{{addState==1?'添加':'修改'}}</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div :class="list.length<=7?'page-nav':'page_center'"
           v-show="list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
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
      typeDialogVisible: false,
      addState: 1,
      form: {
        type: '',
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
      this.$axios.post('admin/SystemSetup/insureList', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows;
            JSON.parse(localStorage.getItem('history'))
          } else {
            this.list = []
          }
        }).catch(err => { })
    },
    //点击确定进行添加
    add (form) {
      this.form.token = this.token
      this.$axios.post('admin/SystemSetup/insureAdd', this.form).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.typeDialogVisible = false
            this.init()
            this.$nextTick(() => {
              this.$refs[form].resetFields()
            })
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      })
    },
    close () {
      this.form = {}
    },
    //修改
    modify (id, type) {
      this.form = {
        type: type,
        id: id,
        token: this.token
      }
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('admin/SystemSetup/delInsure', { token: this.token, id: id }).then(res => {
          if (res.data.code == 1) {
            layer.msg(res.data.msg, { time: 1000 }, (() => {
              this.init()
            }))
          } else {
            layer.msg(res.data.msg, { time: 1000 })
          }
        }).catch(err => console.log(err))
      }).catch(() => { })

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
            if (arr[i].name == '投保类型') {
              this.seCurId = arr[i].id;
              this.threeAuthList = arr[i].son;
            }
          }
          this.authList = arr;
        } else {
          this.$message.error(res.data.msg)

        }
      })
      .catch(err => {
        throw (err)
      })
  },
}
</script>
<style scoped>
.addbtn {
  float: right;
  margin-right: 100px;
  margin-top: 20px;
}
.InsuranceTab th {
  width: 25% !important;
}
.InsuranceTab tbody tr td a {
  margin-right: 0;
}

.company > span {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
.company > span:last-child {
  width: 70%;
}
.InsureType table a {
  margin-left: 10px;
}
.add {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
</style>
