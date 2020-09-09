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
        <div class="quote-ele"><i></i>德州旅行-活动列表-已驳回</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>

      <el-table :data="list">
        <el-table-column label="封面"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.carousel"
                 width="100px"
                 height="50px"
                 style=" vertical-align:middle;" />
          </template>
        </el-table-column>
        <el-table-column label="上传人"
                         align="center"
                         prop="user_name">

        </el-table-column>
        <el-table-column label="上传人电话"
                         align="center"
                         prop="user_phone">

        </el-table-column>
        <el-table-column label="活动类型"
                         align="center"
                         prop="cate_name">

        </el-table-column>
        <el-table-column label="领队名称"
                         align="center"
                         prop="guide_name">
          <template slot-scope="scope">
            {{scope.row.guide_name ? scope.row.guide_name : '无'}}
          </template>
        </el-table-column>

        <el-table-column label="标题"
                         align="center">

          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title=""
                        width="200"
                        trigger="hover"
                        :content="scope.row.title">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{scope.row.title}}</el-button>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column label="出行价"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.general_price}}元
          </template>
        </el-table-column>
        <el-table-column label="会员价"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.vip_price}}元
          </template>
        </el-table-column>
        <el-table-column label="驳回理由"
                         align="center">

          <template slot-scope="scope">
            <el-popover placement="top-start"
                        title=""
                        width="200"
                        trigger="hover"
                        :content="scope.row.reason">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{scope.row.reason}}</el-button>
            </el-popover>
          </template>

        </el-table-column>
        <el-table-column label="申请时间"
                         align="center"
                         prop="create_time">

        </el-table-column>

        <el-table-column label="驳回时间"
                         align="center"
                         prop="audit_time">
          <template slot-scope="scope">
            {{scope.row.audit_time | datetime }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">

            <el-button type="info"
                       size="mini"
                       @click="details(scope.row)">详情</el-button>
          </template>

        </el-table-column>

      </el-table>

      <!-- 分页 -->
      <div class="page_center"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>
    <!-- 德州旅行列表详情 -->
    <el-dialog title="详情"
               center
               :visible.sync="detailsVisible">
      <div v-if="detailsList">
        <el-form label-width="100px">
          <el-form-item label="轮播图 : "
                        v-if='detailsList.photo'>
            <img v-for="(item,index) in detailsList.photo"
                 :key="index"
                 style="vertical-align: middle;margin-right:10px"
                 width="100px"
                 height="50px"
                 :src="item" />
          </el-form-item>
          <el-form-item label="标题 : ">
            {{detailsList.title}}
          </el-form-item>
          <el-form-item label="描述 : ">
            {{detailsList.describe}}
          </el-form-item>
          <el-form-item label="价格说明 : ">
            <span>￥</span>
            <span>{{detailsList.vip_price}}</span>
            <span>会员价/人</span>
            <span> | </span>
            <span style="text-decoration:line-through">{{detailsList.general_price}} 出行价/人</span>
          </el-form-item>
          <el-form-item label="领队姓名 : ">
            {{detailsList.guide_name ? detailsList.guide_name : '无'}}
          </el-form-item>
          <el-form-item label="行程介绍 : ">
            <el-timeline v-if="detailsList.mold_ID==6">
              <el-timeline-item :timestamp="detailsList.journey_referral && detailsList.journey_referral.set_out ? `${detailsList.journey_referral.set_out.date} ${detailsList.journey_referral.set_out.week} ${detailsList.journey_referral.set_out.time}` : ''">
                <h2 style="color:#09B91E">出发点</h2>
                <div v-if="detailsList.journey_referral && detailsList.journey_referral.set_out">
                  <div>{{detailsList.journey_referral.set_out.address}}</div>
                </div>

              </el-timeline-item>
              <h2 style="color:#000000;padding:0 0 10px 25px;border-left:2px solid #E4E7ED;margin-left:4px">旅途驿站</h2>
              <el-timeline-item v-for="(item,index) in journeyPost"
                                :key="index"
                                :timestamp="`${item.date} ${item.week}`"
                                placement="top">

                <el-card v-for="(it,i) in item.describe"
                         style="margin-bottom:10px"
                         :key="i"
                         class="item-card">
                  <div>
                    <img width="100px"
                         :src="it.photo" />
                  </div>
                  <div>
                    <div>{{it.name}}</div>
                    <div>{{it.time}}</div>
                    <div v-html="it.describe">{{it.describe}}</div>
                  </div>
                  <div class="card-type">
                    {{it.type}}
                  </div>
                </el-card>
              </el-timeline-item>
              <h2 style="color:#000000;padding:0 0 10px 25px;border-left:2px solid #E4E7ED;margin-left:4px">折返点</h2>
              <el-timeline-item v-for="(reentry,reentryIndex) in detailsList.journey_referral.reentry"
                                :key="`index${reentryIndex}`"
                                :timestamp="`${reentry.date} ${reentry.week}`"
                                placement="top">
                <el-card v-for="(item,index) in reentry.describe"
                         :key="index"
                         style="margin-bottom:10px"
                         class="item-card">
                  <div>
                    <img width="100px"
                         :src="item.photo" />
                  </div>
                  <div>
                    <div>{{item.name}}</div>
                    <div>{{item.time}}</div>
                    <div v-html="item.describe">{{item.describe}}</div>
                  </div>
                  <div class="card-type">
                    {{item.type}}
                  </div>
                </el-card>
              </el-timeline-item>
              <h2 style="color:#FE4D48;padding:0 0 10px 25px;border-left:2px solid #E4E7ED;margin-left:4px">终点</h2>
              <el-timeline-item :timestamp="detailsList.journey_referral && detailsList.journey_referral.end ? `${detailsList.journey_referral.end.date} ${detailsList.journey_referral.end.week} ${detailsList.journey_referral.end.time}` : ''">

                <div v-if="detailsList.journey_referral && detailsList.journey_referral.end">
                  <div>{{detailsList.journey_referral.end.address}}</div>
                </div>

              </el-timeline-item>
            </el-timeline>
            <div v-else
                 v-html="detailsList.journey_referral">
            </div>
          </el-form-item>
          <el-form-item v-if="detailsList.cate_name=='出游活动'"
                        label="费用介绍 : ">
            <div>
              <p>
                <span>邦保养会员价</span>
                <span>{{detailsList.vip_price}}元/人</span>
              </p>
              <p>
                <span>出行价</span>
                <span>{{detailsList.general_price}}元/人</span>
              </p>
              <p>该价格为单人价格，最终价格以实际人数计算</p>
            </div>
            <div>
              <h3>报价包含</h3>
              <p v-for="(item,index) in detailsList.in_quote"
                 :key="index">
                {{`${index + 1}、${item}`}}
              </p>
            </div>
            <div>
              <h3>报价不包含</h3>
              <p v-for="(item,index) in detailsList.un_quote"
                 :key="index">
                {{`${index + 1}、${item}`}}
              </p>
            </div>
            <div>
              <h3>优惠</h3>
              <p>
                {{detailsList.favourable}}
              </p>
            </div>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">

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
      detailsVisible: false, //详情列表是否显示
      detailsList: {}, //详情列表
      journeyPost: [],  //旅途驿站列表
      reentry_content: [], //折返点内容
    }
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },

    init () {
      this.$axios.post('admin/DeTravel/travelExamine', { token: this.token, page: this.page, status: 2 })
        .then(res => {
          this.list = res.data.data.list;
          this.pageCount = res.data.data.rows;
        }).catch(err => { })
    },


    //德州旅行列表详情
    async details (item) {
      try {
        this.detailsVisible = true
        const res = await this.$axios.post('admin/DeTravel/travelDetail', { token: this.token, id: item.id })
        this.detailsList = res.data.data || {}
        this.journeyPost = res.data.data && res.data.data.journey_referral && res.data.data.journey_referral.journey_post ? res.data.data.journey_referral.journey_post : []
        this.reentry_content = res.data.data && res.data.data.journey_referral && res.data.data.journey_referral.reentry && res.data.data.journey_referral.reentry.describe && res.data.data.journey_referral.reentry.describe.length > 0 ? res.data.data.journey_referral.reentry.describe : []
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
                if (arr[i].name == '活动列表') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '已驳回' && arr[i].name == '活动列表') {
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
    this.init()
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
.item-card {
  position: relative;
}
.el-card__body > div {
  float: left;
  margin: 0px 10px;
}
.el-card__body > div > div {
  line-height: 20px;
}

.el-card__body > div > img {
  height: 100%;
}
.card-type {
  position: absolute;
  top: 0;
  right: 0;
  background: #4883f1;
  margin: 0 !important;
  color: white;
  width: 40px;
  height: 14px;
  line-height: 14px;
  text-align: center;
}
</style>
