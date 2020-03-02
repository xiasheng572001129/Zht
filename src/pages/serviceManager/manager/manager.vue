<template lang="html">
  <div class="">
    <herderBar></herderBar>
    <div class="search">
      <el-select placeholder="请选择" v-model="selectData">
        <el-option label='全部' value="0"></el-option>
        <el-option label='投诉期' value="1"></el-option>
        <el-option label='区域加盟' value="2"></el-option>
        <el-option label="业务合作" value="3"></el-option>
      </el-select>
      <el-input placeholder="请输入搜索的名称" class="input" v-model="name"></el-input>
      <el-button  type="primary" class="search_btn" @click="search">搜索</el-button>
    </div>
    <div class="">
      <table class="table">
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>权限区域</th>
          <th>投诉(次)</th>
          <th>收益(元)</th>
          <th>提现(元)</th>
          <th>详情</th>
          <th>推荐人</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in dataList">
          <td class="name" >
            <a href="javascript:;" class='col-1EA' @click="detailsDialogVisible=true,SeeDetails(item.sm_id)">{{item.name}}</a>
          </td>
          <td>{{item.phone}}</td>
          <td>
            <a href="javascript:;" class='col-1EA' @click="regionDialogVisible=true,regionDialog(item.sm_id)">
              查看
            </a>
          </td>
       
          <td>{{item.compSize>0?item.compSize:0}}</td>
          <td>
            <a href="javascript:;" class='col-1EA' @click="ProfitDialog(item.sm_id)">
              {{item.money}}
            </a>
          </td>
          <td>
            <a href="javascript:;" class='col-1EA' @click="PutForwardDialog(item.sm_id)">
              {{item.put>0?item.put:0}}
            </a>
          </td>
          <td>
            <a href="javascript:;" class="col-1EA"@click="Divideinto(item.sm_id)">查看</a>
          </td>
         
          <td href="javascript:;" class='col-1EA'>
             {{item.yjr}}
          </td>
          <td class="Conduct">
            <a href="javascript:;" class="col-0ACD00" @click="SetupDialog(item.id)">设置</a>
            <a href="javascript:;" class="col-1EA" @click="sm_id=item.sm_id,suspendData(item)">暂停</a>
            <a href="javascript:;" class="col-FA644B" @click="cancelregion(item.id)">取消</a>
          </td>
        </tr>
      </table>
      <el-dialog class='regionDialog' title="权限区域" :visible.sync="regionDialogVisible" width="34%" center @close='close'>
            <div class='cft region'>
                <div class='left'>
                   <p v-for='(item,index) in reasonData' :class='{"activeClass":regionIndex==index}'  @click='regionIndex=index'>{{`${item.name}${item.son[0].name}`}}</p>
                
                </div>
                <div class='right'>
                    <p v-if='reasonData[regionIndex] && reasonData[regionIndex].son &&  reasonData[regionIndex].son[0] && reasonData[regionIndex].son[0].son'>
                       <span v-for='item in reasonData[regionIndex].son[0].son'>{{item.name}}、</span>
                    </p>
                    <p v-else>暂无区/县</p>
                    <p class='voucher'  v-if='reasonData[regionIndex] && reasonData[regionIndex].son'>
                        <img ref='enlarge' v-for='(item,index) in reasonData[regionIndex].son[0].voucher' :src='item'  @click='enlarge(index)'>
                    </p> 
                </div>
            </div>
           
        </el-dialog>
      <!--收益弹框-->
      <el-dialog title="收益" :visible.sync="ProfitDialogVisible" width="400px" center>
             <div>
                 <table class="table ProfitTable">
                    <tr>
                      <td>供应奖励:</td>
                      <td>{{ProfitDatalist.ubi}}</td>
                    </tr>
                    <tr>
                      <td>开发奖励:</td>
                      <td>{{ProfitDatalist.exp}}</td> 
                    </tr>
                    <tr>
                      <td>管理奖励:</td>
                      <td>{{ProfitDatalist.admin}}</td>
                    </tr>
                   <tr>
                     <td>推荐奖励:</td>
                     <td>{{ProfitDatalist.share}}</td>
                   </tr>
                   <tr class='Total'>
                     <td class='col-1EA'>合计:</td>
                     <td class='col-1EA'>{{ProfitDatalist.sum}}</td>
                   </tr>
                 </table>
             </div>
      </el-dialog>
      <!--提现弹框-->
      <el-dialog title="往期提现" class="regionDialog" :visible.sync="PutforwardDialogVisible" width="540px" center>
        <table class='table '>
          <tr class='table_th'>
            <td>提现金额</td>
            <td>申请时间</td>
            <td>通过时间</td>
          </tr>
          <tr v-for="item in PutforwardDataList">
              <td>{{item.money}}</td>
              <td>{{item.create_time}}</td>
              <td>{{item.audit_time | datetime}}</td>
          </tr>
        </table>
            <span class='dialog-footer' slot='footer'>
                  <paging :page-count="PutforwarPageCount"   :page="PutforwarPage" @index="PutforwarNext"></paging>
            </span>
      </el-dialog>
      <!--详情弹框  -->
      <el-dialog title="个人信息" :visible.sync="detailsDialogVisible" width="400px" center>
        <div class='Head_portrait'>
          <img :src="detailsDataList.head_pic" >
        </div>
        <div class="content">
          <div>
            <span>姓名:</span>
            <span>{{detailsDataList.name}}</span>
          </div>
          <div>
            <span>电话:</span>
            <span>{{detailsDataList.phone}}</span>
          </div>
          <div>
            <span>开户名:</span>
            <span>{{detailsDataList.bank_name}}</span>
          </div>
          <div>
            <span>开户行:</span>
            <span>{{detailsDataList.bank_code}}</span>
          </div>
          <div>
            <span>分行:</span>
            <span>{{detailsDataList.bank_branch}}</span>
          </div>
          <div>
            <span>卡号:</span>
            <span>{{detailsDataList.account}}</span>
          </div>
          <div>
            <span>可提现余额:</span>
            <span>{{detailsDataList.money}}</span>
          </div>
          <div>
            <span>推荐人:</span>
            <span>{{detailsDataList.share_name}}</span>
          </div>
          <div>
            <span>库存:</span>
            <span>{{detailsDataList.stock}}</span>
          </div>
        </div>
      </el-dialog>
      <!--售卡分成  -->
      <el-dialog title="售卡分成" class='Divideinto' @close='close'  :visible.sync="DivideintoVisible"  center>
        <div >
           <table>
               <tr>
                 <th>车牌号</th>
                 <th>品牌车型</th>
                 <th>售卡时间</th>
                 <th>售卡金额</th>
                 <th>获得分成</th>
               </tr>
               <tr v-for='(item,index) of SalecardList' :key="index">
                 <td>{{item.plate}}</td>
                 <td>{{item.cate_name}}</td>
                 <td>{{item.sale_time}}</td>
                 <td>{{item.card_price}}</td>
                 <td>{{item.money}}</td>
               </tr>
           </table>
        </div>
        <span class='dialog-footer' slot='footer'>
          <div class="page_center">
            <paging :page-count="cardCount"   :page="cardPage" @index="cardChange"></paging>
          </div>
        </span>
      </el-dialog>
      <!--分佣设置弹框  -->
      <el-dialog title="分佣设置" class="SetupDialog Setup" :visible.sync="SetupDialogVisible" width="540px" @close="SetupClose" center>
            <div class='SetupContent'>
              
              <div class='right'>
                    <table class='table SetupTable'>
                         <tr>
                           <td>管理奖励分成 </td>
                           <td>
                              <input class=' SetupInput' v-model='SetupDataList.sm_profit'/>
                              <span>%</span>
                           </td>
                         </tr>
                      <tr>
                        <td>供应奖励</td>
                        <td>
                          <input class=' SetupInput' v-model='SetupDataList.ubi_profit'/>
                          <span>元</span>
                        </td>
                      </tr>
                       
                      <tr>
                        <td>开发奖励</td>
                        <td class='rel'>
                          <el-switch @change="switchchange()"  style="display: block"  :active-text="DevelopmentVal?'已开通':'已关闭'" active-color="#0ACD00" inactive-color='#AAAAB4'  v-model="switchState.exp_raw"  :width='switchW' ></el-switch>
                        </td>
                      </tr>
                      <tr>
                        <td>供应奖励</td>
                        <td class='rel'>
                          <el-switch @change="switchchange1()"  style="display: block"  :active-text="DevelopmentVal?'已开通':'已关闭'" active-color="#0ACD00" inactive-color='#AAAAB4'  v-model="DevelopmentVal"  :width='switchW' ></el-switch>
                        </td>
                      </tr>
                      <tr>
                        <td>管理奖励</td>
                        <td class='rel'>
                          <el-switch @change="switchchange2()"  style="display: block"  :active-text="AdminVal?'已开通':'已关闭'" active-color="#0ACD00" inactive-color='#AAAAB4'  v-model="AdminVal"  :width='switchW' ></el-switch>
                        </td>
                      </tr>
                    </table>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="SetupModify">确定</el-button>
            </span>
      </el-dialog>
      <!--暂停分佣设置弹框 -->
      <el-dialog title="暂停分佣设置" class="suspendDialog Setup" :visible.sync="suspendDialogVisible" width="540px" @close="SetupClose" center>
        <div class='SetupContent'>
         
          <div class='right'>
            <table class='suspendTable'>
              <tr>
                <td>
                   <span>供应奖励</span>
                  <input class=' SetupInput' v-model="suspendcurrentData.ubi_time" />
                  <span>天</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>开发奖励</span>
                  <input class=' SetupInput' v-model="suspendcurrentData.exp_time" />
                  <span>天</span>
                </td>
              </tr>
             
              <tr>
                <td>
                  <span>管理奖励</span>
                  <input class=' SetupInput' v-model="suspendcurrentData.admin_time"/>
                  <span>天</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="suspendModify">确定</el-button>
            </span>
      </el-dialog>
      <!--取消区域弹框-->
      <el-dialog title="取消区域" :visible.sync="cancelregionDialog" width="400px"  center @close="cancelClose">
            <table class='table cancelregionTab'>
                <tr v-for="item in cancelregionDataList">
                   <td>{{item.name}}</td>
                   <td><button :class="{cancelbg:item.is_exits==2}" :disabled="item.is_exits==2" @click="cancel(item)">{{item.is_exits==2?'已取消':'取消权限'}}</button></td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <paging :page-count="cancelpageCount"    :page="cancelpage" @index="cancelNext"></paging>
            </span>
            <el-dialog append-to-body title="取消理由" :visible.sync="reasonDialog" class="reason" width="400px" @close="reasonClose"  center>
              <div class='textarea'>
                  <el-form ref="form"  label-width="100px" >
                    <el-form-item label="请输取消理由:">
                      <el-input type="textarea" v-model='reason' :rows='4'  :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class='Tips' v-html='stock'></div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='SureCancel'>提交</el-button>
              </div>
            </el-dialog>
      </el-dialog>
      <!--分页组件-->
      <div class="page_center">
        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>
      </div>
    </div>
  </div>
