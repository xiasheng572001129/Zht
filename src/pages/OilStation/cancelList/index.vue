<template>
  <div>
    <div class="quote">
      <div class="quote-ele"><i></i>油站-已取消合作列表</div>
    </div>
    <div>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="date"
                         label="店铺名称"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="shop_details=scope.row,ShopVisible=true,Shop()">{{scope.row.oil_shop_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="oil_leader"
                         label="店铺负责人"
                         align="center">

        </el-table-column>
        <el-table-column prop="leader_phone"
                         label="负责人联系电话"
                         align="center">

        </el-table-column>
        <el-table-column label="店铺地址"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title="详细地址"
                        width="200"
                        trigger="hover"
                        :content="`${scope.row.province}${scope.row.city}${scope.row.county}${scope.row.address}`">
              <el-button slot="reference"
                         type="text">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="shop_phone"
                         label="收益"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="oil_shop_id=scope.row,ProfitVisible=true,Profit(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="date"
                         label="所售油品"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="sellVisible=true,Oils(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template>
        <el-dialog title="店铺详情"
                   :visible.sync="ShopVisible"
                   width="40%"
                   center>
          <div class="shop">

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

      </template>
      <template>
        <pagination class="page_center"
                    :pageCount='pageCount'
                    @index='currentPage' />
      </template>
    </div>
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
      ShopVisible: false, //店铺详情 
      shop_details: [],
      sellVisible: false, //所售汽油
      SellOut_Oils: [],//所售汽油详情 
      RejectVisible: false, //驳回
      RejectData: '',
      reason: '',//驳回理由
      ProfitVisible: false, //收益
      ProfitList: [],
      oil_shop_id: ''
    }
  },
  methods: {
    async init () {
      try {
        let res = await this.$axios.post('admin/OilExamine/cancelList', { token: this.token, page: this.page, status: 1 })
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
          oil_shop_id: row.oil_shop_id,
          page: this.SmPage
        })
        if (res.data.code == 1) {
          this.ProfitList = res.data.data.list
          this.pageSmCount = res.data.data.rows;
        }
      } catch (err) {
        throw (err)
      }
    },
    /* 售出的油品详情 */
    async Oils (row) {
      try {
        let res = await this.$axios.post('admin/OilExamine/oilType', {
          token: this.token,
          id: row.oil_shop_id
        })
        if (res.data.code == 1) {
          this.SellOut_Oils = res.data.data
          console.log('res data code sellout_oils res data data')
        }
      } catch (err) {
        throw (err)
      }
    },

    /* 图片放大 */
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
    /* 关闭对话框清空数据 */
    close () {

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
.shop {
  min-height: 200px;
}
.shop > div {
  margin-bottom: 20px;
}
.sell {
  min-height: 200px;
}
.shop_image img {
  width: 60px;
  height: 60px;
  vertical-align: top;
  border: 1px solid #ccc;
  margin-right: 10px;
}
</style>

