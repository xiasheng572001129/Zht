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
        <div class="quote-ele"><i></i>小程序-红包记录</div>
      </div>
      <div class="search">
        省：<el-select v-model="provinceId"
                   @change="provinceChange">
          <el-option v-for="(item,index) in provinceList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
        市：<el-select v-model="city_id"
                   @change="init">
          <el-option v-for="(item,index) in cityList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
        <el-date-picker v-model="date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="dateChange">
        </el-date-picker>
      </div>
      <el-table :data="list">
        <el-table-column align="center"
                         label="订单号"
                         prop="trade_no"></el-table-column>
        <el-table-column align="center"
                         label="用户姓名"
                         prop="name"></el-table-column>

        <el-table-column align="center"
                         label="红包金额"
                         prop="money">

        </el-table-column>

        <el-table-column align="center"
                         label="地区"
                         prop="number">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="`${scope.row.province}${scope.row.city}`">
              <el-button slot="reference"
                         type="text"
                         class="ellipsis">{{`${scope.row.province}${scope.row.city}`}}</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="领取时间"
                         prop="create_time">

        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分享记录详情 -->
      <el-dialog center
                 :visible.sync='ShareRecord.visible'
                 title="分享记录">
        <el-table :data="ShareRecord.detailsList">
          <el-table-column align="center"
                           label="姓名"
                           prop="name"></el-table-column>
          <el-table-column align="center"
                           label="车牌号"
                           prop="name">
            <template slot-scope="scope">
              {{scope.row.plate || '无'}}
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="购买类型"
                           prop="name">
            <template slot-scope="scope">
              {{scope.row.plate ? '邦保养' : '99元会员'}}
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="金额"
                           prop="money"></el-table-column>
          <el-table-column align="center"
                           label="参与时间"
                           prop="create_time"></el-table-column>
        </el-table>

      </el-dialog>
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
//  import page from '../common.js';
import Viewer from '@/utils/Viewer'
import { getPro, GET_City, datetime } from '@/utils'
export default {
  data () {
    return {
      authList: [],
      threeAuthList: [],
      token: window.sessionStorage.getItem('bbytoken'),
      seCurId: 0,
      page: 0,
      pageCount: 0,
      list: [],
      provinceList: [], //省列表
      provinceId: '', //当前选中的省id
      cityList: [], //市列表
      city_id: '', //当前选中的市id
      date: '',
      start_time: '',  //开始时间
      end_time: '',  //结束时间 
      ShareRecord: {  //分享记录
        visible: false,
        detailsList: [],//分享记录详情列表
      },

    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/UserRedPacket/index', { token: this.token, page: this.page, city_id: this.city_id, start_time: this.start_time, end_time: this.end_time })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0;
      } catch (err) {
        throw (err)
      }
    },
    async getPro () {  //获取省
      try {
        const res = await getPro()
        this.provinceList = res || []
      } catch (error) {
        throw (error)
      }
    },
    async provinceChange (e) {  //获取市
      try {
        const res = await GET_City(e)
        this.cityList = res || []
        this.city_id = ''
      } catch (error) {
        throw (error)
      }
    },
    dateChange (date) {  //当前选择的日期
      this.start_time = date && datetime(date[0])  //开始时间
      this.end_time = date && datetime(date[1])  //结束时间
      this.init()
    },
    async details (item) {  //分享记录详情
      try {
        this.ShareRecord.visible = true
        const res = await this.$axios.post('admin/UserRedPacket/buyDetail', { token: this.token, uid: item.uid, day_time: item.day_time })
        this.ShareRecord.detailsList = res.data.data || []
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
    },
    erAuth () {  //权限列表
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: this.token,
        id: id
      })
        .then(res => {
          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].name == '红包记录') {
                this.seCurId = arr[i].id;
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
    }
  },

  mounted () {
    this.init()
    this.getPro()
    this.erAuth()
  },

}
</script>
<style scoped>
.ellipsis {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  text-align: center;
}
.search {
  padding-left: 50px;
}
</style>
