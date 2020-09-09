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
        <div class="quote-ele"><i></i>系统设置-市运营中心设置</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <!-- 省市搜索 -->
      <div style="margin-left:30px">
        <el-select placeholder="请选择省"
                   v-model="provinceId"
                   @change="getCity">
          <el-option v-for="(item,index) in provinceList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
        <el-select placeholder="请选择市"
                   v-model="cityId"
                   @change="init()">
          <el-option v-for="(item,index) in cityList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- 列表 -->
      <el-table :data="list">
        <el-table-column prop="province"
                         label="省名称"
                         align="center">
        </el-table-column>
        <el-table-column label="市名称"
                         align="center"
                         prop="city_name">

        </el-table-column>

        <el-table-column prop="phone"
                         label="联系电话"
                         align="center">
        </el-table-column>

        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="Modify(scope.row,scope.$index)"
                       :loading="Loading[scope.$index]">修改手机号</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div :class="list && list.length<=7?'page-nav':'page_center'"
           v-show="list && list.length>0">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { getPro, GET_City } from '@/utils'   //获取省市
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数
      pageCount: 1,
      curId: 0,
      thCurId: 0,
      seCurId: 0,
      threeAuthList: [],
      authList: [],
      provinceList: [],//所有省列表
      provinceId: '',//当前所选中的省id
      cityList: [], //市列表
      cityId: '',//当前选中的市id
      Loading: [], //加载loading
    }
  },



  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {
      this.$axios.post('admin/SystemSetup/cityPhone', { token: this.token, page: this.page, cid: this.cityId })
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
    },

    Modify (item, index) {  //修改手机号
      this.$prompt('请输入新手机号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^1[3456789]\d{9}$/,
        inputErrorMessage: '请输入正确的手机号'
      }).then(async ({ value }) => {
        try {
          this.Loading[index] = true
          const res = await this.$axios.post('admin/SystemSetup/cityPhoneUpd', { token: this.token, id: item.id, phone: value })
          this.Loading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          this.Loading[index] = false
          throw (err)
        }
      }).catch(() => { });
    },



    // 获取省
    async getProList () {
      try {
        const data = await getPro()
        this.provinceList = data || []
      } catch (error) {
        throw (error)
      }
    },
    //获取市
    async getCity () {
      try {
        const data = await GET_City(this.provinceId)
        this.cityList = data || []
        this.cityId = data[0].id
        this.init()
      } catch (error) {
        throw (error)
      }
    },
    Auth () {  //权限列表
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
                if (arr[i].name == '市运营中心设置') {
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
    this.init()
    this.getProList()
  },
}
</script>
<style scoped>
</style>
