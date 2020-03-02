<template>
  <div>
    <ctbHead>
      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}">{{item.name}}
      </router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>维修厂列表</div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>维修厂</th>
            <th>联系电话</th>
            <th>负责人</th>
            <th>售卡数量</th>
            <th>账户余额</th>
            <th>技师数量</th>
            <th>邦保养次数</th>
            <th>推荐人</th>
            <th>设置供应商</th>
            <th>详情</th>
            <th>操作</th>
            <th>维修厂类型</th>
            <th>服务押金</th>
            <th>是否有服务车</th>
            <th>服务车补贴</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td class="t-l">{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>
              <el-button @click="lookCardNum(item.id)"
                         type="text">{{item.card_sale_num}}</el-button>
            </td>
            <td>{{item.balance}}</td>
            <td>
              <a href="javascript:;"
                 @click="tech(item.id)">{{item.tech_num}}</a>
            </td>
            <td>
              <el-button @click="lookbangNum(item.id)"
                         type="text">{{item.service_num}}</el-button>
            </td>
            <td>
              <a href="javascript:;"
                 @click="reg.id=item.id,refereesDetails(item)">
                {{item.share_person==2 ? '设置推荐人' : '查看推荐人'}}
              </a>
            </td>
            <td><a href="javascript:;"
                 @click="isShowSupplier=true,sid=item.id,handleSupplier(item.id)">设置</a></td>
            <td>
              <router-link :to="{name:'shoplist_listDetail',query:{id:item.id}}">查看</router-link>
            </td>
            <td>
              <a href="javascript:;"
                 @click="close(item.id)">临时关停</a>
            </td>
            <td>
              {{item.shop_type ==1 ? '智能连锁店' : '主题活动店'}}
            </td>
            <td>{{item.fee || '无'}}</td>
            <td>
              <el-switch v-model="item.serve_car"
                         v-if='item.shop_type==1'
                         :active-value='1'
                         :inactive-value='0'
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         @change='switchChange(item.serve_car,item.id)'>
              </el-switch>
              <span v-else>--</span>
            </td>
            <td>

              <el-input style="width:100px;"
                        v-if='item.serve_car && item.shop_type==1'
                        v-model="item.serve_fee"
                        placeholder="请输入补贴"
                        @blur="SetupSubsidy(item)" />
              <div v-else>--</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <el-pagination background
                       @prev-click="prev"
                       @next-click="next"
                       @current-change="current"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
    <div class="laybox bot"
         style="display:none">
      <p>
        <span>关停理由：</span>
        <textarea name="reason"
                  v-model="reason"></textarea>
      </p>
      <button class='reject'
              @click="cancel">取消</button>
      <button class='pass'
              @click='pass'>确认</button>
    </div>
    <div class="laybox1"
         style="display: none">
      <table class="table">
        <thead>
          <tr>
            <th>技师名称</th>
            <th>技师电话</th>
            <th>从业时间</th>
            <th>主修</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listtech"
              :key='item.id'>
            <td class="t-l">{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.server}}</td>
            <td>{{item.skill}}</td>
          </tr>
        </tbody>
      </table>
      <div class="page-nav">
        <el-pagination background
                       @prev-click="prev1"
                       @next-click="next1"
                       @current-change="current1"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="pageCount1">
        </el-pagination>
      </div>
    </div>
    <div class="laybox2"
         style="display: none">
      <table class="table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>用户姓名</th>
            <th>用户电话</th>
            <th>油品名称</th>
            <th>服务费</th>
            <th>服务时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bangNumArr"
              :key="item.id">
            <td>{{item.odd_number}}</td>
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.oil}}</td>
            <td>{{item.total}}</td>
            <td>{{item.create_time}}</td>
          </tr>
        </tbody>
      </table>
      <div class="page-nav">
        <el-pagination background
                       @prev-click="prev2"
                       @next-click="next2"
                       @current-change="current2"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="pageCount2">
        </el-pagination>
      </div>
    </div>
    <div class="laybox3"
         style="display: none">
      <table class="table">
        <thead>
          <tr>
            <th>车主姓名</th>
            <th>车主电话</th>
            <th>邦保养卡号</th>
            <th>车牌号</th>
            <th>卡类型</th>
            <th>售卡金额</th>
            <th>售卡时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bangCardArr"
              :key="item.id">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.card_number}}</td>
            <td>{{item.plate}}</td>
            <td>{{item.card_type}}</td>
            <td>{{item.card_price}}</td>
            <td>{{item.sale_time}}</td>
          </tr>
        </tbody>
      </table>
      <div class="page-nav">
        <el-pagination background
                       @prev-click="prev3"
                       @next-click="next3"
                       @current-change="current3"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="pageCount3">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="设置"
               :visible.sync="SetupsDialogVisible"
               width="800px"
               @close='SetupsClose'
               center>
      <div style="margin:20px 0">
        <p>
          <el-input placeholder="请输入推荐码"
                    v-model="promo_code"
                    class="input-with-select">
            <el-button slot="append"
                       @click="search">
              搜索
            </el-button>
          </el-input>
        </p>
        <div class="details"
             v-if="details">
          <p>
            <span>姓名 : </span>
            <span>{{details.name}}</span>
          </p>
          <p>
            <span>电话 : </span>
            <span>{{details.phone}}</span>
          </p>
          <p>
            <span>车牌号 : </span>
            <span>{{details.u_plate}}</span>
          </p>
          <p>
            <span>省市 : </span>
            <span v-if='details.address'>{{details.address}}</span>
            <span v-else>
              <el-select v-model="reg.province"
                         @change="getCity"
                         placeholder="请选择省">
                <el-option v-for="item in provincelist"
                           :key="item.id"
                           :label="item.name"
                           :value="item.name">
                </el-option>
              </el-select>
              <el-select v-model="reg.city"
                         @change="getarea"
                         placeholder="请选择市">
                <el-option v-for="item in citylist"
                           :key="item.id"
                           :label="item.name"
                           :value="item.name">
                </el-option>
              </el-select>
            </span>
          </p>
          <p>
            <span>职业 : </span>
            <span v-if="details.occupation">{{details.occupation}}</span>
            <span v-else>
              <el-input style="width:80%"
                        v-model="reg.occupation"
                        placeholder="请输入职业" />
            </span>
          </p>
          <p>
            <span>奖励金 : </span>

            <span>
              <el-input style="width:80%"
                        v-model="reg.money"
                        placeholder="请输入奖励金" />
            </span>
          </p>
          <span class="Setup">
            <el-button type="primary"
                       @click="centerDialogVisible = false,Setup()">
              设置
            </el-button>
          </span>
        </div>
      </div>

    </el-dialog>
    <el-dialog title="查看"
               :visible.sync="ToviewDialogVisible"
               width="800px"
               @close='SetupsClose'
               center>
      <div>
        <div class="details">
          <p>
            <span>姓名 : </span>
            <span>{{detail.name}}</span>
          </p>
          <p>
            <span>电话 : </span>
            <span>{{detail.phone}}</span>
          </p>
          <p>
            <span>车牌号 : </span>
            <span>{{detail.u_plate}}</span>
          </p>
          <p>
            <span>省市 : </span>
            <span>{{detail.address}}</span>
          </p>
          <p>
            <span>职业 : </span>
            <span>{{detail.occupation}}</span>
          </p>
          <p>
            <span>奖励金 : </span>
            <span>{{detail.money}}</span>
          </p>
        </div>
      </div>
      <!-- 设置供应商弹框 -->
    </el-dialog>
    <el-dialog title="设置供应商"
               :visible.sync="isShowSupplier"
               width="30%"
               @close='SetupsClose'
               center
               custom-class="supplierStyle">
      <el-radio-group v-model="chooseSupplier">
        <el-radio :label="supplierItem.mo=='a'?'a':supplierItem.id"
                  v-for='(supplierItem, index) in supplierList'
                  :key="index">{{supplierItem.name}}</el-radio>
      </el-radio-group>
      <div style="text-align:center;margin-top:10%;padding:0;">
        <el-button type="primary"
                   @click="confirmSetSupplier">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import region from '@/components/common'
