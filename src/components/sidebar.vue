<template>
	 		<div class="sidebar"  @mouseenter="enter()"  @mouseleave="leave()">
		<div class="sidebar_item first">
			<div class="img agent" style="background-image:url(../../../static/images/shujvfenxi/ic1.png)" >
			</div>
			<div class="text">市级代理</div>
		</div>
		<div class="sidebar_item  ">
			<div class="img two" style="background-image:url(../../../static/images/shujvfenxi/ic2.png)">
			</div>
			<div class="text">运营商</div>
		</div>
		<div class="sidebar_item ">
			<div class="img three" style="background-image:url(../../../static/images/shujvfenxi/ic3.png)">
			
			</div>
			<div class="text">维修厂</div>
		</div>
		<div class="sidebar_item last  ">
			<div class="img four" style="background-image:url(../../../static/images/shujvfenxi/ic4.png)">
			</div>
			<div class="text">车主</div>
		</div>
	</div>
	<div class="tipes" v-if="show"  @mouseenter="enter()"  @mouseleave="leave()">
		<div class="box">
			<input type="text" placeholder="公司名称" name="">
			<div class="box_list all">
				全部公司<span>></span>
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
			<div class="box_list ">
				代理公司名称<span>></span>
				<span class="line"></span>
			</div>
		</div>
	</div>
	 
</template>
<script type="text/javascript">
	export default{
		name: 'sidebar',
		data(){
			return {
				show:false,
			}
		},
		mounted(){
			this.drawLine();
			// this.myChart = this.echarts.myChart;
	         window.addEventListener("resize", function(){
                    resizeWorldMapContainer();
                    myChart.resize();
                })
	        	
		},
		methods:{
				enter:(function(){
				return this.show = true;
							}),
		    leave:(function(){
				return this.show = false;
			}),
		}
	}
</script>
<style scoped>
.sidebar{
		height: 100%;
		width: 140px;
		background: #3D4659;
		float: left;
		
	}
	.first{
		margin-top: 80px;
		border-top: 0px ;

	}
	.last{
		border-bottom: 1px solid black;
	}
	.sidebar_item{
		height: 140px;
		width: 140px;
		border-top: 1px solid black;
	}
	.sidebar_item .img{
		width: 50px;
		height: 50px;
		margin: 30px auto 0px;
	}
	.text{
		width: 140px;
		text-align: center;
		color: white;
	}
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
	.agent:hover{
		background-image: url('../../../static/images/shujvfenxi/icnlue1.png') !important;
	}
	.two:hover{
		background-image: url('../../../static/images/shujvfenxi/icblue2.png') !important;
	}
	.three:hover{
		background-image: url('../../../static/images/shujvfenxi/icblue3.png') !important;
	}
	.four:hover{
		background-image: url('../../../static/images/shujvfenxi/icblue4.png') !important;
	}
	.dataContent{
		margin-left: 140px;
		width: auto;
		height: 100%;
		background:#303847;
		/*overflow: hidden;*/

	}
</style>