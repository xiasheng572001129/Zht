<template>
	<div class="lunbo">
		<ctbHead>
			<router-link :to="{name:'bill_apply',query:{id:3}}">发票管理</router-link>
			<router-link :to="{name:'lunbo_manage',query:{id:3}}" class='cur'>轮播管理</router-link>
			<router-link :to="{name:'art_uncheck',query:{id:3}}">文章管理</router-link>
			<router-link :to="{name:'small_share',query:{id:3}}">车主转发奖励</router-link>
			<router-link :to="{name:'small_system',query:{id:3}}">系统设置</router-link>
		</ctbHead>
		<div class="container">
			<div class="quote">
				<div class="quote-ele"><i></i>轮播管理
					<span v-for="item in sendto">
			  <input type="radio" v-model="perarr" :value="item.value">{{item.per}}
			</span>
				</div>
			</div>
			<div class="content">
				<div class="titlename">
					标题
					<input type="text" v-model='title'>
				</div>
				<div class="lunbopic">
					轮播图片 <br>
					<el-upload :file-list="defaultImg" action="https://ceshi.ctbls.com/admin/SmallSlideshow/uploadPic" :on-success="handleAvatarSuccess" list-type="picture-card" name="image" :data="obj"  :on-preview="handlePictureCardPreview">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</div>
				<div class="con">
					轮播简介
					<!--<div id="editor" type="text/plain"></div>-->
					<textarea name="" id="" v-model="content"></textarea>
				</div>
				<button @click="alter" class="send" v-if="id">修改</button>
				<button @click="send" class="send" v-else>确定</button>
			</div>
		</div>
	</div>
</template>
<script>
	//import UE from '../common/uedit.vue';
	export default {
		//		components: {
		//			UE
		//		},
		data: function() {
			return {
				title: '',
				perarr: '', //radio
				sendto: [{
					value: '1',
					per: '邦保养小程序'
				}, {
					value: '2',
					per: '约驾小程序'
				}, {
					value: '3',
					per: '技师小程序'
				}, {
					value: '4',
					per: '服务经理'
				}],
				ue_defaultMsg: '', //umedit
				ue_content: '',
				ue_obj: '',
				ue_config: {
					initialFrameWidth: 800,
					initialFrameHeight: 300
				},
				defaultImg:[],
				dialogImageUrl: '', //upload
				dialogVisible: false,
				picaddr: '',
				obj: {
					token: window.sessionStorage.getItem('bbytoken')
				},
				id: this.$route.query.id,
				editObj: {},
				content: '',
				lunboaddr: '',
				picshow: true
			}
		},
		created() { //初始化

			if(this.id) {
				this.$axios.post('admin/SmallSlideshow/picDetail', {
						token: this.obj.token,
						id: this.id
					})
					.then(res => {
						this.editObj = res.data.data.pic;
						this.perarr = this.editObj.gid;
						this.title = this.editObj.title;
						this.content = this.editObj.content.replace(new RegExp("<.+?>", "g"), '');
						this.lunboaddr = this.editObj.pic;
						this.defaultImg.push({url:res.data.data.pic.pic})
						this.dialogImageUrl=res.data.data.pic.pic
					}).catch(err => console.log(err))
			}
		},
		methods: {
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleAvatarSuccess(res,file){
				  this.dialogImageUrl=file.url
				
			},
			// handleSuccess: function(response, file, fileList) {
			// 	this.picaddr = response;
		
			// },
			editpic: function() {
				this.picshow = false;
			},
			send() { //确定


				var obj1 = {
					content: this.content,
					gid: this.perarr,
					title: this.title,
					token: window.sessionStorage.getItem("bbytoken"),
					pic: this.picaddr
				}
				this.$axios.post('admin/SmallSlideshow/addPic', obj1)
					.then(res => {
						layer.msg(res.data.msg);
						if(res.data.code == 1)
							this.$router.push({
								name: 'lunbo_manage'
							})
					}).catch(err => console.log(err))
			},
			alter() { //修改
				// var msg=this.$refs.ue.getUEContent().replace(new RegExp("<.+?>","g"),'');
				var obj1 = {
					id: this.id,
					content: this.content,
					gid: this.perarr,
					title: this.title,
					token: window.sessionStorage.getItem("bbytoken"),
					pic: this.dialogImageUrl
				}
				this.$axios.post('admin/SmallSlideshow/picAlter', obj1)
					.then(res => {
						layer.msg(res.data.msg);
						if(res.data.code == 1)
							this.$router.push({
								name: 'lunbo_manage',
								query:{id:3}
							})
					}).catch(err => console.log(err))
			}
		}
	};
</script>
<style scoped>
	.lunbo {
		background-color: #fff;
	}

	.newscreate input {
		background-color: #fff;
	}

	.content {
		margin-left: 100px;
		font-size: 18px;
	}

	.quote-ele span {
		font-size: 14px;
		margin-left: 3%;
	}

	.titlename input {
		width: 332px;
		margin: 4px 0 20px 0;
	}

	.ue {
		width: 60%;
	}

	.lunbopic {
		margin-bottom: 20px;
		width: 300px;
		height: 190px;
		overflow: hidden;
	}

	.send {
		width: 110px;
		height: 36px;
		border-radius: 18px;
		border: none;
		color: white;
		background-color: #00b4ff;
		display: block;
		margin: 35px auto;
	}

	textarea {
		width: 80%;
		resize: none;
		height: 300px;
	}

	img {
		width: 50%;
		height: 85%;
	}

	span.warn {
		font-size: 12px;
		color: red;
	}
</style>
