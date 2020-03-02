<template>
    <div>
        <el-table :data="tableData"  style="width: 100%" >
            <el-table-column prop="date" label="店铺名称" align="center">
                   <template slot-scope="scope">
                       <el-button  type="text" size="small" @click="shop_details=scope.row,ShopVisible=true,Shop()">{{scope.row.oil_shop_name}}</el-button>
                   </template>
            </el-table-column>
            <el-table-column prop="oil_leader" label="店铺负责人" align="center">
                  
            </el-table-column>
            <el-table-column prop="leader_phone" label="负责人联系电话" align="center">
                  
            </el-table-column>
            <el-table-column prop="shop_phone" label="店铺座机" align="center">
                  
            </el-table-column>
            <el-table-column  label="店铺地址" align="center">
                  <template slot-scope="scope">
                        <el-popover
                            placement="top-start"
                            title="详细地址"
                            width="200"
                            trigger="hover"
                            :content="`${scope.row.province}${scope.row.city}${scope.row.county}${scope.row.address}`">
                            <el-button slot="reference" type="text">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
                        </el-popover>
                  </template>
            </el-table-column>
          
            <el-table-column prop="date" label="所售汽油" align="center">
                  <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="sellVisible=true,Oils(scope.row)">详情</el-button>
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
                    title="店铺详情"
                    :visible.sync="ShopVisible"
                    width="40%"
                    center>
                    <div class="shop">
                        
                        <div>
                            <span>营业时间 : </span>
                            <span>{{`${shop_details.start_time}-${shop_details.end_time}`}}</span>
                        </div>
                        <div class="shop_image">
                            <span>店铺图片 : </span>
                            <span v-for='(item,index) in shop_details.shop_image' :key="index" >
                                <img :src="item" ref="enlarge">
                            </span>
                        </div>
                    </div>
            </el-dialog> 
            <el-dialog
                title="所售油品"
                :visible.sync="sellVisible"
                center>
                <div class="sell">
                    <el-table :data="SellOut_Oils"  border style="width: 100%">
                        <el-table-column label="油品名称" align="center" prop="oil_name"></el-table-column>
                        <el-table-column label="油站价" align="center" prop="station_price"></el-table-column>
                        <el-table-column label="折扣价" align="center" prop="discount_price"></el-table-column>
                        <el-table-column label="会员价" align="center" prop="member_price"></el-table-column>
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
            <pagination  class="page_center" :pageCount='pageCount' @index='currentPage' />
        </template>
    </div>
</template>

<script>
import Viewer from '@/utils/Viewer'
import pagination from '@/components/pagination/pagination'
export default {
    components:{pagination},
    data(){
        return{
            token:window.sessionStorage.getItem('bbytoken'),
            page:1,//当前页
            pageCount:1,
            tableData:[],
            ShopVisible:false, //店铺详情 
            shop_details:[],
            sellVisible:false, //所售汽油
            SellOut_Oils:[],//所售汽油详情 
            RejectVisible:false, //驳回
            RejectData:'',
            reason:'',//驳回理由
        }
    },
    methods:{
         async init(){
            try{
               let res = await this.$axios.post('admin/OilExamine/regAudit',{token:this.token,page:this.page})
               if(res.data.code==1){
                   this.tableData=res.data.data.list
                   this.pageCount=res.data.data.rows
               }else{
                   this.tableData=[]
               }
            }catch(err){
                throw(err)
            }
        },
        /* 图片放大 */
         Shop(){
            this.$nextTick(()=>{
              let ViewerDome=this.$refs.enlarge
              if(ViewerDome && ViewerDome.length>0){
                    ViewerDome.forEach(item=>{
                        Viewer(item)
                    })
              }
            })
        },
        /* 售出的油品详情 */
        async Oils(row){
            try{
                let res = await this.$axios.post('admin/OilExamine/oilType',{
                    token:this.token,
                    id:row.id
                })
                if(res.data.code==1){
                    this.SellOut_Oils=res.data.data
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
                   let res = await this.$axios.post('admin/OilExamine/regThrough',{
                       token:this.token,
                       phone:row.leader_phone,
                       name:row.oil_leader,
                       id:row.id
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
                let res = await this.$axios.post('admin/OilExamine/regDismissal',{
                    token:this.token,
                    id:this.RejectData.id,
                    phone:this.RejectData.leader_phone,
                    name:this.RejectData.oil_leader,
                    reason:this.reason
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
        line-height: 30px !important
    }
    .shop{
        min-height: 200px
    }
    .shop>div{
        margin-bottom: 20px
    }
     .sell{
        min-height: 200px
    }
    .shop_image img{
        width: 60px;
        height: 60px;
        vertical-align: top;
        border: 1px solid #ccc;
        margin-right: 10px
    }
    .text-align{
        width: 100%;
        text-align: center;
        margin: 30px 0;
    }
</style>
