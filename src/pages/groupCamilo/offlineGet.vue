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
          <i></i>系统设置-集团客户卡密-线上领取
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
        <el-date-picker type="month"
                        placeholder="选择月份"
                        v-model="month"
                        @change="()=>{page=1,init()}"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-button type="primary"
                   class="addChannel"
                   @click="addChannelVisible=true,status=0">添加单位</el-button>

      </div>
      <el-table :data="list">
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

        <el-table-column label="总卡数"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.total_num}}张
          </template>
        </el-table-column>
        <el-table-column label="消耗数量"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.consume_total}}张
          </template>
        </el-table-column>
        <el-table-column label="剩余数量"
                         align="center">
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
            <el-button type="primary"
                       size="small"
                       @click="status=1,Modify(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                      :disabled="true" />
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
      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="(e)=>{
                    page=e,
                    init()
                }"></paging>
        <!--分页的组件-->
      </div>
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
      list: [], //保险公司列表
      provinceList: [], //省列表
      currentProvince: '',//当前选中的省
      cityList: [], //市列表
      currentCity: '', //当前选中的市
      addChannelVisible: false, //添加渠道弹框显示状态
      channelList: {  //添加保险公司数据
        name: '', //渠道名称
        num: '500', //卡数量
        photo: '',  //保险公司图片
      },
      channelRules: { //添加保险公司form规则验证
        name: { required: true, message: '请输入渠道名称', trigger: 'blur' },
        num: { required: true, message: '请输入添加的卡数量', trigger: 'blur' },
        photo: { required: true, message: '请上传保险公司图片', trigger: 'blur' },
      },
      channelLoaading: false, //添加保险公司loading
      acitivIndex: 0,
      checkedCompany: [],  //当前勾选的保险公司
      status: 0,   //0 是添加保险公司 1是修改保险公司
      month: '', //月份
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
    },
    dateTime () {
      const dateTime = new Date(this.month)
      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      return this.month ? `${year}-${month}` : ''
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
        const res = await this.$axios.post('admin/ChannelSetCity/downList', { token: this.token, page: this.page, month: this.dateTime })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows || 0
      } catch (error) {
        throw (error)
      }

    },
    async querySearch (queryString, cb) {  //关键字搜索
      try {
        const res = await this.$axios.post('admin/ChannelSetCity/searchList', { token: this.token, city_id: 0, types: 1 })
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
      this.$refs.channelForm.validate(async valid => {
        if (valid) {
          try {
            let id = this.cityList[this.acitivIndex] && this.cityList[this.acitivIndex].id
            this.channelLoaading = true
            const res = await this.$axios.post('admin/ChannelSetCity/topAdd', Object.assign(this.channelList, { token: this.token, types: 1 }))
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
    async ModifyImg () {  //修改
      try {
        this.channelLoaading = true
        const res = await this.$axios.post('admin/ChannelSetCity/updImg', { token: this.token, channel_id: this.channelList.id, photo: this.channelList.photo })
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
    remove (item) {  //删除保险公司
      this.$confirm('此操作将删除该保险公司, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.$axios.post('admin/ChannelSetCity/setStatus', { token: this.token, channel_id: item.id, types: 1 })
          if (res.data.msg) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          throw (error)
        }
      }).catch(() => { });
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
                  if (arr[i].son[j].name == '线上领取' && arr[i].name == '集团客户卡密') {
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
