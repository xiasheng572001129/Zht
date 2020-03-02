<template>
  <div>
    <div class="content">
      <div :class="Quota>0?'':'border-right'">
        <div>
          <p>支付凭证</p>
          <p><img :src="detailsData.img"
                 style="width: 300px;height: 400px;"></p>
          <p>应缴金额：{{detailsData.price+'元'}}</p>
        </div>
      </div>
      <div :class="Quota>0?'border-left':''">
        <ul class="list">
          <li>市区代理名称:{{detailsData.company}}</li>
          <li>联系电话:{{detailsData.phone}}</li>
          <li>延迟罚款:
            <div><input type="text"
                     v-model="Delayedfines"></div>
          </li>
          <li>
            市级代理利润:
            <div><input type="text"
                     readonly
                     v-model='pro'></div>
          </li>
          <!-- <li>
            运营商:
            <div><input type="text" ></div>
          </li>
          <li>
             服务经理:
            <div><input type="text" ></div>
          </li> -->
          <li>授信金额:
            <div><input type="text"
                     v-model="Quota"></div>
          </li>
        </ul>
        <ul class="list"
            v-show="Quota>0">
          <!-- <li>单位:
            <div><input type="text" v-model="Company"></div>
          </li> -->
          <li>联系人:
            <div><input type="text"
                     v-model="Contacts"></div>
          </li>
          <li>电话:
            <div><input type="text"
                     v-model="Telephone"></div>
          </li>

        </ul>
        <ul class="list">
          <li @click="region"><a href="javscript:;"
               style="color:#04BBFC">区域:{{detailsData.regions}}</a></li>
        </ul>
      </div>

    </div>
    <div class="el_btn">
      <el-button type="danger"
                 style="margin-right: 300px;"
                 round
                 @click="Reject">驳回</el-button>
      <el-button type="primary"
                 round
                 @click="adopt">通过</el-button>
    </div>
    <Reject-dialog :visible="centerDialogVisible"
                   @preservation="preservation"
                   @close="close"></Reject-dialog>
    <Region-dialog title="区域个数"
                   @regionClose="regionClose"
                   :countyShow="false"
                   :Province="Province"
                   :regionVisible="regionDialogVisible"></Region-dialog>
  </div>
</template>
<script>
import RejectDialog from "@/components/Dialog/RejectDialog"
import RegionDialog from '@/components/Dialog/RegionDialog'
export default {
  data () {
    return {
      token: window.sessionStorage.getItem("bbytoken"),
      centerDialogVisible: false,
      detailsData: {},
      Quota: "",
      Divideinto: "",
      Delayedfines: 500,
      Company: "",
      Contacts: "",
      Telephone: "",
      pro: 5, //市级代理利润
      id: this.$route.query.gid, //每一条数据的id
      Province: null,  //地区的数据
      regionDialogVisible: false, //区域的弹出框,默认隐藏
    }
  },
  components: {
    RejectDialog
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.post("supply/areaList", { token: this.token, id: this.id }).then(res => {
        if (res.data.code == 1) {
          this.detailsData = {
            company: res.data.data.company,
            phone: res.data.data.phone,
            price: res.data.data.price,
            regions: res.data.data.regions,
            img: res.data.data.voucher,
            gid: res.data.data.gid
          }
        }

      }).
        catch(err => {

        })
    },
    Reject () {
      this.centerDialogVisible = true
    },
    preservation (reason, id) {

      this.$axios.post("supply/reject", { token: this.token, id: id, reason: reason }).then(res => {
        if (res.data.code == 1
        ) {
          var that = this

          layer.msg(res.data.msg, { time: 2000 }, function () {
            that.$router.push({ path: "/MunicipalAgent/increaseRegion/Reject", query: { id: that.$route.query.id } })
          })
        }
      }).
        catch(err => {

        })
    },
    close () {
      this.centerDialogVisible = false;
    },
    adopt () {
      if (!this.Delayedfines) {
        layer.msg("请输入延迟罚款")
        return;
      }
      if (this.Quota) {
        // if (!this.Company) {
        //   layer.msg("请输入单位名称")
        //   return;
        // }
        if (!this.Contacts) {
          layer.msg("请输入联系人")
          return;
        }
        if (!this.Telephone) {
          layer.msg("请输入手机号")
          return;
        }
      }

      var obj = {
        token: this.token,
        gid: this.detailsData.gid,
        id: this.$route.query.gid,
        delay_fines: this.Delayedfines,
        credit: this.Quota,
        name: this.Contacts,
        iphone: this.Telephone,
        regions: this.detailsData.regions,
        pro: this.pro
      }
      this.$axios.post("supply/areaPost", obj).then(res => {

        if (res.data.code == 1) {
          var that = this;
          layer.msg(res.data.msg, function () {
            that.$router.push({ path: "/MunicipalAgent/increaseRegion/Adopt", query: { id: that.$route.query.id } })
          })
        }
      }).
        catch(err => {
          throw (err)
        })
    },
    //点击区域查看地区
    region () {
      //请求详细地区的接口
      this.$axios.post("supply/areaRegion", { token: this.token, id: this.id }).then(res => {
        if (res.data.code == 1) {
          this.regionDialogVisible = true
          this.Province = res.data.data
        } else {
          this.regionDialogVisible = false;
          layer.msg(res.data.msg, { time: 1000 })
        }
      }).catch(err => console.log(err))
    },
    //关闭地区弹出框
    regionClose () {
      this.regionDialogVisible = false
    }
  }
}
</script>
<style scoped>
.content {
  width: 100%;
  margin-top: 100px;
}

.content > div {
  width: 50%;
  float: left;
}

.content:after {
  display: block;
  content: "";
  clear: both;
}

.content > div:first-child {
  text-align: center;
}

.border-right {
  border-right: 1px dashed #04bbfc;
}

.border-left {
  border-left: 1px dashed #04bbfc;
}

.content > div:last-child {
  padding-left: 150px;
}

.content > div:first-child p {
  margin-bottom: 50px;
}

.list {
  font-size: 20px;
}

.list > li {
  margin-bottom: 30px;
}

.list > li input {
  border: none;

  height: 23px;
}

.list > li div {
  margin: 10px 0;
  border-bottom: 1px solid #979797;
  width: 30%;
}

.el_btn {
  text-align: center;
  margin-top: 150px;
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
