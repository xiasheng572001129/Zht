<template>
<div class="reg">
	<img src="/static/images/login.jpg" alt="">
	<div class="reg_left">
		<form>
			<div><label for="">用户名:</label><input type="text" placeholder='请输入用户名'>  </div>
			<div><label for="">输入密码:</label><input type="text" placeholder='请输入密码'>  </div>
			<div><label for="">确认密码:</label><input type="text" placeholder='请再次输入密码'>  </div>
			<div><label for="">公司名称:</label><input type="text" placeholder='请输入公司名称'>  </div>
			<div><label for="">负责人:</label><input type="text" placeholder='请输入负责人姓名'>  </div>
			<div><label for="">手机号:</label><input type="text" placeholder='请输入手机号'>  </div>
			<div><label for="">验证码:</label><input type="text" placeholder="请输入验证码" class="yzm"> <input type="button" value='发送验证码' class="yzm_btn">  </div>
			<button @click="submit">提 交</button>
		</form>
	</div>
</div>
</template>
<script>
	export default{
		data(){
			return {}
		},
		methods:{
			submit(){
				this.$router.push({name:"login"})
			}
		}
	}
</script>
<style scoped>
	.reg{
		width: 1206px;
		height: 732px;
	    position:fixed;
        left:0;
        right: 0;
        bottom: 0;
        top:0;
        margin:auto;
        border-radius:25px;
        box-shadow:5px 5px 20px rgba(11,169,225,0.4);
	}
	.reg_left{
		width: 49%;
		height: 100%;
		display: inline-block;
		padding:120px 0;
		overflow: hidden;
	}
	.reg_left form div{
		margin-bottom: 22px;
	}
	.reg_left label{
		display: inline-block;
		width: 110px;
		text-align: right;
		font-size: 16px;
		color: #333;
	}
	.reg_left input{
        display: inline-block;
        width: 337px;
        height: 36px;
        margin-left:20px;
        font-size: 14px;
        border:1px solid #CDCDCD;
	}
    .reg_left input.yzm{
    	width: 215px;
    }
    .reg_left input.yzm_btn{
    	width: 110px;
    	background-color: #fff;
    }
    .reg_left button{
    	border:1px solid #0BBEF1;
    	background-color: #0BBEF1;
    	width: 120px;
    	height: 34px;
    	font-size: 18px;
    	border-radius:5px 5px 5px 5px;
    	color:white;
    	display: block;
    	margin: 76px auto;
    }
</style>