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
        <div class="quote-ele"><i></i>配送中心-提现复核-已驳回</div>
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
        <el-table-column prop="id"
                         label="id"
                         align="center">
        </el-table-column>
        <el-table-column prop="company"
                         label="配送中心名称"
                         align="center">
        </el-table-column>

        <el-table-column prop="leader"
                         label="负责人"
                         align="center">
        </el-table-column>
        <el-table-column label="地区个数"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="detailsVisible=true,areaDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="驳回理由"
                         align="center">
          <template slot-scope="scope">

            <el-popover placement="top-start"
                        title="驳回理由"
                        width='300px'
                        v-if='scope.row.rej_reason'
                        trigger="hover">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{scope.row.rej_reason}}</el-button>
              <div style="width:200px; word-wrap: break-word;word-break: normal;">
                {{scope.row.rej_reason}}
              </div>
            </el-popover>
            <span v-else>无</span>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog title="地区详情"
                 :visible.sync="detailsVisible"
                 center>
        <div v-if="arealist"
             class="details">
          <div>省 : {{arealist.proName}}</div>
          <div>市 : {{arealist.cityName}}</div>
          <div>
            区/县 :
            <span v-for="(item,index) in arealist.countyName"
                  :key="index">{{item}}、</span>
          </div>
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
  </div>
</template>
<script type="text/ecmascript-6">
import detailsDialog from "@/components/Dialog/Dialog";
import RegionDialog from "@/components/Dialog/RegionDialog"
import Viewer from '@/utils/Viewer';
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      curId: 0,
      thCurId: 0,
      threeAuthList: [],
      authList: [],
      detailsVisible: false,
      arealist: []

    }
  },
  computed: {
    isArray () {
      return this.regionList.countyName instanceof Array
    }
  },
  components: {
    detailsDialog,
    RegionDialog
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
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/AgentContinue/list', { token: this.token, page: this.page, status: 2 })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //地区详情
    async areaDetails (row) {
      try {
        const res = await this.$axios.post('admin/AgentCancel/regionDetail', { area: row.region, token: this.token })
        this.arealist = res.data.data

      } catch (error) {
        throw (error)
      }
    },
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
              if (arr[i].name == '提现复核') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '已驳回 ' && arr[i].name == '提现复核') {
                  this.thCurId = arr[i].son[j].id;
                }
              }
            }
          } 1
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
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
}
.progress {
  /* background-color: #ebeef5; */
  height: 10px;
  /* border-radius: 10px; */
  position: relative;

  margin: 20px 0 10px 0;
}
.progress_bg:after {
  display: block;
  content: "";
  clear: both;
}

.progress-item {
  width: 10%;
  height: 100%;
  float: left;
  position: relative;
  background-color: #ebeef5;
  border-radius: 5px;
  cursor: pointer;
}

.progress-item > p {
  position: absolute;
  top: -35px;
  text-align: center;
  width: 100%;
}
.ApplyList >>> .el-radio {
  margin-right: 10px;
}

>>> .el-table__body-wrapper table th {
  padding: 0;
}
>>> .el-table__body-wrapper table td {
  font-size: 12px;
}
.center {
  text-align: center;
}
.name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
.details_content:after {
  display: block;
  content: "";
  clear: both;
}
.details >>> .el-dialog__header {
  text-align: center !important;
}
.details >>> .el-dialog__body {
  overflow: inherit !important;
}
.details_content {
  width: 100%;
  display: flex;
  justify-content: space-around;

  /*border-right: 1px dashed #04BBFC;*/
}
.details_content > div {
  flex: 1;
}

.details_content > div:last-child {
  border-left: 1px dashed #04bbfc;
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
.right_border-bottom {
  border-bottom: 1px solid #ccc;
}
.right_border-bottom input {
  border: none;
  height: 25px;
}
.Reject_Reason {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 9px;
}

.Reject_Reason > div:last-child {
  border-bottom: 1px solid #ccc;
  width: 70%;
  margin-left: 10px;
}
.Reject_Reason input {
  border: none;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.details_box {
  height: 600px;
  overflow: auto;
}
.details_box a {
  color: #04bbfc;
}
.details_box-btn {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.details_box-btn > button:first-child {
  margin-right: 200px;
}
.textPrompt {
  padding-left: 58px;
  box-sizing: border-box;
  color: red;
  font-size: 15px;
}

.Tips {
  color: red;
  margin-left: 8%;
}
.service:after {
  display: block;
  content: "";
  clear: both;
}
.service {
  height: 350px;
  overflow: auto;
}
.service > div {
  float: left;
  width: calc(100% / 3);
  height: 100%;
  text-align: center;
}
.service > div > p {
  line-height: 30px;
}
.radio {
  display: block;
  text-align: left;
  margin: 10px 0;
}
.radio >>> .el-radio__input {
  margin-left: calc(50% - 40px);
}
>>> .el-radio {
  margin-left: 0 !important;
}

.service > div {
  border-right: 1px solid #ccc;
}
.service > div:last-child {
  border: none;
}
.right >>> .el-input__inner,
.right >>> .el-select .el-input.is-focus .el-input__inner {
  border: solid 1px white;
}
.youpin .el-form-item {
  margin-bottom: 0;
}
</style>
