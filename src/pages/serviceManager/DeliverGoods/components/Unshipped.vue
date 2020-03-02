<template lang="html">
  <div class="">
     <div class="search">
        <div>
           <el-input placeholder="请输入服务经理姓名"  class="input-with-select" v-model='name'>
              <el-button slot="append" @click='search'>搜索</el-button>
          </el-input>
        </div>
        <div>
            <el-date-picker
            v-model="picker"
            type="daterange"
            range-separator="至 "
            start-placeholder="开始日期"
            @change='search'
            value-format='yyyy-MM-dd'
            end-placeholder="结束日期">
            </el-date-picker>
        </div>
    </div>
    <div class="">
      <table class="table">
        <tr>
          <th>订单编号</th>
          <th>服务经理姓名</th>
          <th>收货人姓名</th>
          <th>收货人电话</th>
          <th>收获地址</th>
          <th>用户支付时间</th>
          <th>操作</th>    
        </tr>
        <tr v-for="item in dataList">
          <td class="name">{{item.order_number}}</td>
          <td>{{item.name}}</td>
          <td>
               {{item.man}}
          </td>
          <td>{{item.phone}}</td>
          <td >
            <a href='javascript:;' class='col-1EA' @click='regionDialogVisible=true,reasonData=item'>查看</a>
          </td>
          <td>
             {{item.time}}
          </td>
          <td>
              <a href="javascript:;" :class="[item.remind_status==0?'col-1EA': 'col-0ACD00']" class='adopt' @click='DeliverGoods(item)'>{{item.remind_status==0?'提醒发货':'已提醒'}}</a>
          </td>
        </tr>
      </table>
     
      <el-dialog title="收货地址" :visible.sync="regionDialogVisible" width="400px" center >
            <div class='reason'>
                {{`${reasonData.address}${reasonData.details}`}}
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
        dataList:[],
        regionDialogVisible:false,
        reasonData:{},
        name:'',
        picker:'' 
      }
    },
    computed:{
        pickerTime(){
            let pickerData=this.picker;
            return{
                start_time: pickerData && pickerData[0] ? pickerData[0] :'',
                end_time: pickerData && pickerData[1] ? pickerData[1] :'',
            }
        }
    },
    methods:{
      //初始化数据
      init(){
       
        this.$axios.post('admin/SmocRationMsg/totalShipment',{
            token:this.token,
            status:0,
            page:this.page,
            search:this.name,
            start_time:this.pickerTime.start_time,
            end_time:this.pickerTime.end_time
        }).then(res=>{
          if(res.data.code==1){
          this.dataList=res.data.data.list; //拿返回来的数据
       
          this.pageCount=res.data.data.rows  //拿取总页数
        }else{
          this.dataList={}
          layer.msg(res.data.msg,{time:1000}) //如果code不等于一代表,没有数据，提示暂无数据
        }
      }).catch(err=>console.log(err))
      },
    
      /**发货 */
      DeliverGoods(data){ 
            if(data.remind_status==0){
                this.$axios.post('admin/SmocRationMsg/shippingReminder',{
                token:this.token,
                sm_id:data.sm_id,
                id:data.id
            }).then(res=>{
                 if(res.data.code==1){
                     this.$message({message:res.data.msg,type:'success'})
                     this.init()
                 }else{
                     this.$message.error(res.data.mag)
                 }
            }).catch(err=>{
                throw(err)
            })
            }
      },
      /* 搜索*/
      search(){
        
            this.init()
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

  .Head_portrait{
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin: 5px 0;
    border-radius: 50%;
  }
  .search{
    margin: 15px 0 15px 30px;
  }
   
  .search>div{
     width: 18%;
     display: inline-block;
     margin-right: 20px;
  }
  .search >>> .el-range-separator{
     padding: 0
  }


  .Conduct>a{
    margin-left: 20px;
  }
  .name{
    width: 15%;
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
  .reason{
      min-height: 100px
  }
</style>
<style >

 .el-date-table th{
     background: none;
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
