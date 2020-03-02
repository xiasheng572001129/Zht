<template>
	<div>
		<el-dialog @close="close" :visible="regionVisible" append-to-body title="区域个数" width="600px" center>
			<div style="margin-bottom: 100px;">
				<div class="region" v-for='item in Province' >
					<p>
						<span>省: </span>
						<span>{{item.name}}</span>
					</p>
					<p>
						<span>市: </span>
						<span v-for="it in item.son" style="padding-right: 20px;">{{it.name}}</span>
					</p>
          <p v-if="countyShow==false?countyShow:true">
            <span>县/区: </span>
            <span v-for="item3 in item.son" style="padding-right: 20px;">
              <span v-for="item4 in item3.son">{{item4.name}}</span>
            </span>
          </p>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
				return {

				}
			},
			props: [ "regionVisible", "Province",'countyShow'],  //父组件过来的值

			methods: {
				//点击关闭,使用$emit发给父组件一个关闭事件,这样在父组件中就可以改变子组件的状态
				close() {
					this.$emit("regionClose")
				},

			}

	}
</script>
<style scoped>
	.region {
		width: 100%;
	}

	.region>p {
		display: inline-block;
		margin: 0 0 30px 60px;
	}

	.region>p>span {
		display: inline-block;
	}
</style>
<style>
.el-dialog__header {
	background: rgba(152, 209, 249, 1);
	padding-bottom: 20px;
}

.el-dialog__title {
	color: white;
}
</style>
