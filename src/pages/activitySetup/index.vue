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
             style="float:left"><i></i>系统设置-线下活动奖品设置</div>

      </div>

      <el-table :data="rewardList "
                ref='table'>
        <el-table-column label="奖品名称"
                         prop="name"
                         align="center"></el-table-column>
        <el-table-column label="奖品图片"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.photo"
                 class="rewardImg"
                 @click="photo($event)"
                 ref="photo" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         prop="create_time"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="state=1,change(scope.row)">修改</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情"
                 :visible.sync="detailVisible">

      </el-dialog>
      <el-dialog title="修改"
                 :visible.sync='modifyVisible'
                 @close='resetFields'>
        <el-form style="width:80%"
                 label-width="100px"
                 :model="listQuery"
                 ref="ruleForm">
          <el-form-item label="奖励名称:"
                        prop="name">
            <el-input placeholder="请输入奖励名称"
                      v-model="listQuery.name" />
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
          <el-form-item>
            <el-button type="primary"
                       @click="modify()">修改</el-button>
            <el-button type="primary"
                       @click="resetFields">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
      <div style="text-align:center;margin: 20px 0">
        <paging :page-count="total"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      authList: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      page: 1,
      total: 1,
      rewardList: [], //奖励列表
      modifyVisible: false, //修改弹框状态
      imgVisible: false,
      detailVisible: false,
      dialogImageUrl: '',
      listQuery: {
        mail: 0
      },
      form: { name: '' },
      uploadImgUrl: '',
    }
  },

  methods: {
    paging (e) {  //分页
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/Prize/actionPrize', { token: this.token, page: this.page })
        this.rewardList = res.data.data || []
        this.total = res.data.data.rows || 1;
        this.$nextTick(() => {
          console.log(this.$refs.photo)
        })

      } catch (err) {
        throw (err)
      }
    },


    handleAvatarSuccess (res) {  //上传图片
      this.uploadImgUrl = res
      this.listQuery = Object.assign({}, this.listQuery, { photo: res })
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


    async modify () {  //修改
      try {
        const res = await this.$axios.post('admin/Prize/updateAction', Object.assign({}, this.listQuery, { token: this.token }))
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
    },

    // 权限列表,当前所在权限页  
    erAuthList () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: this.token,
        id: id
      })
        .then(res => {
          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].son) {
                if (arr[i].name == '线下活动奖品设置') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
              }
            }
            this.authList = arr;
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
  updated () {

  },
  mounted () {
    this.init() //初始化数据  
    this.erAuthList()

  },
}
</script>
<style scoped>
>>> .el-dialog__body {
  padding-top: 30px !important;
}
.quote:after {
  display: block;
  clear: both;
  content: "";
}
.rewardImg {
  width: 70px;
  height: 70px;
}

.add_goods {
  float: right;
  margin-top: 25px;
  margin-right: 20px;
}
.ellipsis {
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
>>> .el-dialog__header {
  text-align: center;
}
>>> .w-e-toolbar {
  overflow: auto;
}
</style>