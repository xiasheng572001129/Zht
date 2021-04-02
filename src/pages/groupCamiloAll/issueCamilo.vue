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
          <i></i>系统设置-集团客户卡密-发放卡密
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

        <el-button type="primary"
                   class="addChannel"
                   @click="addChannelVisible=true,status=0">添加单位</el-button>
      </div>
      <div class="main">

        <el-table :data="list"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column label="单位图片"
                           align='center'>
            <template slot-scope="scope">
              <img :src="scope.row.photo"
                   class="photo" />
            </template>
          </el-table-column>
          <el-table-column label="单位"
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
              {{scope.row.total_num || 0}}张
            </template>
          </el-table-column>
          <el-table-column label="消耗数量"
                           align="center"
                           prop="num">
            <template slot-scope="scope">
              {{scope.row.consume_total ||0}}张
            </template>
          </el-table-column>
          <el-table-column label="剩余数量"
                           align="center"
                           prop="num">
            <template slot-scope="scope">
              {{scope.row.sur_num || 0}}张
            </template>
          </el-table-column>
			<el-table-column label="滤芯费" align="center">
					<template slot-scope='scope'>
							   {{scope.row.if_filter==1 ? 0 : scope.row.filter_price}}
						</template>
			</el-table-column>
			<el-table-column label="工时费" align="center">
					<template slot-scope='scope'>
							   {{scope.row.if_hour==1 ? 0 : scope.row.hour_price}}
						</template>
			</el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <el-button type="danger"
                         size="small"
                         @click="remove(scope.row)">删除</el-button>
              <el-button type="primary"
                         size="small"
                         @click="status=1,Modify(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary"
                   v-if="checkedCompany && checkedCompany.length>0"
                   class="main_confirm"
                   @click="Export()">导出</el-button>
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
          <el-form-item label="单位名称"
                        prop="name">
            <el-input placeholder="请输入单位名称"
                      v-model="channelList.name"
                      :disabled="status==1"
                      v-if="status==1" />
            <el-autocomplete class="inline-input"
                             v-model="channelList.name"
                             :fetch-suggestions="querySearch"
                             @select="handleSelect"
                             placeholder="请输入单位名称"
                             v-else
                             style="width:100%"></el-autocomplete>
          </el-form-item>
          <el-form-item label="卡数量"
                        prop="num">
            <el-input placeholder="请输入卡数量"
                      v-model="channelList.num"
                      :disabled="status==1" />
          </el-form-item>
		  <el-form-item label="滤芯费" required>
			         <el-form-item prop="if_filter">
						 <el-radio-group v-model="channelList.if_filter" :disabled="status==1">
						 	 <el-radio :label="1">无</el-radio>
						 	 <el-radio :label="2">有</el-radio>
						 </el-radio-group>
					 </el-form-item>
			          <el-form-item prop="filter_price" v-if="channelList.if_filter==2">
						  <el-input  placeholder="请填写工时费" v-model="channelList.filter_price" :disabled="status==1"></el-input>
					  </el-form-item>
					
		  </el-form-item>
		  <el-form-item label="工时费" required>
		  			         <el-form-item prop="if_hour">
		  						 <el-radio-group v-model="channelList.if_hour " :disabled="status==1">
		  						 	 <el-radio :label="1">无</el-radio>
		  						 	 <el-radio :label="2">有</el-radio>
		  						 </el-radio-group>
		  					 </el-form-item>
		  			          <el-form-item prop="hour_price" v-if="channelList.if_hour==2">
		  						  <el-input  placeholder="请填写工时费" v-model="channelList.hour_price" :disabled="status==1"></el-input>
		  					  </el-form-item>
		  					
		  </el-form-item>
          <el-form-item label="过期时间"
                        prop="month">
            <el-select v-model="channelList.month" :disabled="status==1">
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
        photo: '',  //保险公司图片
        month: '12月', //过期时间
		if_filter:1,  //是否有滤芯费 1 无  2 有
		filter_price:'', //；滤芯费
		if_hour:1, //是否有工时费 1 无 2 有
		hour_price:'', //工时费
      },
      channelRules: { //添加渠道form规则验证
        name: { required: true, message: '请输入渠道名称', trigger: 'blur' },
        num: { required: true, message: '请输入添加的卡数量', trigger: 'blur' },
        photo: { required: true, message: '请上传保险公司图片', trigger: 'blur' },
        month: { required: true, message: '请选择过期时间', trigger: 'blur' },
		if_filter:{required:true,message:'请选择是否有滤芯费',trigger:'blur'},
		filter_price:{required:true,message:'请输入滤芯费',trigger:'blur'},
		if_hour:{required:true,message:'请选择是否有工时费',trigger:'blur'},
		hour_price:{required:true,message:'请输入工时费',trigger:'blur'},
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
    async init () {
      try {
        const res = await this.$axios.post('admin/GroupSetCity/allGroupList', { token: this.token, page: this.page })
         let data = res.data.data.list || []
         data.forEach(item => {
            item = Object.assign(item, { month:'12月' })
         })
         this.list = data || []
         this.pageCount = res.data.data.rows || 1
      } catch (error) {
        this.$message.error('接口报错,请检查')  
        throw(error)
      }
    },
    async querySearch (queryString, cb) {  //关键字搜索
      try {
        const res = await this.$axios.post('admin/GroupSetCity/searchList', { token: this.token })
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
    addChannel () {  //添加单位
      this.$refs.channelForm.validate(async valid => {
        if (valid) {
          try {
            this.channelLoaading = true
			let {filter_price,hour_price} = {   // filter_price  滤芯费     hour_price 工时费
				filter_price:this.channelList.if_filter==1 ? 0 :this.channelList.filter_price,  //if_filter 是否有滤芯费 如果没有默认为0
				hour_price: this.channelList.if_hour ==1 ? 0 :this.channelList.hour_price   //hour_price 是否有工时费 如果没有默认为0
			}
            const res = await this.$axios.post('admin/GroupSetCity/allChannelAdd', Object.assign(this.channelList, { token: this.token,filter_price:filter_price,hour_price:hour_price }))
            this.channelLoaading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: "success" })
              this.addChannelVisible = false
              window.location.href = `${this.baseURL}admin/Export/freeCode?id=${res.data.data}&name=${this.channelList.name}&num=${this.channelList.num}&month=${parseInt(this.channelList.month)}`
              this.init()
            } else {
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
    async ModifyImg () { //修改
      try {
        this.channelLoaading = true
		let {filter_price,hour_price} = {   // filter_price  滤芯费     hour_price 工时费
			filter_price:this.channelList.if_filter==1 ? 0 :this.channelList.filter_price,  //if_filter 是否有滤芯费 如果没有默认为0
			hour_price: this.channelList.if_hour ==1 ? 0 :this.channelList.hour_price   //hour_price 是否有工时费 如果没有默认为0
		}
        const res = await this.$axios.post('admin/GroupSetCity/updImg', { token: this.token, photo: this.channelList.photo, channel_id: this.channelList.id,filter_price:filter_price,hour_price:hour_price,if_filter:this.channelList.if_filter,if_hour:this.channelList.if_hour })
        this.channelLoaading = false
        if (res.data.code == 1) {
          this.$message({ message: res.data.msg, type: "success" })
          this.addChannelVisible = false
          this.init()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.channelLoaading = false
        throw (error)
      }
    },

    handleSelectionChange (val) {  //获取选中的保险公司
      let checkedCompany = val.map((v) => {
        return Object.assign(v, { month: v.month ? v.month : '12月' })
      })
      this.checkedCompany = checkedCompany
    },
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
          const res = await this.$axios.post('admin/GroupSetCity/setStatus', { token: this.token, channel_id: item.id })
          if (res.data.msg) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init(item.city_id)
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          throw (error)
        }
      }).catch(() => { });
    },

    Export () {  //导出
      let data = [];
      let required = false
      this.list.forEach((item, index) => {
        console.log(item)
        data.push({ channel_id: item.id, card_num: item.card_num, month: parseInt(item.month), city_id: 0 })
        if (item.card_num) {
          required = true
        } else {
          required = false
        }
      })
      if (required) {  //必须填写卡数量
        // this.getCompanyList(this.cityList[this.acitivIndex].id)
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
                if (arr[i].name == '集团客户卡密') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '发放卡密' && arr[i].name == '集团客户卡密') {
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
    this.init()
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