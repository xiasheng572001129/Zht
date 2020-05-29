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
          <i></i>系统设置-渠道客户服务-主机厂
          <el-button type="primary"
                     style="float:right;margin:20px 40px 0 0"
                     @click="addVisible=true,state=1">添加</el-button>
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
      <el-table :data="list">
        <!-- <el-table-column label="图片"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.photo"
                 class="img">
          </template>
        </el-table-column> -->
        <el-table-column align="center"
                         prop="company"
                         label="名称">
        </el-table-column>
        <el-table-column label="类型"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.type==1 ? '五折养护' : '单次免费'}}
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="create_time"
                         label="创建时间">
        </el-table-column>
        <el-table-column label="操作/是否显示"
                         align="center">
          <template slot-scope="scope">
            <el-switch :active-value='1'
                       :inactive-value='2'
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       v-model="scope.row.status"
                       @change='Setup(scope.row)'>
            </el-switch>
            <el-button type="primary"
                       size="mini"
                       style="margin-left:10px"
                       @click="addVisible=true,state=2,defaultData(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <div :class="list && list.length<=7?'page-nav':'page_center'"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div> -->
    </div>
    <el-dialog center
               :title="state==1 ? '添加': '修改'"
               :visible.sync="addVisible"
               @close='()=>{
                   $refs.form.resetFields()
               }'>
      <el-form label-width="100px"
               :model="listQuery"
               :rules="rules"
               ref="form">
        <el-form-item label="名称:"
                      prop="company">
          <el-input placeholder="请输出名称"
                    class="input"
                    v-model="listQuery.company" />
        </el-form-item>
        <el-form-item label="类型:"
                      prop="type">
          <el-radio v-model="listQuery.type"
                    :label="1">五折养护</el-radio>
          <el-radio v-model="listQuery.type"
                    :label="2">单次免费</el-radio>
        </el-form-item>
        <!-- <el-form-item label="图片:"
                      prop="photo">
          <el-upload :action="`${uploadUrl}admin/SystemSetup/uploadPic`"
                     list-type="picture-card"
                     :on-success='handleSuccess'
                     :data="{token:token}"
                     :file-list="listQuery.photo  ?  [{url:listQuery.photo}] : []"
                     :limit="1"
                     name="image">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="state==1? add() : Modify()"
                     :loading="loading">{{state==1 ? '添加' : '修改'}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 0,
      pageCount: 0,
      authList: [],
      threeAuthList: [],
      uploadUrl: this.baseURL,
      addVisible: false,
      loading: false,
      listQuery: {
        company: '',
        type: 1
      },
      state: 1, // 1 添加 2 修改
      rules: {
        company: { required: true, message: '名称不能为空', trigger: 'blur' },
        type: { required: true, message: '请选择类型', trigger: 'blur' },
        // photo: { required: true, message: '请上传图片', trigger: 'blur' },
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
      this.$axios.post('admin/SystemSetup/systemList', { token: this.token, page: this.page, types: 2 })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //设置 显示 隐藏
    async Setup (row) {
      try {
        const res = await this.$axios.post('admin/SystemSetup/updateStatus', { token: this.token, id: row.id, status: row.status })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        throw (error)
      }
    },
    //修改
    Modify () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const res = await this.$axios.post('admin/SystemSetup/updateInfo', Object.assign({}, this.listQuery, { token: this.token, types: 2 }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.addVisible = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.loading = false
            throw (error)
          }
        }
      })

    },
    defaultData (row) {  //默认数据
      this.$nextTick(() => {
        this.listQuery = Object.assign({}, row)
      })
    },
    add () {  //添加
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const res = await this.$axios.post('admin/SystemSetup/addGenre', Object.assign({}, this.listQuery, { token: this.token, types: 2 }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.addVisible = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.loading = false
            throw (error)
          }
        }
      })
    },
    handleSuccess (res) {  //上传成功
      this.listQuery = Object.assign({}, this.listQuery, { photo: res })
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
            if (arr[i].son) {
              if (arr[i].name == '渠道客户服务') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '主机厂' && arr[i].name == '渠道客户服务') {
                  this.thCurId = arr[i].son[j].id;
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
.ellipsis {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.img {
  width: 70px;
  height: 70px;
}
.input {
  width: 50%;
}
.laybox2 ul {
  margin: 33px auto;
  border-bottom: 1px dashed #04bbfc;
}

.laybox2 {
  padding: 60px;
  font-size: 16px;
}

.laybox2 li {
  width: 300px;
  text-align: left;
  margin: 33px auto;
}

.t-c:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.bot > div {
  position: relative;
}

div.bot {
  margin: 45px auto 35px auto;
  height: 100px;
}

div.bot span {
  display: inline-block;
  width: 20%;
}

div.bot input {
  display: inline-block;
  width: 55%;
  outline: none;
  border: none;
  border-bottom: 1px solid #aaa;
}

div.bot button {
  width: 110px;
  height: 36px;
  margin-left: -55px;
  position: absolute;
  border-radius: 18px;
  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
  border: none;
  color: #fff;
  left: 50%;
  top: 60px;
}

button.reject {
  background: rgba(237, 81, 55, 1);
  margin-right: 30%;
}

button.pass {
  background-color: #20a0ff;
}

.left {
  float: left;
  width: 50%;
}

.right {
  float: right;
  width: 50%;
}
.nowrap {
  width: 120px !important;
  text-align: center;
  white-space: nowrap; /*规定文本不换行**/
  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/
  overflow: hidden;
  margin: 0 auto;
}
.regionDetail >>> .el-dialog__title {
  font-size: 22px;
}
.regionDetail >>> .el-dialog__body {
  padding: 0px 25px 30px;
  border-top: solid 2px #eee;
}
</style>
