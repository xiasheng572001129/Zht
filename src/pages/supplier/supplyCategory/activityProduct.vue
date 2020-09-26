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
          供应商-供应类别-活动产品
          <!-- <el-button class="add"
                     type="primary"
                     @click="state=0,viisble=true">添加</el-button> -->
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
        <el-table-column label="产品图片"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.photo"
                 class="productImg" />
          </template>
        </el-table-column>
        <el-table-column label="产品名称"
                         prop="name"
                         align="center"></el-table-column>
        <el-table-column label="期初库存数"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.ration>0 ? scope.row.ration : '无'}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="身份"
                         align="center"
                         prop="identity">

        </el-table-column> -->
        <el-table-column label="添加时间"
                         prop="create_time"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="openModify(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加/修改  -->
      <el-dialog :title="state==0 ? '添加' : '修改'"
                 center
                 :visible.sync='viisble'>
        <el-form :model="listQuery"
                 label-width="100px"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item label="产品名称："
                        prop="name">
            <el-input placeholder="请输入产品名称"
                      v-model="listQuery.name" />
          </el-form-item>
          <el-form-item label="库存数："
                        required>
            <el-form-item prop="Whether">
              <el-radio-group v-model="listQuery.Whether">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="ration"
                          v-if="listQuery.Whether==1">
              <el-input placeholder="请输入库存数"
                        v-model="listQuery.ration" />
            </el-form-item>
          </el-form-item>
          <!-- <el-form-item label="身份："
                        prop="identitys">
            <el-checkbox-group v-model="listQuery.identitys">
              <el-checkbox label="1">保险</el-checkbox>
              <el-checkbox label="2">邦保养</el-checkbox>
              <el-checkbox label="3">会员</el-checkbox>
              <el-checkbox label="4">老兵</el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          <el-form-item label="产品图片："
                        prop="photo">
            <el-upload :action="uploadUrl"
                       :data="{token:token}"
                       name="img"
                       list-type="picture-card"
                       :on-success="handleSuccess"
                       :on-remove="handleRemove"
                       :file-list='listQuery.photo ? [{url:listQuery.photo}] : []'
                       :limit="1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="state==0 ? '' : Modify()"
                       :loading='loading'>{{state==0 ? '添加' : '修改'}}</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
      <!-- 分页 -->
      <div class="page_center"
           v-show="list && list.length>0">
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
      page: 1,
      pageCount: 1,
      thCurId: '',
      authList: [],
      threeAuthList: [],
      viisble: false, //弹框显示状态
      state: 0, // 0 添加 1修改
      listQuery: {
        id: '', //类别id  
        name: '',  //产品名称
        ration: '',  //库存数
        photo: '', //产品图片
        Whether: '', //是否有库存
        // identitys: [], //身份
        type: 2  //1邦保养产品 2活动产品
      },
      dialogVisible: false, //图片显示的状态
      dialogImageUrl: '',  //上传显示的图片
      rules: {  //表单验证
        name: { required: true, message: '请输入活动名称', trigger: 'blur' },
        ration: { required: true, message: '请输入库存数', trigger: 'blur' },
        photo: { required: true, message: '请上传产品图片', trigger: 'blur' },
        Whether: { required: true, message: '请选择是否有库存', trigger: 'blur' },
        // identitys: { required: true, message: '请选择身份', trigger: 'blur' }
      },
      loading: false, //loading
    }
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },

    init () {
      this.$axios.post('admin/SmSet/productTypeList', { token: this.token, page: this.page, type: 2 })
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
    },
    openModify (item) {  //打开修改弹框,拿取当前数据,进行默认展示
      this.state = 1     // 1 修改 0添加
      this.viisble = true  //打开修改弹框
      this.$nextTick(() => {
        this.listQuery = Object.assign(this.listQuery, { name: item.name, ration: item.ration, photo: item.photo, Whether: item.ration > 0 ? '1' : '0', id: item.id })
      })
    },
    handleSuccess (url) {  //上传成功的产品图片
      this.$nextTick(() => {
        this.listQuery.photo = url
      })
    },
    handleRemove () { //删除上传的图片
      this.listQuery.photo = ''
    },
    Modify () {  //修改
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true

            const res = await this.$axios.post("admin/SmSet/updProductType", { token: this.token, ration: this.listQuery.Whether == 1 ? this.listQuery.ration : 0, id: this.listQuery.id, name: this.listQuery.name, photo: this.listQuery.photo, type: this.listQuery.type })
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.viisble = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.loading = false
            throw (error)
          }
        } else {
          return false;
        }
      });
    },
    Auth () {
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
                if (arr[i].name == '供应类别') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '活动产品' && arr[i].name == '供应类别') {
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
    }
  },
  mounted () {
    this.Auth()
    this.init()
  },
}
</script>
<style scoped>
.ellipsis {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  text-align: center;
}
.add {
  float: right;
  margin: 20px 40px 0 0;
}
.productImg {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
