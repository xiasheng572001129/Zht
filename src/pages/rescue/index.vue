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
          救援项目
          <el-button type="primary"
                     style="float:right;margin:20px 30px 0 0"
                     @click="rescueVisible=true">添加</el-button>
        </div>
      </div>
      <el-table :data="list">
        <el-table-column label="id"
                         prop="id"
                         align="center"></el-table-column>
        <el-table-column label="项目名称"
                         prop="name"
                         align="center"></el-table-column>
        <el-table-column label="是否显示"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.status==1 ? '显示' : '隐藏'}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       :active-value='1'
                       :inactive-value='2'
                       @change="operation(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
      <el-dialog title="添加救援项目"
                 :visible.sync="rescueVisible"
                 center
                 @close='()=>{
                     $refs.form.resetFields()
                 }'>
        <el-form label-width="100px"
                 style="width:50%"
                 :model="QueryList"
                 :rules="rules"
                 ref="form">
          <el-form-item label="项目名称 : "
                        prop="name">
            <el-input placeholder="请输入项目名称"
                      v-model="QueryList.name" />
          </el-form-item>
          <el-form-item label="是否显示 : "
                        prop="status">
            <el-radio-group v-model="QueryList.status">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="2">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="add"
                       :loading="loading">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      seCurId: 0,
      rescueVisible: false,
      QueryList: {
        name: '',
        status: 1
      },
      rules: {
        name: { required: true, message: '请输入项目名称', trigger: 'blur' },
        status: { required: true, message: '请选择显示/隐藏', trigger: 'blur' },
      },
      loading: false
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
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/UserRescue/rescueIndex', { token: this.token, page: this.page })
        .then(res => {

          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 0;
        }).catch(err => { })
    },
    add () {  //添加救援项目
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const res = await this.$axios.post('admin/UserRescue/rescueAdd', Object.assign({}, this.QueryList, { token: this.token }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: "success" })
              this.rescueVisible = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.loading = false
            throw (error)
          }
        }
      });
    },
    async operation (row) {  //显示/隐藏
      try {
        console.log(row)
        const res = await this.$axios.post('admin/UserRescue/rescueUpdate', { token: this.token, id: row.id, status: row.status })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        throw (error)
      }
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
            if (arr[i].name == '救援项目') {
              this.seCurId = arr[i].id;
            }

            if (arr[i].son) {
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
