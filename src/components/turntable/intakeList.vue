<template>
	<div>
		<ctbHead>
			<router-link :class="seCurId==item.id? 'cur':''" v-for="item in authList" :key="item.id" :to="{path:item.action,query:{id:curId}}" :v-key="item.id">
				{{item.name}}
			</router-link>
		</ctbHead>
		<div class="container">
			<div class="quote">
				<div class="quote-ele"><i></i>转盘抽奖管理
					<el-button type="primary" style="position: absolute;right: 105px;top: 20px;" @click="order">导出订单</el-button>
				</div>

				<div class="quote-nav">
					<router-link active-class="activeClass" to="/turntable/intakeList/Unissued">未发货</router-link>
					<router-link active-class="activeClass" to="/turntable/intakeList/Already">已发货</router-link>
				</div>
			</div>
			<router-view></router-view>

			<!-- 分页 -->
			<el-dialog title="导出订单" :visible.sync="centerDialogVisible" width="800px" center>
				<div class="select">
					<div>
						<span>省：</span>
						<el-select placeholder="请选择省" v-model="Province" @change="ProvincialChange">
							<el-option v-for="item in province" :label="item.name" :value="item.id" :key="item.id"></el-option>
						</el-select>

					</div>
					<div>
						<span>市：</span>
						<el-select placeholder="请选择省" v-model="city">
							<el-option v-for="item in City" :label="item.name" :value="item.id" :key="item.id"></el-option>
						</el-select>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">

           <el-button type="primary" @click="Export">导出</el-button>
        </span>
			</el-dialog>
		</div>
		<!--<ul class="laybox" style="display:none">
      <li>卡号: {{obj.card_number}}</li>
      <li>维修厂名: {{obj.s_company}}</li>
      <li>运营商名: {{obj.a_company}}</li>
    </ul>
    <ul class="laybox1" style="display:none">
      <li>用户名称: {{obj.contacter}}</li>
      <li>用户电话：{{obj.phone}}</li>
      <li>公司名称: {{obj.company}}</li>
      <li>送达地址: {{obj.address}}</li>
      <li>发票税号: {{obj.tax_number}}</li>
    </ul>-->
	</div>
</template>
<script type="text/ecmascript-6">
	import page from '../common.js';
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
					thCurId: 0,
					centerDialogVisible: false,
					province: [], //省
					Province: "",
					City: [], //市
					city: "",
					cityId: ""
				}
			},

			watch: {
				city(id) {
					this.cityId = id;

				}
			},
			methods: {
				go: page.go,
				first: page.first,
				end: page.end,
				prev: page.prev,
				next: page.next,
				showpage: page.showpage,
				order() {
					this.centerDialogVisible = true
					this.$axios.post("province", { //请求省的接口
						token: this.token
					}).then(res => {

						this.province = res.data;

					})
				},

				ProvincialChange(id) {
					this.$axios.post("city", { //请求市的接口
						token: this.token,
						pid: id
					}).then(res => {

						this.City = res.data
						this.city = res.data[0].name
					})
				},
				Export(id) {

					window.location.href = `https://cc.ctbls.com/Luck/excel?area=${this.cityId}`
					this.centerDialogVisible = false
					this.Province = ""
					this.city = ""

				},

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
								if(arr[i].name == '中奖列表') {
									this.seCurId = arr[i].id;
								
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
	}
</script>
<style scoped>
	.laybox li,
	.laybox1 li {
		margin: 20px 30px;
		font-size: 16px;
	}

	.activeClass {
		color: #333333 !important;
	}

	.select {
		padding: 40px 0 270px 0;
	}

	.select>div {
		width: 50%;
	}

	.select>div:first-child {
		display: flex;
		align-items: center;
		float: left;
		justify-content: flex-end;
		padding-right: 20px;
	}

	.select>div:last-child {
		float: right;
	}
</style>
<style>
	.el-dialog__header {
		background-color: #98D1F9;
		padding: 20px 20px 20px 0;
	}

	.el-dialog__title {
		color: white;
	}
</style>