</template>

<script>
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      token: window.sessionStorage.getItem("bbytoken"),
      name: '',//搜索的名字

      pageCount: 1,  //总页数,默认1
      page: 1,       //当前页
      regionPageCount: 1, //区域权限总页数,默认1
      regionPage: 1,//区域权限当前页数,默认1
      regionId: 1, //权限区域,当前id
      PutforwarPageCount: 1,//往期提现总页数,默认1
      PutforwarPage: 1,//往期提现当前页,默认1
      PutforwarID: 1,//往期提现,当前id
      SetupID: 1, //分佣设置,当前id
      cancelpageCount: 1,//取消区域总页数,
      cancelpage: 1,//取消区域当前页
      selectData: '0', //select数据
      dataList: [],
      regionDialogVisible: false, //权限区域弹出框
      ProfitDialogVisible: false, //收益弹框
      PutforwardDialogVisible: false,//往期提现弹框
      detailsDialogVisible: false,//查看详情弹框
      SetupDialogVisible: false,//分佣设置弹框
      suspendDialogVisible: false,//暂停分佣设置
      cancelregionDialog: false,//取消区域弹框
      DivideintoVisible: false,//售卡分成
      reasonDialog: false,//取消理由弹框
      regionDataList: {},//区域权限数据
      ProfitDatalist: {},//收益数据
      PutforwardDataList: {},//往期提现数据
      detailsDataList: {},//查看详情数据
      SetupDataList: {},//设置数据
      suspendList: {}, //暂停默认数据
      cancelregionDataList: {},//取消区域数据
      iscur: 0,//点击哪一个,哪一个变颜色
      currentData: {},
      suspendcurrentData: {},//暂停分佣,点击每一个,获取每一个的数据
      teamSwitchVal: "1", //团队奖励switch开关
      DevelopmentVal: true,//开发奖励开关
      taskVal: false,//任务奖励开关
      AdminVal: true,//管理奖励开关
      switchW: 75,//switch开关的宽
      teamActiveVal: '已关闭', //团队奖励switch开关显示的内容
      DevelopmentActiveVal: '已开通',//开发奖励奖励switch开关显示的内容
      taskText: '已关闭',//任务奖励switch开关显示的内容
      AdminText: '已开通',//管理奖励switch开关显示的内容,
      cancelId: 1,//取消区域,当前id
      reason: '',
      regionID: '',
      SalecardList: [],
      cardCount: 1,
      cardPage: 1,
      sm_id: '',
      reasonData: '',
      regionIndex: 0,
      area_county: '',
      switchTurnBoer: (state) => {
        return state ? true : false
      },
      switchTurnNum: (state) => {
        const data = typeof state == 'boolean' ? state ? 1 : 0 : state
        return data;
      },
      stockData: []
    }
  },
  watch: {
    name (newVal) {
      if (!newVal) {
        this.init()
      }
    },
    selectData (newVal) { //监听select发生改变时,获取当前值,通过当前值,进去查询

      var data = {
        status: newVal
      }
      this.init(data)
    }
  },
  computed: {

    switchState (state) {
      let data = this.SetupDataList;
      return {
        exp_raw: this.switchTurnBoer(data.exp_raw),
        admin_raw: this.switchTurnBoer(data.admin_raw),
        ubi_raw: this.switchTurnBoer(data.ubi_raw)
      }
    },
    stock () {
      let stock = this.stockData
      return stock ?
        `<p>物料配给${stock.ration},剩余库存${stock.stock}</p>
              <p>您确定要取消该区域吗?</p>
            `
        : ''
    }
  },
  methods: {

    //初始化数据奖励设置内容
    init (data) {

      var Data = {
        token: this.token,
        page: this.page,
        search: data ? data.name : '',
        ms_type: data ? data.ms_type : '',
        status: data ? data.status : ''
      }
      this.$axios.post('Smoc/list', Data).then(res => {
        if (res.data.code == 1) {
          this.dataList = res.data.data.list; //拿返回来的数据

          this.pageCount = res.data.data.rows  //拿取总页数
        } else {
          this.dataList = {}
          this.page = 1
          this.pageCount = 1
          layer.msg(res.data.msg, { time: 1000 }) //如果code不等于一代表,没有数据，提示暂无数据
        }
      }).catch(err => console.log(err))
    },

    /** 图片放大 */
    enlarge (index) {
      this.$nextTick(() => {
        const ViewerDom = this.$refs.enlarge[index]

        Viewer(ViewerDom)
      })
    },
    //搜索
    search () {

      var data = {
        name: this.name,
        ms_type: 1,
        status: this.selectData
      }
      this.init(data)
    },
    //点击权限区域,查看详情
    regionDialog (sm_id) {
      this.$axios.post('admin/Smoc/areaNum', {
        token: this.token,
        sm_id: sm_id,
        type: 1
      }).then(res => {
        if (res.data.code == 1) {
          this.reasonData = res.data.data;
        }
      }).catch(err => console.log(err))
    },
    //点击收益,查看详情
    ProfitDialog (sm_id) {
      this.ProfitDialogVisible = true
      this.ProfitData(sm_id) //调取ProfitData函数
    },
    //点击提现,查看详情
    PutForwardDialog (sm_id) {
      this.PutforwarID = sm_id
      this.PutforwardDialogVisible = true
      this.PutForwarData(sm_id)//调取PutForwarData函数
    },
    //点击查看个人信息
    SeeDetails (sm_id) {

      this.detailsData(sm_id)//调取detailsData函数
    },
    Divideinto (sm_id) {
      this.cardId = sm_id
      this.DivideintoVisible = true
      this.$axios.post('Smoc/getDiv', { token: this.token, sm_id: sm_id, type: 1, page: this.cardPage }).then(res => {
        if (res.data.code == 1) {
          this.SalecardList = res.data.data.list
          this.cardCount = res.data.data.rows
        }
      }).catch(err => console.log(err))
    },
    cardChange (e) {
      this.cardPage = e;
      this.Divideinto(this.cardId)
    },
    close () {
      this.SalecardList = []
      this.reasonData = []
      this.cardCount = 1
      this.cardPage = 1
      this.regionIndex = 0
    },
    //点击设置
    SetupDialog (id) {
      if (id == 666666) {
        layer.msg('该用户为业务合作身份')
        return;
      }

      this.SetupID = id
      this.SetupDialogVisible = true
      this.SetupData(id) //调取SetupData函数
    },
    //点击关闭设置弹框,清空数据
    SetupClose () {
      this.iscur = 0
    },
    //switch开关发生改变时
    switchchange () {

      this.SetupDataList.exp_raw = !this.SetupDataList.exp_raw

    },
    switchchange1 () {
      this.SetupDataList.ubi_raw = !this.SetupDataList.ubi_raw
    },
    switchchange2 () {
      this.SetupDataList.admin_raw = !this.SetupDataList.admin_raw
    },

    //确认修改
    SetupModify () {

      let data = this.SetupDataList;
      let newObj = {
        exp_raw: this.switchTurnNum(data.exp_raw),
        admin_raw: this.switchTurnNum(data.admin_raw),
        ubi_raw: this.switchTurnNum(data.ubi_raw),
        token: this.token
      }
      this.SetupModifyData(Object.assign(this.SetupDataList, newObj))
    },
    //点击暂停
    suspendDialog (id) {
      if (id == 666666) {
        layer.msg('该用户为业务合作身份')
        return;
      }
      this.suspendDialogVisible = true
      this.SetupData(id)
    },

    //点击确定,修改暂停分佣设置
    suspendModify () {

      this.suspendcurrentData['token'] = this.token
      var url = "pause",
        data = this.suspendcurrentData;
      if (this.iscur == 0) {
        this.suspendcurrentData['sm_id'] = this.sm_id

        url = "Allpause"
        data = this.suspendcurrentData
      }
      this.modifyMaid(url, data)
    },
    //点击取消
    cancelregion (sm_id) {
      if (sm_id == 666666) {
        layer.msg('该用户为业务合作身份')
        return;
      }
      this.cancelregionDialog = true
      this.cancelId = sm_id
      this.$axios.post('Smoc/calCent', { token: this.token, sm_id: sm_id, page: this.cancelpage }).then(res => {
        if (res.data.code == 1) {
          this.cancelregionDataList = res.data.data.list
          this.cancelpageCount = res.data.data.rows;
        } else {
          this.cancelregionDataList = {}
        }
      }).catch(err => console.log(err))
    },
    //点击取消权限
    cancel (item) {

      this.regionID = item.id
      this.$axios.post('admin/SmocList/cancelRation', { token: this.token, id: item.id, sm_id: item.sm_id }).then(res => {

        this.stockData = res.data.data


      })
      this.reasonDialog = true
    },
    //确定取消权限
    SureCancel () {
      if (!this.reason) {
        this.$message.error('请输入取消理由');
        return;
      }

      this.$axios.post('Smoc/calSa', { token: this.token, id: this.regionID, reason: this.reason, ration: this.stockData.ration, stock: this.stockData.stock }).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1000 }, (() => {
            this.reasonDialog = false
            this.cancelregion(this.cancelId)
          }))
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => console.log(err))

    },
    reasonClose () {
      this.reason = ''
    },
    cancelClose () {
      this.init()
    },

    /*操作数据-----------------------------------------------------------------*/
    //修改分佣设置，函数
    modifyMaid (url, data) {
      this.$axios.post('Smoc/' + url, data).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1000 })
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => console.log(err))
    },
    //暂停分佣设置数据,函数
    suspendData (data) {  //根据id去获取每个地区的数据
      this.suspendDialogVisible = true
      this.$axios.post('Smoc/checkPaus', { token: this.token, id: data.id }).then(res => {

        if (res.data.code == 1) {
          this.suspendcurrentData = res.data.data

        }
      }).catch(err => console.log(err))
    },
    //设置修改,函数
    SetupModifyData (data) {

      this.$axios.post('Smoc/upCent', data).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1000 }, (() => {

            this.SetupData(data.sm_id)
          }))
        }
      }).catch(err => console.log(err))
    },
    //获取设置默认值数据
    SetupData (id) {

      this.$axios.post('Smoc/upCheck', { token: this.token, sm_id: id }).then(res => {
        if (res.data.code == 1) {
          let data = res.data.data;
          data.forEach(element => {
            this.SetupDataList = element
          });
        }
      }).catch(err => console.log(err))
    },
    //查看详情数据,函数
    detailsData (sm_id) {
      this.$axios.post('Smoc/regDetail', { token: this.token, uid: sm_id }).then(res => {
        if (res.data.code == 1) {

          this.detailsDataList = res.data.data;
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => console.log(err))
    },
    //获取往期提现数据,函数
    PutForwarData (sm_id) {
      this.$axios.post('Smoc/dePut', { token: this.token, sm_id: sm_id, page: this.PutforwarPage }).then(res => {
        if (res.data.code == 1) {

          this.PutforwardDataList = res.data.data.list;
          this.PutforwarPageCount = res.data.data.rows;
        } else {
          this.PutforwardDataList = []
          this.PutforwarPageCount = 1
        }
      }).catch(err => console.log(err))
    },
    //获取收益数据,函数
    ProfitData (sm_id) {
      this.$axios.post('Smoc/prcList', { token: this.token, sm_id: sm_id }).then(res => {
        if (res.data.code == 1) {

          this.ProfitDatalist = res.data.data
        } else {
          this.ProfitDatalist = {
            admin: 0,
            exp: 0,
            item: 0,
            sum: 0
          }
        }
      }).catch(err => console.log(err))
    },
    //获取权限区域数据,函数
    regionData (id) {
      this.$axios.post('Smoc/jurList', { token: this.token, sm_id: id, page: this.regionPage }).then(res => {
        if (res.data.code == 1) {

          this.regionDataList = res.data.data.data
          this.regionPageCount = res.data.data.last_page
        } else {
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => console.log(err))
    },
    /*操作分页----------------------------------------------------------------------*/

    //首页,分页函数
    paging (e) {
      //把当前页赋值给page
      var data = {
        status: this.selectData
      }
      this.page = e;
      // 当前页发生改变时调取注册审核列表接口,重新渲染
      this.init(data)
    },
    //区域权限分页函数
    regionNext (e) {
      this.regionPage = e; //拿到当前页
      this.regionData(this.regionId) //当前页发生改变时,重新渲染数据
    },
    //往期提现,分页函数
    PutforwarNext (e) {
      this.PutforwarPage = e; //拿到当前页
      this.PutForwarData(this.PutforwarID) //当前页发生改变时,重新渲染数据
    },
    //取消区域分页函数
    cancelNext (e) {
      this.cancelpage = e;
      this.cancelregion(this.cancelId)
    }
  },
  mounted () {
    this.init()

  }
}
</script>

<style lang="css" scoped="scoped">
.activeClass {
  background-color: #1ea0ff;
  color: #fff;
}
.Divideinto >>> .el-dialog__body {
  padding: 0;
}
.enlarge > img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px;
}
.Divideinto table th {
  height: 50px;
  line-height: 50px;
}
.Divideinto > div {
  overflow: hidden;
  padding-bottom: 200px;
}
.search {
  margin: 15px 0 15px 40px;
  display: flex;
  align-items: center;
}
.search .input {
  width: 25.9%;
}
.Conduct > a {
  margin-left: 20px;
}
.name {
  width: 10%;
}
.table th {
  height: 50px !important;
  line-height: 50px !important;
}
/*权限区域弹框*/
.table_th > td {
  font-size: 14px !important;
  color: #383838 !important;
}
.regionTable > tr > td {
  font-size: 12px;
  color: #696969;
}
/*收益弹框*/
.ProfitTable > tr > td {
  padding: 0 10px;
}
.ProfitTable > tr > td:first-child {
  text-align: left;
}
.ProfitTable > tr > td:last-child {
  text-align: right;
}

.Total > td {
  border: none;
}
.Total > td:first-child {
  padding-left: 40px;
}
/*详情弹框头像*/
.Head_portrait {
  text-align: center;
}
.Head_portrait > img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
}
/*详情弹框内容*/
.content {
  margin-top: 40px;
  margin-bottom: 50px;
}
.content > div {
  padding: 12px 0;
  border-bottom: 1px solid #e6e6eb;
}
.content > div > span {
  display: inline-block;
  width: 49%;
}
.content > div > span:last-child {
  text-align: right;
}
.adopt {
  margin-right: 29px;
}
/*设置弹框*/
.SetupContent:after {
  display: block;
  content: "";
  clear: both;
}
.SetupContent {
  margin-left: 50px;
}
.SetupContent > div {
  float: left;
}
.letf_tab {
  height: 337px;
  overflow: auto;
  border-right: 1px solid #e6e6eb;
}
.letf_tab > div {
  padding-left: 20px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #e6e6eb;
  padding-right: 20px;
}

