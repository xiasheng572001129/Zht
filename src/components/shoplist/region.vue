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
      <div class="selectCity">
        <span>选择省: </span>
        <el-select v-model="provinceId"
                   placeholder="请选择所在省"
                   @change="handleProChange">
          <el-option v-for="item in provinceList"
                     :key="item.id"
                     :name="item.name"
                     :value="item.id"
                     :label="item.name">
          </el-option>
        </el-select>
        <span>选择市: </span>
        <el-select v-model="cityId"
                   placeholder="请选择所在市"
                   @change="handleCityChange">
          <el-option v-for="item in cityList"
                     :key="item.id"
                     :name="item.name"
                     :value="item.id"
                     :label="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="cityData"
           align="center">
        <el-table :data="cityData"
                  style="width: 100%">
          <el-table-column align="center"
                           prop="name"
                           label="县级名称">
          </el-table-column>
          <el-table-column align="center"
                           prop="complete"
                           label="数量">
          </el-table-column>
          <el-table-column align="center"
                           prop="completed"
                           label="已开发数量">
          </el-table-column>
          <el-table-column align="center"
                           prop="open_status"
                           label="是否开放">
            <template slot-scope="scope">
              <el-button type="default"
                         disabled="disabled"
                         v-if="scope.row.open_status==1">
                已开放
              </el-button>
              <el-button @click="isModifyState(scope.row.id)"
                         type="primary"
                         size="small"
                         v-else-if="scope.row.open_status==2">
                未开放
              </el-button>
              <el-button type="default"
                         disabled="disabled"
                         size="small"
                         v-else-if="scope.row.open_status==3">
                数量未达到上限
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="rows"
                     class="myPage"
                     :current-page.sync="currentPage"
                     @current-change="handleCurrentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      list: [],
      authList: [],
      seCurId: '',
      token: window.sessionStorage.getItem('bbytoken'),
      provinceList: [],  //省数据
      cityList: [],			//市数据
      provinceId: '',    //选中的省ID
      cityId: '',				//选中的市ID
      cityData: [],      //列表
      currentPage: 1,    //当前页
      rows: 100					//默认页数
    }
  },
  methods: {

    // 省接口 agent/reg/regPro

    // id市接口  agent/reg/regCity 

    ProvinceDate () {  //省数据
      this.$axios.get('agent/reg/regPro')
        .then(res => {
          var prolist = res.data;
          if (prolist) {
            this.provinceList = prolist
          }
        })
        .catch(err => {
          alert(err + "省数据获取失败")
        })
    },
    handleProChange () {
      var _this = this
      this.$axios.post('agent/reg/regCity', {
        id: _this.provinceId
      })
        .then(res => {
          var citylist = res.data;
          this.cityList = citylist
        })
        .catch(err => {
          alert(err + "市数据获取失败")
        })
    },

    handleCityChange () {
      this.$axios.post('admin/ShopRegionNum/index', {
        token: window.sessionStorage.getItem('bbytoken'),
        city: this.cityId,
        page: this.currentPage
      })
        .then((res) => {
          var citydata = res.data.data.list;
          this.rows = res.data.data.rows * 10
          if (citydata) {
            this.cityData = citydata;
          }
        })
        .catch((err) => {
          alert(err + "cityData获取失败")
        })
    },

    isModifyState (val) {
      var _this = this
      this.$confirm('确定修改开放状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('admin/ShopRegionNum/openStatus', {
          token: window.sessionStorage.getItem('bbytoken'),
          id: val
        })
          .then((res) => {
            _this.$axios.post('admin/ShopRegionNum/index', {
              token: window.sessionStorage.getItem('bbytoken'),
              city: _this.cityId,
              page: _this.currentPage
            })
              .then((res) => {
                var citydata = res.data.data.list;
                if (citydata) {
                  _this.cityData = citydata;
                }
              })
              .catch((err) => {
                alert(err + "cityData获取失败")
              })
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          })
          .catch((err) => {
            this.$message({
              type: 'info',
              message: '修改失败'
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },

    handleCurrentPage () {  //分页处理
      this.$axios.post('admin/ShopRegionNum/index', {
        token: window.sessionStorage.getItem('bbytoken'),
        city: this.cityId,
        page: this.currentPage
      })
        .then((res) => {
          var citydata = res.data.data.list;
          if (citydata) {
            this.cityData = citydata;
          }
        })
        .catch((err) => {
          alert(err + "cityData获取失败")
        })
    },

    Auth () { //权限
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
              if (arr[i].name == '地区数量') {
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
          } else {
            this.$alert(res.data.msg, '提示', {
              type: 'error'
            });
          }
        })
        .catch(err => {
          alert(err);
        })
    }
  },
  mounted () {
    this.Auth()
    this.ProvinceDate()
  },

}
</script>
<style scoped>
.quote {
  margin: 30px 0;
}
.selectCity {
  margin: 20px 0 0 20px;
}
.myPage {
  text-align: center;
  margin: 20px 0;
}
</style>
