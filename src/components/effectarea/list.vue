<template>
  <div class="newscreate">
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
        <div class="quote-ele"><i></i>有效区域管理</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <div class="list">
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple">已添加地区</div>
          </el-col>
          <el-col :span="22">
            <div class="grid-content bg-purple-light">
              <ul>
                <li class="list_li"
                    v-for="(item,index) in cityList"
                    :key="item.id">
                  {{item.name+item.urban}}
                  <i class="el-icon-close del_icon"
                     @click="del(item.id,index)"></i>
                </li>

              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      curId: 0,
      setCurId: [],
      messagelist: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      threeAuthList: [],
      thCurId: 0,
      dialogVisible: false,
      delnum: "",
      cityList: ''
    }
  },
  beforeCreate () {

  },
  methods: {
    del (num, index) {

      this.delnum = num;



    },
    delok () {


    },
    delno () {

      this.delnum = "";
      this.dialogVisible = false;

    },
    init () {

      this.$axios.post("admin/Program/checks", {
        token: this.token,
        id: this.curId
      }).then(res => {
        this.cityList = res.data.data;

      }).catch(err => {
        throw (err)
      })
    }
  },
  mounted () {
    let id = this.$route.query.id;
    // this.curId=id;

    this.$axios.post('admin/Auth/erAuth', {
      token: window.sessionStorage.getItem('bbytoken'),
      id: id
    })
      .then(res => {

        if (res.data.code == 1) {
          var arr = res.data.data;

          for (var i = 0; i < arr.length; i++) {
            if (arr[i].son) {
              if (arr[i].name == '有效区域管理') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }

              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '有效区域列表' && arr[i].name == '有效区域管理') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
            }
          }
          this.authList = arr;
        } else {
          this.$message.error(res.data.msg)
        }
      })
      .catch(err => {
        throw (err)
      })
  },
  created () {
    var id = this.$route.query.id;
    this.curId = id;
    this.init();
  }
}
</script>
<style>
.list {
  padding: 0 10%;
  border-top: 5px solid #f7f7fa;
  padding-top: 10px;
  font-size: 16px;
}
.del_icon {
  color: red;
  cursor: pointer;
}
.list_li {
  float: left;
  margin: 0 20px 10px 0;
}
</style>