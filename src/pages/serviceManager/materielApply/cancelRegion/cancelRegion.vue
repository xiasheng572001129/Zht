<template lang="html">
  <div class="register">
    <table class="table">
      <tr>
        
        <th>姓名</th>
        <th>电话</th>
        <th>投诉(次)</th>
       
        <th>支付凭证</th>
        <th>取消地区</th>
        <th>详情</th>
        <th>取消理由</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in dataList">
        <td>{{item.name}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.complaint}}</td>
        
        <td>
           <!-- <div class='enlarge' ref='enlarge'>
                    <img  :src='item.voucher' @click='enlarge(index)' />
            </div> -->
            <a href='javascript:;' class="col-1EA" @click='voucherDialogVisible=true,voucher(item)'>查看</a>
        </td>
        <td>
           <a href="javascript:;" class="col-1EA" @click="regionDialogVisible=true,region(item)">查看</a>
        </td>
        <td>
          <a href="javascript:;" class="col-1EA" @click="SeeDetails(item.uid)">查看</a>
        </td>
        <td >
        
          <a href="javascript:;" class="col-1EA" @click='SeeReason(item.id)'>查看</a>
        </td>
        <td>
          <span>{{item.create_time}}</span>
        </td>
        <td>
          <a href="javascript:;" class="col-0ACD00 adopt" @click="Head_portrait=item.head_pic,adopt(item)">通过</a>
          <a href="javascript:;" class="col-FA644B" @click="Reject(item.id)">驳回</a>
        </td>
      </tr>
    </table>
    <!--详情弹框  -->
    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="400px" center>
      <div class='Head_portrait'>
        <img :src="detailsData.head_pic" >
      </div>
      <div class="content">
        <div>
          <span>姓名:</span>
          <span>{{detailsData.name}}</span>
        </div>
        <div>
          <span>电话:</span>
          <span>{{detailsData.phone}}</span>
        </div>
        <div>
          <span>开户名:</span>
          <span>{{detailsData.bank_name}}</span>
        </div>
        <div>
          <span>开户行:</span>
          <span>{{detailsData.bank_code}}</span>
        </div>
        <div>
          <span>分行:</span>
          <span>{{detailsData.bank_branch}}</span>
        </div>
        <div>
          <span>卡号:</span>
          <span>{{detailsData.account}}</span>
        </div>
      </div>
    </el-dialog>
    <!--取消理由弹框  -->
    <el-dialog title="取消理由" :visible.sync="SeeReasonsDialogVisible" width="400px" @close="SeeReasonsClose" center>
      <div class='SeeReason'>{{this.SeeReasonsData}}</div>
    </el-dialog>
    <!--通过申请弹框-->
    <el-dialog title="通过申请" class="adoptDialog" :visible.sync="adoptDialogVisible" width="400px" center>
      <div class="adoptContent">
           <div class='head_pic'>
               <img :src="Head_portrait">
           </div>
           <div>{{adoptData.name}}</div>
           <div>{{adoptData.area}}</div>
           <div class='Tips' v-html='ration'></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DetermineAdopt">确定</el-button>
      </div>
    </el-dialog>
    <!--驳回弹框-->
    <el-dialog title="驳回理由" :visible.sync="RejectDialogVisible" width="400px" center @close="RejectClose">
      <div class='textarea'>
         <textarea v-model="reason">
                
         </textarea>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DetermineReject">确定</el-button>
      </div>
    </el-dialog>

  <el-dialog title="地区" :visible.sync="regionDialogVisible" width="400px" center >
            <div >
                <div>
                    <strong style='font-size:16px'>省: </strong>
                    <span v-for='item in reasonData'>
                        {{item.name}}
                        <div>
                            <strong style='font-size:16px'>市: </strong>
                            <span v-for='it in item.son'>
                                {{it.name}}
                                <div>
                                    <strong style='font-size:16px'>区/县: </strong>
                                    <span v-for='i in it.son'>{{i.name}}、</span>
                                </div>
                            </span>
                        </div>
                    </span> 
                </div>
                
            </div>
           
        </el-dialog>

        <el-dialog title="支付凭证" :visible.sync="voucherDialogVisible" width="400px" center >
            <div class='voucher'>
                <img ref='enlarge' v-for='(item,index) in voucherData' :src='item' @click='enlarge(index)'>
            </div>
           
        </el-dialog>
    <!--分页的组件-->
    <div class="page_center">
      <paging :page-count="pageCount"   :page="page" @index="paging" ></paging>
    </div>
  </div>
