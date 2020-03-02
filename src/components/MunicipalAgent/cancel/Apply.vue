<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>市级代理</th>
          <th>联系电话</th>
          <th>负责人</th>
          <th>取消理由</th>
          <th>申请时间</th>
          <th>驳回</th>
          <th>通过</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list"
            style="height: 90px;">

          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">{{item.company}}</a>
              <div>
                <p>区域运营商个数：{{item.com_detail.count}}</p>
                <p>剩余金额：{{item.com_detail.balance}}</p>
              </div>

            </el-popover>
          </td>
          <td>{{item.phone}}</td>
          <td>{{item.leader}}</td>
          <td>
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover">
              <a href="javascript:;"
                 slot="reference"
                 @mouseover="hoverColor($event)"
                 @mouseleave="removeColor($event)">查看</a>
              <div>
                <p>{{item.reason}}</p>
              </div>
            </el-popover>
          </td>
          <td>
            {{item.create_time}}
          </td>
          <td>
            <a href="javascript:;"
               @click="See(item.id)">驳回</a>
          </td>
          <td>
            <a href="javascript:;"
               @click="adopt(item.id)">确认</a>
          </td>
        </tr>
      </tbody>
    </table>
    <el-dialog title="通过"
               :visible.sync="adoptDialogVisible"
               width="600"
               center>
      <div class="adopt_dialog">
        <div>
          <div ref="Mandatory">两个必选项</div>
          <div>
            <label>收回物料</label>
            <el-checkbox v-model="materiel"
                         class="checkbox"></el-checkbox>
            <label>退还押金</label>
            <el-checkbox v-model="deposit"
                         class="checkbox"></el-checkbox>
          </div>
          <div style="text-align: center">
            <el-button type="primary"
                       round
                       @click="confirm">确认</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <Reject-dialog :visible="centerDialogVisible"
                   @preservation="preservation"
                   @close="close"></Reject-dialog>
    <div class="page_center"
         v-show="pageCount&&pageCount>1">
      <paging :page-count="pageCount"
              :page="page"
              @index="paging"></paging>
      <!--分页的组件-->
    </div>
  </div>
</template>
<script>
import RejectDialog from "@/components/Dialog/RejectDialog"
export default {
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      centerDialogVisible: false,
      list: [],
      centerDialogVisible: false,
      adoptDialogVisible: false,
      id: "",
      Id: "",
      radio: 1,
      radio: 2,
      materiel: true,
      deposit: true
    }
  },
  components: {
    RejectDialog
  },
  created () {
    this.init()
  },
  methods: {
    //控制分页的组件
    paging (e) {
      this.page = e;
      this.init()
    },
    //关闭dialog的操作
    close (Reason) {
      this.centerDialogVisible = false;
    },
    //获取驳回理由
    preservation (reason) {

      if (reason) {
        this.$axios.post("supply/rejectPost", {
          token: this.token,
          id: this.id,
          reason: reason
        }).then(res => {

          if (res.data.code == 1) {
            var that = this
            layer.msg(res.data.msg, { time: 1000 }, function () {
              that.$router.push({ path: "/MunicipalAgent/cancel/cancel/Reject", query: { id: that.$route.query.id } })
              that.close()
            })
          }
        }).
          catch(err => {
            throw (err)
          })
      } else {
        layer.msg("请输入驳回理由")
      }

    },
    init () {
      this.$axios.post("supply/canApply", {
        token: this.token,
        page: this.page
      }).then(res => {

        if (res.data.code == 1) {
          this.list = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          layer.msg(res.data.msg, { time: 500 })
        }
      }).
        catch(err => {
          throw (err)
        })
    },
    details () {
      var id = this.$route.query.id;
      this.$router.push({
        path: "/MunicipalAgent/materiel/materiel/DetailsPage",
        query: {
          id: id,
          is: true
        }
      })
    },
    hoverColor (e) {
      e.currentTarget.className = "hoveColor"
    },
    removeColor (e) {
      e.currentTarget.className = "primary"
    },
    See (id) {
      this.id = id;
      this.centerDialogVisible = true;
    },
    //点击通过
    adopt (id) {

      this.adoptDialogVisible = true
      this.Id = id;
    },
    //是否确认通过
    confirm () {
      if (!this.materiel || !this.deposit) {
        this.$refs.Mandatory.className = "Color-red"
        return;
      } else {
        this.$refs.Mandatory.className = "Color-999"
      }
      this.adoptData()
    },
    //通过操作
    adoptData () {
      this.$axios.post("supply/adoptPost", {
        token: this.token,
        id: this.Id
      }).then(res => {
        if (res.data.code == 1) {
          var that = this;
          layer.msg(res.data.msg, { time: 1000 }, function () {
            that.$router.push({ path: '/MunicipalAgent/cancel/cancel/adopt', query: { id: that.$route.query.id } })
          })
        }
      }).
        catch(err => {
          throw (err)
        })
    }

  }
}
</script>
<style scoped>
.hoveColor {
  opacity: 0.5;
}

.primary {
  color: #04bbfc;
}

.Reason {
  display: flex;
  margin-top: 30px;
}

.Color-red {
  color: red;
}

.Color-999 {
  color: #999999;
}

textarea {
  resize: none;
  width: 80%;
  height: 150px;
  margin-left: 10px;
}

.adopt_dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 69px 0 69px 0;
}

.adopt_dialog > div > div {
  margin-bottom: 9px;
}

.adopt_dialog > div > div > button {
  margin-top: 60px;
  padding: 10px 30px;
}

.checkbox {
  margin: 0 8px;
  border-radius: 50% !important;
}
</style>
<style>
.adopt_dialog .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-radius: 50%;
}
</style>
