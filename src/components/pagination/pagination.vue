<template id="paging">
	<div>
		<el-pagination
                       background
                       :page-count="pageCount"
                       @current-change="currentChange"
                       layout="prev,pager,next,jumper,total,->"
                       :pager-count="5"
                       small
                        >
     </el-pagination>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props:{

			pageCount:{
				type:Number

			},
			ind:{
				type:Number
			}


		},
		methods:{
			currentChange(e){

				this.$emit("index",e)
			}
		}
	}
</script>
