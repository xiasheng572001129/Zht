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
        <div class="quote-ele"><i></i>配送中心-活动产品审核-未审核</div>
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
        <el-table-column prop="company"
                         label="公司名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="phone"
                         label="联系电话"
                         align="center">
        </el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center">
        </el-table-column>
        <el-table-column label="地区个数"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="detailsVisible=true,areaDetails(scope.row)">{{scope.row.regions}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="申请时间"
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="materialVisible=true,aid=scope.row.aid,id=scope.row.id,throughDetails(scope.row)">详情</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="地区详情"
                 :visible.sync="detailsVisible"
                 center>
        <div v-if="arealist"
             class="details">
          <div>省 : {{arealist.proName}}</div>
          <div>市 : {{arealist.cityName}}</div>
          <div>
            区/县 :
            <span v-for="(item,index) in arealist.countyName"
                  :key="index">{{item}}、</span>
          </div>
        </div>
      </el-dialog>
      <div ref="container">
        <!--查看详情对话框-->
        <el-dialog title="物料配给-详情"
                   class='details'
                   :visible.sync="materialVisible"
                   @close='close'
                   center>
          <div class="details_box">
            <div class="details_content">
              <div class="youpin">
                <div class="details_content-abs">

                  <el-form label-position="left"
                           style="margin-left:58px;padding-right:58px;box-sizing: border-box;">
                    <el-form-item v-show='detailsData.type==1'>
                      <el-radio-group v-model="types">
                        <el-radio :label="1">倒库</el-radio>
                        <el-radio :label="2">基数</el-radio>
                      </el-radio-group>

                    </el-form-item>

                    <el-form-item label="物料配给/组"
                                  v-show="types==2">

                    </el-form-item>
                    <el-form-item v-show="types==2 ">
                      <div class="progress">
                        <div :class="['progress-item',active[index]]"
                             @click="CurrentGroup=index + 1,Selection(index + 1)"
                             v-for="(item,index) in  materialGroup"
                             :key="index">
                          <p>{{item}}</p>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="省 : "
                                  v-if="detailsData && detailsData.area">
                      {{detailsData.area.proName}}
                      <el-form-item label="市 : ">
                        {{detailsData.area.cityName}}
                      </el-form-item>
                      <el-form-item label="区/县 : ">
                        <div v-if="isArray">
                          <span v-for="(item,index) in detailsData.area.countyName"
                                :key="index">{{item}}、</span>
                        </div>
                        <div v-else>
                          {{detailsData.area.countyName}}
                        </div>
                      </el-form-item>
                    </el-form-item>
                  </el-form>
                  <div>
                  </div>
                </div>
              </div>
              <div>

                <ul class="right">
                  <li>
                    <div>供应商</div>
                    <div class="right_border-bottom">
                      {{detailsData.sm_company}}
                    </div>
                  </li>
                  <li>
                    <div>配送费元/升</div>
                    <div class="right_border-bottom">
                      <input type="text"
                             v-model="detailsData.delivery_fee">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="Reject"
                       :loading="rejectLoading"
                       type="danger">驳回</el-button>
            <el-button type="primary"
                       @click="adopt"
                       :loading="adoptLoading">通过</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 分页 -->
      <div :class="list && list.length<=7?'page-nav':'page_center'"
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
import detailsDialog from "@/components/Dialog/Dialog";
import RegionDialog from "@/components/Dialog/RegionDialog"
import Viewer from '@/utils/Viewer';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      curId: 0,
      thCurId: 0,
      threeAuthList: [],
      authList: [],
      detailsVisible: false,
      arealist: [],  //区域列表
      detailsList: [],
      regionState: 1,
      materialVisible: false, //通过详情状态弹框
      active: ['active'], //当前选中的物料配给/组
      materialGroup: [150, 300, 600, 1200],  //物料配给/组列表
      materielDetails: [],
      detailsData: {}, //详情列表
      types: 1, // 1倒库 2基数
      CurrentGroup: 1, //物料组 默认1组
      adoptLoading: false, //通过loading
      rejectLoading: false, //驳回loading
    }
  },
  computed: {
    isArray () {
      return this.detailsData.area.countyName instanceof Array
    }
  },
  components: {
    detailsDialog,
    RegionDialog
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentActivity/index', { token: this.token, page: this.page, status: 0, audit_status: 0, type: 2 })
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
    },
    //地区详情
    async areaDetails (row) {
      try {
        const res = await this.$axios.post('admin/AgentAuditList/showArea', { token: this.token, aid: row.aid, id: row.id })
        this.arealist = res.data.data || []
      } catch (error) {
        throw (error)
      }
    },
    //通过详情
    async throughDetails (row) {
      try {
        const res = await this.$axios.post("admin/AgentActivity/filterDetail", { token: this.token, status: 0, product_type: 2, aid: row.aid, id: row.id })
        this.detailsData = res.data.data || {} //详情列表
        this.types = res.data.data.type  // 1倒库 2基数
      } catch (error) {
        throw (error)
      }
    },
    Selection (length) { //物料组选择
      this.CurrentGroup = length //选择物料组
      let item = []
      for (let i = 0; i < length; i++) {
        item.push('active')
      }
      this.active = item

    },
    Reject () {  //驳回
      this.$prompt('请输入驳回理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '驳回理由不能为空'
      }).then(async ({ value }) => {
        try {
          this.rejectLoading = true
          const res = await this.$axios.post('admin/AgentActivity/reject', {
            token: this.token,
            aid: this.detailsData.aid,
            id: this.detailsData.id,
            reason: value
          })
          this.rejectLoading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.materialVisible = false
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.$message.error('接口报错,请检查')
          this.rejectLoading = false
          throw (error)
        }
      }).catch(() => { });
    },
    adopt () {  //通过
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          let { sm_id, aid, id, delivery_fee, product_type, types, number, old_aid, old_cancel_id: cancel_id } = Object.assign(this.detailsData, { product_type: 2, types: this.types, number: this.types == 2 && this.detailsData.type == 2 ? this.CurrentGroup : '' })  // sm_id 供应商id  aid 中心库id  delivery_fee 配送费  product_type 1机滤 2活动产品  types 1倒库 2基数   number 物料组数  倒库不需要物料组数  
          console.log('123')
          this.adoptLoading = true
          const res = await this.$axios.post('admin/AgentActivity/adopt',
            { token: this.token, gid: sm_id, aid, id, delivery_fee, type: types, number, old_aid: this.types == 2 ? '' : old_aid, cancel_id: this.types == 2 ? '' : cancel_id, product_type }
          )
          this.adoptLoading = false
          if (res.data.code == 1) {
            this.materialVisible = false
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.adoptLoading = false
          throw (error)
        }
      }).catch(() => { });
    },
    close () {  //弹框关闭 清除默认数据
      this.CurrentGroup = 1
      this.active = ['active']
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
.active {
  background-color: #409eff !important;
  color: #409eff;
}
.details > div {
  margin: 10px 0;
}
.progress {
  /* background-color: #ebeef5; */
  height: 10px;
  /* border-radius: 10px; */
  position: relative;

  margin: 20px 0 10px 0;
}
.progress_bg:after {
  display: block;
  content: "";
  clear: both;
}

.progress-item {
  width: 50px;
  height: 100%;
  float: left;
  position: relative;
  background-color: #ebeef5;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
}

.progress-item > p {
  position: absolute;
  top: -35px;
  text-align: center;
  width: 100%;
}
.ApplyList >>> .el-radio {
  margin-right: 10px;
}

>>> .el-table__body-wrapper table th {
  padding: 0;
}
>>> .el-table__body-wrapper table td {
  font-size: 12px;
}
.center {
  text-align: center;
}
.name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}

