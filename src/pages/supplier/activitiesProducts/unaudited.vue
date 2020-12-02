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
        <div class="quote-ele"><i></i>供应商-活动产品审核-未审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <table class="table"
             ref="table">
        <tr>

          <th>供应商名称</th>
          <th>联系电话</th>
          <th>供应类型</th>
          <th>产品名称</th>
          <th>品牌</th>
          <th>金额（元）</th>
          <th>结算类型</th>
          <th>申请时间</th>
          <th>产品图片</th>
          <th>质量保证书</th>
          <th>质量承保书</th>
          <th>质检报告</th>
          <th>地区</th>
          <th>操作</th>
        </tr>
        <tr v-for='(item,index) in list'
            :key="index"
            ref='images'>
          <td>{{item.s_name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.product_name}}</td>
          <td>{{item.brand}}</td>
          <td>{{item.standard}}</td>
          <td>{{item.price}}</td>
          <td>{{item.accounts}}</td>
          <td>{{item.create_time}}</td>
          <td>
            <img :src="item.pic" />
          </td>
          <td>
            <img :src="item.quality_certificate">
          </td>
          <td>
            <img :src="item.quality_undertaking">
          </td>
          <td>
            <img :src="item.quality_inspection_report">
          </td>
          <td>
            <el-button type="text"
                       @click="regionDetails(item)">详情</el-button>
          </td>
          <td>

            <el-button type="success"
                       size="small"
                       @click="areaVisible=true,currentList=item">通过</el-button>
            <el-button type="danger"
                       size="small"
                       @click="reject(item,index)"
                       :loading="rejectLoading[index]">驳回</el-button>
          </td>
        </tr>
        <tr v-if="!(list && list.length>0)">
          <td :colspan="colspan">暂无数据</td>
        </tr>
      </table>
      <!-- 地区详情 -->
      <el-dialog title="地区详情"
                 center
                 :visible.sync='regionVisible'
                 width="40%">
        <ul class="region"
            v-if="regionList && regionList.length>0">
          <li v-for="(item,index) in regionList"
              :key="index">
            {{item.name}}
            <ul v-if="item.children"
                class="son">
              <li v-for="(sonitem,i) in item.children"
                  :key="i">
                {{sonitem.name}}
                <ul v-if="sonitem.children"
                    class="grandson">
                  <li v-for="(grandson,key) in sonitem.children"
                      :key="key">{{grandson.name}}</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </el-dialog>
      <!-- 选择区域 -->
      <el-dialog title="通过"
                 :visible.sync='areaVisible'
                 center
                 @close='()=>{
                       $refs.ruleForm.resetFields()
                 }'>
        <div class="SelectArea">
          <el-form :model="listQuery"
                   label-width="100px"
                   :rules="rules"
                   ref="ruleForm">
            <el-form-item label="活动名称："
                          prop="activity_name">
              <el-input placeholder="请输入活动名称"
                        v-model="listQuery.activity_name" />
            </el-form-item>
            <el-form-item label="身份："
                          prop="identity">
              <el-radio-group v-model="listQuery.identity">
                <el-radio label="1">保险</el-radio>
                <el-radio label="2">邦保养</el-radio>
                <el-radio label="3">会员</el-radio>
                <el-radio label="4">老兵</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动日期："
                          prop="date">
              <el-date-picker v-model="listQuery.date"
                              type="daterange"
                              value-format='yyyy-MM-dd'
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <!-- <el-tree :data="areaList"
                   show-checkbox
                   node-key="id"
                   ref="tree">
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>{{ data.name }}</span>

            </span>
          </el-tree> -->
        </div>
        <span slot="footer"
              class="dialog-footer">

          <el-button type="primary"
                     @click="through"
                     :loading='throughLoading'>通过</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="(e)=>{
                    page = e,
                    init()
                }"></paging>
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
      authList: [],
      threeAuthList: [],
      list: [],
      colspan: 0,  //合并的单元格
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'), //token令牌
      page: 0,
      pageCount: 0,
      detailList: [],
      currentList: {}, //当前所通过的数据
      areaVisible: false, //选择区域弹框显示状态
      money: 10000,  //质保金
      areaList: [], //区域列表
      regionVisible: false, //地区详情弹框状态
      regionList: [], //地区详情列表
      listQuery: {  //form 数据
        'activity_name': '', //活动名称
        identity: '1', //身份
        date: '',
      },
      rules: {  //form表单验证
        activity_name: { required: true, message: '请输入活动名称', trigger: 'blur' },
        identity: { required: true, message: '请选择身份', trigger: 'blur' },
        date: { required: true, message: '请选择活动日期', trigger: 'blur' },
      },
      throughLoading: false, //通过加载Loading
      rejectLoading: [], //驳回Loading
    }
  },

  methods: {
    async init () {
      try {
        const res = await this.$axios.post('admin/SmAudit/freeList', { token: this.token, page: this.page, status: 0, type: 2 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
        this.colspan = this.$refs.table.querySelectorAll('th').length  //根据th的数量来合并单元格
        this.$nextTick(() => {
          const ViewerRef = this.$refs.images
          res.data.data.list && Viewer(ViewerRef)
        })
      } catch (err) {
        throw (err)
      }
    },
    detail () {  //油品详情
      this.$nextTick(() => {
        const ViewerRef = this.$refs.images
        Viewer(ViewerRef)
      })
    },
    async regionDetails (item) {  //地区详情
      try {
        this.regionVisible = true
        const res = await this.$axios.post('admin/SmAudit/areaDetail', { token: this.token, area: item.area })
        this.regionList = res.data.data || []
      } catch (error) {
        throw (error)
      }
    },

    // async getArea (item) {  //获取区域列表
    //   try {
    //     this.currentList = item;
    //     this.areaVisible = true
    //     const res = await this.$axios.post('admin/SmAudit/area', { token: this.token, type: 2 })  //type 3油品 1滤芯 2活动产品
    //     this.areaList = res.data.data || []
    //   } catch (error) {
    //     throw (error)
    //   }
    // },
    // //通过审核
    // through (item, index) {
    //   let checkedArea = this.$refs.tree.getCheckedKeys(true)  //选中的区域
    //   if (checkedArea.length <= 10 && checkedArea.length > 0) {   // 最多选10个地区 
    //     this.$refs['ruleForm'].validate(async (valid) => {   //form表单验证
    //       if (valid) {
    //         try {
    //           this.throughLoading = true
    //           var [start_time = start_time ? start_time : '', end_time = end_time ? end_time : ''] = this.listQuery.date // start_time 活动开始时间   end_time 活动结束时间  
    //           const res = await this.$axios.post("admin/SmAudit/passFree", { token: this.token, sm_id: this.currentList.sm_id, id: this.currentList.id, area: this.currentList.area, activity_name: this.listQuery.activity_name, identity: this.listQuery.identity, start_time: start_time, end_time: end_time, area: this.currentList.area })
    //           this.throughLoading = false
    //           if (res.data.code == 1) {
    //             this.$message({ message: res.data.msg, type: 'success' })
    //             this.areaVisible = false
    //             this.init()
    //           } else {
    //             this.$message.error(res.data.msg)
    //           }
    //         } catch (error) {
    //           this.throughLoading = false
    //           throw (error)
    //         }
    //       } else {
    //         return false;
    //       }
    //     });

    //   } else {
    //     this.$message({ message: '请检查是否选择地区并且地区最多选10个,请调整完后重新通过', type: 'warning', duration: 5000 })
    //   }
    // },
    //驳回
    //通过审核
    through (item, index) {
      this.$refs['ruleForm'].validate(async (valid) => {   //form表单验证
        if (valid) {
          try {
            this.throughLoading = true
            var [start_time = start_time ? start_time : '', end_time = end_time ? end_time : ''] = this.listQuery.date // start_time 活动开始时间   end_time 活动结束时间  
            const res = await this.$axios.post("admin/SmAudit/passFree", { token: this.token, sm_id: this.currentList.sm_id, id: this.currentList.id, area: this.currentList.area, activity_name: this.listQuery.activity_name, identity: this.listQuery.identity, start_time: start_time, end_time: end_time, area: this.currentList.area })
            this.throughLoading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.areaVisible = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.throughLoading = false
            throw (error)
          }
        } else {
          return false;
        }
      });
    },
    reject (item, index) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading[index] = true
          const res = await this.$axios.post('admin/SmAudit/rejectFree', { token: this.token, sm_id: item.sm_id, reason: value, id: item.id })
          this.rejectLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
    },
    Auth () {  //权限列表
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
                if (arr[i].name == '活动产品审核') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '活动产品审核') {
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
.table img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.SelectArea {
  max-height: 400px;
  overflow: auto;
}
>>> .is-leaf + .el-checkbox .el-checkbox__inner {
  display: inline-block;
}
>>> .el-checkbox .el-checkbox__inner {
  display: none;
}
.prompt {
  color: red;
  margin: 10px 0;
}
.region {
  height: 300px;
  overflow: auto;
}
.region > li {
  width: 50%;
  margin-bottom: 30px;
}

.region .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.region .son li {
  display: block;
}

.region .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}
.region .grandson li {
  display: block;
  margin-bottom: 7px;
}
</style>
