<template>
  <div class='Insurance'>
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
          <span>保险公司列表</span>
          <el-button type="primary"
                     class="addbtn"
                     @click="addCompany">添加</el-button>
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
            <th>公司名称</th>
            <th>录入时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.id}}</td>
            <td>{{item.company}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 class='col-0ACD00'
                 @click="modify(item.id,item.company)">修改</a>
              <a href="javascript:;"
                 class='col-FA644B'
                 @click="del(item.id,item.company)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
      <el-dialog :title="DialogState==1?'添加保险公司':'修改保险公司'"
                 :visible.sync="companyDialogVisible"
                 width="30%"
                 center
                 @close="close">
        <div class="company">
          <span>请输入公司:</span>
          <span>
            <el-input v-model="company"
                      placeholder="请输入保险公司名称"></el-input>
          </span>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="SureAdd">{{DialogState==1?'确定':'修改'}}</el-button>
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
      company: '', //输入的公司名称
      companyDialogVisible: false,
      DialogState: 1, //控制弹框的状态
      currentID: 0,//当前列表id
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
      this.$axios.post('admin/SystemSetup/policyList', { token: this.token, page: this.page })
        .then(res => {

          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //点击添加
    addCompany () {
      this.companyDialogVisible = true
      this.DialogState = 1
    },
    //点击确定进行添加
    SureAdd () {
      if (!this.company) {
        layer.msg('请输入公司名称', { time: 1500 })
        return;
      }
      let obj = { token: this.token, company: this.company };
      if (this.DialogState == 2) obj.id = this.currentID;
      this.$axios.post('admin/SystemSetup/policyCompany', obj).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.companyDialogVisible = false
            this.init()
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      })
    },
    close () {
      this.company = ''
    },
    //修改
    modify (id, company) {
      this.DialogState = 2
      this.companyDialogVisible = true
      this.company = company
      this.currentID = id
    },
    del (id, company) { //删除
      this.$confirm('您确定要永久删除此数据吗,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('admin/SystemSetup/comdel', { token: this.token, id: id, company: company }).then(res => {
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
            if (arr[i].name == '保险公司列表') {
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
  width: 80%;
}
.Insurance table a {
  margin-left: 10px;
}
</style>
