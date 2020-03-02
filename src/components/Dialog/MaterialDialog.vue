<template>
	<div>
		<el-dialog title="物品交接" :visible="Visible" width="60%" center @close="close">
		     <el-table :data="tableData" style="width: 70%;margin: 50px auto;"border >
					<el-table-column prop="name" label="物料名称" align="center" >
					</el-table-column>
					<el-table-column prop="num" label="数量/件" align="center">
					</el-table-column>

				</el-table>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		data(){
			return{
          
			}
		},
		props:["Visible",'tableData'],
		methods:{
			close(){
				this.$emit("close")
			}
		}
	}
</script>
