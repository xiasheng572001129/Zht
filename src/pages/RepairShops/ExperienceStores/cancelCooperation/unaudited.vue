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
        <div class="quote-ele"><i></i>维修厂-体验店-取消合作-未审核</div>
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
        <el-table-column prop="company"
                         label="维修厂名称"
                         align="center"></el-table-column>
        <el-table-column prop="leader"
                         label="负责人"
                         align="center"></el-table-column>

        <el-table-column label="联系电话"
                         align="center"
                         prop="phone">

        </el-table-column>
        <el-table-column label="取消理由"
                         align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="scope.row.reason">
              <el-button type="text"
                         slot="reference"
                         class="ellipsis">{{scope.row.reason}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="物料详情"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="materialDetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="申请时间"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="through(scope.row,scope.$index)"
                       :loading='loading[scope.$index]'>通过</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!-- 物料详情 -->
      <el-dialog title="物料详情"
                 center
                 :visible.sync='materialVisible'>
        <el-table border
                  :data="materialList.detail">
          <el-table-column label="物料名称"
                           prop="materiel"
                           align="center"></el-table-column>
          <el-table-column label="物料配给/L"
                           prop="ration"
                           align="center"></el-table-column>
          <el-table-column label="库存/L"
                           prop="stock"
                           align="center"></el-table-column>
          <el-table-column label="物料消耗/L"
                           prop="num"
                           align="center"></el-table-column>
          <el-table-column label="油品单价元/L"
                           prop="price"
                           align="center"></el-table-column>
          <el-table-column label="总价( 元 )"
                           prop="settlement_price"
                           align="center"></el-table-column>
        </el-table>
        <span slot="footer"
              class="dialog-footer">
          <h3 class="totalPrice">总价：{{materialList.settlement_price || 0}}元</h3>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div class="page_center">
        <paging :page-count="pageCount"
                :page="page"
                @index="paging"></paging>
        <!--分页的组件-->
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      token: window.sessionStorage.getItem('bbytoken'),
      page: 1,
      pageCount: 1,
      authList: [],
      threeAuthList: [],
      loading: [],//通过loading
      materialList: [],  //物料列表
      materialVisible: false,  //物料详情弹框显示状态
    }
  },
  methods: {
    paging (e) {
      this.page = e;
      this.init()
    },
    init () {   //未审核列表
      this.$axios.post('admin/ShopCancel/index', { token: this.token, page: this.page })
        .then(res => {
          this.list = res.data.data.list || [];
          this.pageCount = res.data.data.rows || 1;
        }).catch(err => { })
    },
    // 获取物料详情
    async materialDetails (item) {
      try {
        this.materialVisible = true
        const res = await this.$axios.post('admin/ShopCancel/detail', { token: this.token, id: item.id, sid: item.sid })  // sid 维修厂id  id 增加地区id
        this.materialList = res.data.data || {}
      } catch (error) {
        this.$message.error('接口报错,请检查')
        throw (error)
      }
    },
    through (row, index) {  //通过审核
      this.$confirm('是否通过审核？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          this.loading[index] = true
          const res = await this.$axios.post('admin/ShopCancel/adopt', { token: this.token, sid: row.sid, id: row.id })   //sid 维修厂id  id  增加地区id
          this.loading[index] = false
          if (res.data.code == 1) {
            this.$message({ message: res.data.msg, type: "success" })
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }

        } catch (err) {
          this.loading[index] = false
          this.$message.error('接口报错,请检查')
          throw (err)
        }
      }).catch(() => { });
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
                if (arr[i].name == '体验店/取消合作') {
                  this.seCurId = arr[i].id;
                  this.threeAuthList = arr[i].son;
                }
                for (var j = 0; j < arr[i].son.length; j++) {
                  if (arr[i].action != arr[i].son[j].action) {
                    arr[i].action = arr[i].son[0].action;
                  }
                  if (arr[i].son[j].name == '未审核' && arr[i].name == '体验店/取消合作') {
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
    this.Auth()
    this.init()
  },
}
</script>
<style scoped>
.totalPrice {
  color: red;
}
</style>