</template>

<script>
import Viewer from '@/utils/Viewer'
  export default {
    data(){
      return{
        token:window.sessionStorage.getItem("bbytoken"),
        pageCount:1,  //总页数,默认1
        page:1,       //当前页
        dataList:{},
        detailsDialogVisible:false,  //详情弹框,默认不显示
        detailsData:{},  //详情弹框数据
        adoptDialogVisible:false,    //通过申请弹框,默认不显示
        adoptData:{},//通过弹框数据
        adoptID:'', //通过id,
        RejectID:'',//驳回id
        RejectDialogVisible:false,   //驳回弹框,默认不显示
        reason:'', //驳回理由
        SeeReasonsDialogVisible:false,  //取消理由弹框,默认不显示
        SeeReasonsData:'', //取消理由数据
        regionDialogVisible:false,
        reasonData:[],
        voucherDialogVisible:false,
        voucherData:[],
        Head_portrait:''
      }
    },
    filters:{
     
    },
    computed:{
        ration(){
          let ration=this.adoptData
         return ration ?  
         `<p>物料配给${ration.ration},剩余库存${ration.stock}</p>
          <p>您确定要取消合作吗?</p>
         ` 
         : '<p>你确定要取消合作吗?</p>'    
      }
    },
    methods:{
      //初始化数据
      init(){  //调取注册审核列表接口
        this.$axios.post('admin/Smoc/cancelList',{token:this.token,page:this.page}).then(res=>{
          if(res.data.code==1){
         
          this.dataList=res.data.data.list     //拿返回来的数据
          this.pageCount=res.data.data.rows  //拿取总页数
        }else{
          this.dataList=null
          layer.msg(res.data.msg,{time:1000})//如果code不等于一代表,没有数据，提示暂无数据
        }
      }).catch(err=>console.log(err))
      },
      /** 图片放大 */
      enlarge(index){
           this.$nextTick(()=>{
              const ViewerDom=this.$refs.enlarge[index]
              Viewer(ViewerDom)
           })
      },
      /** 支付凭证 **/
      voucher(data){
          this.$axios.post('admin/Smoc/voucher',{token:this.token,id:data.id}).then(res=>{
               if(res.data.code==1){
                   this.voucherData=res.data.data
               }  
          })  
      },
      region(item){
          this.$axios.post('admin/Smoc/areaNum',{
            token:this.token,
            sm_id:item.uid,
            id:item.id,
            type:2
          }).then(res=>{
              if(res.data.code==1){
                 this.reasonData=res.data.data;
              } 
          }).catch(err=>console.log(err))
      },
      //操作分页组件
      paging(e){
        //把当前页赋值给page
        this.page=e;
        // 当前页发生改变时调取注册审核列表接口,重新渲染
        this.init()
      },

      //点击查看详情
      SeeDetails(uid){
        this.$axios.post('Smoc/regDetail',{token:this.token,uid:uid}).then(res=>{
          if(res.data.code==1){
          this.detailsDialogVisible=true
         
          this.detailsData=res.data.data;
        }else{
          layer.msg(res.data.msg,{time:1000})
        }
      }).catch(err=>console.log(err))
      },

      //点击查看理由
      SeeReason(id){
         this.SeeReasonsDialogVisible=true
          this.$axios.post('Smoc/callReason',{token:this.token,id:id}).then(res=>{
              if(res.data.code==1){
                   this.SeeReasonsData=res.data.data
              }
          }).catch(err=>console.log(err))
      },

      //关闭取消理由弹框,清空数据
      SeeReasonsClose(){
        this.SeeReasonsData=''
      },

      //点击通过
      adopt(item){

          this.adoptDialogVisible=true;
          this.adoptID=item.id;
      
          this.$axios.post('admin/SmocList/cancelRation',{token:this.token,id:item.id,sm_id:item.uid}).then(res=>{
            this.adoptData=res.data.data
          }).catch(err=>console.log(err))
        },

      // 点击确定通过
      DetermineAdopt(){
        var adoptData={
          token:this.token,
          id:this.adoptID,
          stock:this.adoptData.stock,
          ration:this.adoptData.ration,
        }
        this.$axios.post('Smoc/callPass',adoptData).then(res=>{
          if(res.data.code==1){
          layer.msg(res.data.msg,{time:1500},(()=>{
            this.$store.commit('increment')
            this.adoptDialogVisible=false
            this.init()
        }))
        }else{
          layer.msg(res.data.msg,{time:1500})
        }
      }).catch(err=>console.log(err))
      },

      //点击驳回
      Reject(id){
        this.RejectDialogVisible=true
        this.RejectID=id;
      },
      //点击关闭弹框情况文本域中的内容
      RejectClose(){
        this.reason=''
      },

      //点击确认驳回
      DetermineReject(){
        if(!this.reason){  //如果没有输入驳回理由,直接return,不让执行下面的操作
          this.$message({message:'请输入驳回理由!',type:'error'})
          return;
        }
        this.$axios.post('Smoc/rejReason',{token:this.token,id:this.RejectID,reason:this.reason}).then(res=>{
          if(res.data.code==1){
          layer.msg(res.data.msg,{time:1500},(()=>{
            this.$store.commit('increment')
            this.RejectDialogVisible=false
          
            this.dataList?this.init():null
        }))
        }else{
          layer.msg(res.data.msg,{time:1500})
        }
      }).catch(err=>console.log(err))
      }
    } ,
    mounted(){
      this.init()
      this.$store.commit('increment')
    }
  }
