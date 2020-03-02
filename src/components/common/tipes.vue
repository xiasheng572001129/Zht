<template>
	<div class="tipes" v-if="show"  @mouseenter="enter()"  @mouseleave="leave()">
		<div class="box">
			<input type="text" placeholder="公司名称" name="">
			<router-link :to="{name:'allCityAgent'}">
			<div class="box_list all">
				全部公司<span>></span>
				<span class="line"></span>
			</div>
		</router-link>
			<div class="box_list ">
				代理公司名称<span>></span>
				<span class="line"></span>
			</div>
			<div class="box_list ">
				代理公司名称<span>></span>
				<span class="line"></span>
			</div>
			<div class="box_list ">
				代理公司名称<span>></span>
				<span class="line"></span>
			</div>
			<div class="box_list ">
				代理公司名称<span>></span>
				<span class="line"></span>
			</div>
			<div class="box_list ">
				代理公司名称<span>></span>
				<span class="line"></span>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'tipes',
		data(){
			return {
				show:false,
			}
		},
		mounted(){
			
	        	
		},
	}
</script>
<style scoped>
	.tipes{
		height: 100%;
		width: 200px;
		border-left: 1px solid black;
		border-right: 1px solid black;
		background: #3D4659;
		float: left;
		position: absolute;
		left: 140px;
		z-index: 10;
		/*display: none;*/
	}
	.box{
		height: 700px;
		width: 100%;
		background: #3D4659;
		margin-top: 80px;
		padding: 10px 0px;
	}
	.box input{
		width: 180px;
		background: #292F42;
		border-radius: 0px;
		/*border:1px solid black;*/
		height: 32px; 
		margin: auto;
		color: #ccc;
	}
	.box_list{
		width: 100%;
		height: 60px;
		/*background: #04BBFC;*/
		line-height: 60px;
		color: white;
		text-align: center;
		float: left;
			}
	.all{
		margin-top: 10px;
	}
	.box_list span{
		float: right;
		margin-right: 20px; 
	}
	.line{
		width: 160px;
		border: 1px solid #292F42;
		margin: auto;
		float: left;
	}
	.box_list:hover{
		background: #04BBFC !important;
	}
	.all{
		background: #04BBFC !important;
	}
</style>