<template>
    <div>
        <el-table :data="tableData"  style="width: 100%" >
            <el-table-column prop="oil_shop_name" label="油站名称" align="center">
                
            </el-table-column>
            <el-table-column prop="oil_leader" label="负责人" align="center">
                  
            </el-table-column>
            <el-table-column prop="leader_phone" label="负责人联系电话" align="center">
                  
            </el-table-column>
            <el-table-column  label="关停次数" align="center">
                  <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="ShutdownVisible=true,Shutdown(scope.row)">{{scope.row.count}}</el-button>
                  </template>
            </el-table-column>
          <el-table-column prop="shop_phone" label="开通理由" align="center">
                   <template slot-scope="scope">
                      <el-popover
                            placement="top-start"
                            title="开通理由"
                            width="300"
                            trigger="hover"
                            :content="scope.row.reason">
                            <el-button slot="reference" type="text">查看</el-button>
                        </el-popover>
                  </template>
            </el-table-column>
          
            <el-table-column prop="date" label="操作" align="center">
                   <template slot-scope="scope">
                       <el-button  type="primary" size="small" @click="adopt(scope.row)">通过</el-button>
                       <el-button  type="danger" size="small" @click="RejectData=scope.row,RejectVisible=true">驳回</el-button>
                   </template>
            </el-table-column>
        </el-table>
        <template>
            <el-dialog
                    title="关停详情"
                    :visible.sync="ShutdownVisible"
                    width="40%"
                    center>
                    <div class="Shutdown">
                        <el-table :data="ShutdownDetails" style="width: 100%">
                            <el-table-column label="关停人" align="center" prop="audit_person"></el-table-column>
                            <el-table-column label="关停理由" align="center" prop="reason"></el-table-column>
                            <el-table-column label="关停时间" align="center" prop="create_time"></el-table-column>
                    </el-table>
                    </div>
            </el-dialog>
            <el-dialog
                title="驳回理由"
                :visible.sync="RejectVisible"
                @close='close'
                center>
                <div class="Reason">
                    <el-input
                        type="textarea"
                        autosize
                        :autosize="{ minRows: 10, maxRows: 10}"
                        placeholder="请输入取消合作理由"
                        v-model="reason">
                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="Reject">确定</el-button>
                </span>
            </el-dialog>
        </template>
        <template >
            <pagination  class="page_center" :pageCount='pageCount' @index='init' />
        </template>
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
            tableData:[],
            ShutdownVisible:false, //店铺详情 
            ShutdownDetails:[],
            sellVisible:false, //所售汽油
            SellOut_Oils:[],//所售汽油详情 
            RejectVisible:false, //驳回
            RejectData:'',
            reason:'',//驳回理由
            ProfitVisible:false, //收益
            ProfitList:[]
        }
    },
    methods:{
         async init(e=1){
            try{
               let res = await this.$axios.post('admin/OilExamine/reOpening',{token:this.token,page:e})
               if(res.data.code==1){
                   this.tableData=res.data.data.list
                   this.pageCount=res.data.data.rows;
               }else{
                   this.tableData=[]
               }
            }catch(err){
                throw(err)
            }
        },
         /* 关停详情 */
        async Shutdown(row){
            try{ 
               let res = await this.$axios.post('admin/OilExamine/shuttingDownDetails',{
                   token:this.token,
                   oil_id:row.oil_shop_id,
                   page:1
               })
               if(res.data.code==1){
                   this.ShutdownDetails=res.data.data.list
               } 
            }catch(err){
                throw(err)
            }
        },
        
        /* 通过审核 */
         adopt(row){
           this.$confirm('此操作将通过审核, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }). then( async () => {
                try{
                   let res = await this.$axios.post('admin/OilExamine/passThrough',{
                       token:this.token,
                       oil_id:row.oil_shop_id,
                       reason:row.reason,
                       open_id:row.id,
                   })
                   if(res.data.code==1){
                       this.$message({message:res.data.msg,type:'success'})
                       this.init()
                   }else{
                        this.$message.error(res.data.msg)
                   }
                }catch(err){
                    throw(err)
                }
            }).catch(err=>{});
        },
       
        /* 驳回申请 */
        async Reject(row){
            if(!this.reason){
                this.$message.error('请输入驳回理由')
                return;
            }
            try{
                let res = await this.$axios.post('admin/OilExamine/reject',{
                    token:this.token,
                    open_id:this.RejectData.id,
                    oil_id:this.RejectData.oil_shop_id,
                    rej_reason:this.reason
                })
                if(res.data.code==1){
                    this.RejectVisible=false
                    this.$message({message:res.data.msg,type:'success'})
                    this.init()
                }else{
                    this.$message.error(res.data.msg)
                }
            } catch(err){
                throw(err)
            }
        },
        /* 关闭对话框清空数据 */
        close(){
           this.reason=''
        },
    },
    mounted(){
        this.init()
    }
}
</script>

<style scoped>
    >>> .el-table th{
        height: 30px !important;
        line-height: 30px !important
    }
    .Shutdown{
        min-height: 200px
    }
   
     .sell{
        min-height: 200px
    }
    
</style>
