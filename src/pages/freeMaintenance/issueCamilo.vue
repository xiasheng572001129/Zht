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
          <i></i>系统设置-保险客户卡密-发放卡密
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
      <div class="search">
        <el-select v-model="currentProvince"
                   @change="changeProvince"
                   placeholder="请选择省">
          <el-option v-for="(item,index) in provinceList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
        <!-- <el-select v-model="currentCity"
                   placeholder="请选择市"
                   @change="changeCity">
          <el-option v-for="(item,index) in cityList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select> -->
        <el-button type="primary"
                   class="addChannel"
                   @click="addChannelVisible=true,status=0"
                   :disabled="!(cityList&&cityList.length>0)">添加单位</el-button>
      </div>
      <div class="main">
        <div class="main_area">
          <div :class="['main_city',acitivIndex==index ? 'activeClass' : '']"
               v-for="(item,index) in cityList"
               :key="index"
               @click="acitivIndex=index,getCompanyList(item.id)">{{item.name}}</div>
        </div>
        <div class="main_item">
          <!-- <div>
            <el-row :gutter="30">

              <el-col :span="24">
                <div v-for="(item,index) in list"
                     :key="index">
                  
                </div>
              </el-col>

            </el-row>
          </div> -->
          <el-table :data="list"
                    v-if="currentProvince">
            <!-- <el-table-column type="selection"
                             width="55">
            </el-table-column> -->
            <el-table-column label="管理员名称"
                             align="center"
                             prop="uname"></el-table-column>
            <el-table-column label="保险公司图片"
                             align='center'>
              <template slot-scope="scope">
                <img :src="scope.row.photo"
                     class="photo" />
              </template>
            </el-table-column>
            <el-table-column label="保险公司"
                             align="center">
              <template slot-scope="scope">
                {{scope.row.company}}

              </template>
            </el-table-column>

            <!-- <el-table-column label="卡数量"
                             align="center">
              <template slot-scope="scope">
                <el-input placeholder="请输入卡数量"
                          v-model="scope.row.card_num" />
              </template>
            </el-table-column> -->
            <el-table-column label="过期时间"
                             align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.month">
                  <el-option v-for="(item,index) in 12"
                             :key="index"
                             :value="item"
                             :label="`${item}月`"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="总卡数"
                             align="center"
                             prop="num">
              <template slot-scope="scope">
                {{scope.row.num}}张
              </template>
            </el-table-column>
            <el-table-column label="消耗数量"
                             align="center"
                             prop="num">
              <template slot-scope="scope">
                {{scope.row.consume}}张
              </template>
            </el-table-column>
            <el-table-column label="剩余数量"
                             align="center"
                             prop="num">
              <template slot-scope="scope">
                {{scope.row.sur_num}}张
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center">
              <template slot-scope="scope">
                <el-button type="danger"
                           size="small"
                           @click="remove(scope.row)">删除</el-button>
                <!-- <el-button type="primary"
                           size="small"
                           @click="status=1,Modify(scope.row)">修改</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-button type="primary"
                     v-if="checkedCompany && checkedCompany.length>0"
                     class="main_confirm"
                     @click="Export()">导出</el-button> -->
          <!-- <el-row>
            <el-col :span="1">
              <el-checkbox v-model="item.checked"></el-checkbox>
            </el-col>
            <el-col :span="2">
              <el-input class="clear-border"
                        v-model="item.company"
                        @change="(value)=>singleModify(value,item)" />
            </el-col>
            <el-col :span="2"
                    :offset="1">
              <el-input class="clear-border"
                        v-model="item.sur_num"
                        @change="(value)=>singleModify(value,item)" />
            </el-col>
            <el-col :span="1"
                    :offset="1">
              <el-button type="primary"
                         size="small">导出</el-button>
            </el-col>
          </el-row> -->
        </div>
      </div>
      <el-dialog :title="status==0 ? '添加单位' : '修改单位'"
                 center
                 :visible.sync="addChannelVisible"
                 width="30%"
                 @close='()=>$refs.channelForm.resetFields()'>
        <el-form label-width="120px"
                 style="width:80%"
                 :model="channelList"
                 :rules="channelRules"
                 ref="channelForm">
          <el-form-item label="保险公司名称"
                        prop="name">
            <el-input placeholder="请输入保险公司名称"
                      v-model="channelList.name"
                      :disabled="status==1"
                      v-if="status==1" />
            <el-autocomplete class="inline-input"
                             v-model="channelList.name"
                             :fetch-suggestions="querySearch"
                             @select="handleSelect"
                             placeholder="请输入保险公司名称"
                             v-else
                             style="width:100%"></el-autocomplete>
          </el-form-item>
          <el-form-item label="卡数量"
                        prop="num">
            <el-input placeholder="请输入卡数量"
                      v-model="channelList.num"
                      :disabled="status==1" />
          </el-form-item>
          <el-form-item label="单价"
                        prop="money">
            <el-input placeholder="请输输入单价"
                      v-model="channelList.money" />
          </el-form-item>
          <el-form-item label="油品数量">

            <el-input placeholder="请输入油品数量"
                      v-model="channelList.oil_num"
                      :disabled="true" />
          </el-form-item>
          <el-form-item label="滤芯价格"
                        required>
            <el-form-item prop="filter_price"
                          v-if="channelList.if_filter==2"
                          style="margin:10px 0">
              <el-input placeholder="请输入滤芯价格"
                        v-model="channelList.filter_price" />
            </el-form-item>
            <el-form-item prop="if_filter">
              <el-radio-group v-model="channelList.if_filter">
                <el-radio :label="1">没有滤芯</el-radio>
                <el-radio :label="2">有滤芯</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form-item>
          <el-form-item label="工时价格"
                        required>
            <el-form-item prop="hour_price"
                          v-if="channelList.if_hour==2"
                          style="margin:10px 0">
              <el-input placeholder="请输入工时价格"
                        v-model="channelList.hour_price" />
            </el-form-item>
            <el-form-item prop="if_hour">
              <el-radio-group v-model="channelList.if_hour">
                <el-radio :label="1">没有工时</el-radio>
                <el-radio :label="2">有工时</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form-item>
          <el-form-item label="备注"
                        prop="remarks">
            <el-input type="textarea"
                      placeholder="请输入备注"
                      v-model="channelList.remarks"
                      :rows="2" />
          </el-form-item>
          <el-form-item label="过期时间"
                        prop="month">
            <el-select v-model="channelList.month">
              <el-option v-for="(item,index) in 12"
                         :key="index"
                         :value="item"
                         :label="`${item}月`"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="图片:"
                        prop="photo">
            <el-upload :action='baseURL+"admin/Prize/cbImg"'
                       :data="{token:token}"
                       name='img'
                       list-type="picture-card"
                       :limit='1'
                       :file-list='channelList.photo ? [{url:channelList.photo}] : []'
                       :on-success="handleAvatarSuccess"
                       :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="status==0 ? addChannel() : ModifyImg()"
                       :loading="channelLoaading">{{status==0 ? '添加' : '修改'}}</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getPro, GET_City } from '@/utils'
