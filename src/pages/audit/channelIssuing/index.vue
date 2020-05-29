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
        <div class="quote-ele"><i></i>审核-渠道发卡</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <el-table :data="list"
                tooltip-effect="dark">

        <el-table-column label="渠道名称"
                         align="center"
                         prop="company">

        </el-table-column>
        <el-table-column prop="num"
                         label="发卡数量"
                         align="center"></el-table-column>
        <el-table-column align="center"
                         label="地区">
          <template slot-scope="scope">
            <el-popover placement="bottom"
                        width="400"
                        trigger="click">
              <el-button type="text"
                         slot="reference">详情</el-button>
              <div class="areaDetails">
                <h4 style="text-align:center">地区详情</h4>
                <div v-if="scope.row.province">
                  <span style="loat:left;width:80%;">
                    <div v-for="(item,index) in scope.row.province"
                         :key="index"
                         class="area">
                      <p class="province"> {{item.province_name}}</p>
                      <p class="city">{{item.city_name ? item.city_name.join('、') : ''}}</p>
                    </div>
                  </span>
                </div>
                <div v-else
                     style="text-align:center;line-height:100px;font-size:18px">
                  无
                </div>
              </div>

            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
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
    <el-dialog center
               title="详情"
               :visible.sync="detailsVisible"
               width="65%">
      <el-table :data="detailsList">
        <el-table-column align="center"
                         label="用户名称"
                         prop="user_name">

        </el-table-column>

        <el-table-column align="center"
                         label="用户电话"
                         prop="phone">

        </el-table-column>
        <el-table-column align="center"
                         label="维修厂名称"
                         prop="company">

        </el-table-column>
        <el-table-column align="center"
                         label="维修厂电话"
                         prop="shop_phone">

        </el-table-column>
        <el-table-column align="center"
                         label="车辆品牌"
                         prop="car_name">

        </el-table-column>
        <el-table-column align="center"
                         label="车辆类型"
                         prop="type">

        </el-table-column>
        <el-table-column align="center"
                         label="排量"
                         prop="series">

        </el-table-column>
        <el-table-column align="center"
                         label="车牌号"
                         prop="plate">

        </el-table-column>
        <el-table-column align="center"
                         label="参与时间"
                         prop="sale_time">

        </el-table-column>
      </el-table>
      <div class="page_center">
        <paging :page-count="detailsCount"
                :page="detailsPage"
                @index="detailsPaging"></paging>
        <!--分页的组件-->
      </div>
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
      seCurId: "",
      authList: [],
      threeAuthList: [],
      detailsList: [],
      detailsVisible: false,
      detailsPage: 1,
      detailsCount: 1,
      currentData: {}
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
      this.details(this.currentData)
    },

    init () {  //渠道发卡列表
      this.$axios.post('admin/UserAudit/cardList', { token: this.token, page: this.page, })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },

    async details (item) {  //渠道发卡详情
      try {
        this.detailsVisible = true
        this.currentData = item
        const res = await this.$axios.post('admin/UserAudit/cardDetail', { token: this.token, id: item.id, page: this.detailsPage })
        this.detailsList = res.data.data.list || []
        this.detailsCount = res.data.data.rows || 0
      } catch (error) {
        throw (error)
      }
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
                if (arr[i].name == '渠道发卡') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
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
    this.init();

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
.areaDetails {
  max-height: 300px;
  min-height: 100px;
  overflow: auto;
}
.areaDetails .area {
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}
.areaDetails .province {
  font-size: 15px;
  font-weight: 600;
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
