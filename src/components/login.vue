<template>
  <div class="login">
    <img src="../../static/images/left.png"
         alt="">
    <div class="login_right">
      <h1>邦保养总后台服务系统登录</h1>
      <form class="lay-audit"
            v-on:submit.prevent>
        <div><img src="../../static/images/per.png"
               alt=""><input type="text"
                 placeholder='请输入用户名'
                 v-model="name"
                 name="name"></div>
        <div><img src="../../static/images/pwd.png"
               alt=""><input type="password"
                 placeholder='请输入密码'
                 v-model="pwd"
                 name="pwd"></div>
        <div class='yzm_con'>
          <div class="yzm_div">
            <img src="../../static/images/yzm.png"
                 alt="">
            <input type="text"
                   placeholder="请输入验证码"
                   class="yzm"
                   v-model="code"
                   name="code"></div>
          <canvas id="canvas"
                  width="100"
                  height="40"
                  @click='getverify()'></canvas>
        </div>
        <button @click="checklogin">登 录</button>
        <!-- <router-link :to="{name:'register'}">注册账号</router-link> -->
        <router-link :to="{name:'findpwd'}">忘记密码?</router-link>
      </form>
    </div>
    <!-- <span class="t_l">公司地址：北京市房山区府山街17号</span> -->
    <!-- <span class="t_c">联系电话：0311 - 885865565</span> -->
    <!-- <span class="t_r">督导电话：13584654681</span> -->
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data: function () {
    return {
      name: '',
      pwd: '',
      verify: '',//后台返回的验证码，用来渲染到页面，也再发回给后台
      code: '',//用户输入发验证码
    };
  },
  mounted () {   //因为有document.getElement操作
    this.getverify();
  },
  methods: {
    checklogin: function () {  //验证用户名密码
      var obj = {
        "name": this.name,
        "pwd": this.pwd,
        "verify": this.verify,
        "code": this.code
      };
      this.$axios.post("admin/login/index", obj)
        .then(res => {

          var that = this;
          if (res.data.data) {
            window.sessionStorage.setItem('bbytoken', res.data.data);
            window.sessionStorage.setItem('loginname', this.name);
            layer.msg('登录成功', { icon: 1, time: 2000 }, function () {
              that.$router.push({ name: 'entry' })
            });
          }
          else {
            if (!obj.name) layer.msg('请输入用户名！');
            else if (!obj.pwd) layer.msg('请输入密码！');
            else if (obj.verify != obj.code) layer.msg('验证码输入错误！');
            else layer.msg("用户名或密码错误，请重新登录")
            this.getverify();
          }
        })
        .catch(res => { })
    },
    randomNum: function (min, max) {   //随机数
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomColor: function (min, max) {   //颜色随机
      var r = this.randomNum(min, max);
      var g = this.randomNum(min, max);
      var b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    drawPic: function () {      //画验证码
      var canvas = document.getElementById("canvas");
      var width = canvas.width;
      var height = canvas.height;
      var ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom';
      /**绘制背景色**/
      ctx.fillStyle = this.randomColor(220, 250); //颜色若太深可能导致看不清
      ctx.fillRect(0, 0, width, height);
      /**绘制文字**/
      // var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
      for (var i = 0; i < 4; i++) {
        // var txt = str[this.randomNum(0,str.length)];
        ctx.fillStyle = this.randomColor(50, 160);  //随机生成字体颜色
        ctx.font = this.randomNum(16, 26) + 'px MicrosoftYaHei'; //随机生成字体大小
        var x = 10 + i * 25;
        var y = this.randomNum(25, 45);
        var deg = this.randomNum(-45, 45);
        //修改坐标原点和旋转角度
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText((this.verify + '').split('')[i], 0, 0);

        //恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      for (var i = 0; i < 5; i++) {
        ctx.strokeStyle = this.randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.stroke();
      }
      /**绘制干扰点**/
      for (var i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    },
    getverify: function () {  //获取验证码
      this.$axios.post("base/Base/verify")
        .then(res => {

          if (res.data.code) {
            this.verify = res.data.data; //数据获取成功，渲染到页面上
            this.drawPic();
          }
        })
        .catch(res => { })
    }
  }
}
</script>
<style scoped>
.login {
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

.login span {
  display: inline-block;
  width: 33%;
  margin-top: 70px;
}

.login img {
  height: 100%;
  width: 50%;
}

.login_right {
  /* 右侧内容 */
  width: 49%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
}

.login_right h1 {
  /* 顶部标题 */
  margin: 85px 0 110px 0;
  text-align: center;
  font-size: 28px;
  font-family: MicrosoftYaHei-Bold;
  color: rgba(51, 51, 51, 1);
}

.login_right form {
  /*  下部表格 */
  width: 332px;
  margin: 0 auto;
  height: 69%;
  position: relative;
}

.login_right form > div {
  margin: 60px 0;
  width: 332px;
  border-bottom: 1px solid #bbb;
}

.login_right div img {
  /* 图标 */
  width: 22px;
  height: 22px;
  vertical-align: middle;
  margin-left: 10px;
}

.login_right form .yzm_con {
  /* 验证码 */
  border: none;
  margin-bottom: 60px;
}

.login_right form div.yzm_div {
  width: 220px;
  display: inline-block;
  border-bottom: 1px solid #bbb;
  vertical-align: top;
}

.login_right form .yzm_btn {
  width: 104px;
  height: 35px;
  float: right;
}

.login_right button {
  /* input外内容 */
  width: 332px;
  height: 40px;
  background: rgba(11, 190, 241, 1);
  border-radius: 20px;
  color: white;
  outline: none;
  border: none;
  font-size: 16px;
}

.login_right a {
  color: #999;
  font-size: 14px;
  position: absolute;
  bottom: 44px;
}

.login_right a:first-child {
  left: 0;
}

.login_right a:last-child {
  right: 0;
}
</style>