export default {
  data () {
    return {
      list: [],
      listtech: [],
      token: window.sessionStorage.getItem('bbytoken'),
      authList: [],
      bangNumArr: [],
      bangCardArr: [],
      pagearr: [],
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1, //总页数
      page1: 1,
      pageCount1: 1,
      page2: 1,
      pageCount2: 1,
      page3: 1,
      pageCount3: 1,
      reason: '',
      id: '',
      layerIndex: '',
      curId: 0,
      seCurId: 0,
      SetupsDialogVisible: false,
      ToviewDialogVisible: false,
      details: null,
      detail: {},
      referees: {},
      promo_code: '',
      provincelist: [],
      citylist: [],
      countylist: [],
      reg: {
        occupation: '',
        money: '',
        province: '',
        city: '',
        city_id: '',
        id: ''
      },
      isShowSupplier: false, //供应商弹框,
      supplierList: [],     //供应商列表
      chooseSupplier: 'a', //默认选中
    }
  },

  methods: {
    getprovince: region.getprovince,
    checkpro: region.checkpro,
    checkcity: region.checkcity,
    prev (e) {
      this.page = e;
      this.init();
    },
    next (e) {
      this.page = e;
      this.init();
    },
    current (e) {
      this.page = e;
      this.init();
    },
    prev1 (e) {
      this.page1 = e;
      this.getWorkNum();
    },
    next1 (e) {
      this.page1 = e;
      this.getWorkNum();
    },
    current1 (e) {
      this.page1 = e;
      this.getWorkNum();
    },
    prev2 (e) {
      this.page2 = e;
      this.getBangNum();
    },
    next2 (e) {
      this.page2 = e;
      this.getBangNum();
    },
    current2 (e) {
      this.page2 = e;
      this.getBangNum();
    },
    prev3 (e) {
      this.page3 = e;
      this.getCardNum();
    },
    next3 (e) {
      this.page3 = e;
      this.getCardNum();
    },
    current3 (e) {
      this.page3 = e;
      this.getCardNum();
    },
    init () {
      this.$axios.post('admin/ShopList/index', {
        token: this.token,
        page: this.page
      })
        .then(res => {

          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
            this.list = []
          }
        })
        .catch(err => console.log(err))
    },
    getCardNum () {
      this.$axios.post('admin/ShopList/cardNum', {
        token: this.token,
        sid: this.id,
        page: this.page3
      })
        .then(res => {

          this.bangCardArr = res.data.data.list;
          this.pageCount3 = res.data.data.rows;

        })
        .catch(err => alert(err));
    },
    lookCardNum (id) {
      this.id = id;
      this.$axios.post('admin/ShopList/cardNum', {
        token: this.token,
        sid: id,
        page: this.page3
      })
        .then(res => {

          if (res.data.code == 0) layer.msg(res.data.msg);
          else {
            this.bangCardArr = res.data.data.list;
            this.pageCount3 = res.data.data.rows;
            layer.open({
              type: 1,
              area: ['70%', '70%'],
              title: ['售卡数量详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              content: $('.laybox3')
            })
          }
        })
        .catch(err => alert(err));
    },
    getBangNum () {
      this.$axios.post('admin/ShopList/serviceNum', {
        token: this.token,
        sid: this.id,
        page: this.page2
      })
        .then(res => {

          this.bangNumArr = res.data.data.list;
          this.pageCount2 = res.data.data.rows;
        })
        .catch(err => alert(err));
    },
    lookbangNum (id) {
      this.id = id;
      this.$axios.post('admin/ShopList/serviceNum', {
        token: this.token,
        sid: id,
        page: this.page2
      })
        .then(res => {

          if (res.data.code == 0) layer.msg(res.data.msg);
          else {
            this.bangNumArr = res.data.data.list;
            this.pageCount2 = res.data.data.rows;
            layer.open({
              type: 1,
              area: ['70%', '70%'],
              title: ['邦保养次数', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              content: $('.laybox2')
            })
          }
        })
        .catch(err => alert(err));
    },
    close: function (id) {
      this.id = id;
      this.layerIndex = layer.open({
        type: 1,
        area: ['50%', '55%'],
        title: ['临时关停', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
        shadeClose: true,
        shade: 0.8,
        content: $('.laybox')
      })
    },
    cancel () {
      layer.close(this.layerIndex);
    },
    pass () {
      if (!this.reason) {
        layer.msg('请输入关停理由！');
        return;
      }
      this.$axios.post('admin/ShopList/shotDown', {
        token: this.token,
        id: this.id,
        reason: this.reason
      })
        .then(res => {

          if (res.data.code == 1) {
            layer.msg(res.data.msg, {
              time: 500
            }, function () {
              layer.closeAll();
            });
            this.init();
          } else {
            layer.closeAll();
            this.$alert(res.data.msg, '提示', {
              type: 'error'
            });
          }
        })
        .catch(err => console.log(err))
    },
    getWorkNum () {
      this.$axios.post('admin/ShopList/workerNum', {
        token: this.token,
        id: this.id,
        page: this.page1
      })
        .then(res => {

          this.listtech = res.data.data.list;
          this.pageCount1 = res.data.data.rows;
        })
        .catch(err => alert(err));
    },
    tech (id) {
      this.id = id;
      this.$axios.post('admin/ShopList/workerNum', {
        token: this.token,
        id: id,
        page: this.page1
      })
        .then(res => {

          if (res.data.code == 0) layer.msg('暂无数据');
          else {
            this.listtech = res.data.data.list;
            this.pageCount1 = res.data.data.rows;
            layer.open({
              type: 1,
              area: ['50%', '70%'],
              title: ['技师详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              content: $('.laybox1')
            })
          }
        })
        .catch(err => alert(err));
    },
    refereesDetails (row) {

      if (row.share_person == 1) {
        this.ToviewDialogVisible = true
        this.detail = row.detail
      } else {
        this.SetupsDialogVisible = true
        this.getprovince()
      }

    },
    getCity () {
      this.checkpro()
    },
    getarea (e) {
      this.checkcity()
      this.citylist.filter((item) => {
        if (item.name === e) {
          this.reg.city_id = item.id
        }
      })
    },
    //根据推广码进行搜索
    async search () {
      try {
        const res = await this.$axios.post('admin/ShopList/codeSearch', { token: this.token, promo_code: this.promo_code })
        if (res.data.code == 1) {
          this.details = res.data.data.list
        } else {
          this.$message.error(res.data.msg)
          this.details = null
        }
      } catch (err) {

      }
    },
    async Setup () {

      let data = Object.assign({}, { ...this.details, ...this.reg, token: this.token, promo_code: this.promo_code })

      try {
        const res = await this.$axios.post('admin/ShopList/userInfo', data)
        if (res.data.code == 1) {
          this.SetupsDialogVisible = false;
          this.init()
          this.$message({ message: res.data.msg, type: 'success' })
        } else[
          this.$message.error(res.data.msg)
        ]
      } catch (err) {

      }
    },
    SetupsClose () {
      this.details = null
      this.detail = {}
      this.promo_code = ''
      this.reg.money = ''

    },
    handleSupplier (id) { //设置供应商弹框数据
      this.chooseSupplier = 'a'
      this.$axios.post("admin/ShopList/selectAgent", {
        token: this.token,
        sid: id
      })
        .then((res) => {
          this.supplierList = res.data.data
        })
    },
    confirmSetSupplier () {
      let activeS;
      if (this.chooseSupplier == 'a') {
        for (let sItem in this.supplierList) {
          if (sItem.mo == 'a') {
            activeS = sItem.id
            break;
          }
        }
      } else {
        activeS = this.chooseSupplier
      }
      this.$axios.post("admin/ShopList/setGid", {
        token: this.token,
        gid: activeS,
        sid: this.sid
      })
        .then(res => {
          if (res.data.code) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        })

      this.chooseSupplier = 'a'
      this.isShowSupplier = false
    },
    // 设置服务车 switch 发生改变时  
    async switchChange (value, sid) {

      try {
        const res = await this.$axios.post('admin/ShopList/serveCar', { token: this.token, sid: sid })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    },
    //设置服务车补贴
    async SetupSubsidy (row) {
      try {

        const res = await this.$axios.post('admin/ShopList/serveFee', { token: this.token, sid: row.id, fee: row.serve_fee })
        if (res.data.code == 1) {
          this.init()
          this.$message({ message: res.data.msg, type: 'success' })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    }
  },
  created () {
    this.init();
  },
  mounted () {

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
            if (arr[i].name == '维修厂列表') {
              this.seCurId = arr[i].id;
            }
            if (arr[i].son) {
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
              }
            }
          }
          this.authList = arr;
          //              this.authList=res.data.data;
        } else {
          this.$alert(res.data.msg, '提示', {
            type: 'error'
          });
        }
      })
      .catch(err => {
        alert(err);
      })
  },
  watch: {
    index () {
      this.init();
    }
  }
}
</script>
<style scoped>
.quote {
  margin: 0;
}
>>> .el-input input {
  text-align: center;
}
.layui-layer-content .page-nav {
  position: absolute;
}

.laybox {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.laybox > p {
  display: flex;
  padding: 50px 100px 50px 100px;
}

.laybox textarea {
  width: 80%;
  height: 250px;
  outline: none;
  resize: none;
  border: 1px dashed #04bbfc;
  border-radius: 10px;
}

.laybox > p {
}

div.bot button {
  width: 110px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 4px 0px 6px rgba(177, 42, 19, 0.2);
  border: none;
  color: white;
}

button.reject {
  background: rgba(237, 81, 55, 1);
  margin-right: 30%;
}

button.pass {
  background-color: #20a0ff;
}
.details {
  margin-top: 30px;
}
.details > p {
  margin: 20px 0;
}
.details > p > span:first-child {
  display: inline-block;
  width: 50px;
  text-align: right;
  margin-right: 10px;
}
.Setup {
  width: 100%;
  display: inline-block;
  text-align: center;
}
.supplierStyle .el-radio-group {
  margin-top: 30px;
}
.supplierStyle .el-radio {
  /*width:13%;*/
}
</style>
