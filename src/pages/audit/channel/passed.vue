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
        <div class="quote-ele"><i></i>审核-保险客户-未审核</div>
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

        <el-table-column label="福利"
                         align="center"
                         prop="user_type">
          <template slot-scope="scope">
            <el-button type="text"
                       v-if='scope.row.user_type==1'
                       @click="details(scope.row)">保险公司</el-button>
            <span v-else>
              {{scope.row.user_type==1 ? '保险公司' : scope.row.user_type==2 ? '主机厂' : '其他类型'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ucp_company"
                         label="名称"
                         align="center"></el-table-column>
        <el-table-column prop="company"
                         label="所属维修厂"
                         align="center"></el-table-column>
        <el-table-column prop="name"
                         label="车品牌"
                         align="center"></el-table-column>
        <el-table-column prop="type"
                         label="车类型"
                         align="center"></el-table-column>
        <el-table-column prop="series"
                         label="车排量"
                         align="center"></el-table-column>
        <el-table-column prop="plate"
                         label="车牌号"
                         align="center"></el-table-column>
        <el-table-column label="保单号"
                         align="center">
          <template slot-scope="scope">
           
            <span  v-if='scope.row.user_type==1'>
              <el-popover placement="top-start"
                          title="保单号"
                          width="200"
                          trigger="hover"
                          :content="scope.row.policy_num">
                <el-button type="text"
                           slot="reference"
                           class="ellipsis">{{scope.row.policy_num}}</el-button>
              </el-popover>
            </span>
             <span v-else>无</span>
          </template>
        </el-table-column>
          <el-table-column label="保单照片"
                         align="center" >

          <template slot-scope="scope" >
            
            <el-button type="text" v-if='scope.row.user_type==1' @click="details(scope.row)">详情</el-button>
            <span v-else>无 </span>
            
          </template>

        </el-table-column>

        <el-table-column prop="sale_time"
                         label="售卡时间"
                         align="center"></el-table-column>
        <!-- <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="through(scope.row)">通过</el-button>
            <el-button type="danger"
                       size="mini"
                       @click="rejected(scope.row)">驳回</el-button>
          </template>

        </el-table-column> -->
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
    <el-dialog title="详情"
               center
               :visible.sync="detailsVisible">
      <el-form label-width="100px"
               v-if='detailsList'>
        <el-form-item label="vin码 : ">
          {{detailsList.vin}}
        </el-form-item>
        <el-form-item label="保单号 : ">
          {{detailsList.policy_num}}
        </el-form-item>
        <el-form-item label="投保时间 : ">
          {{detailsList.start_time}}
        </el-form-item>
        <el-form-item label="截止时间 : ">
          {{detailsList.end_time}}
        </el-form-item>
        <el-form-item label="售卡时间 : ">
          {{detailsList.sale_time}}
        </el-form-item>

      </el-form>
      <div>
        <span style="margin:0 20px 0 25px">保单图片 : </span>

        <img :src="item"
             v-for="(item,index) in detailsList.pc_img"
             :key="index"
             class="images"
             ref="images">

      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 0,
      pageCount: 0,
      thCurId: '',
      authList: [],
      threeAuthList: [],
      throughLoading: false,
      rejecteLoading: false,
      detailsVisible: false,
      multipleData: [],
      detailsList: {}
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
      this.$axios.post('admin/UserAudit/channelList', { token: this.token, page: this.page, status: 1, pay_status: 1 })
        .then(res => {

          this.list = res.data.data.list;

          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    details (row) {  //详情
      this.detailsVisible = true
      this.detailsList = row
      this.$nextTick(() => {
        Viewer(this.$refs.images)
      })
    },
    handleSelectionChange (val) {  //全选/单选
      let tmp = []
      val.forEach(el => {
        tmp.push({ ucp_id: el.ucp_id, uc_id: el.uc_id, user_type: el.user_type })
      });

      this.multipleData = tmp
    },
    //通过
    through () {
      if (this.multipleData && this.multipleData.length < 1) {
        this.$message.error('请选择通过项')
        return;
      }
      this.$confirm('此操作将通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {

          this.throughLoading = true
          const res = await this.$axios.post('admin/UserAudit/channelAdopt', { token: this.token, data: this.multipleData })
          this.throughLoading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          this.throughLoading = false
          throw (err)
        }
      }).catch(() => { });
    },
    //驳回
    rejecte () {
      if (this.multipleData && this.multipleData.length < 1) {
        this.$message.error('请选择驳回项')
        return;
      }
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '请输入驳回理由'
      }).then(async ({ value }) => {
        try {

          this.rejecteLoading = true
          const res = await this.$axios.post('admin/UserAudit/channelReject', { token: this.token, data: this.multipleData, reason: value })
          this.rejecteLoading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          this.rejecteLoading = false
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
              if (arr[i].name == '保险客户') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '已审核' && arr[i].name == '保险客户') {
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
.img {
  width: 70px;
  height: 70px;
}
.images {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  vertical-align: top;
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
