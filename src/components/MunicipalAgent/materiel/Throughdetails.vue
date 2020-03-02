<template>
	<div>
		<div class="main">
			<div class="information">
				<ul>
					<li>市级代理：{{list.company}}</li>
					<li>负责人：{{list.leader}}</li>
					<li>联系电话：{{list.phone}}</li>
				</ul>
				<p>地址：{{list.province+list.city+list.address}}</p>
			</div>

			<div class="el_table">
				<el-button type="primary" round style="float: right;margin-bottom: 10px;width: 100px;" class="not-print" v-show="PrintingShow" @click="Printing">打印</el-button>
				<table class="table" border="1" style="border: 1px solid #D8D8D8;">
					<tr>
						<th>物料名称</th>
						<th>数量/件</th>
						<th>备注</th>
					
					</tr>
					<tr v-for="item in tableData">
						<td>{{item.name}}</td>
						<td>{{item.size}}</td>
						<td>{{item.remarks}}</td>
					</tr>
				</table>
			</div>
			<div class="time">
				<p>申请时间：{{list.create_time}}</p>
				<p>通过时间：{{list.to_time|datetime}}</p>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
				return {
					token: window.sessionStorage.getItem('bbytoken'),
					list: [],
					tableData: [],
					PrintingShow: true
				}
			},
			created() {
				this.init()
			},
			methods: {
				init() {
					var id = this.$route.query.gid;
					
					this.$axios.post("supply/detail", {
						token: this.token,
						id: id
					}).then(res => {
						if(res.data.code == 1) {
							this.list = res.data.data;
							
							this.tableData = res.data.data.details
						}
					})
				},
				Printing() {

					window.print();

				

				}
			},
			mounted() {
				this.isShow = this.$route.query.isShow

			}

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
	
	.el_table:after {
		display: block;
		content: "";
		clear: both;
	}
	
	.el_table {
		margin-top: 40px;
	}
	
	.time {
		margin-top: 49px;
	}
	
	.time>p {
		display: inline-block;
		margin-right: 38px;
	}
</style>
<style>
	.el-table__header {}
	
	@media print {
		.not-print {
			opacity: 0
		}
		.information{	
			margin-top: -100px;
		}
		.main{
			width: 100% !important;
		}
		
	}
</style>