.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}

.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.shuju .son li {
  display: block;
}

.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}

.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}
.details_content:after {
  display: block;
  content: "";
  clear: both;
}
.details >>> .el-dialog__header {
  text-align: center !important;
}
.details >>> .el-dialog__body {
  overflow: inherit !important;
}
.details_content {
  width: 100%;
  display: flex;
  justify-content: space-around;

  /*border-right: 1px dashed #04BBFC;*/
}
.details_content > div {
  flex: 1;
}

.details_content > div:last-child {
  border-left: 1px dashed #04bbfc;
}

.right {
  display: inline-block;
  padding-left: 6%;
  margin-left: 8px;
}
.right li {
  box-sizing: border-box;
  padding: 16px 80px;
  margin: 28px 0;
  white-space: nowrap;
  min-width: 320px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);
}
.right_border-bottom {
  border-bottom: 1px solid #ccc;
}
.right_border-bottom input {
  border: none;
  height: 25px;
}
.Reject_Reason {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 9px;
}

.Reject_Reason > div:last-child {
  border-bottom: 1px solid #ccc;
  width: 70%;
  margin-left: 10px;
}
.Reject_Reason input {
  border: none;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.details_box {
  height: 600px;
  overflow: auto;
}
.details_box a {
  color: #04bbfc;
}
.details_box-btn {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.details_box-btn > button:first-child {
  margin-right: 200px;
}
.textPrompt {
  padding-left: 58px;
  box-sizing: border-box;
  color: red;
  font-size: 15px;
}

.Tips {
  color: red;
  margin-left: 8%;
}
.service:after {
  display: block;
  content: "";
  clear: both;
}
.service {
  height: 350px;
  overflow: auto;
}
.service > div {
  float: left;
  width: calc(100% / 3);
  height: 100%;
  text-align: center;
}
.service > div > p {
  line-height: 30px;
}
.radio {
  display: block;
  text-align: left;
  margin: 10px 0;
}
.radio >>> .el-radio__input {
  margin-left: calc(50% - 40px);
}
>>> .el-radio {
  margin-left: 0 !important;
}

.service > div {
  border-right: 1px solid #ccc;
}
.service > div:last-child {
  border: none;
}
.right >>> .el-input__inner,
.right >>> .el-select .el-input.is-focus .el-input__inner {
  border: solid 1px white;
}
.youpin .el-form-item {
  margin-bottom: 0;
}
</style>
