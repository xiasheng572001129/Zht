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
        <div class="quote-ele"><i></i>供应商-油品审核-未审核</div>
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
          <th>质量保证书</th>
          <th>质量承保书</th>
          <th>质检报告</th>
          <th>地区</th>
          <!-- <th>申请状态</th> -->
          <th>申请时间</th>
          <th>操作</th>
        </tr>
        <tr v-for='(item,index) in list'
            :key="index">
          <td>{{item.sm_name}}</td>

          <td>
            <img :src="item.quality_certificate"
                 ref='images'>
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
            <el-button type="text"
                       @click="regionDetails(item)">详情</el-button>
          </td>
          <!-- <td>{{item.update == 0 ? '首次' : '二次修改'}}</td> -->
          <td>{{item.create_time}}</td>
          <td>
            <el-button type="primary"
                       size="small"
                       @click="detailList=item.detail,detailVisible=true,detail()">详情</el-button>
            <el-button type="success"
                       size="small"
                       @click="through(item,index)"
                       :loading='loading[index]'>通过</el-button>
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
      <!-- 详情 -->
      <el-dialog title="详情"
                 center
                 :visible.sync="detailVisible">
        <table class="table">
          <tr>
            <th>油品名称</th>
            <th>总后台的油品名称</th>
            <th>油品介绍</th>
            <th>升数</th>
            <th>结算价</th>
            <th>型号</th>
            <th>油品图片</th>
          </tr>
          <tr v-for='(item,index) in detailList'
              :key="index">
            <td>
              {{item.oil_name}}
            </td>
            <td>
              {{item.little_name}}
            </td>
            <td>
              <el-popover placement="top-start"
                          title="油品介绍"
                          width="200"
                          trigger="hover"
                          :content="item.about">
                <el-button slot="reference"
                           type="text"
                           class="ellipsis"
                           style="width:100px">{{item.about}}</el-button>
              </el-popover>
            </td>
            <td>
              {{item.rise}}
            </td>
            <td>
              {{item.price}}
            </td>
            <td>
              {{item.standard}}
            </td>
            <td>
              <img :src="item.cover"
                   ref="images">
            </td>
          </tr>
        </table>
      </el-dialog>
      <!-- 地区详情 -->
      <el-dialog title="地区详情"
                 center
                 :visible.sync='areaVisible'
                 width="40%">
        <ul class="region"
            v-if="areaList && areaList.length>0">
          <li v-for="(item,index) in areaList"
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
      <!-- <el-dialog title="选择区域"
                 :visible.sync='areaVisible'
                 center>
        <el-tree :data="areaList"
                 show-checkbox
                 node-key="id"
                 ref="tree">
          <span class="custom-tree-node"
                slot-scope="{ node, data }">
            <span>{{ data.name }}</span>

          </span>
        </el-tree>
        <span slot="footer"
              class="dialog-footer">
          <h3 class="prompt">质保金（金额）：{{$refs.tree && $refs.tree.getCheckedKeys(true).length * money}}元</h3>
          <el-button type="primary"
                     @click="through"
                     :loading='throughLoading'>通过</el-button>
        </span>
      </el-dialog> -->

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
      detailVisible: false, //详情弹框状态
      currentList: {}, //当前所通过的数据
      money: 10000,  //质保金
      areaVisible: false, //选择区域弹框显示状
      areaList: [], //区域列表
      loading: [],
      throughLoading: false, //通过加载Loading
      rejectLoading: [], //驳回Loading
    }
  },

  methods: {
    async init () {
      try {
        const res = await this.$axios.post('admin/SmAudit/smOilUnAuditList', { token: this.token, page: this.page, status: 0 })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
        this.colspan = this.$refs.table.querySelectorAll('th').length  //根据th的数量来合并单元格
        this.$nextTick(() => {
          const ViewerRef = this.$refs.images
          res.data.data && Viewer(ViewerRef)
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
        this.areaVisible = true
        const res = await this.$axios.post('admin/SmAudit/areaDetail', { token: this.token, area: item.area })
        this.areaList = res.data.data || []
      } catch (error) {
        throw (error)
      }
    },
    // whetherUpdate (item, index) {  //是否修改修改过信息
    //   this.currentList = item;
    //   if (item.update == 1) {  // update 1 修改过信息,不需要添加地区和质保金,可直接通过     0没有修改过信息添加地区和质保金
    //     this.$confirm(' 是否通过?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.passOil({}, this.loading[index])
    //     }).catch(() => { });
    //   } else {
    //     this.getArea(item)
    //   }
    // },
    // async getArea (item) {  //获取区域列表
    //   try {
    //     this.areaVisible = true
    //     const res = await this.$axios.post('admin/SmAudit/area', { token: this.token, type: 3 })  //type 3油品 1滤芯 2活动产品
    //     this.areaList = res.data.data || []
    //   } catch (error) {
    //     throw (error)
    //   }
    // },
    // //通过审核  
    // async through (item, index) {
    //   let checkedArea = this.$refs.tree.getCheckedKeys(true)  //选中的区域
    //   if (checkedArea.length <= 10 && checkedArea.length > 0) {   // 最多选10个地区 
    //     this.passOil({ money: this.money * checkedArea.length, area: checkedArea.join(',') }, this.throughLoading)
    //   } else {
    //     this.$message({ message: '请检查是否选择地区并且地区最多选10个,请调整完后重新通过', type: 'warning', duration: 5000 })
    //   }
    // },
    // async passOil (params, loading) {  //油品审核
    //   try {
    //     loading = true
    //     const res = await this.$axios.post("admin/SmAudit/passOil", Object.assign({}, { token: this.token, sm_id: this.currentList.sm_id, update: this.currentList.update }, params))
    //     loading = false
    //     if (res.data.code == 1) {
    //       this.$message({ message: res.data.msg, type: 'success' })
    //       this.areaVisible = false
    //       this.init()
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   } catch (error) {
    //     loading = false
    //     throw (error)
    //   }
    // },

    through (item, index) {  //通过审核,填写质保金
      this.$prompt('请输质保金', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '质保金不能为空'
      }).then(async ({ value }) => {
        try {
          this.loading[index] = true
          const res = await this.$axios.post('admin/SmAudit/passOil', { token: this.token, sm_id: item.sm_id, money: value, area: item.area })  //money 质保金
          this.loading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.loading[index] = false
          throw (error)
        }
      }).catch(() => { });
    },


    //驳回
    reject (item, index) {
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading[index] = true
          const res = await this.$axios.post('admin/SmAudit/rejectOil', { token: this.token, sm_id: item.sm_id, reason: value, update: item.update })
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
                if (arr[i].name == '油品审核') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '油品审核') {
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
