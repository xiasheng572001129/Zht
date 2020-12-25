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
        <div class="quote-ele"><i></i>配送中心-油品审核-未审核</div>
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
                         label="配送中心名称"
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
                   @close='close'>
          <div class="details_box">
            <div class="details_content">
              <div class="youpin">
                <div class="details_content-abs">

                  <el-form label-position="left"
                           style="margin-left:58px;padding-right:58px;box-sizing: border-box;">
                    <el-form-item v-show='type==1'>
                      <el-radio-group v-model="choose">
                        <el-radio :label="1">倒库</el-radio>
                        <el-radio :label="2">基数</el-radio>
                      </el-radio-group>

                    </el-form-item>
                    <el-form-item label="物料配给/组"
                                  v-show="type==2 || choose==2">

                    </el-form-item>
                    <el-form-item v-show="type==2 || choose==2">
                      <div class="progress">
                        <div :class="['progress-item',active[index]]"
                             @click="CurrentGroup=index + 1,Selection(index + 1)"
                             v-for="(item,index) in  materialGroup"
                             :key="index">
                          <p>{{item}}</p>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item>

                      <el-popover placement="right"
                                  width="450"
                                  trigger="click"
                                  @show='details()'>
                        <el-button slot="reference"
                                   type="primary"
                                   size="mini">物料详情</el-button>
                        <div style="text-align:center;padding-bottom:10px">详情</div>
                        <el-table :data="choose==2 || type==2 ?  materielDetails :  old_detail"
                                  border
                                  size='mini'>
                          <el-table-column label="物料名称"
                                           align="center"
                                           prop="materiel"
                                           style="font-size:10px">
                          </el-table-column>
                          <el-table-column align='center'
                                           label="库存"
                                           prop="ration"
                                           v-if='type==1 && choose==1'></el-table-column>
                          <el-table-column align='center'
                                           label="剩余库存"
                                           prop="materiel_stock"
                                           v-if='type==1 && choose==1'></el-table-column>
                          <el-table-column label="件"
                                           align="center"
                                           prop="num"
                                           v-if='type==2 || choose==2 '>

                          </el-table-column>
                        </el-table>
                      </el-popover>
                      <!-- <el-button type="primary"
                               size="mini">增加配给</el-button> -->
                    </el-form-item>
                    <!-- <el-form-item label="查看区域 : ">

                      <el-radio v-model="regionState"
                                @change="detailArea"
                                :label="7">市级</el-radio>
                    </el-form-item> -->
                    <el-form-item label="省 : ">
                      {{regionList.proName}}
                    </el-form-item>
                    <el-form-item label="市 : ">
                      {{regionList.cityName}}
                    </el-form-item>
                    <el-form-item label="区/县 : ">

                      <div v-if="isArray">
                        <span v-for="(item,index) in regionList.countyName"
                              :key="index">{{item}}、</span>

                      </div>
                      <div v-else>
                        {{regionList.countyName}}
                      </div>

                    </el-form-item>
                  </el-form>
                  <div>
                  </div>
                </div>
              </div>
              <div>
                <!-- <div v-show="
                         isReadonly"
                     class='Tips'>*此运营商已分配利润比例不需重新分配</div> -->
                <ul class="right">

                  <!-- <li>
                    <div>运营商利润(百分比)
                      <span class="color-red"
                            style="margin-left:20px">*最高15%</span>
                    </div>
                    <div class="right_border-bottom">
                      <input :readonly="isReadonly"
                             max="15"
                             type="number"
                             v-model="profit">
                    </div>
                  </li>
                  <li>
                    <div>
                      <div>推荐人身份: {{detailsList.share_type}}</div>
                      <div class="name">推荐人名称: {{detailsList.share_name}}</div>
                    </div>
                  </li> -->
                  <li>
                    <div>供应商</div>
                    <div class="right_border-bottom">
                      <el-select v-model="gid"
                                 placeholder="请选择"
                                 v-if="prosyList.length">

                        <el-option v-for="(item, index) in prosyList"
                                   :key="index"
                                   :value="item.id"
                                   :label="item.name">

                        </el-option>
                      </el-select>
                      <div v-else>
                        {{prosyList.name}}
                      </div>
                    </div>
                  </li>
                  <!-- <li>
                    <div>送货延迟罚款</div>
                    <div class="right_border-bottom">
                      <input type="text"
                             v-model="delay_fine">
                    </div>
                  </li> -->
                  <li>
                    <div>配送费元/升</div>
                    <div class="right_border-bottom">
                      <input type="text"
                             v-model="prosyList.delivery_fee"
                             disabled>
                    </div>
                  </li>
                  <!-- <li>
                    <div>市运营中心电话</div>
                    <div class="right_border-bottom">
                      <input type="text"
                             v-model="CityPhone">
                    </div>
                  </li> -->
                  <!-- <li>
                    <div>
                      <p>机滤补贴</p>
                      <el-radio-group v-model="core_type">
                        <el-radio label="1">配送中心</el-radio>
                        <el-radio label="2">维修厂</el-radio>
                      </el-radio-group>
                    </div>

                    <div style="margin:10px 0"
                         v-if="core_type==1">
                      <p>滤芯补助费</p>
                      <div class="right_border-bottom">
                        <input type="text"
                               v-model="core_fee">
                      </div>
                    </div>

                  </li> -->
                  <!-- <li>
                    <div>维修厂工时费(百分比)</div>
                    <div class="right_border-bottom">
                      <input type="text"
                             :readonly="isReadonly"
                             v-model="shop_hours">
                    </div>
                  </li> -->
                </ul>
              </div>
            </div>
            <div class="Reject_Reason">
              <div>驳回理由:</div>
              <div>
                <input type="text"
                       placeholder='请输入驳回理由'
                       v-model="Reason">
              </div>
            </div>
            <div class="details_box-btn">
              <el-button type="danger"
                         danger
                         round
                         @click="Reject"
                         :loading="rejectLoading">驳回</el-button>
              <el-button type="primary"
                         round
                         @click="adopt"
                         :loading="adoptLoading">通过</el-button>
            </div>
            <!-- <div class="textPrompt">
              <p>注：1. 运营商首次配给时，输入框的值会均分到运营库以及授信库。</p>
              <p style="text-indent:30px;">2. 运营商后需增加配给时，输入框中的值会全部增加到授信库。</p>
            </div> -->
          </div>

          <!-- <Region-dialog :regionVisible="regionVisible"
                         @regionClose="regionClose"
                         :Province="Province"></Region-dialog> -->

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
      arealist: [],
      detailsList: [],
      regionState: 1,
      active: ['active'],
      materialGroup: [160, 320, 640, 1280],
      materielDetails: [],
      regionList: [],
      isReadonly: '',
      profit: '',
      prosyList: [],
      oneProsy: {},
      delay_fine: 200,
      shop_hours: '',
      Reason: '',
      adoptVisible: false,
      regionVisible: false,
      Province: '',
      CurrentGroup: 1,
      materialVisible: false,
      usecost: '',//支付凭证
      gid: '',
      aid: '',
      id: '',
      adoptLoading: false,
      rejectLoading: false,
      type: 0,
      old_aid: '',
      cancel_id: '',
      choose: 1, // 1倒库 2奇数
      old_detail: [],
      Type: '',
      delivery_fee: 3, //配送费
      CityPhone: '', //市运营中心电话
      core_type: "2",
      core_fee: 15,
    }
  },
  computed: {
    isArray () {
      return this.regionList.countyName instanceof Array
    }
  },
  components: {
    detailsDialog,
    RegionDialog
  },
  created () {
    this.init();
  },
  watch: {
    index () {
      this.init();
    },
    choose (val) {
      this.Type = val

    }

  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentAuditList/index', { token: this.token, page: this.page, status: 0, audit_status: 0 })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //地区详情
    async areaDetails (row) {
      try {
        const res = await this.$axios.post('admin/AgentAuditList/showArea', { token: this.token, aid: row.aid, id: row.id })
        this.arealist = res.data.data

      } catch (error) {
        throw (error)
      }
    },
    //通过详情
    async throughDetails (row) {
      try {
        const res = await this.$axios.post("admin/AgentAuditList/detail", { token: this.token, aid: row.aid, id: row.id })
        this.usecost = res.data.data.usecost
        this.type = res.data.data.type
        this.Type = res.data.data.type
        this.old_aid = res.data.data.old_aid
        this.cancel_id = res.data.data.old_cancel_id
        this.old_detail = res.data.data.old_detail || []
        this.CityPhone = res.data.data.phone || ''
        this.detailArea(row.id)
        this.selectAgent(row.id, row.aid)

      } catch (error) {
        throw (error)
      }
    },
    async details () {  //获取物料详情

      try {
        const res = await this.$axios.post('admin/AgentIncRation/commonOil', { token: this.token, number: this.CurrentGroup })
        this.materielDetails = res.data.data || []
      } catch (err) {

      }
    },
    Selection (length) {
      this.CurrentGroup = length //选择物料组
      let item = []
      for (let i = 0; i < length; i++) {
        item.push('active')
      }
      this.active = item

    },
    async detailArea (id) {  //查看用户区域
      try {
        const res = await this.$axios.post('admin/AgentIncRation/detailArea', { token: this.token, type: 1, id: id })
        this.regionList = res.data.data || []
      } catch (err) {
        throw (err)
      }
    },
    async selectAgent (id, aid) {  //供应商列表
      try {
        const res = await this.$axios.post('admin/AgentIncRation/selectAgent', { token: this.token, id: id, aid: aid })
        this.prosyList = res.data.data || [];
        console.log(this.prosyList)
        this.gid = this.prosyList && this.prosyList.id ? this.prosyList.id : this.prosyList[0].id
      } catch (error) {
        throw (error)
      }
    },
    Reject () {  //驳回
      if (!this.Reason) {
        this.$message.error('驳回理由不能为空')
        return;
      }
      this.$confirm('此操作将驳回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.rejectLoading = true
          const res = await this.$axios.post('admin/AgentAuditList/reject', { token: this.token, reason: this.Reason, aid: this.aid, id: this.id })
          this.rejectLoading = false
          if (res.data.code == 1) {
            this.materialVisible = false
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.rejectLoading = false
          throw (error)
        }
      }).catch(() => { });
    },
    adopt () {
      this.gid = this.prosyList.id ? this.prosyList.id : this.gid
      if (!(this.gid)) {
        this.$message.error('供应商不能为空')
        return;
      }
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.adoptLoading = true
          const res = await this.$axios.post('admin/AgentAuditList/adopt', { token: this.token, gid: this.gid, number: this.choose == 2 || this.type == 2 ? this.CurrentGroup : '', aid: this.aid, type: this.Type, id: this.id, old_aid: this.type == 1 && this.old_aid, cancel_id: this.type == 1 && this.cancel_id, delivery_fee: this.prosyList.delivery_fee, cid: this.regionList.cityId })
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
      this.gid = ''
      this.delay_fine = 200
      this.Reason = ''
      this.type = ''
      this.Type = ''
      this.old_aid = ''
      this.cancel_id = ''
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
  width: 10%;
  height: 100%;
  float: left;
  position: relative;
  background-color: #ebeef5;
  border-radius: 5px;
  cursor: pointer;
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
