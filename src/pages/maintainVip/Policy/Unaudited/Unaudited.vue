<template>
  <div class='Unaudited' ref='Unaudited'>
      <table class='table'>
          <tr>
            <th>用户名称</th>
            <th>电话</th>
            <th>车型</th>
            <th>车牌号</th>
            <th>保险公司名称</th>
            <th>设备号</th>
            <th>保单号</th>
            <th>申请时间</th>
            <th>详情</th>
          </tr>
          <tr v-for="item in list">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.type}}</td>
            <td>{{item.plate}}</td>
            <td>{{item.company}}</td>
            <td>{{item.eq_num}}</td>
            <td>{{item.policy_num}}</td>
            <td>{{item.create_time}}</td>
            <td>
              <a href="javascript:;" @click="details(item.pid,item.u_id)">详情</a>
            </td>
          </tr>
      </table>
      <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="detailsVisible" width="800px" v-drag center>
      <div class='details'>
           <div class='content'>
             <!--保单信息-->
             <dl class='information'>
               <dt>保单信息:</dt>
               <dd class='left'>
                  <table class='table'>
                     <tr>
                       <td>保险公司 : {{information.company}}</td>
                       <td>保单号 : {{information.policy_num}}</td>
                       <td>VIN码 : {{information.vin}}</td>
                     </tr>
                    <tr>
                      <td>开始时间 : {{information.start_time}}</td>
                      <td>结束时间 : {{information.end_time}}</td>
                    </tr>
                  </table>
               </dd>
             </dl>
             <!--险种详情-->
             <div class='Insurancetype'>
               <table>
                 <tr>
                   <th>险种名称</th>
                   <th>金额</th>
                 </tr>
                 <tr v-for="item in information.name_price">
                   <td>{{item.type}}</td>
                   <td>{{item.value}}</td>
                 </tr>
               </table>
             </div>
             <div class='total'>
                <span class='right'>保单总金额:{{information.total}}</span>
             </div>
             <!--保单照片-->
             <div class='Photo'>
               <ul>
                 <li v-for='(item,key) in information.pc_img'><img :src="item | images" @click="ImgDialogVisible=true,enlarge()"></li>
               </ul>
             </div>
           </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Reject">驳回</el-button>
        <el-button type="primary" @click="adopt">通过</el-button>
      </span>

      <!--驳回理由-->
      <el-dialog width="30%" title="驳回理由" class="Reason" :visible.sync="ReasonVisible" append-to-body center >
                <div class='content'>
                    <textarea v-model='reason'>

                    </textarea>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="SureReject">确定</el-button>
                </span>
      </el-dialog>
    </el-dialog>
    </el-dialog>
      <!--分页组件-->
      <div class="page_center">
        <paging :page-count="pageCount"   :page="page" @index="paging"></paging>
      </div>
  </div>
