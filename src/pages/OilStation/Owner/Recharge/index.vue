<template>
    <div>
       <div class="search">
           <div>
                <el-input placeholder="请输入车主姓名" v-model="searchName" class="input-with-select">
                    <el-button slot="append" @click="init">搜索</el-button>
                </el-input>
           </div>
           <div>
                <el-date-picker
                    v-model="picker"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    @change="init()"
                    value-format='yyyy-MM-dd'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                </el-date-picker>
           </div>
       </div>
       <div>
           <el-table :data="tableData"   style="width: 100%" >
            <el-table-column prop="name" label="用户姓名" align="center">
                  
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center">
                  
            </el-table-column>
            <el-table-column prop="pay_time" label="充值时间" align="center">
                  
            </el-table-column>
             <el-table-column prop="recharge_money" label="充值金额" align="center">
                  
            </el-table-column>
               <el-table-column prop="actual_price" label="收款来源" align="center">
                  <template slot-scope="scope">
                      {{scope.row.env_type==1 ? '邦保养' : 'UBI'}}
                  </template>
            </el-table-column>
           </el-table>
           <div class="total">
               <strong>合计:{{this.total || 0}}元</strong>
           </div>
            <template >
                <pagination  class="page_center" :pageCount='pageCount' @index='currentPage' />
            </template>
       </div>
    </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
export default {
    components:{pagination},
     data(){
        return{
            token:window.sessionStorage.getItem('bbytoken'),
            page:1,//当前页
            pageCount:1,
            tableData:[
                {
                    name:'仲达集团'
                }
            ],
            searchName:'',
            Total:1000,
            picker:'',
            total:0
        }
    },
    computed:{
         pickerData(){
             let picker =this.picker;
             return{
                 start_time: picker && picker[0] ? picker[0]: '',
                 end_time:picker && picker[1] ? picker[1]: '',
             }
         }
    },
    methods:{
         async init(){
             try{
                 let {start_time,end_time}=this.pickerData
                 let res = await this.$axios.post('admin/OilUser/rechargeRecord',{
                     token:this.token,
                     search:this.searchName,
                     start_time:start_time,
                     end_time:end_time,
                     page:this.page
                 })
                 if(res.data.code==1){
                     this.tableData=res.data.data.list
                     this.pageCount=res.data.data.rows;
                     this.total=res.data.data.total
                 }else{
                     this.tableData=[]
                 }
             }catch(err){
                 throw(err)
             }
         },
        currentPage(e){
            this.page=e;
            this.init()
        }
    },
    mounted(){
        this.init()
    }
}
</script>

<style scoped>
    >>> .el-table th{
        height: 30px !important;
        line-height: 30px !important;
       
    }
    table th{
        background:none !important
    }
    .search{
        margin: 0 0 20px 30px
    }
    .search>div{
        width: 18%;
        display: inline-block;
        margin-right: 20px
    }
    >>> .el-date-editor .el-range-separator{
        padding: 0
    }
    >>>   .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .total{
        color: #04BBFC;
        font-size: 18px;
        margin: 30px 30px 30px 0;
        text-align: right
    }
  
</style>
<style>
  table th{
        background:none !important
    }
</style>
