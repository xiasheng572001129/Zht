<template>
	<div>
		<ctbHead>
			<router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}" :v-key="item.id">{{item.name}}
			</router-link>
		</ctbHead>
		<div class="container">
			<div class="quote">
				<div class="quote-ele"><i></i>物料审核</div>
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
						<th>申请时间</th>
                        <th>订单关闭时间</th>
					
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list">
						<td class="t-l">{{item.company}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.leader}}</td>
						<td>{{item.create_time}}</td>
                        <td>{{item.audit_time}}</td>
						
					</tr>
				</tbody>
			</table>
           
            
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
					index: 1, //点击的当前页，
					endpage: 1, //当前一组页码的最大值
					arr: [], //默认显示 1 2 3 4 5页
					n: 1, //当前点击的页码的位置
					pageCount: 1,
					reason: '',
					id: '',
					authList: [],
					curId: 0,
                    seCurId: 0,
                    detailsDialogVisible:false,
                    detailsList:[],
                    eachData:{},
                    reason:'',
                    
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
					this.$axios.post('admin/ShopMateriel/list', {
							token: this.token,
                            page: this.page,
                            status:3
						})
						.then(res => {
							
							if(res.data.code == 1) {
								this.list = res.data.data.list;
								this.showpage(res.data.data);
								this.pageCount = res.data.data.rows
							}else{
                                this.list=[]
								layer.msg(res.data.msg)
							}
						})
						.catch(err => console.log(err))
				},
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
									if(arr[i].name == '物料审核') {
										this.seCurId = arr[i].id;
										this.threeAuthList = arr[i].son;
										
									}
									for(var j = 0; j < arr[i].son.length; j++) {
										if(arr[i].action != arr[i].son[j].action) {
											arr[i].action = arr[i].son[0].action;
										}
										if(arr[i].son[j].name == '订单关闭列表' && arr[i].name == '物料审核') {
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
	.laybox {
		text-align: center;
		padding: 50px 68px 50px 36px;
		font-size: 16px;
		overflow: hidden;
	}

	.laybox textarea {
		outline: none;
		resize: none;
	    width: 80%;
	    flex-flow: 1;
		height: 250px;
		border: 1px dashed #04BBFC;
		margin-bottom: 60px;

		border-radius: 15px;
	}
	.laybox>p{
		display: flex;
		flex-flow: 1;

	}

	div.bot button {
		width: 110px;
		height: 36px;
		border-radius: 18px;
		box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
		border: none;
		color: white;
	}

	button.reject {
		background: rgba(237, 81, 55, 1);
		margin-right: 30%;
	}

	button.pass {
		background-color: #20A0FF;
	}
</style>
