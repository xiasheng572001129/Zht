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
                     :label="item.label"
                     :value="item.id"></el-option>
        </el-select>
      </div>
      <el-table :data="list"
                v-loading="tableLoading">
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
        <el-table-column label="渠道类型"
                         align="center"
                         prop="channel_type_name">

        </el-table-column>
        <el-table-column align="center"
                         prop="num"
                         label="生成数量/次">
        </el-table-column>
        <el-table-column align="center"
                         prop="sur_num"
                         label="剩余数量">
        </el-table-column>
        <el-table-column align="center"
                         label="激活码详情">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="codeDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
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
                  <span style="float:left;width:80%;">
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
                         align="center"
                         min-width="140px">
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
            <el-button type="primary"
                       size="mini"
                       @click="createCode(scope.row,scope.$index)"
                       :loading="codeLoading[scope.$index]"
                       :disabled="scope.row.sur_num >0">生成激活码</el-button>
            <el-button type="primary"
                       size="mini"
                       @click="exportCode(scope.row,true)"
                       :loading="exportLoading[scope.$index]">导出</el-button>
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
                   $refs.tree.setCheckedKeys([]);
                   cardNum="";
                   remainingNum=""
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
        <!-- <el-form-item prop="type_channel"
                      label="显示类型:">
          <el-radio-group v-model="listQuery.type_channel">
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
        <el-form-item label="联系电话"
                      prop="phone">
          <el-input class="input"
                    v-model="listQuery.phone"
                    placeholder="请输入联系电话" />
        </el-form-item> -->
        <el-form-item :label="state==1 ? '卡数量' : '消耗数量'"
                      prop="num">
          <span v-if="state!=1">
            {{cardNum-remainingNum}}
            +

          </span>
          <el-input class="input"
                    v-model="listQuery.num"
                    placeholder="请输入卡数量" />
        </el-form-item>
        <!-- <el-form-item label="地址"
                      required>
          <el-col :span="5">
            <el-form-item prop="province_name">
              <el-select v-model="listQuery.province_name"
                         placeholder="请选择省"
                         @change="provinceChange">
                <el-option v-for="(item,index) in provinceList"
                           :key="index"
                           :value="item.label"
                           :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line"
                  style="text-align:center"
                  :span="1">-</el-col>
          <el-col :span="5">
            <el-form-item prop="city">
              <el-select v-model="listQuery.city"
                         placeholder="请选择市"
                         @change="cityChange">
                <el-option v-for="(item,index) in cityList"
                           :key="index"
                           :value="item.label"
                           :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col class="line"
                  style="text-align:center"
                  :span="1">-</el-col>
          <el-col :span="5">
            <el-form-item prop="county">
              <el-select v-model="listQuery.county"
                         placeholder="请选择区/县">
                <el-option v-for="(item,index) in countyList"
                           :key="index"
                           :value="item.name"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-form-item>
        <el-form-item label="详细地址"
                      prop="address">
          <el-input class="input"
                    v-model="listQuery.address"
                    placeholder="请输入详细地址" />
        </el-form-item> -->
        <el-form-item label="地区">
          <div>
            <el-checkbox v-model="checkAll"
                         @change="checkAllChange">全选</el-checkbox>
          </div>
          <el-tree :data="provinceList"
                   show-checkbox
                   node-key="id"
                   ref="tree"
                   :default-checked-keys="defaultAll"
                   props=""
                   @check='treeCheck'>
          </el-tree>
        </el-form-item>
        <!-- <el-form-item label="地区:"
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

        </el-form-item> -->
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
    </el-dialog>
    <el-dialog title="激活码详情"
               center
               :visible.sync="codeVisible">
      <el-table :data="codeList">
        <el-table-column label="用户名称"
                         prop="name"
                         align="center"></el-table-column>
        <el-table-column label="联系电话"
                         prop="phone"
                         align="center"></el-table-column>
        <el-table-column label="维修厂名称"
                         prop="company"
                         align="center"></el-table-column>
        <el-table-column label="激活码"
                         prop="code"
                         align="center"></el-table-column>
        <el-table-column label="状态"
                         align="center">
          <template>
            已使用
          </template>
        </el-table-column>
      </el-table>
      <div class="page_center">
        <paging :page-count="codePageCount"
                :page="codePage"
                @index="(e)=>{
                    codePage = e;
                    codeDetails(currentCode)
                }"></paging>

      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { getPro, GET_City, get_County, AccordingName_findID } from '@/utils/index'
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
      tableLoading: false,
      loading: false,
      province: '',
      listQuery: {
        company: '',
        type_channel: 2,
        type: 2,
        phone: '', //联系电话
        num: 500, //卡数量
        // province_name: '',
        // city: '',
        // county: '',
        // address: "",
        // photo: '',
        provinceID: [],
      },
      state: 1, // 1 添加 2 修改
      provinceList: [],
      isIndeterminate: false,  //省是否全选中
      checkAll: false,
      rules: {
        company: { required: true, message: '名称不能为空', trigger: 'blur' },
        // type: { required: true, message: '请选择类型', trigger: 'blur' },
        // photo: { required: true, message: '请上传图片', trigger: 'blur' },
        // provinceID: { required: true, message: '请选择区域', trigger: 'blur' },
        // type_channel: { required: true, message: '请选择显示类型', trigger: 'blur' },
        // phone: { required: true, message: '联系电话不能为空', trigger: 'blur' },
        num: { required: true, message: '卡数量不能为空', trigger: 'blur' },
        // province_name: { required: true, message: '省不能为空', trigger: 'blur' },
        // city: { required: true, message: '市不能为空', trigger: 'blur' },
        // county: { required: true, message: '区/县不能为空', trigger: 'blur' },
        // address: { required: true, message: '详细地址不能为空', trigger: 'blur' },
      },
      cityList: [], //市列表
      cityVisible: false, //是否显示市详情 默认不显示
      cityIsIndeterminate: false,
      cityCheckAll: false,
      cityChecked: [],
      provinceID: [],//所有省id
      cityID: [], //所有市id
      provinceIndex: 0, //当前选中的省下标
      currentCity: [],  //当前选择省下面的市,
      defaultAll: [],  //默认全选,
      getCheckedKeys: [],
      countyList: [], //区县列表
      codeLoading: [], //生成激活码按钮loading
      exportLoading: [], //导出loading
      codeVisible: false, //激活码详情弹框
      codeList: [], //激活码列表
      codePageCount: 1,
      codePage: 1,
      currentCode: {},
      cardNum: '',//卡数量
      remainingNum: ''
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
  watch: {
    "listQuery.province_name": {
      deep: true, //深度监听设置为 true
      handler (name) {
        name && this.provinceChange(name)
      }
    },
    "listQuery.city": {
      deep: true, //深度监听设置为 true
      handler (name) {
        name && this.cityChange(name)
      }
    },
    "listQuery.county": {
      deep: true, //深度监听设置为 true
      handler (name) {

      }
    },
  },

  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      this.tableLoading = true
      let [list, getAreaList] = await Promise.all([this.getList(), this.getArea()])
      this.list = list.data.data.list || []
      this.pageCount = list.data.data.rows || 1;
      //   console.log(getAreaList)
      this.provinceList = getAreaList || []
      this.tableLoading = false
    },
    async getList () {
      return await this.$axios.post('admin/SystemSetup/systemLists', { token: this.token, page: this.page, province: this.province })
    },
    async openAdd (checked, defaultData) {  //获取全部省
      // this.provinceList = this.areaWhetherChecked()
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.defaultAll)
        this.getCheckedKeys = this.$refs.tree.getCheckedKeys()   //获取被选中的id
        this.checkAll = true
      })
    },
    getArea () {    //获取地区
      return new Promise(async (resolve, reject) => {
        try {
          let data = await getPro();
          let list = []

          data.forEach(async (item, index) => {
            let city = await GET_City(item.id)
            let children = []
            city.forEach(e => {
              children.push({ id: e.id, label: e.name })
              this.defaultAll.push(e.id)
            })
            list.push({ id: item.id, label: item.name, children: children })
            this.defaultAll.push(item.id) //默认全选
          })
          resolve(list)
        } catch (error) {
          reject(error)
        }
      })
    },
    // areaWhetherChecked (checked) {   //checked 是否全选
    //   let provinceList = this.provinceList
    //   provinceList.forEach(item => {
    //     item = Object.assign(item, { checked: checked });
    //     item.city.forEach(v => {
    //       v = Object.assign(v, { checked: checked })
    //       if (checked) {
    //         this.cityChecked.push(v.id)
    //       }
    //     })
    //     if (checked) {
    //       this.listQuery.provinceID.push(item.id)
    //     }
    //   })
    //   return provinceList;
    // },

    checkAllChange () {  //全选
      this.$refs.tree.setCheckedKeys(this.checkAll ? this.defaultAll : [])
    },
    treeCheck () {
      this.checkAll = this.$refs.tree.getCheckedKeys().length == this.defaultAll.length //是否全选
    },
    defaultData (row) {  //修改       默认数据
      this.cardNum = row.num
      this.remainingNum = row.sur_num
      let province = row.province;
      let provinceID = [];
      let cityID = [];
      let iSnational = false
      Object.keys(province).forEach(key => {   //获取需要默认选中的id
        let province_id = province[key].province_id;
        let city_id = province[key].city_id
        if (province_id) {
          provinceID.push(province_id)
        }
        if (city_id) {
          cityID.push(...city_id)
        }
        iSnational = province[key].province_name == '全国' ? true : false; //是否是全国
      })
      this.$nextTick(() => {
        this.getCheckedKeys = this.$refs.tree.getCheckedKeys()   //获取被选中的id
        this.$refs.tree.setCheckedKeys(iSnational ? this.defaultAll : cityID);
        this.listQuery = Object.assign(this.listQuery, row)
        this.checkAll = iSnational
      })
      //   let provinceList = this.provinceList
      //   provinceList.forEach(item => {   //根据选中的id匹配 进行设置选中
      //     provinceID.forEach(v => {
      //       if (item.id == v) {
      //         item.checked = true
      //       }
      //     })
      //     item.city.forEach(v => {
      //       cityID.forEach(e => {
      //         if (v.id == e) {
      //           v.checked = true
      //         }
      //       })
      //     })
      //   })
      //   this.provinceList = provinceList  //重新渲染
      //   let { provinceCheckedID, cityCheckedId } = this.getAreaCheckedID();   //获取选中的省id 和选中的市id
      //   this.$nextTick(() => {
      //     this.listQuery = Object.assign(this.listQuery, { company: row.company, type: row.type, photo: row.photo, provinceID: provinceCheckedID, id: row.id, type_channel: row.type_channel })   //设置省默认选中状态
      //   })
      //   this.cityChecked = cityCheckedId  //设置市默认选中状态
      //   this.isIndeterminate = provinceCheckedID.length < this.provinceList.length && provinceCheckedID.length > 0
      //   this.checkAll = provinceID.length == this.provinceList.length;
    },


    // handleCheckAllChange (val) {  //地区全选功能
    //   let provinceList = [];
    //   let provinceID = []
    //   this.provinceList.forEach((el, index) => {  //获取所有省id  
    //     this.provinceList[index].checked = val;
    //     el.city.forEach((item, i) => {
    //       this.provinceList[index].city[i].checked = this.checkAll
    //     })
    //     provinceID.push(el.id)
    //   });
    //   let { provinceCheckedID, cityCheckedId } = this.getAreaCheckedID();
    //   this.listQuery.provinceID = provinceCheckedID;
    //   this.cityChecked = cityCheckedId
    //   this.isIndeterminate = false;
    // },
    // handleCheckedCitiesChange (v, e, index) {   //当前省操作  v 代表当时省是否选中  e event对象  index 当前省的下标
    //   this.provinceList[index].checked = v      // 设置当前的省的选中状态
    //   let length = this.listQuery.provinceID.length;   //当前省选中的长度
    //   this.provinceList[index].city.forEach((item, i) => {
    //     this.provinceList[index].city[i].checked = v
    //   })
    //   let { cityCheckedId } = this.getAreaCheckedID();
    //   this.cityChecked = cityCheckedId  //市默认选中状态
    //   this.isIndeterminate = length < this.provinceList.length && length > 0;      //判断当前省选中的长度是否小于当前省的长度并且当前选中省的长度大于0  如果条件成立设置全选的按钮的状态
    //   console.log(length)
    //   this.checkAll = length == this.provinceList.length     //当前选中省的长度如果等于当前省的长度, 省全选按钮勾选

    // },

    // //获取市
    // async getCity (id, index, e) {
    //   this.provinceIndex = index //当前选择的省下标
    //   this.currentCity = this.provinceList[index].city   //当前省下面的市
    //   this.cityVisible = true;   //是否显示市详情弹框
    //   this.cityList = this.provinceList[index].city   //获取当前市
    //   let currentCityLength = this.currentCity.length;    //当前市的长度
    //   let { cityCheckedId } = this.getAreaCheckedID();   //获取已选中市的id
    //   this.cityChecked = cityCheckedId    //设置市默认选中状态
    //   let cityCheckedLength = this.cityCheckedLength(this.currentCity)    //当前市选中的长度
    //   this.cityCheckAll = this.provinceList[index].checked ? cityCheckedLength == currentCityLength : false  //用当前市和当前选中市进行判断如果当前市的长度不等于当前选中的市的长度,则市全选不勾选,  相反如果等于全选按钮勾选


    // },

    // cityCheckedLength (currentCity) {    //当前选中的市的长度
    //   return currentCity.filter(item => item.checked).length;
    // },

    // // 市全选操作
    // cityCheckAllChange (val) {  //市 是否全选  val表示是否全选
    //   let provinceIndex = this.provinceIndex     //获取当前选中省的下标
    //   let cityID = []
    //   this.provinceList[provinceIndex].city.forEach((item, index) => {
    //     this.provinceList[provinceIndex].city[index].checked = val    //如果var等于true表示全选,把当前选中省下面的所有市改成选中状态,相反则改成非选中状态
    //     cityID.push(item.id)
    //   })
    //   this.provinceList[provinceIndex].checked = val
    //   let { provinceCheckedID, cityCheckedId } = this.getAreaCheckedID();   //获取当前选中市
    //   this.listQuery.provinceID = provinceCheckedID
    //   this.cityChecked = val ? this.provinceList[provinceIndex].checked ? cityCheckedId : cityID : []   //默认市的选中

    //   this.isIndeterminate = provinceCheckedID.length < this.provinceList.length && provinceCheckedID.length > 0


    // },

    // getAreaCheckedID () {  //获取选中的省id和市id
    //   let provinceCheckedID = [];
    //   let cityCheckedId = []
    //   this.provinceList.forEach(item => {
    //     if (item.checked) {  //当前省是否选择
    //       item.city.forEach(v => {
    //         if (v.checked) {  //当前市是否选中
    //           cityCheckedId.push(v.id)  //获取当前选中的市id
    //         }
    //       })
    //       provinceCheckedID.push(item.id)   //获取当前选中的省id
    //     }
    //   })

    //   return {
    //     provinceCheckedID,
    //     cityCheckedId
    //   }
    // },
    // //当前市的操作
    // cityChange (v, e, index) { // v:当前市是否被选中 e:event对象
    //   this.cityList[index].checked = v;
    //   let cityCheckedLength = this.cityCheckedLength(this.currentCity);
    //   this.cityCheckAll = cityCheckedLength == this.currentCity.length;
    //   console.log(cityCheckedLength)

    //   this.provinceList[this.provinceIndex].checked = cityCheckedLength == 0 ? false : true

    //   let { provinceCheckedID } = this.getAreaCheckedID();
    //   this.listQuery.provinceID = provinceCheckedID;
    //   console.log(cityCheckedLength, 'cityCheckedLength', '-----', this.currentCity.length)
    //   this.isIndeterminate = cityCheckedLength < this.currentCity.length && cityCheckedLength > 0

    // },
    handleSuccess (res) {  //上传成功
      this.listQuery = Object.assign({}, this.listQuery, { photo: res })
    },
    provinceChange (name) {  //获取市
      let cityList = []
      this.provinceList.forEach(item => {
        if (item.label == name) {
          cityList = item.children
        }
      })
      this.cityList = cityList
    },
    async cityChange (name) {   //
      let cityCheckedId = name && AccordingName_findID(this.cityList, name)    //获取当前市id
      const countyList = await get_County(cityCheckedId)  //获取区县列表
      this.countyList = countyList
    },


    getCityCheckedID (getCheckedKeys) {   //获取选中的市ID
      let cityID = []
      let provinceID = []
      this.provinceList.forEach(item => {   //获取所有省id
        provinceID.push(item.id)
      })
      getCheckedKeys.forEach(item => {  //过滤掉省id 只需要市id
        if (!provinceID.includes(item)) {
          cityID.push(item)
        }
      })
      return cityID
    },
    add () {  //添加
      console.log(this.listQuery)

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.getCityCheckedID(this.$refs.tree.getCheckedKeys())  //获取被选中的市id
            let isCheckedAll = this.$refs.tree.getCheckedKeys().length == this.getCheckedKeys.length
            this.loading = true
            let data = (({ company, type, photo, type_channel, phone, num, province_name, city, address, county }) => ({ company, type, photo, type_channel, phone, num, province_name, city, address, county }))(this.listQuery);
            let province = this.getCityCheckedID(this.$refs.tree.getCheckedKeys()) && this.getCityCheckedID(this.$refs.tree.getCheckedKeys()).length > 0 ? this.getCityCheckedID(this.$refs.tree.getCheckedKeys()).join(',') : ''
            const res = await this.$axios.post('admin/SystemSetup/addGenre', Object.assign({}, data, { token: this.token, types: 1, province: isCheckedAll ? 1 : province }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.addVisible = false
              this.exportCode(Object.assign(this.listQuery, { id: res.data.data }))
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
            let isCheckedAll = this.$refs.tree.getCheckedKeys().length == this.getCheckedKeys.length
            let data = (({ company, type, photo, type_channel, phone, num, province_name, city, address, id, county }) => ({ company, type, photo, type_channel, phone, num, province_name, city, address, id, county }))(this.listQuery);
            let province = this.getCityCheckedID(this.$refs.tree.getCheckedKeys()) && this.getCityCheckedID(this.$refs.tree.getCheckedKeys()).length > 0 ? this.getCityCheckedID(this.$refs.tree.getCheckedKeys()).join(',') : ''
            const res = await this.$axios.post('admin/SystemSetup/updateInfo', Object.assign({}, data, { token: this.token, types: 1, province: isCheckedAll ? 1 : province }))
            this.loading = false
            if (res.data.code == 1) {
              this.$message({ message: res.data.msg, type: 'success' })
              this.addVisible = false
              this.exportCode(this.listQuery)
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
    //激活码详情
    async codeDetails (item) {
      try {
        this.codeVisible = true
        this.currentCode = item
        const res = await this.$axios.post("admin/SystemSetup/codeDetail", { token: this.token, id: item.id, page: this.codePage })
        this.codeList = res.data.data.list || []
        this.codePageCount = res.data.data.rows || 1
      } catch (error) {
        throw (error)
      }
    },
    //生成激活码
    createCode (item, index) {
      this.$confirm(`您确定要生成${item.num}个激活码吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.codeLoading[index] = true
          const res = await this.$axios.post("admin/SystemSetup/createCode", { token: this.token, id: item.id, num: item.num })
          this.codeLoading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (error) {
          this.codeLoading[index] = false
          throw (error)
        }
      }).catch(() => { });

    },
    //导出激活码
    exportCode (item, manualExport) {
      console.log(item)
      window.location.href = `${this.baseURL}admin/Login/freeCode?id=${item.id}&name=${item.company}&num=${manualExport ? '' : Number(item.num) + (Number(this.cardNum) - Number(this.remainingNum))}`
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
