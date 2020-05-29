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
        <div class="quote-ele"><i></i>德州旅行-出游</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <!-- <el-table :data="list"
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
      </el-table> -->
      <el-form label-width="100px"
               style="width:60%"
               :model="listQuery"
               :rules="rules"
               ref="travelForm">
        <el-form-item label="活动标题: "
                      prop="title">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入活动标题"
                    v-model="listQuery.title">
          </el-input>
        </el-form-item>
        <el-form-item label="副标题: "
                      prop="describe">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入活动副标题"
                    v-model="listQuery.describe">
          </el-input>
        </el-form-item>
        <el-form-item label="封面: "
                      prop="carousel">
          <el-upload action=""
                     list-type="picture-card"
                     :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="轮播图: "
                      prop="photo">
          <el-upload action=""
                     list-type="picture-card"
                     :limit="3">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="领队: "
                      prop="guide_ID">
          <el-select v-model="listQuery.guide_ID"></el-select>
        </el-form-item>
        <el-form-item label="会员价: "
                      prop="vip_price">

          <el-input placeholder="请输入会员价"
                    v-model="listQuery.vip_price" />

        </el-form-item>
        <el-form-item label="出行价: "
                      prop="general_price">

          <el-input placeholder="请输入出行价"
                    v-model="listQuery.general_price" />

        </el-form-item>
        <el-form-item label="出发点: "
                      required>
          <el-col :span="7">
            <el-form-item prop="Set_out_address">
              <el-input placeholder="请输入所在地区"
                        v-model="listQuery.Set_out_address" />
            </el-form-item>
          </el-col>
          <el-col class="line"
                  :span="1">-</el-col>
          <el-col :span="5">
            <el-form-item prop="Set_out_date">
              <el-date-picker type="datetime"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期时间"
                              @change="getDay"
                              v-model="listQuery.Set_out_date">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-form-item>
        <el-form-item label="旅途驿站: ">
          <el-card v-for="(item,index) in listQuery.journey_post"
                   style="margin-bottom:10px"
                   class="journeyPost"
                   :key="index">
            <div>
              <img width="80px"
                   height="80px" />
            </div>
            <div class="journey_post-content">
              <h4>{{item.name}}</h4>
              <p>{{item.date}}</p>
              <p>{{item.describe}}</p>
            </div>
            <div class="journeyPost_type">
              酒店
            </div>
          </el-card>
          <el-button type="primary"
                     style="width:30%"
                     @click="journeyPostVisible=true">添加驿站</el-button>
        </el-form-item>
        <el-form-item label="折返点: ">
          <el-button type="primary"
                     style="width:30%"
                     @click="ReentryVisible=true">添加折返点</el-button>
        </el-form-item>
        <el-form-item label="终点: "
                      required>
          <el-col :span="7">
            <el-form-item prop="end_address">
              <el-input placeholder="请输入所在地区"
                        v-model="listQuery.end_address" />
            </el-form-item>
          </el-col>
          <el-col class="line"
                  :span="1">-</el-col>
          <el-col :span="5">
            <el-form-item prop="end_date">
              <el-date-picker type="datetime"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期时间"
                              @change="getDay"
                              v-model="listQuery.end_date">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="release()">发布</el-button>
        </el-form-item>
      </el-form>

    </div>
    <!-- 添加旅途驿站 -->
    <el-dialog center
               title="添加旅途驿站"
               :visible.sync="journeyPostVisible">
      <el-form style="width:60%"
               label-width="100px"
               :model="AddJourneyList"
               :rules="AddJourneyRules">
        <el-form-item label="驿站目的: "
                      prop="type">
          <el-select v-model="AddJourneyList.type">

          </el-select>
        </el-form-item>
        <el-form-item label="驿站名称: "
                      prop="name">
          <el-input v-model="AddJourneyList.name"
                    placeholder="请输入驿站名称" />

        </el-form-item>
        <el-form-item label="设定位置: "
                      prop="address">
          <el-input placeholder="请输入所在地区"
                    v-model="AddJourneyList.address"
                    style="width:30%" /> -
          <el-date-picker v-model="AddJourneyList.date"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期时间"
                          @change="getDay">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="封面: "
                      prop="photo">
          <el-upload action=""
                     list-type="picture-card"
                     :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="驿站说明: "
                      prop="describe">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入驿站详情"
                    v-model="AddJourneyList.describe">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="addJourney()">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加折返点 -->
    <el-dialog center
               title="添加折返点"
               :visible.sync="ReentryVisible">
      <el-form style="width:60%"
               label-width="100px"
               :model="AddReentryList"
               :rules="AddReentryRules">
        <el-form-item label="驿站目的: "
                      prop="type">
          <el-select v-model="AddReentryList.type">

          </el-select>
        </el-form-item>
        <el-form-item label="驿站名称: "
                      prop="name">
          <el-input v-model="AddReentryList.name"
                    placeholder="请输入驿站名称" />

        </el-form-item>
        <el-form-item label="设定位置: "
                      prop="address">
          <el-input placeholder="请输入所在地区"
                    v-model="AddReentryList.address"
                    style="width:30%" /> -
          <el-date-picker v-model="AddReentryList.date"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期时间"
                          @change="getDay">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="封面: "
                      prop="photo">
          <el-upload action=""
                     list-type="picture-card"
                     :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="驿站说明: "
                      prop="describe">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入驿站详情"
                    v-model="AddReentryList.describe">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="addAddReentry()">确认添加</el-button>
        </el-form-item>
      </el-form>
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
      listQuery: {
        title: "",  //主标题
        describe: '', //副标题
        guide_ID: '', //领队id
        photo: [], //轮播图
        vip_price: "", //会员价
        general_price: "", //出行价
        Set_out_address: "", //出发点所在地区
        Set_out_date: "",   //出发点当前日期
        end_address: "", //终点所在地区
        end_date: "", //终点当前日期
        journey_post: [], //旅途驿站
      },
      // journey_referral: {
      //   set_out: {
      //     address: '', //所在地区
      //     date: '', //日期
      //   }, //出发点  
      //   journey_post: [],  //旅途驿站
      //   reentry: {}, //折返点
      //   end: {}, //终点
      // },

      AddSetOutList: {  //添加出发点
        date: "", //日期
        address: "", //详细地址
        time: '',//时间
      },
      AddJourneyList: {  //添加驿站
        type: '', // 驿站目的
        name: "",//驿站名称
        address: '', //所在地区
        date: "", //日期
        time: '',//时间
        photo: "", //封面图片
        describe: '', //驿站说明

      },
      AddJourneyRules: {  //添加驿站规则验证

      },
      AddReentryList: {  //添加折返点
        type: '', // 驿站目的
        name: "",//驿站名称
        address: '', //所在地区
        date: "", //日期
        time: '',//时间
        photo: "", //封面图片
        describe: '', //驿站说明

      },
      AddReentryRules: { //添加折返点规则验证

      },
      AddEndList: {  //终点
        date: "", //日期
        address: "", //详细地址
        time: '',//时间
      },
      journeyPostVisible: false, //是否显示添加旅途驿站弹框
      ReentryVisible: false, //是否显示添加折返点弹框
      rules: {
        title: { required: true, message: '请输入主标题', trigger: 'blur' },
        describe: { required: true, message: '请输入副标题', trigger: 'blur' },
        carousel: { required: true, message: '请上传封面', trigger: 'blur' },
        photo: { required: true, message: '请上传轮播图', trigger: 'blur' },
        guide_ID: { required: true, message: '请选择领导', trigger: 'blur' },
        vip_price: { required: true, message: '请输入会员价', trigger: 'blur' },
        general_price: { required: true, message: '请输入出行价', trigger: 'blur' },
        Set_out_address: { required: true, message: '请输入出发点所在地区', trigger: 'blur' },
        Set_out_date: { required: true, message: '请选择出发点日期', trigger: 'blur' },
        end_address: { required: true, message: '请输入终点所在地区', trigger: 'blur' },
        end_date: { required: true, message: '请选择终点日期', trigger: 'blur' },
      }
    }
  },

  computed: {
    newListQuery () {    //重构数据
      const listQuery = this.listQuery
      let newListQuery = {
        title: listQuery.title,  //主标题
        describe: listQuery.describe, //副标题
        guide_ID: listQuery.guide_ID, //领队id
        photo: listQuery.photo, //轮播图
        vip_price: listQuery.vip_price, //会员价
        general_price: listQuery.general_price, //出行价
        journey_referral: {
          set_out: {   //出发点
            address: listQuery.Set_out_address,  //出发点所在地区
            date: listQuery.Set_out_date  //出发点当前日期
          },
          journey_post: listQuery.journey_post,  //旅途驿站
          end: {  //终点
            address: listQuery.end_address,  //终点所在地区
            date: listQuery.end_date  //终点当前日期
          }
        }

      }
      console.log(newListQuery)
      return 1
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
    getDay (val) {

      //   let regEx = new RegExp("\\-", "gi");

      //   let milliseconds = Date.parse(val.replace(regEx, '/'))
      //   console.log(new Date(milliseconds).getDay())


    },
    //添加旅途驿站
    addJourney () {

      this.listQuery.journey_post.push(Object.assign({}, this.AddJourneyList))
      console.log(this.listQuery.journey_post)
    },
    //添加折返点
    addAddReentry () {

    },
    //发布
    release () {
      const data = this.newListQuery
      console.log(data)
      //   this.$refs.travelForm.validate(valid => {
      //     if (valid) {
      //       console.log('准备发布')
      //     }
      //   })
      //   this.$refs.travelForm.resetFields()
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
                if (arr[i].name == '出行') {
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
.line {
  text-align: center;
}
.journeyPost {
  position: relative;
}
.journeyPost > .el-card__body > div {
  float: left;
  margin-right: 10px;
}
.journey_post-content {
  line-height: 20px;
}
.journeyPost_type {
  position: absolute;
  top: 0;
  right: -10px;
  background: #4883f1;
  width: 40px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  color: white;
}
</style>
