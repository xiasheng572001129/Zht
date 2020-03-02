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
        <div class="quote-ele"><i></i>审核-开发奖励发放-待发放</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <el-table :data="list">
        <el-table-column prop="company"
                         label="维修厂名称"
                         align="center"></el-table-column>
        <el-table-column prop="name"
                         label="开发者姓名"
                         align="center"></el-table-column>

        <el-table-column label="推荐码"
                         align="center"
                         prop="share_promo_code">

        </el-table-column>
        <el-table-column prop="create_time"
                         label="时间"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="issue(scope.row)">发放</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div :class="list && list.length<=7?'page-nav':'page_center'"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 0,
      pageCount: 0,
      authList: [],
      threeAuthList: []
    }
  },
  created () {
    this.init();
  },

  methods: {

    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/ShopAudit/rewardShop', { token: this.token, page: this.page })
        .then(res => {

          this.list = res.data.data.data;

          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },

    issue (row) {  //发放
      this.$confirm('此操作将发放, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          const res = await this.$axios.post('admin/ShopAudit/rewardUidHandle', { token: this.token, sid: row.id, uid: row.uid })
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }

        } catch (err) {
          throw (err)
        }
      }).catch(() => { });

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
            if (arr[i].son) {
              if (arr[i].name == '开发奖励发放') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '待发放' && arr[i].name == '开发奖励发放') {
                  this.thCurId = arr[i].son[j].id;
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
  },
}
</script>
<style scoped>
.ellipsis {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.laybox2 ul {
  margin: 33px auto;
  border-bottom: 1px dashed #04bbfc;
}

.laybox2 {
  padding: 60px;
  font-size: 16px;
}

.laybox2 li {
  width: 300px;
  text-align: left;
  margin: 33px auto;
}

.t-c:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.bot > div {
  position: relative;
}

div.bot {
  margin: 45px auto 35px auto;
  height: 100px;
}

div.bot span {
  display: inline-block;
  width: 20%;
}

div.bot input {
  display: inline-block;
  width: 55%;
  outline: none;
  border: none;
  border-bottom: 1px solid #aaa;
}

div.bot button {
  width: 110px;
  height: 36px;
  margin-left: -55px;
  position: absolute;
  border-radius: 18px;
  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
  border: none;
  color: #fff;
  left: 50%;
  top: 60px;
}

button.reject {
  background: rgba(237, 81, 55, 1);
  margin-right: 30%;
}

button.pass {
  background-color: #20a0ff;
}

.left {
  float: left;
  width: 50%;
}

.right {
  float: right;
  width: 50%;
}
.nowrap {
  width: 120px !important;
  text-align: center;
  white-space: nowrap; /*规定文本不换行**/
  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/
  overflow: hidden;
  margin: 0 auto;
}
.regionDetail >>> .el-dialog__title {
  font-size: 22px;
}
.regionDetail >>> .el-dialog__body {
  padding: 0px 25px 30px;
  border-top: solid 2px #eee;
}
</style>
