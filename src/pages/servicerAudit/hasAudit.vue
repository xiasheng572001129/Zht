<template>
  <div>
    <ctbHead>

      <router-link :class="seCurId==item.id? 'cur':''"
                   v-for="item in authList"
                   :key="item.id"
                   :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
    </ctbHead>
    <div class="container">
      <div class="quote">
        <div class="quote-ele"><i></i>服务车审核-已审核</div>
        <div class="quote-nav">
          <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">{{item.name}}</router-link>
        </div>
      </div>
      <el-table :data="list">
        <el-table-column align="center"
                         label="维修厂名称"
                         prop="company"></el-table-column>
        <el-table-column align="center"
                         label="负责人"
                         prop="leader"></el-table-column>
        <el-table-column align="center"
                         label="联系电话"
                         prop="phone"></el-table-column>
        <el-table-column align="center"
                         label="管理费"
                         prop="total_fee"></el-table-column>

        <!-- <el-table-column align="center"
                         label="补交押金"
                         prop="car_fee"></el-table-column> -->
        <el-table-column align="center"
                         label="提交时间"
                         prop="create_time"></el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="visibleDetails=true,details(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情"
                 :visible.sync="visibleDetails"
                 center>
        <div class="margin">
          <span>补交押金 : </span>
          <span>{{DetailsList.car_fee}}</span>
        </div>
        <div class="margin">
          <span>支付时间 : </span>
          <span>{{DetailsList.pay_time}}</span>
        </div>
        <div>
          <div v-for='(item,index) in DetailsList.img'
               :key="index"
               class="images">
            <div>
              <span>
                <img :src="item.Z_IDcard"
                     ref="images" />
              </span>
              <p>身份证(正)</p>
            </div>
            <div>
              <span>
                <img :src="item.F_IDcard"
                     ref="images" />
              </span>
              <p>身份证(反)</p>
            </div>
            <div>
              <span>
                <img :src="item.driving"
                     ref="images" />
              </span>
              <p>驾驶证</p>
            </div>
            <div>
              <span>
                <img :src="item.credit"
                     ref="images" />
              </span>
              <p>征信查询授权</p>
            </div>
            <div>
              <span>
                <img :src="item.warranty"
                     ref="images" />
              </span>
              <p>授权照片</p>
            </div>
          </div>
        </div>

      </el-dialog>
      <!-- 分页 -->
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
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      //分页数据
      page: 1, //显示的页码数

      authList: [],
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      visibleDetails: false,
      DetailsList: {}
    }
  },
  methods: {

    paging (e) {
      this.page = e;
      this.init()
    },

    //获取申请列表数据
    init () {
      this.$axios.post('admin/ShopList/serveFeeCar', {
        token: this.token,
        page: this.page,
        handle: 1
      })
        .then(res => {
          if (res.data.code == 1) {
            this.list = res.data.data.data;
            this.pageCount = res.data.data.rows;
          } else {
            layer.msg(res.data.msg)
          }
        })
        .catch(err => console.log(err))
    },
    async details (id) {  //查看详情
      try {
        const res = await this.$axios.post('admin/ShopList/detailCar', { id: id, token: this.token })
        this.DetailsList = res.data.data
        this.$nextTick(() => {
          Viewer(this.$refs.images)
        })
      } catch (err) {
        throw (err)
      }
    }

  },

  mounted () {
    this.init()
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
              if (arr[i].name == '服务车审核') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;

              }
              for (var j = 0; j < arr[i].son.length; j++) {
                if (arr[i].action != arr[i].son[j].action) {
                  arr[i].action = arr[i].son[0].action;
                }
                if (arr[i].son[j].name == '已审核' && arr[i].name == '服务车审核') {
                  this.thCurId = arr[i].son[j].id;
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

}
</script>
<style scoped>
.margin {
  margin: 10px 0;
}
.images > div {
  display: inline-block;
  width: 90px;
  height: 90px;
  margin: 0 10px 30px 0;
  text-align: center;
}
.images > div > span {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
.images img {
  width: 100%;
  height: 100%;
}
</style>