import qs from 'qs'
import obj from '../../components/common'
export default {
  data () {
    return {
      seCurId: '',
      threeAuthList: [],
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 0,
      pageCount: 0,
      authList: [],
      list: [], //领卡渠道列表
      provinceList: [], //省列表
      currentProvince: '',//当前选中的省
      cityList: [], //市列表
      currentCity: '', //当前选中的市
      addChannelVisible: false, //添加渠道弹框显示状态
      channelList: {  //添加渠道数据
        name: '', //渠道名称
        num: '', //卡数量
        money: '', //单价
        photo: '',  //保险公司图片
        month: '12', //过期时间
        oil_num: '4L', //油品数量
        filter_price: '', //滤芯价格
        hour_price: '', //工时价格
        if_filter: 1, //是否有滤芯  1没有  2 有
        if_hour: 1, //是否有工时 1 没有 2 有
        remarks: '', //备注 
      },
      channelRules: { //添加渠道form规则验证
        name: { required: true, message: '请输入渠道名称', trigger: 'blur' },
        num: { required: true, message: '请输入添加的卡数量', trigger: 'blur' },
        photo: { required: true, message: '请上传保险公司图片', trigger: 'blur' },
        month: { required: true, message: '请选择过期时间', trigger: 'blur' },
        money: { required: true, message: '请输入单价', trigger: 'blur' },
        filter_price: { required: true, message: '请输入滤芯价格', trigger: 'blur' },
        hour_price: { required: true, message: '请输入工时价格', trigger: 'blur' },
        if_filter: { required: true, message: '请选择是否有滤芯', trigger: 'blur' },
        if_hour: { required: true, message: '请选择是否有工时', trigger: 'blur' },
        remarks: { required: true, message: '请输入备注', trigger: 'blur' },
      },
      channelLoaading: false, //添加渠道loading
      acitivIndex: 0,
      checkedCompany: [],  //当前勾选的保险公司
      status: 0,   //0 是添加保险公司 1是修改保险公司
      searchList: [],   //关键字搜索的数据
    }
  },
  computed: {
    CheckedChannel () {    //选中的渠道
      let CheckedChannel = []
      this.list.forEach(item => {
        if (item.checked) {
          let data = []
          CheckedChannel.push({ channel_id: item.id, num: item.sur_num })
        }
      })
      return CheckedChannel
    }
  },
  watch: {
    'channelList.name': {
      deep: true, //深度监听设置为 true
      handler (newV) {
        if (this.status == 0 && !newV) {  //如果没有搜到关键字,清除图片
          this.channelList.photo = ''
        }
      }
    },
    "channelList.if_filter": {
      deep: true, //深度监听设置为 true
      handler (v) {
        this.channelList.filter_price = v == 1 ? '' : this.channelList.filter_price
      }
    },
    "channelList.if_hour": {
      deep: true, //深度监听设置为 true
      handler (v) {
        this.channelList.hour_price = v == 1 ? '' : this.channelList.hour_price
      }
    }
  },
  methods: {
    async getCompanyList (id) {
      try {
        const res = await this.$axios.post('admin/ChannelSetCity/channelList', { token: this.token, city_id: id })
        let data = res.data.data || []
        data.forEach(item => {
          item = Object.assign(item, { card_num: '', month: '12月' })
        })
        this.list = data || []

      } catch (error) {
        throw (error)
      }
    },
    async getProvince () {  //获取省
      try {
        const res = await getPro()
        this.provinceList = res || []
      } catch (error) {
        throw (error)
      }
    },
    async changeProvince (id) {  //获取市
      try {
        const res = await GET_City(id)
        this.cityList = res || []
        this.currentCity = ''
        let cityID = res && res.length > 0 ? res[0].id : ''
        this.getCompanyList(cityID)
      } catch (error) {
        throw (error)
      }
    },
    async querySearch (queryString, cb) {  //关键字搜索
      try {
        let city_id = this.cityList[this.acitivIndex].id //市id
        const res = await this.$axios.post('admin/ChannelSetCity/searchList', { token: this.token, city_id: city_id })
        let restaurants = res.data.data || []   //获取所有关键字
        let results = [] //搜索的关键字
        let fiterData = queryString ? restaurants.filter(item => item.company.includes(queryString)) : []  //匹配关键字
        fiterData.map(item => { //改变数组对象的Key值 
          results.push({ value: item.company, photo: item.photo })
        })
        return cb(results)
      } catch (error) {
        this.$message.error('接口报错请检查')
        throw (error)
      }
    },
    handleSelect (item) {  //当前选中的关键字
      this.channelList.photo = item && item.photo ? item.photo : ''   //选中当前的关键字 拿取当前的图片
    },
    addChannel () {  //添加保险公司
      console.log(this.channelList)
      this.$refs.channelForm.validate(async valid => {
        if (valid) {
          try {
            let id = this.cityList[this.acitivIndex] && this.cityList[this.acitivIndex].id
            this.channelLoaading = true
            const res = await this.$axios.post('admin/ChannelSetCity/channelAdd', Object.assign(this.channelList, { token: this.token, city_id: id, types: 2 }))
            this.channelLoaading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: "success" })
              this.addChannelVisible = false
              window.location.href = `${this.baseURL}admin/Export/freeCode?id=${res.data.data}&name=${this.channelList.name}&num=${this.channelList.num}&city_id=${id}&month=${this.channelList.month}`
              this.getCompanyList(id)
            } else {
              console.log(res)
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.channelLoaading = false
            throw (error)
          }
        }
      })
    },
    handleAvatarSuccess (res) {  //上传保险公司图片
      this.channelList = Object.assign({}, this.channelList, { photo: res })
    },
    handleRemove () {  //删除保险公司图片
      this.channelList.photo = ''
    },
    Modify (item) {  //修改保险公司图片
      this.addChannelVisible = true
      this.$nextTick(() => {
        this.channelList = Object.assign(this.channelList, item, { name: item.company })
      })
    },
    async ModifyImg () {
      try {
        let id = this.cityList[this.acitivIndex] && this.cityList[this.acitivIndex].id
        this.channelLoaading = true
        const res = await this.$axios.post('admin/ChannelSetCity/updImg', {
          token: this.token,
          channel_id: this.channelList.id,
          photo: this.channelList.photo,
          money: this.channelList.money,
          filter_price: this.channelList.filter_price,
          hour_price: this.channelList.hour_price,
          if_fiter: this.channelList.if_fiter,
          if_hour: this.channelList.if_hour
        })
        this.channelLoaading = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.addChannelVisible = false
          this.getCompanyList(id)
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.channelLoaading = false
        throw (error)
      }
    },
    async addCityChannel () {
      try {
        const res = await this.$axios.post('admin/ChannelSetCity/channelCityAdd', { token: this.token, data: this.CheckedChannel, city_id: this.currentCity })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: 'success' })
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        throw (error)
      }
    },
    // handleSelectionChange (val) {  //获取选中的保险公司
    //   let checkedCompany = val.map((v) => {
    //     return Object.assign(v, { month:  v.month ? v.month : '12月' })
    //   })
    //   this.checkedCompany = checkedCompany
    // },
    changeCity (id) {  //获取市
      this.init()
    },
    remove (item) {  //删除保险公司
      this.$confirm('此操作将删除该保险公司, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.$axios.post('admin/ChannelSetCity/setStatus', { token: this.token, city_id: item.city_id, channel_id: item.id })
          if (res.data.msg) {
            this.$message({ message: res.data.msg, type: "success" })
            this.getCompanyList(item.city_id)
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          throw (error)
        }
      }).catch(() => { });
    },
    monthChange (e) {

    },
    Export () {  //导出
      let data = [];
      let required = false
      this.checkedCompany.forEach((item, index) => {
        data.push({ city_id: item.city_id, channel_id: item.id, card_num: item.card_num, month: parseInt(item.month) })
        if (item.card_num) {
          required = true
        } else {
          required = false
        }
      })
      if (required) {  //必须填写卡数量
        this.getCompanyList(this.cityList[this.acitivIndex].id)
        window.location.href = `${this.baseURL}admin/Export/manyExport?data=${JSON.stringify(data)}`

      } else {
        this.$message({ message: '请填写卡数量', type: 'warning' })
      }

    },

    erAuth () {  //权限匹配
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
                if (arr[i].name == '保险客户卡密') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '发放卡密' && arr[i].name == '保险客户卡密') {
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
    this.erAuth();
    this.getProvince()
  },
}
</script>
<style scoped>
.photo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.search {
  margin: 20px 50px;
}
.main {
  padding: 0 50px;
}
.main:after {
  display: block;
  content: "";
  clear: both;
}
.main > div {
  float: left;
}
.main_item {
  width: 70%;
}
.main_item .el-checkbox {
  line-height: 50px;
}
.main_item .el-col-1 {
  width: 2%;
}
.main_item .el-col-offset-1 {
  margin-left: 2%;
}
.main_item .el-col {
  text-align: center;
}
.main_item-title {
  text-align: center;
}
.main_area {
  width: 15%;
}
.main_city {
  margin: 10px 0;
  font-size: 16px;
  cursor: pointer;
}
.main_confirm {
  float: right;
  margin-top: 20px;
}
.activeClass {
  color: #04bbfc;
}
.clear-border {
  border-bottom: 1px solid #ccc;
}

.clear-border >>> input {
  border: none !important;
}
.addChannel {
  margin-left: 20px;
}
</style>
-