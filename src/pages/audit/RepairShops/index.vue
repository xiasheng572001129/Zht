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
        <div class="quote-ele"><i></i>审核-维修厂审核</div>
        <div class="quote-nav">
          <!-- <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link> -->
        </div>
      </div>
      <el-table :data="list">
        <el-table-column label="支付凭证"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="check(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="维修厂名称"
                         align="center"
                         prop="company">

        </el-table-column>
        <el-table-column label="负责人"
                         prop="leader"
                         align="center">

        </el-table-column>
        <el-table-column label="联系电话"
                         prop="phone"
                         align="center">

        </el-table-column>
        <el-table-column label="店铺类型"
                         prop="shop_type"
                         align="center">
        </el-table-column>
        <el-table-column label="申请时间"
                         prop="create_time"
                         align="center">

        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="detailsVisible=true,details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情"
                 center
                 :visible.sync="detailsVisible"
                 @close='()=>{
                   smid = ""
                 }'>
        <div v-if='detailsList'
             class="details">
          <div>
            <span>主修 : </span>
            <span>{{detailsList.major}}</span>
          </div>
          <div>
            <span>详细地址 : </span>
            <span>{{`${detailsList.province}${detailsList.city}${detailsList.county}${detailsList.address}`}}</span>
          </div>
          <div>
            <span>关于 : </span>
            <span>{{detailsList.about}}</span>
          </div>

          <div>
            <span>营业执照 : </span>
            <span>
              <img :src="detailsList.license"
                   ref="img">
            </span>
          </div>
          <div>
            <span>店铺照片 : </span>
            <span>
              <img v-for="(item,index) in detailsList.photo"
                   :key="index"
                   :src="item"
                   ref="imgage">
            </span>
          </div>
          <!-- <div>
            <span>请选择运营商 : </span>
            <span>
              <el-select v-model="aid"
                         :disabled="supplyID!=''">
                <el-option :value="''"
                           label="请选择运营商"></el-option>
                <el-option v-for='(item,index) in agentList'
                           :key="index"
                           :label="`${item.leader} ( ${item.open_stock} )`"
                           :value="item.aid"></el-option>
              </el-select>
            </span>
          </div> -->
          <div v-show='detailsList.aid>1'>
            <span>配送中心 : </span>
            <span>
              {{detailsList.acompany}}
            </span>
          </div>
          <div>
            <span>请选择供应商 : </span>
            <span>
              <el-select v-model="smid"
                         :disabled="detailsList.aid>1">

                <el-option v-for='(item,index) in supplyList'
                           :key="index"
                           :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </span>
          </div>
          <div>
            <span></span>
            <span>
              <el-button type="primary"
                         @click="through">通过</el-button>
            </span>
          </div>
        </div>

      </el-dialog>
      <el-dialog title="支付凭证"
                 center
                 :visible.sync="credentialVisible"
                 width="20%">
        <div style="text-align:center">
          <img :src="credentialImg"
               ref="credentialImg"
               width="90%"
               height="300px"
               style="border:1px solid #ccc;padding:10px" />
        </div>
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
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      //分页数据
      token: window.sessionStorage.getItem('bbytoken'),
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      authList: [],
      page: 1,
      pageCount: 0,
      list: [],
      detailsVisible: false,
      detailsList: {},
      agentList: [],
      supplyList: [],
      aid: '',
      sid: '',
      smid: '', //供应商id
      credentialVisible: false,
      credentialImg: ''
    }
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('/admin/ShopAudit/shopAuditList', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },
    //维修厂详情
    async details (row) {
      try {
        this.sid = row.id
        const detailsList = this.$axios.post('admin/ShopAudit/getShopDetail', { token: this.token, sid: row.id })
        const agentList = this.$axios.post('admin/ShopAudit/agentList', { token: this.token })
        const supplyList = this.$axios.post('admin/ShopAudit/smList', { token: this.token, id: row.id })
        const [ResdetailsList, ResagentList, resSupplyList] = await Promise.all([detailsList, agentList, supplyList])
        this.detailsList = ResdetailsList.data.data || {}

        this.agentList = ResagentList.data.data || []
        this.supplyList = resSupplyList.data.data || []
        this.smid = resSupplyList.data.data && resSupplyList.data.data[0].id
        this.$nextTick(() => {
          const ViewerDom = [...this.$refs.imgage, this.$refs.img]
          Viewer(ViewerDom)
        })
      } catch (err) {
        throw (err)
      }
    },
    check (item) {  //查看支付凭证
      this.credentialVisible = true
      this.$nextTick(() => {
        this.credentialImg = item.credential
        const ViewerDom = this.$refs.credentialImg
        Viewer(ViewerDom)
      })
    },
    //通过审核
    async through () {
      try {


        const res = await this.$axios.post('admin/ShopAudit/passShop', { token: this.token, sid: this.sid, smid: this.smid })
        if (res.data.code == 1) {
          this.detailsVisible = false
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }


      } catch (err) {
        throw (err)
      }
    },
    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      }).then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            console.log(arr)
            if (arr[i].son) {
              if (arr[i].name == '维修厂审核') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
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
    }

  },
  mounted () {
    this.init()
    this.erAuth()
  },


}
</script>
<style scoped>
.details > div {
  padding: 5px 0;
}
.details > div > span:first-child {
  display: inline-block;
  width: 95px;
  text-align: right;
  margin-right: 10px;
}
.details > div > span > img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>