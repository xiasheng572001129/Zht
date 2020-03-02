<template lang="html">
  <div class="register">
    <table class="table">
      <tr>
        <th>姓名</th>
        <th>电话</th>
        <th>开户名</th>
        <th>开户行</th>
        <th>分行</th>
        <th>卡号</th>
        <th>提现次数</th>
        <th>本次提现金额(元)</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in dataList">
        <td>{{item.name}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.bank_name}}</td>
        <td>{{item.bank_branch}}</td>
        <td>{{item.back}}</td>
        <td>{{item.account}}</td>
        <td>
          <a href="javascript:;" class="col-1EA" @click='Putforward(item.sm_id)'>{{item.putsize}}</a>
        </td>
        <td>{{item.money}}</td>
        <td>{{item.create_time}}</td>
        <td>
          <a href="javascript:;" class="col-0ACD00 adopt" @click="adopt(item.id,item.money)">通过</a>
          <a href="javascript:;" class="col-FA644B" @click="Reject(item.id)">驳回</a>
        </td>
      </tr>
    </table>
    <!--详情弹框  -->
    <el-dialog title="往期提现" :visible.sync="PutforwardVisible" width="540px" center>
       <table class="table PutforwardTab">
           <tr>
             <th>提现金额</th>
             <th>申请时间</th>
             <th>通过时间</th>
           </tr>
           <tr v-for="item in PutforwardData">
                <td>{{item.money}}</td>
                <td>{{item.create_time}}</td>
                <td>{{item.audit_time | datetime}}</td> 
           </tr>
       </table>
      <span slot="footer" class="dialog-footer">
           <paging :page-count="PutforwardCount"   :page="PutforwardPage" @index="PutforwardNext"></paging>
      </span>
    </el-dialog>
    <!--通过申请弹框-->
    <el-dialog title="通过申请" :visible.sync="adoptDialogVisible" width="400px" center>
      <div class="adoptContent">
          <div>提现金额</div>
          <div class="money">{{money}}</div>
          <div>确定要通过提现申请吗</div>
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
        <el-button type="primary" @click="DetermineReject">提交</el-button>
      </div>
    </el-dialog>
    <!--分页组件-->
    <div class="page_center">
      <paging :page-count="pageCount"   :page="page" @index="paging"></paging>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        token:window.sessionStorage.getItem("bbytoken"),
        pageCount:1,  //总页数,默认1
        page:1,       //当前页
        PutforwardCount:1,//往期提现总页数
        PutforwardPage:1,//往期提现当前页
        PutforwardId:1,//每个往期提现的id
        dataList:[],
        PutforwardVisible:false,  //往期提现弹框弹框,默认不显示
        PutforwardData:{},  //详情弹框数据
        adoptDialogVisible:false,    //通过申请弹框,默认不显示
        adoptData:{},//通过弹框数据
        selectData:'', //下拉数据
        adoptID:'', //通过id,
        money:"",
        RejectID:'',//驳回id
        RejectDialogVisible:false,   //驳回弹框,默认不显示
        reason:'' //驳回理由
      }
    },
    methods:{
      //初始化数据
      init(){
       
        this.$axios.post('Smoc/putList',{token:this.token,page:this.page}).then(res=>{
          if(res.data.code==1){
         
          this.dataList=res.data.data.list; //拿返回来的数据
          this.pageCount=res.data.data.rows  //拿取总页数
        }else{
          this.dataList={}
          layer.msg(res.data.msg,{time:1000}) //如果code不等于一代表,没有数据，提示暂无数据
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
      //往期提现分页操作
      PutforwardNext(e){
              this.PutforwardPage=e;
              this.Putforward(this.PutforwardId)
      },
      //点击查看提现
      Putforward(sm_id){
        this.PutforwardId=sm_id
         this.$axios.post('Smoc/dePut',{token:this.token,sm_id:sm_id,page:this.PutforwardPage}).then(res=>{
            if(res.data.code==1){
              this.PutforwardVisible=true
            
              this.PutforwardData=res.data.data.list
              this.PutforwardCount=res.data.data.rows
            }else{
              layer.msg(res.data.msg,{time:1000})
            }
         }).catch(err=>console.log(err))
      },
      //点击通过
      adopt(id,money){
        this.adoptDialogVisible=true;
        this.money=money
        this.adoptID=id;
      },
      // 点击确定通过
      DetermineAdopt(){
        this.$axios.post('Smoc/passPut',{token:this.token,id:this.adoptID}).then(res=>{
         
          if(res.data.code==1){
         
          layer.msg(res.data.msg,{time:1500},(()=>{
            this.adoptDialogVisible=false
            this.$store.commit('increment')
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
        this.$axios.post('Smoc/turnPut',{token:this.token,id:this.RejectID,reason:this.reason}).then(res=>{
          if(res.data.code==1){
          layer.msg(res.data.msg,{time:1500},(()=>{
            this.$store.commit('increment')
            this.RejectDialogVisible=false
            this.init()
        }))
        }else{
          layer.msg(res.data.msg,{time:1500})
        }
      }).catch(err=>console.log(err))
      }
    },
    mounted(){
      this.init()
      this.$store.commit('increment')
    }
  }
</script>

<style lang="css" scoped="scoped">

  .table>tr>th{
    height: 50px !important;
    line-height: 50px
  }
  .table>tr>td{
    font-size: 14px;

  }
  .adopt{
    margin-right: 29px
  }
  /*头像*/
  .head_pic{
    width: 50px;
    height:50px;
    border-radius: 50%;
    vertical-align: middle;
    margin: 17px 0;
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
    margin-bottom: 38px;
    text-align: center;
  }
  .adoptContent>div{
    margin-top: 20px;
    padding-left: 20px;
  }
  .money{
    font-size: 25px;
    color: #1E2328;
  }
  .adoptContent>div:last-child{
    color: #FA644B;
    font-size: 18px;
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
  /*往期提现弹框*/
  .PutforwardTab>tr>th{
     background:none !important;
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
  .PutforwardTab .el-dialog__body{
    padding-top: 0 !important;
  }
</style>
