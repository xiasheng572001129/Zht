<template>
  <div>
    <div class="main"
         id="main">
      <div class="information">
        <ul>
          <li>市级代理：{{list.company}}</li>
          <li>负责人：{{list.leader}}</li>
          <li>联系电话：{{list.phone}}</li>
        </ul>

        <p>地址：{{list.province+list.city+list.address}}</p>
      </div>

      <div class="el_table">

        <el-table :data="tableData"
                  border>
          <el-table-column prop="name"
                           label="物料名称"
                           align="center">
          </el-table-column>
          <el-table-column prop="size"
                           label="数量/件"
                           align="center">
          </el-table-column>
          <el-table-column prop="remarks"
                           label="备注"
                           align="center">
          </el-table-column>
        </el-table>
      </div>

    </div>
    <div class="el_btn">
      <el-button type="danger"
                 style="margin-right: 198px;"
                 @click="Reject"
                 round>驳回</el-button>
      <el-button type="primary"
                 round
                 @click="adopt">通过</el-button>
    </div>
    <Reject-dialog :visible="centerDialogVisible"
                   @preservation="preservation"
                   @close="close"></Reject-dialog>
  </div>
</template>
<script>
import RejectDialog from "@/components/Dialog/RejectDialog"
export default {
  data () {
    return {
      isShow: false,
      centerDialogVisible: false,
      token: window.sessionStorage.getItem('bbytoken'),
      list: {},
      tableData: [],
      id: this.$route.query.gid,
      Reason: ""
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.isShow = this.$route.query.isShow

  },
  components: {
    RejectDialog
  },
  methods: {

    init () {

      this.$axios.post("supply/detail", {
        token: this.token,
        id: this.id
      }).then(res => {
        if (res.data.code == 1) {

          this.list = res.data.data
          this.tableData = res.data.data.details
        }
      }).catch(err => {

      })
    },
    adopt () {


      var id = this.list.id;
      var gid = this.$route.query.id
      this.$axios.post("supply/adoptMateriel", {
        token: this.token,
        id: id
      }).then(res => {
        if (res.data.code == 1) {
          var that = this
          layer.msg(res.data.msg, function () {
            that.$router.push({
              path: "/MunicipalAgent/materiel/materiel/adopt",
              query: {
                id: gid
              }
            })
          })
        }
      }).catch(err => {

      })
    },
    Reject () {
      this.centerDialogVisible = true
    },
    preservation (reason) {
      if (!reason) {
        layer.msg("驳回理由不能为空")
      } else {

        var id = this.list.id
        var phone = this.list.phone;
        var create_time = this.list.create_time
        var gid = this.$route.query.id
        this.$axios.post("supply/matReject", {
          token: this.token,
          id: id,
          reason: reason,
          phone: phone,
          create_time: create_time
        }).then(res => {
          var that = this

          layer.msg(res.data.msg, function () {
            that.$router.push({
              path: "/MunicipalAgent/materiel/materiel/Reject",
              query: {
                id: gid
              }
            })
          })
        }).catch(err => {

        })
      }
    },
    close () {
      this.centerDialogVisible = false
    }

  }

}
</script>
<style scoped>
.main {
  width: 70%;
  margin: 93px auto;
}

@media (max-width: 768px) {
  .main {
    border: 1px solid red;
  }
}

.information {
  color: #333333;
  font-size: 20px;
}

.information > ul:after {
  display: block;
  content: "";
  clear: both;
}

.information > ul {
  margin-bottom: 20px;
}

.information > ul > li {
  float: left;
  margin-right: 40px;
}

.el_table:after {
  display: block;
  content: "";
  clear: both;
}

.el_table {
  margin-top: 66px;
}

.el_btn {
  text-align: center;
  margin-top: 120px;
}

.Reason {
  display: flex;
  margin-top: 30px;
}

textarea {
  resize: none;
  width: 80%;
  height: 150px;
  margin-left: 10px;
}
</style>
<style>
.el-table__header {
}

.a {
}

@media only screen and (min-width: 1920px) {
  .a {
    border: 1px solid red !important;
  }
}

.body {
  width: 70% !important;
  margin: 0 auto;
}
</style>
