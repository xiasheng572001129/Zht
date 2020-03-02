<template>
  <div>
    <div class="container">
      <div class="quote">
        <div class="quote-ele not-print"><i></i>市级配送中心-物料申请详情</div>
        <el-button type="danger"
                   @click="word"
                   class="not-print"
                   style="margin-left: 122px;">打印</el-button>
        <div class="detail">
          <h4>申请信息</h4>
          <p>市级配送中心：{{list.company}}</p>
          <p>联系电话：{{list.phone}}</p> <br>
          <p>地址：{{list.province+list.city+list.county+list.address}}</p>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>物料</th>
              <th>数量(件)</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in arr">
              <td>{{item.materiel}}</td>
              <td>{{item.num}}</td>
              <td>{{item.remarks}}</td>
            </tr>
          </tbody>
        </table>
        <div class='bot t-c not-print'>
          驳回理由:<input type="text"
                 placeholder="请输入驳回理由"
                 name="reason"
                 v-model="reason">
          <button class="reject"
                  @click="reject">驳回</button>
          <button class='pass'
                  @click="pass">通过</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      id: this.$route.query.id,
      token: window.sessionStorage.getItem('bbytoken'),
      list: {},
      arr: [],
      aid: '',
      reason: '',
      indexNow: 1
    }
  },
  methods: {
    reject () {
      var that = this;
      this.$axios.post('admin/AgentMateriel/reject', { token: this.token, id: this.id, reason: this.reason })
        .then(res => {
          if (!this.reason) {
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
    pass () {
      var that = this;
      this.$axios.post('admin/AgentMateriel/adopt', { token: this.token, aid: this.aid, id: this.id })
        .then(res => {
          layer.msg(res.data.msg, function () {
            if (res.data.code == 1)
              parent.layer.close(that.indexNow);
          });
        })
        .catch(err => console.log(err))
    },
    word () {
      window.print();
    },

  },
  created () {
    this.$axios.post('admin/AgentMateriel/detail', { token: this.token, id: this.id })
      .then(res => {

        this.list = res.data.data;
        this.aid = res.data.data.aid;
      })
      .catch(err => conosle.log(err));
    this.$axios.post('admin/AgentMateriel/materiel', { token: this.token, id: this.id })
      .then(res => {

        this.arr = res.data.data;
      })
      .catch(err => console.log(err))
    this.indexNow = parent.layer.getFrameIndex(window.name);
  }
}
</script>
<style scoped>
h4 {
  font-size: 24px;
  font-weight: normal;
}
div.detail {
  margin: 44px 0 39px 122px;
  font-size: 18px;
}
div.detail p {
  display: inline-block;
  margin-right: 175px;
  margin-top: 50px;
}
div.bot {
  margin: 64px auto 20px;
  font-size: 16px;
}
div.bot input {
  display: inline-block;
  width: 92%;
  outline: none;
  border: none;
  border-bottom: 1px solid #aaa;
  margin-left: 21px;
}
div.bot button {
  margin-top: 38px;
  width: 110px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
  border: none;
  color: white;
}
button.reject {
  background: rgba(237, 81, 55, 1);
  margin-right: 197px;
}
button.pass {
  background-color: #20a0ff;
}
.container {
  top: 20px;
  min-width: 1024px;
}
@media print {
  .not-print {
    opacity: 0;
  }
}
</style>
