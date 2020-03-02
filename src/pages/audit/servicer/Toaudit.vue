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
        <div class="quote-ele"><i></i>服务车审核-待审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link>
        </div>
      </div>
      <el-table :data="list">
        <el-table-column align="center"
                         label="维修厂名称"
                         prop="company"></el-table-column>
        <el-table-column align="center"
                         label="手机号"
                         prop="phone"></el-table-column>
        <el-table-column align="center"
                         label="车牌号"
                         prop="car_num"></el-table-column>
        <el-table-column align="center"
                         label="救援编号"
                         prop="res_num"></el-table-column>
        <el-table-column align="center"
                         label="车辆图片">
          <template slot-scope="scope">
            <img :src="scope.row.car_img"
                 class="car_img">
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="创建时间"
                         prop="create_time"></el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="details(scope.row),detailsVisible=true">详情</el-button>
            <el-button type="primary"
                       size="small"
                       @click="audit(scope.row,scope.$index)"
                       :loading="Loading[scope.$index]">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 详情 -->
      <el-dialog title="详情"
                 :visible.sync="detailsVisible"
                 center>
        <div v-if='detailsList'
             class="details">
          <div>
            <span>维修厂名称 : </span>
            <span>{{detailsList.company}}</span>
          </div>
          <div>
            <span>创建时间 : </span>
            <span>{{detailsList.create_time}}</span>
          </div>
          <div>安全员信息：</div>
        </div>
        <div>
          <table>
            <tr>
              <th>姓名</th>
              <th>照片</th>
              <th>身份证</th>
              <th>驾驶证</th>
            </tr>
            <tr v-for='(item,index) in detailsList.safe_crew'
                :key="index">
              <td>
                {{item.name}}
              </td>
              <td>
                <img :src="item.headPic"
                     class="img"
                     ref="img">
              </td>
              <td>
                <img :src="item.z_idCard"
                     class="img"
                     ref="img">
              </td>
              <td>
                <img :src="item.driving"
                     class="img"
                     ref="img">
              </td>
            </tr>
          </table>
        </div>

      </el-dialog>
      <div class="page_center"
           v-show="pageCount&&pageCount>1">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
//  import page from '../common.js';
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      authList: [],
      threeAuthList: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 0,
      seCurId:0,
      pageCount: 0,
      list: [],
      detailsVisible: false,
      detailsList: {},
      Loading: []
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/ShopAudit/serveHandle', { token: this.token, page: this.page })
        this.list = res.data.data.list || []
        this.pageCount = res.data.data.rows;
      } catch (err) {
        throw (err)
      }
    },
    async details (row) {  //详情
      try {
        const res = await this.$axios.post('admin/ShopAudit/carDetail', { token: this.token, id: row.id })
        this.detailsList = res.data.data || {}
        this.$nextTick(() => {
          const img = this.$refs.img;
          Viewer(img)
        })
      } catch (err) {
        throw (err)
      }
    },
    async audit (row, index) {  //通过审核
      try {
        console.log(index)
        this.Loading[index] = true
        const res = await this.$axios.post('admin/ShopAudit/carHandle', { token: this.token, id: row.id })
        this.Loading[index] = false
        if (res.data.code == 1) {
          this.init()
          this.$message({ message: res.data.msg, type: 'success' })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (err) {
        this.Loading[index] = false
        throw (err)
      }
    },
    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: this.token,
        id: id
      })
        .then(res => {

          if (res.data.code == 1) {
            var arr = res.data.data;
            for (var i = 0; i < arr.length; i++) {

              if (arr[i].name == '车补审核') {
                this.seCurId = arr[i].id;

                if (arr[i].son) {

                  this.threeAuthList = arr[i].son;
                  for (var j = 0; j < arr[i].son.length; j++) {
                    if (arr[i].action != arr[i].son[j].action) {
                      arr[i].action = arr[i].son[0].action;
                    }
                    if (arr[i].son[j].name == '待审核' && arr[i].name == '车补审核') {
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
    }
  },

  mounted () {
    this.init()
    this.erAuth()
  },

}
</script>
<style scoped>
.car_img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
.details > div {
  margin: 10px 0;
}
.details span:first-child {
  width: 100px;
  text-align: right;
  display: inline-block;
}
.img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin: 10px 0;
}
</style>
