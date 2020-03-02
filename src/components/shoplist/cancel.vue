<template>
	<div class="main" ref='main'>
		<ctbHead>
			<router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
		</ctbHead>
		<div class="container">
			<div class="quote">
				<div class="quote-ele"><i></i>取消合作</div>
				<div class="quote-nav">
					<router-link :class="thCurId==item.id? 'cur':''" v-for="item in threeAuthList" :key="item.id" :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
				</div>
			</div>
			<table class="table">
				<thead>
					<tr>
						<th>维修厂</th>
						<th>联系电话</th>
						<th>负责人</th>
						<th>物料详情</th>
						<th>取消理由</th>
						<th>申请时间</th>
					    <th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list">
						<td class="t-l">{{item.company}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.leader}}</td>
						<td><a href="javascript:;" @click='detailsDialogVisible=true,details(item)'>查看</a></td>
						<td>
							<el-popover
							placement="top-start"
							title=""
							width="200"
							trigger="hover"
							:content="item.reason">
							<el-button type="text" slot="reference" class="popover">{{item.reason}}</el-button>
							</el-popover>
						</td>
						<td>{{item.create_time}}</td>
						<td>
							<a href="javascript:;" @click="adopt(item)">通过</a>
						</td>
					</tr>
				</tbody>
			</table>
			 <el-dialog
                title="详情"
                :visible.sync="detailsDialogVisible"
				width="70%"
                center>
                <div ref='el_table' class="el_table">
                    <el-table :data="materielData.supplement" border style="margin:20px 0">
						 <el-table-column label="名称" prop="name" align="center" width="300"></el-table-column>
						<el-table-column label="期初配给" prop="ration" align="center" ></el-table-column>
                        <el-table-column label="剩余库存" prop="stock" align="center" ></el-table-column>
						<el-table-column label="需补充数量（库存）" width="300" prop="supplement" align="center" ></el-table-column>
                    </el-table> 
                </div>
              
            </el-dialog>
			<!-- 分页 -->
			<div class="page_center" v-show="pageCount&&pageCount>1">
				<paging :page-count="pageCount" :page="page" @index="paging"></paging>
				<!--分页的组件-->
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import page from '../common.js';
	export default {
		data() {
				return {
					list: [],
					token: window.sessionStorage.getItem('bbytoken'),
					//分页数据
					page: 1, //显示的页码数
					totalpage: 1, //总页数
					pageCount: 1,
					index: 1, //点击的当前页，
					endpage: 1, //当前一组页码的最大值
					arr: [], //默认显示 1 2 3 4 5页
					n: 1, //当前点击的页码的位置
					authList: [],
					curId: 0,
					seCurId: 0,
					materielData:[],
					detailsDialogVisible:false
				}
			},
			methods: {
				go: page.go,
				first: page.first,
				end: page.end,
				prev: page.prev,
				next: page.next,
				showpage: page.showpage,
				paging(e) {
					this.page = e;
					this.init()
				},
				init() {
					this.$axios.post('admin/ShopCancel/index', {
							token: this.token,
							page: this.page,
							status:0
						})
						.then(res => {
							
							if(res.data.code == 1) {
								this.list = res.data.data.list;
								this.showpage(res.data.data);
								this.pageCount = res.data.data.rows;
							}else{
								layer.msg(res.data.msg)
								this.list=[]
							}
						})
						.
					catch(err => console.log(err))
				},
				/* 物料详情 */
			  async	details(row){
                     try{
						const res = await this.$axios.post('admin/ShopCancel/detail',{token:this.token,id:row.id})
						this.materielData=res.data.data 
					 }catch(err){
						 throw(err)
					 }
				},
				/* 打印table表格 */
				Printing(){
					let subOutputRankPrint = this.$refs.el_table
					let newContent =subOutputRankPrint.innerHTML;
					let oldContent = document.body.innerHTML;
					document.body.innerHTML = newContent;
					
					window.print();
					window.location.reload();
					
					document.body.innerHTML = oldContent;
					return false;
				},
				/* 通过审核 */
				adopt(row){
                     this.$confirm('您确定要通过吗,是否继续?','提示',{
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
					 }).then(async()=>{
						 const res = await this.$axios.post('admin/ShopCancel/adopt',{token:this.token,sid:row.sid,id:row.id})
						 if(res.data.code==1){
							  this.$message({message:res.data.msg,type:'success'})
							  this.init()
						 }else{
							 this.$message.error(res.data.msg)
						 }
					 }).catch(err=>{})
				}
			},
			created() {
				this.init();
			},
			mounted() {
				var id = this.$route.query.id;
				this.curId = id;
				this.$axios.post('admin/Auth/erAuth', {
						token: window.sessionStorage.getItem('bbytoken'),
						id: id
					})
					.then(res => {
						
						if(res.data.code == 1) {
							var arr = res.data.data;
							for(var i = 0; i < arr.length; i++) {
								if(arr[i].son) {
									if(arr[i].name == '取消合作') {
										this.seCurId = arr[i].id;
										this.threeAuthList = arr[i].son;
										
									}
									for(var j = 0; j < arr[i].son.length; j++) {
										if(arr[i].action != arr[i].son[j].action) {
											arr[i].action = arr[i].son[0].action;
										}
										if(arr[i].son[j].name == '未审核' && arr[i].name == '取消合作') {
											this.thCurId = arr[i].son[j].id;
										}
									}
								}
							}
							this.authList = arr;
						} else {
							this.$alert(res.data.msg, '提示', {
								type: 'error'
							});
						}
					})
					.catch(err => {
						alert(err);
					})
			},
			watch: {
				index() {
					this.init();
				}
			}
	}
</script>
<style scoped>
   @media print {
      html,body{
		  width: 100%
	  }
	  .el_table{
		  width: 50px !important
	  } 
   }
   .popover{
	   max-width: 100px;
	   text-overflow: ellipsis;
	   overflow: hidden;
   }
</style>
