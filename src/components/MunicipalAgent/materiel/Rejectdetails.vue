<template>
	<div>
		<div class="main">
			
			
			<div class="el_table">
			
				<el-table :data="list" style="width: 100%;"border >
					<el-table-column prop="name" label="物料名称" align="center" >
					</el-table-column>
					<el-table-column prop="size" label="数量/件" align="center">
					</el-table-column>
					<el-table-column prop="remarks" label="备注" align="center">
					</el-table-column>
				</el-table>
			</div>
        
		</div>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				token: window.sessionStorage.getItem('bbytoken'),
				list: []
			}
		},
		
		created(){
			this.init()
		},
		methods:{
			init(){
				var id=this.$route.query.gid;
				this.$axios.post("supply/detail",{token:this.token,id:id}).then(res=>{
					if(res.data.code==1){
						this.list=res.data.data.details
					}
				}).catch(err=>{
				
				})
			}
		},
		mounted(){
			this.isShow=this.$route.query.isShow
			
		},
		 
	}
</script>
<style scoped>
	.main {
	
		
		width: 70%;
		margin: 93px auto;
		font-size: 20px;
		color: #333333;
	}
	
	.information {
		color: #333333;
		font-size: 20px;
	}
	
	.information>ul:after {
		display: block;
		content: "";
		clear: both;
	}
	
	.information>ul {
		margin-bottom: 20px;
	}
	
	.information>ul>li {
		float: left;
		margin-right: 40px;
	}
	.el_table:after{
		display: block;
		content: "";
		clear: both;
	}
	.el_table {
		margin-top: 40px;
	}
	
	
	.time{
		margin-top: 49px;
	}
	.time>p{
		display: inline-block;
		margin-right: 38px;
	}

</style>
 <style>
 	.el-table__header{
 		
 	}
 </style>