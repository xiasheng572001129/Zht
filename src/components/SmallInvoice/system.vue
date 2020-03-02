<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}"
                   :v-key="item.id">
        {{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>系统设置</div>
      </div>
      <div class="content">
        <label for="">车主分享获得奖励金额：</label>
        <input type="text"
               v-model="money"
               name="money"> <br>
        <button @click="edit"
                v-show="m==1">修改</button>
        <button @click="pass"
                v-show="m==0">确定</button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      money: '',
      m: '',
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      curId: 0,
      seCurId: 0
    }
  },
  created () {
    this.$axios.post('admin/SmallSystemSet/selectMoney', { token: this.token })
      .then(res => {

        if (res.data.code == 0)  //没有值 需要设置
          layer.alert(res.data.msg);
        else {
          this.money = res.data.data.am.money;
          this.m = 1;  //有值 显示修改
        }
      }).catch(err => console.log(err))
  },
  methods: {
    pass () {  //设置
      this.$axios.post('admin/SmallSystemSet/setMoney', { token: this.token, money: this.money })
        .then(res => {

          layer.msg(res.data.msg);
        }).catch(err => { })
    },
    edit () {  //修改
      this.$axios.post('admin/SmallSystemSet/alterMoney', { token: this.token, money: this.money })
        .then(res => {

          layer.msg(res.data.msg);
        }).catch(err => { })
    }
  },
  mounted () {
    var id = this.$route.query.id;
    this.curId = id;
    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {

        if (res.data.code == 1) {
          var arr = res.data.data;
          
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == '系统设置') {
              this.seCurId = arr[i].id;
            }
            if (arr[i].son) {
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
              }
            }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', { type: 'error' });
        }
      })
      .catch(err => {
        alert(err);
      })
  }
}
</script>
<style scoped>
.content {
  overflow: hidden;
  width: 330px;
  margin: 200px auto;
  font-size: 20px;
}

.content input {
  display: inline-block;
  width: 100px;
}

.content button {
  margin-top: 50px;
  float: right;
  width: 100px;
  height: 36px;
  border-radius: 18px;
  color: white;
  background-color: #00b4ff;
  display: block;
}
</style>
