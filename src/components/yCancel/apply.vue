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
        <div class="quote-ele"><i></i>市级配送中心-取消合作</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>市级配送中心</th>
            <th>地区</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>物料详情</th>
            <th>理由</th>
            <th>申请时间</th>
            <th>详情</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.company}}</td>
            <td><a href="javascript:;"
                 @click="handleRegion(item.region)">{{item.regions}}</a></td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td><a href="javascript:;"
                 @click='detailsDialogVisible=true,details(item)'>查看</a></td>
            <td>
              <el-popover placement="top-start"
                          width="120"
                          trigger="hover"
                          :content="item.reason">
                <!-- <el-button slot="reference">hover 激活</el-button> -->
                <p slot="reference"
                   class="nowrap">{{item.reason}}</p>
              </el-popover>
            </td>
            <td>{{item.create_time}}</td>
            <td><a href="javascript:;"
                 @click="adopt(item)">通过</a></td>
          </tr>
        </tbody>
      </table>
      <el-dialog title="详情"
                 :visible.sync="detailsDialogVisible"
                 width="70%"
                 center>
        <div ref='el_table'
             class="el_table">

          <el-table :data="materielData.supplement"
                    border
                    style="margin:20px 0">
            <el-table-column label="名称"
                             prop="name"
                             align="center"
                             width="300"></el-table-column>
            <el-table-column label="期初配给"
                             prop="ration"
                             align="center"></el-table-column>
            <el-table-column label="剩余库存"
                             prop="materiel_stock"
                             align="center"></el-table-column>
            <el-table-column v-if="materielData.region<=0"
                             label="需补充数量"
                             width="300"
                             prop="supplement"
                             align="center"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div :class="list && list.length<=7?'page-nav':'page_center'"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <div class="laybox2"
         style="display:none">
      <ul>
        <li>市级配送中心：{{obj.company}}</li>
        <li>联系电话：{{obj.phone}}</li>
        <li>已开通汽修厂数量：{{obj.open_shop}}</li>
        <li>剩余金额：{{obj.balance}}</li>
        <li>取消理由：{{obj.reason}}</li>
      </ul>
      <div class='bot t-c'>
        <div class="left">
          <span>驳回理由:</span><input type="text"
                 placeholder="请输入驳回理由"
                 name="reg_reason"
                 v-model="reg_reason">
          <button class="reject"
                  @click="reject">驳回</button>
        </div>
        <div class="right">
          <span>取消理由:</span><input type="text"
                 placeholder="此取消理由发送给修车厂"
                 name="reason"
                 v-model="reason">
          <button class='pass'
                  @click="pass">通过</button>
        </div>
      </div>
    </div>
    <div class="regionDetail">
      <el-dialog title="详情"
                 :visible.sync="regionInfoShow"
                 width="30%"
                 :center=true>
        <div v-if="arealist"
             class="details"
             style="margin:20px">
          <div>省 : {{arealist.proName}}</div>
          <div>市 : {{arealist.cityName}}</div>
          <div>
            区/县 :
            <span v-for="(item,index) in arealist.countyName"
                  :key="index">{{item}}、</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      obj: {},
      reason: '',
      reg_reason: '',
      aid: '',
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1,//当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      detailsDialogVisible: false,
      materielData: [],
      arealist: [],
      regionInfoShow: false
    }
  },
  created () {
    this.init();
  },
  watch: {
    index () {
      this.init();
    }
  },
  methods: {
    go: page.go,
    first: page.first,
    end: page.end,
    prev: page.prev,
    next: page.next,
    showpage: page.showpage,
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/agentCancel/waitList', { token: this.token, page: this.page })
        .then(res => {

          this.list = res.data.data.list;
          this.showpage(res.data.data);
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    adopt (row) {
      this.$confirm('您确定要取消合作吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios.post('admin/AgentCancel/adopt', { token: this.token, id: row.id, aid: row.aid })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.$router.push({
            path: this.threeAuthList[1].action,
            query: {
              id: this.curId
            }
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => { });
    },
    //通过
    pass () {

      var obj1 = {
        id: this.obj.id,
        aid: this.aid,
        token: this.token,
        reason: this.reason,
        company: this.obj.company
      }
      if (!obj1.reason) {
        layer.msg('请输入取消理由！', { anim: 6 });
        return;
      }
      this.$axios.post('admin/AgentCancel/adopt', obj1)
        .then(res => {

          if (res.data.code == 1) {
            layer.msg(res.data.msg);
            setTimeout(() => {
              this.$router.push({ path: '/yCancel/Pass', query: { id: this.curId } });
              layer.closeAll();
            }, 1000);
          } else {
            layer.closeAll();
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        }).catch(err => console.log(err))
    },
    //驳回
    reject () {
      var obj1 = {
        id: this.obj.id,
        aid: this.aid,
        token: this.token,
        rej_reason: this.reg_reason,
        company: this.obj.company
      }
      if (!obj1.rej_reason) {
        layer.msg('请输入驳回理由!', { anim: 6 });
        return;
      }
      this.$axios.post('admin/AgentCancel/reject', obj1)
        .then(res => {

          if (res.data.code == 1) {
            layer.msg(res.data.msg);
            setTimeout(() => {
              this.$router.push({ path: '/yCancel/reject', query: { id: this.curId } });
              layer.closeAll();
            }, 1000);
          } else {
            layer.closeAll();
            this.$alert(res.data.msg, '提示', { type: 'error' });
          }
        }).catch(err => console.log(err))
    },
    /* 物料详情 */
    async details (row) {
      try {
        const res = await this.$axios.post('admin/agentCancel/detail', { token: this.token, id: row.id })
        this.materielData = res.data.data
      } catch (err) {
        throw (err)
      }
    },
    handleRegion (item) {
      this.regionInfoShow = true
      this.$axios.post('admin/AgentCancel/regionDetail', { area: item, token: this.token })
        .then((res) => {
          this.arealist = res.data.data

        })
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
              if (arr[i].name == '取消合作') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '申请列表' && arr[i].name == '取消合作') {
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
