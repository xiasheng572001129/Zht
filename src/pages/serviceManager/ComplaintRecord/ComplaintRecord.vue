<template lang="html">
   <div class="">
      <herderBar></herderBar>
     <div class="search">
       <el-select placeholder="请选择" v-model="selectData">
         <el-option label='全部' value="0"></el-option>
         <el-option label='已处理' value="1"></el-option>
         <el-option label="未处理" value="2"></el-option>
       </el-select>
       <el-input placeholder="请输入搜索的名称" class="input" v-model="name"></el-input>
       <el-button  type="primary" class="search_btn" @click="search">搜索</el-button>
     </div>
      <div class="">
         <table class="table">
             <tr>
                <th>姓名</th>
                <th>电话</th>
                <th>投诉人</th>
                <th>投诉内容</th>
                <th>投诉时间</th>
                <th>状态</th>
                <th>处理时间</th>
             </tr>
             <tr v-for="item in dataList">
                  <td class="name">{{item.name}}</td>
                  <td>{{item.phone}}</td>
                  <td>
                      <a href="javascript:;" class="col-1EA" @click="ComplaintDialog(item.id)">{{item.tousuren}}</a>
                  </td>
                  <td class="content">
                    <span class="Reason">{{item.content}}</span>
                    <a href="javascript:;" class="See col-1EA" @click="ComplaintContent(item.id)">查看</a>
                  </td>
                  <td>
                    <span>{{item.create_time}}</span>
                  </td>
                  <td >
                     <a @click='Handle(item)' :class="[item.sm_status==0?'col-FA644B':'col-0ACD00']" href='javascript:;'>{{item.sm_status==1?'已处理':'未处理'}}</a>
                  </td>
                  <td>
                    <span>{{item.handle_time}}</span>
                  </td>
             </tr>
         </table>
        <!--投诉人弹框-->
        <el-dialog title="投诉人" class="teamDialog" width="500px" :visible.sync="ComplaintVisible" center>
          <div>
            <table class="table ComplaintTable">
              <tr>
                <td>名称:</td>
                <td>{{Complaintlist.name}}</td>
              </tr>
              <tr>
                <td>类型:</td>
                <td >
                  <div v-show="Complaintlist.type==1">运营商</div>
                  <div v-show="Complaintlist.type==2">市级代理</div>
                  <div v-show="Complaintlist.type==3">维修厂</div>
                </td>
              </tr>
              <tr>
                <td>负责人:</td>
                <td></td>
              </tr>
              <tr>
                <td>电话:</td>
                <td>{{Complaintlist.phone}}</td>
              </tr>
              <tr>
                <td>地址:</td>
                <td>{{Complaintlist.address}}</td>
              </tr>
            </table>
          </div>
        </el-dialog>
        <!--投诉内容弹框-->
        <el-dialog title="投诉内容" class="teamDialog" width="500px" :visible.sync="ComplaintContentVisible" center>
          <div class="ComplaintContent">
              {{Complaintdata}}
          </div>
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
      pageCount:1,  //总页数,默认1
      page:1,       //当前页
      name:'',//当前搜索名字
      selectData:"0",
      dataList:[],
      ComplaintVisible:false,//投诉弹框
      ComplaintContentVisible:false, //投诉内容弹框
      Complaintlist:{},//投诉人数据
      Complaintdata:'' //投诉内容
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
        status:data?data.status:''
      }
      this.$axios.post('Smoc/tousu',Data).then(res=>{
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
    Handle(data){
          if(data.sm_status==1){
            return;
          }
          this.$confirm('您确定要处理吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
               this.$axios.post('admin/SmComplaint/processingOperation',{token:this.token,id:data.id,sm_id:data.sm_id}).then(res=>{
                   if(res.data.code==1){
                      this.$message({message:res.data.msg,type:'success'})
                      this.init()
                   }else{
                     this.$message.error(res.data.msg)
                   }
               })
          }).catch(() => {
                  
          });
    },
    //点击查看投诉人详情
    ComplaintDialog(id){
      this.ComplaintVisible=true
      this.$axios.post('Smoc/tsDetail',{token:this.token,id:id}).then(res=>{
           if(res.data.code==1){
             
              this.Complaintlist=res.data.data
           }
      }).catch(err=>console.log(err))
    },
    //投诉内容弹框
    ComplaintContent(id){
      this.ComplaintContentVisible=true
      this.$axios.post('Smoc/xcl',{token:this.token,id:id}).then(res=>{
         if(res.data.code==1){
             
             this.Complaintdata=res.data.data
         }
      }).catch(err=>console.log(err))
    },
    //操作分页组件
    paging(e){
      //把当前页赋值给page
      this.page=e;
      // 当前页发生改变时调取注册审核列表接口,重新渲染
      this.init()
    }
  },
  mounted(){
    this.init()
    this.$store.commit('increment')
  }
}
</script>

<style lang="css" scoped="scoped">
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
 .content{
   width: 150px;
   margin: 0 auto;
 }
 .Reason{
     width: 50px;
     display: inline-block;
     white-space:nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     text-align: left;
     float: left;
     margin-left: 40px;
 }
 .rel{
   position:relative;
 }
 .See{
   float: left;
 }
  /*投诉人弹框*/
  .ComplaintTable{
    margin-bottom: 20px;
  }
  .ComplaintTable>tr>td{
    width: 50% !important;
    text-align: left;
    padding: 0 10px;
  }
  .ComplaintTable>tr>td:last-child{
    text-align: right;
  }
  /*投诉内容弹框*/
  .ComplaintContent{
    margin-top: 20px;
    padding-bottom: 40px;
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
  .el-dialog__header{
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6EB;
  }
  .el-dialog__body{
    padding-top: 0 !important;
  }
</style>