.SetupTable > tr > td {
  border: none;
  text-align: left;
}
.SetupTable > tr > td:first-child {
  width: 120px;
}
.SetupTable > tr > td {
}
.SetupInput {
  width: 120px;
  height: 32px;
  text-align: center;
  background: rgba(245, 245, 250, 1);
  border: 1px solid rgba(230, 230, 235, 1);
}
.select {
  width: 120px;
  height: 32px;
  background: rgba(245, 245, 250, 1);
  border: 1px solid rgba(230, 230, 235, 1);
}
.Already_opened {
  position: absolute;
  top: 0;
  font-size: 12px;
  color: #fff;
  left: 10px;
  z-index: 1;
}
.Closed {
  position: absolute;
  top: 0;
  font-size: 12px;
  color: #fff;
  left: 20px;
  z-index: 1;
}
.rel {
  position: relative;
}
.cur {
  background-color: #1ea0ff;
  color: #fff;
}
/*暂停分佣弹框*/
.suspendTable {
  margin-left: 30px;
  margin-top: 20px;
}
.suspendTable > tr > td {
  border: none;
}
.suspendTable input {
  margin: 0 10px 0 17px;
  width: 80px;
}

.suspendTable button {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background-color: #1ea0ff;
  color: white;
}
.suspendDialog .letf_tab {
  height: 260px;
}
/*取消区域弹框*/
.cancelregionTab > tr > td {
  width: 50%;
  text-align: left;
  padding: 0 10px;
}
.cancelregionTab > tr > td:last-child {
  text-align: right;
}
.cancelregionTab > tr > td > button {
  width: 80px;
  height: 28px;
  background-color: #1ea0ff;
  color: #fff;
  font-size: 12px;
}
.cancelbg {
  background-color: #e6e6eb !important;
  color: #8f8f8f !important;
}
.textarea {
  width: 100%;
}
.textarea {
  margin-top: 20px;
  max-height: 300px !important;
}
.Tips {
  font-size: 18px;
  color: #fa644b;
  margin-top: 10px;
  text-align: center;
}
.cft:after {
  display: block;
  content: "";
  clear: both;
}
.region {
  max-height: 300px;
  height: 300px;
  overflow: auto;
}
.region > div:first-child {
  width: 156px;
  border-right: 1px solid #e6e6eb;
  height: 100%;
}
.region > div:first-child > p {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #e6e6eb;
  text-align: center;
  cursor: pointer;
}
.left {
  float: left;
}
.right {
  float: right;
  width: calc(100% - 156px);
}
.right > p {
  padding: 20px 20px;
}
.right > p:first-child {
  line-height: 20px;
  border-bottom: 1px solid #e6e6eb;
}
.voucher > img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
</style>
<style >
.regionDialog {
  z-index: 1000 !important;
}
.v-modal {
  z-index: 999 !important;
}
.el-select .el-input {
  width: 130px;
  margin-right: 20px;
  height: 100%;
}

.search_btn {
  border-radius: 0;
  height: 38px;
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-dialog__header {
  border-bottom: 1px solid #e6e6eb !important;
  padding: 13px 0;
}

.el-dialog__headerbtn {
  top: 15px;
}
.Setup .el-dialog__footer {
  border-top: 1px solid #e6e6eb;
  padding-bottom: 10px;
}
.regionDialog .el-dialog__body {
  padding: 0;
}

.Setup .el-dialog__body {
  padding: 10px 0;
}

.el-switch__label * {
  font-size: 12px !important;
}
.el-switch {
  height: 26px;
  line-height: 26px;
  width: 72px;
}
.el-switch__label--right {
  left: 10px;
  position: absolute;
  font-size: 12px !important;
  z-index: 1;
  background: none;
  user-select: none !important;
  -webkit-user-select: none;
  color: #fff;
  -moz-user-select: none;
  -ms-user-select: none;
  top: 1px;
}
.el-switch__core {
  height: 100%;
  border-radius: 16px;
}
.el-switch__core:after {
  top: 4px;
}
.el-switch__input {
  z-index: 2;
}
.el-switch__label.is-active {
  color: #fff !important;
}
.reason .el-dialog__footer {
  border-top: 1px solid #e6e6eb;
}
</style>
