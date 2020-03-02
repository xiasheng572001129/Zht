<template lang="html">
  <div class="">
    <herderBar></herderBar>
    <div class="search">
      <el-select placeholder="请选择" v-model="selectData">
        <el-option label='全部' value="0"></el-option>
        <el-option label='正常' value="2"></el-option>
        <el-option label="投诉期" value="1"></el-option>
      </el-select>
      <el-input placeholder="请输入搜索的名称" class="input" v-model="name"></el-input>
      <el-button  type="primary" class="search_btn" @click="search">搜索</el-button>
    </div>
    <div class="">
      <table class="table">
        <tr>
          <th>姓名</th>
          <th>电话</th>
          <th>团队</th>
          <th>端口费(元)</th>
          <th>投诉(次)</th>
          <th>收益(元)</th>
          <th>详情</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in dataList">
          <td class="name">
            <a href="javascript:;" class='col-1EA' @click='detailsDialog(item.sm_id)'>{{item.name}}</a>
          </td>
          <td>{{item.phone}}</td>
          <td>
            <a href="javascript:;" class="col-1EA" @click='teamDialog(item.item_id)'>{{item.team_name}}</a>
          </td>
          <td>{{item.price}}</td>
          <td>
            <a href="javascript:;"  class='col-1EA' @click="ComplaintDialog(item.item_id)">{{item.compSize}}</a>
          </td>
          <td>
            <a href="javascript:;" class='col-1EA' @click='ProfitDialog(item.sm_id)'>{{item.money}}</a>
          </td>
          <td>
            <a href="javascript:;" class="col-1EA" @click="Divideinto(item.sm_id)">查看</a>
          </td>
          <td :class="[item.pstatus==1?'col-FA644B':'']">{{item.pstatus==0?'正常':'投诉期'}}</td>
          <td class="Conduct">
            <a href="javascript:;" class="col-0ACD00" @click="SetupDialog(item.sm_id)">设置</a>
            <a href="javascript:;" class="col-1EA" @click='suspendDialog(item.sm_id)'>暂停</a>
            <a href="javascript:;" class="col-FA644B" @click="regionDialog(item.sm_id,item.team_name)">取消</a>
          </td>
        </tr>
      </table>
      <!--团队弹框-->
      <el-dialog title="团队" class="teamDialog" width='920px' :visible.sync="teamDialogVisible" @close="teamDialogClose" center>
        <table class='table'>
          <tr>
            <th>团队名称</th>
            <th>负责人</th>
            <th>电话</th>
            <th>负责人照片</th>
            <th>成员</th>
            <th>合作方式</th>
            <th>注册时间</th>
          </tr>
          <tr>
            <td>{{teamList.team_name}}</td>
            <td>{{teamList.leader}}</td>
            <td>{{teamList.phone}}</td>
            <td>
              <img :src="teamList.head_pic" class="img">
            </td>
            <td>
              <a href="javascript:;" class="col-1EA" @click="teamMember(teamList.id)">{{teamList.sm_member_id}}</a>
            </td>
            <td>{{teamList.sm_status==1?'区域合作':'业务加盟'}}</td>
            <td>{{teamList.create_time}}</td>
          </tr>
        </table>
      </el-dialog>
      <!--团队成员弹框-->
      <el-dialog title="团队成员" class="teamDialog teamMemberDialog" width='306px' :visible.sync="teamMemberDialogVisible" center>
        <table class='table'>
          <tr>
            <th>姓名</th>
            <th>电话</th>
            <th>地区</th>
          </tr>
          <tr v-for="item in teamMemberList">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.area}}</td>
          </tr>
        </table>
      </el-dialog>
      <!--投诉弹框-->
      <el-dialog title="投诉" class="teamDialog"  :visible.sync="ComplaintVisible" center>
        <table class='table'>
          <tr>
            <th>被投诉人</th>
            <th>被投诉人电话</th>
            <th>投诉人</th>
            <th>投诉人电话</th>
            <th>投诉内容</th>
            <th>投诉时间</th>
            <th>投诉状态</th>
            <th>撤回时间</th>
          </tr>
          <tr v-for="item in ComplaintList">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.tousu}}</td>
            <td>{{item.tousuphone}}</td>
            <td>
              <a href="javascript:;" class="col-1EA" @click="ComplaintContent(item.id)">查看</a>
            </td>
            <td>{{item.create_time}}</td>
            <td :class="[item.sm_status==0?'col-FA644B':'']">{{item.sm_status==1?'已处理':'未处理'}}</td>
            <td>{{item.handle_time}}</td>
          </tr>
        </table>
        <span slot='footer' class='dialog-footer'>
            <paging :page-count="ComplaintCount"   :page="ComplaintPage" @index="ComplaintNext"></paging>
        </span>
      </el-dialog>
      <!--投诉内容弹框-->
      <el-dialog title="投诉内容" class="teamDialog" width="480px" :visible.sync="ComplaintContentVisible" center>
           <div class='ComplaintContent'>{{ComplaintContentList}}</div>
      </el-dialog>
      <!--收益弹框-->
      <el-dialog title="收益" class="teamDialog" width="400px" :visible.sync="ProfitVisible" center>
        <div>
          <table class="table ProfitTable">
            <tr>
              <td>团队奖励:</td>
              <td>{{ProfitDatalist.item}}</td>
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
      <!--详情弹框  -->
      <el-dialog title="个人信息" :visible.sync="detailsDialogVisible"   width="400px" center>
        <div class='Head_portrait'>
          <img :src="detailsDataList.head_pic"  >
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
            <span>可提现余额:</span>
            <span>{{detailsDataList.share_name}}</span>
          </div>
        </div>
      </el-dialog>
      <!--售卡分成  -->
      <el-dialog title="售卡分成" class='Divideinto' @close="close"  :visible.sync="DivideintoVisible"  center>
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
      <el-dialog title="分佣设置" class="SetupDialog Setup" :visible.sync="SetupDialogVisible" width="400px"  center>

          <div class='right'>
            <table class='table SetupTable'>
              <tr>
                <td>管理奖励分成</td>
                <td>
                  <input class=' SetupInput' v-model='switchState.sm_profit'/>
                  <span>%</span>
                </td>
              </tr>
              <tr>
                <td>ubi奖励分成</td>
                <td>
                  <input class=' SetupInput' v-model='switchState.ubi_profit'/>
                  <span>元</span>
                </td>
              </tr>
              <tr>
                <td>合作状态</td>
                <td>
                  <select class='select'v-model="switchState.sm_status">
                    <option value="1">业务合作</option>
                    <option value="2">区域加盟</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>团队奖励</td>
                <td class='rel'>
                  <el-switch  style="display: block"  :active-text="switchState.team_raw?'已开通':'已关闭'" v-model="switchState.team_raw" active-color="#0ACD00" inactive-color='#AAAAB4'   :width='switchW' ></el-switch>
                </td>
              </tr>
              <tr>
                <td>开发奖励</td>
                <td class='rel'>
                  <el-switch   style="display: block"  :active-text="switchState.exp_raw?'已开通':'已关闭'" v-model="switchState.exp_raw" active-color="#0ACD00" inactive-color='#AAAAB4'    :width='switchW' ></el-switch>
                </td>
              </tr>
              <tr>
                <td>管理奖励</td>
                <td class='rel'>
                  <el-switch   style="display: block"  :active-text="switchState.admin_raw?'已开通':'已关闭'" v-model="switchState.admin_raw" active-color="#0ACD00" inactive-color='#AAAAB4'    :width='switchW' ></el-switch>
                </td>
              </tr>
            </table>
          </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="SetupModify">确定</el-button>
            </span>
      </el-dialog>
      <!--暂停分佣设置弹框 -->
      <el-dialog title="暂停分佣设置" class="suspendDialog Setup" :visible.sync="suspendDialogVisible" width="400px" center>
        <div class='SetupContent'>
          <div class='right'>
            <table class='suspendTable'>
              <tr>
                <td>
                  <span>团队奖励</span>
                  <input class=' SetupInput' v-model="suspendcurrentData.team_time" />
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
                <el-button type="primary" @click="suspendMaid">确定</el-button>
            </span>
      </el-dialog>
      <!--暂停分佣设置弹框 -->
      <el-dialog title="取消区域" class="suspendDialog Setup" :visible.sync="regionDialogVisible" width="400px" center>
            <div class="cancelRegion">
                <textarea v-model="reason">

                </textarea>
            </div>
            <span slot="footer" class="dialog-footer">
               <el-button type="primary" @click="DetermineCancel">确定</el-button>
            </span>
      </el-dialog>
      <!--分页组件-->
      <div class="page_center">
        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        token:window.sessionStorage.getItem("bbytoken"),
        name:'',//当前名字
        pageCount:1,  //总页数,默认1
        page:1,       //当前页
        ComplaintCount:1,//投诉总页数
        ComplaintPage:1,//投诉当前页
        ComplaintId:1,//投诉的当前id
        selectData:"0",
        dataList:[],
        teamDialogVisible:false, //团队弹框
        teamMemberDialogVisible:false, //团队成员弹框
        ComplaintVisible:false,//投诉弹框
        ComplaintContentVisible:false,//投诉内容弹框
        ProfitVisible:false, //收益弹框
        detailsDialogVisible:false,//详情弹框
        SetupDialogVisible:false,//分佣设置弹框
        suspendDialogVisible:false,//暂停分佣弹框
        regionDialogVisible:false,//取消区域弹框
        DivideintoVisible:false,
        teamList:{}, //团队弹框的数据
        teamMemberList:{},
        ComplaintList:{},//投诉弹框数据
        ComplaintContentList:{}, //投诉内容
        ProfitDatalist:{},  //收益数据
        detailsDataList:{},//详情数据
        switchW:75,//switch开关的宽
        switchState:{}, //分佣设置的状态
        suspendcurrentData:{},//暂停分佣数据
        teamName:{},//取消区域的名称
        reason:'',
        cardPage:1,
        cardCount:1,
        SalecardList:[]
      }
    },
    watch:{
      name(newVal){
        if(!newVal){
          this.init()
        }
      },
      selectData(newVal){ //监听select发生改变时,获取当前值,通过当前值,进去查询
        var data={
          status:newVal
        }
        this.init(data)
      }
    },
    methods:{
      //初始化数据
      init(data){
        var Data={
          token:this.token,
          page:this.page,
          search:data?data.name:'',
          ms_type:data?data.ms_type:'',
          status:data?data.status:this.selectData
        }
        this.$axios.post('Smoc/DicList',Data).then(res=>{
          if(res.data.code==1){
        
          this.dataList=res.data.data.list; //拿返回来的数据
          this.pageCount=res.data.data.rows  //拿取总页数
        }else{
          this.dataList={}
          layer.msg(res.data.msg,{time:1000}) //如果code不等于一代表,没有数据，提示暂无数据
        }
      }).catch(err=>console.log(err))
      },
      //搜索
      search(){
        var data={
          name:this.name,
          ms_type:2,
          status:this.selectData
        }
        this.init(data)
      },
      Divideinto(sm_id){
        this.cardId=sm_id
        this.DivideintoVisible=true
        this.$axios.post('Smoc/getDiv',{token:this.token,sm_id:sm_id,type:2,page:this.cardPage}).then(res=>{
          if(res.data.code==1){
          this.SalecardList=res.data.data.list
          this.cardCount=res.data.data.rows
        }
      }).catch(err=>console.log(err))
      },
      cardChange(e){
        this.cardPage=e;
        this.Divideinto(this.cardId)
      },
      close(){
         this.SalecardList=[]
         this.cardCount=1
        this.cardPage=1
      },
      //点击团队,查看详情
      teamDialog(item_id){
        this.teamDialogVisible=true
        this.$axios.post('Smoc/itemDet',{token:this.token,item_id:item_id}).then(res=>{
          if(res.data.code==1){
          this.teamList=res.data.data;
        }
      }).catch(err=>console.log(err))
      },
      //点击查看团队成员详情
      teamMember(id){
        this.$axios.post('Smoc/sonList',{token:this.token,item_id:id}).then(res=>{
          if(res.data.code==1){
          this.teamDialogVisible=false
          this.teamMemberDialogVisible=true
          this.teamMemberList=res.data.data
        }else{
          layer.msg(res.data.msg,{time:1000})
        }
      }).catch(err=>console.log(err))
      },
      //点击投诉,查看详情
      ComplaintDialog(item_id){
        this.ComplaintId=item_id
        this.$axios.post('Smoc/comList',{token:this.token,item_id:item_id,page:this.ComplaintPage}).then(res=>{
          if(res.data.code==1){
          this.ComplaintVisible=true
          this.ComplaintList=res.data.data.list;
          this.ComplaintCount=res.data.data.rows;
        }else{
          layer.msg(res.data.msg,{time:1000})
        }
      }).catch(err=>console.log(err))
      },
      //点击查看投诉内容
      ComplaintContent(id){
          this.ComplaintVisible=false
          setTimeout(()=>{
            this.ComplaintContentVisible=true
          },300)
          this.$axios.post('Smoc/clde',{token:this.token,id:id}).then(res=>{
               if(res.data.code==1){
                   this.ComplaintContentList=res.data.data
               }else{
                  layer.msg(res.data.msg,{time:1000})
               }
          }).catch(err=>console.log(err))
      },
      //点击收益,查看详情
      ProfitDialog(sm_id){
         this.ProfitVisible=true
         this.$axios.post("Smoc/sPlist",{token:this.token,sm_id:sm_id}).then(res=>{
             if(res.data.code==1){
                 this.ProfitDatalist=res.data.data
             }else {
                  this.ProfitDatalist={
                    admin:0,
                    exp:0,
                    item:0,
                    sum:0
                  }
              }
         }).catch(err=>console.log(err))
      },
      //点击查看详情
      detailsDialog(sm_id){
        this.detailsDialogVisible=true
        this.$axios.post('Smoc/regDetail',{token:this.token,uid:sm_id}).then(res=>{
             if(res.data.code==1){
                this.detailsDataList=res.data.data;
             }else{
                layer.msg(res.data.msg,{time:1000})
             }
          }).catch(err=>console.log(err))
      },
      //点击设置分佣
      SetupDialog(id){
        this.SetupDialogVisible=true
        this.$axios.post('Smoc/pcheckSav',{token:this.token,id:id}).then(res=>{
             if(res.data.code==1){
              var data=res.data.data
               this.switchState={
                 team_raw:this.Transformation(data.team_raw),
                 exp_raw:this.Transformation(data.exp_raw),
                 admin_raw:this.Transformation(data.admin_raw),
                 sm_profit:data.sm_profit,
                 sm_status:data.sm_status,
                 ubi_profit:data.ubi_profit,
                 id:id,
                 token:this.token,
               }
             }else{
                 this.switchState={
                   team_raw:false,
                   exp_raw:false,
                   task_raw:false,
                   admin_raw:false,
                   sm_profit:0,
                   sm_status:1,
                   id:id,
                   ubi_profit:0,
                   token:this.token
                 }
              }
        }).catch(err=>console.log(err))
      },
      //点击确定修改分佣
      SetupModify(){
           var switchState=this.switchState
            var data={
              team_raw:this.Transformation(switchState.team_raw),
              exp_raw:this.Transformation(switchState.exp_raw),
              admin_raw:this.Transformation(switchState.admin_raw),
              sm_profit:switchState.sm_profit,
              sm_status:switchState.sm_status,
              SetupModify:switchState.SetupModify,
              ubi_profit:switchState.ubi_profit,
              id:switchState.id,
              token:this.token
            }
           this.$axios.post('Smoc/priceSav',data).then(res=>{
                if(res.data.code==1){
                    layer.msg(res.data.msg,{time:1000})
                }else{
                    layer.msg(res.data.msg,{time:1000})
                }
           }).catch(err=>console.log(err))
      },
      //暂停分佣设置
      suspendDialog(sm_id){
         this.suspendDialogVisible=true
         this.$axios.post('Smoc/aaa',{token:this.token,sm_id:sm_id}).then(res=>{
                    if(res.data.code==1){
                       this.suspendcurrentData=res.data.data
                       this.suspendcurrentData['sm_id']=sm_id
                       this.suspendcurrentData['token']=this.token
                    }
         }).catch(err=>console.log(err))
      },
      //点击确定暂停分佣
      suspendMaid(){
        var data=this.suspendcurrentData
        this.$axios.post('Smoc/ddd',data).then(res=>{
            if(res.data.code==1){
               layer.msg(res.data.msg,{time:1000})
            }else{
               layer.msg(res.data.msg,{time:1000})
            }
        }).catch(err=>console.log(err))
      },
      //取消区域设置
      regionDialog(sm_id,teamName){
         this.teamName={
            name:teamName,
            sm_id:sm_id,
            token:this.token
         }
         this.regionDialogVisible=true
      },
      //点击确定取消区域
      DetermineCancel(){
        if(!this.reason){
          this.$message.error('请输入取消理由')
          return;
        }
        this.teamName.reason=this.reason
        this.$axios.post('Smoc/quxiao',this.teamName).then(res=>{
            if(res.data.code==1){
                layer.msg(res.data.msg,{time:1000},(()=>{
                    this.regionDialogVisible=false
                    this.init()
                  }))
            }else{
               layer.msg(res.data.msg,{time:1000})
            }
        }).catch(err=>console.log(err))
      },
      //以为switch开关的需要,需要进行转换
      Transformation(param){
        if(typeof param ==="boolean"){
          return param?1:0
        }
        if(typeof param==="number"){
          return param?true:false
        }
        if(typeof param==='string'){
           return Number(param)?true:false
        }
      },

      //操作分页组件
      paging(e){
        //把当前页赋值给page
        this.page=e;
        // 当前页发生改变时调取注册审核列表接口,重新渲染
        this.init()
      },
      //投诉分页,操作
      ComplaintNext(e){
         this.ComplaintPage=e;
        // 当前页发生改变时调取注册审核列表接口,重新渲染
         this.ComplaintDialog(this.ComplaintId)
      },

      //关闭弹框操作
          //关闭团队弹窗
         teamDialogClose(){
            this.teamList={}
         }
    },
    mounted(){
      this.init()
    }
  }