</template>
<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  export default{
    data(){
      return{
         token:window.sessionStorage.getItem('bbytoken'),
         list:{},
         page:1, //当前页
         pageCount:1,//总页数
         detailsVisible:false, //详情弹框状态
         ReasonVisible:false, //驳回理由状态
         ImgDialogVisible:false, //图片放大状态
         information:{}, //保单信息
         reason:'', //驳回理由
         UnauditedID:{},
         ImgList:'',
         transform:{
           transform:''
         },
        rotateData:0,
        iconfont:false
      }
    },
    directives: {
      drag: {
        // 指令的定义
        bind: function (el) {
          //获取当前元素
          var odiv=el.querySelector('.el-dialog')
          odiv.onmousedown = (e) => {
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;

            document.onmousemove = (e)=>{
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              let left = e.clientX - disX;
              let top = e.clientY - disY;

              //绑定元素位置到positionX和positionY上面
//              this.positionX = top;
//              this.positionY = left;
              //移动当前元素
              odiv.style.marginLeft = left+"px"
              odiv.style.marginTop = top + 'px';
            };
            document.onmouseup = (e) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
      }
    },
    filters:{
      images(e){
         return  e.replace(/\\/g, "//")
      }
    },
    methods:{
      init(){
        this.$axios.post('admin/PolicyAudit/auditStatus',{token:this.token,page:this.page}).then(res=>{
            if(res.data.code==1){
               
                this.list=res.data.data.list
                this.pageCount=res.data.data.rows
             }else{
                this.list={}
                layer.msg(res.data.msg,{time:1500})
             }
        }).catch(err=>console.log(err))
      },
      //查看未审核列表详情
      details(pid,uid){
        
          this.UnauditedID={
            token:this.token,
            pid:pid,
            uid:uid
          }
          this.detailsVisible=true
          this.$axios.post('admin/PolicyAudit/detail',{token:this.token,pid:pid}).then(res=>{
               if(res.data.code==1){
                  this.information=res.data.data


               }
          }).catch(err=>console.log(err))
      },
      //驳回操作
      Reject(){
         this.ReasonVisible=true
      },
      //确定驳回
      SureReject(){
            if(!this.reason){
              layer.msg('请输入驳回理由',{time:1500})
              return;
            }
         this.UnauditedID.reason=this.reason
         this.$axios.post('admin/PolicyAudit/reject',this.UnauditedID).then(res=>{
             if(res.data.code==1){
                this.$store.commit('policyNumberReduce')
                layer.msg(res.data.msg,{time:1500},(()=>{
                      this.detailsVisible=false
                      this.ReasonVisible=false
                      this.init()
                  }))
             }else {
                layer.msg(res.data.msg,{time:1500})
             }
         }).catch(err=>console.log(err))
      },
      //通过操作
      adopt(){
         this.$axios.post('admin/PolicyAudit/adopt',this.UnauditedID).then(res=>{
             if(res.data.code==1){
                this.$store.commit('policyNumberReduce')
                layer.msg(res.data.msg,{time:1500},(()=>{
                     this.detailsVisible=false
                      this.init()
                  }))
             }else{
                layer.msg(res.data.msg,{time:1500})
             }
         }).catch(err=>console.log(err))
      },

      //操作分页
      paging(page){
         this.page=page
         this.init()
      },
      enlarge(){ //图片放大
        const ViewerDom = this.$refs.Unaudited
        const viewer = new Viewer(ViewerDom, {});
      }
    },
    mounted(){

      this.init()
    }
  }
</script>
<style scoped>
  >>> .viewer-canvas{
    z-index: 9999;
  }
  >>> .el-dialog__wrapper{
        overflow: hidden;
      }
  .imgUrl div{
    overflow: auto;
    height: 600px;
  }
  .table a{
    color: #04BBFC;
  }
  .table td{

  }
   .details{
     font-size: 12px;
     height: 500px;
     overflow: auto;
   }
  .information td{
       text-align: left;
  }
  .details table td{
    font-size: 12px;
    border: none;
  }
  .Insurancetype{
    margin-top: 20px;
  }
  .Insurancetype table{
    border:1px solid #DBDBDB
  }
  .Insurancetype table th{
    background: none;
    width: 50%;
    border:1px solid #DBDBDB;
    font-size: 16px;
    text-align: center;
  }
  .Insurancetype table td{
    border:1px solid #DBDBDB
  }
  .Photo{
    text-align: center;
    margin-top: 20px;
    overflow-x: auto;
  }

  .Photo>ul{
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .Photo>ul>li{


  }
  .Photo img{
    text-align: center;
    max-height: 100px;
    max-height: 100px;
    width: 100px;
    height: 100px;
    padding-left: 10px;
  }
 .content>textarea{
   border: none;
   width: 100% !important;
   resize:none;
   height: 100px;
   max-height: 300px !important;
 }
 .total:after{
   display: block;
   content: '';
   clear: both;
 }

.right{
  float: right;
  margin: 20px 0;
  font-size: 18px;
  color: #04BBFC;
}

</style>
<style>
  .Unaudited .el-dialog__header{
      background: none;
      padding-bottom: 20px;
      border-bottom: 1px solid #E6E6EB;
  }
  .Unaudited .el-dialog__footer{
      border-top: 1px solid #E6E6EB;
      padding-bottom: 10px;
  }
  .Reason .el-dialog__header{

    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6EB;
  }
  .Reason .el-dialog__footer{
    border-top: 1px solid #E6E6EB;
    padding-bottom: 10px;
  }


</style>
