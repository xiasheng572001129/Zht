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
             style="float:left"><i></i>供应商-会员专属</div>
        <el-button class="add_goods"
                   type="primary"
                   @click="state=0,modifyVisible=true">添加奖品</el-button>

      </div>
      <el-table :data="list">
        <el-table-column label="名称"
                         align="center"
                         prop="name">
        </el-table-column>
        <el-table-column label="图片"
                         align="center"
                         ref="column">
          <template slot-scope="scope">
            <div ref='photo'>
              <img :src="scope.row.photo"
                   class="rewardImg" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最高工时费"
                         prop="max_charge"
                         align="center"></el-table-column>

        <el-table-column label="更换里程(km)"
                         prop="need_km"
                         align="center">

        </el-table-column>
        <el-table-column label="固定数量值"
                         align="center"
                         prop="fixed_value">

        </el-table-column>
        <el-table-column label="规格"
                         align="center"
                         prop="standard">
        </el-table-column>
        <el-table-column label="产品描述"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title="产品描述"
                        width="200"
                        trigger="hover">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis"
                         style="width:100px"
                         v-html="scope.row.detail">{{scope.row.detail}}</el-button>
              <div v-html="scope.row.detail"></div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="state=1,change(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="state == 0 ? '添加' : '修改'"
                 :visible.sync='modifyVisible'
                 @close='resetFields'
                 center>
        <el-form style="width:80%"
                 label-width="100px"
                 :model="listQuery"
                 :rules='rules'
                 ref="ruleForm">
          <el-form-item label="名称:"
                        prop="name">
            <el-input placeholder="请输入名称"
                      v-model="listQuery.name" />
          </el-form-item>
          <el-form-item label="更换里程:"
                        prop="need_km">
            <el-input placeholder="请输入人数"
                      v-model="listQuery.need_km" />
          </el-form-item>
          <el-form-item label="最高工时费:"
                        prop="max_charge">
            <el-input placeholder="请输入工时费"
                      v-model="listQuery.max_charge" />
          </el-form-item>
          <el-form-item label="固定数量值:"
                        prop="fixed_value">
            <el-input placeholder="请输入固定数量值"
                      v-model="listQuery.fixed_value" />
          </el-form-item>
          <el-form-item label="规格:"
                        prop="standard">
            <el-input placeholder="请输入固定数量值"
                      v-model="listQuery.standard" />
          </el-form-item>
          <el-form-item label="图片:"
                        prop="photo">
            <el-upload :action='baseURL+"admin/Prize/cbImg"'
                       :data="{token:token}"
                       name='img'
                       list-type="picture-card"
                       :file-list='listQuery.photo ? [{url:listQuery.photo}] : []'
                       :limit='1'
                       :on-success="handleAvatarSuccess"
                       :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgVisible"
                       size="tiny">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="描述:"
                        prop="detail">
            <wangEditor :content='listQuery.detail'
                        :catchData='catchData' />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="state ==0 ? addGoods() :modify()">{{state == 0 ? '添加' : '修改'}}</el-button>
            <el-button type="primary"
                       @click="resetFields">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
      <div class="page_center"
           v-show="earningsTotal&&earningsTotal>1">
        <paging :page-count="earningsTotal"
                :page="earningsPage"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
import wangEditor from '@/components/common/wangEditor'
export default {
  data () {
    return {
      list: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      page: 0,  //供应商列表当前页数
      pageCount: 0, //供应商列表总页数
      state: 0,
      modifyVisible: false,
      listQuery: {},
      rules: {
        name: { required: true, message: '请输入奖品名称', trigger: 'blur' },
        need_km: { required: true, message: '请输入历程', trigger: 'blur' },
        max_charge: { required: true, message: '请输入工时费', trigger: 'blur' },
        fixed_value: { required: true, message: '请输入数量值', trigger: 'blur' },
        photo: { required: true, message: '请上传图片', trigger: 'blur' },
        detail: { required: true, message: '请输入描述信息', trigger: 'blur' },
        standard: { required: true, message: '请输入规格', trigger: 'blur' },
      }
    }
  },
  components: { wangEditor },
  methods: {
    paging (e) {  //获取供应商列表当前页
      this.page = e
      this.init()
    },

    async init () {
      try {
        const res = await this.$axios.post('admin/SmList/adminFreeList', { token: this.token, page: this.page })
        this.list = res.data.data || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },


    handleAvatarSuccess (res) {  //上传图片
      this.uploadImgUrl = res
      this.listQuery = Object.assign({}, this.listQuery, { photo: res })
    },
    catchData (value) {
      this.listQuery = Object.assign({}, this.listQuery, { detail: value })
    },
    change (row) {
      this.modifyVisible = true
      this.$nextTick(() => {
        this.listQuery = Object.assign({}, row)
      })
    },
    resetFields () {
      this.$refs.ruleForm.resetFields()
    },

    addGoods () {  //添加商品
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$axios.post('admin/SmList/upFree', Object.assign({}, this.listQuery, { token: this.token, }))
            if (res.data.code == 1) {
              this.init()
              this.modifyVisible = false
              this.$message({ message: res.data.msg, type: 'success' })
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (err) {
            throw (err)
          }
        }
      });

    },
    async modify () {  //修改
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$axios.post('admin/SmList/updateFree', Object.assign({}, this.listQuery, { token: this.token }))
            if (res.data.code == 1) {
              this.modifyVisible = false
              this.init()
              this.$message({ message: res.data.msg, type: 'success' })
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (err) {
            throw (err)
          }
        }
      })
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
.ellipsis {
  width: 80px !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
.add_goods {
  float: right;
  margin-top: 25px;
  margin-right: 20px;
}
.rewardImg {
  width: 70px;
  height: 70px;
}
>>> .w-e-toolbar {
  overflow: auto;
}
</style>