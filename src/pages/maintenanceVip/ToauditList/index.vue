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
        <div class="quote-ele"><i></i>邦保养VIP-待审核列表</div>
        <div class="quote-nav">
          <!-- <router-link :class="thCurId==item.id? 'cur':''"
                       v-for="item in threeAuthList"
                       :key="item.id"
                       :to="{path:item.action,query:{id:curId}}">
            {{item.name}}
          </router-link> -->
        </div>
      </div>
      <el-table :data="list">
        <el-table-column label="姓名"
                         align="center"
                         prop="name">

        </el-table-column>
        <el-table-column label="手机号"
                         prop="phone"
                         align="center">

        </el-table-column>
        <el-table-column label="市级名称"
                         prop="city_name"
                         align="center">

        </el-table-column>
        <el-table-column label="金额"
                         prop="money"
                         align="center">

        </el-table-column>

        <el-table-column label="创建时间"
                         prop="create_time"
                         align="center">

        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       @click="visibleDetails=true,details(scope.row.id)"
                       size="small">详情</el-button>
            <el-button type="primary"
                       size="small"
                       @click="detailsVisible=true,through(scope.row)"
                       :loading='throughLoading'>通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详情"
                 :visible.sync="visibleDetails"
                 center>
        <div class="margin">
          <span>补交押金 : </span>
          <span>{{DetailsList.money}}元</span>
        </div>
        <div class="margin">
          <span>支付时间 : </span>
          <span>{{DetailsList.create_time}}</span>
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
        <!--分页的组件-->
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Viewer from '@/utils/Viewer'
export default {
  data () {
    return {
      //分页数据
      token: window.sessionStorage.getItem('bbytoken'),
      curId: 0,
      threeAuthList: [],
      seCurId: 0,
      thCurId: 0,
      authList: [],
      page: 1,
      pageCount: 0,
      list: [],
      throughLoading: false,
      visibleDetails: false,
      DetailsList: {}
    }
  },
  methods: {
    paging (e) {
      this.page = e
      this.init()
    },
    async init () {
      try {
        const res = await this.$axios.post('admin/VipManager/auditTeam', { token: this.token, page: this.page })
        this.list = res.data.data.data || []
        this.pageCount = res.data.data.rows || 0
      } catch (err) {
        throw (err)
      }
    },

    //通过审核
    async through (row) {
      this.$confirm('此操作是通过审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.throughLoading = true
          const res = await this.$axios.post('admin/VipManager/auditHandle', { token: this.token, id: row.id, tid: row.tid })
          this.throughLoading = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: 'success' })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        } catch (err) {
          throw (err)
        }
      }).catch(() => { });
    },
    async details (id) {  //查看详情
      try {
        const res = await this.$axios.post('admin/VipManager/payListDetail', { id: id, token: this.token })
        this.DetailsList = res.data.data

        this.$nextTick(() => {
          Viewer(this.$refs.images)
        })
      } catch (err) {
        throw (err)
      }
    },
    erAuth () {
      var id = this.$route.query.id;
      this.curId = id;
      this.$axios.post('admin/Auth/erAuth', {
        token: window.sessionStorage.getItem('bbytoken'),
        id: id
      }).then(res => {
        if (res.data.code == 1) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].son) {
              if (arr[i].name == '待审核列表') {
                this.seCurId = arr[i].id;
                this.threeAuthList = arr[i].son;
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
    this.init()
    this.erAuth()
  },


}
</script>
<style scoped>
.details > div {
  padding: 5px 0;
}
.details > div > span:first-child {
  display: inline-block;
  width: 95px;
  text-align: right;
  margin-right: 10px;
}
.details > div > span > img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}
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