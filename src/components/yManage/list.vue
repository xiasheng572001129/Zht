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
        <div class="quote-ele"><i></i>配送中心</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>配送中心</th>
            <th>联系电话</th>
            <th>负责人</th>
            <!-- <th>汽修厂数量</th> -->
            <th>区域个数</th>
            <!-- <th>售卡数量</th> -->
            <th>账户余额</th>
            <!-- <th>保养次数</th> -->
            <th>设置供应商</th>
            <th>服务车数量</th>
            <th>车补</th>
            <th>配送费( 元/升 )</th>
            <th>滤芯补贴金额( 元 )</th>
            <!-- <th>推荐人</th> -->
            <th>操作</th>
            <!-- <th>服务押金</th> -->
            <th>是否有服务车</th>
            <th>滤芯补助</th>
            <!-- <th>服务车补贴</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list"
              :key="index">
            <td class="t-l"><a href="javascript:;"
                 @click="companyf(item.aid)">{{item.company}}</a></td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <!-- <td><a href="javascript:;"
                 @click='openshop(item.aid)'>{{item.open_shop}}</a></td> -->
            <td><a href="javascript:;"
                 @click="regionsf(item.aid)">{{item.regions}}</a></td>

            <!-- <td>
              <el-button @click="lookCard(item.aid)"
                         type="text">{{item.sale_card}}</el-button>
            </td> -->
            <td>{{item.balance}}</td>

            <td>
              <a href="javascript:;"
                 @click="supplier=true,form['aid']=item.aid,handleSetSupplier(item.aid)">{{item.sm_name || '无'}}</a>
            </td>
            <td>
              {{item.serve_car}}台
            </td>
            <td>
              {{item.serve_fee}}元
            </td>
            <!-- <td>
              <el-popover placement="bottom"  
                          title="推荐人详情"
                          width="200"
                          trigger="click">
                <template>
                  <p>推荐人身份：<span style="font-size:13px;color:#888;">{{refereeDetail.share_type}}</span></p>
                  <p>推荐人名称：<span style="font-size:13px;color:#888;">{{refereeDetail.share_name}}</span></p>
                  <p>推荐码：<span style="font-size:13px;color:#888;">{{refereeDetail.share_promo_code}}</span></p>
                </template>
                <a href="javascript:;"
                   @click="checkReferee(item.share_promo_code)"
                   slot="reference">{{item.rec_name || '无'}}</a>
              </el-popover>

            </td> -->
            <td>
              <el-input v-model="item.delivery_fee"
                        :disabled="item.if_delivery_fee==2"
                        style="width:50%"
                        @change="ModifyDelivery(item.aid,$event)" />
            </td>
            <td>
              {{item.core_fee}}元
            </td>
            <td>
              <a href="javascript:;"
                 @click="ShutDown(item.aid,item.company,item.leader)">关停</a>
              <a href="javascript:;"
                 @click="ReasonVisible=true,form['aid']=item.aid,cancelRegion(item.aid,item.company,item.leader)">取消合作</a>
            </td>
            <!-- <td>{{item.fee || '无'}}</td> -->
            <td>
              <el-switch v-model="item.if_serve"
                         :active-value='1'
                         :inactive-value='0'
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         @change='switchChange(item.if_serve,item.aid)'>
              </el-switch>
            </td>
            <td>
              <el-switch v-model="item.core_type"
                         :active-value='1'
                         :inactive-value='2'
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         @change='coreChange(item.core_type,item.aid)'>
              </el-switch>
            </td>
            <!-- <td>
              <el-input style="width:100px;"
                        class=""
                        v-if='item.serve_car'
                        v-model="item.serve_fee"
                        placeholder="请输入补贴"
                        @blur="SetupSubsidy(item)" />
              <div v-else>--</div>
            </td> -->
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page_center"
           v-show="totalPage&&totalPage>1">
        <el-pagination background
                       @prev-click="prev"
                       @next-click="next"
                       @current-change="current"
                       @size-change="size-change"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="totalPage">
        </el-pagination>
      </div>
    </div>
    <div class="laybox"
         style="display:none">
      <img :src="comlist.license"
           alt="">
      <ul>
        <li>公司名称: {{comlist.company}}</li>
        <li>负责人: {{comlist.leader}}</li>
        <li>联系电话: {{comlist.phone}}</li>
        <li>详细地址: {{comlist.province+comlist.city+comlist.county+comlist.address}}</li>
        <li>开户行: {{comlist.branch}}</li>
        <li>提款账号: {{comlist.account}}</li>
        <li>开户名: {{comlist.bank_name}}</li>
      </ul>
    </div>
    <div class="laybox1"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>公司名称</th>
            <th>负责人</th>
            <th>联系电话</th>
            <th>申请时间</th>
            <th>开通时间</th>
            <th>是否新开</th>
            <th>提高配给次数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in numlist">
            <td>{{item.company}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.create_time}}</td>
            <td v-if="item.audit_time!=''">{{item.audit_time|datetime}}</td>
            <td v-else>--</td>
            <td>{{item.if_new}}</td>
            <td>{{item.inc}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page-nav">
        <el-pagination background
                       @prev-click="prev1"
                       @next-click="next1"
                       @current-change="current1"
                       @size-change="size-change"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="totalPage1">
        </el-pagination>
      </div>
    </div>
    <div class="laybox3"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>邦保养卡号</th>
            <th>邦保养卡类型</th>
            <th>邦保养车牌号</th>
            <th>维修厂名称</th>
            <th>维修厂电话</th>
            <th>维修厂负责人</th>
            <th>售卡金额</th>
            <th>售卡时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in num2list">
            <td>{{item.card_number}}</td>
            <td>{{item.card_type}}</td>
            <td>{{item.plate}}</td>
            <td>{{item.company}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.card_price}}</td>
            <td>{{item.sale_time}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page-nav">
        <el-pagination background
                       @prev-click="prev2"
                       @next-click="next2"
                       @current-change="current2"
                       @size-change="size-change"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="totalPage2">
        </el-pagination>
      </div>
    </div>
    <div class="laybox4"
         style="display:none">
      <table class="table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>配送中心</th>
            <th>维修厂负责人</th>
            <th>维修厂电话</th>
            <th>邦保养时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in num3list">
            <td>{{item.odd_number}}</td>
            <td>{{item.company}}</td>
            <td>{{item.leader}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.create_time}}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页 -->
      <div class="page-nav">
        <el-pagination background
                       @prev-click="prev3"
                       @next-click="next3"
                       @current-change="current3"
                       @size-change="size-change"
                       layout="prev, pager, next,jumper,total,->"
                       :page-count="totalPage3">
        </el-pagination>
      </div>
    </div>
    <div class="shuju laybox2"
         style="display:none">
      <ul>
        <li v-if="arealist.status==0">暂未设置供应地区</li>
        <li v-else
            v-for="item in arealist.data">
          {{item.name}}
          <ul v-if="item.son"
              class="son">
            <li v-for="sonitem in item.son">
              {{sonitem.name}}
              <ul v-if="sonitem.son"
                  class="grandson">
                <li v-for="grandson in sonitem.son">{{grandson.name}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <el-dialog class="Reason"
               title="关停理由"
               :visible.sync="ReasonDialogVisible"
               width="30%"
               center
               @close="Close">
      <textarea class="textarea"
                cols="100"
                rows="200"
                v-model="textVal">

      </textarea>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="SureShutdown">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="Reason"
               title="取消合作"
               :visible.sync="ReasonVisible"
               width="30%"
               center
               @closed="closed()">
      <div>
        <el-form ref="form"
                 :model="form"
                 label-width="80px">
          <el-form-item label="区域:"
                        prop="area">
            <el-checkbox-group v-model="form.area">
              <el-checkbox :label="item.area"
                           v-for="(item,index) in region"
                           :key="index"
                           name="type">{{`${item.name}${item.city_name}${item.county_name}`}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="取消理由:"
                        prop="reason">
            <textarea class="textarea"
                      cols="100"
                      rows="200"
                      v-model="form.reason">
           </textarea>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="Sure">确定</el-button>
      </span>
    </el-dialog>
    <!-- 设置供应商弹框 -->
    <el-dialog class="chooseSupplierStyle Reason"
               title="设置供应商"
               :visible.sync="supplier"
               width="30%"
               center
               @close="Close">
      <el-radio-group v-model="chooseSupplier">
        <el-radio :label="supplierItem.mo=='a'?'a':supplierItem.id"
                  v-for='(supplierItem, index) in supplierList'
                  :key="index">{{supplierItem.name}}</el-radio>
      </el-radio-group>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="setSupplier">
          确定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="请选择服务车数量"
               :visible.sync="servicerVisible"
               center
               @close='close'>
      <el-form label-width="100px">
        <el-form-item label="服务车数量 : ">
          <el-radio v-model="servicerNum"
                    :label="1">1台</el-radio>
          <el-radio v-model="servicerNum"
                    :label="2">2台</el-radio>
        </el-form-item>
        <el-form-item label="车补 :">
          {{servicerNum*2480}}元
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="chooseServicer"
                     :loading="loading">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
//  import page from '../common.js';
import Vue from 'vue'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      comlist: {},
      numlist: [],
      num2list: [],
      num3list: [],
      aid: 0,
      arealist: {},
      //分页数据
      page: 1, //显示的页码数
      totalPage: 1, //总页数
      page1: 1,
      totalPage1: 1,
      page2: 1,
      totalPage2: 1,
      page3: 1,
      totalPage3: 1,
      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      ReasonDialogVisible: false, //关停理由弹框
      textVal: '',
      ReasonVisible: false,
      region: [],
      form: {
        area: [],
        reason: '',
        aid: ''
      },
      supplier: false, //默认设置供应商弹框隐藏,
      chooseSupplier: "a", //设置供应商默认选择,
      supplierList: [], //供应商列表
      refereeDetail: {},
      servicerVisible: false,
      servicerNum: 1,
      loading: false,
      aid: ''
    }
  },
  methods: {
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
      this.getShopNum();
    },
    next1 (e) {
      this.page1 = e;
      this.getShopNum();
    },
    current1 (e) {
      this.page1 = e;
      this.getShopNum();
    },
    prev2 (e) {
      this.page2 = e;
      this.getPayNum();
    },
    next2 (e) {
      this.page2 = e;
      this.getPayNum();
    },
    current2 (e) {
      this.page2 = e;
      this.getPayNum();
    },
    prev3 (e) {
      this.page3 = e;
      this.getBangNum();
    },
    next3 (e) {
      this.page3 = e;
      this.getBangNum();
    },
    current3 (e) {
      this.page3 = e;
      this.getBangNum();
    },
    getBangNum () {
      this.$axios.post('admin/AgentList/serviceDetail', { token: this.token, aid: this.aid, page: this.page3 })
        .then(res => {

          this.num3list = res.data.data.list;
          this.totalPage3 = res.data.data.rows;
        })
        .catch(err => console.log(err))
    },
    lookBangNum (id) {
      this.aid = id;
      this.aid = id;
      this.page3 = 1;
      this.$axios.post('admin/AgentList/serviceDetail', { token: this.token, aid: id, page: this.page3 })
        .then(res => {

          this.num3list = res.data.data.list;
          this.totalPage3 = res.data.data.rows;
          if (res.data.data.list)
            layer.open({
              type: 1,
              area: ['60%', '60%'],
              title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox4')
            })
          else layer.msg(res.data.msg)
        })
        .catch(err => console.log(err))
    },
    getPayNum () {
      this.$axios.post('admin/AgentList/card', { token: this.token, aid: this.aid, page: this.page2 })
        .then(res => {

          this.num2list = res.data.data.list;
          this.totalPage2 = res.data.data.rows;
        })
        .catch(err => console.log(err))
    },
    //点击查看售卡数量
    lookCard (id) {
      this.aid = id;
      this.page2 = 1;
      this.$axios.post('admin/AgentList/card', { token: this.token, aid: id, page: this.page2 })
        .then(res => {

          this.num2list = res.data.data.list;
          this.totalPage2 = res.data.data.rows;
          if (res.data.data.list)
            layer.open({
              type: 1,
              area: ['90%', '60%'],
              title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox3')
            })
          else layer.msg(res.data.msg)
        })
        .catch(err => console.log(err))
    },
    getShopNum () {
      this.$axios.post('admin/AgentList/shopNum', { token: this.token, aid: this.aid, page: this.page1 })
        .then(res => {

          this.numlist = res.data.data.list;
          this.totalPage1 = res.data.data.rows;
        })
        .catch(err => console.log(err))
    },
    init () {
      this.$axios.post('admin/AgentList/index', { token: this.token, page: this.page })
        .then(res => {
          if (res.data.code == 1) {
            this.list = res.data.data.list;
            this.totalPage = res.data.data.rows;
          } else {
            this.list = {}
            layer.msg(res.data.msg)
          }

        })
        .catch(err => console.log(err))
    },
    companyf (aid) {
      this.$axios.post('admin/AgentList/company', { token: this.token, aid: aid })
        .then(res => {

          this.comlist = res.data.data;
          if (res.data.data)
            layer.open({
              type: 1,
              area: ['40%', '60%'],
              title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox')
            })
          else layer.msg(res.data.msg)
        }).catch(err => { })
    },
    openshop (aid) {
      this.aid = aid;
      this.page1 = 1;
      this.$axios.post('admin/AgentList/shopNum', { token: this.token, aid: aid, page: this.page1 })
        .then(res => {

          this.numlist = res.data.data.list;
          this.totalPage1 = res.data.data.rows;
          if (res.data.data.list)
            layer.open({
              type: 1,
              area: ['80%', '60%'],
              title: ['详情', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox1')
            })
          else layer.msg(res.data.msg)
        })
        .catch(err => console.log(err))
    },
    //      goto2: function (i) {
    //        this.index2 = i;
    //      },
    regionsf: function (aid) {
      this.$axios.post('admin/AgentList/regionList', { token: this.token, aid: aid })
        .then(res => {

          this.arealist = res.data;
          if (typeof res.data.data == 'object')
            layer.open({
              type: 1,
              area: ['50%', '60%'],
              title: ['区域', 'height:60px;background-color:#98D1F9;color:white;text-align:center;line-height:60px;font-size:20px;'],
              shadeClose: true,
              shade: 0.8,
              closeBtn: 1,  //怎么显示 ×
              content: $('.laybox2')
            })
          else layer.msg(res.data.data)

        }).catch(err => { })
    },
    //点击关停
    ShutDown (aid, company, leader, ) {
      this.ReasonDialogVisible = true
      this.obj = {
        aid: aid,
        company: company,
        leader: leader,
        token: this.token
      }
    },
    //关闭弹框,清除文本域内容
    Close () {
      this.textVal = ''
    },
    //点击确定关停
    SureShutdown () {
      if (!this.textVal) {
        layer.msg('请输入关停理由', { time: 1500 })
        return;
      }
      this.obj.reason = this.textVal
      this.$axios.post('admin/AgentList/stop', this.obj).then(res => {
        if (res.data.code == 1) {
          layer.msg(res.data.msg, { time: 1500 }, (() => {
            this.ReasonDialogVisible = false
            this.init()
          }))
        } else {
          layer.msg(res.data.msg, { time: 1500 })
        }
      })
    },
    async cancelRegion (aid) {
      const res = await this.$axios.post('admin/AgentList/cancelRegion', { token: this.token, aid: aid })
      if (res.data.code == 1) {
        this.region = res.data.data
      } else {
        this.reason = []
      }
    },
    async Sure () {
      if (!this.form.reason) {
        this.$message.error('请输入取消理由')
        return;
      }
      const res = await this.$axios.post('admin/AgentCancel/agentCancel', Object.assign({}, this.form, { token: this.token }))
      if (res.data.code == 1) {
        this.$message({ message: res.data.msg, type: 'success' })
        this.ReasonVisible = false
        this.init()
      } else {
        this.$message.error(res.data.msg)
      }
    },
    closed () {
      this.$refs.form.resetFields()
    },
    close () {
      this.init()
    },
    //点击设置供应商谈弹框信息
    handleSetSupplier (aid) {
      this.chooseSupplier = 'a'
      this.$axios.post('admin/AgentList/selectAgent', {
        token: this.token,
        aid: aid
      })
        .then((res) => {
          this.supplierList = res.data.data
        })
    },
    async setSupplier () {		//供应商弹框点击确认
      let activeS; 					//选中的供应商ID
      if (this.chooseSupplier == "a") {
        for (var i = 0; i < this.supplierList.length; i++) {
          if (this.supplierList[i].mo == this.chooseSupplier) {
            activeS = this.supplierList[i].id
            break;
          }
        }
      } else {
        activeS = this.chooseSupplier
      }
      const res = await this.$axios.post('admin/AgentList/setGid', {
        token: this.token,
        aid: this.form.aid,
        gid: activeS
      })
      if (res.data.code) {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
      }
      this.chooseSupplier = 'a' //重置chooseSupplier
      this.supplier = false;
      this.init();
    },
    checkReferee (key) { //查看推荐人
      this.refereeDetail = {}
      this.$axios.post('admin/AgentList/chaShare', {
        token: this.token,
        share_promo_code: key
      })
        .then(res => {
          this.refereeDetail = res.data.data
        })
    },
    // 设置服务车 switch 发生改变时  
    async switchChange (value, aid) {
      this.aid = aid
      if (value == 1) {
        this.servicerVisible = true
      } else {
        try {
          const res = await this.$axios.post('admin/AgentList/serveCar', { token: this.token, aid: aid })
          this.loading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.servicerVisible = false
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {

          throw (error)
        }
      }


      //   try {
      //     const res = await this.$axios.post('admin/AgentList/serveCar', { token: this.token, aid: aid })
      //     if (res.data.code == 1) {
      //       this.$message({ message: res.data.msg, type: 'success' })
      //     } else {
      //       this.$message.error(res.data.msg)
      //     }
      //   } catch (err) {
      //     throw (err)
      //   }
    },
    coreChange (core_type, aid) {
      if (core_type == 1) {
        this.$prompt('请输入滤芯补贴', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '滤芯补贴不能为空',
          inputValue: 15
        }).then(async ({ value }) => {

          this.coreSet(aid, core_type, value)
        }).catch(() => {
          this.init()
        });
      } else {
        this.coreSet(aid, core_type)
      }
    },
    async coreSet (aid, core_type, core_fee) {
      try {
        const res = await this.$axios.post('admin/AgentList/coreSet', { token: this.token, aid: aid, core_type: core_type, core_fee: core_fee })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        throw (error)
      }
    },
    async chooseServicer () {
      try {
        this.loading = true
        const res = await this.$axios.post('admin/AgentList/serveCar', { token: this.token, aid: this.aid, serve_car: this.servicerNum, serve_fee: this.servicerNum * 2480 })
        this.loading = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.servicerVisible = false
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.loading = false
        throw (error)
      }
    },
    //设置服务车补贴
    async SetupSubsidy (row) {
      try {

        const res = await this.$axios.post('admin/AgentList/serveFee', { token: this.token, aid: row.aid, fee: row.serve_fee })
        if (res.data.code == 1) {
          this.init()
          this.$message({ message: res.data.msg, type: 'success' })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        throw (err)
      }
    },
    //修改配送费
    async ModifyDelivery (aid, item) {
      try {
        const res = await this.$axios.post('admin/AgentList/delivery', { token: this.token, aid: aid, delivery_fee: item })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        throw (error)
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

            if (arr[i].name == '管理列表') {
              this.seCurId = arr[i].id;

              if (arr[i].son) {

                this.threeAuthList = arr[i].son;
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '配送中心列表' && arr[i].name == '管理列表') {
                    this.thCurId = arr[i].son[j].id;
                  }

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
  },
  watch: {
    index () {
      this.init();
    }
  }
}
</script>
<style scoped>
.laybox {
  display: flex;
}
>>> .el-input input {
  text-align: center;
}
.laybox img {
  width: 180px;
  height: 180px;
  margin: 115px 7%;
}

.laybox ul {
  padding-left: 8%;
  margin-top: 17px;
  display: inline-block;
  border-left: 1px dashed #04bbfc;
}

.laybox ul li {
  font-size: 16px;
  margin-bottom: 40px;
}

.shuju {
  margin-top: 16px;
  font-size: 16px;
  text-align: center;
  color: #999;
  overflow: hidden;
}

.shuju > ul > li {
  width: 50%;
  margin-bottom: 50px;
}

.shuju .son {
  margin-left: 20px;
  display: inline-block;
  vertical-align: top;
}

.shuju .son li {
  display: block;
}

.shuju .grandson {
  margin-left: 20px;
  vertical-align: top;
  display: inline-block;
}

.shuju .grandson li {
  display: block;
  margin-bottom: 7px;
}

.layui-layer-content {
  position: relative;
}

.layui-layer-content .page-nav {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
}
.textarea {
  height: 200px;
  resize: none;
}
</style>
<style>
.Reason .el-dialog__header {
  background: rgb(152, 209, 249);
  padding-bottom: 20px;
}
.Reason .el-dialog__title {
  color: #fff;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-checkbox {
  margin-right: 20px !important;
}
.chooseSupplierStyle .el-radio-group .el-radio {
  margin: 0;
  margin: 20px 10% 0 0;
}
.chooseSupplierStyle .el-radio-group .el-radio:nth-child(5n) {
  margin-right: 0;
}
.chooseSupplierStyle .el-radio-group {
  display: block;
}
</style>
