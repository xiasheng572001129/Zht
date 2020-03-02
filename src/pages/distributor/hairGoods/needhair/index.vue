<template>
  <div>
    <div>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="订单编号"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="ShopVisible=true,shop_details=scope.row,Shop()">{{scope.row.oil_shop_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="oil_leader"
                         label="分销商名称"
                         align="center">

        </el-table-column>
        <el-table-column prop="leader_phone"
                         label="收货人姓名"
                         align="center">

        </el-table-column>
        <el-table-column prop="date"
                         label="收货人电话"
                         align="center">

        </el-table-column>
        <el-table-column label="收获地址"
                         align="center">

        </el-table-column>
        <el-table-column label="用户支付时间"
                         align="center">

        </el-table-column>

        <el-table-column prop="date"
                         label="发货时间"
                         align="center">

        </el-table-column>
      </el-table>
    </div>
    <template>
      <el-dialog title="详情地址"
                 :visible.sync="addressVisible"
                 width="30%"
                 center>
        <div class="address">
          {{address.province+address.city+address.county+address.address}}
        </div>
      </el-dialog>

      <el-dialog title="店铺详情"
                 :visible.sync="ShopVisible"
                 width="40%"
                 center>
        <div class="shop">
          <div>
            <span>店铺座机 : </span>
            <span>{{shop_details.shop_phone}}</span>
          </div>
          <div>
            <span>营业时间 : </span>
            <span>{{`${shop_details.start_time}-${shop_details.end_time}`}}</span>
          </div>
          <div class="shop_image">
            <span>店铺图片 : </span>
            <span v-for='(item,index) in shop_details.shop_image'
                  :key="index">
              <img :src="item"
                   ref="enlarge">
            </span>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="收益"
                 :visible.sync="ProfitVisible"
                 @close='close'
                 center>
        <div class="Profit">
          <el-table :data="ProfitList"
                    style="width: 100%">
            <el-table-column label="车主姓名"
                             align="center"
                             prop="user_name"></el-table-column>
            <el-table-column label="车主支付金额"
                             align="center"
                             prop="user_price"></el-table-column>
            <el-table-column label="加油升数"
                             align="center"
                             prop="litre"></el-table-column>
            <el-table-column label="平台补贴"
                             align="center"
                             prop="platform_money"></el-table-column>
            <el-table-column label="油站收入金额"
                             align="center"
                             prop="actual_price"></el-table-column>
            <el-table-column width="200"
                             label="支付时间"
                             align="center"
                             prop="pay_time"></el-table-column>
          </el-table>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <pagination class="page_center"
                      :pageCount='pageSmCount'
                      @index='currentSmPage' />
        </span>
      </el-dialog>
      <el-dialog title="所售油品"
                 :visible.sync="sellVisible"
                 center>
        <div class="sell">
          <el-table :data="SellOut_Oils"
                    border
                    style="width: 100%">
            <el-table-column label="油品名称"
                             align="center"
                             prop="oil_name"></el-table-column>
            <el-table-column label="油站价"
                             align="center"
                             prop="station_price"></el-table-column>
            <el-table-column label="折扣价"
                             align="center"
                             prop="discount_price"></el-table-column>
            <el-table-column label="会员价"
                             align="center"
                             prop="member_price"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <el-dialog title="取消合作"
                 :visible.sync="cancelVisible"
                 @close='close'
                 center>
        <div class="Reason">
          <el-input type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10}"
                    placeholder="请输入取消合作理由"
                    v-model="reason">
          </el-input>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="cancel">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="关停理由"
                 :visible.sync="ReasonVisible"
                 @close='close'
                 center>
        <div class="Reason">
          <el-input type="textarea"
                    :autosize="{ minRows: 10, maxRows: 10}"
                    placeholder="请输入关停理由"
                    v-model="reason">
          </el-input>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="ShutDown">确定</el-button>
        </span>
      </el-dialog>
    </template>
    <template>
      <pagination class="page_center"
                  :pageCount='pageCount'
                  @index='currentPage' />
    </template>
  </div>
</template>
<script>
import Viewer from '@/utils/Viewer'
import pagination from '@/components/pagination/pagination'
export default {
  components: { pagination },
  data () {
    return {
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,//当前页
      pageCount: 1,
      pageSmCount: 1,
      SmPage: 1,
      tableData: [],
      addressVisible: false, //地址详情弹框状态
      address: '', //详情地址,
      ShopVisible: false, //店铺
      shop_details: '',
      ProfitVisible: false, //收益弹框状态
      ProfitList: [],
      sellVisible: false, //所售油品 
      SellOut_Oils: [], //售出的油品详情
      ReasonData: '',
      ReasonVisible: false, //关停
      cancelVisible: false, //取消合作
      cancelData: '',
      reason: '', //关停理由
      oil_shop_id: ''
    }
  },

  methods: {
    async init () {
      try {
        let res = await this.$axios.post('admin/OilList/oilList', { token: this.token, page: this.page })
        if (res.data.code == 1) {
          this.tableData = res.data.data.list
          this.pageCount = res.data.data.rows;
        } else {
          this.tableData = []
        }
      } catch (err) {
        throw (err)
      }
    },
    /* 收益详情数据 */
    async Profit (row) {
      try {
        let res = await this.$axios.post('admin/OilExamine/incomeRecord', {
          token: this.token,
          oil_shop_id: row.id,
          page: this.SmPage
        })
        if (res.data.code == 1) {
          this.ProfitList = res.data.data.list
          this.pageSmCount = res.data.data.rows
        }
      } catch (err) {
        throw (err)
      }
    },
    /* 图片放大加旋转 */
    Shop () {
      this.$nextTick(() => {
        let ViewerDome = this.$refs.enlarge
        if (ViewerDome && ViewerDome.length > 0) {
          ViewerDome.forEach(item => {
            Viewer(item)
          })
        }
      })
    },
    /* 售出的油品详情 */
    async Oils (row) {
      try {
        let res = await this.$axios.post('admin/OilExamine/oilType', {
          token: this.token,
          id: row.id
        })
        if (res.data.code == 1) {
          this.SellOut_Oils = res.data.data
        }
      } catch (err) {
        throw (err)
      }
    },
    /* 关停油站 */
    ShutDown (row) {
      if (!this.reason) {
        this.$message.error('关停理由不能为空')
        return;
      }
      this.operation('admin/OilList/shutDown', this.ReasonData.id)
    },
    /* 取消合作 */
    cancel (row) {
      if (!this.reason) {
        this.$message.error('取消合作理由不能为空')
        return;
      }
      this.operation('admin/OilList/totalCancel', this.cancelData.id)
    },
    /* 取消/关停 */
    async operation (url, id) {
      try {
        let res = await this.$axios.post(url, {
          token: this.token,
          reason: this.reason,
          oil_shop_id: id
        })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.cancelVisible = false
          this.ReasonVisible = false
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    },
    /* 关闭对话框清空数据 */
    close () {
      this.reason = ''
      this.SmPage = 1
      this.pageSmCount = 1
    },
    currentPage (e) {
      this.page = e;
      this.init()
    },
    currentSmPage (e) {
      this.SmPage = e;
      this.Profit(this.oil_shop_id)
    }
  },
  mounted () {
    this.init()

  }
}
</script>

<style scoped>
>>> .el-table th {
  height: 30px !important;
  line-height: 30px !important;
}
.address {
  width: 100%;
  min-height: 150px;
  margin-top: 20px;
  overflow: auto;
}
.shop {
  min-height: 200px;
}
.shop > div {
  margin-bottom: 10px;
}
.shop_image {
}
.shop_image > span:first-child {
}
.shop_image img {
  width: 60px;
  height: 60px;
  vertical-align: top;
  margin-right: 10px;
  border: 1px solid #eee;
}
.sell {
  min-height: 200px;
}
</style>
<style>
.viewer-container {
  z-index: 9999 !important;
}
.el-message {
  z-index: 9999 !important;
}
</style>


