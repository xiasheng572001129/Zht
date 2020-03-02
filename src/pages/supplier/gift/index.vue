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
        <div class="quote-ele"
             style="float:left"><i></i>供应商-礼品审核 </div>
      </div>
      <div class="search">
        <el-input placeholder="请输入供应商名称"
                  v-model="sm_name" />
        <el-button type="primary"
                   @click="search">搜索</el-button>
      </div>
      <table class="table">
        <tr>
          <th>供应商名称</th>
          <th>联系电话</th>
          <th>礼品名称</th>
          <th>品牌</th>
          <th>单位</th>
          <th>介绍</th>
          <th>产品图片</th>
          <th>质量保证书 </th>
          <th>质量承保书</th>
          <th>质检报告</th>
          <th>操作</th> 
        </tr>
        <tr v-for='(item,index) in list'
            :key="index">
          <td>{{item.s_name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.name}}</td>
          <td>{{item.brand}}</td>
          <td>{{item.unit}}</td>
          <td>{{item.detail}}</td>
          <td>
            <img :src="item.pic"
                 ref='images'>
          </td>
          <td>
            <img :src="item.quality_certificate"
                 ref="images">
          </td>
          <td>
            <img :src="item.quality_undertaking"
                 ref="images">
          </td>
          <td>
            <img :src="item.quality_inspection_report"
                 ref="images">
          </td>

          <td>
            <el-button type="primary"
                       size="small"
                       @click="detailList=item.details,detailVisible=true,detail()">详情</el-button>

            <el-button type="success"
                       size="small"
                       @click="throughVisible=true,sm_id=item.sm_id,id=item.id">通过</el-button>
            <el-button type="danger"
                       :loading="rejectLoading[index]"
                       @click="reject(item,index)"
                       size="small">驳回</el-button>
          </td>
        </tr>
      </table>
      <el-dialog title="详情"
                 center
                 :visible.sync="detailVisible">
        <el-table :data="detailList"
                  border>
          <el-table-column label="型号"
                           prop="standard"
                           align="center"></el-table-column>
          <el-table-column label="价格"
                           prop="price"
                           align="center"></el-table-column>
          <el-table-column label="净含量"
                           prop="standard_detail"
                           align="center"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="操作"
                 center
                 width="40%"
                 @close='resetForm'
                 :visible.sync="throughVisible">
        <el-form style="width:70%"
                 label-width="70px"
                 :model="form"
                 :rules="rules"
                 ref="form">
          <el-form-item label="质保金:"
                        prop="money">
            <el-input placeholder="请输入质保金"
                      v-model="form.money" />
          </el-form-item>
          <el-form-item label="地区:">
            <el-select v-model="form.ProvinceID"
                       placeholder="请选择省"
                       @change="getCity">
              <el-option v-for='(item,index) in Province'
                         :key="index"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
            <el-select v-model="form.cityID"
                       placeholder="请选择市">
              <el-option v-for='(item,index) in city'
                         :key="index"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="through()"
                       :loading="throughLoading">通过</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      authList: [],
      page: 0,  //供应商列表当前页数
      pageCount: 0, //供应商列表总页数
      detailVisible: false,
      sm_name: '',
      detailList: [],
      throughLoading: false,//通过loading
      rejectLoading: [], //驳回loading
      throughVisible: false,

      Province: [], //所有省
      city: [], //所有市
      sm_id: '',
      id: '',
      form: {
        money: '', //质保金
        ProvinceID: '', //所选省id
        cityID: '', //所选市id
      },
      rules: {  //表单规则验证
        money: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ]
      }
    }
  },

  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },
    search () {  //搜索
      this.init()
    },
    async init () {
      try {
        const List = this.$axios.post('admin/SmAudit/giftsList', { token: this.token, page: this.page, sm_name: this.sm_name })
        const getProvince = this.$axios.post('admin/SmAudit/getProvince')
        const [resList, resProvince] = await Promise.all([List, getProvince])
        this.list = resList.data.data.list || []
        this.pageCount = resList.data.data.rows || 0
        this.Province = resProvince.data.data || []
        if (resList.data.code == 1) {
          this.$nextTick(() => {
            const ViewerRef = this.$refs.images
            Viewer(ViewerRef)
          })
        } else {
          this.$message({ message: resList.data.msg, type: 'warning ' })
        }

      } catch (err) {
        throw (err)
      }
    },
    async getCity () {  //获取所有市
      try {
        const res = await this.$axios.get(`admin/SmAudit/getCity?id=${this.form.ProvinceID}`)
        this.city = res.data.data || []
      } catch (err) {
        throw (err)
      }
    },
    //通过
    through () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('此操作将通过审核, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            try {
              this.throughLoading = true
              const area = this.form.cityID || this.form.ProvinceID || 1   //省市都没有选择传1 选择省没选择市传省id 省市都选择传市id
              const res = await this.$axios.post('admin/SmAudit/passGifts', Object.assign({}, this.form, { id: this.id, sm_id: this.sm_id, area: area, token: this.token }))
              this.throughLoading = false
              if (res.data.code == 1) {
                this.throughVisible = false
                this.$message({ message: res.data.msg, type: 'success' })
                this.init()
              } else {
                this.$message.error(res.data.msg)
              }
            } catch (err) {
              throw (err)
            }
          }).catch(() => { });
        }
      });

    },
    //驳回
    reject (row, index) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading[index] = true

          const res = await this.$axios.post('admin/SmAudit/rejectGifts', { token: this.token, sm_id: row.sm_id, reason: value, id: row.id })
          this.rejectLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.errof(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
    },
    resetForm (formName) {  //清空表单验证
      this.$refs.form.resetFields();
      this.form.ProvinceID = ''
      this.form.cityID = ''
    },

    // 权限列表,当前所在权限页  
    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      }).then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data || [];
          this.authList = arr;
          console.log(this.authList)
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
        .catch(err => {
          alert(err);
        })
    }
  },
  created () {
    this.erAuth()
  },
  mounted () {

    this.init() //初始化数据  

  },
}
</script>
<style scoped>
.search {
  width: 100%;
  overflow: hidden;
}
.search {
  padding: 0px 0px 20px 50px;
}
.search >>> .el-input {
  width: 20%;
}
.search >>> button {
  padding: 11px 15px;
}

.table img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.ellipsis {
  width: 80px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
</style>