</script>

<style lang="css" scoped="scoped">
  .Divideinto >>> .el-dialog__body{
    padding: 0;
  }
  .Divideinto table th{
    height: 50px;
    line-height: 50px;
  }
  .Divideinto>div{
    overflow: hidden;
    padding-bottom: 200px;
  }
  .search{
    margin: 15px 0 15px 40px;
    display: flex;
    align-items: center;
  }
  .search .input{
    width: 25.9%;
  }
  .Conduct>a{
    margin-left: 20px;
  }
  .name{
    width: 10%;
  }
  .table th{
    height: 50px !important;
    line-height: 50px !important;
  }


  /*团队弹框*/
  .teamDialog th{
    background:none;
    border-bottom: 1px solid #E6E6EB;
  }
  .teamDialog>table>tr>td{

  }
  .img{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    vertical-align: middle;
    margin: 10px 0;
  }
  /*团队成员弹框*/
  .teamMemberDialog table>tr>td{
    font-size: 12px !important;
  }
  .teamMemberDialog table{
    padding-bottom: 20px;
  }
  /*投诉内容弹框*/
  .ComplaintContent{
    margin-top: 20px;
    height: 208px;
  }
  /*收益弹框*/
  .ProfitTable>tr>td{
    padding: 0 10px;
  }
  .ProfitTable>tr>td:first-child{
    text-align: left;
  }
  .ProfitTable>tr>td:last-child{
    text-align: right;
  }

  .Total>td{
    border:none;
  }
  .Total>td:first-child{
    padding-left: 40px;
  }
  /*详情弹框内容*/
  .content{
    margin-top: 40px;
    margin-bottom: 50px;
  }

  .content>div{
    padding: 12px 0;
    border-bottom: 1px solid #E6E6EB;
  }
  .content>div>span{
    display: inline-block;
    width: 49%;
  }
  .content>div>span:last-child{
    text-align: right;
  }
  .Head_portrait{
    text-align: center;
  }
  .Head_portrait>img{
     width: 80px;
     height: 80px;
     border-radius: 50%;
  }
  .adopt{
    margin-right: 29px
  }
  /*设置弹框*/

  .right{
    padding-left: 38px;

  }

  .SetupTable>tr>td{

    border:none;
    text-align: left;
  }
  .SetupTable>tr>td:first-child{
    width: 120px;
  }
  .SetupTable>tr>td{

  }
  .SetupInput{
    width: 120px;
    height:32px;
    text-align: center;
    background:rgba(245,245,250,1);
    border:1px solid rgba(230,230,235,1);
  }
  .select{
    width: 120px;
    height:32px;
    background:rgba(245,245,250,1);
    border:1px solid rgba(230,230,235,1);
  }
  .Already_opened{
    position: absolute;
    top: 0;
    font-size: 12px;
    color: #fff;
    left: 10px;
    z-index: 1;
  }
  .Closed{
    position: absolute;
    top: 0;
    font-size: 12px;
    color: #fff;
    left: 20px;
    z-index: 1;
  }
  .rel{
    position: relative;
  }
  .cur{
    background-color: #1EA0FF;
    color: #fff;
  }
  /*暂停分佣弹框*/
  .suspendTable{

    margin-top: 20px;
  }
  .suspendTable>tr>td{
    border: none;
  }
  .suspendTable input{
    margin: 0 10px 0 17px;
    width: 80px;
  }

  .suspendTable button{
    width: 80px;
    height: 30px;
    line-height: 30px;
    background-color: #1EA0FF;
    color: white;
  }
  .suspendDialog .letf_tab{
    height: 260px;
  }
  /*取消区域弹框*/
  .cancelRegion{
     text-align: center;
     margin-top: 10px;
     font-size: 16px;
     margin-bottom: 40px;
  }
  .cancelRegion>textarea{
    border: none;
    width: 100% !important;
    resize:none;
    height: 100px;
    max-height: 300px !important;
  }

