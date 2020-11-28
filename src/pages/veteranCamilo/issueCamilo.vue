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
          <i></i>系统设置-致敬老兵卡密
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
                   @click="addChannelVisible=true,status=0,addVeteran()"
                   :disabled="!(cityList&&cityList.length>0)">添加老兵</el-button>
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

            <el-table-column label="图片"
                             align='center'>
              <template slot-scope="scope">
                <img :src="scope.row.photo"
                     class="photo" />
              </template>
            </el-table-column>
            <el-table-column label="名称"
                             align="center">
              <template slot-scope="scope">
                {{scope.row.company}}

              </template>
            </el-table-column>

            <el-table-column label="卡数量"
                             align="center">
              <template slot-scope="scope">
                <el-input placeholder="请输入卡数量"
                          v-model="scope.row.card_num" />
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
                <!-- <el-button type="danger"
                           size="small"
                           @click="remove(scope.row)">删除</el-button> -->
                <el-button type="primary"
                           size="small"
                           @click="status=1,Modify(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary"
                     v-if="list && list.length>0"
                     class="main_confirm"
                     @click="addCardNum()">添加</el-button>
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
      <el-dialog :title="status==0 ? '添加老兵' : '修改老兵'"
                 center
                 :visible.sync="addChannelVisible"
                 width="30%"
                 @close='()=>$refs.channelForm.resetFields()'>
        <el-form label-width="120px"
                 style="width:80%"
                 :model="channelList"
                 :rules="channelRules"
                 ref="channelForm">
          <el-form-item label="名称"
                        prop="name">
            <!-- <el-input placeholder="请输入名称"
                      v-model="channelList.name"
                      :disabled="status==1"
                      v-if="status==1" />
            <el-autocomplete class="inline-input"
                             v-model="channelList.name"
                             :fetch-suggestions="querySearch"
                             @select="handleSelect"
                             placeholder="请输入名称"
                             v-else
                             style="width:100%"></el-autocomplete> -->
            <el-input placeholder="请输入名称"
                      v-model="channelList.name"
                      :disabled="true" />
          </el-form-item>
          <el-form-item label="卡数量"
                        prop="num">
            <el-input placeholder="请输入卡数量"
                      v-model="channelList.num"
                      :disabled="status==1" />
          </el-form-item>

          <el-form-item label="图片:"
                        prop="photo">
            <el-upload :action='baseURL+"admin/Prize/cbImg"'
                       :disabled='status==0'
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
        photo: '',  //保险公司图片

      },
      channelRules: { //添加渠道form规则验证
        name: { required: true, message: '请输入渠道名称', trigger: 'blur' },
        num: { required: true, message: '请输入添加的卡数量', trigger: 'blur' },
        photo: { required: true, message: '请上传保险公司图片', trigger: 'blur' },

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
    }
  },
  methods: {
    async getCompanyList (id) {
      try {
        const res = await this.$axios.post('admin/ChannelSetCity/oldList', { token: this.token, city_id: id })
        let data = res.data.data.city_list || []
        data.forEach(item => {
          item = Object.assign(item, { card_num: '' })
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
    // async querySearch (queryString, cb) {  //关键字搜索
    //   try {
    //     let city_id = this.cityList[this.acitivIndex].id //市id
    //     const res = await this.$axios.post('admin/GroupSetCity/searchList', { token: this.token, city_id: city_id })
    //     let restaurants = res.data.data || []   //获取所有关键字
    //     let results = [] //搜索的关键字
    //     let fiterData = queryString ? restaurants.filter(item => item.company.includes(queryString)) : []  //匹配关键字
    //     fiterData.map(item => { //改变数组对象的Key值 
    //       results.push({ value: item.company, photo: item.photo })
    //     })
    //     return cb(results)
    //   } catch (error) {
    //     this.$message.error('接口报错请检查')
    //     throw (error)
    //   }
    // },
    // handleSelect (item) {  //当前选中的关键字
    //   this.channelList.photo = item && item.photo ? item.photo : ''   //选中当前的关键字 拿取当前的图片
    // },
    async addVeteran () {     //获取默认老兵
      try {
        const res = await this.$axios.post('admin/ChannelSetCity/oldSearchList', { token: this.token })
        this.channelList.name = res.data.data.company || ''
        this.channelList.photo = res.data.data.photo || ''
      } catch (error) {
        throw (error)
      }
    },
    addChannel () {  //添加老兵
      console.log(this.channelList)
      this.$refs.channelForm.validate(async valid => {
        if (valid) {
          try {
            let id = this.cityList[this.acitivIndex] && this.cityList[this.acitivIndex].id
            this.channelLoaading = true
            const res = await this.$axios.post('admin/ChannelSetCity/oldtopAdd', Object.assign(this.channelList, { token: this.token, city_id: id }))
            this.channelLoaading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: "success" })
              this.addChannelVisible = false

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
    async addCardNum () {  //列表中添加卡数量
      try {
        let { city_id, id, card_num } = this.list && this.list[0]    // city_id 市id  id 老兵id card_num 卡数量
        const res = await this.$axios.post('admin/ChannelSetCity/oldCreateCode', { token: this.token, city_id: city_id, channel_id: id, num: card_num })
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.getCompanyList(city_id)
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        throw (error)
      }
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
    async ModifyImg () {  //修改老兵
      try {
        let id = this.cityList[this.acitivIndex] && this.cityList[this.acitivIndex].id
        this.channelLoaading = true
        const res = await this.$axios.post('admin/ChannelSetCity/updImg', { token: this.token, channel_id: this.channelList.id, photo: this.channelList.photo })
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
    // async addCityChannel () {
    //   try {
    //     const res = await this.$axios.post('admin/GroupSetCity/channelCityAdd', { token: this.token, data: this.CheckedChannel, city_id: this.currentCity })
    //     if (res.data.code == 1) {
    //       this.$message({ message: res.data.msg, type: 'success' })
    //       this.init()
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   } catch (error) {
    //     throw (error)
    //   }
    // },
    handleSelectionChange (val) {  //获取选中的保险公司
      let checkedCompany = val.map((v) => {
        return Object.assign(v, { month: '' })
      })
      this.checkedCompany = checkedCompany
    },
    changeCity (id) {  //获取市
      this.init()
    },
    // remove (item) {  //删除保险公司
    //   this.$confirm('此操作将删除该保险公司, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(async () => {
    //     try {
    //       const res = await this.$axios.post('admin/GroupSetCity/setStatus', { token: this.token, city_id: item.city_id, channel_id: item.id })
    //       if (res.data.msg) {
    //         this.$message({ message: res.data.msg, type: "success" })
    //         this.getCompanyList(item.city_id)
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     } catch (error) {
    //       throw (error)
    //     }
    //   }).catch(() => { });
    // },
    monthChange (e) {

    },
    Export () {  //导出
      let data = [];
      let required = false
      this.checkedCompany.forEach((item, index) => {
        data.push({ city_id: item.city_id, channel_id: item.id, card_num: item.card_num, month: item.month })
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