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
          <i></i>系统设置-免费保养设置-领卡渠道
          <el-button type="primary"
                     style="float:right;margin:20px 40px 0 0"
                     @click="addVisible=true,state=1,openAdd(true)">添加</el-button>
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
      <div style="margin-left:20px">
        <el-select v-model="province"
                   placeholder="请选择所查询的地区"
                   @change="page=1,init()">
          <el-option value="1"
                     label="全国">全国</el-option>
          <el-option v-for="(item,index) in provinceList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </div>
      <el-table :data="list">
        <!-- <el-table-column label="图片"
                         align="center">
          <template slot-scope="scope">
            <img :src="scope.row.photo"
                 class="img">
          </template>
        </el-table-column> -->
        <el-table-column align="center"
                         prop="company"
                         label="名称">

        </el-table-column>
        <!-- <el-table-column label="类型"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.type==1 ? '五折养护' : '单次免费'}}
          </template>
        </el-table-column> -->
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
                         prop="create_time"
                         label="创建时间">

        </el-table-column>
        <el-table-column label="操作/是否显示"
                         align="center">
          <template slot-scope="scope">
            <el-switch :active-value='1'
                       :inactive-value='2'
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       v-model="scope.row.status"
                       @change='Setup(scope.row)'>

            </el-switch>
            <el-button type="primary"
                       size="mini"
                       style="margin-left:10px"
                       @click="addVisible=true,state=2,defaultData(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>
    <el-dialog center
               :title="state==1 ? '添加': '修改'"
               :visible.sync="addVisible"
               @close='()=>{
                   $refs.form.resetFields();
                   isIndeterminate = false;
                   listQuery.provinceID =[];
                   cityChecked = [],
                   checkAll=false
               }'>
      <el-form label-width="100px"
               :model="listQuery"
               :rules="rules"
               ref="form">
        <el-form-item label="名称:"
                      prop="company">
          <el-input placeholder="请输出名称"
                    class="input"
                    v-model="listQuery.company" />
        </el-form-item>
        <el-form-item prop="type_channel"
                      label="显示类型:">
          <el-radio-group v-model="listQuery.type_channel">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="1">保险公司</el-radio>
            <el-radio :label="2">领卡渠道</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型:"
                      prop="type">
          <el-radio v-model="listQuery.type"
                    :label="1">五折养护</el-radio>
          <el-radio v-model="listQuery.type"
                    :label="2">单次免费</el-radio>
        </el-form-item>
        <el-form-item label="地区:"
                      prop="provinceID">
          <el-checkbox :indeterminate="isIndeterminate"
                       v-model="checkAll"
                       @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>

          <el-checkbox v-for="(item,index) in provinceList"
                       style="width:70px"
                       :label="item.id"
                       :key="item.id"
                       v-model="listQuery.provinceID"
                       :indeterminate="item.isIndeterminate"
                       @change="((val,$event)=>handleCheckedCitiesChange(val,$event,index))">
            <p @click.prevent="getCity(item.id,index,$event)">
              {{item.name}}
            </p>

          </el-checkbox>

        </el-form-item>
        <!-- <el-form-item label="图片:"
                      prop="photo">
          <el-upload :action="`${uploadUrl}admin/SystemSetup/uploadPic`"
                     list-type="picture-card"
                     :on-success='handleSuccess'
                     :data="{token:token}"
                     :file-list="listQuery.photo  ?  [{url:listQuery.photo}] : []"
                     name="image"
                     :limit='1'>

            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
                     @click="state==1? add() : Modify()"
                     :loading="loading">{{state==1 ? '添加' : '修改'}}</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="市详情"
                 :visible.sync="cityVisible"
                 append-to-body
                 center
                 width="40%"
                 style="min-height:300px !important">
        <div style="margin:0 auto;width:78%">
          <el-checkbox :indeterminate="cityIsIndeterminate"
                       v-model="cityCheckAll"
                       @change="cityCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox v-for="(item,index) in cityList"
                       :key="item.id"
                       :label="item.id"
                       v-model="cityChecked"
                       style="margin-bottom:20px;width:150px"
                       @change="((value,$event)=>cityChange(value,$event,index))">
            {{item.name}}
          </el-checkbox>
        </div>

      </el-dialog>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { getPro, GET_City } from '@/utils/index'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 0,
      pageCount: 0,
      authList: [],
      uploadUrl: this.baseURL,
      threeAuthList: [],
      addVisible: false,
      loading: false,
      province: '',
      listQuery: {
        company: '',
        type_channel: 2,
        type: 2,
        // photo: '',
        provinceID: [],
      },
      state: 1, // 1 添加 2 修改
      provinceList: [],
      isIndeterminate: false,  //省是否全选中
      checkAll: false,
      rules: {
        company: { required: true, message: '名称不能为空', trigger: 'blur' },
        type: { required: true, message: '请选择类型', trigger: 'blur' },
        // photo: { required: true, message: '请上传图片', trigger: 'blur' },
        provinceID: { required: true, message: '请选择区域', trigger: 'blur' },
        type_channel: { required: true, message: '请选择显示类型', trigger: 'blur' }
      },
      cityList: [], //市列表
      cityVisible: false, //是否显示市详情 默认不显示
      cityIsIndeterminate: false,
      cityCheckAll: false,
      cityChecked: [],
      provinceID: [],//所有省id
      cityID: [], //所有市id
      provinceIndex: 0, //当前选中的省下标
      currentCity: [],  //当前选择省下面的市
    }
  },

  computed: {
    isAllChecked () {
      let provinceLength = this.provinceList.length;   //所有的省长度
      let provinceCheckedLength = this.listQuery.provinceID.length  //当前选中的省长度
      let cityCheckedLength = this.cityChecked.length;  //当前选中的市长度
      let city = []
      this.provinceList.forEach(item => {
        item.city.forEach(v => {
          city.push(v)
        })
      })
      return provinceLength == provinceCheckedLength && city.length == cityCheckedLength
    }
  },


  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      let [list, getAreaList] = await Promise.all([this.getList(), this.getArea()])
      this.list = list.data.data.list || []
      this.pageCount = list.data.data.rows || 1;
      this.provinceList = getAreaList || []
    },
    async getList () {
      return await this.$axios.post('admin/SystemSetup/systemLists', { token: this.token, page: this.page, province: this.province })
    },
    async openAdd (checked, defaultData) {  //获取全部省
      this.provinceList = this.areaWhetherChecked(true)
      this.checkAll = checked
    },
    getArea () {    //获取地区
      return new Promise(async (resolve, reject) => {
        try {
          let data = await getPro();
          data.forEach(async (item, index) => {
            let city = await GET_City(item.id)
            city.forEach(v => {
              v = Object.assign(v)
            })
            item = Object.assign(item, { city: city })
          })
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
    },
    areaWhetherChecked (checked) {   //checked 是否全选
      let provinceList = this.provinceList
      provinceList.forEach(item => {
        item = Object.assign(item, { checked: checked });
        item.city.forEach(v => {
          v = Object.assign(v, { checked: checked })
          if (checked) {
            this.cityChecked.push(v.id)
          }
        })
        if (checked) {
          this.listQuery.provinceID.push(item.id)
        }
      })
      return provinceList;
    },


    defaultData (row) {  //修改       默认数据
      this.areaWhetherChecked(false)
      let province = row.province;
      let provinceID = [];
      let cityID = []
      Object.keys(province).forEach(key => {   //获取需要默认选中的id
        let province_id = province[key].province_id;
        let city_id = province[key].city_id
        if (province_id) {
          provinceID.push(province_id)
        }
        if (city_id) {
          cityID.push(...city_id)
        }
      })
      let provinceList = this.provinceList
      provinceList.forEach(item => {   //根据选中的id匹配 进行设置选中
        provinceID.forEach(v => {
          if (item.id == v) {
            item.checked = true
          }
        })
        item.city.forEach(v => {
          cityID.forEach(e => {
            if (v.id == e) {
              v.checked = true
            }
          })
        })
      })
      this.provinceList = provinceList  //重新渲染
      let { provinceCheckedID, cityCheckedId } = this.getAreaCheckedID();   //获取选中的省id 和选中的市id
      this.$nextTick(() => {
        this.listQuery = Object.assign(this.listQuery, { company: row.company, type: row.type, photo: row.photo, provinceID: provinceCheckedID, id: row.id, type_channel: row.type_channel })   //设置省默认选中状态
      })
      this.cityChecked = cityCheckedId  //设置市默认选中状态
      this.isIndeterminate = provinceCheckedID.length < this.provinceList.length && provinceCheckedID.length > 0
      this.checkAll = provinceID.length == this.provinceList.length;
    },


    handleCheckAllChange (val) {  //地区全选功能
      let provinceList = [];
      let provinceID = []
      this.provinceList.forEach((el, index) => {  //获取所有省id  
        this.provinceList[index].checked = val;
        el.city.forEach((item, i) => {
          this.provinceList[index].city[i].checked = this.checkAll
        })
        provinceID.push(el.id)
      });
      let { provinceCheckedID, cityCheckedId } = this.getAreaCheckedID();
      this.listQuery.provinceID = provinceCheckedID;
      this.cityChecked = cityCheckedId
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (v, e, index) {   //当前省操作  v 代表当时省是否选中  e event对象  index 当前省的下标
      this.provinceList[index].checked = v      // 设置当前的省的选中状态
      let length = this.listQuery.provinceID.length;   //当前省选中的长度
      this.provinceList[index].city.forEach((item, i) => {
        this.provinceList[index].city[i].checked = v
      })
      let { cityCheckedId } = this.getAreaCheckedID();
      this.cityChecked = cityCheckedId  //市默认选中状态
      this.isIndeterminate = length < this.provinceList.length && length > 0;      //判断当前省选中的长度是否小于当前省的长度并且当前选中省的长度大于0  如果条件成立设置全选的按钮的状态
      console.log(length)
      this.checkAll = length == this.provinceList.length     //当前选中省的长度如果等于当前省的长度, 省全选按钮勾选

    },

    //获取市
    async getCity (id, index, e) {
      this.provinceIndex = index //当前选择的省下标
      this.currentCity = this.provinceList[index].city   //当前省下面的市
      this.cityVisible = true;   //是否显示市详情弹框
      this.cityList = this.provinceList[index].city   //获取当前市
      let currentCityLength = this.currentCity.length;    //当前市的长度
      let { cityCheckedId } = this.getAreaCheckedID();   //获取已选中市的id
      this.cityChecked = cityCheckedId    //设置市默认选中状态
      let cityCheckedLength = this.cityCheckedLength(this.currentCity)    //当前市选中的长度
      this.cityCheckAll = this.provinceList[index].checked ? cityCheckedLength == currentCityLength : false  //用当前市和当前选中市进行判断如果当前市的长度不等于当前选中的市的长度,则市全选不勾选,  相反如果等于全选按钮勾选


    },

    cityCheckedLength (currentCity) {    //当前选中的市的长度
      return currentCity.filter(item => item.checked).length;
    },

    // 市全选操作
    cityCheckAllChange (val) {  //市 是否全选  val表示是否全选
      let provinceIndex = this.provinceIndex     //获取当前选中省的下标
      let cityID = []
      this.provinceList[provinceIndex].city.forEach((item, index) => {
        this.provinceList[provinceIndex].city[index].checked = val    //如果var等于true表示全选,把当前选中省下面的所有市改成选中状态,相反则改成非选中状态
        cityID.push(item.id)
      })
      this.provinceList[provinceIndex].checked = val
      let { provinceCheckedID, cityCheckedId } = this.getAreaCheckedID();   //获取当前选中市
      this.listQuery.provinceID = provinceCheckedID
      this.cityChecked = val ? this.provinceList[provinceIndex].checked ? cityCheckedId : cityID : []   //默认市的选中

      this.isIndeterminate = provinceCheckedID.length < this.provinceList.length && provinceCheckedID.length > 0


    },

    getAreaCheckedID () {  //获取选中的省id和市id
      let provinceCheckedID = [];
      let cityCheckedId = []
      this.provinceList.forEach(item => {
        if (item.checked) {  //当前省是否选择
          item.city.forEach(v => {
            if (v.checked) {  //当前市是否选中
              cityCheckedId.push(v.id)  //获取当前选中的市id
            }
          })
          provinceCheckedID.push(item.id)   //获取当前选中的省id
        }
      })

      return {
        provinceCheckedID,
        cityCheckedId
      }
    },
    //当前市的操作
    cityChange (v, e, index) { // v:当前市是否被选中 e:event对象
      this.cityList[index].checked = v;
      let cityCheckedLength = this.cityCheckedLength(this.currentCity);
      this.cityCheckAll = cityCheckedLength == this.currentCity.length;
      console.log(cityCheckedLength)

      this.provinceList[this.provinceIndex].checked = cityCheckedLength == 0 ? false : true

      let { provinceCheckedID } = this.getAreaCheckedID();
      this.listQuery.provinceID = provinceCheckedID;
      console.log(cityCheckedLength, 'cityCheckedLength', '-----', this.currentCity.length)
      this.isIndeterminate = cityCheckedLength < this.currentCity.length && cityCheckedLength > 0

    },
    handleSuccess (res) {  //上传成功
      this.listQuery = Object.assign({}, this.listQuery, { photo: res })
    },
    add () {  //添加
      console.log(this.isAllChecked)
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            let data = (({ company, type, photo, type_channel }) => ({ company, type, photo, type_channel }))(this.listQuery);
            let province = this.cityChecked && this.cityChecked.length > 0 ? this.cityChecked.join(',') : ''
            const res = await this.$axios.post('admin/SystemSetup/addGenre', Object.assign({}, data, { token: this.token, types: 1, province: this.isAllChecked ? 1 : province }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.addVisible = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.loading = false
            throw (error)
          }
        }
      })
    },
    //修改
    Modify () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            let data = (({ company, type, photo, id, type_channel }) => ({ company, type, photo, id, type_channel }))(this.listQuery);
            let province = this.cityChecked && this.cityChecked.length > 0 ? this.cityChecked.join(',') : []
            const res = await this.$axios.post('admin/SystemSetup/updateInfo', Object.assign({}, data, { token: this.token, types: 1, province: this.isAllChecked ? 1 : province }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.addVisible = false
              this.init()
            } else {
              this.$message.error(res.data.msg)
            }
          } catch (error) {
            this.loading = false
            throw (error)
          }
        }
      })
    },
    //设置 显示 隐藏
    async Setup (row) {
      try {
        const res = await this.$axios.post('admin/SystemSetup/updateStatus', { token: this.token, id: row.id, status: row.status })
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
                if (arr[i].name == '免费保养设置') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '领卡渠道' && arr[i].name == '免费保养设置') {
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
    this.init();
  },
}
</script>
<style scoped>
.ellipsis {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
.img {
  width: 70px;
  height: 70px;
}
.input {
  width: 50%;
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

>>> .el-dialog {
  min-height: 300px;
}
</style>
