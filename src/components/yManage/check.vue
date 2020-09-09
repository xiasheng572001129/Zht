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
        <div class="quote-ele"><i></i>配送中心</div>
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
            <th>公司名</th>
            <th>负责人</th>
            <th>电话</th>
            <th>关停时间</th>
            <th>余额</th>
            <th>关停理由</th>
            <th>关停类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.create_time}}</td>
            <td>{{item.balance}}</td>
            <td>
              <el-popover placement="top-start"
                          title=""
                          width="200"
                          trigger="hover"
                          :content="item.reason">
                <a slot="reference">{{item.reason}}</a>
              </el-popover>
            </td>
            <td>{{item.status==7 ? '总后台关停' : '投诉关停'}}</td>
            <td>
              <el-button type="text"
                         @click="open(item.aid,item.company,item.leader)">开启</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <el-dialog title="开启理由"
                 :visible.sync="dialogVisible"
                 class="openReason"
                 width="30%"
                 center
                 @close="close">
        <textarea class="textarea"
                  cols="100"
                  rows="200"
                  v-model="openReason">

                       </textarea>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="pass"
                     style="">开启</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisibl"
                 height="40%"
                 width="40%"
                 style="margin-top: 100px">
        <img :src="ImgUrl"
             style="width: 300px;width: 100%;" />
      </el-dialog>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import page from '../common.js'
export default {
  data () {
    return {
      cityAgnent: "",
      obj: {
        profit: '10',
        card_profit: 0,
        delay_fine: '200',
        shop_hours: '6',
        //          shop_fund: '1',
        //          shop_praise: '1'
      },
      ImgUrl: "",
      aid: "", //所点击每一个的id
      dialogVisible: false,
      dialogVisibl: false,
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      totalpage: 1, //总页数
      pageCount: 1,
      index: 1, //点击的当前页，
      endpage: 1, //当前一组页码的最大值
      arr: [], //默认显示 1 2 3 4 5页
      n: 1, //当前点击的页码的位置
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      openReason: '' //开启理由
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    tapImg () {
      this.dialogVisibl = true;
    },
    open (aid, company, leader) {
      this.dialogVisible = true;
      this.obj = {
        aid: aid,
        company: company,
        leader: leader,
        token: this.token
      }
    },
    //关闭弹框,清空开启理由
    close () {
      this.openReason = ''
    },
    pass () {
      if (!this.openReason) {
        layer.msg('请输入开启理由', { time: 1500 })
        return;
      }
      this.obj.reason = this.openReason
      this.$axios.post('admin/AgentList/start', this.obj).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.dialogVisible = false
            this.init()
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      }).catch(err => console.log(err))
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    init () {
      this.$axios.post('admin/AgentList/stopList', {
        token: this.token,
        page: this.page
      })
        .then(res => {
          if (res.data.code == 1) {

            this.list = res.data.data.list;
            this.showpage(res.data.data);
            this.pageCount = res.data.data.rows
          } else {
            this.list = {}
            layer.msg(res.data.msg)
          }
        })
        .catch(err => console.log(err))
    },
    go: page.go,
    first: page.first,
    end: page.end,
    prev: page.prev,
    next: page.next,
    showpage: page.showpage,
    checkdetail: function (id) {
      var that = this;
      layer.open({
        type: 2,
        area: ['50%', '70%'],
        title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;font-size:20px;line-height:60px;'],
        shadeClose: true,
        shade: 0.8,
        content: '192.168.43.250/#/yManage/checkDetail?aid=' + id,
        end: function () {
          that.$axios.post('admin/AgentAuditList/index', {
            token: that.token,
            page: that.index
          })
            .then(res => {
              that.list = res.data.data.list;
              that.showpage(res.data.data);
            })
            .catch(err => console.log(err))
        }
      })
    }
  },
  created () {
    this.init();

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
              if (arr[i].name == '管理列表') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '关停列表' && arr[i].name == '管理列表') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
            }
          }
          this.authList = arr;
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
      .catch(err => {
        alert(err);
      })
  },
  watch: {
    index: function () {
      this.init();
    }
  }
}
</script>

<style scoped>
.el_dialog {
  display: flex;
}

.el_dialog > div {
  flex: 1;
  padding-left: 30px;
}

.el_dialog > div:first-child {
  border-right: 1px solid #0abff1;
}

.el_dialog-img {
  margin-top: 50px;
}

.dialog-footer {
  padding-bottom: 50px !important;
}

.el_dialog > div:last-child > div {
  padding-bottom: 5px;
  /* margin-bottom: 30px;*/
}

.input__inner {
  border: 0 none;
  border-bottom: 1px solid #ccc;
}
.textarea {
  height: 200px;
  resize: none;
}
</style>
<style>
.openReason .el-dialog__header {
  background: rgb(152, 209, 249);
  padding-bottom: 20px;
}
.openReason .el-dialog__title {
  color: #fff;
}
</style>