</script>

<style lang="css" scoped="scoped">
    .enlarge>img{
       width: 50px;
       height: 50px;
       vertical-align: middle;
       margin: 10px;
    }
  .san{
    width: 0;
    height: 0;
    border-width: 40px;
    border-style: solid;
    border-color: red transparent transparent transparent;
  }
  .table>tr>th{
    height: 50px !important;
    line-height: 50px
  }

  .table>tr>td{
    font-size: 14px;
  }

  .Reason{
    width: 100px;
    margin: 0 auto;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .See{
   float: right;
  }
  .adopt{
    margin-right: 29px
  }

  /*详情弹框头像*/
  .Head_portrait{
    text-align: center;
  }
  .Head_portrait>img{
    width: 80px;
    height:80px;
    border-radius: 50%;
    text-align: center;
    margin-top: 20px;
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
  .adopt{
    margin-right: 29px
  }
  /*通过弹框*/

  .adoptContent{

    width: 100% !important;
    text-align: center;
  }
  /*通过弹框头像*/
  .head_pic{
     width: 100%;
     text-align: center;
  }
  .head_pic>img{
    width: 60px;
    height:60px;
    border-radius: 50%;
    margin-top: 20px;
  }
  /*提示*/
  .Tips{
    font-size: 18px;
    color: #FA644B;
    margin-top: 10px;
  }
  .adoptContent>div{

    padding-left: 20px;
  }
  .adoptContent>div>span:first-child{
    display: inline-block;
    width: 100px;

  }
  .input{
    width: 120px;
    height:40px;
    background:rgba(245,245,250,1);
    border:1px solid rgba(230,230,235,1);
    margin-right: 10px;
    text-align: center;
  }
  .select{
    width:120px;
    height:40px;
    background:rgba(245,245,250,1);
    border:1px solid rgba(230,230,235,1);
    text-align: center;
    text-align-last: center;
  }
  /*驳回弹出框*/
  .textarea{
    width: 100%;
  }
  .textarea>textarea{
    border: none;
    width: 100% !important;
    resize:none;
    height: 100px;
  }
  /*取消理由弹出框*/
  .SeeReason{
       height: 210px;
  }
  .voucher{
     max-height: 200px;
     height: 150px;
     overflow: auto;
  }
  .voucher>img{
    width: 60px;
    height: 60px;
    margin: 10px 10px;
  }
</style>
<style>
  .el-dialog__header{
    border-bottom: 1px solid #E6E6EB !important;
    padding: 13px 0;
  }
  .el-dialog__headerbtn{
    top: 15px;
  }
  .el-dialog__footer{
    border-top: 1px solid #E6E6EB;
    padding-bottom: 10px;
  }
  .adoptDialog .el-dialog__body{
    padding-left: 0;
  }
</style>
