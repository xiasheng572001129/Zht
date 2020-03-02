<template lang="html">
    <div class="register" ref='register'>
        <table class="table">
            <tr>
                <th>姓名</th>
                <th>电话</th>
                <th>头像</th>
                <th>详情</th>
                <th>支付凭证</th>
                <th>注册地区</th>
                <th>时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item,index) in dataList">
                <td>{{item.name}}</td>
                <td>{{item.phone}}</td>
                <td>
                    <img :src="item.head_pic" class="head_pic">
                </td>
                <td>
                    <a href="javascript:;" class="col-1EA" @click="SeeDetails(item.uid)">查看</a>
                </td>
                <td>
                <div class='enlarge' >
                    <img :src='item.voucher' ref='enlarge' @click='enlarge(index)' />
                </div>
                </td>
                <td>
                    <a href="javascript:;" class="col-1EA" @click='regionDialogVisible=true,region(item.id)'>查看</a>
                </td>
                <td>
                    <span>{{item.create_time}}</span>
                </td>
                <td>
                    <a href="javascript:;" class="col-0ACD00 adopt" @click="uid=item.uid,adopt(item.id)">通过</a>
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

        <!--通过申请弹框-->
        <el-dialog title="通过申请" :visible.sync="adoptDialogVisible" width="400px" center>
            <div class="adoptContent">
               
                <div>
                    <span>注册类型:</span>
                    <span>{{adoptData.sm_type}}</span>
                </div>
                <div>
                    <span>管理奖励分成:</span>
                    <span>
                        <input class='input' v-model='adoptData.sm_profit' />
                        <span>%</span>
                    </span>
                </div>
                <div >
                    <span>ubi奖励分成:</span>
                    <span>
                        <input class='input' v-model='adoptData.ubi_profit' />
                        <span>元</span>
                    </span>
                </div>
                <div>
                    <a href="javascript:;" class="col-1EA" @click='RecommendVisible=true,RecommendData(adoptData.pid)'>推荐人: {{Recommender}} <span v-show='!radio'> (请点击选择)</span></a>
                </div>
                <div v-show='radio'>
                    <span>推荐奖励:</span>
                    <span>
                        <input class='input' v-model='adoptData.price' placeholder='请输入' />
                        <span>元</span>
                    </span>
                 </div>
            </div>
            <el-dialog title="推荐人" append-to-body :visible.sync="RecommendVisible" width="30%" center>
                <div class='Recommend'>
                    <div>
                        <p>服务经理</p>
                        <p>
                            <el-radio-group v-model="radio.name">
                                <el-radio @click.native.prevent="changeRadio(item)" v-for='item in serveList' :label="item.name" :key='item.name'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </p>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="Sure">确定</el-button>
                </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DetermineAdopt">确定</el-button>
            </div>
        </el-dialog>

        <!--驳回弹框-->
        <el-dialog title="驳回理由" :visible.sync="RejectDialogVisible" width="400px" center @close="RejectClose">
            <div class='textarea'>
                <textarea v-model="reason"></textarea>
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
        
        <!--分页的组件-->
        <div class="page_center">
         <paging :page-count="pageCount"   :page="page" @index="paging" ></paging>
        </div>
    </div>
</template>

