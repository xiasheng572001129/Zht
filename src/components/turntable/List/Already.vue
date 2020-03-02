<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th>收货人姓名</th>
					<th>收货人电话</th>
					<th>收货地址</th>
					<th>状态</th>

				</tr>
			</thead>
			<tbody>
				<tr v-for="item in list">
					<td>{{item.man}}</td>
					<td>{{item.phone}}</td>
					<td>{{item.address+item.details}}</td>
					<td>
						<a href="javascript:;">已发货</a>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="page_center" v-show="pageCount&&pageCount>1">
			<paging :page-count="pageCount" v-show="list&&list.length>0" :page="page" @index="paging"></paging>
			<!--分页的组件-->
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					list: [],
					token: window.sessionStorage.getItem('bbytoken'),
					obj: {}, //分页数据
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
					thCurId: 0
				}
			},
			created() {
				this.init()
			},
			methods: {
				paging(e) {
					this.page = e;
					this.init()
				},
				init() {
					
				
					this.$axios.post("Luck/end", {
						token: window.sessionStorage.getItem('bbytoken'),
						page: this.page
					}).then(res => {
						
						if(res.data.code == 1) {
							this.list = res.data.data.list;
							this.pageCount = res.data.data.rows;
						}else{
							 layer.msg(res.data.msg)
						}
					}).catch(err=>{
						
					})
				}
			}
	}
</script>