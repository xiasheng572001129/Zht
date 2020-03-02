<template>
	<div>
		<el-dialog title="驳回理由" :visible="visible" width="660px" center @close="close">
			<div class="Reason">
				<span>驳回理由: </span>
				<textarea placeholder="请输入驳回理由" v-model="Reason"></textarea>
			</div>
			<span slot="footer" class="dialog-footer">
                 
                <el-button type="primary" round style="margin-bottom: 50px;" @click="Preservation">保存</el-button>
             </span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
				return{
					Reason:"",
				
				}
			},
			props: ["visible"],
			methods:{
				Preservation(){
					
					if(this.Reason){
						
						this.$emit("preservation",this.Reason,this.$route.query.gid)
					}else{
						layer.msg("请输入驳回理由!")
					}
				},
				close(){
					this.Reason=""
					this.$emit("close",this.Reason)
				}
			},
		
	}
</script>
<style scoped>
	.Reason{
		display: flex;
		margin-top: 30px;
	}
	textarea{
		resize: none;
		width: 80%;
		height: 150px;
		margin-left: 10px;
		
	}
</style>