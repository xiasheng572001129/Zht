<template>
  <div class='product'>
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
                     @click="addState=1,add()">添加</el-button>
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
        <table class='table '>
          <tr>
            <th>服务项名称</th>
            <th>产品名称</th>
            <th>产品图片</th>
            <th>产品规格</th>
            <th>产品数量</th>
            <th>更换周期</th>
            <th>后续折扣</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="item of list">
            <td>{{item.ser_name}}</td>
            <td>{{item.name}}</td>
            <td>
              <img class='image'
                   :src="item.image"
                   @click="imgDialogVisible=true,dialogImageUrl=item.image">
            </td>
            <td>{{item.size}}</td>
            <td>{{item.number}}</td>
            <td>{{item.period}}</td>
            <td>{{item.redate}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;"
                 @click="details(item.content)"
                 class='col-1EA'>详情</a>
              <a href="javascript:;"
                 class='col-0ACD00'
                 @click="addState=2,addDialogVisible=true,modify(item.id,item.pid,item.ser_name,item.name,item.image,item.size,item.number,item.period,item.redate,item.content)">修改</a>
              <a href="javascript:;"
                 class='col-FA644B'
                 @click="del(item.id,item.ser_name)">删除</a>
            </td>
          </tr>
        </table>
      </div>
      <!--详情弹框-->
      <el-dialog title="详情"
                 :visible.sync="detailsDialogVisible"
                 width="30%"
                 center>
        <div class='details'>
          <p>产品描述:</p>
          <p v-html='describe'></p>
        </div>
      </el-dialog>
      <!--添加修改弹框-->
      <el-dialog :title="addState==1?'添加':'修改'"
                 :visible.sync="addDialogVisible"
                 width="800px"
                 center>
        <div class="addDialog">
          <el-form ref="form"
                   :model="form"
                   label-width="100px">
            <el-form-item label="服务项名称 : ">
              <el-select placeholder="请选择服务项"
                         v-model="form.pid">
                <el-option v-for="item of selsetList"
                           :label="item.ser_name"
                           :key="item.id"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品名称 : ">
              <el-input placeholder="请选择产品名称"
                        v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="产品图片 : ">
              <el-upload class="upload"
                         action="https://ceshi.ctbls.com/admin/SystemSetup/proImg"
                         name='image'
                         :data="{token:token}"
                         list-type="picture-card"
                         :on-success="handlesuccess"
                         :file-list='form.imgArr'
                         :on-preview="handlePictureCardPreview"
                         :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible"
                         append-to-body>
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="产品规格 : ">
              <el-input v-model="form.size"
                        placeholder="件/升/个"></el-input>
            </el-form-item>
            <el-form-item label="产品数量 : ">
              <el-input v-model="form.number"
                        placeholder="请输入产品数量"></el-input>
            </el-form-item>
            <el-form-item label="更换周期 : ">
              <el-input v-model="form.period"
                        placeholder="请输入周期"></el-input>
            </el-form-item>
            <el-form-item label="后续折扣 : ">
              <el-input v-model="form.redate"
                        placeholder="请输入折扣"></el-input>
            </el-form-item>
            <el-form-item label="产品描述 : ">
              <wangEditor class="wangEditor"
                          :catchData="catchData"
                          :content='form.content'></wangEditor>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="Submission">{{addState==1?'添加':'修改'}}</el-button>
        </span>
      </el-dialog>
      <!--图片弹框-->
      <el-dialog :visible.sync="imgDialogVisible"
                 width="30%"
                 center>
        <div>
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">

import wangEditor from "@/components/common/wangEditor"
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
      addDialogVisible: false,  //添加弹框状态
      detailsDialogVisible: false,//详情弹框状态
      imgDialogVisible: false, //图片弹框状态
      DialogState: 1, //控制弹框的状态
      currentID: 0,//当前列表id
      dialogImageUrl: '',
      dialogVisible: false,
      selsetList: [],
      form: {
        token: window.sessionStorage.getItem('bbytoken'),
        pid: '',
        name: '',
        size: '',
        image: '',
        number: '',
        period: '',
        redate: '',
        content: ''
      },
      describe: '', //产品描述
      addState: 1,
      imgArr: []
    }
  },
  components: { wangEditor },
  created () {
    this.init();

  },
  filters: {
    Removelabel (e) {
      return e.replace(/<[^>]+>/g, "");
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/SystemSetup/proItem', { token: this.token, page: this.page })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list
            var data = res.data.data;
            this.pageCount = res.data.data.rows;
          } else {
            this.list = []
            layer.msg(res.data.msg, { time: 1500 })
          }
        }).catch(err => { })
    },
    //点击添加
    add () {
      this.addDialogVisible = true
      this.selsetData()
    },
    selsetData () {
      this.$axios.post('admin/SystemSetup/serItem', { token: this.token }).then(res => {  //获取服务项列表
        if (res.data.code == 1) {
          console.log(res)
          this.selsetList = res.data.data;
        }
      }).catch(err => console.log(err))
    },
    handleRemove (file, fileList) {  //删除图片
      this.form.image = ''
    },
    handlePictureCardPreview (file) {  //图片放大
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess (res) {  //图片上传成功,获取图片路径
      this.form.image = res;
    },
    catchData (val) {  //获取富文本内容
      console.log(val)
      this.form.content = val;
    },
    Submission () { //提交
      this.$message.error('123')
      console.log(this.form)
      this.$axios.post('admin/SystemSetup/addPro', this.form).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.addDialogVisible = false
            this.init()
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },
    details (content) {
      this.detailsDialogVisible = true
      this.describe = content

    },
    modify (id, pid, ser_name, name, image, size, number, period, redate, content) { //修改
      this.selsetData()
      console.log(this.form)
      this.form = {
        token: this.token,
        pid: pid,
        id: id,
        name: name,
        imgArr: [{ url: image }],
        image: image,
        size: size,
        number: number,
        period: period,
        redate: redate,
        content: content
      }
    },
    del (id, ser_name) { //删除
      this.$confirm('此操作将永久删除次产品吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$axios.post('admin/SystemSetup/prodel', { token: this.token, id: id, name: ser_name }).then(res => {
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
            if (arr[i].name == '半价服务') {
              this.seCurId = arr[i].id;
              this.threeAuthList = arr[i].son;
              console.log(arr[i])
              for (var j = 0; j < arr[i].son.length; j++) {
                console.log(arr[i].son[j].name)
                if (arr[i].son[j].name == "产品列表") {
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
.tree:after {
  display: block;
  content: "";
  clear: both;
}
.tree > li {
  float: left;

  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  color: #8a8d93;
  line-height: 50px;
}
.tree:first-child > li {
  width: 20%;
  text-align: center;
}
.tree:last-child > li {
  float: none;
}
.fatherTree {
  width: 100%;
}
.fatherTree:after {
  display: block;
  content: "";
  clear: both;
}
.icon {
  position: absolute;
  text-align: center;
  margin-left: -35px;
  top: 50%;
  margin-top: -8px;
}
.fatherTree > li {
  float: left;
  width: 20%;
  text-align: center;
  border-top: 1px solid #eaedf3;
  position: relative;
}
.sonTheader:after {
  display: block;
  content: "";
  clear: both;
}
.sonTheader > li:first-child {
  padding-left: 40px;
}
.sonTheader > li {
  width: 10%;
  float: left;
  text-align: left;
  background-color: #eeeeee;
}
.sonTheader {
  padding-left: 160px;
}
.sonContent:after {
  display: block;
  content: "";
  clear: both;
}
.sonContent > li {
  width: 20%;
  float: left;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sonContent > li:first-child {
  padding-left: 20px;
}
.son > li {
  margin-left: 9%;
}
.son > table {
}

.div {
  word-wrap: break-word;
  word-break: normal;
}
.image {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.product table td {
  width: 100px !important;
  overflow: hidden;
}

.add {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
.upload {
  width: 148px;
  overflow: hidden;
  height: 148px;
}
.addDialog {
  overflow: auto;
  height: 500px;
}
.product .table a {
  margin-left: 10px;
}
.details:after {
  display: block;
  content: "";
  clear: both;
}
.details > p {
  float: left;
  margin-bottom: 100px;
}
.details > p:first-child {
  width: 20%;
}
.details > p:last-child {
  width: 70%;
  word-wrap: break-word;
}
</style>
<style>
.el-table th {
  text-align: center;
}
.el-table__expanded-cell {
  padding: 0 !important;
  border-bottom: none;
}
.upload {
}
.wangEditor .w-e-toolbar .w-e-menu {
  padding: 5px 7px !important;
}
</style>
