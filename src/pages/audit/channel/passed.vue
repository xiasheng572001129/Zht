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
        <div class="quote-ele">
          <i></i>
          审核-免费保养-已审核
          <el-button type="primary"
                     @click="Export()"
                     style="float:right;margin-right:50px;margin-top:20px">导出</el-button>
        </div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <div style="margin:0 20px">
        <!-- <el-input placeholder="请输入维修厂"
                  v-model="ListQuery.company"
                  class="input-with-select search">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="page=1,init()"></el-button>
        </el-input> -->
        <el-select style="margin-right:10px"
                   v-model="ListQuery.ucp_company"
                   placeholder="请选择保险公司"
                   @change="page=1,init()">
          <el-option v-for="(item,index) in companyList"
                     :key="index"
                     :label="item.company"
                     :value="item.id"></el-option>
        </el-select>
        <el-date-picker v-model="pickerSearch"
                        type="daterange"
                        style="width:24%;margin-right:10px"
                        @change="page=1,init()"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        省:
        <el-select v-model="ListQuery.search['province']"
                   placeholder="请选择省"
                   class="region"
                   @change="getCity">
          <el-option v-for="item in provincelist"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        市:
        <el-select v-model="ListQuery.search['city']"
                   placeholder="请选择市"
                   class="region"
                   @change="getCounty">
          <el-option v-for="item in citylist"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        区/县:
        <el-select v-model="ListQuery.county"
                   placeholder="请选择区/县"
                   @change="changeCounty"
                   class="region">
          <el-option v-for="item in countyList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        <!-- <el-button type="primary"
                   class="printRight"
                   @click="print">下载</el-button> -->
      </div>
      <el-table :data="list"
                tooltip-effect="dark">
        <!-- <el-table-column type="selection"
                         width="55">
        </el-table-column> -->
        <!-- <el-table-column label="福利"
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
        </el-table-column> -->
        <el-table-column prop="ucp_company"
                         label="保险公司名称"
                         align="center"></el-table-column>
        <el-table-column prop="company"
                         label="维修厂名称"
                         align="center"></el-table-column>
        <!-- <el-table-column prop="phone"
                         label="联系电话"
                         align="center"></el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center"></el-table-column> -->
        <el-table-column label="地区"
                         align="center">

          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title="地区详情"
                        width="200"
                        trigger="hover"
                        :content="`${scope.row.province}${scope.row.city}${scope.row.county}`">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{`${scope.row.province}${scope.row.city}${scope.row.county}`}}</el-button>
            </el-popover>
          </template>

        </el-table-column>

        <el-table-column label="审核数量"
                         align="center"
                         prop="num">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="details(scope.row)">详情</el-button>

          </template>

        </el-table-column>
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
               :visible.sync="detailsVisible"
               width="80%"
               @close='detailsPage=1,detailsCount=1'>
      <el-table :data="detailsList"
                class="detailsTable">
        <el-table-column align="center"
                         label="施工照片">
          <template slot-scope="scope">
            <div>
              <img v-for="(item,index) in scope.row.oil_photo"
                   :key="index"
                   :src="item"
                   width="50px"
                   height="50px"
                   ref="oil_photo" />
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center"
                         prop="ucp_company"
                         label="保险公司名称">

        </el-table-column>
        <el-table-column align="center"
                         prop="name"
                         label="车辆名称">

        </el-table-column>
        <el-table-column align="center"
                         prop="type"
                         label="车辆类型">

        </el-table-column>
        <el-table-column align="center"
                         prop="series"
                         label="车排量">

        </el-table-column> -->
        <el-table-column align="center"
                         prop="plate"
                         label="车牌号">

        </el-table-column>
        <el-table-column align="center"
                         prop="rankers"
                         label="类型">
        </el-table-column>
        <el-table-column align="center"
                         label="老兵姓名">
          <template slot-scope="scope">
            {{scope.row.ranker==6 ? scope.row.old_name : '无'}}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center"
                         prop="vin"
                         label="vin码">

        </el-table-column>
        <el-table-column align="center"
                         prop="policy_num"
                         label="保单号">
          <template slot-scope="scope">
            {{scope.row.policy_num || '无'}}
          </template>
        </el-table-column> -->
        <el-table-column align="center"
                         prop=""
                         label="保单图片/优待证">
          <template slot-scope="scope">

            <el-button type="text"
                       v-if="scope.row.pc_img && scope.row.pc_img.length>0"
                       @click="pcImgVisible=true,imgList=scope.row.pc_img,imgDetails()">详情</el-button>
            <span v-else>无</span>

          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="领取类型"
                         prop="electronic_type">

        </el-table-column>
        <el-table-column align="center"
                         label="申请时间"
                         prop="sale_time">

        </el-table-column>
        <el-table-column align="center"
                         prop="review_time"
                         label="审核时间">
          <template slot-scope="scope">
            {{scope.row.review_time | datetime}}
          </template>
        </el-table-column>

      </el-table>

      <div class="page_center">
        <paging :page-count="detailsCount"
                :page="detailsPage"
                @index="detailsPaging"></paging>
        <!--分页的组件-->
      </div>
      <el-dialog center
                 title="保单图片"
                 :visible.sync="pcImgVisible"
                 append-to-body
                 width="25%">
        <div>

          <img v-for="(item,index) in imgList"
               style="width:100px;height:100px;margin-right:20px"
               :key='index'
               :src="item"
               ref="img" />
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
import { getPro } from '@/utils'
import region from '@/components/common'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      thCurId: '',
      authList: [],
      threeAuthList: [],
      detailsVisible: false,
      pcImgVisible: false,
      multipleData: [],
      detailsList: [],
      detailsPage: 1,
      detailsCount: 1,
      currentDetails: {},
      ListQuery: {
        company: '',
        ucp_company: '',
        start_time: '',
        end_time: '',
        city: '',
        county: '',
        search: []
      },
      pickerSearch: "",
      provincelist: [],
      citylist: [],
      countyList: [],
      companyList: [], //保险公司列表
      imgList: []
    }
  },
  created () {
    this.init();
  },
  watch: {
    pickerSearch (val) {   //获取日期
      if (val) {
        this.ListQuery.start_time = val[0]
        this.ListQuery.end_time = val[1]
      } else {
        this.ListQuery.start_time = ''
        this.ListQuery.end_time = ''
      }
    }
  },
  methods: {
    GetCity: region.getCity,
    GetCounty: region.getCounty,
    paging (e) {
      this.page = e;
      this.init()
    },
    detailsPaging (e) {
      this.detailsPage = e;
      this.details(this.currentDetails)
    },
    init () {
      this.$axios.post('admin/UserAudit/channelList', Object.assign(this.ListQuery, { token: this.token, page: this.page, status: 1, pay_status: 1, review: 2 }))
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },
    //获取保险公司
    async getCompany () {
      try {
        const res = await this.$axios.post('admin/UserAudit/policyCompany', { token: this.token, type_channel: 1 })
        this.companyList = res.data.data || []
      } catch (error) {
        throw (error)
      }
    },
    //获取全部省
    async getProvince () {
      try {
        const res = await getPro();
        this.provincelist = res;
      } catch (error) {
        throw (error)
      }
    },
    //获取市
    getCity (id) {
      this.page = 1
      this.ListQuery.search['province'] = this.query(this.provincelist, id)
      this.ListQuery.search['city'] = ''  //清空上一次所选的市
      this.ListQuery.county = ''  //清空上一次所选的区/县
      this.ListQuery.search['county_id'] = ''  //清空上一次所选的区/县id
      this.GetCity(id).then(res => {
        this.citylist = res
      })
      this.init()
    },
    //获取 区/县
    getCounty (id) {
      this.page = 1
      this.ListQuery.search['city'] = this.query(this.citylist, id)
      this.ListQuery.county = '' //清空上一次所选的区/县
      this.ListQuery.search['county_id'] = '' //清空上一次所选的区/县id
      this.GetCounty(id).then(res => {
        this.countyList = res
      })
      this.init()
    },
    changeCounty (id) {
      this.page = 1
      this.ListQuery.search['county_id'] = id
      this.init()
    },
    //通过 id 查询
    query (array, id) {  //array 查询的数组  id 通过当前id查询array数组的数据
      console.log(array)
      let newArray = array.filter(item => {
        return item.id == id
      })
      return newArray[0].name
    },
    async details (row) {  //详情
      this.detailsVisible = true
      this.currentDetails = row
      try {
        const res = await this.$axios.post("admin/UserAudit/detail", { token: this.token, sid: row.id, policy_id: row.policy_id, status: row.status, page: this.detailsPage })
        this.detailsList = res.data.data.list || [];
        this.detailsCount = res.data.data.rows;
        this.$nextTick(() => {  //施工图放大
          if (this.$refs.oil_photo && this.$refs.oil_photo.length > 0) {
            Viewer(this.$refs.oil_photo)
          }
        })

      } catch (error) {
        throw (error)
      }

    },

    Export () {  //导出
      window.location.href = `${this.baseURL}admin/Login/freeMain?ucp_company=${this.ListQuery.ucp_company}&search["province"]=${this.ListQuery.search['province']}&search["city"]=${this.ListQuery.search['city']}&search["county_id"]=${this.ListQuery.county}`
    },
    // handleSelectionChange (val) {  //全选/单选
    //   let tmp = []
    //   val.forEach(el => {
    //     tmp.push({ ucp_id: el.ucp_id, uc_id: el.uc_id, user_type: el.user_type })
    //   });

    //   this.multipleData = tmp
    // },
    imgDetails () {  //保单图片详情
      this.$nextTick(() => {
        console.log(this.$refs)
        const img = this.$refs.img
        Viewer(img)
      })
    },


    Auth () {
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
                if (arr[i].name == '免费保养') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '已审核' && arr[i].name == '免费保养') {
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
    }
  },
  mounted () {
    this.Auth()
    this.getProvince()
    this.getCompany()

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
  width: 15%;
  margin-right: 10px;
}
.region {
  width: 10%;
  margin: 0 10px;
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
