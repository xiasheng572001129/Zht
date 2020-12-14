<template>
  <div class="pwd">
    <img src="../../static/images/login.jpg"
         alt="">
    <div class="pwd_right">
      <form class="lay-audit"
            v-on:submit.prevent>
        <!-- <input type="text" placeholder='请输入用户名' v-model="obj.username">  -->
        <input type="text"
               placeholder='请输入手机号'
               v-model="obj.phone">
        <input type="text"
               placeholder="请输入验证码"
               class="yzm"
               v-model="obj.code"><input type="button"
               v-model='btnVal'
               class="yzm_btn"
               @click="sendyzm"
               :disable="isdisabled">
        <input type="password"
               placeholder='请输入密码'
               v-model="obj.pass">
        <input type="password"
               placeholder='请确认密码'
               v-model="obj.qpass">
        <button @click='submit'>确认修改</button>
      </form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      time: 60,
      isdisabled: false, //能用
      btnVal: '发送验证码',
      obj: {
        // token:window.sessionStorage.getItem('token'),
        code: this.code,
        phone: this.phone,
        // username:this.username,
        pass: this.pass,
        qpass: this.qpass
      }
    }
  },
  methods: {
    submit () {
      this.$axios.post('admin/Login/forget', this.obj).then(res => {
        var that = this;
        if (res.data.status == 1)
          layer.msg(res.data.msg, function () {
            that.$router.push({ name: "login" })
          })
      }).catch(err => { })

    },
    sendyzm () {
      if (!this.obj.phone) alert('请输入手机号') 
      else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.obj.phone)) alert('手机号格式不正确')
      else {  //手机号有并且正确    
        var that = this;
        that.isdisabled = true;
        var interval = window.setInterval(function () {//按钮的值
          that.btnVal = '(' + that.time + ')秒后';
          --that.time;
          if (that.time < 0) {
            that.btnVal = '重新发送';
            that.isdisabled = false;
            that.time = 60;
            window.clearInterval(interval);
          }
        }, 1000);
        this.$axios.post('admin/Login/pwdApi', { token: this.obj.token, phone: this.obj.phone })
          .then(res => {

          }).catch(err => { })
      }
    }
  }
}
</script>
<style scoped>
.pwd {
  width: 1205px;
  height: 732px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  border-radius: 25px;
  box-shadow: 5px 5px 20px rgba(11, 169, 225, 0.4);
}

.pwd img {
  height: 100%;
  width: 50%;
}

.pwd_right {
  /* 右侧内容 */
  padding-top: 16%;
  width: 49%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}

.pwd_right h1 {
  /* 顶部标题 */
  margin: 76px 0 70px 0;
  text-align: center;
  font-size: 28px;
  font-family: MicrosoftYaHei-Bold;
  color: rgba(51, 51, 51, 1);
}

.pwd_right form {
  /*  下部表格 */
  width: 337px;
  margin: 0 auto;
  height: 69%;
  position: relative;
  padding: 0;
}

.pwd_right form input {
  width: 100%;
  height: 36px;
  border: 1px solid #cdcdcd;
  margin-bottom: 22px;
}

.pwd_right form .yzm {
  width: 215px;
}

.pwd_right form .yzm_btn {
  width: 109px;
  float: right;
  background-color: #fff;
}

.pwd_right button {
  /* input外内容 */
  width: 332px;
  height: 40px;
  background: rgba(11, 190, 241, 1);
  border-radius: 20px;
  color: white;
  outline: none;
  border: none;
  font-size: 16px;
  margin-top: 79px;
}
</style>