<script>
  import news from "@/components/news/news"
  import Viewer from '@/utils/Viewer'
  export default {
    data(){
      return{
        token:window.sessionStorage.getItem("bbytoken"),
        pageCount:1,  //总页数,默认1
        page:1,       //当前页
        dataList:[],
        detailsDialogVisible:false,  //详情弹框,默认不显示
        detailsData:{},  //详情弹框数据
        adoptDialogVisible:false,    //通过申请弹框,默认不显示
        adoptData:{},//通过弹框数据
        selectData:'', //下拉数据
        adoptID:'', //通过id,
        RejectID:'',//驳回id
        RejectDialogVisible:false,   //驳回弹框,默认不显示
        reason:'', //驳回理由,
        ImgDialogVisible:false,
        imgUrl:'',
        RecommendVisible:false,
        serveList:'', //服务经理
     
        radio:'',
        regionDialogVisible:false,
        reasonData:[],
        check:false
      }
    },
    created(){
        
    },
    methods:{
      //初始化数据
      init(){  //调取注册审核列表接口
        this.$axios.post('Smoc/regAudit',{token:this.token,page:this.page}).then(res=>{
          if(res.data.code==1){
        
          this.dataList=res.data.data.data     //拿返回来的数据
          this.pageCount=res.data.data.last_page  //拿取总页数
        }else {
          this.dataList=null
          layer.msg(res.data.msg,{time:1000}) //如果code不等于一代表,没有数据，提示暂无数据
        }
      }).catch(err=>console.log(err))
      },
      /** 支付凭证放大 **/
      enlarge(index){
     
          this.$nextTick(()=>{
             const ViewerDom=this.$refs.enlarge[index];
            Viewer(ViewerDom)
          })
      },
      /** **/
      changeRadio(e){
      
        this.radio = e.name===this.radio.name ? '' :e 
      },
      /** 地区 */
      region(id){
         this.$axios.post('admin/Smoc/areaNum',{
           token:this.token,
           id:id,
           type:1
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
      //点击通过
      adopt(id){
        this.adoptDialogVisible=true;
        this.adoptID=id;
        this.$axios.post('Smoc/checkREg',{token:this.token,id:id}).then(res=>{
            if(res.data.code==1){
               
                 this.adoptData=res.data.data;
                 if(this.adoptData.sm_status==1)this.selectData=1
                 if(this.adoptData.sm_status==2)this.selectData=2
            }
        }).catch(err=>console.log(err))
      },
      // 点击确定通过
      DetermineAdopt(){
         var adoptData={
           token:this.token,
           id:this.adoptID,
           sm_profit:this.adoptData.sm_profit,
           sm_mold:this.selectData,
           share_id:this.radio.sm_id,
           ubi_profit:this.adoptData.ubi_profit,
           price:this.adoptData.price
         }
          this.$axios.post('Smoc/regPass',adoptData).then(res=>{
              if(res.data.code==1){
                 layer.msg(res.data.msg,{time:1500},(()=>{
                       this.$store.commit('increment')
                       this.adoptDialogVisible=false
                       this.$router.push('/serviceManager/Physics')
                   }))
              }else{
                
                 layer.msg(res.data.msg,{time:1500})
              }
          }).catch(err=>console.log(err))
      },
      RecommendData(pid){
         this.$axios.post('Smoc/getListPersonnel',{token:this.token,area_id:pid,sm_id:this.uid}).then(res=>{
             if(res.data.code==1){
         
                this.serveList=res.data.data
              
             }
         }).catch(err=>console.log(err))
      },
      Sure(){
         this.RecommendVisible=false
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
          this.$axios.post('Smoc/regDown',{token:this.token,id:this.RejectID,reason:this.reason}).then(res=>{
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
    computed:{
      count(){
        return this.$store.state.count
      },
      /** 推荐人 -- 检测是否是不是本地地区 **/
      Recommender(){
         let radio=this.radio;
         return radio ? `${radio.name}( ${radio.sign==1 ? '本地区' : '不是本地区' } )` : '暂无'
      },
    //   /** 检测是本地区开发奖励不是本地区推荐奖励 **/
    //   Testing_region(){
    //     let radio=this.radio;
    //     return radio.sign ? '开发奖励' : '推荐奖励'
    //   }
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
     margin-bottom: 38px;
  }
  .adoptContent>div{
    margin-top: 20px;
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
  .imgUrl{
    width: 100%;
    text-align: center;
  }
  .imgUrl>img{
      width: 100%;
  }
  .Recommend:after{
    display: block;
    content: '';
    clear: both;
  }
  .Recommend{
    height: 200px;
    overflow: auto;
  }
  .Recommend>div{
    width: calc(100%/3 - 10px);
    float: left;
    height: 100%;
    border-right: 1px solid #ccc;

  }
  .Recommend>div>p:first-child{
    width: 100%;
 
  }
  .Recommend>div:last-child{
    border: none;
  }
 .Recommend .el-radio{
      margin-left: 0;
      display: block ;
      margin-top: 10px
 }
  .enlarge>img{
    width: 50px;
    height: 50px;
    vertical-align: middle
  }
</style>
<style>
   .el-dialog__header{
    border-bottom: 1px solid #E6E6EB !important;
    padding: 13px 0 !important;
    background:#fff !important;
    color:#f5f5;
  }
  .el-dialog__headerbtn{
    top: 15px;
  }
  .el-dialog__footer{
    border-top: 1px solid #E6E6EB;
    padding-bottom: 10px;
  }
</style>
