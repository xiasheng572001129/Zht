<template>
  <div>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>物料配给-详情</div>
        <div class="content">
          <div class="left">
            <p>转账凭证</p>
            <div class="left_img">
              <img :src="list.voucher"
                   @click="showpic(list.voucher)"
                   alt="">
            </div>
          </div>
          <ul class="right">

            <li @click="showarea(list.id)">点击查看选择的区域</li>
            <li>
              <div>运营商利润(百分比)</div>
              <div class="right_border-bottom">
                <input type="text"
                       v-model="profit">
              </div>
            </li>
            <!--<li>-->
            <!--<div>市级代理商利润(百分比)</div>-->
            <!--<div class="right_border-bottom">-->
            <!--<input type="text" >-->
            <!--</div>-->
            <!--</li>-->
            <!--<li>-->
            <!--<div>市级代理</div>-->
            <!--<div class="right_border-bottom">-->
            <!--<input type="text" >-->
            <!--</div>-->
            <!--</li>-->
            <li>
              <div>送货延迟罚款</div>
              <div class="right_border-bottom">
                <input type="text"
                       v-model="delay_fine">
              </div>
            </li>
            <li>
              <div>维修厂工时费(百分比)</div>
              <div class="right_border-bottom">
                <input type="text"
                       v-model="shop_hours">
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="lay-audit">
        <label>驳回理由：</label><input type="text"
               placeholder="请输入驳回理由"
               v-model="reason">
      </div>
      <div class="lay-btn">
        <a href="#"
           class="btn btn-danger"
           @click="reject">驳回</a><button class="btn btn-sub"
                @click="pass">通过</button>
      </div>
    </div>
    <div class="shuju laybox"
         style="display:none">
      <ul>
        <li v-if="arealist.status==0">暂未设置供应地区</li>
        <li v-else
            v-for="item in arealist.data">
          {{item.name}}
          <ul v-if="item.son"
              class="son">
            <li v-for="sonitem in item.son">
              {{sonitem.name}}
              <ul v-if="sonitem.son"
                  class="grandson">
                <li v-for="grandson in sonitem.son">{{grandson.name}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      id: this.$route.query.id,
      aid: this.$route.query.aid,
      list: {},
      arr: [],
      reason: '',
      arealist: [],
      indexNow: 1,
      profit: 10,
      delay_fine: 200,
      shop_hours: 6

    }
  },
  created () {
    this.$axios.post('admin/AgentIncRation/Detail', { token: this.token, id: this.id, aid: this.aid })
      .then(res => {

        this.list = res.data.data;
      })
      .catch(err =>
        this.indexNow = parent.layer.getFrameIndex(window.name))
  },
  methods: {
    showarea: function (id) {
      this.$axios.post('admin/AgentIncRation/detailArea', { token: this.token, id: id })
        .then(res => {

          this.arealist = res.data;
          if (res.data.data)
            layer.open({
              type: 1,
              area: ['60%', '60%'],
              title: ['所选地区', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox')
            })
          else layer.msg(res.data.msg)
        })
        .catch(err => { })
    },
    pass: function () {
      var obj = {
        token: this.token,
        aid: this.list.aid,
        id: this.list.id,
        regions: this.list.regions,
        price: this.list.price,
        profit: this.profit,
        delay_fine: this.delay_fine,
        shop_hours: this.shop_hours
      }
      var that = this;
      this.$axios.post('admin/AgentIncRation/adopt', obj)
        .then(res => {
          layer.msg(res.data.msg, function () {
            if (res.data.code == 1)
              parent.layer.close(that.indexNow);
          });
        }).then(err => { })
    },
    reject: function () {
      var obj = {
        token: this.token,
        id: this.list.id,
        aid: this.list.aid,
        reason: this.reason
      }
      var that = this;
      this.$axios.post('admin/AgentIncRation/rejec', obj)
        .then(res => {
          if (!obj.reason) {
            layer.msg(res.data.msg);
          } else {
            layer.msg(res.data.msg, function () {
              if (res.data.code == 1)
                parent.layer.close(that.indexNow);
            });
          }
        })
        .catch(err => { })
    },
    showpic (url) {
      var img = "<img src='" + url + "' style='width:90%;height:90%;margin:3% 5%'/>";
      layer.open({
        type: 1,
        shade: 0.8,
        title: false,
        area: ["70%", "80%"],
        shadeClose: true,
        content: img
      })
    }
  }
}
</script>
<style scoped>
.content {
  margin: 48px 15%;
  display: flex;
}
.left {
  height: auto;
  border-right: 1px dashed #04bbfc;
  padding-top: 100px;
  padding-right: 6%;
}
.left img {
  width: 310px;
  height: 220px;
}
.right {
  display: inline-block;
  padding-left: 6%;
  margin-left: 8px;
}
.right li {
  box-sizing: border-box;
  padding: 16px 80px;
  margin: 28px 0;
  white-space: nowrap;
  min-width: 320px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 16px rgba(112, 171, 212, 1);
}
.lay-audit {
  margin-left: 12%;
}
.container {
  top: 20px;
  min-width: 1024px;
}
/* 弹框 */
.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}
.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}
.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}
.shuju .son li {
  display: block;
}
.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}
.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}
.right_border-bottom {
  border-bottom: 1px solid #ccc;
}
.right_border-bottom input {
  border: none;
  height: 25px;
}
</style>
