<template>
	<div>
		<el-dialog :title='title' :visible="Visible" width="1100px" center @close="close">
             <slot></slot>
		</el-dialog>
	</div>
</template>
<script>
	export default {
          props:["Visible","title"],
       methods:{
       	 close(){
       	 	this.$emit("close")
       	 },

       },


	}
</script>
<style>
    .el-dialog__header{
        background-color: rgb(152, 209, 249);
        padding-bottom: 20px;
      color: #fff;
    }
    .el-dialog__title{
      color: #fff;
    }
</style>