</style>
<style >
  .el-select .el-input {
    width: 130px;
    margin-right: 20px;
  }

  .search_btn{
    border-radius: 0;
    height: 38px;
    width: 120px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .teamDialog .el-dialog__body{
    padding-top: 0;
  }
  .el-dialog__header{
    border-bottom: 1px solid #E6E6EB;
    padding: 10px 0;
  }
  .el-dialog__footer{
    border-top: 1px solid #E6E6EB;
    padding-bottom: 10px;
  }
  .el-icon-close:before{
    position: absolute;
    top: -5px;
    right: -5px;
  }
  .el-switch__label *{
    font-size: 12px !important;
  }
  .el-switch{
    height:26px;
    line-height: 26px;
    width: 72px;
  }
  .el-switch__label--right{
    left: 10px;
    position: absolute;
    font-size: 12px !important;
    z-index: 1;
    background: none;
    user-select:none !important;
    -webkit-user-select:none;
    color: #fff;
    -moz-user-select:none;
    -ms-user-select:none;
    top: 1px;
  }
  .el-switch__core{
    height:100%;
    border-radius: 16px;
  }
  .el-switch__core:after{
    top: 4px;
  }
  .el-switch__input{
    z-index: 2;
  }
  .el-switch__label.is-active{
    color: #fff !important;
  }
</style>
