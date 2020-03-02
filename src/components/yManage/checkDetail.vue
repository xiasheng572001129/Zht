<template>
  <div>
    <div class="container">
      <div class="quote-ele"><i></i>审核详情</div>
      <div class="laybox">
        <div class="lay-detail clear">
          <div class="lay-d-l">
            <span>营业执照</span>
            <div class="imgborder">
              <img :src="imgobj.license"
                   @click="showpic(imgobj.license)">
            </div>
            <span class="tip"
                  @click="showpic(imgobj.license)">（点击查看完整图片）</span>
          </div>
          <div class="line"></div>
          <div class="lay-d-r">
            <div class="lay-d-set">
              <label>运营商利润(百分比)</label>
              <input type="text"
                     placeholder="请输入售卡利润"
                     v-model="obj.profit">
            </div>
            <div class="lay-d-set">
              <label>送货延迟罚款</label>
              <input type="text"
                     placeholder="请输入罚款金额"
                     v-model="obj.delay_fine">
            </div>
            <div class="lay-d-set">
              <label>维修厂工时费(百分比)</label>
              <input type="text"
                     placeholder="请输入维修厂工时费"
                     v-model="obj.shop_hours">
            </div>
            <div class="lay-d-set">
              <label>维修厂成长基金(百分比)</label>
              <input type="text"
                     placeholder="请输入维修厂成长基金"
                     v-model="obj.shop_fund"
                     value="1">
            </div>
            <div class="lay-d-set">
              <label>维修厂好评奖励(百分比)</label>
              <input type="text"
                     placeholder="请输入售卡金额的百分比"
                     v-model="obj.shop_praise"
                     value="1">
            </div>
          </div>
        </div>
        <div class="lay-btn">
          <button class="btn btn-sub"
                  @click="pass">通过</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgobj: {},
      token: window.sessionStorage.getItem("bbytoken"),
      aid: this.$route.query.aid,
      obj: {
        profit: '20',
        delay_fine: '200',
        shop_hours: '6',
        shop_fund: '1',
        shop_praise: '1'
      },
      reason: '',
      indexNow: 1
    }
  },
  created () {
    this.$axios.post('admin/AgentAuditList/detail', {
      token: this.token,
      aid: this.aid
    })
      .then(res => {

        this.imgobj = res.data.data;
      }).catch(err => this.indexNow = parent.layer.getFrameIndex(window.name))
  },
  methods: {
    pass () {
      var that = this;
      this.obj.token = this.token;
      this.obj.aid = this.aid;
      this.$axios.post('admin/AgentAuditList/adopt', this.obj)
        .then(res => {
          layer.msg(res.data.msg, function () {
            if (res.data.code == 1)
              parent.layer.close(that.indexNow);
          });
        }).catch(err => { })
    },
    reject () {
      var that = this;
      this.$axios.post('admin/AgentAuditList/reject', {
        token: this.token,
        aid: this.aid,
        reason: this.reason
      })
        .then(res => {
          if (!this.reason) {
            layer.msg(res.data.msg);
          } else {
            layer.msg(res.data.msg, function () {
              if (res.data.code == 1)
                parent.layer.close(that.indexNow);
            });
          }
        }).catch(err => { })
    },
    showpic (url) {
      var img = "<img src='" + url + "' style='width:90%;display:block;margin:3% 5%'/>";
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
.lay-detail {
  position: relative;
}

.lay-detail .line {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background: #04bbfc;
}

.lay-d-l {
  font-size: 18px;
  border: none;
  padding-top: 10%;
  padding-left: 16px;
  padding-right: 12px;
}

.lay-d-l .tip {
  font-size: 14px;
  color: #777;
  cursor: pointer;
}

.imgborder {
  overflow: hidden;
  height: 320px;
}

.lay-d-l img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.lay-audit {
  margin: 0 12%;
}

.lay-audit label {
  width: 15%;
}

.lay-audit input {
  width: 85%;
}

.lay-btn {
  margin: 30px auto;
}

.container {
  top: 20px;
  min-width: 512px;
}
</style>